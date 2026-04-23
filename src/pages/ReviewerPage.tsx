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
      'Go to GitHub → Settings → Developer Settings → GitHub Apps → New GitHub App. Give it a name (e.g. "my-local-reviewer") and set a Homepage URL. You can leave the Webhook URL empty for now — we will come back to it after ngrok is running.',
  },
  {
    label: 'Configure permissions & events',
    description:
      'In the App settings, set Repository permissions → Pull requests: Read & write and Contents: Read-only. Under "Subscribe to events" enable Pull request. Generate a Webhook secret (any long random string) and save it — this becomes GITHUB_WEBHOOK_SECRET.',
  },
  {
    label: 'Generate a Private Key',
    description:
      'At the bottom of your App settings click "Generate a private key". A .pem file is downloaded — keep it, this is GITHUB_PRIVATE_KEY_PATH. Note your App ID (GITHUB_APP_ID) from the top of the page.',
  },
  {
    label: 'Clone the repository',
    description: 'Grab the source and create a virtual environment:',
    code: `git clone https://github.com/olhaarchai/ai-local-reviewer.git
cd ai-local-reviewer

python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt`,
  },
  {
    label: 'Start Milvus (vector DB for RAG)',
    description:
      'The project ships with a docker-compose.yml that starts Milvus standalone + etcd + MinIO + Attu UI. Attu will be available at http://localhost:8001.',
    code: `docker compose up -d`,
  },
  {
    label: 'Install Ollama and pull the models',
    description:
      'Three local models power the pipeline: a tool-capable model for the security analyst, a smaller tool-capable model for style, and a fast model for the summarizer. Adjust sizes to your hardware.',
    code: `# install Ollama from https://ollama.com
ollama serve &

ollama pull qwen2.5:7b   # security analyst (tool-capable)
ollama pull qwen2.5:3b   # style analyst    (tool-capable)
ollama pull llama3.2:1b  # summarizer       (fast)`,
  },
  {
    label: 'Ingest coding rules into Milvus (RAG)',
    description:
      'The repo contains a rules/ folder with curated guidelines per stack (Python, TypeScript, React/Next, Docker, AWS, OWASP, Terraform, Go, Rust, K8s, …). The ingest script chunks them, embeds with sentence-transformers and upserts into Milvus. Analysts retrieve relevant chunks per diff.',
    code: `python scripts/ingest_rules.py`,
  },
  {
    label: 'Configure environment variables',
    description: 'Create a .env file in the project root:',
    code: `# --- GitHub App ---
GITHUB_APP_ID=123456
GITHUB_WEBHOOK_SECRET=your_webhook_secret
GITHUB_PRIVATE_KEY_PATH=./oh-local-reviewer-ai.pem
GITHUB_BOT_NAME=my-local-reviewer

# --- Ollama ---
OLLAMA_MODEL_SECURITY=qwen2.5:7b
OLLAMA_MODEL_STYLE=qwen2.5:3b
OLLAMA_MODEL_FAST=llama3.2:1b
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_REQUEST_TIMEOUT=300
SUMMARIZER_USE_LLM=false

# --- Milvus (RAG) ---
MILVUS_HOST=localhost
MILVUS_PORT=19530
MILVUS_RULES_PER_CATEGORY=4
MILVUS_SCORE_THRESHOLD=1.5

# --- LangGraph checkpointer ---
CHECKPOINT_SQLITE_PATH=.data/reviewer_checkpoints.sqlite
# CHECKPOINT_POSTGRES_DSN=postgresql+asyncpg://user:pass@localhost:5432/dbname

# --- Pipeline tuning ---
WEB_SEARCH_MAX_RESULTS=5
READ_URL_MAX_CHARS=5000
MAX_CRITIC_ITERATIONS=3
AGENT_RECURSION_LIMIT=2
ENABLED_AGENTS=security,style

# --- Hybrid retrieval (dense + BM25, optional reranker) ---
BM25_ENABLED=true
DENSE_OVERFETCH_MULTIPLIER=3
USE_RERANKER=false
RERANKER_MODEL=cross-encoder/ms-marco-MiniLM-L-6-v2

# --- Deterministic linter pass (ruff) before analysts ---
LINTER_ENABLED=true

LOG_LEVEL=INFO`,
  },
  {
    label: 'Run the FastAPI webhook server',
    description: 'Start the app — it exposes POST /webhook and verifies GitHub signatures via HMAC-SHA256.',
    code: `uvicorn src.main:app --reload --port 8000`,
  },
  {
    label: 'Expose the webhook via ngrok',
    description:
      'In a second terminal, tunnel port 8000. Copy the HTTPS URL and paste it into your GitHub App Webhook URL field as https://<id>.ngrok.io/webhook, then enable "Active".',
    code: `ngrok http 8000`,
  },
  {
    label: 'Install the App on a repository',
    description:
      'On your App page → Install App → pick the repo. The bot is now listening for pull_request events on that repository.',
  },
  {
    label: 'Request a review from the bot',
    description:
      'Open a PR and add the bot as a reviewer (or re-request review). GitHub fires review_requested → the LangGraph pipeline runs filter → retriever (RAG) → security + style analysts → critic loop → summarizer → inline PR comments + summary review.',
  },
]

const testEnvBlock = `GITHUB_APP_ID=123456
GITHUB_WEBHOOK_SECRET=test_secret_value_abc123
GITHUB_PRIVATE_KEY_PATH=./oh-local-reviewer-ai.pem
GITHUB_BOT_NAME=my-local-reviewer

OLLAMA_MODEL_SECURITY=qwen2.5:7b
OLLAMA_MODEL_STYLE=qwen2.5:3b
OLLAMA_MODEL_FAST=llama3.2:1b
OLLAMA_BASE_URL=http://localhost:11434

MILVUS_HOST=localhost
MILVUS_PORT=19530
MILVUS_RULES_PER_CATEGORY=4
MILVUS_SCORE_THRESHOLD=1.5

BM25_ENABLED=true
DENSE_OVERFETCH_MULTIPLIER=3
USE_RERANKER=false

LINTER_ENABLED=true

MAX_CRITIC_ITERATIONS=3
ENABLED_AGENTS=security,style
LOG_LEVEL=INFO`

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
        {[
          'GitHub App',
          'LangGraph',
          'Ollama',
          'Python 3.11+',
          'FastAPI',
          'ngrok',
          'Milvus',
          'RAG',
          'Multi-agent',
          'HITL',
          'Docker',
        ].map((tag) => (
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

      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mb: 2, lineHeight: 1.8 }}>
        A GitHub App bot that automatically reviews Pull Requests using{' '}
        <strong>local Ollama models</strong> — no cloud LLM needed. When the bot is added as a reviewer, GitHub sends
        a <code>review_requested</code> webhook to a FastAPI server (exposed via ngrok for local dev). The app
        verifies the HMAC signature, fetches the PR diff, and runs a <strong>LangGraph</strong> review pipeline that
        coordinates multiple agents.
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mb: 2, lineHeight: 1.8 }}>
        The pipeline: <strong>filter</strong> (drop vendor/lock files) → deterministic{' '}
        <strong>ruff linter pass</strong> (cheap, high-signal findings before any LLM runs) →{' '}
        <strong>hybrid retriever</strong> (dense Milvus + BM25, optional cross-encoder reranker) →{' '}
        <strong>security analyst</strong> + <strong>style analyst</strong> (parallel, tool-capable LLMs with
        web_search / read_url) → <strong>critic</strong> loop (re-runs analysts until valid output or{' '}
        <code>MAX_CRITIC_ITERATIONS</code>) → optional <strong>HITL pause</strong> →{' '}
        <strong>summarizer</strong> → inline PR comments + summary review. State is persisted per PR through a
        SQLite or Postgres checkpointer, so a review can be resumed after a restart.
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mb: 5, lineHeight: 1.8 }}>
        Flow: <strong>GitHub PR event</strong> → <strong>ngrok</strong> → <strong>FastAPI /webhook</strong> →{' '}
        <strong>LangGraph</strong> (Milvus RAG + Ollama analysts + critic + summarizer) → <strong>GitHub API</strong>{' '}
        (inline comments + review).
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
        Example .env
      </Typography>
      <Alert severity="info" sx={{ mb: 2, maxWidth: 760 }}>
        Minimal values to get the bot running locally. Replace GitHub App ID, webhook secret and the .pem path with
        real ones before exposing the webhook.
      </Alert>
      <CodeBlock code={testEnvBlock} />
    </Box>
  )
}
