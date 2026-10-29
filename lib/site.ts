// site.ts — brand, nav, pricing, and shared copy for FinalYearKit.

import { BASE_PRICE_INR, PRICING_ADDONS, formatInr, fullOrderInr } from "@/lib/pricing";

export type NavLink = { label: string; href: string };

export const categories = [
  { id: "ai-ml", label: "AI / ML", status: "live" as const },
  { id: "mern", label: "MERN Stack", status: "live" as const },
  { id: "ecommerce", label: "E-commerce", status: "live" as const },
  { id: "mobile", label: "Mobile Apps", status: "live" as const },
];

export const site = {
  brandName: "FinalYearKit",
  tagline: "Submission-ready final year projects — working code, report, slides, and viva prep.",
  description:
    "Final year projects for B.Tech, BCA, BBA & MCA — working code, 8-chapter report, slides, and a viva bank customized to your college.",

  whatsappNumber: "917420879220",
  whatsappDefaultMessage: "Hi, I want a final year project",

  instagramHandle: "finalyearkit",
  youtubeHandle: "FinalYearKit",
  githubHandle: "",
  linkedinHandle: "",

  email: "contact@finalyearkit.com",

  // Paste these into Instagram bio / WhatsApp status so GA shows real source/medium
  // (otherwise traffic lands as Direct).
  campaignLandings: {
    instagramBio:
      "https://finalyearkit.com/?utm_source=instagram&utm_medium=social&utm_campaign=profile_bio",
    instagramStory:
      "https://finalyearkit.com/?utm_source=instagram&utm_medium=social&utm_campaign=story",
    whatsappStatus:
      "https://finalyearkit.com/?utm_source=whatsapp&utm_medium=social&utm_campaign=status",
  },

  // Default blog author (override per post with frontmatter `author`)
  author: {
    name: "Rajan",
    role: "Founder & engineer",
    bio: "Builds the FinalYearKit projects end to end — code, reports, decks, and viva banks.",
  },

  nav: [
    { label: "How it works", href: "/#how-it-works" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ] satisfies NavLink[],

  /** Header “Projects” menu — catalog + degree + domain hubs */
  projectsMenu: {
    label: "Projects",
    href: "/final-year-projects",
    degrees: [
      { label: "B.Tech projects", href: "/btech-projects" },
      { label: "BCA projects", href: "/bca-projects" },
      { label: "BBA projects", href: "/bba-projects" },
      { label: "MCA projects", href: "/mca-projects" },
    ] satisfies NavLink[],
    domains: [
      { label: "AI / ML", href: "/final-year-projects/ai-ml" },
      { label: "Full-stack MERN", href: "/final-year-projects/mern" },
      { label: "E-commerce", href: "/final-year-projects/ecommerce" },
      { label: "Mobile apps", href: "/final-year-projects/mobile" },
      { label: "Computer Science", href: "/final-year-projects/computer-science" },
      { label: "Information Technology", href: "/final-year-projects/information-technology" },
      { label: "IEEE-style projects", href: "/final-year-projects/ieee-projects" },
    ] satisfies NavLink[],
  },

  /** @deprecated Prefer lib/pricing.ts — kept for AggregateOffer high bound */
  pricingTiers: [
    {
      name: "Instant package",
      price: formatInr(BASE_PRICE_INR),
      originalPrice: "",
      saving: "",
      badge: "",
      highlighted: false,
      deliveryHours: 0,
      description: "Code + report + slides with placeholder name/college.",
      includes: [
        "Full source code + setup instructions",
        "8-chapter Word report",
        "14-slide presentation deck",
      ],
    },
    {
      name: "With add-ons",
      price: formatInr(fullOrderInr(PRICING_ADDONS.map((a) => a.id))),
      originalPrice: "",
      saving: "",
      badge: "",
      highlighted: true,
      deliveryHours: 6,
      description: "Base package plus customize, viva, install, and walkthrough.",
      includes: [
        "Everything in Instant package",
        "Optional paid add-ons",
      ],
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
      title: "Optional add-ons",
      desc: "Customize name/college, viva Q&A bank, install help, or a walkthrough — pay only if you need them.",
    },
  ],

  trustPoints: [
    {
      stat: `From ${formatInr(BASE_PRICE_INR)}`,
      label: "Code, 8-chapter report, and slides — matched to the same project.",
    },
    {
      stat: "Instant or hours",
      label: "Ready projects download after payment; made-to-order delivers in a few hours.",
    },
    {
      stat: "Add-ons optional",
      label: "Customize, viva bank, install help, and walkthroughs are paid extras — not forced.",
    },
  ],

  footer: {
    columns: [
      {
        title: "By degree",
        links: [
          { label: "All final year projects", href: "/final-year-projects" },
          { label: "B.Tech projects", href: "/btech-projects" },
          { label: "BCA projects", href: "/bca-projects" },
          { label: "BBA projects", href: "/bba-projects" },
          { label: "MCA projects", href: "/mca-projects" },
        ],
      },
      {
        title: "By domain",
        links: [
          { label: "AI / ML projects", href: "/final-year-projects/ai-ml" },
          { label: "MERN / full-stack", href: "/final-year-projects/mern" },
          { label: "Computer Science", href: "/final-year-projects/computer-science" },
          { label: "Information Technology", href: "/final-year-projects/information-technology" },
          { label: "IEEE-style projects", href: "/final-year-projects/ieee-projects" },
          { label: "Project topics", href: "/project-topics" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "How it works", href: "/#how-it-works" },
          { label: "Pricing", href: "/#pricing" },
          { label: "GitHub zip vs our projects", href: "/github-vs-kit" },
          { label: "Blog", href: "/blog" },
          { label: "Viva mistakes guide", href: "/blog/common-viva-mistakes-cs" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Contact", href: "/#contact" },
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" },
          { label: "Refund Policy", href: "/refund" },
        ],
      },
    ],
    disclaimer:
      "Projects are a learning and reference resource. Check your institution\u2019s academic integrity policy before submitting — you are responsible for how you use what you purchase.",
  },
} as const;
