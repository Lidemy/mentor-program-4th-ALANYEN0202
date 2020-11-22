/* eslint-disable react/jsx-filename-extension, import/no-unresolved */

import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';

const theme = {
  colors: {
    primary_green: '#00AA00',
    primary_red: '#FF0000',
    primary_white: '#FFFFFF',
  },
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
);
