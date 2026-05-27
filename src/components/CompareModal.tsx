import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Workspace } from "@/data/workspaces";
import { getWorkspaceTypes } from "@/data/workspaces";
import { getEsgProfile } from "./EsgLedger";
import { X, Wifi, Volume2, MapPin, Users, IndianRupee, Leaf, Trophy, CheckCircle2, MinusCircle } from "lucide-react";

type Row = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  get: (w: Workspace) => React.ReactNode;
  // Higher is better unless inverse
  score?: (w: Workspace) => number;
  inverse?: boolean;
};

const ROWS: Row[] = [
  { label: "Price / seat / mo", icon: IndianRupee, get: (w) => `₹${w.basePricePerSeat.toLocaleString("en-IN")}`, score: (w) => w.basePricePerSeat, inverse: true },
  { label: "Seat capacity", icon: Users, get: (w) => w.seatCapacity.toLocaleString("en-IN"), score: (w) => w.seatCapacity },
  { label: "Wi-Fi backbone", icon: Wifi, get: (w) => `${w.wifiMbps} Mbps`, score: (w) => w.wifiMbps },
  { label: "Quiet zones", icon: Volume2, get: (w) => `${w.quietZonePct}%`, score: (w) => w.quietZonePct },
  { label: "Metro proximity", icon: MapPin, get: (w) => `${w.metroDistanceMeters} m`, score: (w) => w.metroDistanceMeters, inverse: true },
  { label: "ESG grade", icon: Leaf, get: (w) => `${getEsgProfile(w).grade} · ${getEsgProfile(w).score}/100`, score: (w) => getEsgProfile(w).score },
];

export function CompareModal({
  workspaces,
  open,
  onOpenChange,
  onRemove,
  requiredSeats,
}: {
  workspaces: Workspace[];
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onRemove: (id: string) => void;
  requiredSeats: number;
}) {
  // compute "winner" per row
  const winners = React.useMemo(() => {
    return ROWS.map((r) => {
      if (!r.score || workspaces.length < 2) return null;
      const vals = workspaces.map((w) => r.score!(w));
      const best = r.inverse ? Math.min(...vals) : Math.max(...vals);
      return workspaces[vals.indexOf(best)]?.id ?? null;
    });
  }, [workspaces]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-amber-500" />
            Side-by-side comparison
            <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-[11px] font-normal text-muted-foreground">
              {workspaces.length} spaces · {requiredSeats} seats target
            </span>
          </DialogTitle>
        </DialogHeader>

        {workspaces.length === 0 ? (
          <div className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
            Pick at least two workspaces using the "Compare" toggle on each card.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-separate border-spacing-0 text-sm">
              <thead>
                <tr>
                  <th className="sticky left-0 z-10 bg-background p-2 text-left text-[11px] uppercase tracking-widest text-muted-foreground"></th>
                  {workspaces.map((w) => (
                    <th key={w.id} className="min-w-[200px] p-2 align-top">
                      <div className="relative overflow-hidden rounded-xl border bg-card">
                        <img src={w.thumbnail} alt={w.operator} className="h-24 w-full object-cover" />
                        <button
                          onClick={() => onRemove(w.id)}
                          className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-background/90 text-foreground shadow hover:bg-background"
                          aria-label="Remove"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        <div className="p-2 text-left">
                          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{w.city}</div>
                          <div className="text-sm font-semibold leading-tight">{w.operator}</div>
                          <div className="text-[11px] text-muted-foreground">{w.location}</div>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => {
                  const Ic = r.icon;
                  return (
                    <tr key={r.label} className="border-t">
                      <td className="sticky left-0 z-10 whitespace-nowrap bg-background p-2 text-xs font-medium text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5"><Ic className="h-3.5 w-3.5" />{r.label}</span>
                      </td>
                      {workspaces.map((w) => {
                        const isWin = winners[i] === w.id;
                        return (
                          <td key={w.id} className={`p-2 align-middle tabular-nums ${isWin ? "bg-emerald-500/10" : ""}`}>
                            <div className="flex items-center gap-1.5">
                              <span className="font-medium">{r.get(w)}</span>
                              {isWin && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
                <tr className="border-t">
                  <td className="sticky left-0 z-10 bg-background p-2 text-xs font-medium text-muted-foreground">Fits {requiredSeats} seats</td>
                  {workspaces.map((w) => {
                    const fits = w.seatCapacity >= requiredSeats;
                    return (
                      <td key={w.id} className="p-2">
                        {fits ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-medium text-emerald-700"><CheckCircle2 className="h-3 w-3" /> Yes</span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/15 px-2 py-0.5 text-[11px] font-medium text-rose-700"><MinusCircle className="h-3 w-3" /> Short by {requiredSeats - w.seatCapacity}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
                <tr className="border-t">
                  <td className="sticky left-0 z-10 bg-background p-2 text-xs font-medium text-muted-foreground">Types</td>
                  {workspaces.map((w) => (
                    <td key={w.id} className="p-2">
                      <div className="flex flex-wrap gap-1">
                        {getWorkspaceTypes(w).map((t) => (
                          <span key={t} className="rounded-md border border-primary/20 bg-primary/5 px-1.5 py-0.5 text-[10px] font-medium text-primary">{t}</span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="border-t">
                  <td className="sticky left-0 z-10 bg-background p-2 text-xs font-medium text-muted-foreground">Amenities</td>
                  {workspaces.map((w) => (
                    <td key={w.id} className="p-2">
                      <div className="flex flex-wrap gap-1">
                        {w.amenities.map((a) => (
                          <span key={a} className="rounded-md bg-muted px-1.5 py-0.5 text-[10px]">{a}</span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}