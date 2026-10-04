---
title: "Top 10 AI/ML final year project ideas for 2026"
seoTitle: "Top 10 AI/ML Final Year Project Ideas 2026"
excerpt: "Ten AI/ML final year project ideas with stack, demo plan, and the question examiners ask — plus how to pick one you can actually finish and defend."
category: "Guides"
readTime: "14 min read"
date: "2026-10-04"
author: "Rajan"
---

Most AI/ML final year projects fail for one boring reason: the student picked a title for how it sounds, not for what they can demo in ten minutes and explain for twenty. This list is built the other way round. Each idea below has a clear problem, a realistic stack, a demo you can run on stage, and the question an examiner is most likely to ask.

Everything here assumes an Indian B.Tech, BCA, or MCA timeline: roughly three to four months, a guide with limited time, and a lab PC you do not control. If you want a wider view of the whole category first, the [AI/ML project hub](/final-year-projects/ai-ml) lists every kit in one place.

## How to use this list

Do not read all ten and bookmark them. Use the list like this:

1. Cross out any idea whose data or API you cannot get access to this week.
2. Cross out any idea where you cannot name the one thing you will explain in viva (retrieval, a confusion matrix, a scoring formula).
3. From what is left, pick the two where you already know the language and libraries.
4. Spend one evening building the smallest possible version of each. The one that surprises you less wins.

Also keep in mind that a title is not a project. "Fake news detection" can be a notebook with 91% accuracy and no explanation, or a small app that shows which words pushed the prediction. The second one gets better marks with the same effort. If you are weighing AI against a web-app path, read [AI vs MERN for your final year project](/blog/ai-vs-mern-final-year-project) before you commit.

## The 10 ideas

### 1. Chat with PDF (RAG question answering)

**Problem:** Students and clerks lose time hunting through long PDFs such as syllabi, circulars, or research papers. They want to ask a question and see the answer with the page it came from.

**Stack:** Python, a PDF parser, sentence embeddings, FAISS or a similar local vector index, an LLM API for answer generation, Streamlit for the UI.

**What to demo:** Upload a real PDF, ask three questions live, and show the cited pages. Then ask one question the PDF cannot answer and show the system saying so instead of inventing something.

**Examiner angle:** "How do you stop the model from hallucinating?" Your answer should cover chunking, top-k retrieval, a refusal rule, and citations. A ready-made starting point is the [Chat with PDF kit](/projects/pdf-rag-chat); you will still need to understand every layer, and [how RAG works](/blog/how-rag-works) is a good primer.

### 2. Chat with YouTube videos

**Problem:** Long lectures are painful to revisit. A student wants to ask "where did the professor explain normalization?" and jump to that moment.

**Stack:** Python, YouTube transcript extraction, chunking by time window, embeddings, a vector index, an LLM for answers, Streamlit or a light web UI.

**What to demo:** Paste a lecture link, ask a question, and show the answer together with timestamps. Pick a video you have already tested; live demos with random links are risky.

**Examiner angle:** "What if the video has no captions?" Have an honest answer, such as a speech-to-text fallback or a clear error message. The [Chat with YouTube kit](/projects/chat-with-youtube) follows this pattern, and [defending chat with YouTube in viva](/blog/defending-chat-with-youtube-viva) covers the usual questions.

### 3. Face recognition attendance

**Problem:** Manual roll calls waste lecture time and proxy attendance is common.

**Stack:** Python, OpenCV, a face detection and embedding library, a small database (SQLite is fine), and a dashboard for attendance reports.

**What to demo:** Enroll three classmates, run recognition from a webcam, and show the attendance table updating. Show one unknown face being rejected.

**Examiner angle:** Privacy, accuracy under poor lighting, and spoofing with a photo. Prepare a threshold explanation and a limitation slide. The [Face Recognition Attendance kit](/projects/face-recognition-attendance) is a common starting point, and [defending face recognition attendance](/blog/defending-face-recognition-attendance-viva) lists the questions to rehearse.

### 4. Plant disease classification

**Problem:** Small farmers and agriculture students need a quick first check on whether a leaf looks diseased, before they consult an expert.

**Stack:** Python, TensorFlow or PyTorch, transfer learning with a pretrained CNN, a public leaf dataset, and a simple upload-and-predict interface.

**What to demo:** Upload a leaf photo, show the predicted class with confidence, and show the confusion matrix from your test set. Include one misclassified image and explain why it failed.

**Examiner angle:** "Why transfer learning and not a model from scratch?" and "Is your test set truly unseen?" Data leakage between train and test is the classic trap. The [Plant Disease Classification kit](/projects/plant-disease-classification) pairs well with [CNN image classification viva prep](/blog/cnn-image-classification-viva).

### 5. Resume and job description matcher

**Problem:** Recruiters and students both struggle to see how well a resume fits a job post. Keyword counting is crude and unfair.

**Stack:** Python, text extraction from PDF or DOCX, skill extraction, embeddings or TF-IDF similarity, and a scoring breakdown shown in the UI.

**What to demo:** Upload one resume and one job description. Show the overall match score and, more importantly, which skills matched, which are missing, and how each contributed to the score.

**Examiner angle:** "Is your score fair, and can you explain it?" Explainable scoring is the whole point. See the [Resume JD Matcher kit](/projects/resume-jd-matcher) and the post on [explainable scoring for resume matching](/blog/resume-jd-matcher-explainable-scoring).

### 6. Fake news detection

**Problem:** Misleading headlines spread fast on messaging apps. A first-pass classifier can flag suspicious text for a human to check.

**Stack:** Python, scikit-learn, TF-IDF with logistic regression or an SVM as a baseline, optionally a small transformer for comparison, and a Streamlit page for pasting text.

**What to demo:** Paste a headline, show the label and probability, and show the top words that pushed the decision. Display a comparison table of two or three models.

**Examiner angle:** "Does your model learn truth or just writing style?" That is a fair challenge, because most public datasets differ by source. Admit it, show a cross-source test if you can, and you will look prepared. The [Fake News Detection kit](/projects/fake-news-detection) is built around this baseline-first approach.

### 7. Sentiment analysis dashboard

**Problem:** Product reviews, course feedback, or social posts pile up, and nobody reads them all. Teams want a quick summary of what people feel and why.

**Stack:** Python, pandas, a classical or pretrained sentiment model, Plotly or Streamlit charts, CSV upload.

**What to demo:** Upload a CSV of reviews, show sentiment distribution, a trend over time, and the most negative comments. Add a filter by product or date.

**Examiner angle:** "How do you handle sarcasm, mixed language, and neutral text?" Hinglish reviews are common in India, so mention it as a limitation or test a few samples. The [Sentiment Analysis Dashboard kit](/projects/sentiment-analysis-dashboard) is a light, visual option if you want results that look good in a demo.

### 8. College FAQ chatbot

**Problem:** Admission, fee, and exam-cell questions repeat every year. A chatbot trained on your college's own notices can answer them any time.

**Stack:** Python, a document store of notices and FAQs, retrieval with embeddings, an LLM or a rule-based fallback, and a simple chat UI.

**What to demo:** Ask five real questions students ask, such as fee deadlines or hostel rules, and show answers with the source notice. Show a polite "I don't know, please contact the office" for something out of scope.

**Examiner angle:** "Who keeps the data up to date?" Describe an admin upload flow. The [College FAQ Chatbot kit](/projects/college-faq-chatbot) gives you the structure, and you bring the local content, which is what makes it yours.

### 9. Traffic sign recognition

**Problem:** Driver-assistance systems need to recognise road signs quickly. For students, it is a clean, well-bounded image classification task.

**Stack:** Python, TensorFlow or PyTorch, a public traffic sign dataset, data augmentation, and a small app that classifies uploaded images or webcam frames.

**What to demo:** Show training and validation curves, a confusion matrix, and live predictions on a few sign photos. Mention which classes are confused (similar speed limits, for instance).

**Examiner angle:** "What happens in rain, glare, or at night?" Include a small robustness test with brightened or blurred images. The [Traffic Sign Recognition kit](/projects/traffic-sign-recognition) covers the core pipeline, and you can extend it with your own robustness experiment.

### 10. Chat with your data (natural language to analysis)

**Problem:** Many people have spreadsheets but do not know SQL or pandas. They want to ask "which month had the highest sales?" and get a table or chart back.

**Stack:** Python, pandas, an LLM that generates safe queries or code, a sandboxed execution step, and Streamlit for upload and chat.

**What to demo:** Upload a CSV, ask three questions of increasing difficulty, and show both the answer and the generated query so the examiner can verify it.

**Examiner angle:** "Is it safe to run model-generated code?" This is the question that separates a thoughtful project from a risky one. Talk about allow-lists, read-only access, and validation. See the [Chat with Data kit](/projects/chat-with-data) and the [viva questions for chat-with-data](/blog/chat-with-data-viva-questions).

## How to pick one

Ten ideas are easy to admire and hard to choose between. Use these filters in order.

**Data access first.** Can you download the dataset or collect the documents today? Projects that wait on "permission from the college" often never start.

**Compute second.** Image classification can train on a free cloud notebook. Face recognition needs a webcam. LLM-based projects need API access from wherever you will demo. Match the idea to what your demo machine can do.

**Explanation third.** Choose the idea where you can already picture the diagram you will draw in viva. For RAG it is the retrieval pipeline. For CNNs it is the model and confusion matrix. For fake news it is features and a baseline comparison.

**Guide fourth.** Show your guide two options with one line each on what you will demo. Guides approve what they can picture. If you want a framework for this conversation, [choosing a final year project](/blog/choosing-a-final-year-project) walks through it step by step.

**Finally, uniqueness.** Every class will have a chat-with-PDF project. What makes yours different is the document set, the evaluation, or one extra feature you can defend. [How to differentiate when others build the same project](/blog/same-project-differentiate) has concrete ways to do this without bolting on random features.

## What a credible evaluation looks like

Almost every idea above can be upgraded from "it works" to "it works, and here is how well" with one small table. The table is what turns a demo into an engineering result.

For classification projects (plant disease, traffic signs, fake news, sentiment), report the baseline, your final model, and the metric on a held-out test set. Add per-class numbers if classes are uneven.

For retrieval and chat projects (PDF, YouTube, FAQ, data), write twenty questions with the answer you expect, run them, and mark each as correct, partly correct, or wrong. Twenty honest rows beat a vague claim that "it answers well".

For recognition projects (faces), record how often the right person was identified, how often an unknown person was wrongly accepted, and under what lighting you tested.

Keep this table in the report and on one slide. When an examiner asks "how do you know it works?", you point at the table instead of improvising.

## Common traps

**Accuracy without context.** "98% accuracy" means nothing if the classes are imbalanced or the test set leaks. Report precision, recall, and a confusion matrix, and say what the baseline was.

**Demo depends on the internet.** If your project calls an API, college Wi-Fi may block it. Keep a screen recording, saved outputs, and a mobile hotspot plan.

**Copying notebooks you cannot explain.** Examiners often ask you to change one parameter live. If you cannot predict what will happen, the project looks borrowed.

**No limitations slide.** Every model fails somewhere. Showing where yours fails, and why, reads as maturity. Hiding it reads as inexperience.

**Scope creep.** Adding a mobile app, a blockchain layer, and a chatbot to an image classifier does not impress anyone. One idea, done properly, with a clean report is enough.

**Neglecting the report.** The best demo cannot rescue missing chapters. Plan your documents early. The [eight chapter report structure](/blog/eight-chapter-report-structure) is a safe skeleton.

For a closer look at what panels actually score, read [what examiners look for in a demo](/blog/what-examiners-look-for-demo).

## Cost and compute: what you actually need

Students often assume AI projects need paid tools. For most of these ten, that is not true.

Image projects (plant disease, traffic signs) train comfortably on a free cloud notebook, and you can run predictions on a normal laptop afterwards. Text classifiers (fake news, sentiment) run on a CPU in minutes. Retrieval projects (PDF, YouTube, FAQ, data) need an embedding model and, usually, an LLM. Local embeddings and a local index like FAISS keep storage free, while the LLM call is the only part that may need an API key or a small model running on your own machine.

Whatever you choose, write down where each component runs and what happens if the network fails. That one paragraph answers a surprising number of viva questions before they are asked.

## A realistic four-week plan for any of the ten

**Week 1:** Lock the idea, collect data or documents, and get a bare pipeline running end to end, even if the results are poor.

**Week 2:** Improve the core component: better chunking, a stronger model, cleaner labels. Write down what you changed and why.

**Week 3:** Build the interface and the evaluation. Create a small table of test cases with expected and actual results.

**Week 4:** Write the report, rehearse the demo, and prepare ten viva questions with short answers.

Ready-made kits can compress weeks one and three, but they do not replace weeks two and four. Those are where your understanding gets built. If you want a structured starting point, browse the [AI/ML hub](/final-year-projects/ai-ml) and treat any kit as scaffolding to customise, not a finished submission.

## Key takeaway

Pick the AI/ML idea whose data you can get this week, whose demo fits ten minutes, and whose weak spot you can explain honestly. A modest project you can defend beats an ambitious one you cannot. Start with one idea from this list, build the smallest working version in a weekend, and let that experience decide.
