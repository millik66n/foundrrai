"use client";

import * as React from "react";
import { History, Loader2, RotateCcw, X } from "lucide-react";

interface ProjectFile {
  path: string;
  content: string;
}

interface Checkpoint {
  id: string;
  label: string;
  created_at: string;
}

interface CheckpointsPanelProps {
  open: boolean;
  onClose: () => void;
  siteId: string | null;
  onRestore: (files: ProjectFile[]) => void;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "indicə";
  if (m < 60) return `${m} dəq əvvəl`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} saat əvvəl`;
  return `${Math.floor(h / 24)} gün əvvəl`;
}

/** Lists a project's saved versions and restores the file tree to one. */
export function CheckpointsPanel({ open, onClose, siteId, onRestore }: CheckpointsPanelProps) {
  const [items, setItems] = React.useState<Checkpoint[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [restoring, setRestoring] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!open || !siteId) return;
    setLoading(true);
    fetch(`/api/checkpoints?siteId=${siteId}`)
      .then((r) => r.json())
      .then((d: { checkpoints?: Checkpoint[] }) => setItems(d.checkpoints ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [open, siteId]);

  if (!open) return null;

  const restore = async (id: string) => {
    if (!siteId) return;
    setRestoring(id);
    try {
      const res = await fetch("/api/checkpoints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId, checkpointId: id }),
      });
      const data = await res.json();
      if (res.ok && Array.isArray(data.files)) {
        onRestore(data.files as ProjectFile[]);
        onClose();
      }
    } finally {
      setRestoring(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className="relative flex max-h-[80vh] w-full max-w-[440px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_40px_120px_-30px_hsl(240_22%_13%/0.5)]">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="flex items-center gap-2 text-[15px] font-semibold">
            <History className="h-4 w-4 text-primary" />
            Versiyalar
          </span>
          <button
            onClick={onClose}
            aria-label="Bağla"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-3">
          {loading ? (
            <div className="flex items-center justify-center py-10 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : items.length === 0 ? (
            <p className="px-2 py-8 text-center text-[13px] text-muted-foreground">
              Hələ versiya yoxdur.
            </p>
          ) : (
            <ul className="space-y-1.5">
              {items.map((cp, i) => (
                <li
                  key={cp.id}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-2.5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted font-mono text-[11px] font-semibold text-muted-foreground">
                    v{items.length - i}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium">{cp.label || "Versiya"}</p>
                    <p className="text-[11px] text-muted-foreground">{timeAgo(cp.created_at)}</p>
                  </div>
                  <button
                    onClick={() => restore(cp.id)}
                    disabled={restoring !== null}
                    className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-border px-2.5 text-[12px] font-medium transition-colors hover:bg-muted disabled:opacity-50"
                  >
                    {restoring === cp.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <RotateCcw className="h-3.5 w-3.5" />
                    )}
                    Bərpa et
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
