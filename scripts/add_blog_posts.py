#!/usr/bin/env python3
"""Generate 20 new blog posts and append to lib/blog.ts"""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BLOG_TS = ROOT / "lib" / "blog.ts"


def para(*sentences):
    return " ".join(sentences)


def section(title, *paragraphs, level=2):
    prefix = "#" * level
    return f"\n{prefix} {title}\n\n" + "\n\n".join(paragraphs)


def make_body(slug, intro, sections, projects, blogs, takeaway, kit_line):
    lines = [intro, f"\n![{slug.replace('-', ' ').title()}](/api/blog-covers/{slug})"]
    lines.extend(sections)
    proj_links = "\n".join(f"- **[{p['name']}](/projects/{p['slug']})** — {p['desc']}" for p in projects)
    blog_links = " ".join(f"[{b['name']}](/blog/{b['slug']})" for b in blogs)
    lines.append(section("Related reading", para(f"For more context, see {blog_links}.")))
    lines.append(section("Project kits mentioned", proj_links))
    lines.append(f"\n**Takeaway:** {takeaway} {kit_line}")
    return "`" + "\n".join(lines) + "`"


def expand(topic, points):
    """Build ~800+ word body from topic blocks."""
    blocks = []
    for title, paras in points:
        blocks.append(section(title, *[para(*p) if isinstance(p, tuple) else p for p in paras]))
    return blocks


NEW_POSTS = [
    {
        "slug": "eight-chapter-report-structure",
        "title": "The 8-chapter report structure that examiners actually expect",
        "excerpt": "A chapter-by-chapter breakdown of the final year project report format most CS departments accept — and what to write in each section without padding.",
        "category": "Guides",
        "readTime": "9 min read",
        "date": "2026-02-25",
        "intro": para(
            "Your report is not a formality. It is the document your external examiner reads before you enter the room.",
            "A well-structured report does half the viva work for you because it pre-answers the questions they were planning to ask.",
            "Most Indian CS departments expect an 8-chapter format. The exact chapter titles vary slightly by college, but the underlying structure is remarkably consistent.",
        ),
        "points": [
            ("Chapter 1: Introduction", [
                ("State the problem in one paragraph.", "Explain who faces it and why it matters.", "Define scope clearly — what your system does and deliberately does not do.", "List 3-5 objectives as numbered bullet points examiners can tick off."),
                ("Include a one-page system overview diagram here.", "Examiners skim this chapter first.", "If they understand the problem and scope in five minutes, you have already earned trust."),
            ]),
            ("Chapter 2: Literature Survey", [
                ("Review 8-12 prior systems or papers.", "Do not copy abstracts.", "Compare them in a table: tool name, approach, limitation.", "End with a gap statement: existing tools fail at X, which your project addresses."),
                ("For AI projects, cite RAG papers, embedding model docs, and one commercial product.", "For MERN projects, cite similar open-source repos on GitHub with honest comparison."),
            ]),
            ("Chapter 3: System Analysis", [
                ("Requirements split into functional and non-functional.", "Functional: what the user can do.", "Non-functional: performance, security, scalability.", "Add use case diagrams or user stories for each role."),
                ("Mention hardware and software requirements.", "Python 3.10+, 8GB RAM, MongoDB Atlas free tier — be specific so replication is possible."),
            ]),
            ("Chapter 4: System Design", [
                ("This is the chapter examiners love.", "Include architecture diagram, data flow diagram, ER diagram, and sequence diagram for one key workflow.", "Explain every box and arrow in prose below each figure."),
                ("For RAG projects: show chunking → embedding → retrieval → generation.", "For MERN: show React → Express → MongoDB with JWT middleware layer."),
            ]),
            ("Chapter 5: Implementation", [
                ("Walk through modules, not every line of code.", "Show 2-3 critical code snippets with explanation.", "Describe third-party libraries and why you chose them."),
                ("Include screenshots of the running application.", "One screenshot per major feature is enough."),
            ]),
            ("Chapter 6: Testing", [
                ("Test case table: ID, input, expected output, actual output, pass/fail.", "Minimum 15 test cases covering happy path and edge cases.", "Mention manual testing and any automated tests you ran."),
            ]),
            ("Chapter 7: Results and Discussion", [
                ("Show sample outputs.", "For Chat with PDF: question, answer, page citation.", "Discuss accuracy qualitatively.", "Name 2-3 limitations honestly."),
            ]),
            ("Chapter 8: Conclusion and Future Work", [
                ("Summarize what you built in 3 sentences.", "List future enhancements that are realistic, not fantasy.", "Do not introduce new concepts here."),
            ]),
        ],
        "projects": [
            {"slug": "pdf-rag-chat", "name": "Chat with PDF", "desc": "includes a complete 8-chapter Word report you can adapt."},
            {"slug": "library-management-system", "name": "Library Management System", "desc": "MERN report with RBAC and ER diagrams included."},
        ],
        "blogs": [{"slug": "choosing-a-final-year-project", "name": "choosing a final year project"}],
        "takeaway": "Follow the 8-chapter skeleton, fill each chapter with diagrams and test cases, and your report becomes your viva cheat sheet.",
        "kit_line": "Every kit on this site ships with a report template matching this structure.",
    },
    {
        "slug": "final-year-presentation-14-slides",
        "title": "How to build a 14-slide final year presentation that fits in 10 minutes",
        "seoTitle": "14-Slide Final Year Presentation Guide",
        "excerpt": "Slide-by-slide guidance for a 10-minute project presentation — what to show, what to skip, and how to handle the demo slide without crashing.",
        "category": "Guides",
        "readTime": "8 min read",
        "date": "2026-03-05",
        "intro": para(
            "Ten minutes is shorter than you think.",
            "Most students prepare 25 slides and rush through slide 8 while the panel stops paying attention.",
            "Fourteen slides is the sweet spot: enough depth to show you understand the project, short enough to leave time for a live demo and 2-3 questions.",
        ),
        "points": [
            ("Slide 1: Title", [("Project title, your name, roll number, guide name, department.", "Keep it clean. No animation.")]),
            ("Slides 2-3: Problem and Objectives", [
                ("Slide 2: one real-world problem in 3 bullet points.", "Slide 3: numbered objectives mapped to features you will demo."),
            ]),
            ("Slides 4-5: Literature and Gap", [
                ("One comparison table on slide 4.", "Slide 5: one sentence gap statement.", "Do not read the table row by row — summarize it."),
            ]),
            ("Slides 6-8: Architecture", [
                ("Slide 6: high-level block diagram.", "Slide 7: data flow for one user action.", "Slide 8: tech stack with one-line justification per tool."),
                ("This is where AI projects should mention chunking, embeddings, and retrieval explicitly.", "MERN projects should show the three-tier flow and auth layer."),
            ]),
            ("Slides 9-10: Implementation Highlights", [
                ("One screenshot per slide.", "Call out one non-obvious design decision on each.", "Example: hybrid search, server-side price calculation, HMAC payment verification."),
            ]),
            ("Slide 11: Testing", [("Small test case table — 5 rows visible, mention 15+ total in speech.")]),
            ("Slide 12: Live Demo", [
                ("This slide says 'Live Demo' and lists the 3 scenarios you will show.", "Never demo without a rehearsed script.", "Use seeded data.", "Have a backup screenshot if Wi-Fi fails."),
            ]),
            ("Slides 13-14: Results and Conclusion", [
                ("Slide 13: sample output screenshots.", "Slide 14: conclusion + one future enhancement.", "End with 'Thank you' — not a wall of references."),
            ]),
            ("Delivery tips", [
                ("Speak to the panel, not the screen.", "One minute per slide average, two minutes for demo.", "If asked a question mid-presentation, answer briefly and continue."),
                ("Practice with a timer three times.", "Record yourself once — you will catch verbal fillers and rushing."),
            ]),
        ],
        "projects": [
            {"slug": "chat-with-youtube", "name": "Chat with YouTube", "desc": "14-slide deck included with demo script."},
            {"slug": "mern-ecommerce", "name": "MERN E-Commerce", "desc": "presentation covers Razorpay flow diagram."},
        ],
        "blogs": [{"slug": "what-examiners-look-for-demo", "name": "what examiners look for in a demo"}],
        "takeaway": "Fourteen slides, three demo scenarios, one rehearsed timing run — that is a presentation panel members remember.",
        "kit_line": "All project kits include a 14-slide deck aligned to this structure.",
    },
    {
        "slug": "same-project-differentiate",
        "title": "Your classmate picked the same project — how to still stand out",
        "excerpt": "When three students submit a library management system or RAG chatbot, differentiation comes from documentation depth, testing, and the questions you can answer — not the topic.",
        "category": "Guides",
        "readTime": "7 min read",
        "date": "2026-03-12",
        "intro": para(
            "Duplicate project topics are normal.",
            "Departments rarely ban two students from building a hotel booking system or a PDF chatbot.",
            "What they do ban — implicitly — is duplicate *effort* with duplicate *understanding*.",
            "Standing out is not about picking a unique topic nobody has heard of.",
            "It is about demonstrating decisions, tests, and limitations your classmates skipped.",
        ),
        "points": [
            ("Differentiate through architecture explanation", [
                ("Two students can run the same Streamlit RAG app.", "The one who explains why chunk size is 500 tokens and why hybrid search beats pure vector search will score higher."),
                ("Draw your own diagrams even if the code is similar.", "Rename modules to match your report terminology.", "Document one custom enhancement: re-ranking, query expansion, or a custom evaluation set."),
            ]),
            ("Differentiate through testing", [
                ("Build a test case matrix with at least 15 cases.", "Include failure cases: empty PDF, wrong file type, question with no answer in source.", "Show the panel a table in your report — most classmates will not have this."),
            ]),
            ("Differentiate through domain choice", [
                ("Same architecture, different dataset.", "Chat with PDF on medical leaflets vs legal contracts vs your college syllabus.", "The code pipeline is identical; the demo story is yours."),
                ("For MERN: customize seed data to a local hotel, restaurant, or fleet company name.", "Examiners notice when demo data looks thoughtful rather than generic."),
            ]),
            ("Differentiate through viva preparation", [
                ("Read the question bank for your project type.", "Prepare honest limitation answers.", "Know one 'future work' item you would implement next month with specific libraries."),
            ]),
            ("What not to do", [
                ("Do not claim your project is unique worldwide.", "Do not badmouth classmates.", "Do not add blockchain to a library system just for buzzwords."),
            ]),
        ],
        "projects": [
            {"slug": "pdf-rag-chat", "name": "Chat with PDF", "desc": "customize demo PDFs and report examples for your domain."},
            {"slug": "hotel-booking-system", "name": "Hotel Booking System", "desc": "seed data and report sections you can personalize."},
        ],
        "blogs": [{"slug": "customize-kit-college-name", "name": "customizing a kit with your college name"}],
        "takeaway": "Same topic, different depth — testing tables, honest limitations, and a confident demo beat a 'unique' title every time.",
        "kit_line": "Kits are starting points; your report, test cases, and viva answers are the differentiator.",
    },
    {
        "slug": "academic-integrity-project-kits",
        "title": "Using project kits with academic integrity — what is allowed and what is not",
        "excerpt": "An honest guide for students using starter kits: how to customize, document, and submit work that is genuinely yours without crossing plagiarism lines.",
        "category": "Guides",
        "readTime": "8 min read",
        "date": "2026-03-20",
        "intro": para(
            "Project kits exist to save you from rebuilding authentication, RBAC, and report formatting from scratch.",
            "They are not a substitute for understanding what you submit.",
            "Academic integrity rules vary by college, but the principles are universal: you must be able to explain, defend, and demonstrate every part of your submission.",
        ),
        "points": [
            ("What using a kit legitimately looks like", [
                ("You run the code, break it, fix it, and customize features.", "You rewrite report sections in your own words with your college's formatting.", "You add test cases you designed.", "You present a demo you rehearsed.", "Your guide knows you used a starter and approves the scope."),
            ]),
            ("What crosses the line", [
                ("Submitting the kit report with only name and college changed.", "Claiming you built Razorpay integration but cannot explain HMAC verification.", "Paying someone to present your viva.", "Copying another student's customization."),
            ]),
            ("How to document kit usage honestly", [
                ("In your report acknowledgment or implementation chapter, mention third-party libraries and starter templates.", "Many guides appreciate honesty.", "Focus the report on *your* design decisions, test results, and modifications."),
            ]),
            ("Customization checklist", [
                ("Change UI colors and branding to match your preference.", "Replace seed data with domain-specific examples.", "Add one feature: export button, email notification, extra chart.", "Write 5+ original test cases beyond the kit defaults."),
            ]),
            ("Talking to your guide", [
                ("Ask before purchase: 'Is a MERN starter kit acceptable if I customize and document?'", "Most guides care about learning outcomes, not whether you wrote Express boilerplate from memory."),
            ]),
        ],
        "projects": [
            {"slug": "restaurant-management-system", "name": "Restaurant Management System", "desc": "clear module boundaries make customization straightforward."},
            {"slug": "resume-jd-matcher", "name": "Resume / JD Matcher", "desc": "scoring formula is visible and explainable — ideal for integrity discussions."},
        ],
        "blogs": [{"slug": "same-project-differentiate", "name": "standing out when classmates pick the same topic"}],
        "takeaway": "Kits are tools, not submissions — customize, test, understand, and disclose appropriately.",
        "kit_line": "Our kits include modification guides so your final submission reflects your work.",
    },
    {
        "slug": "ai-vs-mern-final-year-project",
        "title": "AI vs MERN for your final year project — an honest comparison",
        "excerpt": "Should you build a RAG chatbot or a full-stack MERN app? Compare viva difficulty, timeline, demo impact, and what examiners expect from each path.",
        "category": "Guides",
        "readTime": "9 min read",
        "date": "2026-03-28",
        "intro": para(
            "The AI vs MERN decision is really a decision about what kind of viva conversation you want.",
            "AI projects impress when you explain embeddings and retrieval.",
            "MERN projects impress when you explain RBAC, database design, and security.",
            "Neither is easier — they fail in different ways.",
        ),
        "points": [
            ("When AI projects shine", [
                ("Panels are curious about LLMs in 2026.", "A working RAG demo with citations feels modern.", "Python + Streamlit is faster to prototype than a full React app.", "Risk: students treat the LLM as magic and cannot explain retrieval."),
            ]),
            ("When MERN projects shine", [
                ("Examiners understand CRUD and JWT intuitively.", "You can demo role-based dashboards live.", "Rich diagrams: ER, sequence, architecture.", "Risk: generic e-commerce clone with no security story."),
            ]),
            ("Timeline comparison", [
                ("AI: 2 weeks pipeline, 2 weeks report and viva prep if using a kit.", "MERN: 3 weeks frontend + backend integration, 2 weeks testing and docs.", "Both need buffer time — see our project selection guide."),
            ]),
            ("Viva question style", [
                ("AI vivas probe hallucination, chunk size, vector DB choice.", "MERN vivas probe middleware order, schema design, payment verification.", "Pick the question style you can prepare for."),
            ]),
            ("Hybrid path", [
                ("Some students build MERN frontend with Python AI microservice.", "Higher scope — only if you have time.", "Otherwise pick one stack and go deep."),
            ]),
        ],
        "projects": [
            {"slug": "pdf-rag-chat", "name": "Chat with PDF", "desc": "representative AI/RAG kit."},
            {"slug": "library-management-system", "name": "Library Management System", "desc": "representative MERN kit with RBAC depth."},
        ],
        "blogs": [{"slug": "three-patterns-for-ai-projects", "name": "three AI project patterns"}],
        "takeaway": "Choose AI if you want to explain retrieval and grounding; choose MERN if you want to explain auth, roles, and data modeling — then commit fully.",
        "kit_line": "We offer both AI and MERN kits with matched documentation depth.",
    },
]


def build_post(meta):
    sections = expand(meta["slug"], meta["points"])
    body = make_body(
        meta["slug"],
        meta["intro"],
        sections,
        meta["projects"],
        meta["blogs"],
        meta["takeaway"],
        meta["kit_line"],
    )
    lines = ["  {"]
    lines.append(f'    slug: "{meta["slug"]}",')
    lines.append(f'    title: "{meta["title"]}",')
    if meta.get("seoTitle"):
        lines.append(f'    seoTitle: "{meta["seoTitle"]}",')
    lines.append(f'    excerpt: "{meta["excerpt"]}",')
    lines.append(f'    category: "{meta["category"]}",')
    lines.append(f'    readTime: "{meta["readTime"]}",')
    lines.append(f'    date: "{meta["date"]}",')
    lines.append(f"    body: {body},")
    lines.append("  },")
    return "\n".join(lines)


def main():
    content = BLOG_TS.read_text()
    if 'slug: "eight-chapter-report-structure"' in content:
        print("Posts 5-9 already present")
        return
    insert = "\n".join(build_post(p) for p in NEW_POSTS)
    content = content.replace("\n];", f"\n{insert}\n];")
    BLOG_TS.write_text(content)
    count = len(re.findall(r'slug: "', content)) - 1  # minus type definition
    print(f"Added {len(NEW_POSTS)} posts. Total slugs: {count}")


if __name__ == "__main__":
    main()
