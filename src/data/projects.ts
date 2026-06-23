export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  path: string
  githubUrl?: string
  liveUrl?: string
  /** Hidden from the Projects grid while true. Flip to false to publish. */
  draft?: boolean
  /** Shows an "In progress" badge on the card. */
  inProgress?: boolean
}

export const projects: Project[] = [
  {
    id: 'ai-reviewer',
    title: 'AI Local Reviewer',
    description:
      'GitHub App bot that auto-reviews pull requests via a LangGraph multi-agent pipeline. Security and style analysts run on local Ollama models, a critic loop validates their output, and Milvus RAG injects per-stack rules (Python, TS, React, Docker, AWS…). FastAPI serves the webhook, ngrok exposes it — fully local, no cloud LLM.',
    tags: ['GitHub App', 'LangGraph', 'Ollama', 'Python', 'FastAPI', 'Milvus', 'BM25', 'RAG', 'Multi-agent', 'HITL', 'Docker'],
    path: '/projects/reviewer',
    githubUrl: 'https://github.com/olhaarchai/ai-local-reviewer',
  },
  {
    id: 'kotiq',
    title: 'Kotiq Guard',
    description:
      'Browser extension that checks an npm package or GitHub repository before you install or open it — reading it passively, never executing the code — and shows a clear verdict right on the page. A LangGraph multi-agent analyst ⇄ critic loop explains why in plain language. Runs in the cloud (GCP Cloud Run + Vertex AI Gemini) or fully local (Ollama). I designed and provisioned the whole GCP backend as code with Pulumi — keyless CI/CD, least-privilege IAM, separate dev/prod. Built for the Google AI Agents Hackathon; live in beta.',
    tags: ['Chrome extension', 'LangGraph', 'Node.js', 'Fastify', 'Vertex AI', 'Ollama', 'GCP', 'Cloud Run', 'Pulumi', 'Multi-agent', 'Security'],
    path: '/projects/kotiq',
    liveUrl: 'https://kotiq.dev',
    githubUrl: 'https://github.com/kotiqdev/kotiq-guard',
    draft: false,
  },
]
