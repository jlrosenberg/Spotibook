import { ThemeProvider } from '@mui/material';
import React from 'react';
import { theme } from './common/theme';
import { Router } from './pages/Router';

export const AppContainer = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
};
