// Central WhatsApp prefill copy — keep very short (mobile WA often drops long text).

import { site } from "@/lib/site";

export type ProjectRef = { title: string; slug: string };

/** Site-wide defaults (header, hero, float, footer, etc.) */
export const whatsappMessages = {
  default: site.whatsappDefaultMessage,

  hero: "Hi, I want a final year project",

  header: "Hi, I have a question",

  footer: "Hi, recommend a project for my course",

  howItWorks: "Hi, I want to order a project",

  float: site.whatsappDefaultMessage,

  legal: "Hi, question about your policy",

  about: "Hi, question before buying",

  catalog: "Hi, need a project for my course",

  adsLanding: "Hi, help me pick a project",
} as const;

export function projectInterestMessage(project: ProjectRef): string {
  return `Hi, interested in ${project.title}`;
}

export function hubInterestMessage(hubLabel: string): string {
  return `Hi, looking at ${hubLabel}`;
}

export function blogInterestMessage(postTitle: string): string {
  return `Hi, read your blog — want a project`;
}
