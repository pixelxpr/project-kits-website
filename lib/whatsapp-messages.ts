// Central WhatsApp prefill copy. Placement tags are appended in whatsappUrl().
// Keep messages short — WhatsApp truncates long queries on some devices.

import { site } from "@/lib/site";

export type ProjectRef = { title: string; slug: string };

export type PricingTierName = "Starter" | "Standard" | "Complete";

/** Site-wide defaults (header, hero, float, footer, etc.) */
export const whatsappMessages = {
  default: site.whatsappDefaultMessage,

  hero: "Hi! I want a submission-ready final year project kit. Can you help me pick one?",

  header: "Hi! I'd like to get a project kit on WhatsApp.",

  footer: "Hi! I'm ready to pick a kit — can you recommend one for my course?",

  howItWorks: "Hi! I saw How it works and want to order a kit.",

  float: site.whatsappDefaultMessage,

  legal: "Hi! I have a question about your policies.",

  about: "Hi! I read your About page and had a question before buying.",

  catalog: "Hi! I'm browsing final year projects and need a kit recommendation for my course.",
} as const;

export function projectInterestMessage(project: ProjectRef): string {
  return `Hi! I'm interested in the "${project.title}" kit (${project.slug}). Can you tell me more about pricing and delivery?`;
}

export function projectTierMessage(
  project: ProjectRef,
  tier: PricingTierName,
): string {
  const tierNote =
    tier === "Starter"
      ? "Starter (code only)"
      : tier === "Standard"
        ? "Standard (code + report + slides)"
        : "Complete (code + report + slides + viva)";

  return `Hi! I want the ${tierNote} for "${project.title}" (${project.slug}). Can you confirm availability and next steps?`;
}

export function pricingTierMessage(tier: PricingTierName): string {
  if (tier === "Starter") {
    return "Hi! I want the Starter kit (code only). Can you tell me more?";
  }
  if (tier === "Standard") {
    return "Hi! I want the Standard kit (code + report + slides). Can you tell me more?";
  }
  return "Hi! I want the Complete kit. Can you tell me more?";
}

export function hubInterestMessage(hubLabel: string): string {
  return `Hi! I'm looking at ${hubLabel} on FinalYearKit and need a recommendation for my course.`;
}

export function blogInterestMessage(postTitle: string): string {
  return `Hi! I read "${postTitle}" on your blog and want to know more about your project kits.`;
}
