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
