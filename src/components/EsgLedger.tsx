import * as React from "react";
import type { Workspace } from "@/data/workspaces";
import { Leaf, Award, Zap, Droplets, Wind } from "lucide-react";

// Derive city-aware green metrics deterministically from workspace properties.
export function getEsgProfile(w: Workspace) {
  const c = w.city;
  const cert =
    c === "Mumbai" ? "LEED Platinum" :
    c === "Delhi-NCR" ? "Smart HVAC Grid · IGBC Gold" :
    c === "Bangalore" ? "Net-Zero Ready · LEED Gold" :
    c === "Hyderabad" ? "GRIHA 5★" :
    c === "Pune" ? "EDGE Advanced" :
    "IGBC Silver";
  const base = (w.quietZonePct + w.wifiMbps / 10 + (w.tags.includes("247") ? 5 : 0)) / 1.4;
  const score = Math.min(99, Math.round(base));
  const grade = score >= 92 ? "A+" : score >= 85 ? "A" : score >= 78 ? "B+" : "B";
  const reduction = Math.max(11, Math.min(28, Math.round(score / 5)));
  return { cert, score, grade, reduction };
}

export function EsgLedger({ workspace }: { workspace: Workspace }) {
  const e = getEsgProfile(workspace);
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-end opacity-0 transition-all duration-300 group-hover:opacity-100">
      <div className="m-3 w-full rounded-xl border border-emerald-500/20 bg-background/95 p-3 shadow-xl backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-500/15 text-emerald-600">
              <Leaf className="h-3.5 w-3.5" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Sustainability & Efficiency Ledger</div>
              <div className="text-xs font-semibold">{e.cert}</div>
            </div>
          </div>
          <div className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
            <Award className="h-3 w-3" /> ESG {e.grade} · {e.score}/100
          </div>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1.5 text-[10px]">
          <div className="rounded-md bg-muted/60 p-1.5">
            <div className="flex items-center gap-1 text-muted-foreground"><Zap className="h-3 w-3" /> Energy</div>
            <div className="font-semibold tabular-nums">{Math.round(70 + e.score / 5)} kWh/seat·yr</div>
          </div>
          <div className="rounded-md bg-muted/60 p-1.5">
            <div className="flex items-center gap-1 text-muted-foreground"><Droplets className="h-3 w-3" /> Water</div>
            <div className="font-semibold tabular-nums">{Math.round(8 + e.score / 20)} L/seat·d</div>
          </div>
          <div className="rounded-md bg-muted/60 p-1.5">
            <div className="flex items-center gap-1 text-muted-foreground"><Wind className="h-3 w-3" /> Air</div>
            <div className="font-semibold tabular-nums">PM2.5 &lt; {12 + (workspace.quietZonePct % 5)}</div>
          </div>
        </div>
        <p className="mt-2 text-[11px] leading-snug text-foreground/80">
          Choosing this biophilic-optimized location reduces your team's indirect operational carbon footprint by{" "}
          <b className="text-emerald-700">{e.reduction}%</b> compared to local commercial baselines.
        </p>
      </div>
    </div>
  );
}