/**
 * Free Instant downloads — base ZIP only (add-ons still paid).
 * Edit this list to add/remove free catalog projects.
 * Slugs must also be Instant-ready (ZIP at instant/{slug}.zip).
 */
export const FREE_PROJECT_SLUGS = [
  "library-management-system",
  "hotel-booking-system",
] as const;

export type FreeProjectSlug = (typeof FREE_PROJECT_SLUGS)[number];

export function isFreeProjectSlug(slug: string): boolean {
  return (FREE_PROJECT_SLUGS as readonly string[]).includes(slug);
}
