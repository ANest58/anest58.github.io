/**
 * Hugging Face Fit Agent connection settings.
 *
 * Setup (free tier):
 * 1. Create a token at https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained
 *    with “Make calls to Inference Providers” enabled.
 * 2. Either paste it in the Ask page “Connect Hugging Face” panel (stored only in your browser),
 *    or set PUBLIC_HF_TOKEN at build time (GitHub Pages → exposes the token in the built JS; use only for a personal demo).
 * 3. Optional: deploy `hf-space/` to a Hugging Face Space and set `spaceId` below to embed it.
 */

export const hfAgent = {
  /** Preferred free chat model via Inference Providers (`:fastest` picks a live provider). */
  model: 'Qwen/Qwen2.5-7B-Instruct:fastest',

  /**
   * Your HF Space id after deploying `hf-space/` (e.g. `your-username/portfolio-fit-agent`).
   * When set, the Ask page can embed that Space. Leave empty until the Space exists.
   */
  spaceId: '',

  /** OpenAI-compatible HF Inference Providers gateway. */
  routerUrl: 'https://router.huggingface.co/v1/chat/completions',

  /** Max tokens for each agent reply. */
  maxTokens: 900,

  /** localStorage key for an optional visitor-provided HF token. */
  tokenStorageKey: 'aw_hf_inference_token',
} as const;

export type HfAgentConfig = typeof hfAgent;
