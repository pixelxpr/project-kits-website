export default function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-border border-t border-b border-border">
      {items.map((item, i) => (
        <details key={i} className="group py-4">
          <summary className="flex items-center justify-between cursor-pointer list-none font-medium text-text">
            {item.q}
            <span className="font-mono text-cyan group-open:rotate-45 transition-transform text-xl leading-none ml-4 shrink-0">
              +
            </span>
          </summary>
          <p className="text-sm text-text-muted mt-3 leading-relaxed">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
