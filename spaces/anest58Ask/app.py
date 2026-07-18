"""
Anest58Ask — real LLM portfolio fit agent (HF Inference Providers).
"""

from __future__ import annotations

import json
import logging
import os
from datetime import datetime, timezone
from typing import Any
from uuid import uuid4

import gradio as gr
import spaces
from huggingface_hub import HfApi, InferenceClient

logger = logging.getLogger("anest58ask")

# ZeroGPU Spaces require at least one @spaces.GPU symbol at startup.
# Inference itself uses HF Inference Providers (HTTP), not this GPU slot.
@spaces.GPU(duration=10)
def _zerogpu_placeholder() -> str:
    return "ok"


PROFILE: dict[str, Any] = {
    "name": "Anthony",
    "title": "Data Enablement Scientist | Scientific AI & Computing",
    "bio": (
        "Building AI-enabled scientific tools, data pipelines, and multi-agent systems "
        "that turn complex laboratory data into scalable workflows — with experience "
        "across R&D, IT, and CMC in GMP-regulated environments."
    ),
    "location": "Tarrytown, NY",
    "employer": "Regeneron",
    "education": "BS/MS Chemistry — The City College of New York",
    "email": "anesturi@gmail.com",
    "linkedin": "https://www.linkedin.com/in/anthony-nesturi/",
    "github": "https://github.com/ANest58",
    "portfolio": "https://anest58.github.io/",
    "resume": "https://anest58.github.io/resume/Anthony-Resume.docx",
    "skills": [
        "LangChain",
        "LangGraph",
        "RAG",
        "Multi-Agent Systems",
        "Python",
        "PyTorch",
        "SQL",
        "ETL",
        "Prompt Engineering",
        "Tool Calling",
        "MCP",
        "ChromaDB",
        "Scikit-learn",
        "CNN",
        "OCR",
        "Computer Vision",
        "KNN",
        "SVM",
        "SQL Server",
        "LIMS",
        "ELN",
        "Vector Search",
        "Knowledge Graphs",
        "Flask",
        "Gradio",
        "Streamlit",
        "JavaScript",
        "Tableau",
        "Power BI",
        "JMP",
        "Docker",
        "AWS",
        "Azure",
        "Linux",
        "Git",
        "Proxmox",
        "Slurm",
        "Docker Swarm",
        "GPU",
        "OpenMPI",
        "cudnn",
        "Cuda",
    ],
    "experience": [
        {
            "period": "Feb 2023 – Present",
            "role": "Scientist — Scientific AI & Data Enablement",
            "company": "Regeneron",
            "location": "Tarrytown, NY",
            "summary": (
                "Drug Product Development and Technology: partnering across R&D and IT "
                "to deliver AI platforms, data pipelines, and GMP-compliant data systems."
            ),
            "highlights": [
                "Built an Intelligent Document Processing platform for handwritten lab notebooks (OCR + LLM) with synchronized PDF review.",
                "Architected a multi-agent AI platform with LangChain, LangGraph, and RAG for scientific knowledge and automated reports.",
                "Deployed a CNN-based particle image analysis solution after evaluating KNN, SVM, and CNN architectures.",
                "Developed Python ETL pipelines from LIMS/ELN into Tableau and Power BI–ready datasets.",
                "Administered Microsoft SQL Server environments for GMP-compliant scientific data.",
            ],
        },
        {
            "period": "Jan 2020 – Feb 2023",
            "role": "Associate Scientist — Ophthalmic Products",
            "company": "Regeneron",
            "location": "Tarrytown, NY",
            "summary": (
                "Formulation development for biologics supporting IND-enabling work, "
                "stability studies, and regulatory documentation."
            ),
            "highlights": [
                "Led statistical analyses in JMP (DOE, regression, multivariate) to optimize formulation stability.",
                "Project lead for mAb, trap, and mixed-modality (AAV-LNP) formulations across multiple routes of administration.",
                "Authored tech transfer reports, clinical support summaries, and formulation sections for IND/BLA filings.",
            ],
        },
        {
            "period": "Feb 2018 – Jan 2020",
            "role": "Scientist — Pre-formulation Sciences",
            "company": "Merck",
            "location": "Kenilworth, NJ",
            "summary": (
                "Sterile injectable pre-formulation: analytical method development, "
                "biophysical characterization, and high-throughput screening."
            ),
            "highlights": [
                "Supported scale-up and tech transfer with pumping evaluations and subvisible particle analysis (HIAC, MFI).",
                "Developed biophysical/biochemical methods including SEC-MALS, ITC, nCD, DSC, and DLS.",
                "Programmed liquid-handling robotics for high-throughput formulation stability screening.",
            ],
        },
        {
            "period": "2011 – 2014 / 2006 – 2010",
            "role": "MS & BS Chemistry",
            "company": "The City College of New York",
            "location": "New York, NY",
            "summary": (
                "Graduate and undergraduate training in chemistry, forming the foundation "
                "for scientific computing and formulation science."
            ),
            "highlights": [
                "Master of Science in Chemistry (2011–2014).",
                "Bachelor of Science in Chemistry (2006–2010).",
            ],
        },
    ],
    "projects": [
        {
            "title": "AgenticFlow",
            "description": "Multi-agent AI platform exploring LangChain, LangGraph, and RAG patterns for structured scientific knowledge workflows.",
            "tags": ["LangGraph", "LangChain", "RAG", "Python"],
        },
        {
            "title": "PiBrain",
            "description": "Home AI / edge-compute experiments spanning local LLMs, notes, and Raspberry Pi–oriented agent tooling.",
            "tags": ["Python", "Local LLMs", "Edge AI"],
        },
        {
            "title": "Intelligent Document Processing",
            "description": "OCR + LLM platform for handwritten laboratory notebooks with synchronized side-by-side PDF review for scientist validation.",
            "tags": ["OCR", "LLM", "IDP", "Web App"],
        },
        {
            "title": "Particle Image CNN",
            "description": "Machine learning pipeline for automated particle image analysis — evaluated KNN, SVM, and CNN architectures and deployed an optimized CNN with IT.",
            "tags": ["PyTorch", "CNN", "Computer Vision", "ML"],
        },
        {
            "title": "Scientific ETL Pipelines",
            "description": "Python ETL integrating LIMS samples and ELN (CSV/PDF) data into analysis-ready datasets for Tableau and Power BI reporting.",
            "tags": ["Python", "ETL", "SQL", "LIMS"],
        },
        {
            "title": "Home AI Laboratory",
            "description": "Proxmox-based GPU compute cluster for local LLMs, multi-agent systems, RAG architectures, and scientific AI workflows.",
            "tags": ["Proxmox", "Docker", "Local LLMs", "RAG"],
        },
    ],
}

# Strong open chat model available via HF Inference Providers
MODEL_ID = os.environ.get("ASK_MODEL", "Qwen/Qwen2.5-72B-Instruct")
PROVIDER = os.environ.get("ASK_PROVIDER", "auto")

# Q&A logs → private HF Dataset (one JSON file per turn). Set ASK_LOG_ENABLED=0 to disable.
LOG_DATASET = os.environ.get("ASK_LOG_DATASET", "Andominus58/anest58ask-qa-logs").strip()
LOG_ENABLED = os.environ.get("ASK_LOG_ENABLED", "1").strip().lower() not in {"0", "false", "off", ""}


def _hf_token() -> str | None:
    return os.environ.get("HF_TOKEN") or os.environ.get("HUGGINGFACE_HUB_TOKEN")


def log_qa(question: str, answer: str, *, error: bool = False) -> None:
    """Append a Q&A turn to a private Hugging Face Dataset (best-effort)."""
    if not LOG_ENABLED or not LOG_DATASET:
        return
    token = _hf_token()
    if not token:
        return
    try:
        api = HfApi(token=token)
        api.create_repo(repo_id=LOG_DATASET, repo_type="dataset", private=True, exist_ok=True)
        now = datetime.now(timezone.utc)
        record = {
            "id": uuid4().hex,
            "timestamp": now.isoformat(),
            "model": MODEL_ID,
            "provider": PROVIDER,
            "question": question,
            "answer": answer,
            "error": error,
        }
        path = f"logs/{now.strftime('%Y/%m/%d')}/{record['id']}.json"
        api.upload_file(
            path_or_fileobj=json.dumps(record, ensure_ascii=False, indent=2).encode("utf-8"),
            path_in_repo=path,
            repo_id=LOG_DATASET,
            repo_type="dataset",
            commit_message=f"log qa {record['id'][:8]}",
        )
    except Exception:  # noqa: BLE001 — never break chat on logging failure
        logger.exception("Failed to write Q&A log to dataset %s", LOG_DATASET)


def build_system_prompt(profile: dict[str, Any]) -> str:
    exp_blocks = []
    for e in profile["experience"]:
        bullets = "\n".join(f"  - {h}" for h in e["highlights"])
        exp_blocks.append(
            f"- {e['role']} @ {e['company']} ({e['period']}, {e['location']})\n"
            f"  {e['summary']}\n{bullets}"
        )

    project_blocks = [
        f"- {p['title']} [{', '.join(p['tags'])}]: {p['description']}" for p in profile["projects"]
    ]

    return f"""You are Anest58Ask, a helpful hiring assistant for {profile['name']}'s portfolio.

Candidate profile (ground truth — do not invent employers, degrees, or projects):
Name: {profile['name']}
Title: {profile['title']}
Location: {profile['location']}
Current employer: {profile['employer']}
Education: {profile['education']}
Bio: {profile['bio']}
Skills: {', '.join(profile['skills'])}
Contact: email {profile['email']}; LinkedIn {profile['linkedin']}; GitHub {profile['github']}
Portfolio: {profile['portfolio']}
Resume: {profile['resume']}

Experience:
{chr(10).join(exp_blocks)}

Projects:
{chr(10).join(project_blocks)}

Instructions:
- Answer naturally and specifically using only the profile above.
- If the user pastes a job description / asks about fit, give a clear verdict (strong / good / partial / weak), matched strengths, gaps, and suggested interview questions.
- Be honest about gaps; never fabricate experience.
- Keep answers concise unless the user asks for depth.
- If asked for contact info, share the links above.
"""


SYSTEM_PROMPT = build_system_prompt(PROFILE)


def get_client() -> InferenceClient:
    token = _hf_token()
    if not token:
        raise RuntimeError(
            "Missing HF_TOKEN Space secret. Add a write/read token under "
            "Space Settings → Variables and secrets → HF_TOKEN."
        )
    kwargs: dict[str, Any] = {"token": token}
    if PROVIDER and PROVIDER != "auto":
        kwargs["provider"] = PROVIDER
    return InferenceClient(**kwargs)


def history_to_messages(history: list[dict[str, str]] | None) -> list[dict[str, str]]:
    messages: list[dict[str, str]] = [{"role": "system", "content": SYSTEM_PROMPT}]
    for turn in history or []:
        role = turn.get("role")
        content = turn.get("content")
        if role in {"user", "assistant"} and content:
            messages.append({"role": role, "content": content})
    return messages


def chat(message: str, history: list[dict[str, str]]):
    history = list(history or [])
    text = (message or "").strip()
    if not text:
        return history, ""

    history.append({"role": "user", "content": text})

    errored = False
    try:
        client = get_client()
        completion = client.chat.completions.create(
            model=MODEL_ID,
            messages=[*history_to_messages(history[:-1]), {"role": "user", "content": text}],
            max_tokens=1024,
            temperature=0.4,
        )
        reply = completion.choices[0].message.content or "(empty model response)"
    except Exception as exc:  # noqa: BLE001 — show usable error in UI
        errored = True
        reply = (
            "I couldn't reach the LLM provider.\n\n"
            f"Details: {exc}\n\n"
            "Fix: set Space secret `HF_TOKEN` (Hugging Face access token with inference permission), "
            "then restart the Space."
        )

    log_qa(text, reply, error=errored)
    history.append({"role": "assistant", "content": reply})
    return history, ""


EXAMPLES = [
    "Summarize Anthony's AI and data enablement experience in 5 bullets.",
    "What projects involve RAG or multi-agent systems?",
    "How can I contact Anthony?",
    (
        "Is this candidate a good fit for this position?\n\n"
        "Job description:\n"
        "We need a Scientific AI / Data Enablement Scientist experienced with Python, "
        "LangChain/LangGraph, RAG, OCR/document AI, SQL, ETL, and collaboration with IT "
        "in GMP-regulated environments."
    ),
]

with gr.Blocks(title="Anest58Ask — Portfolio Fit Agent", theme=gr.themes.Soft()) as demo:
    gr.Markdown(
        f"""
# Ask about {PROFILE["name"]}
**{PROFILE["title"]}**

Powered by a real LLM (`{MODEL_ID}`) with Anthony's portfolio as context.
Paste a job description and ask about fit, or ask open questions about experience and skills.

Portfolio: [anest58.github.io](https://anest58.github.io/) · GitHub: [ANest58](https://github.com/ANest58)
"""
    )
    chatbot = gr.Chatbot(height=460, label="Fit agent (LLM)", type="messages")
    msg = gr.Textbox(
        label="Your question or job description",
        placeholder='Paste a JD, then ask: "Is this candidate a good fit for this position?"',
        lines=6,
    )
    with gr.Row():
        send = gr.Button("Ask agent", variant="primary")
        clear = gr.Button("Clear")

    gr.Examples(examples=EXAMPLES, inputs=msg, label="Try these")

    send.click(chat, inputs=[msg, chatbot], outputs=[chatbot, msg])
    msg.submit(chat, inputs=[msg, chatbot], outputs=[chatbot, msg])
    clear.click(lambda: ([], ""), outputs=[chatbot, msg])

if __name__ == "__main__":
    demo.launch(ssr_mode=False)
