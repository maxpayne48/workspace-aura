import * as React from "react";
import type { Workspace } from "@/data/workspaces";
import { Slider } from "@/components/ui/slider";

const COMPONENT_SHARE = [
  { key: "Workstation lease", pct: 58, color: "#6366f1" },
  { key: "Maintenance & housekeeping", pct: 14, color: "#10b981" },
  { key: "IT architecture & SLA", pct: 12, color: "#f59e0b" },
  { key: "Meeting room credits", pct: 8, color: "#ec4899" },
  { key: "Printing & utilities", pct: 8, color: "#22d3ee" },
];

export function PriceEstimator({ workspace }: { workspace: Workspace }) {
  const [months, setMonths] = React.useState(12);
  // Lease discount curve: 1mo +18%, 12mo baseline, 36mo -14%
  const factor = 1 + (12 - months) * 0.012 - Math.max(0, months - 12) * 0.005;
  const low = Math.round(workspace.basePricePerSeat * factor * 0.96);
  const high = Math.round(workspace.basePricePerSeat * factor * 1.06);

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center justify-between">
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
          AI Estimated Commercial Bracket
        </div>
        <div className="text-[11px] text-muted-foreground">{months}-month lease</div>
      </div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-2xl font-semibold tracking-tight">₹{low.toLocaleString("en-IN")}</span>
        <span className="text-muted-foreground">–</span>
        <span className="text-2xl font-semibold tracking-tight">₹{high.toLocaleString("en-IN")}</span>
        <span className="ml-1 text-xs text-muted-foreground">/ seat / month</span>
      </div>

      <Slider
        value={[months]}
        onValueChange={(v) => setMonths(v[0])}
        min={1}
        max={36}
        step={1}
        className="mt-3"
      />
      <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
        <span>1 mo</span>
        <span>12 mo</span>
        <span>36 mo</span>
      </div>

      <div className="mt-4">
        <div className="flex h-2 w-full overflow-hidden rounded-full">
          {COMPONENT_SHARE.map((c) => (
            <div key={c.key} style={{ width: `${c.pct}%`, background: c.color }} />
          ))}
        </div>
        <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
          {COMPONENT_SHARE.map((c) => (
            <li key={c.key} className="flex items-center gap-1.5 text-muted-foreground">
              <span className="h-2 w-2 rounded-sm" style={{ background: c.color }} />
              <span className="truncate">{c.key}</span>
              <span className="ml-auto text-foreground/80">{c.pct}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}