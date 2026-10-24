/** Amber star row with half-star support (e.g. 4.5). */
export default function StarRating({
  rating,
  size = "md",
  label,
}: {
  rating: number;
  size?: "sm" | "md";
  label?: string;
}) {
  const px = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
  const starPath =
    "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

  return (
    <div
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={label ?? `${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.min(1, Math.max(0, rating - i));
        return (
          <span key={i} className={`relative inline-block ${px}`}>
            <svg
              className={`${px} text-border-strong absolute inset-0`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden
            >
              <path d={starPath} />
            </svg>
            {fill > 0 && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <svg
                  className={`${px} text-amber-500`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d={starPath} />
                </svg>
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
