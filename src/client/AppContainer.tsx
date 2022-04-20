import { Button, ThemeProvider } from '@mui/material';
import React from 'react';
import { theme } from './common/theme';
import { NavBar } from './components/NavBar';

export const AppContainer = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Button variant="outlined">This is a test button</Button>
      <div>foobar</div>
    </ThemeProvider>
  );
};
