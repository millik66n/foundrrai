/**
 * WebContainer singleton + helpers.
 *
 * A WebContainer can only be booted once per browser tab, so the boot promise
 * and the running dev process are kept at module scope and reused across
 * component remounts. This runs the generated Vite project entirely in-browser
 * for the live preview (CLAUDE.md §5).
 */

import type { WebContainer, FileSystemTree, WebContainerProcess } from "@webcontainer/api";

let bootPromise: Promise<WebContainer> | null = null;
let devProcess: WebContainerProcess | null = null;

/** Boot (or reuse) the single WebContainer instance for this tab. */
export async function bootContainer(): Promise<WebContainer> {
  if (!bootPromise) {
    bootPromise = import("@webcontainer/api").then(({ WebContainer }) =>
      WebContainer.boot({ coep: "credentialless", workdirName: "foundrr" }),
    );
  }
  return bootPromise;
}

export function setDevProcess(process: WebContainerProcess): void {
  devProcess = process;
}

/** Kill any previously running dev server (e.g. before mounting a new project). */
export function killDevProcess(): void {
  try {
    devProcess?.kill();
  } catch {
    /* already gone */
  }
  devProcess = null;
}

/** True only when the page is cross-origin isolated (headers in next.config). */
export function isIsolated(): boolean {
  return typeof window !== "undefined" && window.crossOriginIsolated === true;
}

/** Convert a flat [{path, content}] list into WebContainer's nested FileSystemTree. */
export function toFileSystemTree(
  files: ReadonlyArray<{ path: string; content: string }>,
): FileSystemTree {
  const tree: FileSystemTree = {};
  for (const file of files) {
    const parts = file.path.split("/").filter(Boolean);
    if (parts.length === 0) continue;
    let node: FileSystemTree = tree;
    for (let i = 0; i < parts.length - 1; i += 1) {
      const dir = parts[i];
      const existing = node[dir];
      if (!existing || !("directory" in existing)) {
        node[dir] = { directory: {} };
      }
      node = (node[dir] as { directory: FileSystemTree }).directory;
    }
    node[parts[parts.length - 1]] = { file: { contents: file.content } };
  }
  return tree;
}
