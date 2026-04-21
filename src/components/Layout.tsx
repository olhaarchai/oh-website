import { Box, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'

export default function Layout() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <NavBar />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Outlet />
      </Container>
    </Box>
  )
}
