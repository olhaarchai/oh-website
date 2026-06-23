import { Avatar, Box, Button, Chip, Divider, IconButton, Link, Stack, Tooltip, Typography } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import VerifiedIcon from '@mui/icons-material/Verified'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Link as RouterLink } from 'react-router-dom'
import type { ReactNode } from 'react'
import { projects } from '../data/projects'

const certifications: { title: string; issuer: string; certUrl: string; credential: string; period: string }[] = [
  {
    title: 'Multi-agent Systems',
    issuer: 'robot_dreams',
    certUrl: 'https://lms.robotdreams.cc/certificate/95f5b9f91a6d9d2be54d37225fc8ea1b',
    credential: 'Diploma',
    period: 'Mar–May 2026',
  },
  {
    title: 'AI Solutions Architect',
    issuer: 'robot_dreams',
    certUrl: 'https://lms.robotdreams.cc/certificate/aa56aa7b48145b010d8c4570e06fc926',
    credential: 'Diploma',
    period: 'Jul–Sep 2025',
  },
  {
    title: 'DevOps Engineer',
    issuer: 'robot_dreams',
    certUrl: 'https://lms.robotdreams.cc/certificate/4877fb17f3c79f56b770bf1bfbbfcb92',
    credential: 'Diploma',
    period: 'Mar–Jul 2025',
  },
]

const skillGroups: { group: string; items: string[] }[] = [
  { group: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'React Native', 'Redux'] },
  { group: 'Backend', items: ['Node.js', 'NestJS', 'Express', 'Python', 'FastAPI', 'REST & GraphQL'] },
  {
    group: 'Cloud & DevOps',
    items: [
      'AWS (Lambda, API Gateway, SQS, DynamoDB, S3, CDK)',
      'GCP (Cloud Run, Vertex AI, Firestore)',
      'IaC: AWS CDK + Pulumi',
      'Keyless CI/CD (Workload Identity Federation)',
      'GitHub Actions',
      'Serverless',
      'Docker',
    ],
  },
  { group: 'Data', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'DynamoDB', 'pgvector', 'Milvus'] },
  {
    group: 'AI / LLM',
    items: [
      'LangChain/LangGraph',
      'Multi-agent',
      'RAG (pgvector, Milvus + BM25)',
      'llama.cpp',
      'Ollama',
      'Vertex AI (Gemini)',
      'OpenAI',
      'Anthropic',
      'Claude Code',
    ],
  },
]

const aiHighlights: { title: string; body: ReactNode }[] = [
  {
    title: 'Kotiq Guard (live beta)',
    body: (
      <>
        a Google-hackathon security agent — a LangGraph multi-agent analyst ⇄ critic loop that flags risky npm/GitHub
        packages before you install them; runs on GCP (Cloud Run + Vertex AI) or fully local (Ollama), with the cloud
        infrastructure built as code in Pulumi (
        <RouterLink to="/projects/kotiq" style={{ color: 'inherit' }}>
          details
        </RouterLink>
        ).
      </>
    ),
  },
  {
    title: 'AI Local Reviewer (open-source)',
    body: (
      <>
        capstone project from a multi-agent course — a LangGraph pipeline with hybrid RAG, a critic loop with
        guardrails, human-in-the-loop, and pluggable LLMs (
        <RouterLink to="/projects/reviewer" style={{ color: 'inherit' }}>
          details
        </RouterLink>
        ).
      </>
    ),
  },
  {
    title: 'OpenAI + RAG (LangChain, pgvector)',
    body: 'integrated into a NestJS backend for an internal AI chat assistant.',
  },
  {
    title: 'Local-LLM PoC (Python) — built solo',
    body: 'a local LLM via llama.cpp with a hand-rolled RAG pipeline (no framework), Celery for async, and Redis memory.',
  },
  {
    title: 'AI-assisted development',
    body: 'daily, with Claude Code.',
  },
]

export default function AboutPage() {
  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} alignItems={{ xs: 'center', sm: 'flex-start' }} mb={5}>
        <Avatar
          sx={{
            width: 120,
            height: 120,
            bgcolor: 'primary.main',
            boxShadow: (theme) => `0 0 32px ${theme.palette.primary.main}55`,
          }}
        >
          <SmartToyIcon sx={{ fontSize: 56 }} />
        </Avatar>

        <Box>
          <Typography variant="h3" gutterBottom>
            Senior Full-Stack AI Engineer
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Full-stack & cloud background, now building LLM agent systems · Remote
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
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 680, mb: 3, lineHeight: 1.8 }}>
        Senior full-stack engineer with 7+ years building web applications and internal tools on React, Next.js,
        TypeScript, and Node.js, with strong AWS and serverless experience. I design solutions and own them end-to-end,
        partner closely with product and stakeholders, and run code reviews.
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 680, mb: 5, lineHeight: 1.8 }}>
        More recently I've been moving that same end-to-end approach into <strong>AI engineering</strong> — LLM agents
        and retrieval-augmented systems on top of a solid full-stack base. That's hands-on so far rather than years deep:
        a multi-agent course (capstone below), LLM/RAG integration in backend services, a local-LLM POC, and daily
        AI-assisted development. It's the direction I'm building toward.
      </Typography>

      <Typography variant="h5" gutterBottom fontWeight={600}>
        AI / LLM experience
      </Typography>
      <Stack component="ul" spacing={1.5} sx={{ maxWidth: 680, pl: 3, mt: 1, mb: 5 }}>
        {aiHighlights.map((h) => (
          <Typography key={h.title} component="li" variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            <strong>{h.title}</strong> — {h.body}
          </Typography>
        ))}
      </Stack>

      <Typography variant="h5" gutterBottom fontWeight={600}>
        Certifications
      </Typography>
      <Stack spacing={1.5} sx={{ maxWidth: 680, mt: 1, mb: 5 }}>
        {certifications.map((c) => (
          <Stack
            key={c.title}
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
          >
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              <strong>{c.title}</strong> — {c.issuer}{' '}
              <Box component="span" sx={{ color: 'text.disabled' }}>
                · {c.period}
              </Box>
            </Typography>
            <Button
              size="small"
              variant="text"
              startIcon={<VerifiedIcon />}
              href={c.certUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {c.credential}
            </Button>
          </Stack>
        ))}
      </Stack>

      <Typography variant="h5" gutterBottom fontWeight={600}>
        Skills
      </Typography>
      <Stack spacing={2} sx={{ mt: 1 }}>
        {skillGroups.map(({ group, items }) => (
          <Box key={group}>
            <Typography variant="subtitle2" color="text.primary" sx={{ mb: 1, fontWeight: 600 }}>
              {group}
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {items.map((item) => (
                <Chip key={item} label={item} size="small" color="primary" variant="outlined" />
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>

      <Divider sx={{ my: 5 }} />

      <Typography variant="h5" gutterBottom fontWeight={600}>
        Projects
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        A few personal projects I've been building:
      </Typography>
      <Stack component="ul" spacing={1} sx={{ pl: 3, mt: 0, mb: 3 }}>
        {projects
          .filter((p) => !p.draft)
          .map((p) => (
            <Typography key={p.id} component="li" variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              <Link component={RouterLink} to={p.path} color="primary" underline="hover" fontWeight={600}>
                {p.title}
              </Link>
              {p.inProgress && (
                <Box component="span" sx={{ color: 'text.disabled' }}>
                  {' '}
                  · in progress
                </Box>
              )}
            </Typography>
          ))}
      </Stack>
      <Button
        component={RouterLink}
        to="/projects"
        size="small"
        endIcon={<ArrowForwardIcon />}
      >
        View all projects
      </Button>
    </Box>
  )
}
