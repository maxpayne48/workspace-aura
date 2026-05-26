import * as React from "react";
import { Sparkles, Send, X } from "lucide-react";

export type NovaFilters = {
  text: string;
  tags: string[];
  maxPrice?: number;
  metroOnly: boolean;
  shifts: boolean;
  teamSize?: number;
};

export function parseNova(text: string): NovaFilters {
  const t = text.toLowerCase();
  const tags: string[] = [];
  if (/(shift|24\/?7|night|round[- ]the[- ]clock)/.test(t)) tags.push("shifts", "247");
  if (/(metro|transit|station|public transport)/.test(t)) tags.push("metro");
  if (/(cabin|private|enclosed)/.test(t)) tags.push("private-cabin");
  if (/(hot ?desk|flex|drop[- ]in)/.test(t)) tags.push("hot-desk");
  if (/(meeting|conference|boardroom)/.test(t)) tags.push("meeting-rooms");
  if (/(cafe|barista|coffee|lounge)/.test(t)) tags.push("cafe");
  if (/(parking|car park)/.test(t)) tags.push("parking");

  // price: "under 12k", "below ₹15000", "<10000"
  let maxPrice: number | undefined;
  const m = t.match(/(?:under|below|<|upto|up to)\s*₹?\s*(\d+)\s*(k|000)?/);
  if (m) {
    const base = parseInt(m[1], 10);
    maxPrice = m[2] ? base * 1000 : base < 1000 ? base * 1000 : base;
  }

  // team size: "15 person", "team of 20"
  let teamSize: number | undefined;
  const ts = t.match(/(\d{1,4})\s*(?:-|\s)?\s*(?:person|people|seat|engineer|member|pax)/);
  if (ts) teamSize = parseInt(ts[1], 10);
  const ts2 = t.match(/team of (\d{1,4})/);
  if (ts2) teamSize = parseInt(ts2[1], 10);

  return {
    text,
    tags,
    maxPrice,
    metroOnly: tags.includes("metro"),
    shifts: tags.includes("shifts"),
    teamSize,
  };
}

export function novaNarrative(f: NovaFilters): string {
  const bits: string[] = [];
  if (f.shifts) bits.push("Optimizing for 24/7 access (shift work)");
  if (f.metroOnly) bits.push("within 500 meters of public transport lines");
  if (f.tags.includes("private-cabin")) bits.push("filtering to private cabin inventory");
  if (f.maxPrice) bits.push(`capping commercial bracket at ₹${f.maxPrice.toLocaleString("en-IN")} / seat`);
  if (f.teamSize) bits.push(`sized for a ${f.teamSize}-person team`);
  if (!bits.length) return "Showing the full curated catalog. Try mentioning team size, budget, metro access or shift work.";
  return bits.join(", ") + ".";
}

export function NovaAdvisor({
  onApply,
  active,
}: {
  onApply: (f: NovaFilters | null) => void;
  active: NovaFilters | null;
}) {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [history, setHistory] = React.useState<{ user: string; nova: string }[]>([
    {
      user: "",
      nova: "Hi, I'm Nova. Describe your team's workspace needs in plain English — I'll filter the catalog instantly.",
    },
  ]);

  const submit = () => {
    const text = input.trim();
    if (!text) return;
    const filters = parseNova(text);
    const nova = novaNarrative(filters);
    setHistory((h) => [...h, { user: text, nova }]);
    setInput("");
    onApply(filters);
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-white btn-glow shadow-xl"
      >
        <Sparkles className="h-4 w-4" /> Ask Nova
        {active && <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px]">filtered</span>}
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 z-40 flex w-[min(420px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.16_0.02_264)] text-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-indigo-600/40 to-emerald-500/20 p-3">
            <div className="flex items-center gap-2">
              <div className="grid h-7 w-7 place-items-center rounded-full bg-white/10"><Sparkles className="h-4 w-4" /></div>
              <div>
                <div className="text-sm font-semibold">Nova · Conversational Advisor v2</div>
                <div className="text-[10px] text-white/60">Local semantic parser · instant catalog filtering</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="rounded p-1 text-white/70 hover:text-white"><X className="h-4 w-4" /></button>
          </div>
          <div className="max-h-80 space-y-3 overflow-y-auto p-3 scrollbar-thin">
            {history.map((m, i) => (
              <div key={i} className="space-y-2 text-sm">
                {m.user && (
                  <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-tr-sm bg-indigo-500/80 px-3 py-2 text-white">{m.user}</div>
                )}
                <div className="w-fit max-w-[85%] rounded-2xl rounded-tl-sm bg-white/5 px-3 py-2 text-white/90">{m.nova}</div>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 p-3">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="15-person eng team, two shifts, near metro, under 12k…"
                className="flex-1 bg-transparent text-sm placeholder:text-white/40 focus:outline-none"
              />
              <button onClick={submit} className="rounded-lg bg-white/10 p-1.5 hover:bg-white/20"><Send className="h-4 w-4" /></button>
            </div>
            {active && (
              <button
                onClick={() => { onApply(null); setHistory((h) => [...h, { user: "", nova: "Cleared filters. Showing the full catalog again." }]); }}
                className="mt-2 text-[11px] text-white/60 underline-offset-2 hover:underline"
              >
                Clear Nova filters
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}