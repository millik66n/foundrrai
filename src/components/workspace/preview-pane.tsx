"use client";

import * as React from "react";
import {
  Code2,
  Eye,
  Monitor,
  MousePointerClick,
  Rocket,
  Smartphone,
  Type,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { Phase } from "@/lib/workspace/build-session";
import { BuildingCanvas } from "@/components/workspace/building-canvas";
import { CodeView } from "@/components/workspace/code-view";
import { WebContainerPreview } from "@/components/workspace/webcontainer-preview";

interface ProjectFile {
  path: string;
  content: string;
}

type Tab = "preview" | "code";
type Device = "desktop" | "mobile";

interface PreviewPaneProps {
  phase: Phase;
  files: ProjectFile[];
  siteName: string;
  siteId: string | null;
  activeFile: string | null;
  onSelectFile: (path: string) => void;
  onBuildError?: (error: string) => void;
  onPublish?: () => void;
  onElementPick?: (info: { text: string; tag: string }) => void;
  /** Live edit of a file from the in-browser code editor. */
  onChangeFile?: (path: string, content: string) => void;
  /** Inline visual text edit — replace an exact piece of copy across the project. */
  onTextReplace?: (oldText: string, newText: string) => void;
}

export function PreviewPane({
  phase,
  files,
  siteName,
  siteId,
  activeFile,
  onSelectFile,
  onBuildError,
  onPublish,
  onElementPick,
  onChangeFile,
  onTextReplace,
}: PreviewPaneProps) {
  const [tab, setTab] = React.useState<Tab>("preview");
  const [device, setDevice] = React.useState<Device>("desktop");
  const [selecting, setSelecting] = React.useState(false);
  const [editingText, setEditingText] = React.useState(false);
  const built = phase === "built" && files.length > 0;
  const buildKey = siteId ?? "draft";

  // "Seç" and "Mətn" modes are mutually exclusive — turning one on disables the other.
  const toggleSelecting = () =>
    setSelecting((s) => {
      if (!s) setEditingText(false);
      return !s;
    });
  const toggleEditingText = () =>
    setEditingText((t) => {
      if (!t) setSelecting(false);
      return !t;
    });

  return (
    <section className="relative flex min-w-0 flex-1 flex-col bg-muted/30">
      {/* Top bar */}
      <div className="flex h-14 items-center gap-3 border-b border-border bg-background/60 px-4 backdrop-blur">
        {built ? (
          <div className="flex items-center rounded-xl border border-border bg-card p-0.5">
            <TabButton active={tab === "preview"} onClick={() => setTab("preview")} icon={Eye}>
              Önizləmə
            </TabButton>
            <TabButton active={tab === "code"} onClick={() => setTab("code")} icon={Code2}>
              Kod
            </TabButton>
          </div>
        ) : (
          <span className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-foreground/15" />
            <span className="h-3 w-3 rounded-full bg-foreground/15" />
            <span className="h-3 w-3 rounded-full bg-foreground/15" />
          </span>
        )}

        <span className="mx-auto truncate rounded-full bg-card px-4 py-1 font-mono text-[12px] text-muted-foreground">
          {built ? siteName : "önizləmə"}
        </span>

        {built ? (
          <div className="flex items-center gap-2">
            {tab === "preview" ? (
              <>
                <button
                  onClick={toggleEditingText}
                  title="Mətnə toxunub birbaşa yaz"
                  className={cn(
                    "inline-flex h-9 items-center gap-1.5 rounded-xl border px-3 text-[13px] font-medium transition-colors",
                    editingText
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Type className="h-3.5 w-3.5" />
                  Mətn
                </button>
                <button
                  onClick={toggleSelecting}
                  title="Elementi seçib dəyiş"
                  className={cn(
                    "inline-flex h-9 items-center gap-1.5 rounded-xl border px-3 text-[13px] font-medium transition-colors",
                    selecting
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-muted-foreground hover:text-foreground",
                  )}
                >
                  <MousePointerClick className="h-3.5 w-3.5" />
                  Seç
                </button>
                <div className="flex items-center rounded-xl border border-border bg-card p-0.5">
                  <IconToggle
                    active={device === "desktop"}
                    onClick={() => setDevice("desktop")}
                    label="Masaüstü"
                    icon={Monitor}
                  />
                  <IconToggle
                    active={device === "mobile"}
                    onClick={() => setDevice("mobile")}
                    label="Mobil"
                    icon={Smartphone}
                  />
                </div>
              </>
            ) : null}
            <button
              onClick={onPublish}
              className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-primary px-3.5 text-[13px] font-semibold text-primary-foreground shadow-[0_10px_24px_-12px_hsl(var(--primary)/0.7)] transition-all hover:-translate-y-0.5 hover:bg-[hsl(var(--primary-hover))]"
            >
              <Rocket className="h-3.5 w-3.5" />
              Yayımla
            </button>
          </div>
        ) : (
          <span className="rounded-md bg-card px-2 py-1 font-mono text-[10px] text-muted-foreground">
            qurulur
          </span>
        )}
      </div>

      {/* Body */}
      <div className="min-h-0 flex-1">
        {!built ? (
          <BuildingCanvas phase={phase} />
        ) : (
          <div className="relative h-full">
            {/* Preview stays mounted so the dev server keeps running across tab switches. */}
            <div className={cn("absolute inset-0", tab === "preview" ? "z-10" : "invisible")}>
              <WebContainerPreview
                files={files}
                device={device}
                buildKey={buildKey}
                onBuildError={onBuildError}
                selecting={selecting}
                onPick={(info) => {
                  setSelecting(false);
                  onElementPick?.(info);
                }}
                editingText={editingText}
                onTextEdit={({ from, to }) => onTextReplace?.(from, to)}
              />
            </div>
            <div className={cn("absolute inset-0", tab === "code" ? "z-10" : "hidden")}>
              <CodeView
                files={files}
                activeFile={activeFile}
                onSelectFile={onSelectFile}
                siteName={siteName}
                onChangeFile={onChangeFile}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors",
        active
          ? "bg-foreground text-background"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {children}
    </button>
  );
}

function IconToggle({
  active,
  onClick,
  label,
  icon: Icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
        active ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
      )}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
