export type Project = {
  title: string;
  description: string;
  tags: string[];
  /** Public GitHub URL. Omit for private / work-only projects. */
  github?: string;
  /** Optional live demo or docs URL. */
  href?: string;
  featured?: boolean;
  private?: boolean;
};

/**
 * Add new projects here. Set `featured: true` to show on the homepage.
 * Omit `github` (or set `private: true`) until the repo is public.
 */
export const projects: Project[] = [
  {
    title: 'AgenticFlow',
    description:
      'Multi-agent AI platform exploring LangChain, LangGraph, and RAG patterns for structured scientific knowledge workflows.',
    tags: ['LangGraph', 'LangChain', 'RAG', 'Python'],
    featured: true,
    private: true,
  },
  {
    title: 'PiBrain',
    description:
      'Home AI / edge-compute experiments spanning local LLMs, notes, and Raspberry Pi–oriented agent tooling.',
    tags: ['Python', 'Local LLMs', 'Edge AI'],
    featured: true,
    private: true,
  },
  {
    title: 'Intelligent Document Processing',
    description:
      'OCR + LLM platform for handwritten laboratory notebooks with synchronized side-by-side PDF review for scientist validation.',
    tags: ['OCR', 'LLM', 'IDP', 'Web App'],
    featured: true,
    private: true,
  },
  {
    title: 'Particle Image CNN',
    description:
      'Machine learning pipeline for automated particle image analysis — evaluated KNN, SVM, and CNN architectures and deployed an optimized CNN with IT.',
    tags: ['PyTorch', 'CNN', 'Computer Vision', 'ML'],
    featured: true,
    private: true,
  },
  {
    title: 'Scientific ETL Pipelines',
    description:
      'Python ETL integrating LIMS samples and ELN (CSV/PDF) data into analysis-ready datasets for Tableau and Power BI reporting.',
    tags: ['Python', 'ETL', 'SQL', 'LIMS'],
    featured: false,
    private: true,
  },
  {
    title: 'Home AI Laboratory',
    description:
      'Proxmox-based GPU compute cluster for local LLMs, multi-agent systems, RAG architectures, and scientific AI workflows.',
    tags: ['Proxmox', 'Docker', 'Local LLMs', 'RAG'],
    featured: false,
    private: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
