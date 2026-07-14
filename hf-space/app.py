"""Portfolio fit agent Space — free LLM via Hugging Face Inference Providers."""

from __future__ import annotations

import os

import gradio as gr
from huggingface_hub import InferenceClient

# Keep in sync with src/data/site.ts + projects on the portfolio site.
PROFILE = """
Name: Anthony
Title: Data Enablement Scientist | Scientific AI & Computing
Location: Tarrytown, NY
Employer: Regeneron
Education: BS/MS Chemistry — The City College of New York
Bio: Building AI-enabled scientific tools, data pipelines, and multi-agent systems that turn complex laboratory data into scalable workflows — with experience across R&D, IT, and CMC in GMP-regulated environments.
Contact: anesturi@gmail.com | https://www.linkedin.com/in/anthony-nesturi/ | https://github.com/ANest58
Skills: LangChain, LangGraph, RAG, Multi-Agent Systems, Python, PyTorch, SQL, ETL, Prompt Engineering, Tool Calling, MCP, ChromaDB, Scikit-learn, CNN, OCR, Computer Vision, SQL Server, LIMS, ELN, Vector Search, Flask, Gradio, Streamlit, Docker, AWS, Azure, Proxmox

EXPERIENCE
- Scientist — Scientific AI & Data Enablement @ Regeneron (Feb 2023 – Present): Drug Product Development and Technology AI platforms, pipelines, GMP data systems.
  Highlights: OCR+LLM lab notebook IDP; LangChain/LangGraph/RAG multi-agent platform; CNN particle imaging; LIMS/ELN ETL to Tableau/Power BI; SQL Server for GMP data.
- Associate Scientist — Ophthalmic Products @ Regeneron (Jan 2020 – Feb 2023): Formulation development for biologics.
- Scientist — Pre-formulation Sciences @ Merck (Feb 2018 – Jan 2020): Sterile injectable pre-formulation and biophysical characterization.

PROJECTS
- AgenticFlow: Multi-agent AI with LangChain, LangGraph, RAG for scientific knowledge workflows.
- HomeLab AI: Local LLMs and edge agent tooling.
- Notebook IDP: OCR + LLM handwritten lab notebooks with synchronized PDF review.
- Home Lab GPU cluster: Proxmox GPU cluster for local LLMs, multi-agent systems, and RAG.
""".strip()

SYSTEM_PROMPT = f"""You are a portfolio fit agent for Anthony.
Answer only from the profile facts below. If something is unknown, say so.
When the user pastes a job description or asks about fit, produce a structured assessment:
Verdict, Matched skills, Gaps, Relevant experience, Relevant projects, and a short interview tip.
Keep answers concise (under ~350 words unless asked for more). Be professional and specific.

PROFILE
{PROFILE}
"""

MODEL = os.environ.get("HF_MODEL", "Qwen/Qwen2.5-7B-Instruct:fastest")
HF_TOKEN = os.environ.get("HF_TOKEN") or os.environ.get("HUGGINGFACE_API_KEY")


def respond(message: str, history: list[dict[str, str]]):
    if not HF_TOKEN:
        return (
            "This Space is missing the `HF_TOKEN` secret. "
            "Add a fine-grained Hugging Face token with Inference Providers permission "
            "under Settings → Secrets, then restart the Space."
        )

    client = InferenceClient(api_key=HF_TOKEN)
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for turn in history:
        role = turn.get("role")
        content = turn.get("content")
        if role in {"user", "assistant"} and content:
            messages.append({"role": role, "content": content})
    messages.append({"role": "user", "content": message})

    try:
        completion = client.chat_completion(
            model=MODEL,
            messages=messages,
            max_tokens=900,
            temperature=0.3,
        )
        return completion.choices[0].message.content or "Empty model response."
    except Exception as exc:  # noqa: BLE001 — surface provider errors in the UI
        return f"Inference error: {exc}"


demo = gr.ChatInterface(
    fn=respond,
    title="Ask about Anthony — Fit Agent",
    description=(
        "Free LLM agent grounded in Anthony’s public portfolio. "
        "Paste a job description and ask about fit, or ask about skills, experience, and projects."
    ),
    examples=[
        ["Summarize AI and data enablement experience"],
        ["What projects involve RAG or multi-agent systems?"],
        ["Is this candidate a good fit for a LangGraph / RAG scientist role?"],
    ],
    theme=gr.themes.Soft(),
)

if __name__ == "__main__":
    demo.launch()
