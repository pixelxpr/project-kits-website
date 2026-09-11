---
title: "Explainable scoring in Resume/JD Matcher — why black-box LLM grades fail"
seoTitle: "Explainable Scoring in Resume/JD Matcher"
excerpt: "Break down the four weighted components — skills, semantic fit, experience, education — and why deterministic scoring beats asking the LLM for one number."
category: "Architecture"
readTime: "14 min read"
date: "2026-05-18"
author: "Rajan"
---

Asking an LLM “score this resume 0–100” produces a number with no audit trail. Examiners cannot reproduce it; users cannot trust it; your Chapter 6 test table becomes meaningless. Extract–Score–Generate splits the pipeline: the model extracts structured fields, your code computes weighted component scores, and the model writes gap explanations from those numbers. Every spoke on the radar chart should trace to a formula you can write on the whiteboard.

![Cover](/blog/resume-jd-matcher-explainable-scoring.png)

## Opening pitch (40 seconds)

Our Resume/JD Matcher does not ask the model for a final grade. We extract skills, experience, and education into JSON, score each component with documented weights that sum to 100, then generate improvement suggestions grounded in the low-scoring parts. Same resume and same JD yield the same numeric breakdown every time — the narrative text may vary slightly, but the arithmetic does not.

That reproducibility sentence is what separates an academic project from a toy wrapper around a chat API.

## Why black-box LLM grades fail in final year context

Non-reproducible scores break scientific reporting. No component breakdown means the viva cannot probe “why 72?” Opaque numbers invite grade inflation via prompt hacking (“be generous”). Indian university panels increasingly ask for methodology, not only screenshots. Deterministic scoring lets you show expected ordering: strong match resume scores above weak match resume on a fixed JD.

### Ethical positioning

Frame the tool as an educational ATS-like analyzer for candidate preparation and learning explainable AI — not as an automated hiring authority and not as a clone of any company’s private recruiter stack. Keyword stuffing can inflate skill overlap; say that aloud. Bias exists in any keyword or embedding system; assistive use with human judgment is the honest scope.

## Four components — know the formulas cold

Typical decomposition (adjust to your kit’s documented weights; do not invent new percentages on stage):

1. **Skill match** — overlap between JD required skills and resume skills after normalization and synonym expansion.  
2. **Semantic fit** — embedding similarity between resume summary (or full text) and JD description.  
3. **Experience** — years (or level) versus JD required range.  
4. **Education** — degree level match (BCA / B.Tech / MCA / M.Tech style ladders you defined).

Weights sum to 100. Document them in report Chapter 4 and on a presentation slide. Example skill line examiners remember: matched 8 of 10 required skills × weight 40 → 32 points toward the total.

### Skills component worked example

Required JD skills: Python, SQL, Docker, AWS, React, System Design, Git, Linux, REST, Communication (10). Resume hits eight after synonym mapping. Skills points = `(8/10) * 40 = 32`. Walk this arithmetic slowly once; panels often stop asking “is AI accurate?” once they see grade-school math tied to extraction.

### Experience and education examples

If JD asks 2–4 years and resume extracts 3, award full experience weight or a tapered score per your function — cite the actual function from code. If JD asks B.Tech and resume has B.Tech, full education weight; if resume has diploma vs required master’s, partial or zero per your matrix. Put the matrix table in the report.

### Semantic fit without hand-waving

Explain: embed resume text and JD text with the same embedding model; cosine similarity maps to a 0–weight_semantic contribution via a linear or piecewise mapping you define. If similarity is 0.78 and semantic weight is 25, show the mapping function. Avoid “the AI feels they match.”

## Extract–Score–Generate boundaries

**Extract:** LLM (JSON mode / schema validation) returns structures like `{"skills": ["Python","SQL"], "years_experience": 2, "education": "B.Tech", "summary": "..."}`. Validate with Pydantic or similar; invalid JSON triggers one repair retry.  
**Score:** Pure Python (or TypeScript) functions — no LLM randomness.  
**Generate:** LLM reads the breakdown and missing-skill list, writes bullets (“Add Docker to Projects”). Grounding comes from your lists, not from inventing new JD requirements.

If extraction fails, fallback paths (regex skills section, manual form) are valid future work — mention only if present or clearly labeled unimplemented.

## Synonym and normalization

Maintain a small configurable dictionary: ML ↔ Machine Learning, JS ↔ JavaScript, K8s ↔ Kubernetes, Node ↔ Node.js. Lowercase, strip punctuation, split on commas/slashes. Explain maintenance: synonyms update without retraining. This is a customization hook for departments that want domain skills (CAD tools, nursing certifications) added as data, not as model fine-tunes.

## Visualization and UX for viva

Radar or grouped bar charts make component scores obvious from the back row. Color thresholds (green / amber / red) should be constants in code (for example ≥75 / 50–74 / &lt;50), not LLM moods. Show missing skills as a checklist. Side-by-side extracted resume skills vs JD skills is a strong slide and a strong live view.

### Demo flow under three minutes

Upload the kit sample resume PDF → paste a backend JD → show extraction → reveal radar → read one missing skill → read one generated improvement bullet → optionally tweak weights or re-upload a weaker resume to show ordering. Use anonymized samples only; do not upload classmates’ real CVs without permission.

## PDF parsing pitfalls

Resumes are often multi-column. Libraries such as pdfplumber or PyMuPDF may jumble order. Known limitation: “text-based PDFs work best; scanned CVs need OCR — out of scope.” Offer paste-resume textarea as escape hatch if the kit includes it. Link extraction failures to a clear UI message.

## Testing strategy Chapter 6 will thank you for

Build a tiny fixture set: JD fixed; Resume A strong; Resume B weak. Assert `score(A) > score(B)`. Assert skills component changes when you remove a matched skill from the fixture. Assert identical inputs → identical total. These tests defend you when the panel asks “how do you know it works?”

### Weight sensitivity demo

Change skills weight ±10 and show the total shift for one candidate. That demonstrates you own the formula. Do not retune weights live into nonsense just to impress — keep the documented defaults for the marked demo.

## Viva question bank

**Q: Why not one LLM score?** A: Not reproducible, not decomposable, weak academic method.  
**Q: Where do weights come from?** A: Design choice documented in Chapter 4; tunable constants.  
**Q: Can users game skills?** A: Yes, keyword stuffing — limitation; semantic component and human review mitigate.  
**Q: Is this fair hiring?** A: Educational assistive tool; not a production ATS claim.  
**Q: What if JSON extraction fails?** A: Schema validation + retry; fallback path as implemented.  
**Q: Embeddings which model?** A: Name the model/provider from your config; same model for resume and JD.  
**Q: Multilingual resumes?** A: State tested language; do not claim full i18n.  
**Q: Difference from Chat with Data?** A: Different AI pattern — scoring pipeline vs text-to-code; see pattern blog.

## Presentation slide that earns marks

Title: “LLM extracts; code scores; LLM explains.” Three boxes with arrows. Under the middle box, write the four weights. Under the chart, one numeric example. This slide often ends follow-ups because architecture becomes obvious. Pair it with the methodology section in [Resume / JD Matcher](/projects/resume-jd-matcher).

## Comparison to pure chat grading and to RAG

Pure chat grading: one opaque number. Your pipeline: auditable components. RAG (as in [Chat with PDF](/projects/pdf-rag-chat)): retrieves evidence from a corpus; your matcher extracts and scores against a JD — different pattern in [three AI patterns](/blog/three-patterns-for-ai-projects). If the panel loves RAG buzzwords, do not force them; teach the correct pattern name.

## Report chapter mapping

Chapter 1: problem — opaque resume screening and student need for feedback. Chapter 3: requirements — extract schema, weights, charts, suggestions. Chapter 4: formulas, weight table, sequence diagram. Chapter 5: parsing, validation, scoring functions, prompt for suggestions. Chapter 6: ordering tests, synonym cases, bad PDF case. Chapter 7: bias, stuffing, parsing limits, not a hiring system.

## Customization for Indian college submissions

Add college name on UI and report cover. Seed JDs for roles common in campus placement (Java backend, Python data, MERN intern). Extend synonym lists for local spellings. Keep weights visible on an “About scoring” page so external examiners can read without asking you to reverse-engineer code.

## Component deep dive — experience scoring shapes

Flat pass/fail (“in range or zero”) is easy to explain. Piecewise scoring is richer: full weight inside the JD band, partial credit within one year outside, zero beyond that. Write the piecewise function in Chapter 4 with a tiny table of inputs → outputs. Example: JD wants 2–4 years; resume 1 year → 50% of experience weight; resume 3 years → 100%; resume 10 years overqualified policy → either full, reduced, or flag “overqualified” depending on what you coded. The important part is naming the policy, not pretending there is one universal ATS truth.

### Education ladders for Indian programs

Define an ordered ladder such as Diploma &lt; BCA/B.Sc &lt; B.Tech/BE &lt; MCA/M.Sc &lt; M.Tech. Matching exact level scores full education weight; adjacent level may score partial; large gaps score zero. MCA vs B.Tech debates happen in real placement conversations — having a documented ladder stops hand-waving when the panel asks “how do you compare degrees?”

### Skill matching beyond exact strings

Pipeline: normalize case → expand synonyms → optional stemming light touch → set intersection with required skills. Soft skills (“communication”) are fuzzy; either keep a separate low weight bucket or require evidence phrases. If you use embeddings for skills too, explain how you threshold similarity (for example treat as match if cosine ≥ 0.82) and show one false-positive you observed in testing — credibility comes from admitting errors.

## What belongs in improvement suggestions

Good: “JD lists Docker; resume missing Docker — add a project bullet showing containerization.” Bad: “Become a better person” or skills not present in the JD. The generate stage should receive `missing_skills`, `component_scores`, and maybe `matched_skills` as structured context. If suggestions drift, tighten the prompt: “Only mention gaps from the missing_skills list.”

### Radar chart vs bars

Radar looks “AI product-y” and photographs well for the report. Grouped bars are easier to read exact values. Either is fine; print both in appendix if you want. Ensure axis scales are 0–max weight or 0–100 consistently so a skills score of 32 on a 40-weight axis is not mistaken for 32/100 total.

## Failure modes and UX copy

- Scanned PDF → “Could not extract text; paste resume or use a text PDF.”  
- Empty skills array → show extraction warning; do not silently score zero without explanation.  
- JD with zero required skills → validation error before scoring.  
- Embedding API down → degrade to skills/education/experience only if you coded fallback; else fail visibly.

Visible failure is better than a confident 0 that looks like a bad candidate.

## Campus placement framing

Many Indian final-year panels accept “helps students prepare for ATS-like filters before placement drives” as motivation. Tie Chapter 1 to that without claiming corporate partnerships you do not have. Seed JDs for roles your training and placement cell actually discusses: Java backend intern, Python data intern, MERN full-stack intern. Keep packages and company names fictional.

### Academic integrity note

Do not submit classmates’ resumes as your dataset in the report appendix without consent. Synthetic resumes labeled “Sample Candidate A/B” are enough for screenshots and tests.

## Whiteboard script (90 seconds)

1. Draw three stages: Extract → Score → Generate.  
2. Under Score, write four weights summing to 100.  
3. Work one skills example: 8/10 × 40 = 32.  
4. Say: “LLM never outputs the total; Python does.”  
Stop talking. That silence is fine — you just answered the architecture question.

## Comparison table for multi-project vivas

If your batch also presents RAG or Chat with Data, clarify: Resume/JD Matcher optimizes explainable scoring, not retrieval citations or sandbox code execution. Point examiners to [three AI patterns](/blog/three-patterns-for-ai-projects). Product links for contrast: [Chat with Data](/projects/chat-with-data) and [Chat with PDF](/projects/pdf-rag-chat).

## Common mistakes

Title slide says “AI scores resumes” with no mention of formulas. Demo uses only one resume so ordering is unproven. Weights in slides disagree with code. Generated suggestions mention skills not in the JD. Claiming “0% bias.” Hiding extraction JSON so nobody sees garbage-in. Re-asking the LLM for a total “just to confirm” — undermines your whole thesis. Changing synonym maps live until the score looks “nice.” Using a real celebrity resume that is a scanned image and failing extraction on stage.

## End-to-end numeric walkthrough (memorize one)

JD requires: Python, SQL, Docker, AWS, React, Git, Linux, REST, Communication, System Design (10 skills, weight 40). Resume matches 7 after synonyms (misses Docker, AWS, System Design). Skills = 28. Experience weight 25: JD 1–3 years, resume 2 years → 25. Education weight 20: both B.Tech → 20. Semantic weight 15: cosine 0.70 maps via your function to 11 (example). Total = 28+25+20+11 = 84. Missing skills list drives suggestions mentioning Docker/AWS/System Design only. Rehearse this single walkthrough until you can do it without notes; it ends most scoring debates.

## Pre-viva checklist

- [ ] Sample resume + JD produce stable scores across two runs  
- [ ] Radar readable on projector  
- [ ] Whiteboard formula for skills component memorized  
- [ ] Synonym example ready (ML / Machine Learning)  
- [ ] Ethical one-liner ready  
- [ ] Strong vs weak resume ordering verified  
- [ ] PDF failure message checked  
- [ ] Weights on slide match Chapter 4  

## Related reading

See also [three AI patterns](/blog/three-patterns-for-ai-projects) and [what examiners look for in demos](/blog/what-examiners-look-for-demo).

## Project kits

- **[Resume / JD Matcher](/projects/resume-jd-matcher)** — full scoring methodology, weights, and report-ready diagrams.  
- **[Chat with Data](/projects/chat-with-data)** — another non-RAG AI pattern useful for contrast questions.

**Takeaway:** Decompose the score into named weighted components so every point is auditable; keep the LLM off the final arithmetic. The Resume/JD Matcher kit documents weights and formulas so you can defend explainability without hand-waving.
