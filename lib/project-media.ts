/**
 * Prefer static cover files (Next/Image → WebP/AVIF) over the OG API.
 * Slugs here have public/projects/<slug>/cover.jpg.
 */
const STATIC_COVER_SLUGS = new Set([
  "pdf-rag-chat",
  "chat-with-youtube",
  "chat-with-data",
  "resume-jd-matcher",
  "library-management-system",
  "hotel-booking-system",
  "restaurant-management-system",
  "vehicle-fleet-management-system",
  "mern-ecommerce",
  "face-recognition-attendance",
]);

/** Cover URL for cards / topics. Static WebP when available; else OG cover API. */
export function projectCoverSrc(slug: string): string {
  if (STATIC_COVER_SLUGS.has(slug)) return `/projects/${slug}/cover.webp`;
  return `/api/covers/${slug}`;
}

export function hasStaticProjectCover(slug: string): boolean {
  return STATIC_COVER_SLUGS.has(slug);
}
