/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension */
/* eslint-disable import/no-unresolved */

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
