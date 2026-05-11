import { useRouterState } from "@tanstack/react-router";
import { LayoutGrid, Users, Layers, Trophy, Settings, Minimize2, Bell, ChevronDown, User } from "lucide-react";
import type { ReactNode } from "react";
import { Logo } from "./Logo";

const NAV = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutGrid },
  { label: "Participants", to: "#", icon: Users },
  { label: "Groups", to: "#", icon: Layers },
  { label: "Results", to: "#", icon: Trophy },
];

const FOOT = [
  { label: "Settings", to: "/profile", icon: Settings },
  { label: "Minimize", to: "#", icon: Minimize2 },
];

export function DashboardShell({ crumb, children }: { crumb: string; children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-[oklch(0.965_0.012_290)]">
      <div className="px-6 pt-5 text-xs text-muted-foreground">{crumb}</div>

      <div className="px-4 pb-10 pt-3">
        <div className="mx-auto flex max-w-[1280px] gap-5">
          {/* Sidebar */}
          <aside className="w-[220px] shrink-0 rounded-2xl bg-white shadow-card flex flex-col">
            <div className="px-5 py-5 border-b border-border/60">
              <Logo />
            </div>
            <nav className="flex-1 p-3 space-y-1">
              {NAV.map((n) => {
                const active = path === n.to;
                return (
                  <a
                    key={n.label}
                    href={n.to}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                      active
                        ? "bg-gradient-primary text-white shadow-glow"
                        : "text-foreground/70 hover:bg-muted"
                    }`}
                  >
                    <n.icon className="h-4 w-4" />
                    {n.label}
                  </a>
                );
              })}
            </nav>
            <div className="p-3 border-t border-border/60 space-y-1">
              {FOOT.map((n) => {
                const active = path === n.to;
                return (
                  <a
                    key={n.label}
                    href={n.to}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                      active ? "bg-accent text-accent-foreground" : "text-foreground/70 hover:bg-muted"
                    }`}
                  >
                    <n.icon className="h-4 w-4" />
                    {n.label}
                  </a>
                );
              })}
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0 space-y-5">
            <div className="flex items-center justify-end gap-3 rounded-2xl bg-white px-5 py-3 shadow-card">
              <button className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted relative">
                <Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-destructive" />
              </button>
              <div className="flex items-center gap-2 pl-2">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-muted">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-semibold">Priya Rastogi</div>
                  <div className="text-[11px] text-muted-foreground">Organizer</div>
                </div>
                <button className="grid h-8 w-8 place-items-center rounded-full hover:bg-muted">
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>

            {children}

            <div className="flex items-center justify-center gap-2 pt-4 text-xs text-muted-foreground">
              <Lock /> Secure. Reliable. Real-time <span className="text-foreground/70">Your event is safe with us.</span>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function Lock() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
    </svg>
  );
}
