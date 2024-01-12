'use client';
import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider, closeSnackbar } from 'notistack';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Provider } from 'react-redux';
import { store } from '@/shared/store/store';

const ProjectProviders = ({ children }: { children: React.ReactNode }) => {
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
    breakpoints: {
      keys: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      values: {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        '2xl': 1536,
      },
    },
  });

  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={lightTheme}>
          <QueryClientProvider client={queryClient}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <SnackbarProvider
                autoHideDuration={3000}
                maxSnack={5}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                action={(key) => (
                  <IconButton
                    size='small'
                    aria-label='close'
                    color='inherit'
                    onClick={() => closeSnackbar(key)}
                  >
                    <CloseIcon fontSize='small' className='text-white' />
                  </IconButton>
                )}
              >
                {children}
              </SnackbarProvider>
            </LocalizationProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  );
};

export default ProjectProviders;
