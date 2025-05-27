import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {Map, Marker} from "@vis.gl/react-google-maps";
import {useEffect, useState} from "react";
import {fromAddress} from "react-geocode";
import {toast} from "react-toastify";

interface ProfileFormProps {
}

interface ProfileFormState {
  id?: string;
  name: string;
  location: string;
  headline: string;
  content: string;
  coordinates: { lat: number; lng: number };
  file: File | null;
  error?: string;
  loading: boolean;
}

export function ProfileForm(props: ProfileFormProps) {

  const toronto = {lat: 43.6532, lng: 79.3832};

  const [state, setState] = useState<ProfileFormState>({
    id: undefined,
    name: "",
    location: "",
    headline: "",
    content: "",
    coordinates: toronto,
    file: null,
    error: undefined,
    loading: false
  });

  async function load() {
    setState({...state, loading: true});
    try {
      const response = await fetch("/api/profiles/last", {
        method: "GET"
      });
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      let file = null;
      if (data.imageUrl) {
        const imageResponse = await fetch(data.imageUrl);
        if (!imageResponse.ok) throw new Error(imageResponse.statusText);
        const blob = await imageResponse.blob();
        file = new File([blob], "profile.png", {type: blob.type});

      }
      setState(prev => ({...prev, ...data, loading: false, file}));
      await updateAddress(data.location);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unexpected error";
      setState(prev => ({...prev, loading: false, error: errorMessage}));
    }
  }

  async function updateAddress(location?: string) {
    if (!location && !state.location) return;
    const {results} = await fromAddress(location || state.location);
    const {lat, lng} = results[0].geometry.location;
    setState(prev => ({...prev, coordinates: {lat, lng}}));
  }

  useEffect(() => {
    load();
  }, []);

  async function createOrUpdate() {
    console.debug("Create or update", state);
    if (state.name === "" || state.location === "") {
      setState({...state, error: "Name and location are required."});
      toast.error("Name and location are required");
      return;
    }
    setState({...state, loading: true});
    try {
      const formData = new FormData();
      formData.append("name", state.name);
      formData.append("location", state.location);
      formData.append("headline", state.headline);
      formData.append("content", state.content);
      if (state.file) formData.append("file", state.file);

      const response = await fetch(`/api/profiles${state.id ? `/${state.id}` : ""}`, {
        method: state.id ? "PUT" : "POST",
        headers: {
          ContentType: "multipart/form-data"
        },
        body: formData
      });
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      setState({...state, ...data, loading: false});
      toast.success("Profile updated successfully");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unexpected error";
      toast.error(errorMessage);
      setState(prev => ({...prev, loading: false, error: errorMessage}));
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      width={450}
    >
      <TextField
        label="Name"
        type="text"
        fullWidth
        value={state.name}
        onChange={(e) => setState({...state, name: e.target.value})}
      />
      <TextField
        label="Location"
        type="text"
        fullWidth
        value={state.location}
        onChange={async (e) => setState({...state, location: e.target.value})}
        onBlur={async () => await updateAddress()}
      />
      <Box sx={{width: "100%", height: "300px", margin: "20px 0"}}>
        <Map
          style={{width: "100%", height: "100%"}}
          center={state.coordinates}
          defaultCenter={state.coordinates}
          defaultZoom={14}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          <Marker
            position={state.coordinates}
            clickable={true}
            title={state.location}
          />
        </Map>
      </Box>
      <TextField
        label="Headline"
        type="text"
        fullWidth
        value={state.headline}
        onChange={(e) => setState({...state, headline: e.target.value})}
      />
      <TextField
        label="Content"
        type="text"
        fullWidth
        multiline
        rows={4}
        value={state.content}
        onChange={(e) => setState({...state, content: e.target.value})}
      />
      {state.file && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            position: "relative"
          }}
        >
          <img
            alt="Image Preview"
            src={URL.createObjectURL(state.file)}
            style={{
              width: "100%",
              objectFit: "cover"
            }}
          />
          <IconButton
            onClick={() => setState({...state, file: null})}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)"
              }
            }}
          >
            <DeleteIcon/>
          </IconButton>
        </Box>
      )}
      <Button
        variant="contained"
        color="primary"
        component="label"
      >
        Upload Image
        <input
          hidden
          type="file"
          accept="image/*"
          onChange={(e) => setState({...state, file: e.target.files?.[0] || null})}
        />
      </Button>
      <Button
        variant="contained"
        color="primary"
        loading={state.loading}
        onClick={createOrUpdate}
      >
        {state.id ? "Update" : "Create"}
      </Button>
    </Box>
  );
}

export default ProfileForm;
