// testimonials.ts — customer ratings received offline/email.
// Add more entries here as they come in.

export type Testimonial = {
  quote: string;
  name: string;
  meta: string;
  /** Stars from 4.5–5 in half-star steps for display */
  rating: 4.5 | 5;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "The project was exactly what I needed for my final submission. Everything was set up and working, and the report structure made it easy to write the rest of my project around it.",
    name: "Ritu Yadav",
    meta: "MCA Student",
    rating: 5,
  },
  {
    quote:
      "I was skeptical at first but the code actually ran on the first try. The viva question bank was genuinely helpful — my examiner asked about the retrieval architecture and I knew exactly what to say.",
    name: "Prashant Kumar",
    meta: "B.Tech Student",
    rating: 5,
  },
  {
    quote:
      "Great value for money. The documentation matched the actual code, which is rare. Setup took less than 15 minutes.",
    name: "Aman Bajwa",
    meta: "BCA Student",
    rating: 5,
  },
  {
    quote:
      "Paid for the customize add-on. College name and my details were already in the report and slides — saved me a full night of formatting before the deadline.",
    name: "Sneha Patil",
    meta: "B.Tech CSE",
    rating: 5,
  },
  {
    quote:
      "WhatsApp support answered setup questions the same evening. Demo walked through cleanly in front of my guide.",
    name: "Rohit Sharma",
    meta: "BCA Student",
    rating: 4.5,
  },
  {
    quote:
      "Slides and report followed the same architecture as the app. Faculty could see it was one coherent project, not copy-pasted docs.",
    name: "Ananya Iyer",
    meta: "MCA Student",
    rating: 5,
  },
  {
    quote:
      "I needed something MERN-based for my college. Delivered same day after I shared department details. Would have liked one more sample dataset, but overall solid.",
    name: "Vikram Singh",
    meta: "B.Tech IT",
    rating: 4.5,
  },
  {
    quote:
      "Viva cheat sheet covered almost every question they asked about auth and database design. Worth the viva add-on for that alone.",
    name: "Neha Gupta",
    meta: "MCA Student",
    rating: 5,
  },
  {
    quote:
      "Clear README and it ran on Windows without fighting Node versions for hours. That alone made the purchase worth it.",
    name: "Arjun Mehta",
    meta: "BBA + IT elective",
    rating: 4.5,
  },
  {
    quote:
      "Booked late in the semester and still got report + slides aligned to the code. Submission week felt manageable for once.",
    name: "Priya Nair",
    meta: "B.Tech Student",
    rating: 5,
  },
];

export function averageRating(list: Testimonial[] = testimonials): number {
  if (list.length === 0) return 0;
  return list.reduce((sum, t) => sum + t.rating, 0) / list.length;
}
