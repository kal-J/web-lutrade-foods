import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

import "./App.scss";
import colors from "./components/layout/colors";
import Menu from "./components/menu";
// import Vendor from "./components/vendor/Info";
import { CssBaseline } from "@material-ui/core";
import Routes from "./routes";

const theme = createMuiTheme({
  palette: {
    primary: { main: colors.primary },
    secondary: { main: colors.light },
  },
  status: {
    danger: red,
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <div className="gradient">
        <Menu />

        <Routes />
      </div>
    </ThemeProvider>
  );
};

export default App;
