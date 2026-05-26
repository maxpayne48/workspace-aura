import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { Sparkles, TrendingDown } from "lucide-react";

export type HybridState = {
  employees: number;
  daysPerWeek: number;
  requiredSeats: number;
  savingsPct: number;
};

export function computeRequiredSeats(employees: number, daysPerWeek: number) {
  const required = Math.ceil(employees * (daysPerWeek / 5) * 1.15);
  const traditional = employees; // 1:1 fixed
  const savings = traditional > 0 ? Math.max(0, Math.round(((traditional - required) / traditional) * 100)) : 0;
  return { requiredSeats: required, savingsPct: savings };
}

export function HybridOptimizer({
  state,
  onChange,
}: {
  state: HybridState;
  onChange: (s: HybridState) => void;
}) {
  const setEmp = (n: number) => {
    const { requiredSeats, savingsPct } = computeRequiredSeats(n, state.daysPerWeek);
    onChange({ employees: n, daysPerWeek: state.daysPerWeek, requiredSeats, savingsPct });
  };
  const setDays = (n: number) => {
    const { requiredSeats, savingsPct } = computeRequiredSeats(state.employees, n);
    onChange({ employees: state.employees, daysPerWeek: n, requiredSeats, savingsPct });
  };

  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="grid h-8 w-8 place-items-center rounded-lg gradient-primary text-white">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <div className="text-sm font-semibold">Hybrid Roster & Capacity Optimizer</div>
          <div className="text-[11px] text-muted-foreground">Predictive seat math · 15% peak buffer</div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Total employees</label>
            <input
              type="number"
              value={state.employees}
              onChange={(e) => setEmp(Math.max(1, Math.min(5000, Number(e.target.value) || 1)))}
              className="w-20 rounded-md border bg-background px-2 py-1 text-right text-sm font-medium"
            />
          </div>
          <Slider
            value={[state.employees]}
            onValueChange={(v) => setEmp(v[0])}
            min={5}
            max={500}
            step={1}
            className="mt-3"
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">In-office days / week</label>
            <span className="rounded-md border bg-background px-2 py-1 text-sm font-medium">{state.daysPerWeek.toFixed(1)}</span>
          </div>
          <Slider
            value={[state.daysPerWeek]}
            onValueChange={(v) => setDays(v[0])}
            min={1}
            max={5}
            step={0.5}
            className="mt-3"
          />
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border bg-gradient-to-br from-indigo-50 to-white p-4">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Required seats</div>
          <div className="mt-1 text-2xl font-semibold tabular-nums">{state.requiredSeats}</div>
          <div className="text-[11px] text-muted-foreground">Math.ceil(emp × d/5 × 1.15)</div>
        </div>
        <div className="rounded-xl border bg-gradient-to-br from-emerald-50 to-white p-4">
          <div className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-emerald-700">
            <TrendingDown className="h-3 w-3" /> Savings vs 1:1 lease
          </div>
          <div className="mt-1 text-2xl font-semibold tabular-nums text-emerald-700">{state.savingsPct}%</div>
          <div className="text-[11px] text-muted-foreground">~{Math.max(0, state.employees - state.requiredSeats)} seats avoided</div>
        </div>
        <div className="rounded-xl border bg-gradient-to-br from-amber-50 to-white p-4">
          <div className="text-[11px] uppercase tracking-wider text-amber-700">Peak concurrency band</div>
          <div className="mt-1 text-2xl font-semibold tabular-nums">{Math.round(state.requiredSeats * 0.92)}–{state.requiredSeats}</div>
          <div className="text-[11px] text-muted-foreground">Tue/Wed/Thu hotspot</div>
        </div>
      </div>

      <p className="mt-4 rounded-lg border border-dashed bg-muted/40 px-3 py-2 text-xs text-foreground">
        Your hybrid pattern requires exactly <b>{state.requiredSeats}</b> seats — saving you <b>{state.savingsPct}%</b> compared to a traditional 1:1 fixed lease setup.
      </p>
    </div>
  );
}