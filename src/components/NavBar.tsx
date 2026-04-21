import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMode } from '../features/theme/themeSlice'
import type { RootState } from '../app/store'

const navItems = [
  { label: 'About', path: '/' },
  { label: 'Projects', path: '/projects' },
]

export default function NavBar() {
  const dispatch = useDispatch()
  const themeMode = useSelector((s: RootState) => s.theme.mode)
  const navigate = useNavigate()
  const location = useLocation()
  const muiTheme = useTheme()
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'))
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{ backdropFilter: 'blur(12px)', bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Toolbar>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ flexGrow: 1, cursor: 'pointer', color: 'primary.main' }}
            onClick={() => navigate('/')}
          >
            {'<ho />'}
          </Typography>

          {isMobile ? (
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  color={location.pathname === item.path ? 'primary' : 'inherit'}
                  sx={{ fontWeight: location.pathname === item.path ? 700 : 400 }}
                >
                  {item.label}
                </Button>
              ))}
              <IconButton onClick={() => dispatch(toggleMode())} color="inherit">
                {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 220, pt: 2 }}>
          <List>
            {navItems.map((item) => (
              <ListItemButton
                key={item.path}
                onClick={() => { navigate(item.path); setDrawerOpen(false) }}
                selected={location.pathname === item.path}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
            <ListItemButton onClick={() => dispatch(toggleMode())}>
              <ListItemText primary={themeMode === 'dark' ? 'Light mode' : 'Dark mode'} />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  )
}
