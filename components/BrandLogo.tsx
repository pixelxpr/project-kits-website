import Link from "next/link";
import Image from "next/image";

/** Shared wordmark — geometric F mark + FinalYearKit. */
export default function BrandLogo({
  size = "md",
}: {
  size?: "md" | "lg";
}) {
  const icon = size === "lg" ? 32 : 28;
  return (
    <Link
      href="/"
      className="font-display font-extrabold text-lg tracking-tight text-text flex items-center gap-2.5 shrink-0"
    >
      <Image
        src="/logo-icon.png"
        alt="FinalYearKit"
        width={icon}
        height={icon}
        priority={size === "lg"}
        className="shrink-0"
      />
      <span>
        Final<span className="text-teal">Year</span>Kit
      </span>
    </Link>
  );
}
