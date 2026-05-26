import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TelemetryOverlay } from "./TelemetryOverlay";
import type { Workspace } from "@/data/workspaces";
import { Play, Pause, X } from "lucide-react";

// Royalty-free office/coworking ambience clips (public CDN, MP4)
const SAMPLE_CLIPS = [
  "https://cdn.coverr.co/videos/coverr-employees-working-at-the-office-7233/1080p.mp4",
  "https://cdn.coverr.co/videos/coverr-modern-office-1567/1080p.mp4",
  "https://cdn.coverr.co/videos/coverr-a-coworking-space-7037/1080p.mp4",
];

export function VideoTourModal({
  workspace,
  open,
  onOpenChange,
}: {
  workspace: Workspace | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = React.useState(true);

  React.useEffect(() => {
    if (!open) setPlaying(true);
  }, [open]);

  const clip = React.useMemo(() => {
    if (!workspace) return SAMPLE_CLIPS[0];
    const idx = Math.abs(workspace.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0)) % SAMPLE_CLIPS.length;
    return SAMPLE_CLIPS[idx];
  }, [workspace]);

  if (!workspace) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl border-0 bg-[oklch(0.14_0.02_264)] p-0 text-white sm:rounded-2xl">
        <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-black">
          <video
            ref={videoRef}
            src={clip}
            poster={workspace.videoPoster}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />

          <div className="absolute left-5 top-5 flex items-center gap-2">
            <span className="marquee-dot" />
            <span className="rounded-full bg-black/40 px-3 py-1 text-[11px] uppercase tracking-widest text-white/90 backdrop-blur">
              Live Walkthrough · {workspace.operator}
            </span>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white/90 backdrop-blur transition hover:bg-black/70"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <button
            onClick={() => {
              const v = videoRef.current;
              if (!v) return;
              if (v.paused) {
                v.play();
                setPlaying(true);
              } else {
                v.pause();
                setPlaying(false);
              }
            }}
            className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-slate-900 shadow-lg backdrop-blur transition hover:bg-white"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {playing ? "Pause Tour" : "Resume Tour"}
          </button>

          <div className="absolute bottom-5 right-5 w-[min(420px,55%)]">
            <TelemetryOverlay />
          </div>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-3">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-white/50">Location</div>
            <div className="mt-1 text-base font-medium">{workspace.location}</div>
            <div className="text-xs text-white/60">{workspace.city} · {workspace.micromarket}</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-widest text-white/50">Network</div>
            <div className="mt-1 text-base font-medium">{workspace.wifiMbps} Mbps backbone</div>
            <div className="text-xs text-white/60">Dedicated enterprise SLA · failover ISP</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-widest text-white/50">Quiet Zone</div>
            <div className="mt-1 text-base font-medium">{workspace.quietZonePct}% acoustic compliance</div>
            <div className="text-xs text-white/60">Booths, pods & focus floors mapped</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}