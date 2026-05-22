import {
  Box,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Chip,
  Stack,
  Divider,
  Button,
} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import SecurityIcon from '@mui/icons-material/Security'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { useState } from 'react'

const tags = [
  'Google ADK',
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

const pipelineDiagram = `SequentialAgent  "kotiq_pipeline"
│
├─ 1. IngestAgent          tarball → single-use Docker container → IngestManifest
│
├─ 2. ParallelAgent
│      ├─ StaticAnalysisAgent   → List[RiskFinding]
│      └─ OSINTAgent (MCP)       → List[ReputationFinding]   (passive only)
│
└─ 3. ReporterAgent        → VerdictCard`

const verdictModel = `Verdict   = SAFE | SUSPICIOUS | MALICIOUS | NEEDS_REVIEW
Action    = ALLOW | ALLOW_WITH_WARNING | QUARANTINE | BLOCK
Severity  = INFO | LOW | MEDIUM | HIGH | CRITICAL

VerdictCard:
  verdict, risk_score (0-100), recommended_action, summary,
  top_findings[RiskFinding], reputation[ReputationFinding]`

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    void navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        position: 'relative',
        mt: 1.5,
        p: 2,
        bgcolor: 'background.default',
        fontFamily: 'monospace',
        fontSize: '0.82rem',
        whiteSpace: 'pre',
        overflowX: 'auto',
      }}
    >
      <Tooltip title={copied ? 'Copied!' : 'Copy'}>
        <IconButton
          size="small"
          onClick={handleCopy}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      {code}
    </Paper>
  )
}

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

      <Button
        variant="outlined"
        startIcon={<OpenInNewIcon />}
        href="https://kotiq.dev"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ mb: 4 }}
      >
        kotiq.dev
      </Button>

      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mb: 2, lineHeight: 1.8 }}>
        <strong>Kotiq</strong> is an AI sandbox that opens any npm package in isolation and decides whether it is{' '}
        <strong>safe to run — before you run it</strong>. The primary target is the{' '}
        <strong>"Contagious Interview" / Lazarus</strong> campaign: fake-recruiter repos and npm dependencies whose
        install scripts quietly steal crypto wallets, seed phrases, and keys.
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mb: 2, lineHeight: 1.8 }}>
        It is a <strong>multi-agent pipeline</strong> built on <strong>Google ADK</strong> + <strong>Gemini</strong>.
        An <strong>IngestAgent</strong> unpacks the tarball inside a <strong>single-use Docker container</strong> (no
        install scripts ever run on the host) and produces an <code>IngestManifest</code> — file tree, scripts,
        dependencies, entrypoints and notable files (<code>.env</code>, <code>wallet*</code>, <code>keystore</code>…).
        A <strong>ParallelAgent</strong> then runs a <strong>StaticAnalysisAgent</strong> and an{' '}
        <strong>OSINTAgent</strong> (reputation via <strong>MCP</strong> — OSV, deps.dev, GHSA, typosquat checks,
        passive only) side by side, and a <strong>ReporterAgent</strong> fuses their findings into a single{' '}
        <code>VerdictCard</code>.
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mb: 5, lineHeight: 1.8 }}>
        Everything runs server-side and is deployed on <strong>Cloud Run</strong>; the agent is driven through the{' '}
        ADK web UI. The design rule is strict: <strong>never execute install scripts on the host</strong>, all
        execution is confined to a disposable container, and OSINT is read-only.
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" fontWeight={600} gutterBottom>
        Architecture
      </Typography>
      <CodeBlock code={pipelineDiagram} />

      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 5 }}>
        Verdict model
      </Typography>
      <CodeBlock code={verdictModel} />
    </Box>
  )
}
