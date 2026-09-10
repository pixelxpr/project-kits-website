---
title: "Why Streamlit is the best demo stack for AI final year projects"
excerpt: "React takes weeks; Streamlit gets your RAG or analytics demo in front of examiners in days. Here is how to structure a Streamlit app for viva-ready polish."
category: "Architecture"
readTime: "8 min read"
date: "2026-04-15"
---

Examiners judge what they can see running. Streamlit lets you ship upload widgets, chat history, and charts in Python — the same language as your ML pipeline. You are not learning JSX, state management, and a separate API layer while also debugging embeddings. For final year timelines, that tradeoff is rational, not lazy.

![Cover](/blog/streamlit-final-year-ai-demos.png)

## Streamlit vs React for AI demos

Streamlit: single Python file, hot reload, built-in file uploader and chat components. React: better for production UX, but 2-3x longer to reach the same demo if you are new to frontend. For viva: Streamlit wins on time-to-demo.

Use React MERN kits when the project *is* the web app — library, hotel, ecommerce. Use Streamlit when the project *is* the AI pipeline.

## Structuring a viva-ready Streamlit app

Sidebar: API key input, model settings, clear session button. Main area: upload → processing spinner → chat or results. Always show citations or generated code — traceability impresses panels. Add st.expander for 'Retrieved chunks' so examiners see retrieval working.

## Common Streamlit mistakes

No loading state during embedding — panel thinks it crashed. Hard-coded paths — demo fails on examiner laptop. No error message when API key missing. Fix all three before submission.

## Deployment for demo day

Run locally with requirements.txt pinned. Optional: Streamlit Community Cloud for backup URL. Carry offline screenshots as last resort.

### File layout examiners appreciate

`app.py` entry, `retrieval.py`, `ingest.py`, `prompts.py` separation shows modularity. Even if the kit ships one file, splitting before submission demonstrates understanding. Mention modules in viva when asked about code organization.

### Session state patterns

Use `st.session_state` for chat history and uploaded file metadata. Clear button wipes state — demo this so panel sees fresh upload flow. Examiners notice when second upload breaks because state was not reset.

### API key handling

Never commit keys. Load from `.env` with `python-dotenv`. Sidebar password field for Groq/OpenAI key is acceptable for demo. Say aloud: "Keys are environment variables, not hard-coded" during setup slide.

### Making Streamlit look intentional

Custom page title, favicon, and centered column layout beat default wide Streamlit look. `st.set_page_config` first line. Consistent header markdown across pages signals polish without React.

### When to add a React frontend

If your guide mandates SPA architecture, use MERN kits instead. Streamlit is the right choice when the AI pipeline is the entire intellectual contribution and timeline is tight.


## Layout patterns that work in vivas

**Sidebar:** file upload, model settings, clear-index button. **Main:** chat history with citations expandable below each answer. **Footer:** disclaimer that answers are from uploaded source only.

Avoid cramming ten widgets on one screen — examiners sit far from the projector.

### Session state essentials

Streamlit reruns the script on every interaction. Use `st.session_state` for chat history, uploaded file handle, and vector index cache. Explain in viva why without session state the chat would reset — shows you understand the framework, not just copied widgets.

### Deployment options

Streamlit Community Cloud is free for public demos. For college lab offline demo, run `streamlit run app.py` locally. Mention you would add authentication before production — examiners like scope awareness.

### Common Streamlit viva questions

Why Streamlit over Flask+React? Faster UI for ML demos, Python-native, acceptable for academic scope. Why not Gradio? Both valid — cite faster chat layout customization in Streamlit if true for your project.

### Performance tips

Cache embedding index creation with `@st.cache_resource`. Show first-query delay vs subsequent queries. Large PDFs: show progress bar during indexing so panel knows system is working.

### Accessibility and UX polish

Add loading spinners during embedding. Show token count or chunk count after upload so panel sees indexing worked. Error messages in plain English — "PDF has no extractable text" beats Python traceback popup.

### Multi-page Streamlit optional

Some students split Upload and Chat across pages with st.navigation — mention if you use multipage pattern for cleaner viva walkthrough.

## Widget reference for viva

`st.file_uploader`, `st.chat_message`, `st.expander` for citations, `st.spinner` during embed — name widgets you used and why each fits UX.

## Theming

`.streamlit/config.toml` primary color — minor customization shows ownership.

## Alternative frameworks one-liner

Gradio faster for bare model demo; Streamlit better for multi-step upload-index-chat flow with sidebar controls — defensible choice.

## Error handling display

`st.error` user message vs logging full traceback server-side — professional separation examiners notice.

### Mobile layout note

Streamlit desktop-first — mention mobile not primary target for viva demo; acceptable for academic scope unless responsive CSS added.

Compare sidebar file size limit with college upload policy — 10MB PDF cap documented in README prevents demo surprise.

## Related reading

See also [three AI patterns](/blog/three-patterns-for-ai-projects).

## Project kits

- **[Chat with Data](/projects/chat-with-data)** — Streamlit + pandas + Plotly demo.
- **[Resume / JD Matcher](/projects/resume-jd-matcher)** — radar charts and score breakdown in Streamlit.

**Takeaway:** Streamlit keeps AI projects demo-ready fast — structure sidebar, main flow, and citation expanders for viva impact. All AI kits use Streamlit with viva-friendly layouts.
