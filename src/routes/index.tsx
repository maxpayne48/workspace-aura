import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { WORKSPACES, CITIES, WORKSPACE_TYPES, getWorkspaceTypes, type City, type Workspace, type WorkspaceType } from "@/data/workspaces";
import { WorkspaceCard } from "@/components/WorkspaceCard";
import { VideoTourModal } from "@/components/VideoTourModal";
import { LiveAvailability } from "@/components/LiveAvailability";
import { HybridOptimizer, computeRequiredSeats, type HybridState } from "@/components/HybridOptimizer";
import { NovaAdvisor, type NovaFilters } from "@/components/NovaAdvisor";
import { CommuteOptimizer, type CommuteCluster } from "@/components/CommuteOptimizer";
import { CompareModal } from "@/components/CompareModal";
import { Search, Building2, GitCompare, X } from "lucide-react";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  const [city, setCity] = React.useState<City | "All">("All");
  const [query, setQuery] = React.useState("");
  const [wsType, setWsType] = React.useState<WorkspaceType | "All">("All");
  const [hybrid, setHybrid] = React.useState<HybridState>(() => {
    const c = computeRequiredSeats(120, 3);
    return { employees: 120, daysPerWeek: 3, ...c };
  });
  const [nova, setNova] = React.useState<NovaFilters | null>(null);
  const [cluster, setCluster] = React.useState<CommuteCluster>(null);
  const [videoFor, setVideoFor] = React.useState<Workspace | null>(null);
  const [liveFor, setLiveFor] = React.useState<Workspace | null>(null);
  const [compareIds, setCompareIds] = React.useState<string[]>([]);
  const [compareOpen, setCompareOpen] = React.useState(false);

  const MAX_COMPARE = 4;
  const toggleCompare = React.useCallback((w: Workspace) => {
    setCompareIds((prev) => {
      if (prev.includes(w.id)) return prev.filter((x) => x !== w.id);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, w.id];
    });
  }, []);
  const compareWorkspaces = React.useMemo(
    () => compareIds.map((id) => WORKSPACES.find((w) => w.id === id)!).filter(Boolean),
    [compareIds]
  );

  const filtered = React.useMemo(() => {
    return WORKSPACES.filter((w) => {
      if (cluster && !cluster.ids.includes(w.id)) return false;
      if (city !== "All" && w.city !== city) return false;
      if (wsType !== "All" && !getWorkspaceTypes(w).includes(wsType)) return false;
      if (query) {
        const q = query.toLowerCase();
        if (!`${w.operator} ${w.location} ${w.micromarket} ${w.city}`.toLowerCase().includes(q)) return false;
      }
      if (nova) {
        if (nova.maxPrice && w.basePricePerSeat > nova.maxPrice) return false;
        if (nova.metroOnly && w.metroDistanceMeters > 500) return false;
        for (const tag of nova.tags) {
          if (!w.tags.includes(tag as Workspace["tags"][number])) return false;
        }
        if (nova.teamSize && w.seatCapacity < nova.teamSize) return false;
      }
      return true;
    });
  }, [city, query, nova, wsType, cluster]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg gradient-primary text-white"><Building2 className="h-4 w-4" /></div>
            <div>
              <div className="text-sm font-semibold tracking-tight">Qdesq <span className="text-muted-foreground">/ Aggregator</span></div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">AI Workspace Intelligence</div>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a className="hover:text-foreground" href="#catalog">Catalog</a>
            <a className="hover:text-foreground" href="#optimizer">Optimizer</a>
            <a className="hover:text-foreground" href="#cities">Cities</a>
          </nav>
          <button className="rounded-lg px-3 py-1.5 text-sm font-medium text-white btn-glow">Book Demo</button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 -z-10 opacity-60 [background:radial-gradient(60%_50%_at_70%_0%,oklch(0.72_0.18_155/0.15),transparent_60%),radial-gradient(50%_50%_at_10%_10%,oklch(0.45_0.22_280/0.15),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground">
            <span className="marquee-dot" /> Live across {CITIES.length} metros · {WORKSPACES.length} verified operators
          </div>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            The workspace catalog that thinks before you scroll.
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Real operator inventory. Live IoT telemetry. Hybrid roster math, instant pricing brackets, and Nova — your conversational workspace advisor.
          </p>

          <div className="mt-6 flex flex-col gap-3 md:flex-row">
            <div className="flex flex-1 items-center gap-2 rounded-xl border bg-card px-3 py-2 shadow-sm">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search operator, location or micromarket…"
                className="flex-1 bg-transparent text-sm focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {(["All", ...CITIES] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCity(c)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                    city === c ? "border-transparent text-white btn-glow" : "bg-card hover:bg-muted"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Workspace product types */}
          <div className="mt-5">
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Browse by workspace type</div>
            <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-7">
              <button
                onClick={() => setWsType("All")}
                className={`rounded-xl border bg-card px-3 py-3 text-xs font-medium transition hover:bg-muted ${
                  wsType === "All" ? "border-primary/60 ring-2 ring-primary/30" : ""
                }`}
              >
                <div className="text-lg">✦</div>
                <div className="mt-1">All Types</div>
              </button>
              {WORKSPACE_TYPES.map((t) => {
                const count = WORKSPACES.filter((w) => getWorkspaceTypes(w).includes(t)).length;
                const active = wsType === t;
                const icon =
                  t === "Serviced Offices" ? "🏢" :
                  t === "Coworking Spaces" ? "🤝" :
                  t === "Virtual Offices" ? "💻" :
                  t === "Meeting Rooms" ? "🎥" :
                  t === "Training Rooms" ? "📊" : "🛋️";
                return (
                  <button
                    key={t}
                    onClick={() => setWsType(active ? "All" : t)}
                    className={`group relative rounded-xl border bg-card px-3 py-3 text-left text-xs font-medium transition hover:bg-muted ${
                      active ? "border-primary/60 ring-2 ring-primary/30" : ""
                    }`}
                  >
                    <div className="text-lg leading-none">{icon}</div>
                    <div className="mt-1 leading-tight">{t}</div>
                    <div className="text-[10px] font-normal text-muted-foreground">{count} live</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div id="optimizer">
          <HybridOptimizer state={hybrid} onChange={setHybrid} />
        </div>

        <div className="mt-6">
          <CommuteOptimizer cluster={cluster} onChange={setCluster} />
        </div>

        {nova && (
          <div className="mt-6 rounded-xl border bg-gradient-to-r from-indigo-50 to-emerald-50 px-4 py-3 text-sm">
            <b>Nova:</b> {nova.text ? `"${nova.text}" ·` : ""} filtered to <b>{filtered.length}</b> spaces.
            <button onClick={() => setNova(null)} className="ml-3 text-xs underline">clear</button>
          </div>
        )}

        <div id="catalog" className="mt-8 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Curated workspaces</h2>
            <p className="text-sm text-muted-foreground">{filtered.length} live spaces matching your filters</p>
          </div>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((w) => (
            <WorkspaceCard
              key={w.id}
              workspace={w}
              requiredSeats={hybrid.requiredSeats}
              onPlay={setVideoFor}
              onCheckLive={setLiveFor}
              selectedForCompare={compareIds.includes(w.id)}
              onToggleCompare={toggleCompare}
            />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full rounded-xl border border-dashed bg-card p-10 text-center text-sm text-muted-foreground">
              No spaces match these filters. Try clearing Nova or expanding the city.
            </div>
          )}
        </div>

        <section id="cities" className="mt-16 rounded-2xl border bg-card p-6">
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Coverage</div>
          <h3 className="mt-1 text-lg font-semibold">Live across India's enterprise corridors</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {CITIES.map((c) => {
              const count = WORKSPACES.filter((w) => w.city === c).length;
              return (
                <button key={c} onClick={() => setCity(c)} className="rounded-xl border bg-background p-3 text-left transition hover:border-primary/40 hover:bg-muted/40">
                  <div className="text-sm font-medium">{c}</div>
                  <div className="text-[11px] text-muted-foreground">{count} spaces · live</div>
                </button>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="border-t py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Qdesq Aggregator · Live IoT data is simulated for demonstration.
      </footer>

      <VideoTourModal workspace={videoFor} open={!!videoFor} onOpenChange={(v) => !v && setVideoFor(null)} />
      <LiveAvailability workspace={liveFor} open={!!liveFor} onOpenChange={(v) => !v && setLiveFor(null)} />
      <NovaAdvisor onApply={setNova} active={nova} />
      <CompareModal
        workspaces={compareWorkspaces}
        open={compareOpen}
        onOpenChange={setCompareOpen}
        onRemove={(id) => setCompareIds((p) => p.filter((x) => x !== id))}
        requiredSeats={hybrid.requiredSeats}
      />

      {/* Floating compare tray */}
      {compareIds.length > 0 && (
        <div className="fixed bottom-4 left-1/2 z-40 w-[min(680px,calc(100%-2rem))] -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-2xl border bg-card/95 p-2 pl-4 shadow-2xl backdrop-blur-xl">
            <GitCompare className="h-4 w-4 text-primary" />
            <div className="text-xs">
              <b>{compareIds.length}</b> / {MAX_COMPARE} selected for comparison
            </div>
            <div className="hidden flex-1 items-center gap-1.5 overflow-x-auto sm:flex">
              {compareWorkspaces.map((w) => (
                <span key={w.id} className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border bg-background px-2 py-0.5 text-[11px]">
                  {w.operator}
                  <button onClick={() => setCompareIds((p) => p.filter((x) => x !== w.id))} className="text-muted-foreground hover:text-foreground">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <button
              onClick={() => setCompareIds([])}
              className="rounded-lg px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted"
            >
              Clear
            </button>
            <button
              onClick={() => setCompareOpen(true)}
              disabled={compareIds.length < 2}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-white btn-glow disabled:opacity-50"
            >
              Compare {compareIds.length >= 2 ? "now" : "(pick 2+)"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
