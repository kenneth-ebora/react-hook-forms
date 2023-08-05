/* eslint-disable react/prop-types */
import { Stack } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../ThemeProvider/ThemeProvider";

const Main = ({ children }) => {
  const { mode } = useContext(ThemeContext);

  return (
    <Stack
      component="main"
      className={mode === "light" ? "light-theme" : "dark-theme"}
    >
      {children}
    </Stack>
  );
};

export default Main;
