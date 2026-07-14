"""
Anest58Ask — browser/Space fit agent for Anthony's portfolio.
Heuristic Q&A + job-description overlap scoring (no GPU required).
"""

from __future__ import annotations

import re
from typing import Any

import gradio as gr
import spaces


@spaces.GPU(duration=10)
def _zerogpu_placeholder() -> str:
    """ZeroGPU Spaces require at least one @spaces.GPU function at startup.
    This agent is CPU-only and does not call this from the UI.
    """
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

SKILL_ALIASES: dict[str, list[str]] = {
    "python": ["python", "py"],
    "javascript": ["javascript", "js", "typescript", "ts"],
    "sql": ["sql", "sql server", "mssql", "t-sql"],
    "langchain": ["langchain"],
    "langgraph": ["langgraph"],
    "rag": ["rag", "retrieval-augmented", "retrieval augmented"],
    "multi-agent": ["multi-agent", "multi agent", "agentic", "agents"],
    "pytorch": ["pytorch", "torch"],
    "etl": ["etl", "data pipeline", "pipelines"],
    "ocr": ["ocr", "document processing", "idp"],
    "computer vision": ["computer vision", "cv", "cnn", "image analysis"],
    "docker": ["docker", "container"],
    "aws": ["aws", "amazon web services"],
    "azure": ["azure"],
    "lims": ["lims"],
    "eln": ["eln"],
    "gmp": ["gmp", "regulated", "compliance"],
    "flask": ["flask"],
    "streamlit": ["streamlit"],
    "gradio": ["gradio"],
    "tableau": ["tableau"],
    "power bi": ["power bi", "powerbi"],
    "jmp": ["jmp", "doe", "design of experiments"],
    "llm": ["llm", "large language", "generative ai", "genai"],
    "ml": ["machine learning", "ml ", " deep learning"],
    "formulation": ["formulation", "biologics", "drug product"],
    "proxmox": ["proxmox", "home lab", "gpu cluster"],
}


def normalize(text: str) -> str:
    return re.sub(r"\s+", " ", text.lower()).strip()


def unique_skills(profile: dict[str, Any]) -> list[str]:
    from_stack = list(profile["skills"])
    from_projects = [tag for p in profile["projects"] for tag in p["tags"]]
    return list(dict.fromkeys([*from_stack, *from_projects]))


def extract_skills_from_text(text: str, catalog: list[str]) -> list[str]:
    hay = normalize(text)
    found: set[str] = set()

    for skill in catalog:
        key = normalize(skill)
        if len(key) >= 2 and key in hay:
            found.add(skill)

    for label, aliases in SKILL_ALIASES.items():
        if any(a in hay for a in aliases):
            match = next(
                (s for s in catalog if label in normalize(s) or normalize(s) in label),
                label,
            )
            found.add(match)

    return list(found)


def is_fit_request(message: str) -> bool:
    m = normalize(message)
    return any(
        token in m
        for token in (
            "fit",
            "position",
            "job description",
            "jd",
            "role",
            "hiring",
            "candidate",
            "requirements",
        )
    ) or len(m) > 280


def analyze_fit(profile: dict[str, Any], job_text: str) -> str:
    catalog = unique_skills(profile)
    alias_labels = [k[:1].upper() + k[1:] for k in SKILL_ALIASES]
    required = extract_skills_from_text(job_text, [*catalog, *alias_labels])

    profile_blob = normalize(
        " ".join(
            [
                profile["bio"],
                profile["title"],
                *catalog,
                *[
                    part
                    for e in profile["experience"]
                    for part in [e["role"], e["summary"], *e["highlights"]]
                ],
                *[
                    part
                    for p in profile["projects"]
                    for part in [p["title"], p["description"], *p["tags"]]
                ],
            ]
        )
    )

    matched: list[str] = []
    gaps: list[str] = []
    for skill in required:
        aliases = SKILL_ALIASES.get(normalize(skill), [normalize(skill)])
        hit = any(a in profile_blob for a in aliases) or normalize(skill) in profile_blob
        (matched if hit else gaps).append(skill)

    if not required:
        return "\n".join(
            [
                "I couldn't extract clear skill requirements from that text.",
                "",
                "Paste a fuller job description (responsibilities + requirements), or ask something like:",
                f'- "Summarize {profile["name"]}\'s AI experience"',
                '- "What projects involve RAG or multi-agent systems?"',
            ]
        )

    score = round(len(matched) / len(required) * 100)
    if score >= 75:
        verdict = "Strong fit"
    elif score >= 50:
        verdict = "Good fit with some gaps"
    elif score < 35:
        verdict = "Weak fit on stated requirements"
    else:
        verdict = "Partial fit"

    relevant_exp = []
    for e in profile["experience"]:
        blob = normalize(" ".join([e["role"], e["summary"], *e["highlights"]]))
        if any(normalize(s)[:12] in blob for s in matched):
            relevant_exp.append(e)
        if len(relevant_exp) == 2:
            break

    relevant_projects = []
    for p in profile["projects"]:
        blob = normalize(" ".join([p["title"], p["description"], *p["tags"]]))
        if any(normalize(s) in blob for s in matched):
            relevant_projects.append(p)
        if len(relevant_projects) == 3:
            break

    lines = [
        f"Fit assessment for {profile['name']}",
        "",
        f"Verdict: {verdict} (~{score}% of detected requirements overlap)",
        "",
        f"Matched signals ({len(matched)}): {', '.join(matched) or '—'}",
        f"Possible gaps ({len(gaps)}): {', '.join(gaps) or 'None detected'}",
        "",
    ]

    if relevant_exp:
        lines.append("Relevant experience")
        for e in relevant_exp:
            lines.append(
                f"- {e['role']} @ {e['company']} ({e['period']}) — {e['summary']}"
            )
        lines.append("")

    if relevant_projects:
        lines.append("Relevant projects")
        for p in relevant_projects:
            lines.append(f"- {p['title']}: {p['description']}")
        lines.append("")

    lines.append(
        f"Notes: This is a heuristic agent against {profile['name']}'s public portfolio data — "
        "not a guarantee of hireability. Use it to frame interview questions, then review the resume "
        "and speak with the candidate."
    )
    return "\n".join(lines)


def answer_about_profile(profile: dict[str, Any], message: str) -> str:
    m = normalize(message)

    if any(k in m for k in ("contact", "email", "reach", "linkedin")):
        return "\n".join(
            [
                f"You can reach {profile['name']} at:",
                f"- Email: {profile.get('email') or 'see resume'}",
                f"- LinkedIn: {profile.get('linkedin') or 'see portfolio'}",
                f"- GitHub: {profile['github']}",
                "- Resume: https://anest58.github.io/resume/Anthony-Resume.docx",
                "- Portfolio: https://anest58.github.io/",
            ]
        )

    if any(k in m for k in ("educat", "degree", "school", "college")):
        return (
            f"{profile['name']}'s education: {profile['education']}. "
            "Background is chemistry (BS/MS), now applied to scientific AI and data enablement."
        )

    if "project" in m:
        lines = ["Featured / listed projects:"]
        for p in profile["projects"]:
            lines.append(
                f"- {p['title']} ({', '.join(p['tags'])}): {p['description']}"
            )
        return "\n".join(lines)

    if any(k in m for k in ("experience", "work history", "career", "regeneron", "merck")):
        lines = [f"{profile['name']}'s experience:"]
        for e in profile["experience"]:
            highlights = "; ".join(e["highlights"][:2])
            lines.append(
                f"- {e['role']} — {e['company']} ({e['period']})\n"
                f"  {e['summary']}\n"
                f"  Highlights: {highlights}"
            )
        return "\n".join(lines)

    if any(k in m for k in ("skill", "tech", "stack")):
        return "\n".join(
            [
                "Core skills and tools:",
                *[f"- {s}" for s in profile["skills"]],
                "",
                f"Title: {profile['title']}",
                f"Focus: {profile['bio']}",
            ]
        )

    if any(k in m for k in ("who", "about", "summary", "overview")):
        return "\n".join(
            [
                f"{profile['name']} — {profile['title']}",
                profile["bio"],
                "",
                f"Based in {profile['location']}. Currently at {profile['employer']}.",
                f"Education: {profile['education']}.",
            ]
        )

    chunks = [
        profile["bio"],
        *[
            f"{e['role']} at {e['company']}: {e['summary']}"
            for e in profile["experience"]
        ],
        *[h for e in profile["experience"] for h in e["highlights"]],
        *[
            f"{p['title']}: {p['description']} [{', '.join(p['tags'])}]"
            for p in profile["projects"]
        ],
    ]
    tokens = [t for t in re.split(r"\W+", m) if len(t) > 3]
    scored = []
    for chunk in chunks:
        c = normalize(chunk)
        hits = sum(1 for t in tokens if t in c)
        if hits:
            scored.append((hits, chunk))
    scored.sort(key=lambda x: x[0], reverse=True)

    if scored:
        return "\n".join(
            [
                f"Based on {profile['name']}'s portfolio:",
                *[f"- {chunk}" for _, chunk in scored[:4]],
                "",
                'Tip: paste a job description and ask "Is this candidate a good fit for this position?"',
            ]
        )

    return "\n".join(
        [
            f"I can help with questions about {profile['name']}'s fit, experience, skills, projects, education, or contact info.",
            "",
            "Try:",
            '- Paste a job description, then ask: "Is this candidate a good fit for this position?"',
            '- "Summarize AI and data experience"',
            '- "What projects use LangGraph or RAG?"',
        ]
    )


def run_fit_agent(user_message: str) -> str:
    text = (user_message or "").strip()
    if not text:
        return "Ask a question, or paste a job description to evaluate fit."

    if is_fit_request(text):
        parts = re.split(r"\n{2,}|---+|Job description:", text, flags=re.I)
        job_text = "\n".join(parts[1:]).strip() if len(parts) > 1 else text
        if len(normalize(job_text)) > 120 or len(parts) > 1:
            return analyze_fit(PROFILE, job_text if len(job_text) > 80 else text)

    return answer_about_profile(PROFILE, text)


def chat(message: str, history: list[dict[str, str]]):
    reply = run_fit_agent(message)
    history = history or []
    history.append({"role": "user", "content": message})
    history.append({"role": "assistant", "content": reply})
    return history, ""


EXAMPLES = [
    "Summarize AI and data enablement experience",
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

Paste a job description and ask if the candidate is a good fit, or ask about experience, skills, and projects.

Portfolio: [anest58.github.io](https://anest58.github.io/) · GitHub: [ANest58](https://github.com/ANest58)
"""
    )
    chatbot = gr.Chatbot(height=420, label="Fit agent", type="messages")
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
