export const site = {
  name: 'Anthony',
  title: 'Data Enablement Scientist | Scientific AI & Computing',
  availability: 'Open to collaboration',
  bio: 'Building AI-enabled scientific tools, data pipelines, and multi-agent systems that turn complex laboratory data into scalable workflows — with experience across R&D, IT, and CMC in GMP-regulated environments.',
  location: 'Tarrytown, NY',
  employer: 'Regeneron',
  github: 'https://github.com/ANest58',
  email: 'anesturi@gmail.com',
  linkedin: 'https://www.linkedin.com/in/anthony-nesturi/',
  education: 'BS/MS Chemistry — The City College of New York',
  resumeUrl: '/resume/Anthony-Resume.docx',
};

export type ExperienceItem = {
  period: string;
  role: string;
  company: string;
  location: string;
  summary: string;
  highlights: string[];
};

export const experience: ExperienceItem[] = [
  {
    period: 'Feb 2023 – Present',
    role: 'Scientist — Scientific AI & Data Enablement',
    company: 'Regeneron',
    location: 'Tarrytown, NY',
    summary:
      'Drug Product Development and Technology: partnering across R&D and IT to deliver AI platforms, data pipelines, and GMP-compliant data systems.',
    highlights: [
      'Built an Intelligent Document Processing platform for handwritten lab notebooks (OCR + LLM) with synchronized PDF review.',
      'Architected a multi-agent AI platform with LangChain, LangGraph, and RAG for scientific knowledge and automated reports.',
      'Deployed a CNN-based particle image analysis solution after evaluating KNN, SVM, and CNN architectures.',
      'Developed Python ETL pipelines from LIMS/ELN into Tableau and Power BI–ready datasets.',
      'Administered Microsoft SQL Server environments for GMP-compliant scientific data.',
    ],
  },
  {
    period: 'Jan 2020 – Feb 2023',
    role: 'Associate Scientist — Ophthalmic Products',
    company: 'Regeneron',
    location: 'Tarrytown, NY',
    summary:
      'Formulation development for biologics supporting IND-enabling work, stability studies, and regulatory documentation.',
    highlights: [
      'Led statistical analyses in JMP (DOE, regression, multivariate) to optimize formulation stability.',
      'Project lead for mAb, trap, and mixed-modality (AAV-LNP) formulations across multiple routes of administration.',
      'Authored tech transfer reports, clinical support summaries, and formulation sections for IND/BLA filings.',
    ],
  },
  {
    period: 'Feb 2018 – Jan 2020',
    role: 'Scientist — Pre-formulation Sciences',
    company: 'Merck',
    location: 'Kenilworth, NJ',
    summary:
      'Sterile injectable pre-formulation: analytical method development, biophysical characterization, and high-throughput screening.',
    highlights: [
      'Supported scale-up and tech transfer with pumping evaluations and subvisible particle analysis (HIAC, MFI).',
      'Developed biophysical/biochemical methods including SEC-MALS, ITC, nCD, DSC, and DLS.',
      'Programmed liquid-handling robotics for high-throughput formulation stability screening.',
    ],
  },
  {
    period: '2011 – 2014 / 2006 – 2010',
    role: 'MS & BS Chemistry',
    company: 'The City College of New York',
    location: 'New York, NY',
    summary:
      'Graduate and undergraduate training in chemistry, forming the foundation for scientific computing and formulation science.',
    highlights: ['Master of Science in Chemistry (2011–2014).', 'Bachelor of Science in Chemistry (2006–2010).'],
  },
];

export const heroSkills = ['LangChain', 'LangGraph', 'RAG', 'Multi-Agent Systems', 'Python', 'PyTorch', 'SQL', 'ETL'];

export const metrics = [
  { value: '6+', label: 'Years at Regeneron' },
  { value: 'AI + Data', label: 'Scientific enablement focus' },
  { value: 'Compute Clusters', label: 'Compute molecular dynamics and simulations' },
  { value: 'Home Lab', label: 'GPU cluster for local LLMs' },
];

/** Predetermined proficiency based on production use and depth of experience. */
export type SkillLevel = 'beginner' | 'intermediate' | 'professional' | 'exceptional';

export const skillLevelOrder: SkillLevel[] = ['exceptional', 'professional', 'intermediate', 'beginner'];

export const skillLevelLabels: Record<SkillLevel, string> = {
  exceptional: 'Exceptional',
  professional: 'Professional',
  intermediate: 'Intermediate',
  beginner: 'Beginner',
};

export type RankedSkill = {
  name: string;
  level: SkillLevel;
  group: string;
  note?: string;
};

/**
 * Rankings grounded in resume evidence (production delivery, years of use, ownership).
 * Most day-to-day stack sits between intermediate and professional.
 */
export const skillRankings: RankedSkill[] = [
  // Exceptional — repeated ownership / core craft
  {
    name: 'Python',
    level: 'exceptional',
    group: 'Data & Engineering',
    note: 'Primary language across AI, ETL, and lab tooling',
  },
  {
    name: 'ETL',
    level: 'exceptional',
    group: 'Data & Engineering',
    note: 'End-to-end sample-to-report pipelines in production',
  },
  {
    name: 'SQL Server',
    level: 'exceptional',
    group: 'Data & Engineering',
    note: 'Administers GMP-compliant scientific databases',
  },
  {
    name: 'JMP',
    level: 'exceptional',
    group: 'Web & Visualization',
    note: 'DOE, regression, multivariate for formulation decisions',
  },
  {
    name: 'LIMS',
    level: 'exceptional',
    group: 'Data & Engineering',
    note: 'Enterprise LIMS integration, UAT, and workflows',
  },
  {
    name: 'ELN',
    level: 'exceptional',
    group: 'Data & Engineering',
    note: 'CSV/PDF ELN ingestion and scientist validation flows',
  },

  // Professional — shipped production systems
  { name: 'LangChain', level: 'professional', group: 'AI & LLM', note: 'Production multi-agent / RAG platforms' },
  { name: 'LangGraph', level: 'professional', group: 'AI & LLM', note: 'Agent orchestration for scientific workflows' },
  { name: 'RAG', level: 'professional', group: 'AI & LLM', note: 'Knowledge repos + LLM querying of lab data' },
  {
    name: 'Multi-Agent Systems',
    level: 'professional',
    group: 'AI & LLM',
    note: 'Architected agent platforms for reports/knowledge',
  },
  { name: 'Prompt Engineering', level: 'professional', group: 'AI & LLM' },
  { name: 'Tool Calling', level: 'professional', group: 'AI & LLM' },
  { name: 'OCR', level: 'professional', group: 'Machine Learning', note: 'Handwritten notebook IDP platform' },
  { name: 'CNN', level: 'professional', group: 'Machine Learning', note: 'Deployed particle-image CNN with IT' },
  { name: 'Computer Vision', level: 'professional', group: 'Machine Learning' },
  { name: 'SQL', level: 'professional', group: 'Data & Engineering' },
  { name: 'Tableau', level: 'professional', group: 'Web & Visualization' },
  { name: 'Power BI', level: 'professional', group: 'Web & Visualization' },
  { name: 'Docker', level: 'professional', group: 'Cloud & DevOps' },
  { name: 'Linux', level: 'professional', group: 'Cloud & DevOps' },
  { name: 'Git', level: 'professional', group: 'Cloud & DevOps' },

  // Intermediate — solid working proficiency
  {
    name: 'PyTorch',
    level: 'intermediate',
    group: 'Machine Learning',
    note: 'Model evaluation and CNN implementation',
  },
  { name: 'Scikit-learn', level: 'intermediate', group: 'Machine Learning' },
  { name: 'KNN', level: 'intermediate', group: 'Machine Learning' },
  { name: 'SVM', level: 'intermediate', group: 'Machine Learning' },
  { name: 'ChromaDB', level: 'intermediate', group: 'AI & LLM' },
  { name: 'Vector Search', level: 'intermediate', group: 'Data & Engineering' },
  { name: 'Knowledge Graphs', level: 'intermediate', group: 'Data & Engineering' },
  { name: 'Flask', level: 'intermediate', group: 'Web & Visualization' },
  { name: 'Gradio', level: 'intermediate', group: 'Web & Visualization' },
  { name: 'Streamlit', level: 'intermediate', group: 'Web & Visualization' },
  { name: 'JavaScript', level: 'intermediate', group: 'Web & Visualization' },
  { name: 'AWS', level: 'intermediate', group: 'Cloud & DevOps' },
  { name: 'Azure', level: 'intermediate', group: 'Cloud & DevOps' },
  { name: 'Proxmox', level: 'intermediate', group: 'Compute Cluster', note: 'Home GPU compute lab' },
  { name: 'Slurm', level: 'intermediate', group: 'Compute Cluster' },
  { name: 'Docker Swarm', level: 'intermediate', group: 'Compute Cluster' },
  { name: 'GPU', level: 'intermediate', group: 'Compute Cluster' },
  { name: 'Cuda', level: 'intermediate', group: 'Compute Cluster' },
  { name: 'cudnn', level: 'intermediate', group: 'Compute Cluster' },
  { name: 'OpenMPI', level: 'intermediate', group: 'Compute Cluster' },

  // Beginner — newer / lighter use
  { name: 'MCP', level: 'beginner', group: 'AI & LLM', note: 'Emerging tooling; actively exploring' },
];

export const techStack: { group: string; items: string[] }[] = [
  {
    group: 'AI & LLM',
    items: [
      'LangChain',
      'LangGraph',
      'RAG',
      'Multi-Agent Systems',
      'Prompt Engineering',
      'Tool Calling',
      'MCP',
      'ChromaDB',
    ],
  },
  {
    group: 'Machine Learning',
    items: ['PyTorch', 'Scikit-learn', 'CNN', 'OCR', 'Computer Vision', 'KNN', 'SVM'],
  },
  {
    group: 'Data & Engineering',
    items: ['Python', 'SQL Server', 'ETL', 'LIMS', 'ELN', 'Vector Search', 'Knowledge Graphs'],
  },
  {
    group: 'Web & Visualization',
    items: ['Flask', 'Gradio', 'Streamlit', 'JavaScript', 'Tableau', 'Power BI', 'JMP'],
  },
  {
    group: 'Cloud & DevOps',
    items: ['Docker', 'AWS', 'Azure', 'Linux', 'Git'],
  },
  {
    group: 'Compute Cluster',
    items: ['Proxmox', 'Slurm', 'Docker Swarm', 'GPU', 'OpenMPI', 'cudnn', 'Cuda'],
  },
];
