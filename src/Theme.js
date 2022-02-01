// import { ThemeProvider } from "@material-ui/styles";
// import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

import { responsiveFontSizes } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { enUS, esES } from "@mui/material/locale";

const locale = process.env.REACT_APP_LANGUAGE === "en" ? enUS : esES;

function Theme(props) {
  let mainTheme = createTheme(
    {
      palette: {
        primary: {
          main: "#000000",
        },
        secondary: {
          main: "#FF0000",
        },
        background: {
          default: "#fff",
        },
      },
    },
    locale
  );
  mainTheme = responsiveFontSizes(mainTheme);
  return <ThemeProvider theme={mainTheme}>{props.children}</ThemeProvider>;
}

export default Theme;
