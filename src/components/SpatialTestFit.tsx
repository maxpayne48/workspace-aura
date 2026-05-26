import * as React from "react";
import type { Workspace } from "@/data/workspaces";
import { Layers3, Users, Coffee, Sparkles } from "lucide-react";

type Theme = "Industrial Minimalist" | "Biophilic Tech" | "Warm Corporate";
type Cafeteria = "Compact" | "Open-Bay";

const THEME_IMG: Record<Theme, string> = {
  "Industrial Minimalist":
    "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=1600&auto=format&fit=crop&q=80",
  "Biophilic Tech":
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&auto=format&fit=crop&q=80",
  "Warm Corporate":
    "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1600&auto=format&fit=crop&q=80",
};

const THEME_CAPEX: Record<Theme, number> = {
  "Industrial Minimalist": 3800,
  "Biophilic Tech": 5200,
  "Warm Corporate": 4500,
};

export function SpatialTestFit({ workspace }: { workspace: Workspace }) {
  const [theme, setTheme] = React.useState<Theme>("Warm Corporate");
  const [pods, setPods] = React.useState<2 | 4 | 8>(4);
  const [cafeteria, setCafeteria] = React.useState<Cafeteria>("Open-Bay");
  const [fade, setFade] = React.useState(false);

  const img = THEME_IMG[theme];
  React.useEffect(() => {
    setFade(true);
    const t = setTimeout(() => setFade(false), 220);
    return () => clearTimeout(t);
  }, [img]);

  const capex = THEME_CAPEX[theme] + pods * 80 + (cafeteria === "Open-Bay" ? 220 : 0);
  const cycle = 14 + pods * 1 + (cafeteria === "Open-Bay" ? 5 : 2);

  const Pill = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-[11px] font-medium transition ${
        active ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-200" : "border-white/15 bg-white/5 text-white/70 hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-400/15 text-emerald-300">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/50">AI Spatial Test-Fit Designer</div>
            <div className="text-sm font-semibold">Tailor {workspace.operator} · {workspace.micromarket}</div>
          </div>
        </div>
        <div className="text-right text-[11px] text-white/60">
          <div>Estimated Fit-Out CapEx</div>
          <div className="text-base font-semibold text-white tabular-nums">₹{capex.toLocaleString("en-IN")}/sq.ft.</div>
          <div>Custom build cycle: <b className="text-white">{cycle} days</b></div>
        </div>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-[1.4fr_1fr]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-white/10 bg-black">
          <img
            key={img}
            src={img}
            alt={theme}
            className={`h-full w-full object-cover transition-opacity duration-300 ${fade ? "opacity-30" : "opacity-100"}`}
          />
          <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[10px] uppercase tracking-widest text-white/90 backdrop-blur">
            Rendering · {theme}
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-md bg-black/55 px-3 py-1.5 text-[11px] backdrop-blur">
            <span>{pods} collaborative pods</span>
            <span>{cafeteria} cafeteria</span>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/50">
              <Layers3 className="h-3 w-3" /> Design Theme
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {(["Industrial Minimalist", "Biophilic Tech", "Warm Corporate"] as Theme[]).map((t) => (
                <Pill key={t} active={theme === t} onClick={() => setTheme(t)}>{t}</Pill>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/50">
              <Users className="h-3 w-3" /> Collaborative Pods
            </div>
            <div className="mt-1.5 flex gap-1.5">
              {([2, 4, 8] as const).map((n) => (
                <Pill key={n} active={pods === n} onClick={() => setPods(n)}>{n} pods</Pill>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/50">
              <Coffee className="h-3 w-3" /> Cafeteria Layout
            </div>
            <div className="mt-1.5 flex gap-1.5">
              {(["Compact", "Open-Bay"] as Cafeteria[]).map((c) => (
                <Pill key={c} active={cafeteria === c} onClick={() => setCafeteria(c)}>{c}</Pill>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}