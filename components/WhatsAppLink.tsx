"use client";

import type { ReactNode, MouseEvent, AnchorHTMLAttributes } from "react";
import {
  trackWhatsAppClick,
  whatsappUrl,
  type WhatsAppPlacement,
} from "@/lib/tracking";

type Props = {
  placement: WhatsAppPlacement;
  message?: string;
  children: ReactNode;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children" | "className">;

/** Tracked WhatsApp link — GA4 `whatsapp_click` + placement tag in the chat text. */
export default function WhatsAppLink({
  placement,
  message,
  children,
  className,
  onClick,
  ...rest
}: Props) {
  const href = whatsappUrl(placement, message);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    trackWhatsAppClick(placement);
    onClick?.(e);
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  );
}
