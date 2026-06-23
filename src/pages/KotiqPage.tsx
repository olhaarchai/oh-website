import { Box, Typography, Paper, Chip, Stack, Divider, Button } from '@mui/material'
import { alpha } from '@mui/material/styles'
import SecurityIcon from '@mui/icons-material/Security'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import GitHubIcon from '@mui/icons-material/GitHub'
import PipelineFlow from '../components/PipelineFlow'

const tags = [
  'Chrome extension',
  'LangGraph',
  'LangChain',
  'Node.js',
  'Fastify',
  'Vertex AI (Gemini)',
  'Ollama',
  'GCP',
  'Cloud Run',
  'Firestore',
  'Pulumi (IaC)',
  'Multi-agent',
  'Security',
]

const decisions: { title: string; body: string }[] = [
  {
    title: 'Never executes the code',
    body: 'Supply-chain attacks hide in install scripts that run during `npm install` — or the moment you open a repo in your editor. Kotiq Guard reads the project statically and never runs a line of it, so the check itself has zero side effects on your machine.',
  },
  {
    title: 'Multi-agent analyst ⇄ critic loop',
    body: 'An analyst agent proposes findings and a critic agent challenges them in a self-correcting loop, instead of trusting a single prompt to get it right — built on LangGraph / LangChain. The result is a plain-language explanation of why a package is risky, not just a score.',
  },
  {
    title: 'One engine, cloud or fully local',
    body: 'The same analysis runs in the cloud (Google Vertex AI / Gemini) or entirely on local open-source models via Ollama — so it can stay on your machine when privacy matters.',
  },
  {
    title: 'Infrastructure as code (I built and shipped it)',
    body: 'I designed and provisioned the whole GCP backend as code with Pulumi (TypeScript): Cloud Run (scale-to-zero), Artifact Registry, Firestore, and Cloud Monitoring — with keyless CI/CD via Workload Identity Federation, least-privilege service accounts, and separate dev/prod projects and pipelines.',
  },
]

export default function KotiqPage() {
  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center" mb={1}>
        <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />
        <Typography variant="h3" fontWeight={700}>
          Kotiq Guard
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
        ✅ Live in beta on the Chrome Web Store · built for the Google AI Agents Hackathon
      </Paper>

      <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap sx={{ mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<OpenInNewIcon />}
          href="https://kotiq.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          kotiq.dev
        </Button>
        <Button
          variant="outlined"
          startIcon={<GitHubIcon />}
          href="https://github.com/kotiqdev/kotiq-guard"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </Button>
      </Stack>

      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mb: 2, lineHeight: 1.8 }}>
        Supply-chain attacks hide in the code that runs <em>during</em> <code>npm install</code> (install hooks) and in
        dependencies you never chose — some even run the moment you open a repository in your editor. By the time you
        notice, your keys and wallets can already be gone.
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mb: 5, lineHeight: 1.8 }}>
        <strong>Kotiq Guard</strong> is a browser extension that checks an npm package or GitHub repository{' '}
        <strong>before you install or open it</strong> — reading it passively, never executing a line — and shows a
        clear verdict <strong>right on the page</strong>, on npmjs.com and GitHub. A multi-agent AI layer explains{' '}
        <em>why</em> in plain language.
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
        <PipelineFlow steps={['Read project (passive)', 'Multi-agent analysis', 'Critic loop', 'Verdict on the page']} />
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 5 }}>
        A clear verdict — safe vs. risky — with the findings behind it, explained in plain language.
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="body2" color="text.secondary">
        <strong>Status:</strong> live in beta. Backend deployed on GCP (Cloud Run + Vertex AI), and it also runs fully
        locally via Ollama. Infrastructure provisioned as code with Pulumi.
      </Typography>
    </Box>
  )
}
