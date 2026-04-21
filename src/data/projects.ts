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
      'GitHub App that automatically reviews pull requests using a local Ollama model. Uses RAG with Milvus vector DB, FastAPI for the webhook server, and ngrok to expose it publicly — runs entirely on your machine.',
    tags: ['GitHub App', 'Ollama', 'Python', 'FastAPI', 'ngrok', 'Milvus', 'RAG', 'Docker'],
    path: '/projects/reviewer',
    githubUrl: 'https://github.com/olhaarchai/ai-local-reviewer',
  },
]
