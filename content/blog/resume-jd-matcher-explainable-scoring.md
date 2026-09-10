---
title: "Explainable scoring in Resume/JD Matcher — why black-box LLM grades fail"
excerpt: "Break down the four weighted components — skills, semantic fit, experience, education — and why deterministic scoring beats asking the LLM for one number."
category: "Architecture"
readTime: "9 min read"
date: "2026-05-18"
---

Asking an LLM 'score this resume 0-100' produces a number with no audit trail. Examiners and users cannot trust it. Extract-Score-Generate splits the pipeline: LLM extracts structured fields, your code computes weighted scores, LLM explains gaps. Every point on the radar chart traces to a formula you can show on a whiteboard.

![Cover](/blog/resume-jd-matcher-explainable-scoring.png)

## Four components

Skill match: overlap between JD required skills and resume skills, with synonym normalization. Semantic fit: embedding similarity between resume summary and JD description. Experience: years vs required range. Education: degree level match. Weights sum to 100 — document them in report Chapter 4.

## Why not pure LLM scoring

Non-reproducible, no component breakdown, fails academic rigor. Deterministic formula same input → same output — testable.

## Visualization

Radar chart makes viva demo intuitive. Missing skills list drives improvement suggestions.

## Viva questions

Walk through formula for one component with example numbers. Explain synonym map: ML = Machine Learning.

### Formula documentation example

Skills component: `(matched_skills / required_skills) * weight_skills`. Show numeric example in report: 8/10 skills × 40 weight = 32 points. Examiners remember concrete arithmetic.

### Synonym and normalization

Maintain small dictionary: ML/Machine Learning, JS/JavaScript, K8s/Kubernetes. Explain maintenance — synonyms are configurable without retraining models.

### LLM role boundaries

LLM extracts JSON fields; it does not assign final score. If LLM extraction fails, fallback regex or manual form — mention as future work if not implemented.

### Ethical positioning

Tool is educational ATS-like analyzer, not claim of matching real company hiring systems. Honesty builds credibility.

### Demo flow

Upload sample resume from kit, paste backend JD, show radar chart, read one missing skill aloud, show generated improvement bullet. Under 3 minutes.



## Why decomposed scoring beats one LLM number

Recruiters and examiners distrust black-box percentages. Decompose into Skills Match, Experience Match, Education Match, and Keyword Overlap — each with defined weight summing to 100. Show formula in report Chapter 4.

### Extract phase details

LLM returns JSON: skills array, years experience, education level. Use structured output or JSON mode. Validate schema with pydantic — invalid JSON triggers retry.

### Score phase is yours

Python function compares extracted fields to JD requirements. No LLM randomness in numbers — reproducible demo. Same resume + same JD = same score every time.

### Generate phase narrative

LLM reads score breakdown and writes improvement suggestions — "Add Docker to skills section" — grounded in low sub-scores.

### Viva questions on fairness

Acknowledge bias: keyword stuffing inflates scores; system is assistive not hiring authority. Future work: semantic skill matching with embeddings.

### Demo datasets

Use anonymized sample resumes. Do not upload real classmates' CVs in viva room without permission.

### Testing

Pair of resumes — one strong match, one weak — with expected score ordering. Document in Chapter 6.

### Weight tuning

Weights 40% skills, 30% experience, 20% education, 10% keywords — justify in report. Sensitivity: change weight ±10% and show score shift in demo for one candidate.

### PDF parsing path

Resume upload may use pdfplumber — mention extraction errors on multi-column CVs as known limitation.

## UI walkthrough for viva

Upload resume PDF → upload or paste JD → show extracted skills side by side → reveal score breakdown bars → read LLM improvement paragraph → change one skill on resume re-upload → score changes predictably.

### JSON schema example

Show examiner expected extract shape: `{"skills": ["Python","SQL"], "years_experience": 2, "education": "B.Tech"}` — validation prevents garbage in score phase.

### Comparison to pure LLM grading

Pure LLM: non-reproducible, unexplainable. Your pipeline: reproducible numbers, narrative layer optional. This is the core architectural defense.

### Ethical framing

Tool assists candidate preparation, not automated hiring decision — state clearly for panel concerned about bias.

### Score threshold UX

Green above 75, amber 50–75, red below — visual cue for demo. Thresholds configurable constants in code, not magic LLM numbers.

Link extract phase failures to user message: "Could not parse resume — try text-based PDF" — UX polish examiners notice.

## Presentation slide for scoring formula

Dedicated slide showing weighted components adds thirty seconds of clarity high-scoring students include. Visual bar chart of sub-scores beats paragraph in report during fast viva. Prepare sentence: "LLM extracts once; Python scores deterministically; LLM narrates gaps — three stages, two different roles for AI." That sentence often ends follow-up questions because architecture is suddenly clear.

### Quick reference before viva

Re-read your abstract, test the demo path once on presentation hardware, and sleep. Prepared beats perfect.

### Final checklist

Print report binding copy night before. Carry charger and HDMI adapter. Arrive fifteen minutes early to test projector resolution. Confirm sample login credentials work. These logistics seem minor until they fail publicly — students lose marks from environment issues unrelated to understanding.

## Related reading

See also [extract-score-generate pattern](/blog/three-patterns-for-ai-projects).

## Project kits

- **[Resume / JD Matcher](/projects/resume-jd-matcher)** — full scoring methodology in report.
- **[Chat with Data](/projects/chat-with-data)** — another non-RAG AI pattern.

**Takeaway:** Decompose score into named weighted components — auditable beats opaque. Resume/JD Matcher documents every weight and formula.
