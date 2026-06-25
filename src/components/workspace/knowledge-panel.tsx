"use client";

import * as React from "react";
import { BookOpen, Loader2, X } from "lucide-react";

interface KnowledgePanelProps {
  open: boolean;
  onClose: () => void;
  siteId: string | null;
  value: string;
  onSaved: (knowledge: string) => void;
}

/** Per-project persistent instructions, applied to every build/edit/chat. */
export function KnowledgePanel({ open, onClose, siteId, value, onSaved }: KnowledgePanelProps) {
  const [text, setText] = React.useState(value);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    if (open) setText(value);
  }, [open, value]);

  if (!open) return null;

  const save = async () => {
    if (!siteId) return;
    setSaving(true);
    try {
      const res = await fetch("/api/sites/knowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId, knowledge: text }),
      });
      const data = await res.json();
      if (res.ok) {
        onSaved((data.knowledge as string) ?? text);
        onClose();
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className="relative w-full max-w-[480px] overflow-hidden rounded-2xl border border-border bg-card shadow-[0_40px_120px_-30px_hsl(240_22%_13%/0.5)]">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="flex items-center gap-2 text-[15px] font-semibold">
            <BookOpen className="h-4 w-4 text-primary" />
            Layihə biliyi
          </span>
          <button
            onClick={onClose}
            aria-label="Bağla"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>
        <div className="p-5">
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            Bu qaydalar hər qurma, redaktə və söhbətdə avtomatik tətbiq olunur — brend
            rəngi, ton, dil və məzmun qaydaları.
          </p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={7}
            maxLength={4000}
            placeholder="Məs: Brend rəngi tünd-yaşıl. Rəsmi ton. Qiymətlər həmişə ₼ ilə. Başlıqda “Bakı” vurğulansın."
            className="mt-3 w-full resize-none rounded-xl border border-border bg-background px-3 py-2.5 text-[13px] leading-relaxed outline-none focus:border-[hsl(var(--ring)/0.5)]"
          />
          <button
            onClick={save}
            disabled={saving || !siteId}
            className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-foreground text-[14px] font-medium text-background transition-colors hover:bg-foreground/90 disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Yadda saxla
          </button>
        </div>
      </div>
    </div>
  );
}
