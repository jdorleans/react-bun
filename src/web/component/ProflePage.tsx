import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ProfileForm from "./ProfleForm";

export function ProfilePage() {

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      marginTop="40px"
    >
      <Typography variant="h2" sx={{marginBottom: "40px", fontWeight: "500"}}>
        Profile Management
      </Typography>
      <ProfileForm/>
    </Box>
  );
}

export default ProfilePage;
