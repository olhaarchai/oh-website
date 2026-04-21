import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  IconButton,
  Tooltip,
  Chip,
  Stack,
  Divider,
  Alert,
} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import { useState } from 'react'

const steps = [
  {
    label: 'Create a GitHub App',
    description:
      'Go to GitHub → Settings → Developer Settings → GitHub Apps → New GitHub App. Give it a name, set the Homepage URL to your server. Disable "Active" for webhooks for now.',
  },
  {
    label: 'Configure permissions & webhook',
    description:
      'Under Permissions, set Pull requests → Read & write. Under Subscribe to events, check Pull request. Set Webhook URL to your server endpoint (e.g. https://your-server.com/webhook). Generate a Webhook secret and save it.',
  },
  {
    label: 'Generate a Private Key',
    description:
      'Scroll to the bottom of your App settings page and click Generate a private key. A .pem file will be downloaded — keep it safe, this is your APP_PRIVATE_KEY.',
  },
  {
    label: 'Set environment variables',
    description: 'Configure the following environment variables on your server:',
    code: `APP_ID=<your_app_id>
WEBHOOK_SECRET=<your_webhook_secret>
APP_PRIVATE_KEY="$(cat your-app.pem)"
ANTHROPIC_API_KEY=<your_anthropic_api_key>
PORT=3000`,
  },
  {
    label: 'Install the App on your repository',
    description:
      'Go to your App page → Install App → choose the repository. The App is now listening for PR events on that repo.',
  },
  {
    label: 'Open a test PR',
    description:
      'Create a branch, push a small change, open a pull request. Within seconds the bot will post an AI-generated review comment.',
  },
]

const testEnvBlock = `APP_ID=123456
WEBHOOK_SECRET=test_secret_value_abc123
APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA2a2rwplBQLzHPZe5TNJN...
(truncated for example)
-----END RSA PRIVATE KEY-----"
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxx`

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

export default function ReviewerPage() {
  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center" mb={1}>
        <SmartToyIcon sx={{ fontSize: 40, color: 'primary.main' }} />
        <Typography variant="h3" fontWeight={700}>
          AI Code Reviewer
        </Typography>
      </Stack>

      <Stack direction="row" flexWrap="wrap" gap={1} mb={4}>
        {['GitHub App', 'Claude API', 'Node.js', 'Webhooks', 'TypeScript'].map((tag) => (
          <Chip key={tag} label={tag} size="small" color="primary" variant="outlined" />
        ))}
      </Stack>

      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720, mb: 2, lineHeight: 1.8 }}>
        A GitHub App that automatically reviews pull requests using the Anthropic Claude API. When a PR is opened or
        updated, a webhook fires to your server, which sends the diff to Claude for analysis and posts the review back
        as a PR comment — inline suggestions, potential bugs, and style feedback included.
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720, mb: 5, lineHeight: 1.8 }}>
        Architecture: <strong>GitHub PR event</strong> → <strong>Webhook (Node.js)</strong> →{' '}
        <strong>Anthropic API</strong> → <strong>PR Review comment</strong>
      </Typography>

      <Divider sx={{ mb: 5 }} />

      <Typography variant="h5" fontWeight={600} gutterBottom>
        Setup Guide
      </Typography>

      <Stepper orientation="vertical" sx={{ mb: 6 }}>
        {steps.map((step) => (
          <Step key={step.label} active>
            <StepLabel>
              <Typography fontWeight={600}>{step.label}</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body2" color="text.secondary">
                {step.description}
              </Typography>
              {step.code && <CodeBlock code={step.code} />}
            </StepContent>
          </Step>
        ))}
      </Stepper>

      <Divider sx={{ mb: 5 }} />

      <Typography variant="h5" fontWeight={600} gutterBottom>
        Test Values
      </Typography>
      <Alert severity="info" sx={{ mb: 2, maxWidth: 720 }}>
        Use these example values to test your setup locally. Replace with real credentials before deploying.
      </Alert>
      <CodeBlock code={testEnvBlock} />
    </Box>
  )
}
