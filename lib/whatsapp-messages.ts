// Central WhatsApp prefill copy.
// Keep messages short — WhatsApp truncates long queries on some devices.

import { site } from "@/lib/site";

export type ProjectRef = { title: string; slug: string };

/** Site-wide defaults (header, hero, float, footer, etc.) */
export const whatsappMessages = {
  default: site.whatsappDefaultMessage,

  hero: "Hi! I want a submission-ready final year project. Can you help me pick one?",

  header: "Hi! I have a question before buying a project.",

  footer: "Hi! I'm ready to pick a project — can you recommend one for my course?",

  howItWorks: "Hi! I saw How it works and want to order a project.",

  float: site.whatsappDefaultMessage,

  legal: "Hi! I have a question about your policies.",

  about: "Hi! I read your About page and had a question before buying.",

  catalog: "Hi! I'm browsing final year projects and need a project recommendation for my course.",

  /** Google Ads landing — learning / integrity positioning */
  adsLanding:
    "Hi! I'm looking at your final year learning projects and want help picking a topic for my course.",
} as const;

export function projectInterestMessage(project: ProjectRef): string {
  return `Hi! I'm interested in the "${project.title}" project (${project.slug}). Can you tell me more about pricing and delivery?`;
}

export function hubInterestMessage(hubLabel: string): string {
  return `Hi! I'm looking at ${hubLabel} on FinalYearKit and need a recommendation for my course.`;
}

export function blogInterestMessage(postTitle: string): string {
  return `Hi! I read "${postTitle}" on your blog and want to know more about your projects.`;
}
