import { Card, CardContent, CardActions, Typography, Chip, Button, Stack, Box } from '@mui/material'
import { alpha } from '@mui/material/styles'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { useNavigate } from 'react-router-dom'
import type { Project } from '../data/projects'

interface Props {
  project: Project
}

export default function ProjectCard({ project }: Props) {
  const navigate = useNavigate()

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => `0 8px 32px ${theme.palette.primary.main}33`,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" alignItems="center" gap={1} flexWrap="wrap" sx={{ mb: 1 }}>
          <Typography variant="h6" fontWeight={600}>
            {project.title}
          </Typography>
          {project.inProgress && (
            <Chip
              label="🚧 In progress"
              size="small"
              sx={{
                fontWeight: 600,
                borderRadius: 1.5,
                border: 1,
                borderColor: 'success.main',
                bgcolor: (theme) => alpha(theme.palette.success.main, 0.12),
                color: 'success.main',
              }}
            />
          )}
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {project.description}
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={0.5}>
          {project.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" color="primary" />
          ))}
        </Stack>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate(project.path)}
          >
            Details
          </Button>
          {project.liveUrl && (
            <Button
              size="small"
              variant="outlined"
              endIcon={<OpenInNewIcon />}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live
            </Button>
          )}
        </Box>
      </CardActions>
    </Card>
  )
}
