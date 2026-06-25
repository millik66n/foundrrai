# Foundrr — CLAUDE.md

> **Fikrini yaz. Saytın hazır olsun.**
> Azərbaycan üçün AI sayt qurucusu — **Lovable kimi işləsin**, tam yerli.

Master spec. The goal is **full functional parity with Lovable**, in Azerbaijani, with Foundrr's business model. Follow the **Build Order** (§9) one step at a time. Use `DESIGN.md` for all visual styling — do not improvise design.

---

## 1. What Foundrr is

A web app where an Azerbaijani business owner writes one sentence and gets a real, working website — generated as an actual project, edited by chatting, previewed live, and deployed to **their own** Vercel/Netlify with a database in **their own** Supabase. It must *feel* and *function* like Lovable: conversational, agentic, iterative, live.

## 2. What Foundrr does NOT do

- ❌ **No hosting.** The live site runs on the user's own Vercel/Netlify, never ours.
- ❌ **No domains.** We never sell or give out domains. The user buys and connects their own.
- ✅ We generate the project, run the live preview, orchestrate one-click deploy into the user's accounts, and wire the database. The site is fully theirs.

Revenue = credits/subscription for the builder (§7), never hosting.

---

## 3. THE GOAL — function fully like Lovable

Build every behavior below. This is the definition of done for the product:

1. **Prompt-to-app.** One sentence → a complete, real website project generated automatically.
2. **Conversational iterative editing.** The user keeps chatting ("qiymət bölməsi əlavə et", "başlığı dəyiş", "rəngləri tündləşdir") and the app updates. Agentic loop, not one-shot.
3. **Live preview of the running app**, updating after each change, with desktop/mobile toggle. (This is the hard part — §5.)
4. **Streaming / working state.** Show it thinking and building in real time, like Lovable's build log.
5. **Real multi-file project**, not a single HTML file — a Vite + React + Tailwind codebase with proper file structure.
6. **Code view.** A file tree + code panel so the user can see the actual files (read-only is fine for v1).
7. **Checkpoints + rollback.** Every build is a version; the user can restore a previous one (Replit/Lovable pattern).
8. **Visual context.** Attach an image to guide generation. (Element-click-to-edit = later.)
9. **Projects + dashboard.** "Saytlarım", reopen, continue where they left off.
10. **Database integration.** Connect Supabase for forms/bookings/auth in the generated app.
11. **One-click deploy** to the user's own Vercel/Netlify.
12. **Credits** consumed per build/edit message, shown in the sidebar with an upgrade path.

Anything Lovable does that isn't listed (GitHub sync, custom element selection, team workspaces) is post-v1 — get 1–12 working first.

---

## 4. Tech stack

- **Next.js 15** + **React 19** + **TypeScript** + **Tailwind v4** — Foundrr's own app
- **Supabase** — Foundrr's auth + DB (users, projects, credits, checkpoints)
- **Anthropic API** (`claude-sonnet-4-6`) — server-side only, the generation engine
- **WebContainers (StackBlitz SDK)** — run the generated Vite/React project **in the browser** for live preview (§5)
- Generated project = **Vite + React + Tailwind** file set (real codebase)
- User-connected providers (their accounts): **Vercel** or **Netlify** (deploy) + **Supabase** (their app DB)

---

## 5. The hard part, solved — live preview

Functioning like Lovable means previewing a *real running app*, not an HTML string. The honest engineering reality: that needs a sandbox to run the generated project. Don't build container infra from scratch. Use **WebContainers (StackBlitz SDK)**: it runs Node + Vite entirely in the browser, so Foundrr can mount the generated file tree, start the dev server, and show the live app in an iframe — no servers to manage. This is the single most important enabler; wire it early.

Flow: model returns a file manifest → write files into the WebContainer FS → `npm install` + `vite dev` (cached) → preview iframe shows the live app. On each edit, patch the changed files and the dev server hot-reloads. (Server-side sandboxes like e2b are the fallback if browser limits bite.)

---

## 6. Core flow

```
Landing prompt box → type a sentence → press Qur
  → store prompt, route to /signup?intent=build
  → sign up (Google / email) → verify → personalize (ad + light/dark) → 5 credits
  → workspace opens, prompt auto-runs
  → model generates a real Vite/React project (file manifest)
  → files mount in WebContainer → live preview boots
  → user chats edits → files patched → preview hot-reloads   (1 credit per message)
  → checkpoints saved each build
  → "Yayımla" → connect THEIR Vercel/Netlify + THEIR Supabase
  → deploy the project to their account + create tables in their DB
  → their live URL returned
```

---

## 7. Credits

- New account: **5 credits**. Each generate/edit message = 1 credit. Preview/deploy/rollback = free.
- Decrement **server-side** before the model call; refund on failure. Never trust the client.
- Out of credits → paywall ("Pro-ya keç"). Sidebar always shows remaining credits.
- Note: real multi-file generation costs more tokens than a snippet — price credits accordingly.

---

## 8. Data model (Foundrr's own Supabase)

```
profiles    id (=auth uid), email, name, credits int default 5,
            plan text default 'free', theme text default 'dark'
sites       id, owner_id, name, prompt, status text default 'draft',
            deploy_provider text, deploy_url text,
            connected_supabase_ref text, created_at, updated_at
files       id, site_id, path text, content text, updated_at        -- current project tree
checkpoints id, site_id, label, files jsonb, created_at             -- version snapshots
messages    id, site_id, role, content, created_at
connections id, owner_id, provider ('vercel'|'netlify'|'supabase'),
            token_encrypted text, meta jsonb
```
RLS: users touch only their own rows. Provider tokens encrypted, server-side only.

---

## 9. BUILD ORDER — do these one by one

Finish a step and confirm it works before the next.

### Phase A — The Lovable loop (the core)
**Step 1 — Scaffold.** Next.js 15 + TS + Tailwind v4 + Supabase client. Env `ANTHROPIC_API_KEY` (server). Set up the design system per `DESIGN.md` — it's a **light, Lovable-style** theme and **you choose the palette** there (semantic HSL tokens, no hardcoded colors). Add Geist. *Done when:* app runs with the design system in place.

**Step 2 — Landing page.** Full landing per `DESIGN.md` §5. Prompt/chip/"Pulsuz başla" → store prompt → `/signup?intent=build`. *Done when:* matches `DESIGN.md`, routing works.

**Step 3 — Auth + verify + personalize.** Google + email, verify screen, name + light/dark. First login → `profiles` with 5 credits. *Done when:* user signs up and lands logged in.

**Step 4 — WebContainer preview shell.** Integrate StackBlitz WebContainers. Mount a starter Vite+React+Tailwind template, `npm install`, run dev, show live in an iframe with desktop/mobile toggle. *Done when:* a hardcoded template renders live in the workspace.

**Step 5 — Generation → real project.** `/api/generate` (server): decrement a credit → call `claude-sonnet-4-6` with the engine prompt (§10) → return a **file manifest** → write files into the WebContainer → preview boots. Stream build state into the chat panel. *Done when:* a sentence produces a real, running AZ site in the preview.

**Step 6 — Conversational editing.** Follow-up messages patch the project (send current file tree + instruction → model returns changed files) → hot-reload. *Done when:* "başlığı dəyiş" updates the live preview via chat.

**Step 7 — Persistence, checkpoints, code view.** Save `files` + `messages`; snapshot a `checkpoint` per build with rollback. File-tree + code panel (read-only ok). Dashboard "Saytlarım" reopen/continue. Credits in sidebar. *Done when:* projects survive reload, rollback restores a prior version, code is viewable.

### Phase B — Deploy to the user's own accounts
**Step 8 — Connect accounts.** "Yayımla" panel: connect Vercel/Netlify + Supabase via OAuth (fast path: paste token). Store encrypted. *Done when:* tokens saved + validated.

**Step 9 — Deploy the project.** Push the generated project to the user's account and let it build:
- **Vercel:** create a deployment from the project files (`POST https://api.vercel.com/v13/deployments`, framework auto-detected) → returns live URL.
- **Netlify:** create site + deploy build output. Persist `deploy_url`, show Primary URL, open-in-new-tab. *Done when:* Yayımla → live URL on the user's account.

**Step 10 — Database wiring.** In the user's **own** Supabase, create the tables the app needs (`POST https://api.supabase.com/v1/projects/{ref}/database/query`) with RLS; inject URL + **anon** key into the project's env/client. *Done when:* a form/booking on the live site writes to the user's Supabase.

**Step 11 — Domain handoff.** Publish screen explains: buy a domain from any registrar and connect it on your Vercel/Netlify. We never buy or resell domains. *Done when:* BYO-domain steps are clear.

**Step 12 — End-to-end test + polish.** Real prompt → signup → build → chat-edit → rollback → connect accounts → deploy → live URL → form writes to DB. Mobile, reduced-motion, focus states, Azerbaijani errors. *Done when:* a stranger can self-serve sentence → live app, fully like Lovable.

---

## 10. Generation engine (server)

Model: `claude-sonnet-4-6`. Stream.

**Output a file manifest** (so we can mount a real project), e.g. strict JSON:
```
{ "files": [ { "path": "src/App.tsx", "content": "..." },
             { "path": "src/index.css", "content": "..." }, ... ] }
```
System prompt essentials:
```
You are Foundrr's app generator. Build a real Vite + React + TypeScript + Tailwind
website for an Azerbaijani small business.

OUTPUT: only strict JSON — {"files":[{"path","content"},...]} — no markdown, no prose.
Always include a runnable project (package.json, index.html, src/main.tsx, src/App.tsx,
Tailwind config, styles). Components split sensibly.

LANGUAGE: every visible word in Azerbaijani.
CONTENT: realistic local content — Baku addresses, AZN (₼) prices, +994 phones,
Azerbaijani names. Clear hero, real sections for the business type, and a contact/
booking form as the CTA.
DESIGN: modern, clean, responsive, refined, with a cohesive design system that fits
the business; no emoji feature-card rows.
```
For **edits**: send the current file tree (or the relevant files) + the instruction → model returns **only the changed/new files** → patch + hot-reload. Strip any stray fences before writing.

---

## 11. Security
- Anthropic key + all user provider tokens stay **server-side, encrypted**; never in the browser.
- The generated app ships only the Supabase **anon** key with RLS locked appropriately. Never expose service-role or Vercel/Netlify tokens.

## 12. Non-negotiables
- Function fully like Lovable: the conversational, live-preview, iterative loop (§3) is the product.
- Everything user-facing in Azerbaijani.
- No hosting, no domains sold/given — user brings their own (§2).
- Follow `DESIGN.md` exactly (light, Lovable-style; you choose the palette there).
- Credits decremented server-side; free to build/preview.
- Wire WebContainers early — live preview is the spine, not an afterthought.
