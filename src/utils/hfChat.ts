import type { AgentProfile } from '~/utils/fitAgent';
import { hfAgent } from '~/data/hfAgent';

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

function truncate(text: string, max: number): string {
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

/** Build a grounded system prompt from the public portfolio profile. */
export function buildFitAgentSystemPrompt(profile: AgentProfile): string {
  const experience = profile.experience
    .map(
      (e) =>
        `- ${e.role} @ ${e.company} (${e.period}, ${e.location}): ${e.summary}\n  Highlights: ${e.highlights.join('; ')}`
    )
    .join('\n');

  const projects = profile.projects.map((p) => `- ${p.title} [${p.tags.join(', ')}]: ${p.description}`).join('\n');

  return [
    `You are a portfolio fit agent for ${profile.name}, ${profile.title}.`,
    `Answer only from the profile facts below. If something is unknown, say so.`,
    `When the user pastes a job description or asks about fit, produce a structured assessment: Verdict, Matched skills, Gaps, Relevant experience, Relevant projects, and a short interview tip.`,
    `Keep answers concise (under ~350 words unless the user asks for more). Be professional and specific.`,
    ``,
    `PROFILE`,
    `Name: ${profile.name}`,
    `Title: ${profile.title}`,
    `Location: ${profile.location}`,
    `Employer: ${profile.employer}`,
    `Education: ${profile.education}`,
    `Bio: ${profile.bio}`,
    `Contact: ${profile.email} | ${profile.linkedin} | ${profile.github}`,
    `Skills: ${profile.skills.join(', ')}`,
    ``,
    `EXPERIENCE`,
    experience,
    ``,
    `PROJECTS`,
    projects,
  ].join('\n');
}

export type HfChatResult =
  | { ok: true; content: string; source: 'huggingface' }
  | { ok: false; error: string; status?: number };

/**
 * Call Hugging Face Inference Providers (OpenAI-compatible chat completions).
 * Requires a fine-grained token with Inference Providers permission.
 */
export async function chatWithHuggingFace(options: {
  token: string;
  userMessage: string;
  profile: AgentProfile;
  model?: string;
  history?: ChatMessage[];
}): Promise<HfChatResult> {
  const token = options.token.trim();
  if (!token) {
    return { ok: false, error: 'Missing Hugging Face token.' };
  }

  const messages: ChatMessage[] = [
    { role: 'system', content: buildFitAgentSystemPrompt(options.profile) },
    ...(options.history ?? []).filter((m) => m.role !== 'system'),
    { role: 'user', content: truncate(options.userMessage, 12_000) },
  ];

  try {
    const response = await fetch(hfAgent.routerUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: options.model ?? hfAgent.model,
        messages,
        max_tokens: hfAgent.maxTokens,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const detail = truncate(await response.text().catch(() => ''), 400);
      let error = `Hugging Face request failed (${response.status}).`;
      if (response.status === 401)
        error = 'Invalid Hugging Face token. Create a fine-grained token with Inference Providers permission.';
      else if (response.status === 402)
        error =
          'Inference credits exhausted on this Hugging Face account. Wait for reset or upgrade, or use the local agent.';
      else if (response.status === 429) error = 'Rate limited by Hugging Face. Try again in a moment.';
      else if (detail) error = `${error} ${detail}`;
      return { ok: false, error, status: response.status };
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content?.trim();
    if (!content) {
      return { ok: false, error: 'Hugging Face returned an empty response.' };
    }

    return { ok: true, content, source: 'huggingface' };
  } catch {
    return {
      ok: false,
      error: 'Could not reach Hugging Face Inference Providers. Check your network or try the local agent.',
    };
  }
}

export function getSpaceEmbedUrl(spaceId: string): string | null {
  const id = spaceId.trim();
  if (!id || !id.includes('/')) return null;
  return `https://huggingface.co/spaces/${id}`;
}

export function getSpaceAppUrl(spaceId: string): string | null {
  const id = spaceId.trim();
  if (!id || !id.includes('/')) return null;
  // Direct Gradio app iframe host
  return `https://${id.replace('/', '-')}.hf.space`;
}
