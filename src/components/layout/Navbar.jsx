import { Box, Stack, Switch } from "@mui/material";
import "./Navbar.css";
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider/ThemeProvider";

const Navbar = () => {
  const { setMode } = useContext(ThemeContext);

  return (
    <Stack
      component="nav"
      direction="row"
      className="navbar"
      sx={{ alignItems: "center" }}
    >
      <Stack component="ul" className="navbar-nav">
        <Box component="li">Test</Box>
      </Stack>
      <Box sx={{ marginLeft: "auto" }}>
        <Switch
          color="warning"
          defaultChecked
          onChange={(e) => setMode(e.target.checked ? "light" : "dark")}
        />
      </Box>
    </Stack>
  );
};

export default Navbar;
