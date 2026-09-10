export default function ChatMockup({
  question,
  answer,
  citation,
}: {
  question: string;
  answer: string;
  citation: string;
}) {
  return (
    <div className="rounded-xl surface overflow-hidden shadow-[0_12px_40px_-20px_rgba(11,31,58,0.25)]">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-paper-raised">
        <span className="h-2.5 w-2.5 rounded-full bg-text-faint/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-text-faint/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-success/50" />
        <span className="ml-3 font-mono text-xs text-text-faint">chat.py</span>
      </div>
      <div className="p-5 space-y-4">
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-lg bg-teal/20 border border-teal/30 text-text px-4 py-2.5 text-sm">
            {question}
          </div>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[85%] space-y-2">
            <div className="rounded-lg bg-paper-card border border-border px-4 py-2.5 text-sm text-text">
              {answer}
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-sm bg-teal/10 px-2.5 py-1 text-xs font-mono text-teal">
              {citation}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
