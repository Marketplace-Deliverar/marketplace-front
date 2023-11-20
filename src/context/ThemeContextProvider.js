import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext({
  theme: [],
  changeTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

let defaultTheme = createTheme({ palette: { secondary: { main: "#FF6B35" } } });

defaultTheme = responsiveFontSizes(defaultTheme);

const ThemeContextProvider = ({ defaultValue = [], children }) => {
  const [theme, setTheme] = useState(defaultTheme);

  const changeTheme = (
    primary = "#1976d2",
    secondary = "FF6B35" /*"#9c27b0"*/
  ) => {
    const newTheme = createTheme({
      palette: {
        primary: { main: primary },
        secondary: { main: secondary },
      },
    });
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
