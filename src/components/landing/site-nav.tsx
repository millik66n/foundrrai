"use client";

import * as React from "react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProfileMenu } from "@/components/account/profile-menu";

const NAV_LINKS = [
  { href: "/#how", label: "Necə işləyir" },
  { href: "/#showcase", label: "Nümunələr" },
  { href: "/#pricing", label: "Qiymət" },
  { href: "/#showcase", label: "Kəşf et" },
];

export interface NavUser {
  name: string;
  email: string;
  plan: string;
  credits: number;
}

export function SiteNav({ user }: { user?: NavUser | null }) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[1160px] items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <span className="brand-mark h-6 w-6 rounded-[7px] shadow-[0_4px_14px_-4px_hsl(var(--grad-pink)/0.7)]" />
          <span className="text-[17px]">Foundrr</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <ProfileMenu
              name={user.name}
              email={user.email}
              plan={user.plan}
              credits={user.credits}
            />
          ) : (
            <>
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "hidden sm:inline-flex",
                )}
              >
                Daxil ol
              </Link>
              <Link
                href="/signup?intent=build"
                className={buttonVariants({ variant: "accent", size: "sm" })}
              >
                Başla
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
