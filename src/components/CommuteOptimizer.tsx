import * as React from "react";
import { WORKSPACES, type Workspace } from "@/data/workspaces";
import { UploadCloud, Loader2, MapPinned, Sparkles, X, Network } from "lucide-react";

// Two-node hub-and-spoke strategy. Hub = central premium; Spoke = suburban scale.
const HUB_ID = "mum-wework-bkc";
const SPOKE_ID = "mum-smartworks-andheri"; // stands in for "Awfis Thane" suburban node

export type CommuteCluster = {
  hub: Workspace;
  spoke: Workspace;
  hubShare: number;
  spokeShare: number;
  reduction: number;
  ids: string[];
} | null;

export function CommuteOptimizer({
  cluster,
  onChange,
}: {
  cluster: CommuteCluster;
  onChange: (c: CommuteCluster) => void;
}) {
  const [loading, setLoading] = React.useState(false);

  const run = () => {
    setLoading(true);
    setTimeout(() => {
      const hub = WORKSPACES.find((w) => w.id === HUB_ID)!;
      const spoke = WORKSPACES.find((w) => w.id === SPOKE_ID)!;
      onChange({
        hub,
        spoke,
        hubShare: 30,
        spokeShare: 70,
        reduction: 42,
        ids: [hub.id, spoke.id],
      });
      setLoading(false);
    }, 1100);
  };

  return (
    <div className="glass relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/5 via-card/80 to-emerald-500/5 p-5 backdrop-blur-xl">
      <div className="absolute inset-0 -z-10 opacity-50 [background:radial-gradient(40%_60%_at_85%_10%,oklch(0.72_0.18_155/0.18),transparent_60%),radial-gradient(40%_60%_at_10%_90%,oklch(0.55_0.22_280/0.18),transparent_60%)]" />
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground">
            <Network className="h-3 w-3" /> Hub & Spoke Geospatial Engine
          </div>
          <h3 className="mt-1 text-lg font-semibold tracking-tight">Optimize Team Hub & Spokes</h3>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Upload a team commute dataset. We cluster pincodes, compute aggregate travel cost, and recommend a hub + spoke split that minimizes weekly commute hours.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={run}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/15 disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
            {loading ? "Clustering 1,284 pincodes…" : "Analyze Employee Commute CSV"}
          </button>
          {cluster && (
            <button
              onClick={() => onChange(null)}
              className="inline-flex items-center gap-1 rounded-lg border bg-card px-2.5 py-2 text-xs text-muted-foreground hover:bg-muted"
            >
              <X className="h-3 w-3" /> Reset
            </button>
          )}
        </div>
      </div>

      {loading && (
        <div className="mt-5 grid gap-2">
          {["Parsing geocodes…", "Building isochrones…", "Solving p-median on 2 nodes…"].map((l, i) => (
            <div key={l} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" style={{ animationDelay: `${i * 150}ms` }} />
              {l}
            </div>
          ))}
        </div>
      )}

      {cluster && !loading && (
        <div className="mt-5 grid gap-4 md:grid-cols-[1.2fr_1fr]">
          <div className="rounded-xl border bg-background/60 p-4">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-emerald-600">
              <Sparkles className="h-3 w-3" /> Recommended Strategy
            </div>
            <p className="mt-2 text-sm leading-relaxed">
              To reduce aggregate team weekly commute times by{" "}
              <b className="text-emerald-600">{cluster.reduction}%</b>: allocate a{" "}
              <b>{cluster.hubShare}% Central Hub</b> at <b>{cluster.hub.operator} {cluster.hub.micromarket}</b> and a{" "}
              <b>{cluster.spokeShare}% Spoke location</b> at <b>{cluster.spoke.operator} {cluster.spoke.micromarket}</b>.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              {[
                { l: "Avg commute saved", v: "37 min/day" },
                { l: "CO₂ reduction", v: "1.8 t/yr" },
                { l: "Seat utilisation", v: "92%" },
              ].map((s) => (
                <div key={s.l} className="rounded-lg bg-muted/50 p-2">
                  <div className="text-sm font-semibold tabular-nums">{s.v}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border bg-[oklch(0.14_0.02_264)] p-4 text-white">
            <div className="text-[11px] uppercase tracking-widest text-white/50">Cluster topology</div>
            <svg viewBox="0 0 320 160" className="mt-2 h-32 w-full">
              <defs>
                <radialGradient id="hub" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="oklch(0.72 0.18 155)" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="oklch(0.72 0.18 155)" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="110" cy="80" r="55" fill="url(#hub)" />
              <circle cx="240" cy="80" r="40" fill="url(#hub)" opacity="0.7" />
              {[[90, 60], [130, 100], [80, 95], [125, 55], [230, 65], [255, 95], [225, 105]].map(([x, y], i) => (
                <g key={i}>
                  <line x1={x} y1={y} x2={x < 180 ? 110 : 240} y2="80" stroke="white" strokeOpacity="0.25" strokeDasharray="2 3" />
                  <circle cx={x} cy={y} r="3" fill="white" />
                </g>
              ))}
              <circle cx="110" cy="80" r="6" fill="oklch(0.72 0.18 155)" stroke="white" strokeWidth="2" />
              <circle cx="240" cy="80" r="6" fill="oklch(0.55 0.22 280)" stroke="white" strokeWidth="2" />
            </svg>
            <div className="mt-1 flex items-center justify-between text-[11px]">
              <span className="inline-flex items-center gap-1"><MapPinned className="h-3 w-3 text-emerald-400" /> Hub · {cluster.hubShare}%</span>
              <span className="inline-flex items-center gap-1"><MapPinned className="h-3 w-3 text-violet-400" /> Spoke · {cluster.spokeShare}%</span>
            </div>
            <div className="mt-2 rounded-md border border-white/10 bg-white/5 px-2 py-1.5 text-[11px] text-white/80">
              Catalog filtered to the 2 recommended cluster nodes.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}