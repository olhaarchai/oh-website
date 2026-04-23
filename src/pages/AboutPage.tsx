import { Avatar, Box, Chip, Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

const skills = ['LLM', 'AI Agents', 'TypeScript', 'Node.js', 'Python', 'GitHub Apps', 'RAG', 'Prompt Engineering']

export default function AboutPage() {
  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} alignItems={{ xs: 'center', sm: 'flex-start' }} mb={5}>
        <Avatar
          sx={{
            width: 120,
            height: 120,
            fontSize: 48,
            bgcolor: 'primary.main',
            boxShadow: (theme) => `0 0 32px ${theme.palette.primary.main}55`,
          }}
        >
          H
        </Avatar>

        <Box>
          <Typography variant="h3" gutterBottom>
            AI Engineer
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Building intelligent agents & automation systems
          </Typography>
          <Stack direction="row" spacing={1} mt={1}>
            <Tooltip title="GitHub">
              <IconButton
                href="https://github.com/olhaarchai"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                size="small"
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="LinkedIn">
              <IconButton
                href="https://www.linkedin.com/in/olha-horobchenko-016702131/"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                size="small"
              >
                <LinkedInIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      </Stack>

      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" gutterBottom fontWeight={600}>
        About me
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 680, mb: 4, lineHeight: 1.8 }}>
        I'm an AI engineer focused on designing and building autonomous agent systems. My work sits at the intersection
        of large language models, software architecture, and developer tooling — I love turning complex AI capabilities
        into practical, production-ready tools that actually make developers' lives easier.
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 680, mb: 5, lineHeight: 1.8 }}>
        Currently experimenting with GitHub Apps, multi-agent pipelines, and retrieval-augmented systems. If it involves
        an LLM making decisions autonomously, I'm probably building something like it.
      </Typography>

      <Typography variant="h5" gutterBottom fontWeight={600}>
        Skills
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={1}>
        {skills.map((skill) => (
          <Chip key={skill} label={skill} color="primary" variant="outlined" />
        ))}
      </Stack>
    </Box>
  )
}
