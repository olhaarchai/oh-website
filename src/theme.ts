import { createTheme } from '@mui/material/styles'

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#7c4dff' : '#5e35b1',
      },
      secondary: {
        main: mode === 'dark' ? '#00e5ff' : '#0097a7',
      },
      background: {
        default: mode === 'dark' ? '#0d0d1a' : '#f5f5f5',
        paper: mode === 'dark' ? '#13132a' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 600 },
    },
    shape: {
      borderRadius: 12,
    },
  })
