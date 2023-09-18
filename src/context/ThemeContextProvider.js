import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext({
  theme: [],
  setTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

let defaultTheme = createTheme({
  /*palette: {
    primary: {},
  },*/
});

defaultTheme = responsiveFontSizes(defaultTheme);

const ThemeContextProvider = ({ defaultValue = [], children }) => {
  const [theme, setTheme] = useState(defaultTheme);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
