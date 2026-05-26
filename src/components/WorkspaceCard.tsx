import * as React from "react";
import type { Workspace, WorkspaceType } from "@/data/workspaces";
import { getWorkspaceTypes } from "@/data/workspaces";
import { PriceEstimator } from "./PriceEstimator";
import { Play, Wifi, Volume2, MapPin, Zap, Clock, CheckCircle2, Layers } from "lucide-react";

export function WorkspaceCard({
  workspace,
  requiredSeats,
  onPlay,
  onCheckLive,
}: {
  workspace: Workspace;
  requiredSeats: number;
  onPlay: (w: Workspace) => void;
  onCheckLive: (w: Workspace) => void;
}) {
  const fits = workspace.seatCapacity >= requiredSeats;
  // Availability now reacts to the Hybrid Optimizer's required seat count.
  const utilization = requiredSeats / workspace.seatCapacity;
  const dynamicStatus: "available" | "limited" | "full" =
    requiredSeats > workspace.seatCapacity
      ? "full"
      : utilization > 0.8
      ? "limited"
      : "available";
  const statusChip =
    dynamicStatus === "available"
      ? {
          label: `Available · ${workspace.seatCapacity - requiredSeats} seats free`,
          className: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30",
          Icon: CheckCircle2,
        }
      : dynamicStatus === "limited"
        ? {
            label: `Limited · only ${workspace.seatCapacity - requiredSeats} left`,
            className: "bg-amber-500/15 text-amber-700 border-amber-500/30",
            Icon: Zap,
          }
        : {
            label: `Over capacity · short by ${requiredSeats - workspace.seatCapacity}`,
            className: "bg-rose-500/15 text-rose-700 border-rose-500/30",
            Icon: Clock,
          };
  const Sc = statusChip.Icon;

  return (
    <article className="card-spring group relative overflow-hidden rounded-2xl border bg-card">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={workspace.thumbnail}
          alt={`${workspace.operator} ${workspace.location}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />

        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium backdrop-blur ${statusChip.className}`}>
            <Sc className="h-3 w-3" /> {statusChip.label}
          </span>
          <span className="rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[11px] text-white backdrop-blur">{workspace.operator}</span>
        </div>

        <button
          onClick={() => onPlay(workspace)}
          className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-900 shadow-lg backdrop-blur transition hover:bg-white"
        >
          <Play className="h-3.5 w-3.5 fill-current" /> Play Tour
        </button>

        {/* glassmorphic hover overlay */}
        <div className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="glass rounded-xl px-3 py-2 text-white">
            <div className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5"><Wifi className="h-3 w-3" /> Network {workspace.wifiMbps} Mbps</span>
              <span className="flex items-center gap-1.5"><Volume2 className="h-3 w-3" /> {workspace.quietZonePct}% Quiet Zone</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{workspace.city} · {workspace.micromarket}</div>
            <h3 className="mt-0.5 text-base font-semibold leading-tight">{workspace.operator}</h3>
            <div className="text-sm text-muted-foreground">{workspace.location}</div>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-[11px] text-muted-foreground">from</div>
            <div className="text-base font-semibold tabular-nums">₹{workspace.basePricePerSeat.toLocaleString("en-IN")}</div>
            <div className="text-[10px] text-muted-foreground">/seat/mo</div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5"><MapPin className="h-3 w-3" /> {workspace.metroDistanceMeters}m to metro</span>
          <span className="rounded-md bg-muted px-2 py-0.5">{workspace.seatCapacity.toLocaleString("en-IN")} seats</span>
          <span className={`rounded-md px-2 py-0.5 ${fits ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
            {fits ? `Fits your ${requiredSeats}-seat need` : `Under-sized vs ${requiredSeats} seats`}
          </span>
          {getWorkspaceTypes(workspace).map((t) => (
            <span key={t} className="inline-flex items-center gap-1 rounded-md border border-primary/20 bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-primary">
              <Layers className="h-2.5 w-2.5" /> {t}
            </span>
          ))}
        </div>

        <div className="mt-4">
          <PriceEstimator workspace={workspace} />
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onCheckLive(workspace)}
            className="flex-1 rounded-lg px-3 py-2 text-sm font-medium text-white btn-glow"
          >
            Check Live Availability
          </button>
          <button
            onClick={() => onPlay(workspace)}
            className="rounded-lg border bg-background px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Vibe Tour
          </button>
        </div>
      </div>
    </article>
  );
}