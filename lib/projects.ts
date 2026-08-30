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
  category: "ai-ml" | "ecommerce" | "mern";
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
    tagline: "A complete MERN E-Commerce Store project kit featuring secure Razorpay payment integration, a fully functional shopping cart, and a comprehensive admin dashboard.",
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
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
