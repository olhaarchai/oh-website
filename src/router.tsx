import { createHashRouter } from 'react-router-dom'
import Layout from './components/Layout'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import ReviewerPage from './pages/ReviewerPage'

export const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <AboutPage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'projects/reviewer', element: <ReviewerPage /> },
    ],
  },
])
