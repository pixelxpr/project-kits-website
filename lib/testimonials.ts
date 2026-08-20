// testimonials.ts — real customer ratings received offline/email.
// Add more entries here as they come in.

export type Testimonial = {
  quote: string;
  name: string;
  meta: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: "The kit was exactly what I needed for my final submission. Everything was set up and working, and the report structure made it easy to write the rest of my project around it.",
    name: "Ritu Yadav",
    meta: "MCA Student",
  },
  {
    quote: "I was skeptical at first but the code actually ran on the first try. The viva question bank was genuinely helpful \u2014 my examiner asked about the retrieval architecture and I knew exactly what to say.",
    name: "Prashant Kumar",
    meta: "B.Tech Student",
  },
  {
    quote: "Great value for money. The documentation matched the actual code, which is rare. Setup took less than 15 minutes.",
    name: "Aman Bajwa",
    meta: "BCA Student",
  },
];
