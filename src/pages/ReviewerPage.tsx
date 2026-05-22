import { Box, Typography, Chip, Stack, Divider, Button } from '@mui/material'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import GitHubIcon from '@mui/icons-material/GitHub'
import PipelineFlow from '../components/PipelineFlow'

const tags = [
  'GitHub App',
  'LangGraph',
  'Ollama',
  'Python 3.11+',
  'FastAPI',
  'Milvus',
  'BM25',
  'RAG',
  'Multi-agent',
  'HITL',
  'Docker',
]

const decisions: { title: string; body: string }[] = [
  {
    title: 'Fully local inference (Ollama)',
    body: 'No cloud LLM — proprietary diffs never leave the machine, and latency and cost stay predictable. The tradeoff is 7–9B models instead of frontier ones, so the design leans on what they do best: pattern matching, not open-ended reasoning.',
  },
  {
    title: 'Multi-agent split (security / style)',
    body: 'Two focused analysts, each with its own persona, model, and finding budget, instead of one prompt juggling 20+ rules. Narrower context per agent means fewer dropped rules and more accurate findings.',
  },
  {
    title: 'Deterministic critic gate',
    body: 'Before any comment is accepted, four code-level guards reject structural hallucinations — a line not in the diff, a missing file path, a fabricated rule ID, a wrong-stack rule. No LLM in the loop, so the final review carries zero structural noise; the harder semantic cases are escalated to a human.',
  },
  {
    title: 'Hybrid retrieval (dense + BM25)',
    body: 'Per-stack coding rules are pulled from Milvus (semantic) and BM25 (lexical) and fused with Reciprocal Rank Fusion, with an optional cross-encoder reranker. Dense search alone misses exact rule IDs; lexical alone misses meaning — together they cover both.',
  },
  {
    title: 'Problem-first prompts + deterministic linting',
    body: 'A ruff pass runs before the LLMs and seeds their prompts with ground-truth findings, and prompts list concrete vulnerable patterns rather than abstract OWASP categories — playing to local models’ strengths and not wasting them re-deriving what a linter already knows.',
  },
  {
    title: 'Pluggable providers + resumable state',
    body: 'A single env var switches the analysts between Ollama, Anthropic, Gemini, OpenAI, or MLX with no code changes. Human-in-the-loop and retries run through LangGraph’s interrupt() with a SQLite/Postgres checkpointer, so a review resumes mid-pipeline without re-fetching the diff.',
  },
]

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
        {tags.map((tag) => (
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
        View on GitHub
      </Button>

      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mb: 2, lineHeight: 1.8 }}>
        Teams want automated code review on every pull request, but routing proprietary diffs through a cloud LLM means
        handing source code to a third party — plus per-call cost and unpredictable latency. The goal here was a
        reviewer that runs <strong>entirely on local models</strong>.
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mb: 5, lineHeight: 1.8 }}>
        <strong>AI Local Reviewer</strong> is a GitHub App that, on a review request, fetches the PR diff, retrieves
        stack-specific coding rules from a local Milvus + BM25 store, runs two specialized analysts
        (<strong>security</strong> and <strong>style</strong>) on local <strong>Ollama</strong> models, validates their
        output deterministically, pauses for human approval, and posts inline comments back to the PR — with{' '}
        <strong>no cloud LLM</strong> in the path.
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
        <PipelineFlow
          steps={[
            'PR event',
            'filter',
            'retrieve (RAG)',
            'lint',
            'security + style',
            'critic',
            'HITL',
            'summarize',
            'inline comments',
          ]}
        />
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        The security and style analysts run in parallel; a failed critic check loops back to the analysts before the
        human gate.
      </Typography>
    </Box>
  )
}
