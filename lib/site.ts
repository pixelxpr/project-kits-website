// site.ts — edit this file for anything that isn't a specific project or
// blog post. Everything marked TODO is a placeholder — replace before deploying.

export type NavLink = { label: string; href: string };

export const categories = [
  { id: "ai-ml", label: "AI / ML", status: "live" as const },
  { id: "ecommerce", label: "E-commerce", status: "coming-soon" as const },
  { id: "mern", label: "MERN Stack", status: "live" as const },
];

export const site = {
  brandName: "FinalYearKit",
  // Deliberately category-agnostic — this brand covers project kits across
  // categories (AI/ML today, more later), not just AI specifically.
  tagline: "Final year project kits built to actually work \u2014 and documented so you can defend them.",
  description:
    "Final year and college project kits for B.Tech, BCA, BBA & MCA students. Working code, 8-chapter report, presentation deck, and viva question bank \u2014 viva-ready across AI/ML, with more categories coming.",

  // WhatsApp — digits only, with country code (91 = India)
  whatsappNumber: "917420879220",
  whatsappDefaultMessage: "Hi! I'm interested in one of your project kits.",

  // Social handles
  instagramHandle: "pixelxpr",
  // GitHub / LinkedIn not active — remove from footer if you don't want them shown
  githubHandle: "",
  linkedinHandle: "",

  // Contact email
  email: "contact@finalyearkit.com",

  nav: [
    { label: "Projects", href: "/#projects" },
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

  trustPoints: [
    { stat: "Every", label: "kit ships with a full working codebase, report, deck & viva bank" },
    { stat: "10/10", label: "test cases passed on every project, documented in the report" },
    { stat: "100%", label: "customized to your name, college, and department" },
  ],

  footer: {
    columns: [
      {
        title: "Products",
        links: [
          { label: "AI / ML Kits", href: "/#projects" },
          { label: "E-commerce Kits", href: "#", badge: "Coming soon" },
          { label: "MERN Stack Kits", href: "/#projects" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About & Trust", href: "/about" },
          { label: "Blog", href: "/blog" },
          { label: "Contact", href: "#contact" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "How it works", href: "/#how-it-works" },
          { label: "Pricing", href: "/#pricing" },
          { label: "FAQ", href: "/#faq" },
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
      "Project kits are provided as a learning and reference resource. Before submitting any work as your own, check your institution's academic integrity policy on using external resources \u2014 you are responsible for how you use what you purchase here.",
  },
} as const;
