import {Box, Typography} from "@mui/material";
import React from "react";

export function HomePage() {
  return (
    <Box sx={{textAlign: "center", mt: 5}}>
      <Typography variant="h2" sx={{fontWeight: "500"}}>
        Welcome to the Profile Page.
      </Typography>
      <Typography variant="h5" sx={{mt: 2}}>
        We are glad to have you here.
      </Typography>
    </Box>
  );
}

export default HomePage;
