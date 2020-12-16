import React from "react";
import ReactDOM from "react-dom";
import App from "./component/App";
import { ThemeProvider } from "styled-components";
import { Provider } from 'react-redux';
import store from './redux/store';
const theme = {
  colors: {
    primary_green: "#00AA00",
    primary_red: "#FF0000",
    primary_white: "#FFFFFF",
  },
};

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
