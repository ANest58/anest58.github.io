---
title: Portfolio Fit Agent
emoji: 🧭
colorFrom: blue
colorTo: indigo
sdk: gradio
sdk_version: "5.49.1"
app_file: app.py
pinned: false
short_description: Free LLM fit agent for a scientific AI portfolio
---

# Portfolio Fit Agent (Hugging Face Space)

This Gradio Space powers the LLM backend for the portfolio **Ask** page.

## Setup (free)

1. Create a Space at [huggingface.co/new-space](https://huggingface.co/new-space)  
   - SDK: **Gradio**  
   - Hardware: **CPU basic** (free)  
   - Visibility: Public (or Protected)

2. Upload everything in this `hf-space/` folder (`app.py`, `requirements.txt`, `README.md`).

3. In **Settings → Secrets**, add:
   - `HF_TOKEN` — fine-grained token with **Make calls to Inference Providers**  
     Create one: https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained

4. Optional Space variables / secrets:
   - `HF_MODEL` — default `Qwen/Qwen2.5-7B-Instruct:fastest`
   - Update `PROFILE` in `app.py` if you want different portfolio facts than the baked-in copy.

5. On the Astro site, set:

```bash
PUBLIC_HF_SPACE_ID=your-username/portfolio-fit-agent
```

Rebuild/redeploy the GitHub Pages site. The Ask page will embed this Space.

## Without embedding

You can also use the Ask page chat UI with a visitor- or build-time HF token (`PUBLIC_HF_TOKEN`) — no Space required. See `.env.example` in the site repo.
