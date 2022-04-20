import { Button, ThemeProvider } from '@mui/material';
import React from 'react';
import { theme } from './common/theme';

export const AppContainer = () => {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="outlined">This is a test button</Button>
      <div>foobar</div>
    </ThemeProvider>
  );
};
