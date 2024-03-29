import { createTheme } from "@mui/material";
import { cyan, lightBlue } from "@mui/material/colors";

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: lightBlue[700],
      dark: lightBlue[800],
      light: lightBlue[500],
      contrastText: "#fff",
      textAltered: "#fff",
    },
    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText: "#fff",
    },
    button: {
      main: "#f7f6f3",
    },
    buttontext: {
      main: "#000000",
    },
    background: {
      paper: "#3B3B3E",
      default: "#101014",
    },
  },
  typography: {
    allVariants: {
      color: "#fff"
    }
  }
});