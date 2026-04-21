import { StrictMode, useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider, useSelector } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { store } from './app/store'
import { getTheme } from './theme'
import { router } from './router'
import type { RootState } from './app/store'

function ThemedApp() {
  const mode = useSelector((s: RootState) => s.theme.mode)
  const theme = useMemo(() => getTheme(mode), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

const root = document.getElementById('root')!
createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  </StrictMode>,
)
