import { Grid, Typography, Box } from '@mui/material'
import { projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard'

export default function ProjectsPage() {
  return (
    <Box>
      <Typography variant="h3" gutterBottom fontWeight={700}>
        Projects
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 5 }}>
        Open-source tools and experiments at the intersection of AI and developer tooling.
      </Typography>

      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid key={project.id} item xs={12} sm={6} md={4}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
