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
}

export const projects: Project[] = [
  {
    id: 'ai-reviewer',
    title: 'AI Local Reviewer',
    description:
      'GitHub App bot that auto-reviews pull requests via a LangGraph multi-agent pipeline. Security and style analysts run on local Ollama models, a critic loop validates their output, and Milvus RAG injects per-stack rules (Python, TS, React, Docker, AWS…). FastAPI serves the webhook, ngrok exposes it — fully local, no cloud LLM.',
    tags: ['GitHub App', 'LangGraph', 'Ollama', 'Python', 'FastAPI', 'ngrok', 'Milvus', 'RAG', 'Multi-agent', 'HITL', 'Docker'],
    path: '/projects/reviewer',
    githubUrl: 'https://github.com/olhaarchai/ai-local-reviewer',
  },
  {
    id: 'kotiq',
    title: 'Kotiq',
    description:
      'AI sandbox that opens any npm package in isolation and decides whether it is safe to run — before it runs. A Google ADK multi-agent pipeline ingests the tarball into a single-use Docker container, runs static analysis + passive OSINT (via MCP) in parallel, and returns a verdict card (SAFE / SUSPICIOUS / MALICIOUS). Primary focus: catching "Contagious Interview" / Lazarus malware that steals crypto wallets, seed phrases, and keys.',
    tags: ['Google ADK', 'Gemini', 'MCP', 'Python', 'Docker', 'Cloud Run', 'Multi-agent', 'Security', 'Static analysis', 'OSINT'],
    path: '/projects/kotiq',
    liveUrl: 'https://kotiq.dev',
    // Repo is private; no public GitHub link.
    // Hidden until there is a live deployment + demo video. Flip to false to publish.
    draft: false,
  },
]
