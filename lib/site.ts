// site.ts — brand, nav, pricing, and shared copy for FinalYearKit.

export type NavLink = { label: string; href: string };

export const categories = [
  { id: "ai-ml", label: "AI / ML", status: "live" as const },
  { id: "mern", label: "MERN Stack", status: "live" as const },
  { id: "ecommerce", label: "E-commerce", status: "live" as const },
  { id: "mobile", label: "Mobile Apps", status: "live" as const },
];

export const site = {
  brandName: "FinalYearKit",
  tagline: "Submission-ready final year project kits — working code, report, slides, and viva prep.",
  description:
    "Final year project kits for B.Tech, BCA, BBA & MCA — working code, 8-chapter report, slides, and a viva bank customized to your college.",

  whatsappNumber: "917420879220",
  whatsappDefaultMessage: "Hi! I'm interested in one of your project kits.",

  instagramHandle: "finalyearkit",
  youtubeHandle: "FinalYearKit",
  githubHandle: "",
  linkedinHandle: "",

  email: "contact@finalyearkit.com",

  // Default blog author (override per post with frontmatter `author`)
  author: {
    name: "Rajan",
    role: "Founder & kit engineer",
    bio: "Builds the FinalYearKit projects end to end — code, reports, decks, and viva banks.",
  },

  nav: [
    { label: "Projects", href: "/#projects" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ] satisfies NavLink[],

  pricingTiers: [
    {
      name: "Starter",
      price: "\u20b91,499",
      originalPrice: "\u20b92,500",
      saving: "",
      badge: "",
      highlighted: false,
      deliveryHours: 4,
      description: "The working application, ready to run and demonstrate.",
      includes: [
        "Full source code",
        "Setup & run instructions",
        "requirements.txt / package.json",
        "Runs on your machine in under 10 min",
      ],
      ctaMessage: "Hi! I want the Starter kit (code only). Can you tell me more?",
    },
    {
      name: "Standard",
      price: "\u20b92,499",
      originalPrice: "\u20b94,500",
      saving: "Save \u20b92,001",
      badge: "Most Popular",
      highlighted: true,
      deliveryHours: 4,
      description: "Submit-ready — full academic report and presentation included.",
      includes: [
        "Everything in Starter",
        "8-chapter Word report",
        "14-slide presentation deck",
        "Architecture & flow diagrams",
      ],
      ctaMessage: "Hi! I want the Standard kit (code + report + slides). Can you tell me more?",
    },
    {
      name: "Complete",
      price: "\u20b93,499",
      originalPrice: "\u20b96,000",
      saving: "Save \u20b92,501",
      badge: "Best Value",
      highlighted: false,
      deliveryHours: 6,
      description: "Everything to submit AND confidently defend your project.",
      includes: [
        "Everything in Standard",
        "Viva Q&A bank + cheat sheet",
        "Customized to your name & college",
        "WhatsApp support until submission",
      ],
      ctaMessage: "Hi! I want the Complete kit. Can you tell me more?",
    },
  ],

  kitIncludes: [
    {
      title: "Working codebase",
      desc: "Full source that runs on your machine in under 10 minutes — not a half-finished demo.",
    },
    {
      title: "8-chapter report",
      desc: "Academic Word report with architecture, requirements, testing, and references.",
    },
    {
      title: "Presentation deck",
      desc: "14-slide deck aligned to the same code and report you submit.",
    },
    {
      title: "Viva question bank",
      desc: "Questions and answers built from your exact architecture — not generic interview trivia.",
    },
  ],

  trustPoints: [
    {
      stat: "Complete kit",
      label: "Code, 8-chapter report, slides, and viva prep — matched to the same project.",
    },
    {
      stat: "Hours, not weeks",
      label: "Most kits deliver the same day after you share college details on WhatsApp.",
    },
    {
      stat: "Your details on it",
      label: "Name, college, and department customized so the submission reads as yours.",
    },
  ],

  footer: {
    columns: [
      {
        title: "Products",
        links: [
          { label: "Chat with PDF", href: "/projects/pdf-rag-chat" },
          { label: "Library Management", href: "/projects/library-management-system" },
          { label: "MERN E-Commerce", href: "/projects/mern-ecommerce" },
          { label: "Flutter Notes App", href: "/projects/flutter-notes-app" },
          { label: "All project kits", href: "/#projects" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "How it works", href: "/#how-it-works" },
          { label: "Pricing", href: "/#pricing" },
          { label: "Viva mistakes guide", href: "/blog/common-viva-mistakes-cs" },
          { label: "How RAG works", href: "/blog/how-rag-works" },
          { label: "RSS feed", href: "/rss.xml" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Blog", href: "/blog" },
          { label: "Contact", href: "/#contact" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" },
          { label: "Refund Policy", href: "/refund" },
        ],
      },
    ],
    disclaimer:
      "Kits are a learning and reference resource. Check your institution\u2019s academic integrity policy before submitting — you are responsible for how you use what you purchase.",
  },
} as const;
