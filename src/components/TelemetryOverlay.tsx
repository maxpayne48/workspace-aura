import * as React from "react";

type Point = { t: number; v: number };

function useSeries(min: number, max: number, length = 40, intervalMs = 600) {
  const [series, setSeries] = React.useState<Point[]>(() =>
    Array.from({ length }, (_, i) => ({
      t: i,
      v: min + Math.random() * (max - min),
    })),
  );
  React.useEffect(() => {
    const id = setInterval(() => {
      setSeries((prev) => {
        const next = prev.slice(1);
        const last = prev[prev.length - 1].v;
        // gentle random walk clamped to range
        const drift = (Math.random() - 0.5) * (max - min) * 0.15;
        const v = Math.min(max, Math.max(min, last + drift));
        next.push({ t: prev[prev.length - 1].t + 1, v });
        return next;
      });
    }, intervalMs);
    return () => clearInterval(id);
  }, [min, max, intervalMs]);
  return series;
}

function Sparkline({
  data,
  color,
  min,
  max,
}: {
  data: Point[];
  color: string;
  min: number;
  max: number;
}) {
  const w = 180;
  const h = 44;
  const path = data
    .map((p, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((p.v - min) / (max - min)) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} className="overflow-visible">
      <defs>
        <linearGradient id={`grad-${color.replace(/[^a-z]/gi, "")}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.45" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L${w},${h} L0,${h} Z`} fill={`url(#grad-${color.replace(/[^a-z]/gi, "")})`} />
      <path d={path} stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function TelemetryOverlay() {
  const noise = useSeries(35, 62, 40, 650);
  const ping = useSeries(8, 38, 40, 800);
  const currentNoise = noise[noise.length - 1].v;
  const currentPing = ping[ping.length - 1].v;
  const packet = Math.max(95, 100 - Math.round((currentPing - 8) / 10));

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="glass rounded-xl p-4 text-white">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-emerald-300">
          <span className="flex items-center gap-2">
            <span className="marquee-dot" /> Live Noise Decibel Index
          </span>
          <span className="ticker-pulse text-emerald-400">REC</span>
        </div>
        <div className="mt-1 flex items-end gap-2">
          <span className="text-3xl font-semibold tracking-tight">{currentNoise.toFixed(1)}</span>
          <span className="mb-1 text-xs text-white/60">dB</span>
        </div>
        <Sparkline data={noise} color="#34d399" min={35} max={62} />
        <p className="mt-1 text-[11px] text-white/60">Quiet-zone band 35–48 dB · venue average 51 dB</p>
      </div>
      <div className="glass rounded-xl p-4 text-white">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-indigo-300">
          <span className="flex items-center gap-2">
            <span className="marquee-dot" style={{ background: "#818cf8" }} /> Wi-Fi Latency Matrix
          </span>
          <span className="ticker-pulse text-indigo-300">PING</span>
        </div>
        <div className="mt-1 flex items-end gap-3">
          <span className="text-3xl font-semibold tracking-tight">{currentPing.toFixed(0)}</span>
          <span className="mb-1 text-xs text-white/60">ms</span>
          <span className="mb-1 ml-auto text-xs text-white/60">packet health {packet}%</span>
        </div>
        <Sparkline data={ping} color="#818cf8" min={8} max={38} />
        <p className="mt-1 text-[11px] text-white/60">Backbone 1 Gbps · load 38% · jitter ±1.2ms</p>
      </div>
    </div>
  );
}