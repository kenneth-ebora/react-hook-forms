import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { createContext, useState } from "react";

export const ThemeContext = createContext();

// eslint-disable-next-line react/prop-types
const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
    </ThemeContext.Provider>
  );
};

export default CustomThemeProvider;
