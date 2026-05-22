import { createTheme } from '@mui/material/styles'

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#3b82f6' : '#1d4ed8',
      },
      secondary: {
        main: mode === 'dark' ? '#22d3ee' : '#0891b2',
      },
      background: {
        default: mode === 'dark' ? '#0d1117' : '#f6f8fa',
        paper: mode === 'dark' ? '#161b22' : '#ffffff',
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
