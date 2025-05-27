import logo from "@/web/assets/favicon.ico";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import {useNavigate} from "react-router";

export function NavBar() {
  const navigate = useNavigate();

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="logo" height="30px"/>
          </IconButton>
          <Box sx={{display: "flex", flexGrow: 1}} gap={2}>
            <Button color="inherit" onClick={() => navigate("/")}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate("/edit")}>
              Manage Profile
            </Button>
          </Box>
          <Button color="inherit" onClick={() => navigate("/login")}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;