---
title: "Top 10 computer vision project ideas for final year"
seoTitle: "Top 10 Computer Vision Final Year Projects"
excerpt: "Ten computer vision project ideas for B.Tech, BCA, and MCA students in India, with the problem, stack, demo, and the question the examiner will ask."
category: "Guides"
readTime: "14 min read"
date: "2026-10-07"
author: "Rajan"
---

Every year, hundreds of students across India walk into their final year saying the same sentence: "Sir, I want to do something in computer vision." It is a good instinct. A vision project is visual, so the demo does half the talking. A panel member who is not an AI specialist can still look at the screen and see that something is happening.

But vision is also where students get hurt the most. A model that scored 97% in a notebook falls apart under the tube light of the viva room. A dataset downloaded from the internet turns out to have the same photo in both train and test folders. A "real-time" demo runs at two frames per second on a college laptop. A project about faces gets a hard question about privacy that nobody prepared for.

This post lists ten computer vision ideas that are realistic for a semester, with the problem, the stack, what you should demo, and the question an examiner is most likely to ask. Three of them have ready-made starting points. The other seven are ideas you can build yourself, and a few come with a warning about scope. Plain English throughout, and no promises that any one idea will get you marks. Your preparation does that.

## How to use this list

Do not read this as a menu where you pick the coolest name. Read it as a filter. For each idea, ask three questions:

1. **Can I get honest data?** Not "can I download a dataset," but "can I collect or legally use images that look like my demo conditions?"
2. **Can I show it working in under three minutes on my own laptop?** Without internet, if possible. College Wi-Fi fails on viva day more often than anyone admits.
3. **Can I explain every stage of the pipeline in plain words?** Capture, preprocess, model, decision, output. If one stage is a black box to you, the panel will find it.

Then pick one primary idea and one small extension. A student who does one thing properly and measures it beats a student who combines five things and measures none.

Also decide early whether you are training a model or using a pretrained one. Both are acceptable. What is not acceptable is saying you trained something you only loaded. If your work is the workflow around a pretrained model, say that clearly. If you trained a CNN, keep your training logs, your split sizes, and your confusion matrix ready. For the second case, [CNN image classification viva questions](/blog/cnn-image-classification-viva) is worth reading before you start, not the night before.

## The 10 ideas

### 1. Face recognition attendance

**Problem.** Taking attendance by roll call wastes ten minutes of every lecture, and proxy attendance is a real problem in large classes. The system registers each student, recognises faces from a webcam or a classroom photo, and writes attendance with a timestamp.

**Stack.** Python, OpenCV, the `face_recognition` library for face encodings, Pandas for the log, and Streamlit for a simple interface. The [Face Recognition Attendance System](/projects/face-recognition-attendance) kit follows this shape, with the workflow, report, and viva material already organised.

**Demo.** Enroll three or four classmates live. Mark attendance from the webcam. Show an unknown face being rejected instead of guessed. Export the CSV. Then show what happens with a bad-light frame and say out loud what you do about it.

**Examiner question.** "What is the difference between a face encoding and a photo, and what happens when two students look alike?" Prepare your threshold choice and your duplicate-marking rule. The detailed answers are in [defending a face recognition attendance system in viva](/blog/defending-face-recognition-attendance-viva).

### 2. Plant disease classification

**Problem.** A farmer or agriculture student photographs a leaf and wants to know what is wrong with it. This is a clean image classification task with a clear social use, which makes it easy to justify in Chapter 1.

**Stack.** Python, TensorFlow/Keras, OpenCV for preprocessing, NumPy, and Streamlit for upload and prediction. The [Plant Disease Classification](/projects/plant-disease-classification) kit is built around this pipeline.

**Demo.** Upload a leaf image, show the predicted class with confidence, and show the top three predictions instead of just one. Then upload a photo of something that is not a leaf and show how the system behaves. A project that handles "I don't know" gracefully looks mature.

**Examiner question.** "Your dataset has clean lab-style leaves on plain backgrounds. Will this work on a farmer's phone photo in a field?" The honest answer is "not reliably, and here is our test showing the drop." Say that before they do.

### 3. Traffic sign recognition

**Problem.** Classify road signs from cropped images, the first building block of driver assistance systems. It is a well-known problem with many classes, which makes your evaluation more interesting than a two-class demo.

**Stack.** Python, TensorFlow/Keras, OpenCV, and Streamlit. The [Traffic Sign Recognition](/projects/traffic-sign-recognition) kit covers this pipeline.

**Demo.** Upload a sign image and show the predicted class. Then show your per-class accuracy and point at the two or three classes that confuse the model, such as similar speed-limit signs. Showing your weak spots is a strength in a viva, not a weakness.

**Examiner question.** "Most public datasets use European signs. Does your model know Indian road signs?" If you used a European dataset, say so. If you added Indian samples, say how many. Do not claim Indian road readiness from a dataset that does not include Indian roads.

### 4. PPE detection (helmet, vest, mask)

**Problem.** Factories, construction sites, and labs need to check whether people are wearing safety gear. This is an object detection task, which sounds like a step up from classification, and it is.

**Stack.** Python, OpenCV, and a pretrained object detector fine-tuned on a small labelled set (for example a YOLO-family model), with Streamlit or a simple OpenCV window for display.

**Demo.** Run on a short pre-recorded video, since you cannot bring a construction site into the viva room. Draw boxes, show a count of "compliant" and "non-compliant" people, and save the frames where a violation was flagged.

**Examiner question.** "How did you label your data, and how many images per class?" Labelling is where this project is won or lost. Keep it small: two or three classes, a few hundred well-labelled images, and honest metrics. Stay away from claims about "real-time safety monitoring" unless you can prove the frame rate.

### 5. Handwritten digit recognition for classroom use

**Problem.** Read digits written on a form, a marks sheet, or a roll number box. MNIST makes the toy version trivial, so the interesting part is the gap between MNIST and real handwriting.

**Stack.** Python, a small CNN in Keras, OpenCV for cropping, thresholding, and cleaning a scanned or photographed sheet, and Streamlit for upload.

**Demo.** Take a printed grid, have five friends write digits in it, photograph it, and run the pipeline. Show the cropped cells and the predictions side by side. The preprocessing is the real engineering here, so show it.

**Examiner question.** "Your model got 99% on MNIST. What did it get on your classmates' handwriting?" Build a small test set of your own handwriting samples and report that number separately. It will be lower, and that is the point.

### 6. Vehicle and number plate detection (scope carefully)

**Problem.** Detect vehicles in a frame and read the plate. Students love this one and it goes wrong often, because plate reading is really three problems: finding the plate, cleaning the crop, and reading the characters.

**Stack.** OpenCV for detection and cropping, a pretrained detector or classical contour approach, and an OCR library for reading text.

**Demo.** Use clear, front-facing, daylight images of parked vehicles, ideally ones you captured yourself. Show each stage as its own image: original, detected plate, cleaned crop, text output.

**Examiner question.** "Where did your images come from, and is it appropriate to store them?" Number plates link to a person. Use your own vehicles or those of consenting friends, blur plates in your report screenshots, and do not call it a surveillance system. Limit the claim to "plate localisation and reading on controlled images." That is a scope you can defend.

### 7. Emotion detection from faces (handle the ethics)

**Problem.** Estimate whether a face looks happy, sad, angry, or neutral. It is popular because it feels intelligent. It is also the idea that needs the most careful framing.

**Stack.** Python, a small CNN in Keras, a face detector from OpenCV, and a public facial expression dataset.

**Demo.** Webcam in, face box and label out. Include a slide showing the labels your model confuses most, usually fear and surprise.

**Examiner question.** "Does a smile mean a person is happy?" The sensible answer: your system classifies facial expression, not inner emotion. Facial expression datasets are also heavily imbalanced and culturally narrow. Write a short limitations section, state that you do not use it to judge students, employees, or candidates, and keep the use case modest, such as a feedback mood chart on consented volunteers.

### 8. Document scanner with classification

**Problem.** Take a phone photo of a page, straighten it, clean it up, and decide what kind of document it is: marksheet, ID card, invoice, or letter. Useful, relatable, and light on hardware.

**Stack.** OpenCV for edge detection, perspective transform, and thresholding; a small classifier (a simple CNN or even a classical feature approach) for the document type; Streamlit for upload.

**Demo.** Photograph a page at an angle on a desk. Show the detected corners, the flattened scan, and the predicted document type. Everything runs offline.

**Examiner question.** "What happens when the page edges are not visible?" Have a fallback: show a message and let the user crop manually. Use dummy documents you created, never real Aadhaar cards or marksheets of other people.

### 9. Face-based access control (and why it is not attendance)

**Problem.** Open a lab or locker only for authorised people. This looks like face attendance but it is a different problem, and a sharp examiner will test whether you know the difference.

Attendance can tolerate mistakes: a wrongly missed student can be fixed by the teacher in a minute. Access control cannot: a wrongly accepted stranger is a security failure. So the thresholds, the false-accept rate, and the spoofing question matter far more here.

**Stack.** Python, OpenCV, `face_recognition` or a similar embedding approach, and a simple log of allow and deny events. Simulate the door with an on-screen "unlocked" message instead of wiring hardware.

**Demo.** Show an enrolled person being accepted, a stranger being rejected, and a photo held up to the camera. Be ready for that photo to fool a basic system, and explain what a blink check or depth cue would add.

**Examiner question.** "How would someone fool this?" Answer with the printed-photo attack and your mitigation, even if the mitigation is a stated future improvement.

### 10. Offline OpenCV demo suite

**Problem.** Not every strong vision project needs a neural network. A small suite of classical techniques, such as colour-based object tracking, motion detection, people counting at a doorway line, and edge-based shape counting, can show real understanding of how images work.

**Stack.** Python and OpenCV only, with Streamlit or plain windows. No GPU, no internet, no model downloads.

**Demo.** Four or five short, reliable demos from pre-recorded clips, each with a one-line explanation: what the pixel-level idea is, and what breaks it. Colour tracking breaks under changing light. Motion detection breaks with a swaying curtain.

**Examiner question.** "Why not use deep learning for this?" Good answer: classical methods are faster, need no training data, and are enough when the environment is controlled. Knowing when not to use a CNN is a sign of maturity.

## Which one should you pick?

Use this short filter.

- **You want the lowest risk and a complete submission.** Pick one of the first three. Each one comes with a clear pipeline, and you spend your time customising, testing, and preparing the viva rather than fighting setup problems. You can look at the [project kits](/final-year-projects) to see what each includes.
- **You want a harder technical story.** Pick PPE detection, but keep the classes few and the video short.
- **You have no good internet or GPU.** Pick the document scanner or the offline OpenCV suite.
- **You are worried about ethics questions.** Avoid emotion detection and plate reading unless you are comfortable writing a proper limitations chapter.

Whatever you choose, add one small difference that is yours: a different class set, your own test photos, a failure analysis, an Indian-context dataset slice. If your whole batch picks face attendance, the difference matters a great deal. There is a longer discussion in [choosing a final year project](/blog/choosing-a-final-year-project).

## Common traps in vision projects

**Data leakage.** The same image, or near-duplicates from the same video, ends up in both training and test sets. Your accuracy looks wonderful and means nothing. Split by source (by person, by plant, by video) before you split by image.

**Dataset hygiene.** Write down where each dataset came from, its licence, its size, and any cleaning you did. Remove corrupt files and obvious wrong labels. Keep a README in the data folder. If a panel member asks "where is this from," a one-line answer builds trust.

**Reporting only accuracy.** For imbalanced data, accuracy hides failure. Show precision, recall, and the confusion matrix. Mention which class fails and why.

**Testing on training conditions only.** Test with your own phone photos, a different room, and a different time of day. A short table of "lab accuracy vs our own photos accuracy" is one of the most credible things you can put in a report.

**Privacy afterthoughts.** If your project touches faces or plates, get consent for every image of a real person, store as little as possible, and mention it in the report. Prefer storing encodings or processed outputs over raw photos when you can.

**Demo that needs the internet.** Download your model weights, sample images, and fallback videos to the laptop. Have screenshots of a successful run in your slides in case the camera driver misbehaves.

**Overclaiming.** "Real-time," "99% accurate," "production-ready," and "works in all conditions" are phrases that invite attack. Replace them with numbers and conditions: "about 12 frames per second on an i5 laptop, in indoor light, with one face."

**Not knowing your own pipeline.** If you cannot say what image size goes into the model and why, or what the confidence number means, practise until you can. The [what examiners look for in a demo](/blog/what-examiners-look-for-demo) post covers how panels read a live run.

## Takeaway

A good computer vision final year project is not the one with the fanciest model. It is the one where the data is honest, the demo runs on your laptop without drama, the failures are shown instead of hidden, and you can explain each stage in plain English. Pick one idea from this list, narrow it until it fits in a semester, measure it on your own test images, and write down what it cannot do. That combination, more than the topic name, is what panels remember.

If you would rather start from a working pipeline than a blank folder, the three vision kits linked above are built for exactly that: you customise, test, and learn the system, and the viva material is there to help you rehearse. Use them as a scaffold, and make sure the final submission is something you can defend line by line.
