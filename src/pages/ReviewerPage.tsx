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
  Button,
} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import GitHubIcon from '@mui/icons-material/GitHub'
import { useState } from 'react'

const steps = [
  {
    label: 'Create a GitHub App',
    description:
      'Go to GitHub → Settings → Developer Settings → GitHub Apps → New GitHub App. Give it a name, set the Homepage URL to your local ngrok address. Disable "Active" for webhooks for now.',
  },
  {
    label: 'Configure permissions & webhook',
    description:
      'Under Permissions, set Pull requests → Read & write. Under Subscribe to events, check Pull request. Start ngrok and set Webhook URL to your tunnel (e.g. https://xxxx.ngrok.io/webhook). Generate a Webhook secret and save it.',
  },
  {
    label: 'Generate a Private Key',
    description:
      'Scroll to the bottom of your App settings page and click Generate a private key. A .pem file will be downloaded — keep it safe, this is your APP_PRIVATE_KEY.',
  },
  {
    label: 'Start Milvus via Docker',
    description: 'Run the Milvus standalone container for the RAG vector store:',
    code: `docker compose up -d milvus`,
  },
  {
    label: 'Start Ollama and pull the model',
    description: 'Install Ollama, then pull the model you want to use for code review:',
    code: `ollama pull codellama
ollama serve`,
  },
  {
    label: 'Set environment variables',
    description: 'Create a .env file in the project root:',
    code: `APP_ID=<your_app_id>
WEBHOOK_SECRET=<your_webhook_secret>
APP_PRIVATE_KEY="$(cat your-app.pem)"
OLLAMA_MODEL=codellama
OLLAMA_BASE_URL=http://localhost:11434
MILVUS_HOST=localhost
MILVUS_PORT=19530`,
  },
  {
    label: 'Run the FastAPI server',
    description: 'Install dependencies and start the webhook server:',
    code: `pip install -r requirements.txt
uvicorn main:app --reload --port 3000`,
  },
  {
    label: 'Install the App on your repository',
    description:
      'Go to your App page → Install App → choose the repository. The App is now listening for PR events on that repo.',
  },
  {
    label: 'Open a test PR',
    description:
      'Create a branch, push a small change, open a pull request. The local model will review the diff and post a comment back to the PR via the GitHub API.',
  },
]

const testEnvBlock = `APP_ID=123456
WEBHOOK_SECRET=test_secret_value_abc123
APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA2a2rwplBQLzHPZe5TNJN...
(truncated for example)
-----END RSA PRIVATE KEY-----"
OLLAMA_MODEL=codellama
OLLAMA_BASE_URL=http://localhost:11434
MILVUS_HOST=localhost
MILVUS_PORT=19530`

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
          AI Local Reviewer
        </Typography>
      </Stack>

      <Stack direction="row" flexWrap="wrap" gap={1} mb={3}>
        {['GitHub App', 'Ollama', 'Python', 'FastAPI', 'ngrok', 'Milvus', 'RAG', 'Docker'].map((tag) => (
          <Chip key={tag} label={tag} size="small" color="primary" variant="outlined" />
        ))}
      </Stack>

      <Button
        variant="outlined"
        startIcon={<GitHubIcon />}
        href="https://github.com/olhaarchai/ai-local-reviewer"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ mb: 4 }}
      >
        olhaarchai/ai-local-reviewer
      </Button>

      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720, mb: 2, lineHeight: 1.8 }}>
        A GitHub App that automatically reviews pull requests using a locally running Ollama model — no cloud API
        needed. When a PR is opened, a webhook fires to a FastAPI server exposed via ngrok. The diff is enriched
        with RAG context from Milvus and sent to the local model, which posts the review back as a PR comment.
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720, mb: 5, lineHeight: 1.8 }}>
        Architecture: <strong>GitHub PR event</strong> → <strong>ngrok</strong> → <strong>FastAPI</strong> →{' '}
        <strong>Milvus RAG</strong> → <strong>Ollama (local model)</strong> → <strong>PR Review comment</strong>
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
        Use these example values to test your setup locally. Replace with real credentials before running.
      </Alert>
      <CodeBlock code={testEnvBlock} />
    </Box>
  )
}
