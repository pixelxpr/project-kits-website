---
title: "Top 10 final year projects with live demo + CSV/export"
seoTitle: "Top 10 Final Year Projects With Live Demo + CSV Export"
excerpt: "Ten final year project ideas that end in a downloadable CSV, Excel sheet or log, so your viva demo shows output an examiner can open and check."
category: "Guides"
readTime: "14 min read"
date: "2026-10-09"
author: "Rajan"
---

Watch a few viva demos in a row and you notice something. The student clicks around, the screen changes, everyone nods politely, and ten minutes later nobody remembers what the project actually produced. Now picture the opposite: the student marks attendance, clicks "Download", and a CSV opens in Excel with 28 names, timestamps and a column for unrecognised faces. The examiner can scroll it, sort it, even disagree with a row. That demo sticks.

This post is built around one idea: **a project that produces a file is easier to defend than one that only shows screens.** A file is evidence. It can be checked against the database, pasted into the report appendix, and handed to the examiner. It also forces you to decide what your data really looks like, which is half of what a viva is probing.

Below are ten ideas for students across India, from BCA to B.Tech, each with the problem, a stack note, the demo and the export, and the question you should expect. Three of them are full kits on FinalYearKit. The others are domain ideas where the export is a small piece of work you add yourself. I will tell you which is which, because that difference matters in a viva.

## How to use this list

1. **Look at the export first.** For each idea, read the "Demo and export" line and ask: could I show this file on a projector without being embarrassed?
2. **Check the columns.** A useful export has an ID, a timestamp, a status and one more business field. If you cannot name six sensible columns, the domain is too thin.
3. **Decide who owns the file.** A good demo has a clear person who would download it, such as a librarian, a store manager or a teacher.
4. **Plan for a re-check.** Examiners sometimes ask you to do one more action and download again. Your export must reflect the change. Keep the demo data small so you can predict the numbers.
5. **Seed your data.** An export with three rows looks lazy. An export with three hundred random rows looks fake. Aim for realistic, a few dozen rows with a couple of awkward cases. [Seed data for a demo-ready viva](/blog/seed-data-demo-ready-viva) covers this properly.

If you are still comparing project types, [what examiners look for in a demo](/blog/what-examiners-look-for-demo) explains how panels judge what they see.

## What makes an export worth showing

Not every download is impressive. A dump of the raw database table is the weakest version, because it exposes internal IDs and half-finished fields. The strongest exports share a few habits:

- **Human headers.** "Student Name" beats `stu_nm`. Nobody on the panel should need a data dictionary.
- **A summary line.** One row or a note at the top such as "Generated on 09 Oct 2026, 28 of 32 present" tells the reader what they are looking at.
- **A filter in the file name.** `attendance_CS301_2026-10-09.csv` explains itself when it lands in the Downloads folder.
- **One source of truth.** The screen, the file and the report appendix should all come from the same query, so the numbers never disagree.

Also decide early whether you need CSV or Excel. CSV is simpler and opens everywhere. Excel (`.xlsx`) is nicer if you want two sheets, bold headers or a totals row, and in Python or Node it needs only a small library. For a viva, either is fine; what matters is that you can explain how the file is generated in two sentences.

## The 10 ideas

### 1. Face recognition attendance with a CSV log

**Problem:** Taking attendance by roll call eats the first five minutes of every lecture, and proxy attendance is an open secret in many classrooms.

**Stack:** Python, `face_recognition`, OpenCV, Streamlit, Pandas. The [Face Recognition Attendance kit](/projects/face-recognition-attendance) already uses this and runs from a webcam or an uploaded classroom photo.

**Demo and export:** Register five or six classmates, take a live or photo session, and show the recognised count against the enrolled count. Then download the attendance CSV by date and subject. This kit ships with that export, so you can spend your time explaining it instead of building it.

**Examiner will ask:** "What about the faces it missed?" Show the unmarked rows flagged for manual review, and talk about lighting honestly. [Defending the face recognition attendance project](/blog/defending-face-recognition-attendance-viva) has the full question list.

### 2. Inventory management with a stock ledger export

**Problem:** Small shops and college stores track stock in notebooks, so nobody knows what is running low until it is already gone.

**Stack:** React, Express, MongoDB, JWT. The [Inventory & Warehouse Management kit](/projects/inventory-management-system) tracks quantities per warehouse, purchase and sales transactions, reorder levels and separate admin and store-manager access.

**Demo and export:** Record a sale, watch the stock drop below the reorder level, and show the low-stock list. Be straight about one thing: the kit's listed features centre on dashboards and alerts, so a "download low-stock list as CSV" button is a small addition you write yourself. That is a good thing to do, because it is easy to explain.

**Examiner will ask:** "How do you make sure the numbers add up?" Answer with the idea of a ledger: opening stock plus purchases minus sales equals closing stock, and the CSV lets them verify it with a calculator.

### 3. Library management with overdue and loan reports

**Problem:** Overdue books go unnoticed, and fine disputes happen because nobody can show what was issued and when.

**Stack:** React, Express, MongoDB, shadcn/ui, JWT. The [Smart Library Management System kit](/projects/library-management-system) has admin, librarian and member roles, issue and return with availability tracking, and an audit log of every create, update and delete.

**Demo and export:** Issue two books, return one, and open the librarian view. Then add a "download overdue loans" export. The audit log already holds the raw events, so the export is mostly a query plus a CSV writer. Export the audit trail for a date range too; examiners like seeing a log they can read.

**Examiner will ask:** "Who can download this?" Only the librarian and admin, never a member. That answer links neatly to [library RBAC viva prep](/blog/mern-library-rbac-viva).

### 4. Hotel booking system with a bookings report

**Problem:** Front desks juggle phone calls, walk-ins and spreadsheets, and double-booked rooms lead to angry guests.

**Stack:** MERN with JWT. The [Hotel Booking System kit](/projects/hotel-booking-system) calculates the total from nights times room rate on the server and marks rooms occupied on check-in.

**Demo and export:** Book a room, show it blocked for the same dates, then export "bookings between two dates" with guest, room, nights and amount. Add a total revenue row at the bottom of the sheet.

**Examiner will ask:** "Where is the total calculated?" The right answer is on the server, never trusted from the browser. The export should match the figure on screen to the rupee.

### 5. Restaurant order reports

**Problem:** A restaurant owner wants to know which dishes sell, which table was busiest and what the day's takings were, without counting bills by hand.

**Stack:** MERN with JWT. The [Restaurant Management System kit](/projects/restaurant-management-system) moves orders through placed, preparing, served and completed, with server-side price calculation.

**Demo and export:** Place four orders at different statuses, complete two, and download a day-end CSV with order ID, table, items, total and status. Add a second sheet or file grouped by dish to show best sellers.

**Examiner will ask:** "Does the report include cancelled or incomplete orders?" Decide your rule beforehand and print it as a header note in the file.

### 6. Fleet trip logs

**Problem:** A college transport office or small logistics firm cannot easily prove which driver drove which vehicle on which day, which is a problem at fuel-claim time.

**Stack:** MERN with JWT. The [Vehicle / Fleet Management System kit](/projects/vehicle-fleet-management-system) lets dispatchers assign trips, marks the vehicle on-trip immediately, and lets drivers move only their own trips from scheduled to in-progress to completed.

**Demo and export:** Complete a trip as a driver, then log in as admin and download a trip log with vehicle, driver, start, end and status. A maintenance log per vehicle makes a good second file.

**Examiner will ask:** "Can a driver download everyone's trips?" The strong answer is no, only their own, and you can prove it by logging in as that driver.

### 7. Exam results CSV

**Problem:** Teachers spend evenings copying marks into Excel after objective tests, and mistakes creep in.

**Stack:** MERN with JWT. The [Online Examination System kit](/projects/online-examination-system) handles timed MCQ exams, auto-scoring and per-exam analytics.

**Demo and export:** Have two classmates take a three-question test live, then download a results file with student, score, percentage, time taken and attempt time. A separate question-wise sheet showing how many got each question right makes teachers' eyes light up.

**Examiner will ask:** "What if a student refreshes mid-exam?" Your export should show a single attempt, not a duplicate, so know your rule.

### 8. Gym membership export

**Problem:** Gym owners lose money when expired memberships are not chased, and check-in registers are scribbled.

**Stack:** MERN with JWT. The [Gym Management System kit](/projects/gym-management-system) covers plans with active or expired status, trainer assignment, a check-in log and fee records.

**Demo and export:** Download "memberships expiring in the next 7 days" with member, phone, plan and last payment, which an owner can use to call people. A monthly attendance file is a nice second export.

**Examiner will ask:** "How do you decide a membership is expired?" Show the date comparison, not a manually edited flag.

### 9. Job applications export

**Problem:** Recruiters get dozens of applications for one opening and shortlist them over email threads and screenshots.

**Stack:** MERN with Multer for resume uploads. The [Online Job Portal kit](/projects/job-portal) has recruiter, job seeker and admin roles, filters and application statuses.

**Demo and export:** Apply as two candidates, shortlist one as the recruiter, and download an applicants sheet with name, skills, status and applied date. Keep resume links as URLs in the file instead of attaching the files.

**Examiner will ask:** "Can a recruiter see another recruiter's applicants?" This is a data-ownership question, and the export is where a leak would show.

### 10. Sentiment analysis on a batch CSV

**Problem:** A seller with thousands of product reviews cannot read them all, but wants to know what customers complain about.

**Stack:** Python, Scikit-learn, NLTK, Pandas, Plotly, Streamlit. The [Sentiment Analysis Dashboard kit](/projects/sentiment-analysis-dashboard) accepts a CSV of reviews, labels them positive, negative or neutral, draws charts and offers an exportable results table.

**Demo and export:** Upload a file, show the sentiment mix, then download the same file with a new label column and a confidence score. The input and output are both CSVs, so the examiner sees a clean before and after.

**Examiner will ask:** "How accurate is it?" Quote your actual evaluation numbers from the report, and admit that sarcasm and mixed reviews trip it up.

## Picking one: attendance versus inventory

Two of the kits above produce very different kinds of file, and understanding the difference helps you choose.

The **attendance** export is the output of a model. Some rows are wrong or missing, and the interesting part of your viva is how you handle uncertainty: thresholds, unrecognised faces, lighting. You will be asked about errors, and honesty about them scores well.

The **inventory** export is the output of rules. Every number should reconcile exactly, and the interesting part of your viva is correctness: transactions, consistency, who changed what. You will be asked "how do you know it is right?", and a clean ledger is your answer.

So ask yourself which conversation you would rather have for twenty minutes. If you enjoy talking about thresholds, accuracy and edge cases, choose attendance or sentiment. If you enjoy schemas, transactions and access control, choose inventory, library, hotel or fleet. Neither is easier; they are just different shapes of difficulty. [Choosing a final year project](/blog/choosing-a-final-year-project) can help if you are still torn, and our [MongoDB schema design guide](/blog/mongodb-schema-design-final-year) helps with the data side of any MERN pick.

## Traps to avoid

- **A button that does nothing real.** If "Export" downloads a hard-coded sample file, someone will notice. The file must come from live data.
- **Excel opening garbage.** Indian names and regional text can break in Excel if encoding is wrong. Test your CSV by opening it in Excel, not just in a text editor. A UTF-8 file with a byte-order mark usually fixes it.
- **Dates in three formats.** Pick one, for example `2026-10-09 14:30`, and stick to it across files.
- **Exporting everything to everyone.** Export is an action, so it needs a role check. Examiners love this question.
- **No filter.** Downloading the entire table is a sign of an unfinished feature. Add at least a date range.
- **Row counts that disagree.** If the screen says 28 and the file has 27, you will lose the room. Write one query and use it for both.
- **Empty demos.** An export of zero rows proves nothing. Seed data before you present.
- **Copying a kit without understanding it.** Using a ready kit is fine when you customise and explain it. Read [academic integrity and project kits](/blog/academic-integrity-project-kits) so you know where the line sits.

## A five-minute demo script

Whichever idea you choose, rehearse this shape. First, one sentence on the problem and the person who suffers from it. Second, show the empty or starting state, such as an empty attendance list or a stock level of ten. Third, perform one real action. Fourth, download the file and open it in Excel on the same screen. Fifth, point to one row and trace it back to the action you just did. That trace, from click to row, is what convinces a panel the project is real. If you can do it in under five minutes, you leave time for questions, and questions are where marks are won.

## Takeaway

Choose a project whose last step is a file someone can open. Start from the export, work backwards to the data you need, and keep the demo small enough to predict. If you want a head start, the face attendance, inventory and library kits give you a working application, an eight-chapter report, slides and a viva question bank, and you add the extra export and your own college's data. Make it yours, then practise the five-minute version until you can do it half asleep.
