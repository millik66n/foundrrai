"use client";

import * as React from "react";
import Link from "next/link";
import { Loader2, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1S8.7 5.9 12 5.9c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.3 14.6 2.4 12 2.4 6.9 2.4 2.8 6.5 2.8 11.6S6.9 20.8 12 20.8c5.3 0 8.8-3.7 8.8-9 0-.6-.06-1-.15-1.6H12z"
      />
    </svg>
  );
}

function GithubGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.36 9.36 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

type Loading = null | "google" | "github" | "email";

interface AuthFormProps {
  mode: "login" | "signup";
  next?: string;
}

export function AuthForm({ mode, next = "/workspace" }: AuthFormProps) {
  const isSignup = mode === "signup";
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState<Loading>(null);
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const callbackUrl = () =>
    `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;

  const oauth = async (provider: "google" | "github") => {
    setError(null);
    setLoading(provider);
    const { error } = await createClient().auth.signInWithOAuth({
      provider,
      options: { redirectTo: callbackUrl() },
    });
    if (error) {
      setError(
        "Daxil olmaq alınmadı — bu provayder hələ konfiqurasiya olunmayıb ola bilər.",
      );
      setLoading(null);
    }
  };

  const sendMagicLink = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    setError(null);
    setLoading("email");
    const { error } = await createClient().auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: callbackUrl() },
    });
    setLoading(null);
    if (error) {
      setError("E-poçt göndərilə bilmədi. Bir azdan yenidən cəhd et.");
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <div className="w-full max-w-[400px] text-center">
        <span className="brand-mark mx-auto block h-7 w-7 rounded-lg" />
        <h1 className="mt-8 text-[24px] font-semibold tracking-tight">
          E-poçtunu yoxla
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">{email}</span> ünvanına
          giriş linki göndərdik. Linkə klik et — və davam et.
        </p>
        <button
          onClick={() => {
            setSent(false);
            setEmail("");
          }}
          className="mt-6 text-[14px] font-medium text-foreground underline-offset-4 hover:underline"
        >
          Başqa e-poçt işlət
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[400px]">
      <Link
        href="/"
        className="flex items-center justify-center gap-2 font-semibold tracking-tight"
      >
        <span className="brand-mark h-7 w-7 rounded-lg shadow-[0_6px_18px_-6px_hsl(var(--grad-pink)/0.7)]" />
        <span className="text-lg">Foundrr</span>
      </Link>

      <h1 className="mt-8 text-center text-[26px] font-semibold tracking-tight">
        {isSignup ? "Foundrr-a xoş gəlmisən" : "Yenidən xoş gəlmisən"}
      </h1>
      <p className="mt-2 text-center text-[15px] leading-relaxed text-muted-foreground">
        {isSignup
          ? "Hesab yarat və 100 pulsuz kredit qazan."
          : "Davam etmək üçün hesabına daxil ol."}
      </p>

      {error ? (
        <p className="mt-5 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-2.5 text-center text-[13px] text-destructive">
          {error}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-2.5">
        <Button
          variant="accent"
          size="lg"
          className="w-full"
          disabled={loading !== null}
          onClick={() => oauth("google")}
        >
          {loading === "google" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <GoogleGlyph />
          )}
          Google ilə davam et
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full"
          disabled={loading !== null}
          onClick={() => oauth("github")}
        >
          {loading === "github" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <GithubGlyph />
          )}
          GitHub ilə davam et
        </Button>
      </div>

      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-[12px] text-muted-foreground">və ya</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <form className="flex flex-col gap-2.5" onSubmit={sendMagicLink}>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="ad@nümunə.az"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-12 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <Button
          variant="primary"
          size="lg"
          type="submit"
          className="w-full"
          disabled={loading !== null}
        >
          {loading === "email" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : null}
          E-poçt ilə davam et
        </Button>
      </form>

      <p className="mt-6 text-center text-[14px] text-muted-foreground">
        {isSignup ? "Artıq hesabın var? " : "Hesabın yoxdur? "}
        <Link
          href={isSignup ? "/login" : "/signup"}
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          {isSignup ? "Daxil ol" : "Qeydiyyatdan keç"}
        </Link>
      </p>

      {isSignup ? (
        <p className="mt-5 text-center text-[12px] leading-relaxed text-muted-foreground">
          Davam etməklə{" "}
          <Link href="#" className="underline underline-offset-2 hover:text-foreground">
            Şərtlər
          </Link>{" "}
          və{" "}
          <Link href="#" className="underline underline-offset-2 hover:text-foreground">
            Məxfilik Siyasəti
          </Link>{" "}
          ilə razılaşırsan.
        </p>
      ) : null}
    </div>
  );
}
