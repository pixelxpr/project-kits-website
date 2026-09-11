// projects.ts — one entry per product. Add a new project by adding an object
// here; the homepage grid and /projects/[slug] detail pages both read from
// this file automatically.
//
// IMAGES/VIDEO: drop files into public/projects/<slug>/ using these names:
//   - cover.jpg          (used on the homepage card, ~4:3)
//   - screenshot-1.jpg, screenshot-2.jpg, screenshot-3.jpg  (detail page gallery)
//   - demo.mp4  OR  demoYoutubeId set below (detail page video)
// Placeholders are used until you add real files — see public/projects/README.md

export type Project = {
  slug: string;
  category: "ai-ml" | "ecommerce" | "mern" | "mobile";
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  features: string[];
  whatIncluded: string[];
  demoExchange: { question: string; answer: string; citation: string };
  demoYoutubeId?: string;
  // Set to false while screenshots haven't been added yet — hides the gallery section.
  hasScreenshots?: boolean;
  // Number of screenshots in the gallery (defaults to 3). Set if you have more.
  screenshotCount?: number;
  faq: { q: string; a: string }[];
};

export const projects: Project[] = [
  {
    slug: "pdf-rag-chat",
    category: "ai-ml",
    title: "Chat with PDF",
    tagline: "Ask questions about any PDF document and get answers cited by page number. A complete MERN and Python RAG system ready for your final year project submission.",
    description:
      "A retrieval-augmented chat system: upload a PDF, ask questions in plain English, and get answers grounded in the actual document, with every answer citing the exact page it came from. Built with hybrid retrieval (exact-match + semantic search) so it handles both specific lookups and broad summary questions correctly.",
    techStack: ["Streamlit", "pymupdf4llm", "sentence-transformers", "FAISS", "Groq API"],
    features: [
      "Upload any PDF and start asking questions immediately",
      "Answers cited by exact page number",
      "Hybrid retrieval — correctly handles specific numeric/identifier questions, not just fuzzy topic matches",
      "Handles both narrow lookups and whole-document summary questions",
    ],
    whatIncluded: [
      "Full working Streamlit application",
      "8-chapter Word report (architecture, requirements, testing, references)",
      "13-14 slide presentation deck",
      "Viva question bank with cheat sheet and pitch script",
      "Architecture diagrams",
    ],
    demoExchange: {
      question: "What does section 3.2 say about the results?",
      answer: "Section 3.2 reports a 14% improvement in accuracy after the retrieval step was added, attributed mainly to reduced ambiguity in multi-part questions.",
      citation: "Source: page 12",
    },
    demoYoutubeId: "fgu4BeKBOos",
    screenshotCount: 4,
    faq: [
      { q: "Does it work with scanned PDFs?", a: "It works best with text-based PDFs. Scanned/image-only PDFs need OCR, which isn't included by default but can be added." },
      { q: "How long does setup take?", a: "Under 10 minutes with the included instructions — it's a standard Python + pip install." },
    ],
  },
  {
    slug: "chat-with-youtube",
    category: "ai-ml",
    title: "Chat with YouTube",
    tagline: "Ask questions about any YouTube video and jump straight to the moment it's answered. An AI-powered full-stack project kit with presentation and report.",
    description:
      "Paste a YouTube link and ask questions about the video's content — every answer cites the exact timestamp, and clicking it jumps the embedded player straight there. Handles videos without captions too, using a three-layer fallback that includes automatic transcription.",
    techStack: ["Streamlit", "youtube-transcript-api", "yt-dlp", "Groq Whisper", "FAISS", "Groq API"],
    features: [
      "Works even on videos with captions disabled (automatic transcription fallback)",
      "Clickable timestamp citations that jump the video player",
      "Supports loading multiple videos into one session",
      "Hybrid retrieval — correctly matches years, dates, and quoted phrases",
    ],
    whatIncluded: [
      "Full working Streamlit application",
      "8-chapter Word report",
      "14-slide presentation deck",
      "Viva question bank with cheat sheet and pitch script",
      "Architecture + query-routing diagrams",
    ],
    demoExchange: {
      question: "What did the speaker say about scaling laws?",
      answer: "They describe how model performance improves predictably as compute, data, and parameters scale up together.",
      citation: "Source: \u201cScaling Laws Explained\u201d, at 14:22",
    },
    demoYoutubeId: "LBLLKaF5o8o",
    faq: [
      { q: "Does it work on any YouTube video?", a: "Yes — it uses YouTube's captions when available, and falls back to automatic transcription when they're not." },
      { q: "Can I load more than one video?", a: "Yes, and questions can pull answers from whichever video is actually relevant." },
    ],
  },
  {
    slug: "chat-with-data",
    category: "ai-ml",
    title: "Chat with Data",
    tagline: "Ask for a chart or a number in plain English over your own spreadsheet data. A complete AI final year project kit featuring data analysis and visualization.",
    description:
      "Upload a CSV or multi-sheet Excel file and ask analytical questions directly: \u201cwhat % of contribution is male vs female this month\u201d becomes a working chart, computed from your actual data. Writes and safely runs real pandas/Plotly code for every question, rather than picking from fixed templates.",
    techStack: ["Streamlit", "pandas", "Plotly", "openpyxl", "Groq API"],
    features: [
      "Handles genuinely open-ended questions, not a fixed chart menu",
      "Multi-sheet Excel support — the system writes its own joins across sheets",
      "Answers as a chart or a direct number/table, whichever fits the question",
      "Shows the exact generated code behind every answer",
    ],
    whatIncluded: [
      "Full working Streamlit application",
      "8-chapter Word report",
      "14-slide presentation deck",
      "Viva question bank with cheat sheet and pitch script",
      "3 ready-made sample datasets for your demo",
    ],
    demoExchange: {
      question: "Male vs female % contribution this month?",
      answer: "Generates a pie chart: Female 59.5% / Male 40.5%, computed directly from your data.",
      citation: "Code shown alongside every answer",
    },
    faq: [
      { q: "Does it work with Excel files that have multiple sheets?", a: "Yes — every sheet becomes its own table, and it can join across them when a question needs it." },
      { q: "What if the question is ambiguous or the code fails?", a: "It automatically retries with the error message, up to 2 extra attempts, before reporting back clearly." },
    ],
  },
  {
    slug: "resume-jd-matcher",
    category: "ai-ml",
    title: "Resume / JD Matcher",
    tagline: "Get an explainable ATS match score between a resume and a job description. A complete AI project kit with working code, report, presentation, and viva prep.",
    description:
      "Upload a resume and paste a job description to get a match score broken into four named, weighted components — skill match, semantic fit, experience, and education — plus specific missing skills and concrete improvement suggestions. Built to be auditable: every score traces back to a visible reason, not one opaque AI judgement.",
    techStack: ["Streamlit", "pymupdf4llm", "python-docx", "sentence-transformers", "Plotly", "Groq API"],
    features: [
      "Score breakdown shown as a radar chart across 4 components",
      "Semantic skill matching — recognizes \u201cML\u201d and \u201cMachine Learning\u201d as the same skill",
      "Lists specific missing must-have and nice-to-have skills by name",
      "Generates specific, non-generic improvement suggestions",
    ],
    whatIncluded: [
      "Full working Streamlit application",
      "8-chapter Word report (including the scoring methodology)",
      "14-slide presentation deck",
      "Viva question bank with cheat sheet and pitch script",
      "Sample resume + 2 job descriptions for your demo",
    ],
    demoExchange: {
      question: "Score my resume against this Backend Developer JD",
      answer: "82/100 \u2014 strong skill match, one gap: Docker isn't listed anywhere in your resume.",
      citation: "Full breakdown shown as a radar chart",
    },
    faq: [
      { q: "Does it work with any resume format?", a: "PDF and DOCX are both supported directly." },
      { q: "Is the score comparable to a real company's ATS?", a: "It's a documented, explainable estimate — not a copy of any specific company's proprietary system." },
    ],
  },
  // ─── MERN Stack Projects ─────────────────────────────────────────────────
  {
    slug: "library-management-system",
    category: "mern",
    title: "Smart Library Management System",
    tagline: "A full-stack Smart Library Management System featuring role-based access control, real-time book loan tracking, and a secure audit trail for administrators.",
    description:
      "A complete MERN application with three user roles — admin, librarian, and member. Librarians manage the book catalogue and issue/return loans; members view available books and track their own borrowing history; admins see the full audit log of every action taken. Built on a reusable core platform (auth, RBAC, generic CRUD engine, notifications) so the architecture discussion in the viva has real depth.",
    techStack: ["React", "Vite", "Express", "MongoDB", "Node.js", "shadcn/ui", "JWT"],
    features: [
      "Three roles: admin, librarian, member — each with a distinct dashboard",
      "Issue and return loans with automatic availability tracking",
      "Member self-service: view available books and personal loan history",
      "Full audit log capturing every create/update/delete action by user",
      "Generic CRUD engine — adding new entity types requires only a schema file",
    ],
    whatIncluded: [
      "Full working MERN application (React + Express + MongoDB)",
      "8-chapter Word report (architecture, RBAC design, ER diagram, testing)",
      "14-slide presentation deck",
      "Viva question bank with cheat sheet and pitch script",
      "Seed script for demo accounts + sample data",
    ],
    hasScreenshots: false,
    demoExchange: {
      question: "Show me which books member Rohan currently has on loan",
      answer: "Rohan has 2 active loans: 'Clean Code' (due Aug 28) and 'The Pragmatic Programmer' (due Sep 4). Both are marked overdue-risk in the next 7 days.",
      citation: "Librarian dashboard → My Loans view",
    },
    faq: [
      { q: "What database does it use?", a: "MongoDB — running locally or on Atlas. Connection string goes in .env; a seed script populates demo accounts and sample books so it's usable in minutes." },
      { q: "Can the roles be changed or extended?", a: "Yes — roles are defined in project.config.js and the generic requireRole middleware enforces them. Adding a new role is a config change, not a code change." },
    ],
  },
  {
    slug: "hotel-booking-system",
    category: "mern",
    title: "Hotel Booking System",
    tagline: "A complete Hotel Booking System with live room availability checks, automatic rate calculation, guest self-service, and a comprehensive admin dashboard.",
    description:
      "A production-pattern MERN application covering the full hotel-booking workflow. Front-desk staff manage rooms, guest records, and bookings — with the system automatically calculating total cost from nights × room rate and blocking rooms as occupied on check-in. Guests can browse rooms and manage their own bookings. Admins get everything plus the audit log. The booking entity deliberately breaks out of the generic CRUD engine, making it a clean teaching example of when custom routes are needed.",
    techStack: ["React", "Vite", "Express", "MongoDB", "Node.js", "shadcn/ui", "JWT"],
    features: [
      "Three roles: admin, front-desk, guest — each with correct access boundaries",
      "Live availability check — booking a room marks it occupied immediately",
      "Auto-calculated total from nights × room rate, computed server-side",
      "Guest self-service: browse rooms, book, and cancel confirmed bookings",
      "Full audit log; admin is the only role that can delete a booking outright",
    ],
    whatIncluded: [
      "Full working MERN application (React + Express + MongoDB)",
      "8-chapter Word report (system design, ER diagram, RBAC, test cases)",
      "14-slide presentation deck",
      "Viva question bank with cheat sheet and pitch script",
      "Seed script for demo accounts + sample rooms",
    ],
    hasScreenshots: false,
    demoExchange: {
      question: "Is the Deluxe Suite available from 25 Aug to 28 Aug?",
      answer: "Yes — Deluxe Suite is free for those dates. 3 nights × ₹2,800/night = ₹8,400 total. Booking confirmed for guest Priya Sharma.",
      citation: "Front-desk dashboard → New Booking",
    },
    faq: [
      { q: "How does the availability check work?", a: "Booking a room sets its status to 'occupied' immediately. Check-out or cancellation sets it back to 'available'. The server validates this before accepting any new booking for that room." },
      { q: "Can I add room types or additional fields?", a: "Yes — rooms are driven by a schema object (room.schema.js). Add a field there and it appears in the list and form automatically, with no new UI code." },
    ],
  },
  {
    slug: "restaurant-management-system",
    category: "mern",
    title: "Restaurant Management System",
    tagline: "A complete Restaurant Management System with dine-in table tracking, live price calculation, and kitchen status flow. Ready for your college project.",
    description:
      "A full-stack MERN restaurant system where staff manage the menu, tables, and orders through a complete lifecycle — placed → preparing → served → completed — with the table freed automatically when the order is done. Price totals are calculated server-side from actual menu item prices, never from client input. Customers can place their own takeaway or dine-in orders and track status as staff moves them along. The Order entity is the key teaching piece: it breaks from the generic CRUD pattern to handle price validation and table sync.",
    techStack: ["React", "Vite", "Express", "MongoDB", "Node.js", "shadcn/ui", "JWT"],
    features: [
      "Three roles: admin, staff, customer — with clean access separation",
      "Order lifecycle: placed → preparing → served → completed, with table sync",
      "Server-side price calculation — client can never submit a manipulated total",
      "Customer self-service: browse menu, place orders, track status in real time",
      "Full audit log; admin is the only role that can delete an order outright",
    ],
    whatIncluded: [
      "Full working MERN application (React + Express + MongoDB)",
      "8-chapter Word report (architecture, ER diagram, RBAC, test scenarios)",
      "14-slide presentation deck",
      "Viva question bank with cheat sheet and pitch script",
      "Seed script for demo accounts + sample menu items and tables",
    ],
    hasScreenshots: false,
    demoExchange: {
      question: "Table 4 just finished — close the order and free the table",
      answer: "Order #T4-031 marked completed. Table 4 status updated to available. Total collected: ₹1,240 (2× Butter Chicken, 1× Naan, 2× Lassi).",
      citation: "Staff dashboard → Active Orders",
    },
    faq: [
      { q: "Why is the price calculated server-side?", a: "Trusting a client-supplied price is a classic security gap. The server looks up each menu item's current price independently and computes the total — the client's number is ignored entirely." },
      { q: "Can menu items and tables be managed without touching code?", a: "Yes — both are plain CRUD entities driven by schema files. Staff can add/edit/remove them from the dashboard; no code changes needed." },
    ],
  },
  {
    slug: "vehicle-fleet-management-system",
    category: "mern",
    title: "Vehicle / Fleet Management System",
    tagline: "A Vehicle and Fleet Management System featuring real-time availability, driver assignments, and trip lifecycle tracking. A complete final year project kit.",
    description:
      "A MERN fleet management application with three roles — admin, dispatcher, and driver. Dispatchers assign trips by picking an available vehicle and driver, and the vehicle is marked on-trip immediately. Drivers see only their own assigned trips and can advance them from scheduled → in-progress → completed from their own login. The project has the richest RBAC example of all four: a driver can update a trip's status, but only their own — a check that happens inside the route handler itself, not the generic middleware, making it a strong viva discussion point.",
    techStack: ["React", "Vite", "Express", "MongoDB", "Node.js", "shadcn/ui", "JWT"],
    features: [
      "Three roles: admin, dispatcher, driver — with record-level ownership checks",
      "Vehicle availability lock — assigning a trip marks the vehicle on-trip instantly",
      "Driver self-service: view and advance only their own assigned trips",
      "Maintenance record logging per vehicle, separate from trip records",
      "Full audit log; admin is the only role that can delete a trip outright",
    ],
    whatIncluded: [
      "Full working MERN application (React + Express + MongoDB)",
      "8-chapter Word report (architecture, RBAC depth, ER diagram, test cases)",
      "14-slide presentation deck",
      "Viva question bank with cheat sheet and pitch script",
      "Seed script for demo accounts + sample vehicles, drivers, and trips",
    ],
    hasScreenshots: false,
    demoExchange: {
      question: "Assign Vehicle MH-12-AB-1234 to driver Rahul for Mumbai → Pune run today",
      answer: "Trip #T-089 created. MH-12-AB-1234 marked on-trip. Rahul Singh notified — trip shows under My Trips in his driver login with status: scheduled.",
      citation: "Dispatcher dashboard → New Trip",
    },
    faq: [
      { q: "How does the driver-only access to their trip work?", a: "The route handler checks trip.driverUserId === req.user.userId before allowing a status update. This is a record-level check, separate from the role middleware — and a common viva question about the difference." },
      { q: "Can I add more vehicle or driver fields?", a: "Yes — Vehicles, Drivers, and Maintenance Records are generic CRUD entities driven by schema files. New fields appear in the UI automatically with no new UI code." },
    ],
  },
  // ─── E-Commerce Projects ──────────────────────────────────────────────────
  {
    slug: "mern-ecommerce",
    category: "ecommerce",
    title: "MERN E-Commerce Store",
    tagline: "A complete MERN E-Commerce Store project kit featuring secure Razorpay payment integration, a shopping cart, and a comprehensive admin dashboard.",
    description:
      "A complete e-commerce web application built with the MERN stack. Customers browse products, add to cart, and checkout with Razorpay (UPI, cards, net banking). Admins manage the product catalogue, track orders, and update delivery status from a dedicated dashboard. Images are hosted on Cloudinary; auth uses JWT with route-level protection for user and admin roles.",
    techStack: ["React", "Vite", "Redux Toolkit", "Express", "MongoDB", "Razorpay", "Cloudinary", "JWT"],
    features: [
      "Product catalog with search, category filter, and sort (price, rating, newest)",
      "Persistent cart with quantity controls and free-shipping threshold",
      "Razorpay checkout with server-side HMAC signature verification",
      "Admin dashboard — add/delete products, update order status, view revenue stats",
      "Product reviews with star ratings and per-product average calculation",
    ],
    whatIncluded: [
      "Full working MERN application (React + Vite + Express + MongoDB)",
      "8-chapter Word report (architecture, Razorpay flow, ER diagram, testing)",
      "14-slide presentation deck",
      "Viva question bank with cheat sheet and pitch script",
      "Seed script for demo products, admin account, and test orders",
    ],
    hasScreenshots: false,
    demoExchange: {
      question: "How does the Razorpay payment verification work?",
      answer: "After the client pays, Razorpay sends back a payment ID and signature. The server re-computes the expected signature using HMAC-SHA256 over the order ID + payment ID with your secret key, and only marks the order paid if they match — the client can never fake a successful payment.",
      citation: "server/controllers/orders.js → verifyPayment()",
    },
    faq: [
      { q: "Does it work with Razorpay test mode?", a: "Yes — use a test key from the Razorpay dashboard and the included test card numbers. No real money moves." },
      { q: "How are product images stored?", a: "Uploaded via Multer to a temp folder, then pushed to Cloudinary. Only the Cloudinary URL is saved in MongoDB — no binary data in the database." },
    ],
  },
  // ─── MERN Stack — upcoming ────────────────────────────────────────────────
  {
    slug: "hospital-management-system",
    category: "mern",
    title: "Hospital Management System",
    tagline: "Appointments, doctor schedules, patient records, and billing in one MERN hospital admin kit.",
    description:
      "A full-stack hospital operations system: patients book appointments against doctor availability, reception and doctors manage visits, and admins oversee departments, billing, and an audit trail. Designed as a classic final-year MERN project with clear RBAC and an ER diagram that viva panels expect.",
    techStack: ["React", "Vite", "Express", "MongoDB", "Node.js", "JWT", "shadcn/ui"],
    features: [
      "Roles: admin, doctor, receptionist, patient",
      "Appointment booking with doctor slot availability",
      "Patient medical visit notes and prescription records",
      "Simple billing / invoice generation for visits",
      "Department and doctor profile management",
    ],
    whatIncluded: [
      "Full working MERN application",
      "8-chapter Word report with ER + RBAC design",
      "14-slide presentation deck",
      "Viva question bank + cheat sheet",
      "Seed script for doctors, patients, and sample appointments",
    ],
    hasScreenshots: false,
    demoExchange: {
      question: "Book Dr. Mehta for tomorrow 11:00 AM for patient Ananya",
      answer: "Slot confirmed. Appointment #A-214 created under General Medicine. Reception dashboard shows status: scheduled.",
      citation: "Reception → New Appointment",
    },
    faq: [
      { q: "How long does setup take?", a: "Under 15 minutes with the included instructions — Node, MongoDB, and the seed script get you a working demo fast." },
      { q: "Will it include report and viva prep?", a: "Yes — same Complete-kit standard as our other MERN projects once it ships." },
    ],
  },
  {
    slug: "online-examination-system",
    category: "mern",
    title: "Online Examination System",
    tagline: "Timed MCQ exams, auto-scoring, and result dashboards for colleges — a MERN exam portal kit.",
    description:
      "Teachers create question banks and timed exams; students take papers under a countdown; the system auto-scores objective questions and publishes results. Admins manage courses and users. A strong viva topic around timers, anti-refresh handling, and role separation.",
    techStack: ["React", "Vite", "Express", "MongoDB", "Node.js", "JWT"],
    features: [
      "Teacher creates exams with MCQ banks and duration limits",
      "Student exam attempt with live countdown timer",
      "Auto-scoring and result publication",
      "Attempt history and per-exam analytics for teachers",
      "Admin user and course management",
    ],
    whatIncluded: [
      "Full working MERN application",
      "8-chapter Word report",
      "14-slide presentation deck",
      "Viva question bank + cheat sheet",
      "Seed script with sample exams and questions",
    ],
    hasScreenshots: false,
    demoExchange: {
      question: "Start the Data Structures mid-term for roll 21CS042",
      answer: "Exam started — 45:00 remaining, 30 MCQs loaded. On submit, auto-score writes to Results and locks the attempt.",
      citation: "Student portal → My Exams",
    },
    faq: [
      { q: "Can exam duration be customized?", a: "Yes — each exam has its own duration setting in the teacher dashboard." },
      { q: "Does auto-scoring support descriptive answers?", a: "Objective/MCQ is auto-scored; descriptive marking can be added as an extension topic in the report." },
    ],
  },
  {
    slug: "inventory-management-system",
    category: "mern",
    title: "Inventory & Warehouse Management",
    tagline: "Stock levels, purchase/sales, low-stock alerts, and warehouse roles in a MERN inventory kit.",
    description:
      "Track products across warehouses, record inbound purchase and outbound sales, and alert when stock hits reorder levels. Store managers and admins get different dashboards; a clean transactional model for viva discussions on consistency and audit logs.",
    techStack: ["React", "Vite", "Express", "MongoDB", "Node.js", "JWT"],
    features: [
      "Multi-warehouse stock quantities",
      "Purchase and sales transactions updating stock",
      "Low-stock alerts and reorder thresholds",
      "Supplier and product catalogue management",
      "Role-based admin vs store-manager access",
    ],
    whatIncluded: [
      "Full working MERN application",
      "8-chapter Word report with ER diagram",
      "14-slide presentation deck",
      "Viva question bank + cheat sheet",
      "Seed script for products, warehouses, and sample stock",
    ],
    hasScreenshots: false,
    demoExchange: {
      question: "Show SKUs below reorder level in Warehouse B",
      answer: "3 SKUs flagged: USB-C Hub (4 left), HDMI Cable (2 left), Webcam 1080p (1 left). Reorder suggestions ready for purchase order.",
      citation: "Store manager → Low stock",
    },
    faq: [
      { q: "Does stock update in real time after a sale?", a: "Yes — sales and purchase transactions adjust warehouse quantities on the server before the response returns." },
      { q: "Can it handle multiple warehouses?", a: "Yes — stock is tracked per warehouse in the planned schema." },
    ],
  },
  {
    slug: "job-portal",
    category: "mern",
    title: "Online Job Portal",
    tagline: "Job seekers apply, recruiters post openings, admins moderate — a full MERN careers portal kit.",
    description:
      "Recruiters post jobs and review applications; candidates search openings, upload resumes, and track application status; admins moderate listings. Covers search/filter, file upload, and multi-role workflows typical of final-year full-stack submissions.",
    techStack: ["React", "Vite", "Express", "MongoDB", "Node.js", "JWT", "Multer"],
    features: [
      "Roles: admin, recruiter, job seeker",
      "Job posting with skills, location, and salary filters",
      "Resume upload and application tracking",
      "Recruiter inbox for shortlist / reject statuses",
      "Admin moderation of job listings",
    ],
    whatIncluded: [
      "Full working MERN application",
      "8-chapter Word report",
      "14-slide presentation deck",
      "Viva question bank + cheat sheet",
      "Seed script with sample jobs and applications",
    ],
    hasScreenshots: false,
    demoExchange: {
      question: "Apply to Backend Engineer at Pixel Labs with my resume",
      answer: "Application #AP-118 submitted. Status: under review. Recruiter dashboard shows a new candidate with resume PDF attached.",
      citation: "Seeker → Job detail → Apply",
    },
    faq: [
      { q: "Can recruiters download applicant resumes?", a: "Yes — uploaded resume files are available from the recruiter application inbox." },
      { q: "Will resume upload be included?", a: "Yes — Multer-based upload with stored file metadata is part of the planned kit." },
    ],
  },
  {
    slug: "gym-management-system",
    category: "mern",
    title: "Gym Management System",
    tagline: "Memberships, trainer schedules, attendance, and payments for a fitness center — MERN kit.",
    description:
      "Gym admins manage membership plans and trainers; members view plans, attendance, and dues; trainers see assigned members. A practical domain project with recurring membership status and simple payment records.",
    techStack: ["React", "Vite", "Express", "MongoDB", "Node.js", "JWT"],
    features: [
      "Membership plans with active / expired status",
      "Trainer assignment and class schedule slots",
      "Member attendance check-in log",
      "Fee / payment recording for renewals",
      "Admin dashboard with member counts",
    ],
    whatIncluded: [
      "Full working MERN application",
      "8-chapter Word report",
      "14-slide presentation deck",
      "Viva question bank + cheat sheet",
      "Seed script for plans, trainers, and members",
    ],
    hasScreenshots: false,
    demoExchange: {
      question: "Check in member Riya for today's evening batch",
      answer: "Attendance logged at 6:02 PM. Membership: Gold — active until 12 Oct. Trainer: Kabir.",
      citation: "Front desk → Check-in",
    },
    faq: [
      { q: "Can membership plans have different durations?", a: "Yes — plans are configurable (monthly, quarterly, annual) from the admin dashboard." },
      { q: "Does it include online payment gateway?", a: "Base kit focuses on membership records; Razorpay can be discussed as an optional extension." },
    ],
  },
  {
    slug: "college-erp-system",
    category: "mern",
    title: "College ERP / Student Portal",
    tagline: "Students, courses, attendance, and results in one campus ERP-style MERN project kit.",
    description:
      "A campus portal where admins manage departments and courses, faculty mark attendance and upload results, and students view timetables, attendance %, and grade cards. Familiar to every engineering college panel — strong for ER diagrams and role demos.",
    techStack: ["React", "Vite", "Express", "MongoDB", "Node.js", "JWT"],
    features: [
      "Roles: admin, faculty, student",
      "Course and enrollment management",
      "Attendance marking and percentage view",
      "Result / grade card publication",
      "Department-wise user management",
    ],
    whatIncluded: [
      "Full working MERN application",
      "8-chapter Word report with ER diagram",
      "14-slide presentation deck",
      "Viva question bank + cheat sheet",
      "Seed script for departments, courses, and students",
    ],
    hasScreenshots: false,
    demoExchange: {
      question: "Show attendance % for CS301 this semester for roll 21CS015",
      answer: "CS301 Database Systems — 18/22 sessions = 81.8%. Above the 75% threshold.",
      citation: "Student portal → Attendance",
    },
    faq: [
      { q: "Can faculty belong to multiple departments?", a: "Base kit assigns faculty to a primary department; multi-department can be added as an extension." },
      { q: "Can college name be customized?", a: "Yes — once live, Complete kits include name/college/department customization like our other kits." },
    ],
  },
  // ─── E-Commerce — upcoming ────────────────────────────────────────────────
  {
    slug: "multi-vendor-marketplace",
    category: "ecommerce",
    title: "Multi-Vendor Marketplace",
    tagline: "Multiple sellers, one storefront — vendor dashboards, commissions, and admin moderation.",
    description:
      "An Amazon-style marketplace where vendors list products, customers checkout in one cart, and admins approve sellers and view commission summaries. Extends standard e-commerce with multi-tenant seller boundaries — a popular advanced final-year topic.",
    techStack: ["React", "Vite", "Redux Toolkit", "Express", "MongoDB", "Razorpay", "JWT"],
    features: [
      "Vendor onboarding and product listing per seller",
      "Single customer cart across multiple vendors",
      "Order splitting / vendor-wise fulfillment status",
      "Admin seller approval and commission overview",
      "Razorpay checkout with server-side verification",
    ],
    whatIncluded: [
      "Full working MERN marketplace application",
      "8-chapter Word report",
      "14-slide presentation deck",
      "Viva question bank + cheat sheet",
      "Seed script for vendors, products, and sample orders",
    ],
    hasScreenshots: false,
    demoExchange: {
      question: "Place an order with items from two different sellers",
      answer: "Checkout created Order #M-044. Split into Vendor A (shipped) and Vendor B (processing). Single Razorpay payment verified server-side.",
      citation: "Customer cart → Checkout",
    },
    faq: [
      { q: "How are commissions calculated?", a: "Admin configures a commission percentage; order reports show estimated commission per vendor." },
      { q: "How is it different from the basic e-commerce kit?", a: "Multi-vendor adds seller accounts, per-vendor catalogs, and admin marketplace controls." },
    ],
  },
  {
    slug: "food-delivery-app",
    category: "ecommerce",
    title: "Food Delivery Platform",
    tagline: "Restaurants, menus, cart, and delivery status tracking — a Swiggy-style MERN kit.",
    description:
      "Customers browse restaurants and menus, place orders, and track delivery status. Restaurant partners manage dishes and accept orders; admins oversee the platform. Combines e-commerce checkout patterns with real-time-ish order status — excellent for viva demos.",
    techStack: ["React", "Vite", "Redux Toolkit", "Express", "MongoDB", "Razorpay", "JWT"],
    features: [
      "Restaurant and menu browsing with filters",
      "Cart and checkout with address selection",
      "Order status flow: placed → preparing → out for delivery → delivered",
      "Restaurant partner dashboard for menu and orders",
      "Payment integration with verification",
    ],
    whatIncluded: [
      "Full working MERN food-delivery application",
      "8-chapter Word report",
      "14-slide presentation deck",
      "Viva question bank + cheat sheet",
      "Seed script for restaurants, menus, and demo users",
    ],
    hasScreenshots: false,
    demoExchange: {
      question: "Order 2× Paneer Bowl from Spice Route to home address",
      answer: "Order #FD-902 placed. Restaurant accepted — status: preparing. ETA shown on tracking screen.",
      citation: "Customer → Checkout → Track order",
    },
    faq: [
      { q: "Can restaurants manage their own menus?", a: "Yes — restaurant partner accounts get a dashboard for dishes and incoming orders." },
      { q: "Will map/GPS tracking be included?", a: "Status timeline is core; live map tracking can be scoped as an optional extension." },
    ],
  },
  {
    slug: "bookstore-ecommerce",
    category: "ecommerce",
    title: "Online Bookstore",
    tagline: "Books catalog, reviews, wishlist, and secure checkout — a focused e-commerce kit for CS projects.",
    description:
      "A clean bookstore storefront: categories, search, ratings/reviews, wishlist, and Razorpay checkout. Admin manages inventory and orders. Narrower domain than a generic store — easier to demo and document for submission.",
    techStack: ["React", "Vite", "Redux Toolkit", "Express", "MongoDB", "Razorpay", "Cloudinary", "JWT"],
    features: [
      "Book catalog with author, genre, and price filters",
      "Ratings, reviews, and wishlist",
      "Cart and Razorpay checkout",
      "Admin inventory and order management",
      "Cover image uploads via Cloudinary",
    ],
    whatIncluded: [
      "Full working MERN bookstore application",
      "8-chapter Word report",
      "14-slide presentation deck",
      "Viva question bank + cheat sheet",
      "Seed script with sample books and reviews",
    ],
    hasScreenshots: false,
    demoExchange: {
      question: "Add 'Designing Data-Intensive Applications' to wishlist and checkout later",
      answer: "Saved to wishlist. Cart still has 1 other title. Wishlist persists after logout/login for the same user.",
      citation: "Storefront → Book detail",
    },
    faq: [
      { q: "Does it support book categories and authors?", a: "Yes — catalog filters cover genre, author, and price ranges." },
      { q: "Can it sell e-books / PDF downloads?", a: "Physical catalog is the default; digital delivery can be added as an extension." },
    ],
  },
  {
    slug: "fashion-boutique-store",
    category: "ecommerce",
    title: "Fashion Boutique Store",
    tagline: "Apparel variants (size/color), lookbook catalog, and checkout — fashion e-commerce kit.",
    description:
      "A boutique shopping experience with size/color variants, category collections, and admin stock per variant. Teaches SKU-level inventory — a step up from single-price products and a common examiner question.",
    techStack: ["React", "Vite", "Redux Toolkit", "Express", "MongoDB", "Razorpay", "Cloudinary", "JWT"],
    features: [
      "Product variants for size and color",
      "Collection / category browse pages",
      "Stock tracked per variant SKU",
      "Cart, checkout, and order history",
      "Admin product and variant management",
    ],
    whatIncluded: [
      "Full working MERN fashion store",
      "8-chapter Word report",
      "14-slide presentation deck",
      "Viva question bank + cheat sheet",
      "Seed script with sample apparel SKUs",
    ],
    hasScreenshots: false,
    demoExchange: {
      question: "Add Medium / Navy hoodie to cart",
      answer: "Variant SKU HN-NVY-M added. Stock remaining: 7. Cart subtotal updated.",
      citation: "Product detail → Select variant",
    },
    faq: [
      { q: "Is stock tracked per size and color?", a: "Yes — each size/color combination is a SKU with its own quantity." },
      { q: "Why variants matter in viva?", a: "You'll explain SKU-level stock instead of one stock number per product — a clear design decision." },
    ],
  },
  {
    slug: "pharmacy-ecommerce",
    category: "ecommerce",
    title: "Online Pharmacy Store",
    tagline: "Medicines catalog, prescription upload flag, and checkout — pharmacy e-commerce kit.",
    description:
      "Customers browse OTC and Rx-flagged medicines, upload a prescription note where required, and checkout securely. Pharmacist/admin roles manage catalog and orders. Domain rules (Rx vs OTC) give you concrete viva talking points beyond a generic shop.",
    techStack: ["React", "Vite", "Redux Toolkit", "Express", "MongoDB", "Razorpay", "Multer", "JWT"],
    features: [
      "OTC vs prescription-required product flags",
      "Prescription file upload on Rx items",
      "Search by medicine name / salt",
      "Order review before dispatch for Rx items",
      "Admin catalog and order dashboard",
    ],
    whatIncluded: [
      "Full working MERN pharmacy store",
      "8-chapter Word report",
      "14-slide presentation deck",
      "Viva question bank + cheat sheet",
      "Seed script with sample medicines",
    ],
    hasScreenshots: false,
    demoExchange: {
      question: "Checkout with an Rx antibiotic in the cart",
      answer: "Blocked until prescription PDF is uploaded. After upload, order #PH-331 moves to pharmacist review before pack/ship.",
      citation: "Checkout → Prescription required",
    },
    faq: [
      { q: "What happens if prescription upload is missing?", a: "Rx-flagged items cannot complete checkout until a prescription file is attached." },
      { q: "Is this medical advice software?", a: "No — it's an e-commerce workflow demo for academic submission, not a clinical system." },
    ],
  },
  // ─── AI / ML — additional kits ────────────────────────────────────────────
  {
    slug: "fake-news-detection",
    category: "ai-ml",
    title: "Fake News Detection System",
    tagline: "Classify news headlines and articles as real or fake with an explainable ML pipeline — ready for final year submission.",
    description:
      "A Streamlit app that takes a news headline or article text and predicts real vs fake using a trained classifier, with feature explanations for viva defense. Includes a clean train/evaluate flow and a demo dataset so you can show accuracy metrics from the report live.",
    techStack: ["Python", "Scikit-learn", "Streamlit", "NLTK", "Pandas", "Plotly"],
    features: [
      "Paste headline/article and get real vs fake prediction",
      "Confidence score and top contributing words/features",
      "Model training and evaluation metrics in-app",
      "Confusion matrix and accuracy charts for the demo",
    ],
    whatIncluded: [
      "Full working Streamlit application",
      "8-chapter Word report with ML methodology",
      "14-slide presentation deck",
      "Viva question bank + cheat sheet",
      "Sample dataset and trained model artifacts",
    ],
    hasScreenshots: false,
    demoExchange: {
      question: "Is this headline likely fake: 'Celebrity cures COVID with lemon water overnight'?",
      answer: "Predicted: FAKE (0.91 confidence). Top signals: sensational cure claim, missing source entities, clickbait phrasing.",
      citation: "Classifier → explain panel",
    },
    faq: [
      { q: "Do I need a GPU?", a: "No — classic ML models run on CPU for this kit." },
      { q: "Can I swap in a different dataset?", a: "Yes — training scripts accept a CSV with text and label columns." },
    ],
  },
  {
    slug: "sentiment-analysis-dashboard",
    category: "ai-ml",
    title: "Sentiment Analysis Dashboard",
    tagline: "Analyze product reviews or social text as positive, negative, or neutral — with charts for your viva demo.",
    description:
      "Upload a CSV of reviews or paste text batches to get sentiment labels and an interactive dashboard of score distributions. Built for marketing/CS dual-use demos and clear NLP viva questions around preprocessing and evaluation.",
    techStack: ["Python", "Streamlit", "Scikit-learn", "Pandas", "Plotly", "NLTK"],
    features: [
      "Batch CSV upload or single-text analysis",
      "Positive / negative / neutral classification",
      "Dashboard charts for sentiment mix over time",
      "Exportable results table for the report appendix",
    ],
    whatIncluded: [
      "Full working Streamlit application",
      "8-chapter Word report",
      "14-slide presentation deck",
      "Viva question bank + cheat sheet",
      "Sample review datasets",
    ],
    hasScreenshots: false,
    demoExchange: {
      question: "Summarize sentiment for this week's product reviews CSV",
      answer: "1,240 reviews — 62% positive, 21% neutral, 17% negative. Negative spike on shipping delays (keyword cluster).",
      citation: "Dashboard → Overview",
    },
    faq: [
      { q: "Does it need an OpenAI key?", a: "No — the base kit uses classical NLP/ML so it runs offline after setup." },
      { q: "Can it do aspect-based sentiment?", a: "Base kit is overall sentiment; aspect-based can be discussed as a future enhancement in viva." },
    ],
  },
  {
    slug: "plant-disease-classification",
    category: "ai-ml",
    title: "Plant Disease Classification",
    tagline: "Upload a leaf photo and get the disease class with confidence — a CNN image project for agriculture-themed submissions.",
    description:
      "An image classification kit: users upload a leaf image, the model returns disease class and confidence, and the UI shows sample gallery comparisons. Strong visual demo for panels and a clear CNN architecture story in the report.",
    techStack: ["Python", "TensorFlow/Keras", "Streamlit", "OpenCV", "NumPy"],
    features: [
      "Leaf image upload and disease class prediction",
      "Confidence scores across top classes",
      "Sample image gallery for live demo",
      "Training metrics charts for viva discussion",
    ],
    whatIncluded: [
      "Full working Streamlit application",
      "8-chapter Word report with CNN architecture",
      "14-slide presentation deck",
      "Viva question bank + cheat sheet",
      "Sample leaf images and model weights",
    ],
    hasScreenshots: false,
    demoExchange: {
      question: "Classify this tomato leaf photo",
      answer: "Predicted: Early Blight (0.87). Next likely: Healthy (0.08), Late Blight (0.05). Suggest checking lower leaf surfaces.",
      citation: "Upload → Predict",
    },
    faq: [
      { q: "Will it run on a laptop without GPU?", a: "Inference runs on CPU; training notes in the report assume Colab/GPU optional." },
      { q: "Can I change the crop types?", a: "Yes — retrain on a new labeled folder structure using the included training script." },
    ],
  },
  {
    slug: "face-recognition-attendance",
    category: "ai-ml",
    title: "Face Recognition Attendance System",
    tagline: "Mark student attendance from a webcam using face recognition — a classic AI + admin panel final year kit.",
    description:
      "Register student face encodings, then mark attendance from a live camera or uploaded classroom photo. Admins export attendance CSVs by date and subject. Combines CV with a simple records UI — popular with examiners.",
    techStack: ["Python", "face_recognition", "OpenCV", "Streamlit", "Pandas"],
    features: [
      "Student registration with face encoding",
      "Live webcam or image-based attendance marking",
      "Daily attendance logs with export",
      "Duplicate detection / already-marked handling",
    ],
    whatIncluded: [
      "Full working Streamlit application",
      "8-chapter Word report",
      "14-slide presentation deck",
      "Viva question bank + cheat sheet",
      "Sample encodings and demo roster",
    ],
    hasScreenshots: false,
    demoExchange: {
      question: "Mark attendance for CS301 from the classroom webcam",
      answer: "Recognized 28/32 enrolled faces. 4 unmarked — flagged for manual review. CSV ready for download.",
      citation: "Attendance → Live session",
    },
    faq: [
      { q: "Does lighting affect accuracy?", a: "Yes — the report discusses failure modes; demo works best with front-facing, well-lit faces." },
      { q: "Is biometric data stored as raw photos?", a: "Encodings are stored; raw capture policy is documented for academic integrity discussion." },
    ],
  },
  {
    slug: "college-faq-chatbot",
    category: "ai-ml",
    title: "College FAQ Chatbot",
    tagline: "A campus FAQ chatbot over admissions, fees, and exam rules — RAG or intent-based, viva-ready.",
    description:
      "Students ask campus questions in plain English; the bot retrieves answers from an FAQ knowledge base with citations. Ideal if your college wants an 'institutional chatbot' theme without building a full LMS.",
    techStack: ["Python", "Streamlit", "sentence-transformers", "FAISS", "Groq API"],
    features: [
      "FAQ knowledge base with category tags",
      "Semantic retrieval + LLM answer phrasing",
      "Cited source FAQ entry for every answer",
      "Admin view to add/edit FAQ entries",
    ],
    whatIncluded: [
      "Full working Streamlit application",
      "8-chapter Word report",
      "14-slide presentation deck",
      "Viva question bank + cheat sheet",
      "Starter FAQ corpus you can rewrite for your college",
    ],
    hasScreenshots: false,
    demoExchange: {
      question: "When is the last date to apply for revaluation?",
      answer: "Within 10 working days of result publication, online via the exam portal. Source: Exam Rules FAQ #14.",
      citation: "Chat → cited FAQ",
    },
    faq: [
      { q: "Can we use our college's real FAQ PDF?", a: "Yes — replace the corpus and rebuild the index with the included script." },
      { q: "Does it need the internet?", a: "Embedding can be local; LLM calls need an API key unless you swap in a local model." },
    ],
  },
  {
    slug: "movie-recommendation-system",
    category: "ai-ml",
    title: "Movie Recommendation System",
    tagline: "Content-based and collaborative filtering recommendations with an interactive Streamlit explorer.",
    description:
      "Browse movies, get similar-title recommendations, and compare content-based vs collaborative approaches. A staple ML project with clear evaluation talk tracks (precision/recall, cold start) for viva.",
    techStack: ["Python", "Pandas", "Scikit-learn", "Streamlit", "Plotly"],
    features: [
      "Search movies and view similar recommendations",
      "Toggle content-based vs collaborative modes",
      "Explain why a title was recommended",
      "Simple evaluation charts for the report demo",
    ],
    whatIncluded: [
      "Full working Streamlit application",
      "8-chapter Word report",
      "14-slide presentation deck",
      "Viva question bank + cheat sheet",
      "Sample movies dataset",
    ],
    hasScreenshots: false,
    demoExchange: {
      question: "Recommend movies like Inception",
      answer: "Top picks: Interstellar, The Prestige, Shutter Island — matched on genre + cast/crew similarity embeddings.",
      citation: "Recommend → Content-based",
    },
    faq: [
      { q: "Can I use a different domain (books/songs)?", a: "Yes — swap the dataset columns and retrain similarity; the pipeline stays the same." },
      { q: "Is this deep learning?", a: "Base kit uses classical recommenders; you can discuss neural CF as future work." },
    ],
  },
  {
    slug: "speech-to-text-notes",
    category: "ai-ml",
    title: "Speech-to-Text Lecture Notes",
    tagline: "Record or upload audio, transcribe lectures, and get structured notes — an AI productivity kit.",
    description:
      "Upload lecture audio (or record in-browser where supported), transcribe with a speech model, then generate bullet notes and key terms. Great demo narrative for students who want 'AI for education' without a full LMS.",
    techStack: ["Python", "Streamlit", "Whisper/Groq Whisper", "Pandas"],
    features: [
      "Audio upload and transcription",
      "Auto-generated bullet notes and key terms",
      "Timestamped transcript view",
      "Export notes as text/markdown",
    ],
    whatIncluded: [
      "Full working Streamlit application",
      "8-chapter Word report",
      "14-slide presentation deck",
      "Viva question bank + cheat sheet",
      "Sample lecture audio clips",
    ],
    hasScreenshots: false,
    demoExchange: {
      question: "Transcribe this 12-minute OS lecture clip and summarize",
      answer: "Transcript ready (1,842 words). Notes: process scheduling, context switching, deadlock conditions — 8 key terms extracted.",
      citation: "Notes → Generate",
    },
    faq: [
      { q: "What languages are supported?", a: "English is default; other languages depend on the Whisper model variant you configure." },
      { q: "How long can audio be?", a: "Demo clips are short; longer files work but need patience and API rate limits documented in setup." },
    ],
  },
  {
    slug: "traffic-sign-recognition",
    category: "ai-ml",
    title: "Traffic Sign Recognition",
    tagline: "Classify traffic sign images with a CNN — a computer vision kit with a clean Streamlit demo.",
    description:
      "Upload a traffic sign image and get the predicted class with confidence. Includes a labeled sample set and training notebook/script so you can explain CNN layers and data augmentation in viva.",
    techStack: ["Python", "TensorFlow/Keras", "Streamlit", "OpenCV"],
    features: [
      "Image upload → sign class prediction",
      "Top-k confidence display",
      "Sample sign gallery for demos",
      "Training accuracy/loss charts",
    ],
    whatIncluded: [
      "Full working Streamlit application",
      "8-chapter Word report",
      "14-slide presentation deck",
      "Viva question bank + cheat sheet",
      "Sample images and model weights",
    ],
    hasScreenshots: false,
    demoExchange: {
      question: "What sign is in this photo?",
      answer: "Predicted: Speed Limit 60 (0.93). Alternatives: Speed Limit 80 (0.04), End of limit (0.02).",
      citation: "Predict → Result",
    },
    faq: [
      { q: "Is this related to self-driving cars?", a: "It's a focused classification module — perfect scope for a semester project without claiming a full AV stack." },
      { q: "Can I use my own photos?", a: "Yes — results vary with angle/lighting; the report covers preprocessing tips." },
    ],
  },
  // ─── Mobile Apps ──────────────────────────────────────────────────────────
  {
    slug: "flutter-doctor-appointment",
    category: "mobile",
    title: "Flutter Doctor Appointment App",
    tagline: "Book doctors, manage slots, and track appointments — a Flutter + Firebase mobile kit.",
    description:
      "Patients browse doctors, book available slots, and view upcoming visits. Doctors manage schedules; admins oversee users. A polished mobile UI project with Firebase auth and Firestore — common for BCA/B.Tech mobile electives.",
    techStack: ["Flutter", "Dart", "Firebase Auth", "Cloud Firestore"],
    features: [
      "Patient and doctor role flows",
      "Doctor profiles and slot booking",
      "Appointment status updates",
      "Firebase authentication",
      "Responsive mobile layouts",
    ],
    whatIncluded: [
      "Full Flutter application source",
      "8-chapter Word report",
      "14-slide presentation deck",
      "Viva question bank + cheat sheet",
      "Firebase setup guide + seed data notes",
    ],
    hasScreenshots: false,
    demoExchange: {
      question: "Book Dr. Rao for Friday 5:30 PM",
      answer: "Slot reserved. Appointment confirmed under My Visits with status: upcoming. Reminder placeholder saved.",
      citation: "Patient app → Book",
    },
    faq: [
      { q: "Does it need a physical phone?", a: "Android emulator or iOS simulator works for demos; a device is optional." },
      { q: "Is the backend Firebase only?", a: "Base kit is Firebase; swapping to a custom REST API is documented as an extension." },
    ],
  },
  {
    slug: "flutter-expense-tracker",
    category: "mobile",
    title: "Flutter Expense Tracker",
    tagline: "Track daily expenses, categories, and monthly charts — a clean Flutter finance kit.",
    description:
      "Add income/expense entries, filter by category and month, and view simple charts. Local persistence plus optional cloud sync path. Easy to demo and defend with clear data models.",
    techStack: ["Flutter", "Dart", "SQLite/Hive", "Provider/Riverpod"],
    features: [
      "Add/edit/delete transactions",
      "Category budgets and monthly summary",
      "Charts for spending breakdown",
      "Local offline-first storage",
      "Export CSV for the report appendix",
    ],
    whatIncluded: [
      "Full Flutter application source",
      "8-chapter Word report",
      "14-slide presentation deck",
      "Viva question bank + cheat sheet",
      "Setup and run instructions",
    ],
    hasScreenshots: false,
    demoExchange: {
      question: "How much did I spend on Food this month?",
      answer: "Food: ₹4,280 across 19 transactions. 34% of total spend. Budget remaining: ₹720.",
      citation: "Insights → Categories",
    },
    faq: [
      { q: "Does it connect to real bank accounts?", a: "No — manual entry keeps scope academic and privacy-safe." },
      { q: "Can I change currency to INR?", a: "Yes — currency formatting is configurable in app settings/constants." },
    ],
  },
  {
    slug: "flutter-notes-app",
    category: "mobile",
    title: "Flutter Notes & Tasks App",
    tagline: "Notes, checklists, and reminders in a polished Flutter productivity kit.",
    description:
      "Create rich notes and task lists with search, pins, and reminder flags. Demonstrates local state, navigation, and clean UI components — ideal when you need a mobile project that isn't another clone of a huge marketplace.",
    techStack: ["Flutter", "Dart", "SQLite/Hive", "Material 3"],
    features: [
      "Notes and checklist tasks",
      "Search, pin, and archive",
      "Reminder flags and due dates",
      "Dark/light theme toggle",
      "Local persistence",
    ],
    whatIncluded: [
      "Full Flutter application source",
      "8-chapter Word report",
      "14-slide presentation deck",
      "Viva question bank + cheat sheet",
      "Setup and run instructions",
    ],
    hasScreenshots: false,
    demoExchange: {
      question: "Pin my DBMS revision checklist and set due Sunday",
      answer: "Note pinned to top. Due date set to Sunday 9:00 PM. Appears under Upcoming.",
      citation: "Notes → Edit",
    },
    faq: [
      { q: "Is internet required?", a: "No — the base kit works fully offline." },
      { q: "Can notes sync across devices?", a: "Offline is default; Firebase sync can be added as an extension." },
    ],
  },
  {
    slug: "react-native-fitness-app",
    category: "mobile",
    title: "React Native Fitness Tracker",
    tagline: "Workouts, steps/goals, and progress charts — a React Native health kit for final year.",
    description:
      "Log workouts, set weekly goals, and visualize progress. Uses React Native with a simple backend or local store depending on the kit profile — good contrast if your classmates all chose Flutter.",
    techStack: ["React Native", "Expo", "React Navigation", "AsyncStorage"],
    features: [
      "Workout logging by type and duration",
      "Weekly goals and streaks",
      "Progress charts",
      "Profile and goal settings",
      "Expo-friendly demo builds",
    ],
    whatIncluded: [
      "Full React Native (Expo) source",
      "8-chapter Word report",
      "14-slide presentation deck",
      "Viva question bank + cheat sheet",
      "Run instructions for Android/iOS simulators",
    ],
    hasScreenshots: false,
    demoExchange: {
      question: "Log a 40-minute run and show weekly progress",
      answer: "Run logged — 40 min, 520 kcal est. Weekly goal 67% complete. Streak: 4 days.",
      citation: "Home → Add workout",
    },
    faq: [
      { q: "Do I need Expo Go?", a: "Yes for the fastest demo path; bare workflow notes are in the docs if needed." },
      { q: "Does it read Apple Health / Google Fit?", a: "Base kit is manual logs; health APIs can be an advanced extension." },
    ],
  },
  {
    slug: "flutter-recipe-app",
    category: "mobile",
    title: "Flutter Recipe Finder App",
    tagline: "Browse recipes, save favorites, and filter by ingredients — a Flutter content app kit.",
    description:
      "Search and filter recipes, open detail steps, and save favorites locally. Optional API integration for remote recipes. Friendly UI-heavy mobile project with clear navigation patterns for viva.",
    techStack: ["Flutter", "Dart", "Provider/Riverpod", "REST API"],
    features: [
      "Recipe browse/search with filters",
      "Step-by-step detail screens",
      "Favorites and recent views",
      "Ingredient-based filter",
      "Clean Material UI",
    ],
    whatIncluded: [
      "Full Flutter application source",
      "8-chapter Word report",
      "14-slide presentation deck",
      "Viva question bank + cheat sheet",
      "Sample recipe JSON + API wiring guide",
    ],
    hasScreenshots: false,
    demoExchange: {
      question: "Show vegetarian dinner recipes under 30 minutes",
      answer: "12 matches. Top: Paneer Wrap (25 min), Veg Pulao (30 min), Chickpea Salad (15 min).",
      citation: "Explore → Filters",
    },
    faq: [
      { q: "Does it need a paid API key?", a: "Sample local JSON works offline; optional remote API keys are documented." },
      { q: "Can I theme it to my college?", a: "Yes — colors and app name are easy config changes for customization." },
    ],
  },
  {
    slug: "react-native-chat-app",
    category: "mobile",
    title: "React Native Chat App",
    tagline: "One-to-one chat with auth and realtime messages — a React Native + Firebase kit.",
    description:
      "Sign in, find users, and exchange realtime messages with a chat thread UI. Covers auth, lists, and realtime listeners — strong viva topics for mobile + backend-as-a-service.",
    techStack: ["React Native", "Expo", "Firebase Auth", "Cloud Firestore"],
    features: [
      "Email/password authentication",
      "User list and one-to-one threads",
      "Realtime message updates",
      "Basic online/last-seen fields",
      "Push-notification-ready structure",
    ],
    whatIncluded: [
      "Full React Native (Expo) source",
      "8-chapter Word report",
      "14-slide presentation deck",
      "Viva question bank + cheat sheet",
      "Firebase setup guide",
    ],
    hasScreenshots: false,
    demoExchange: {
      question: "Message Ankit: 'Are notes uploaded for CN?'",
      answer: "Message sent in thread Ankit. Delivered tick updated. Appears instantly on the second logged-in client.",
      citation: "Chats → Ankit",
    },
    faq: [
      { q: "Is group chat included?", a: "One-to-one is the base scope; group chat is a natural extension for viva 'future work'." },
      { q: "Can I demo on two emulators?", a: "Yes — two auth users on two sessions is the standard viva demo." },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** Meta description for SERP/OG — prefer ~120–160 chars (tagline if long enough, else description). */
export function getProjectMetaDescription(project: Project): string {
  const normalize = (s: string) => s.replace(/\s+/g, " ").trim();
  const clamp = (s: string, max = 158) => {
    if (s.length <= max) return s;
    const cut = s.slice(0, max - 1);
    const i = cut.lastIndexOf(" ");
    const base = (i > 100 ? cut.slice(0, i) : cut).replace(/[,:;.\-–—]\s*$/, "");
    return `${base}…`;
  };

  const tagline = normalize(project.tagline);
  if (tagline.length >= 120) return clamp(tagline);

  const description = normalize(project.description);
  if (description.length >= 120) return clamp(description);

  // Last resort: combine so thin copy still clears the short-description check
  return clamp(`${tagline} ${description}`);
}
