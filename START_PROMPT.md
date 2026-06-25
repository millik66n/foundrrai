# START_PROMPT — paste this as your first message to Claude Code

---

**Goal:** Build **Foundrr** — an AI website builder for the Azerbaijani market that **functions fully like Lovable**: a user writes one sentence in Azerbaijani and gets a real, working website they can edit by chatting, preview live, and deploy to their own account.

Before writing any code, read these three files in the repo and treat them as the source of truth:

- **`CLAUDE.md`** — the master spec: product model, the 12-point Lovable parity loop, the data model, and the step-by-step **Build Order**. Follow it exactly, one step at a time.
- **`DESIGN.md`** — the look: a **light, Lovable-style** landing and app. It deliberately specifies **no colors** — you design the palette yourself in Lovable's spirit (bright background, a soft multi-hue hero bloom, one accent) and commit to it as semantic HSL tokens.
- **`FOUNDRR_AGENT.md`** — the system prompt for the AI that runs *inside* Foundrr's builder. This is the product's runtime brain, not for you to follow as build instructions — you're building the app that uses it.

**Hard constraints (from the files, restated):**
- Functions like Lovable: conversational iterative editing, live preview of a real running app (use **WebContainers / StackBlitz SDK**), code view, checkpoints/rollback, deploy.
- Generated sites are real **Vite + React + Tailwind + TypeScript** projects, in **Azerbaijani**.
- **No hosting, no domains.** Foundrr deploys to the user's **own** Vercel/Netlify and wires their **own** Supabase. The user buys/connects their own domain. Never promise hosting or a free domain.
- Foundrr's own app stack: **Next.js 15 + React 19 + TypeScript + Tailwind v4 + Supabase**.
- Credits decremented server-side; Anthropic key and all user tokens stay server-side.

**What to do now — start here and STOP for my review:**
1. Do **Step 1 (Scaffold)** from the `CLAUDE.md` Build Order: set up the project and the design system per `DESIGN.md` (choose your palette).
2. Do **Step 2 (Landing page)**: build the full landing page per `DESIGN.md` §6 — light Lovable-style, prompt-box hero with the bloom, showcase, how-it-works, why, pricing, CTA, footer, all in Azerbaijani.
3. Then **stop and show me the landing page** so I can approve the design system before you build the rest.

Begin by briefly stating the palette and design direction you'll use (no code yet), then build Steps 1–2. Keep explanations short.
