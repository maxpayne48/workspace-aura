import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Workspace } from "@/data/workspaces";
import { CheckCircle2, Clock, Loader2, Radio, Zap } from "lucide-react";

type Step = { label: string; status: "pending" | "active" | "done" };

export function LiveAvailability({
  workspace,
  open,
  onOpenChange,
}: {
  workspace: Workspace | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [steps, setSteps] = React.useState<Step[]>([]);
  const [phase, setPhase] = React.useState<"handshake" | "result">("handshake");

  React.useEffect(() => {
    if (!open || !workspace) return;
    setPhase("handshake");
    const queue: Step[] = [
      { label: "Authenticating with space management software", status: "active" },
      { label: "Pinging on-site IoT occupancy sensors", status: "pending" },
      { label: `Cross-checking ${workspace.operator} central inventory`, status: "pending" },
      { label: "Reserving live slot in availability ledger", status: "pending" },
    ];
    setSteps(queue);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setSteps((prev) =>
        prev.map((s, idx) => ({
          ...s,
          status: idx < i ? "done" : idx === i ? "active" : "pending",
        })),
      );
      if (i >= queue.length) {
        clearInterval(id);
        setTimeout(() => setPhase("result"), 450);
      }
    }, 700);
    return () => clearInterval(id);
  }, [open, workspace]);

  if (!workspace) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md overflow-hidden border-0 bg-[oklch(0.16_0.02_264)] p-0 text-white sm:rounded-2xl">
        <div className="border-b border-white/10 bg-gradient-to-br from-indigo-600/30 to-emerald-500/10 p-5">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-white/70">
            <Radio className="h-3.5 w-3.5" /> AI Handshake Protocol
          </div>
          <div className="mt-1 text-lg font-semibold">{workspace.operator} · {workspace.location}</div>
          <div className="text-xs text-white/60">{workspace.city}</div>
        </div>

        {phase === "handshake" ? (
          <ol className="space-y-3 p-5">
            {steps.map((s, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <span className="grid h-7 w-7 place-items-center rounded-full border border-white/10 bg-white/5">
                  {s.status === "done" ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : s.status === "active" ? (
                    <Loader2 className="h-4 w-4 animate-spin text-indigo-300" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-white/30" />
                  )}
                </span>
                <span className={s.status === "pending" ? "text-white/40" : "text-white/90"}>{s.label}</span>
              </li>
            ))}
          </ol>
        ) : (
          <div className="p-5">
            {workspace.status === "available" && (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                <div className="flex items-center gap-2 text-emerald-300">
                  <span className="text-lg">🟢</span>
                  <span className="text-[11px] uppercase tracking-wider">Trending & Active</span>
                </div>
                <div className="mt-1 text-base font-medium text-white">
                  {workspace.availableCabins} Private Cabins available for immediate onboarding.
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-lg bg-white/5 p-2"><div className="font-semibold text-emerald-300">{workspace.availableCabins}</div><div className="text-white/60">Cabins</div></div>
                  <div className="rounded-lg bg-white/5 p-2"><div className="font-semibold text-emerald-300">{Math.round(workspace.seatCapacity * 0.18)}</div><div className="text-white/60">Hot Desks</div></div>
                  <div className="rounded-lg bg-white/5 p-2"><div className="font-semibold text-emerald-300">{Math.max(2, Math.round(workspace.availableCabins / 2))}</div><div className="text-white/60">Meeting Rooms</div></div>
                </div>
              </div>
            )}
            {workspace.status === "limited" && (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
                <div className="flex items-center gap-2 text-amber-300">
                  <Zap className="h-4 w-4" />
                  <span className="text-[11px] uppercase tracking-wider">High Demand · Limited</span>
                </div>
                <div className="mt-1 text-base font-medium text-white">
                  Only {workspace.availableCabins} cabins left · {Math.round(workspace.seatCapacity * 0.07)} hot desks moving fast.
                </div>
              </div>
            )}
            {workspace.status === "full" && (
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4">
                <div className="flex items-center gap-2 text-rose-300">
                  <Clock className="h-4 w-4" />
                  <span className="text-[11px] uppercase tracking-wider">100% Occupied</span>
                </div>
                <div className="mt-1 text-base font-medium text-white">
                  Next 20-seat team bay vacating on{" "}
                  <b>
                    {new Date(workspace.vacatingDate ?? "2026-07-01").toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </b>
                  .
                </div>
                <button className="mt-3 w-full rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/15">
                  Join automated waitlist queue
                </button>
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px]">
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-white/80">[{workspace.flash}]</span>
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-white/60">SLA verified 30s ago</span>
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-white/60">Ledger #{workspace.id.slice(-6).toUpperCase()}</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}