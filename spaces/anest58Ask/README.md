---
title: Anest58Ask
emoji: 🧪
colorFrom: green
colorTo: blue
sdk: gradio
sdk_version: 5.49.1
app_file: app.py
pinned: false
license: mit
short_description: LLM fit agent for Anthony's portfolio
tags:
  - agent
  - portfolio
  - hiring
  - scientific-ai
  - llm
---

# Anest58Ask

Real LLM portfolio fit agent for **Anthony** (Data Enablement Scientist / Scientific AI).

Paste a job description and ask whether the candidate is a good fit, or ask open questions about experience, skills, and projects.

Uses **Hugging Face Inference Providers** with Anthony's portfolio as system context.

## Setup

1. Space secret: `HF_TOKEN` = a Hugging Face token with inference access
2. Optional vars:
   - `ASK_MODEL` (default `Qwen/Qwen2.5-72B-Instruct`)
   - `ASK_PROVIDER` (default `auto`)

## Links

- Live Space: https://huggingface.co/spaces/Andominus58/anest58Ask
- Portfolio: https://anest58.github.io/
- Source: `spaces/anest58Ask/` in [ANest58/anest58.github.io](https://github.com/ANest58/anest58.github.io)
