import React from "react";
import ReactDOM from "react-dom";
import App from "./component/App";
import { ThemeProvider } from "styled-components";
const theme = {
  colors: {
    primary_green: "#00AA00",
    primary_red: "#FF0000",
    primary_white: "#FFFFFF",
  },
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
