import HomePage from "@/web/component/HomePage";
import NavBar from "@/web/component/NavBar";
import ProfilePage from "@/web/component/ProflePage";
import Box from "@mui/material/Box";
import {purple} from "@mui/material/colors";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {setKey} from "react-geocode";
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";

const theme = createTheme({
  palette: {
    primary: {
      main: purple["600"]
    },
    secondary: {
      main: purple["A400"]
    }
  },
  typography: {
    fontFamily: `Nunito, sans-serif`
  }
});

export function App() {
  setKey("<your_google_api_key>");
  return (
    <ThemeProvider theme={theme}>
      <Box id="app">
        <NavBar/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/edit" element={<ProfilePage/>}/>
        </Routes>
        <ToastContainer/>
      </Box>
    </ThemeProvider>
  );
}

export default App;
