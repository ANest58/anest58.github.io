export type AgentProfile = {
  name: string;
  title: string;
  bio: string;
  location: string;
  employer: string;
  education: string;
  email: string;
  linkedin: string;
  github: string;
  skills: string[];
  experience: {
    period: string;
    role: string;
    company: string;
    location: string;
    summary: string;
    highlights: string[];
  }[];
  projects: {
    title: string;
    description: string;
    tags: string[];
  }[];
};

const SKILL_ALIASES: Record<string, string[]> = {
  python: ['python', 'py'],
  javascript: ['javascript', 'js', 'typescript', 'ts'],
  sql: ['sql', 'sql server', 'mssql', 't-sql'],
  langchain: ['langchain'],
  langgraph: ['langgraph'],
  rag: ['rag', 'retrieval-augmented', 'retrieval augmented'],
  'multi-agent': ['multi-agent', 'multi agent', 'agentic', 'agents'],
  pytorch: ['pytorch', 'torch'],
  etl: ['etl', 'data pipeline', 'pipelines'],
  ocr: ['ocr', 'document processing', 'idp'],
  'computer vision': ['computer vision', 'cv', 'cnn', 'image analysis'],
  docker: ['docker', 'container'],
  aws: ['aws', 'amazon web services'],
  azure: ['azure'],
  lims: ['lims'],
  eln: ['eln'],
  gmp: ['gmp', 'regulated', 'compliance'],
  flask: ['flask'],
  streamlit: ['streamlit'],
  gradio: ['gradio'],
  tableau: ['tableau'],
  'power bi': ['power bi', 'powerbi'],
  jmp: ['jmp', 'doe', 'design of experiments'],
  llm: ['llm', 'large language', 'generative ai', 'genai'],
  ml: ['machine learning', 'ml ', ' deep learning'],
  formulation: ['formulation', 'biologics', 'drug product'],
  proxmox: ['proxmox', 'home lab', 'gpu cluster'],
};

function normalize(text: string): string {
  return text.toLowerCase().replace(/\s+/g, ' ').trim();
}

function extractSkillsFromText(text: string, catalog: string[]): string[] {
  const hay = normalize(text);
  const found = new Set<string>();

  for (const skill of catalog) {
    const key = normalize(skill);
    if (key.length >= 2 && hay.includes(key)) found.add(skill);
  }

  for (const [label, aliases] of Object.entries(SKILL_ALIASES)) {
    if (aliases.some((a) => hay.includes(a))) {
      const match = catalog.find((s) => normalize(s).includes(label) || label.includes(normalize(s)));
      found.add(match ?? label);
    }
  }

  return [...found];
}

function uniqueSkills(profile: AgentProfile): string[] {
  const fromStack = profile.skills;
  const fromProjects = profile.projects.flatMap((p) => p.tags);
  return [...new Set([...fromStack, ...fromProjects])];
}

function isFitRequest(message: string): boolean {
  const m = normalize(message);
  return (
    m.includes('fit') ||
    m.includes('position') ||
    m.includes('job description') ||
    m.includes('jd') ||
    m.includes('role') ||
    m.includes('hiring') ||
    m.includes('candidate') ||
    m.includes('requirements') ||
    m.length > 280
  );
}

function analyzeFit(profile: AgentProfile, jobText: string): string {
  const catalog = uniqueSkills(profile);
  const required = extractSkillsFromText(jobText, [
    ...catalog,
    ...Object.keys(SKILL_ALIASES).map((k) => k.replace(/^\w/, (c) => c.toUpperCase())),
  ]);

  const profileBlob = normalize(
    [
      profile.bio,
      profile.title,
      ...catalog,
      ...profile.experience.flatMap((e) => [e.role, e.summary, ...e.highlights]),
      ...profile.projects.flatMap((p) => [p.title, p.description, ...p.tags]),
    ].join(' ')
  );

  const matched: string[] = [];
  const gaps: string[] = [];

  for (const skill of required) {
    const aliases = SKILL_ALIASES[normalize(skill)] ?? [normalize(skill)];
    const hit = aliases.some((a) => profileBlob.includes(a)) || profileBlob.includes(normalize(skill));
    if (hit) matched.push(skill);
    else gaps.push(skill);
  }

  // If JD was short / few extracted skills, still score against common signals
  if (required.length === 0) {
    return [
      `I couldn't extract clear skill requirements from that text.`,
      ``,
      `Paste a fuller job description (responsibilities + requirements), or ask something like:`,
      `- "Summarize ${profile.name}'s AI experience"`,
      `- "What projects involve RAG or multi-agent systems?"`,
    ].join('\n');
  }

  const score = Math.round((matched.length / required.length) * 100);
  let verdict = 'Partial fit';
  if (score >= 75) verdict = 'Strong fit';
  else if (score >= 50) verdict = 'Good fit with some gaps';
  else if (score < 35) verdict = 'Weak fit on stated requirements';

  const relevantExp = profile.experience
    .filter((e) => {
      const blob = normalize([e.role, e.summary, ...e.highlights].join(' '));
      return matched.some((s) => blob.includes(normalize(s).slice(0, 12)));
    })
    .slice(0, 2);

  const relevantProjects = profile.projects
    .filter((p) => matched.some((s) => normalize([p.title, p.description, ...p.tags].join(' ')).includes(normalize(s))))
    .slice(0, 3);

  const lines = [
    `Fit assessment for ${profile.name}`,
    ``,
    `Verdict: ${verdict} (~${score}% of detected requirements overlap)`,
    ``,
    `Matched signals (${matched.length}): ${matched.join(', ') || '—'}`,
    `Possible gaps (${gaps.length}): ${gaps.join(', ') || 'None detected'}`,
    ``,
  ];

  if (relevantExp.length) {
    lines.push(`Relevant experience`);
    for (const e of relevantExp) {
      lines.push(`- ${e.role} @ ${e.company} (${e.period}) — ${e.summary}`);
    }
    lines.push(``);
  }

  if (relevantProjects.length) {
    lines.push(`Relevant projects`);
    for (const p of relevantProjects) {
      lines.push(`- ${p.title}: ${p.description}`);
    }
    lines.push(``);
  }

  lines.push(
    `Notes: This is a heuristic agent running in your browser against ${profile.name}'s public portfolio data — not a guarantee of hireability. Use it to frame interview questions, then review the resume and speak with the candidate.`
  );

  return lines.join('\n');
}

function answerAboutProfile(profile: AgentProfile, message: string): string {
  const m = normalize(message);

  if (m.includes('contact') || m.includes('email') || m.includes('reach') || m.includes('linkedin')) {
    return [
      `You can reach ${profile.name} at:`,
      `- Email: ${profile.email || 'see resume'}`,
      `- LinkedIn: ${profile.linkedin || 'see portfolio'}`,
      `- GitHub: ${profile.github}`,
      `- Resume: available from the site Resume button`,
    ].join('\n');
  }

  if (m.includes('educat') || m.includes('degree') || m.includes('school') || m.includes('college')) {
    return `${profile.name}'s education: ${profile.education}. Background is chemistry (BS/MS), now applied to scientific AI and data enablement.`;
  }

  if (m.includes('project')) {
    return [
      `Featured / listed projects:`,
      ...profile.projects.map((p) => `- ${p.title} (${p.tags.join(', ')}): ${p.description}`),
    ].join('\n');
  }

  if (
    m.includes('experience') ||
    m.includes('work history') ||
    m.includes('career') ||
    m.includes('regeneron') ||
    m.includes('merck')
  ) {
    return [
      `${profile.name}'s experience:`,
      ...profile.experience.map(
        (e) =>
          `- ${e.role} — ${e.company} (${e.period})\n  ${e.summary}\n  Highlights: ${e.highlights.slice(0, 2).join('; ')}`
      ),
    ].join('\n');
  }

  if (m.includes('skill') || m.includes('tech') || m.includes('stack')) {
    return [
      `Core skills and tools:`,
      profile.skills.map((s) => `- ${s}`).join('\n'),
      ``,
      `Title: ${profile.title}`,
      `Focus: ${profile.bio}`,
    ].join('\n');
  }

  if (m.includes('who') || m.includes('about') || m.includes('summary') || m.includes('overview')) {
    return [
      `${profile.name} — ${profile.title}`,
      profile.bio,
      ``,
      `Based in ${profile.location}. Currently at ${profile.employer}.`,
      `Education: ${profile.education}.`,
    ].join('\n');
  }

  // Keyword retrieval over profile chunks
  const chunks = [
    profile.bio,
    ...profile.experience.flatMap((e) => [`${e.role} at ${e.company}: ${e.summary}`, ...e.highlights]),
    ...profile.projects.map((p) => `${p.title}: ${p.description} [${p.tags.join(', ')}]`),
  ];

  const tokens = m.split(/\W+/).filter((t) => t.length > 3);
  const scored = chunks
    .map((chunk) => {
      const c = normalize(chunk);
      const hits = tokens.filter((t) => c.includes(t)).length;
      return { chunk, hits };
    })
    .filter((x) => x.hits > 0)
    .sort((a, b) => b.hits - a.hits)
    .slice(0, 4);

  if (scored.length) {
    return [
      `Based on ${profile.name}'s portfolio:`,
      ...scored.map((s) => `- ${s.chunk}`),
      ``,
      `Tip: paste a job description and ask “Is this candidate a good fit for this position?” for a structured fit report.`,
    ].join('\n');
  }

  return [
    `I can help with questions about ${profile.name}'s fit, experience, skills, projects, education, or contact info.`,
    ``,
    `Try:`,
    `- Paste a job description, then ask: “Is this candidate a good fit for this position?”`,
    `- “Summarize AI and data experience”`,
    `- “What projects use LangGraph or RAG?”`,
  ].join('\n');
}

/** Main agent entry: job-fit analysis or profile Q&A. */
export function runFitAgent(profile: AgentProfile, userMessage: string): string {
  const text = userMessage.trim();
  if (!text) return 'Ask a question, or paste a job description to evaluate fit.';

  if (isFitRequest(text)) {
    // If message is mostly a JD, analyze whole thing; if short question + JD after separator, split
    const parts = text.split(/\n{2,}|---+|Job description:/i);
    const jobText = parts.length > 1 ? parts.slice(1).join('\n') : text;
    if (normalize(jobText).length > 120 || parts.length > 1) {
      return analyzeFit(profile, jobText.length > 80 ? jobText : text);
    }
  }

  return answerAboutProfile(profile, text);
}
