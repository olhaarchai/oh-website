export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  path: string
  githubUrl?: string
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
]
