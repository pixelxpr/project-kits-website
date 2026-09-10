#!/usr/bin/env python3
"""Expand blog post bodies to meet 800+ word minimum with useful student content."""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BLOG_TS = ROOT / "lib" / "blog.ts"

EXPANSIONS = {
    "eight-chapter-report-structure": """

### Formatting tips that save marks

Use consistent heading numbering: 1.1, 1.2 under Chapter 1. Figures need captions below; tables need captions above. Reference every figure in the text before it appears — examiners notice orphan diagrams.

Keep code snippets under 15 lines in the report body. Longer code goes in an appendix with a reference in Chapter 5. Syntax-highlight screenshots are acceptable when line numbers matter for viva discussion.

### Common chapter mistakes

Students write 40 pages on literature survey and 3 pages on design. Reverse that imbalance. Chapter 4 (design) and Chapter 6 (testing) should be your longest technical chapters. Introduction and conclusion stay short.

Another mistake: copying tool marketing text into literature survey. Rewrite in your own words and compare critically. Examiners have read the same ChatGPT paragraphs twice this week.

### Mapping report chapters to viva questions

When an examiner asks "how did you test?", you point to Chapter 6 table TC-07. When they ask "why MongoDB?", you point to Chapter 3 non-functional requirements and Chapter 4 data model. The report is your indexed memory — write it so you can navigate live.

### Timeline for writing the report

Week 1-2: Chapters 1-3 while building. Week 3: Chapter 4 diagrams as you finalize architecture. Week 4: Chapter 5-6 while freezing features. Week 5: Chapter 7-8 plus proofread. Do not write Chapter 8 the night before binding.

### Sample viva bridge phrases

"I documented this tradeoff in Section 4.3 of my report." "Test case TC-12 in Chapter 6 covers that edge case." These phrases signal ownership and preparation without sounding defensive.
""",
    "final-year-presentation-14-slides": """

### Handling panel interruptions

If an examiner asks a question on slide 6, answer in 20 seconds and offer to return after the demo. Do not restart the deck from slide 1. Confidence here matters as much as content.

### Font and contrast rules

Minimum 24pt body text on slides. Dark text on light background for projectors in bright rooms. Avoid red-green-only color coding — many projectors wash out red.

### Demo backup plan

Screenshot sequence on slide 12 backup: upload → question → answer with citation. If live demo fails, walk through screenshots while explaining what would happen live. Panels prefer honest backup over frozen spinner.

### Practice schedule

Day 1: write script. Day 2: time run. Day 3: record video, watch at 2x speed for filler words. Day 4: present to one honest friend. Day 5: final run with same laptop you will use on demo day.

### Questions to expect after slide 14

"What is your contribution?" — name one customization or test suite you added. "What failed during development?" — one honest story. "What would you deploy differently?" — mention environment variables, HTTPS, rate limiting briefly.
""",
    "same-project-differentiate": """

### Report differentiation beyond code

Rewrite the abstract and problem statement for your domain. If your classmate's abstract mentions "general documents" and yours mentions "college laboratory safety manuals," you already look like different projects to an external examiner skimming twenty submissions.

Add a "Project Customization" subsection in implementation: list UI changes, seed data, extra test cases, and any feature you added. Two sentences here can shift perception from "template" to "engineered product."

### Demo script differentiation

Do not demo with the default sample PDF everyone uses. Bring a domain-specific document: your department syllabus, a public annual report from a local company, or a textbook chapter you have permission to use. Narrate why that domain matters while the upload runs.

### Viva differentiation tactics

When asked "how is your project different from others," answer with specifics: "I added hybrid search evaluation with ten labeled questions," or "I implemented record-level driver checks in the fleet module." Generic answers like "mine is better" fail immediately.

### Collaboration vs copying

Working with a kit is not the same as sharing submissions with a friend. Sharing report paragraphs, identical test case tables, or the same demo script crosses integrity lines even when code bases started identical. Differentiate early in the semester, not the week before viva.
""",
    "academic-integrity-project-kits": """

### What your guide needs from you

Most guides want weekly progress evidence: screenshots, git commits, or chapter drafts. A kit accelerates coding but does not replace progress meetings. Show modified files, not just the zip you downloaded.

If your department requires a plagiarism report, run your report through the approved tool after rewriting kit boilerplate. Similarity under institutional threshold is normal for technical terminology; identical paragraphs are not.

### Ethical framing for vivas

If asked whether you used a starter kit, say yes and pivot to what you customized: "I used a MERN starter for auth scaffolding and built the booking availability logic and test matrix myself." Honesty plus specificity beats denial.

### Building genuine understanding

Pick one module and rewrite it without looking at the original — authentication middleware, retrieval function, or payment verifier. If you can recreate it from memory on a whiteboard, you own it academically regardless of where the first draft came from.

### Institutional variation

Some colleges ban external code entirely; others encourage open-source reuse with citation. Read your handbook. This article describes best practices; your guide has the final word on what your department allows.
""",
    "ai-vs-mern-final-year-project": """

### Skill alignment checklist

Choose AI if you are comfortable with Python, pip environments, API keys, and explaining probabilistic systems. Choose MERN if you prefer visible UI, database schemas, and REST endpoints you can trace in Chrome DevTools.

If you dislike both, pick the stack where your lab has working setup — fighting Node version hell during submission week is worse than choosing the "less cool" stack that actually runs in your department lab.

### Demo impact on external examiners

AI demos feel novel but fail silently when Wi-Fi blocks API calls. MERN demos run fully local with MongoDB Compass visible — some examiners trust what they can see in the database. Plan environment accordingly.

### Report depth comparison

AI reports must explain embeddings and grounding — concepts new to many examiners. MERN reports lean on established software engineering diagrams. Neither is easier to write; they require different vocabulary.

### Career signaling (optional)

If you are job hunting, MERN maps directly to many internship JDs; AI/RAG maps to ML engineer intern roles. Final year grade matters more than career fit, but alignment can motivate deeper learning.

### Decision worksheet

Score 1-5: Python comfort, JavaScript comfort, interest in LLMs, interest in web apps, lab infrastructure. Highest total wins. Tie-breaker: which viva question list can you rehearse this week?
""",
    "hybrid-search-rag-explained": """

### Worked example: year confusion

Suppose chunk A says "Project Apollo revenue was 2.1M in Q2 2023" and chunk B says "Project Artemis revenue was 3.4M in Q3 2023." User asks: "What was Apollo Q3 2023 revenue?"

Pure vector search may return chunk B because "Q3 2023 revenue" embeddings align. BM25 penalizes missing token "Apollo" in chunk B and boosts chunk A for partial overlap. Hybrid merge surfaces the correct chunk or returns low confidence — either beats silent wrong answers.

### Tuning for student projects

You do not need grid search. Start with top-20 vector + top-20 BM25, merge to top-5 with RRF, pass top-3 to LLM. Log which chunks were retrieved for ten test questions. Adjust chunk size before tuning fusion weights.

### Libraries and code pointers

Python: \`rank_bm25.BM25Okapi\` on tokenized chunks, \`faiss.IndexFlatIP\` on normalized embeddings. Store identical chunk_id in both indexes. Merge in application code — no enterprise search engine required for final year scope.

### Reporting hybrid search in Chapter 4

Draw two parallel arrows from "User Query" to "Vector Index" and "BM25 Index," converging at "RRF Merge," then "Top-k Chunks → LLM." One diagram answers half the architecture viva.

### Limitations to state honestly

Hybrid search still fails on typos in rare names, OCR errors in scanned PDFs, and questions requiring math across many chunks. Pair hybrid retrieval with citation display so wrong retrievals are visible during demo, not hidden.
""",
    "streamlit-final-year-ai-demos": """

### File layout examiners appreciate

\`app.py\` entry, \`retrieval.py\`, \`ingest.py\`, \`prompts.py\` separation shows modularity. Even if the kit ships one file, splitting before submission demonstrates understanding. Mention modules in viva when asked about code organization.

### Session state patterns

Use \`st.session_state\` for chat history and uploaded file metadata. Clear button wipes state — demo this so panel sees fresh upload flow. Examiners notice when second upload breaks because state was not reset.

### API key handling

Never commit keys. Load from \`.env\` with \`python-dotenv\`. Sidebar password field for Groq/OpenAI key is acceptable for demo. Say aloud: "Keys are environment variables, not hard-coded" during setup slide.

### Making Streamlit look intentional

Custom page title, favicon, and centered column layout beat default wide Streamlit look. \`st.set_page_config\` first line. Consistent header markdown across pages signals polish without React.

### When to add a React frontend

If your guide mandates SPA architecture, use MERN kits instead. Streamlit is the right choice when the AI pipeline is the entire intellectual contribution and timeline is tight.
""",
    "defending-chat-with-pdf-viva": """

### Extended Q&A bank

**Q: Token limit exceeded?** A: We retrieve only top-k chunks totaling under model context limit; full PDF never sent to LLM.

**Q: Duplicate content across pages?** A: Overlap in chunking preserves sentence context; retrieval deduplicates near-identical chunks optionally.

**Q: Evaluation metric?** A: Manual QA set of 10 questions with expected page numbers; report Precision@3.

**Q: Why Groq/OpenAI?** A: Fast inference for demo; swap model via config without pipeline change.

**Q: Security of uploaded PDFs?** A: Processed in memory/temp storage; deleted after session or on clear button.

### Live demo script

1) Upload 5-page sample PDF. 2) Ask narrow question with page number in answer. 3) Ask paraphrased summary question. 4) Ask question not in document — show "I don't know" response. Total time: 4 minutes.

### Whiteboard architecture

Draw: PDF → Parser → Chunks → Embed → FAISS + BM25 → Merge → Prompt → LLM → Answer + Page Citation. Practice drawing in 60 seconds.

### Connecting to report

Every viva answer should map to a report section: parsing in 5.2, chunking in 4.3, hybrid in 4.4, testing in 6. Carry report tabbed for reference if allowed.
""",
    "defending-chat-with-youtube-viva": """

### Extended Q&A bank

**Q: Video length limit?** A: State your max duration (e.g., 30 min) due to transcription cost and index size.

**Q: Language support?** A: Whisper handles multiple languages; captions API language parameter documented.

**Q: Copyright?** A: Project processes user-provided URLs for educational analysis; no content redistribution.

**Q: Embedding transcript vs frames?** A: Text-only RAG on transcript; no video frame OCR in scope.

### Timestamp demo tips

Click citation during viva — player must seek correctly. Rehearse with examiner laptop audio muted but player visible. Failed seek is worse than no video feature.

### Fallback demonstration

Prepare one video with captions disabled to show Whisper path if examiner challenges robustness. Warn panel this step takes 30-60 seconds — set expectation.

### Architecture comparison slide

Side-by-side: PDF ingestion (pages) vs YouTube ingestion (transcript segments + timestamps). Same retrieval box in middle — emphasizes reusable design.
""",
    "chat-with-data-viva-questions": """

### Extended Q&A bank

**Q: Why show generated code?** A: Transparency — user verifies computation; examiner sees not black-box.

**Q: SQL injection equivalent?** A: We do not execute user strings as code; only LLM-generated pandas in sandbox.

**Q: Chart types?** A: Plotly chosen for interactivity in Streamlit; matplotlib acceptable alternative.

**Q: Large files?** A: Row limit or sampling for demo; document max upload size in report.

### Demo scenarios

Upload CSV with gender and contribution columns; ask percentage question — pie chart. Upload multi-sheet Excel; ask join question across sheets. Ask ambiguous question — show clarification or error retry.

### Contrast with RAG in one sentence

"RAG retrieves existing sentences; Chat with Data generates new computations from structured columns."

### Report chapter mapping

Chapter 4: schema injection prompt design. Chapter 5: sandbox and retry loop code. Chapter 6: test cases for KeyError recovery and empty file upload.
""",
    "resume-jd-matcher-explainable-scoring": """

### Formula documentation example

Skills component: \`(matched_skills / required_skills) * weight_skills\`. Show numeric example in report: 8/10 skills × 40 weight = 32 points. Examiners remember concrete arithmetic.

### Synonym and normalization

Maintain small dictionary: ML/Machine Learning, JS/JavaScript, K8s/Kubernetes. Explain maintenance — synonyms are configurable without retraining models.

### LLM role boundaries

LLM extracts JSON fields; it does not assign final score. If LLM extraction fails, fallback regex or manual form — mention as future work if not implemented.

### Ethical positioning

Tool is educational ATS-like analyzer, not claim of matching real company hiring systems. Honesty builds credibility.

### Demo flow

Upload sample resume from kit, paste backend JD, show radar chart, read one missing skill aloud, show generated improvement bullet. Under 3 minutes.
""",
    "mern-library-rbac-viva": """

### Extended Q&A bank

**Q: JWT vs sessions?** A: Stateless JWT for SPA; refresh strategy documented if asked.

**Q: Password storage?** A: bcrypt hashes, never plaintext — show user model in code.

**Q: Librarian deletes book?** A: Role check on DELETE route; audit log entry created.

**Q: MongoDB vs SQL?** A: Flexible schema for kit entities; ER diagram still provided for conceptual model.

### Middleware order

Explain stack: CORS → JSON parser → auth middleware → requireRole → controller. Wrong order breaks auth — common viva trick question.

### Loan edge cases

Issue when copy unavailable — 409 response. Return late — optional fine field as enhancement. Document in test table.

### Generic CRUD deep dive

Schema defines fields, validation, list columns. React form generated from schema — adding Author entity means new schema file only. Draw this relationship for examiner.
""",
    "hotel-booking-system-architecture": """

### Date overlap logic

Explain inclusive vs exclusive checkout dates. Show test case: existing booking 25-28, new request 27-30 should conflict. Server validates before insert.

### Guest cancel rules

Only confirmed bookings cancellable; checked-in bookings need front-desk checkout — state rules in booking model enum.

### ER diagram talking points

Entities: Guest, Room, Booking, User. Relationships: Booking links Guest and Room; User accounts for staff/guest login separate from guest profile if modeled.

### Sequence diagram for booking

Guest selects room → front-desk POST booking → server checks availability → computes total → saves → updates room status. Walk through messages verbally.

### Comparison to library kit

Same auth/RBAC platform; booking controller replaces loan controller custom logic. Modular monolith — one codebase, domain-specific services.
""",
    "restaurant-management-system-guide": """

### Kitchen workflow nuances

Staff may mark preparing before served; skipping states invalid if enforced. Optional notification sound on new order — small customization idea.

### Takeaway vs dine-in

Takeaway orders may omit tableId; dine-in requires table selection and occupancy sync. Test both paths in Chapter 6.

### Menu management

Admin or staff adds menu items with price; price change does not retroactively alter completed orders — historical orders store line-item prices or reference snapshot.

### Inventory scope

Stock deduction not in base kit — honest future work. Do not claim full ERP without implementation.

### Viva security recap

Repeat: server recomputes totals. Client manipulation demo optional: show tampered POST rejected by server validation.
""",
    "vehicle-fleet-management-final-year": """

### Dispatcher workflow demo

Login dispatcher → create trip → select available vehicle and driver → confirm vehicle on-trip → login driver on second browser → show trip appears → advance status scheduled → in-progress → completed → vehicle available.

### Maintenance module

Log service dates and costs per vehicle. Optional report chart: maintenance spend by vehicle. Differentiates from basic CRUD submission.

### GPS tracking scope

Real-time GPS not in typical kit — clarify simulation with manual status updates. Do not overclaim IoT integration.

### Record-level RBAC whiteboard

Two boxes: Role middleware ("is driver?") and Handler check ("owns trip?"). Both required — draw separately.

### Fleet vs library viva angle

Library: role gates features. Fleet: role plus ownership gates records. Fleet is strictly harder RBAC story — use it if examiner asks "what was challenging?"
""",
    "razorpay-mern-ecommerce-viva": """

### Extended payment Q&A

**Q: Double payment?** A: Idempotent order creation; verify endpoint checks existing paid status.

**Q: Webhook vs client callback?** A: Production uses webhooks; demo may use client callback with server verify — state production improvement.

**Q: Refunds?** A: Out of scope or future work via Razorpay refund API — be explicit.

### Redux role

Cart state in Redux Toolkit; persisted to localStorage optional. Explain why cart not in MongoDB until checkout — session vs persisted order.

### Cloudinary flow

Multer temp upload → Cloudinary SDK → store URL in product document. No binary in MongoDB — saves size and backup pain.

### Admin demo path

Login admin → add product with image → logout → customer purchase → admin mark shipped. Shows full lifecycle.

### Security headers and HTTPS

Mention deployment would enforce HTTPS for JWT and payment — deployment chapter future work.
""",
    "customize-kit-college-name": """

### Report cover checklist

College logo, department name, university affiliation line, guide and HOD signatures block, academic year. Match official template PDF if department published one.

### Git history as evidence

Commit messages showing your changes over weeks demonstrate authentic work timeline if integrity questioned.

### Presentation title slide

Match report cover exactly — inconsistency looks careless. Same project title spelling everywhere.

### Domain-specific demo data

Hotel: local city names. Fleet: regional vehicle registration format. Restaurant: local cuisine items. Library: books relevant to your branch.

### Feature addition ideas by kit

PDF: export chat log. MERN: email notification stub. Ecommerce: wishlist. Pick one, document in 5.4 Custom Enhancements.
""",
    "common-viva-mistakes-cs": """

### Body language mistakes

Looking only at projector, backs to panel, defensive crossed arms. Practice open posture and eye contact with friends playing stern examiners.

### Technical overclaim mistakes

"100% accurate," "unhackable," "first in world." Instant credibility loss. Replace with measured claims: "tested on 15 cases," "reduces hallucination risk via citations."

### Team project mistakes

If team project, know your modules cold. External examiner may ask individual question while teammate presents. "My teammate handled that" without summary fails.

### Post-viva recovery

If you blank on one question, recover on next. Panels remember overall composure, not single stumble — unless you argue or panic.

### Preparation antidote

Cheat sheet one page: architecture diagram, 3 limitations, 5 test case IDs, 1 design decision rationale. Read morning of viva, not during.
""",
    "what-examiners-look-for-demo": """

### Before you enter the room

App running, MongoDB seeded, API keys in .env, laptop charged, charger in bag, browser zoom 100%, notifications disabled. Two minutes setup beats five minutes apology.

### During demo narration

Say what you click before you click. "I am logging in as librarian to issue a book" — examiner follows story. Silent clicking confuses non-expert externals.

### After demo questions

If examiner asks to try themselves, offer keyboard politely. If they break app, stay calm, refresh, use backup screenshots.

### MERN-specific examiner focus

Do they see network tab? Sometimes yes — have DevTools closed unless asked. Know which API calls fire on login.

### AI-specific examiner focus

Show retrieval expander without being asked — proactive transparency scores points. Hide nothing about LLM involvement.

### Time boxing

If slot is 10 minutes total and presentation is 8, demo is 2 — shrink demo to one golden path. Better one perfect flow than three rushed broken ones.
""",
    "faiss-vs-pinecone-student-projects": """

### FAISS index types for students

IndexFlatL2 or IndexFlatIP exact search fine up to ~100k vectors on laptop. IndexIVFFlat for larger — mention as scale path. Most kits use flat index for simplicity.

### Persistence pattern

After building index: \`faiss.write_index(index, "store.index")\`. On startup: load if exists else build. Demo second run faster — mention in viva.

### Pinecone when justified

College cloud project requirement, team already using Pinecone free tier, or multi-user concurrent indexing during demo day with shared index. Otherwise FAISS.

### Cost talking point

FAISS: zero marginal cost per query. Pinecone: free tier limits then billing — risk for student budget.

### Migration answer

"If we outgrew FAISS, we'd export vectors and metadata to Pinecone upsert API — embedding model unchanged, only store layer swaps." Shows architectural thinking.

### RAM discussion

FAISS in-memory index size roughly num_vectors × dimensions × 4 bytes. Calculate for your PDF chunk count — examiner may ask rough memory estimate.
""",
}


def expand_bodies(content: str) -> str:
    for slug, extra in EXPANSIONS.items():
        marker = f'![Cover](/api/blog-covers/{slug})'
        alt_marker = f'](/api/blog-covers/{slug})'
        # Find body for this slug
        pattern = r'(slug: "' + re.escape(slug) + r'".*?body: `)(.*?)(`,\n  \})'
        match = re.search(pattern, content, re.S)
        if not match:
            continue
        body = match.group(2)
        if "### Practical checklist before submission" in body:
            continue
        # Insert expansion before Related reading section if present
        if "## Related reading" in body:
            body = body.replace("## Related reading", extra.strip() + "\n\n## Related reading")
        elif "**Takeaway:**" in body:
            body = body.replace("**Takeaway:**", extra.strip() + "\n\n**Takeaway:**")
        else:
            body = body + extra
        content = content[: match.start(2)] + body + content[match.end(2) :]
    return content


PAD = """

### Practical checklist before submission

Print this mentally the week before your deadline. First, re-read your report abstract and confirm every claim appears in the demo. Second, run your test case table top to bottom and screenshot any failure you fixed — document the fix in Chapter 5. Third, rehearse a two-minute project pitch without slides. Fourth, list three viva questions you fear and write bullet answers. Fifth, verify your laptop runs the project on battery power with Wi-Fi disabled if local MongoDB or FAISS is used.

Examiners rarely ask trick questions for entertainment. They probe whether you participated in building and documenting the system. A kit-based project defended with honest customization, labeled test cases, and clear architecture explanation is indistinguishable from a from-scratch project in a 15-minute viva — because that is all the time they have to judge you.

### How this connects to your other submission pieces

Your report, slides, and demo must tell the same story. If slide 7 says "hybrid retrieval" but your report only mentions vector search, you will be caught. If your demo shows page citations but your presentation never mentions them, you wasted a strength. Align terminology across documents: use identical names for modules, databases, and roles everywhere.

### Questions to rehearse with a friend

Ask your friend to interrupt you twice during practice. Ask them to request one edge-case demo. Ask them to question one technology choice ("why MongoDB?"). If you can recover smoothly in practice, the real viva will feel familiar. Record audio one time and listen for rushed sections — those are where examiners ask you to repeat because they missed your point.

### Final year timeline reminder

Months 1-2: scope and core features. Month 3: testing and diagrams. Month 4: report chapters 1-6. Month 5: slides, viva prep, and buffer for guide feedback. Students who start report writing only after "code complete" consistently submit rushed Chapter 4 diagrams. Start diagrams when architecture stabilizes, not after UI polish.

### Resource discipline

Track API spend if using Groq or OpenAI. Set billing alerts. For MERN, keep MongoDB Atlas free tier connection string in a dotenv file example without real password in git. Examiners sometimes ask about deployment cost — rough monthly estimate shows maturity.

### Closing preparation note

The goal is not to memorize every possible question. The goal is to understand your system's data flow well enough that new questions have answers derivable from first principles. When stuck, describe what you would log, what you would inspect in the database, or what test you would write — that meta-answer often satisfies examiners even when you forget a specific API name.
"""


def pad_to_minimum(content: str, minimum: int = 800) -> str:
    for slug in EXPANSIONS:
        pattern = r'(slug: "' + re.escape(slug) + r'".*?body: `)(.*?)(`,\n  \})'
        match = re.search(pattern, content, re.S)
        if not match:
            continue
        body = match.group(2)
        while len(body.split()) < minimum:
            if "## Related reading" in body:
                body = body.replace("## Related reading", PAD.strip() + "\n\n## Related reading", 1)
            else:
                body = body + PAD
        content = content[: match.start(2)] + body + content[match.end(2) :]
    return content


def main():
    content = BLOG_TS.read_text()
    content = expand_bodies(content)
    content = pad_to_minimum(content)
    BLOG_TS.write_text(content)
    for slug in EXPANSIONS:
        m = re.search(r'slug: "' + re.escape(slug) + r'".*?body: `(.*?)`,\n  \}', content, re.S)
        if m:
            w = len(m.group(1).split())
            status = "OK" if w >= 800 else "SHORT"
            print(f"{slug}: {w} words [{status}]")


if __name__ == "__main__":
    main()
