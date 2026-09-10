---
title: "Defending Chat with YouTube in viva — transcript, timestamps, and fallback"
excerpt: "How to explain caption extraction, Whisper fallback, chunk-to-timestamp mapping, and clickable citations when your project is video Q&A."
category: "Viva Prep"
readTime: "10 min read"
date: "2026-05-02"
---

Video RAG adds one layer PDF projects do not have: time. Every answer must cite mm:ss and jump the player there. Examiners will ask how you get transcripts when captions are disabled. Have a three-layer fallback story ready.

![Cover](/blog/defending-chat-with-youtube-viva.png)

## Transcript pipeline

Layer 1: youtube-transcript-api for official captions. Layer 2: yt-dlp for auto-generated captions. Layer 3: Groq Whisper on downloaded audio when captions missing. This ordering minimizes cost and latency.

## Timestamp citations

Each chunk stores start_time and video_id. UI renders clickable timestamp; JavaScript seeks embedded player. Explain this is metadata from chunking, not LLM guesswork.

## Multi-video sessions

Optional feature: index multiple URLs; retrieval returns video_id in metadata. Good viva differentiator if implemented.

## Comparison to PDF RAG

Same embed-retrieve-generate core; ingestion differs. Shows you understand modular architecture.

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



## YouTube-specific examiner questions

**Q: Copyright?** A: Academic demo using publicly available videos with attribution; system does not redistribute full video files in submission.

**Q: Video length limits?** A: State your max duration (e.g., 30 minutes) due to transcription cost and indexing time — scope control.

**Q: Language support?** A: Whisper handles multiple languages; caption API may return translated captions — specify what you tested.

### Player integration

Explain iframe embed vs direct stream. Timestamp seek uses YouTube IFrame API `seekTo(seconds)`. Walk through one code path from citation click to player jump.

### Chunk boundary at timestamps

When splitting transcript, store `start_time` of first sentence in chunk. Overlap prevents losing context across 30-second windows. Draw timeline on whiteboard if asked.

### Failure demo is mandatory

Show video with captions disabled — walk through Whisper fallback. This single demo proves you understand the hardest part of video RAG.

### vs PDF project comparison

Same retrieval stack; ingestion differs. PDF uses page metadata; video uses timestamp metadata. Examiners may ask which you would pick for a lecture series — answer video; for policy manual — PDF.

### Rate limiting and API keys

YouTube may throttle transcript requests. Explain caching transcript after first fetch. Groq Whisper API key in environment variable — never commit to git.

### Shorts vs long video

State whether YouTube Shorts supported — often different caption behavior. Scope statement prevents examiner testing random URL types you never validated.

## Extended technical Q&A

**Q: Chunk size for transcripts?** 30–60 second windows or sentence-based with overlap — justify choice.

**Q: Multiple speakers?** Captions may lack speaker labels — limitation unless diarization added.

**Q: Non-English video?** Whisper multilingual model name and one tested example.

**Q: Storage?** Transcript cached in session or disk — re-fetch policy on same URL.

### Architecture whiteboard extended

YouTube URL → video_id extract → transcript fetch chain → chunk with timestamps → embed → FAISS → query → retrieve → LLM → answer + mm:ss link → iframe seek.

Practice narrating while drawing under 90 seconds.

### Compare to PDF kit

Same retrieval; ingestion differs. Mention [Chat with PDF](/projects/pdf-rag-chat) sibling project for contrast in multi-project viva if classmate had PDF variant.

### Legal and ToS awareness

YouTube Terms restrict some automated access — academic fair-use narrative: limited transcript fetch for demonstration, no bulk redistribution. Honest scope statement.

If live demo uses one cached video URL rehearsed beforehand, say so — prevents random URL failure during stress.

## Bandwidth and lab constraints

Downloading audio for Whisper fallback may be slow on college Wi-Fi — cache test video locally or use pre-downloaded asset for demo room. Mention this practical decision if asked about deployment — offline cache folder is valid engineering workaround for demo reliability, not cheating scope.

### Quick reference before viva

Re-read your abstract, test the demo path once on presentation hardware, and sleep. Prepared beats perfect.

## Related reading

See also [defending Chat with PDF](/blog/defending-chat-with-pdf-viva).

## Project kits

- **[Chat with YouTube](/projects/chat-with-youtube)** — complete transcript fallback chain.
- **[Chat with PDF](/projects/pdf-rag-chat)** — baseline RAG for comparison.

**Takeaway:** Explain caption → fallback → chunk → timestamp citation chain without hand-waving. Chat with YouTube kit documents every fallback layer.
