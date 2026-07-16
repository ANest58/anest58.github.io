---
title: Anest58Ask
emoji: 🐠
colorFrom: purple
colorTo: indigo
sdk: gradio
sdk_version: '6.20.0'
python_version: '3.12'
app_file: app.py
pinned: false
short_description: Portfolio fit agent for Anthony
---

# Anest58Ask — Portfolio Fit Agent

Gradio Space for the portfolio **Ask** page at https://anest58.github.io/ask/

Uses **Hugging Face Inference Providers** (CPU Space + `HF_TOKEN` secret). No GPU required.

## Secrets

- `HF_TOKEN` — fine-grained token with Inference Providers permission
- Optional: `HF_MODEL` (default `moonshotai/Kimi-K2-Instruct:fastest`)
