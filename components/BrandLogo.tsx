import Link from "next/link";
import Image from "next/image";

/** Shared wordmark — keep header/footer identical (no letter-spacing drift). */
export default function BrandLogo({
  size = "md",
}: {
  size?: "md" | "lg";
}) {
  const icon = size === "lg" ? 30 : 28;
  return (
    <Link
      href="/"
      className="font-display font-extrabold text-lg tracking-tight text-text flex items-center gap-2.5 shrink-0"
    >
      <Image
        src="/logo-icon.svg"
        alt="FinalYearKit"
        width={icon}
        height={icon}
        priority={size === "lg"}
        className="rounded-lg"
      />
      <span>
        Final<span className="text-teal">Year</span>Kit
      </span>
    </Link>
  );
}
