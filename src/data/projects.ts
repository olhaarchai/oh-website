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
    title: 'AI Code Reviewer',
    description:
      'GitHub App that automatically reviews pull requests using Claude API. Leaves inline comments, suggests improvements, and catches potential bugs — all without human intervention.',
    tags: ['GitHub App', 'Claude API', 'Node.js', 'Webhooks'],
    path: '/projects/reviewer',
    githubUrl: 'https://github.com/howitworks',
  },
]
