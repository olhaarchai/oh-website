import { Box, Typography, Paper, Chip, Stack, Divider, Button } from '@mui/material'
import { alpha } from '@mui/material/styles'
import SecurityIcon from '@mui/icons-material/Security'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import PipelineFlow from '../components/PipelineFlow'

const tags = [
  'ADK',
  'Gemini',
  'MCP',
  'Python',
  'Docker',
  'Cloud Run',
  'Multi-agent',
  'Security',
  'Static analysis',
  'OSINT',
]

const decisions: { title: string; body: string }[] = [
  {
    title: 'Isolation-first',
    body: 'Install scripts never touch the host — every package is unpacked and inspected inside a single-use Docker container that is thrown away afterwards.',
  },
  {
    title: 'Multi-agent',
    body: 'A static-analysis agent and a reputation agent run in parallel and their findings are fused into one verdict, rather than asking a single prompt to do everything (ADK + Gemini).',
  },
  {
    title: 'Passive OSINT only',
    body: 'Reputation checks are strictly read-only via MCP — no active probing of registries or authors, so analysis never has side effects.',
  },
]

export default function KotiqPage() {
  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center" mb={1}>
        <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />
        <Typography variant="h3" fontWeight={700}>
          Kotiq
        </Typography>
      </Stack>

      <Stack direction="row" flexWrap="wrap" gap={1} mb={3}>
        {tags.map((tag) => (
          <Chip key={tag} label={tag} size="small" color="primary" variant="outlined" />
        ))}
      </Stack>

      <Paper
        variant="outlined"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          mb: 3,
          px: 1.75,
          py: 0.75,
          borderRadius: 2,
          borderColor: 'success.main',
          bgcolor: (theme) => alpha(theme.palette.success.main, 0.12),
          color: 'success.main',
          fontWeight: 600,
          fontSize: '0.875rem',
        }}
      >
        🚧 In active development — live demo coming soon.
      </Paper>

      <Box>
        <Button
          variant="outlined"
          startIcon={<OpenInNewIcon />}
          href="https://kotiq.dev"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ mb: 4 }}
        >
          Landing: kotiq.dev
        </Button>
      </Box>

      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mb: 2, lineHeight: 1.8 }}>
        The <strong>"Contagious Interview" / Lazarus</strong> campaign is an active, real-world threat: attackers target
        developers with fake job-interview repositories and npm dependencies whose install scripts quietly steal crypto
        wallets, seed phrases, and keys.
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mb: 5, lineHeight: 1.8 }}>
        <strong>Kotiq</strong> is an AI sandbox that opens any npm package in isolation and decides whether it is{' '}
        <strong>safe to run — before you run it</strong>.
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" fontWeight={600} gutterBottom>
        Approach &amp; key decisions
      </Typography>
      <Stack component="ul" spacing={1.5} sx={{ maxWidth: 760, pl: 3, mt: 1, mb: 5 }}>
        {decisions.map((d) => (
          <Typography
            key={d.title}
            component="li"
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            <strong>{d.title}</strong> — {d.body}
          </Typography>
        ))}
      </Stack>

      <Typography variant="h5" fontWeight={600} gutterBottom>
        Flow
      </Typography>
      <Box sx={{ mt: 1, mb: 1.5 }}>
        <PipelineFlow steps={['Isolate', 'Analyze (parallel)', 'Verdict']} />
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 5 }}>
        Verdict: <strong>SAFE</strong> / <strong>SUSPICIOUS</strong> / <strong>MALICIOUS</strong>, with the findings
        behind it.
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="body2" color="text.secondary">
        <strong>Status:</strong> architecture designed; building the agent pipeline and Cloud Run deployment.
      </Typography>
    </Box>
  )
}
