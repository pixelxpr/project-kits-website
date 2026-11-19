"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { projects } from "@/lib/projects";

const STORAGE_KEY = "fyk-purchase-toast-dismissed";
const INITIAL_DELAY_MS = 5000;
const ROTATE_MS = 5000;

const NAMES = [
  "Rahul Verma",
  "Ananya Desai",
  "Karan Malhotra",
  "Isha Reddy",
  "Aditya Nair",
  "Meera Joshi",
  "Siddharth Rao",
  "Pooja Kulkarni",
  "Nikhil Sharma",
  "Divya Patel",
  "Arnav Gupta",
  "Shreya Iyer",
  "Harsh Agarwal",
  "Tanvi Shah",
  "Yash Chauhan",
  "Naina Kapoor",
];

const RELATIVE_TIMES = [
  "Just now",
  "1 min ago",
  "2 min ago",
  "3 min ago",
  "5 min ago",
  "8 min ago",
];

type ToastItem = {
  id: number;
  name: string;
  title: string;
  slug: string;
  when: string;
};

function pickToast(prev?: ToastItem | null): ToastItem {
  const catalog = projects.filter((p) => p.title);
  let project = catalog[Math.floor(Math.random() * catalog.length)]!;
  if (prev && catalog.length > 1) {
    let guard = 0;
    while (project.slug === prev.slug && guard < 8) {
      project = catalog[Math.floor(Math.random() * catalog.length)]!;
      guard += 1;
    }
  }

  let name = NAMES[Math.floor(Math.random() * NAMES.length)]!;
  if (prev && NAMES.length > 1) {
    let guard = 0;
    while (name === prev.name && guard < 8) {
      name = NAMES[Math.floor(Math.random() * NAMES.length)]!;
      guard += 1;
    }
  }

  return {
    id: Date.now() + Math.floor(Math.random() * 1000),
    name,
    title: project.title,
    slug: project.slug,
    when: RELATIVE_TIMES[Math.floor(Math.random() * RELATIVE_TIMES.length)]!,
  };
}

export default function PurchaseSocialToast() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [dismissed, setDismissed] = useState(true);
  const [item, setItem] = useState<ToastItem | null>(null);

  const hiddenRoute = useMemo(
    () =>
      Boolean(
        pathname?.startsWith("/ads") ||
          pathname?.startsWith("/api") ||
          pathname?.startsWith("/checkout"),
      ),
    [pathname],
  );

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      setDismissed(false);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || dismissed || hiddenRoute) return;

    let rotateId: number | undefined;
    const startId = window.setTimeout(() => {
      setItem((prev) => pickToast(prev));
      rotateId = window.setInterval(() => {
        setItem((prev) => pickToast(prev));
      }, ROTATE_MS);
    }, INITIAL_DELAY_MS);

    return () => {
      window.clearTimeout(startId);
      if (rotateId) window.clearInterval(rotateId);
    };
  }, [ready, dismissed, hiddenRoute]);

  const dismiss = () => {
    setDismissed(true);
    setItem(null);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  if (!ready || dismissed || hiddenRoute || !item) return null;

  const bottomClass = pathname?.startsWith("/projects/")
    ? "bottom-24 md:bottom-6"
    : "bottom-6";

  return (
    <div
      className={`pointer-events-none fixed left-4 right-4 sm:right-auto sm:left-5 z-40 ${bottomClass} max-w-sm`}
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto relative flex gap-3 rounded-xl border border-border bg-paper-card/95 backdrop-blur-md p-3.5 shadow-[0_16px_40px_-20px_rgba(11,31,58,0.45)]"
        >
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal font-display text-sm font-bold"
            aria-hidden
          >
            {item.name
              .split(" ")
              .map((p) => p[0])
              .slice(0, 2)
              .join("")}
          </div>

          <div className="min-w-0 flex-1 pr-5">
            <p className="text-sm text-text leading-snug">
              <span className="font-semibold">{item.name}</span>
              <span className="text-text-muted"> purchased </span>
              <Link
                href={`/projects/${item.slug}`}
                className="font-semibold text-teal hover:underline underline-offset-2"
              >
                {item.title}
              </Link>
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-text-faint">
              {item.when}
            </p>
          </div>

          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss purchase notification"
            className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-md text-text-faint hover:bg-paper-raised hover:text-text transition-colors"
          >
            <span aria-hidden className="text-lg leading-none">
              ×
            </span>
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
