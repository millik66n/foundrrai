# Foundrr — DESIGN.md

The design bible for Foundrr's own marketing site and app UI. The visual reference is **Lovable's landing page**. Match how it *feels* — but **you choose the exact colors yourself.** This file gives direction and structure, not a palette. Pairs with `CLAUDE.md` and `FOUNDRR_AGENT.md`.

> Goal: a **light**, bright, premium landing — a stranger lands, sees a glowing hero with a prompt box as the centerpiece, types one sentence, and is pulled into signup → build. Calm, fast, confident. If it looks like a generic AI template, it's wrong.

> **Business note for all copy:** Foundrr does **not** host sites and does **not** sell domains. The user deploys to **their own** Vercel/Netlify and buys/connects **their own** domain. Never write "hosting included" or "free domain." The promise: *the site is fully yours, on your own account.*

---

## 1. The reference — Lovable's landing (match this feel)

- **Light theme.** A bright, near-white / softly warm background — not dark. Generous whitespace, lots of air.
- **Prompt-first hero.** Centered: a short bold headline, one line of subtext, then **a large prompt input box as the hero element** — not a screenshot, not a stat block. Small actions bottom-left (attach, a toggle), a circular send button bottom-right. Below: a row of small example "chips."
- **A soft, luminous gradient bloom** behind the hero — colorful light rising from the center and fading into the light background. This is the signature mood (see §4).
- **Community / templates showcase** under the hero: a grid of project thumbnails in little browser frames. Shows real output, builds trust.
- **Light social proof.**
- **Clean sections** after, one accent used sparingly, crisp typography.
- **Workspace (post-signup):** left sidebar with projects + credits + Upgrade; centered "Time to ship, {name}" with a prompt box; the builder adds a right-side live **Preview** with a **Database** tab and a top-right **Publish** button.

Reproduce this skeleton exactly. The identity that makes it Foundrr (not Lovable) is the Azerbaijani copy, the showcase of real AZ businesses, and the palette **you** design.

---

## 2. Color — you decide (do NOT wait for hex values here)

There are intentionally no colors specified in this file. Build the palette yourself, in the spirit of Lovable's landing:

- **Light base:** a bright near-white or gently warm off-white background; dark, high-contrast text.
- **Hero bloom:** a soft, modern, multi-hue luminous gradient — bright but tasteful, blending a few harmonious colors that fade smoothly into the light background. Pick the hues; make them cohesive and premium, not neon.
- **One accent:** choose a single accent color for buttons, links, focus states, and the step numbers. Use it sparingly.
- Define **every** color, gradient, shadow, and font as **semantic tokens (HSL)** in `index.css` / `tailwind.config.ts`. Never hardcode colors in components (`text-white`, `bg-black`, raw hex). Customize shadcn variants from the tokens.
- Ensure real contrast on the light background (dark text, legible muted tones), visible focus rings, and a coherent system reused everywhere.

Then review your palette: if it reads like the default you'd pick for any site, push it until it feels made for Foundrr. Commit to it and use it consistently across the whole app.

---

## 3. Typography & layout

- **Type:** a clean, characterful geometric sans (Geist is a good default) for display + body; a mono for labels, URLs, and step numbers. Set a clear scale with intentional weights.
  - Hero H1: large, tight tracking, `clamp(38px,6vw,68px)`, line-height ~1.05.
  - Section H2: `clamp(26px,3.4vw,36px)`.
  - Body: 15–16px, line-height 1.5–1.55.
- **Layout:** content max-width ~1120px, 24px side padding, sections ~84px vertical, hero ~150px top.

---

## 4. The signature — the hero bloom

The one bold element; everything else stays quiet. Recreate Lovable's luminous light-bloom behind the centered hero:

- Hero is `position:relative; overflow:hidden`.
- A blurred gradient layer sits behind the content, large, centered, rising from near the top, fading into the light background. Use layered radial gradients in your chosen hues, blurred, at a tasteful opacity.
- Optionally a very faint grid masked to fade out under the hero for subtle depth.
- Reuse a smaller, dimmer bloom behind the final CTA.

Spend the boldness here. Keep the rest disciplined.

---

## 5. Global components

- **Nav** — fixed top, transparent at top; on scroll gains a light blurred background + a hairline bottom border. Left: `Foundrr` wordmark with a small gradient mark. Center links: Necə işləyir · Nümunələr · Qiymət (hidden on small screens). Right: `Daxil ol` (ghost) + `Pulsuz başla` (accent).
- **Buttons** — Accent (filled, hover lift + soft accent shadow), Ghost (quiet), Outline (hairline, hover → accent). Build variants in the design system; shadcn outline variants aren't transparent by default, so define states explicitly.
- **Pill / chip** — light surface, hairline border, radius 999px (chips) / 8px (inline), muted → text on hover. Chips carry a small accent `↑`.
- **Browser-frame card** — showcase: top bar (three dim dots + a mono domain URL), a thumbnail, a footer with name + mono tag. Hover: lift + soft shadow.

---

## 6. Landing page — section by section

All copy in **Azerbaijani**, exactly as below.

### 6.1 Hero
- Eyebrow pill: `• AI ilə saniyələr içində sayt`.
- H1 (two lines): **Fikrini yaz.** / **Saytın hazır olsun.** (line 2 may use the accent or a subtle gradient text).
- Sub: *Azərbaycan üçün AI sayt qurucusu. Bir cümlə yaz — dəqiqələr içində hazır sayt. Öz hesabına yayımla, tam sənin olsun.*
- **Prompt box** (max-width ~660px, the centerpiece): light surface, hairline border, generous radius, soft shadow + a gentle glow in your accent. Rotating placeholder (§7). Bottom row over a hairline: left = `＋ Şəkil əlavə et` + `🌐 Açıq` pills; right = circular accent send `↑`. On `:focus-within`, border → accent and the glow lifts.
- Chips (centered): Diş klinikası · Gül mağazası · Restoran · Rent-a-car · Barbershop — each with accent `↑`.
- Social proof: **500+** Azərbaycan biznesi Foundrr ilə qurur.

### 6.2 Showcase — "Foundrr ilə qurulanlar"
Subhead: *Bir cümlədən başlayan saytlar*. A 3-col grid (2 / 1 on smaller) of browser-frame cards: Dental Gülüm · Gül Evi · Sahil Rent-a-Car · Laləzar Restoran · Usta Barbershop · Ayla Store. URLs shown are the businesses' **own** connected domains. Replace with real generated sites in production.

### 6.3 How it works — "Üç addımda hazır sayt"
Subhead: *Texniki bilik tələb olunmur*. Three cards, mono step numbers `01/02/03` in the accent:
1. **Yaz** — Biznesini bir cümlə ilə təsvir et. Azərbaycan dilində, öz sözlərinlə.
2. **Qur** — Foundrr saniyələr içində tam hazır saytı yaradır. İstədiyini söylə, dəyişsin.
3. **Yayımla** — Bir kliklə öz Vercel hesabına yayımla. Domenini özün al və qoş — sayt tamamilə sənin.

### 6.4 Why — quiet 4-up row (NO emoji cards)
A bordered container split into 4 cells, bold label + one muted line:
- **Tam Azərbaycan dilində** — Mətn də, dizayn da yerli — tərcümə hiss olunmur.
- **Öz hesabına yayım** — Vercel / Netlify-ə bir kliklə. Sayt tamamilə sənin, kilid yoxdur.
- **Forma & ödəniş bazası** — Sifariş və rezervasiyalar Supabase-ə düşür.
- **Anında dəyişiklik** — Bir cümlə yaz — sayt dərhal yenilənir.

### 6.5 Pricing — "Sadə qiymət"
Subhead: *Qurmaq pulsuzdur — krediti bitəndə yenilə*. Three plans, **middle ("Pro") highlighted** with an accent border + "Ən populyar" badge:
- **Pulsuz — 0 ₼** · 5 qurma krediti · Limitsiz önizləmə · Anında redaktə · Bütün şablonlar → outline btn `Başla`.
- **Pro — 19 ₼/ay** · 100 kredit / ay · Öz Vercel/Netlify hesabına yayım · Brendsiz · Forma bazası (Supabase) → accent btn `Pro-ya keç`.
- **Biznes — 49 ₼/ay** · Limitsiz kredit · Ödəniş inteqrasiyası · Komanda · Prioritet dəstək → outline btn `Əlaqə`.

Small line under the grid: *Foundrr hostinq və ya domen satmır — saytı öz hesabına yayımlayır, domenini özün alırsan.* (Tune the numbers as you see fit.)

### 6.6 Final CTA
Centered, a dimmer bloom behind, top hairline. H2: **Bu gün saytını qur**. Sub: *Bir cümlə yaz, qalanını Foundrr etsin.* Button: `Pulsuz başla →`.

### 6.7 Footer
Left: wordmark + *Azərbaycan üçün AI sayt qurucusu. Fikrindən hazır sayta.* Columns (mono uppercase headings): **Məhsul** (Necə işləyir, Nümunələr, Qiymət) · **Şirkət** (Haqqında, Əlaqə, Bloq) · **Hüquqi** (Şərtlər, Məxfilik). Bottom bar: `© 2026 Foundrr` · `Bakı, Azərbaycan`.

---

## 7. Motion (deliberate, minimal)

- **Rotating placeholder** in the prompt box (fade ~220ms): "Bakıda diş klinikası üçün sayt…" → "Gül mağazası üçün sayt…" → "Rent-a-car şirkəti üçün sayt…" → "Restoran üçün sayt…" → "Barbershop üçün sayt…", every ~2.6s.
- **Scroll reveal**: fade + rise ~14px on enter (once).
- **Nav blur** on scroll, **hover lifts** on buttons/cards/chips.
- Respect `prefers-reduced-motion`. No confetti, no bounce, no parallax. Restraint.

---

## 8. App / builder UI

Reuse the same system. **Workspace:** left sidebar (projects, credits remaining, "Pro-ya keç"); center "Vaxtdır, {ad}" with the prompt box; right live **Preview** (iframe) with a device toggle and a **Baza** (Database) tab; top-right **Yayımla**. Preview chrome shows neutral `Önizləmə` while building (Foundrr isn't hosting it); after deploy it shows the user's **own** domain. Same bloom (dimmer), same prompt box throughout.

---

## 9. Build with taste (instead of a banned-color list)

- Light theme, real contrast, one accent used sparingly.
- No emoji feature-card rows. No big-number stat hero as the main element. No glassmorphism-everywhere or shadow soup.
- Don't reach for the most obvious default; make the palette and bloom feel chosen for Foundrr. Execute the chosen system precisely and consistently — that's where it reads as premium.
