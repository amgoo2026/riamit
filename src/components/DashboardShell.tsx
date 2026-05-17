import { useRouterState, Link } from "@tanstack/react-router";
import { LayoutGrid, Users, Layers, Trophy, Settings, Minimize2, Maximize2, Bell, ChevronDown, User } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Logo } from "./Logo";
import { Crumbs } from "./Crumbs";

const CRUMB_LINKS: Record<string, string> = {
  "Organizer Dashboard": "/dashboard",
  Dashboard: "/dashboard",
  Participants: "/participants",
  Groups: "/groups",
  Profile: "/profile",
  "Edit Profile": "/profile",
};

const NAV = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutGrid },
  { label: "Participants", to: "/participants", icon: Users },
  { label: "Groups", to: "/groups", icon: Layers },
  { label: "Results", to: "#", icon: Trophy },
] as const;

const NOTIFS = [
  { t: "Arjun Mehta joined Group 4", time: "2 min ago", dot: "bg-emerald-500" },
  { t: "Group 9 is now complete", time: "8 min ago", dot: "bg-primary" },
  { t: "Event starts in 5 minutes", time: "10 min ago", dot: "bg-orange-500" },
  { t: "Sneha Kapoor joined Group 4", time: "12 min ago", dot: "bg-emerald-500" },
];

export function DashboardShell({ crumb, children }: { crumb: string; children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [collapsed, setCollapsed] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const popRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("zv:collapsed") : null;
    if (saved === "1") setCollapsed(true);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("zv:collapsed", collapsed ? "1" : "0");
  }, [collapsed]);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (popRef.current && !popRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const sideW = collapsed ? "w-[72px]" : "w-[220px]";

  const NavItem = ({ n, active }: { n: typeof NAV[number]; active: boolean }) => {
    const cls = `flex items-center ${collapsed ? "justify-center" : "gap-3"} rounded-xl ${collapsed ? "px-2" : "px-3"} py-2.5 text-sm font-medium transition-colors ${
      active ? "bg-gradient-primary text-white shadow-glow" : "text-foreground/70 hover:bg-muted"
    }`;
    const inner = (
      <>
        <n.icon className="h-4 w-4 shrink-0" />
        {!collapsed && <span>{n.label}</span>}
      </>
    );
    return n.to === "#" ? (
      <a href="#" title={collapsed ? n.label : undefined} className={cls}>{inner}</a>
    ) : (
      <Link to={n.to} title={collapsed ? n.label : undefined} className={cls}>{inner}</Link>
    );
  };

  return (
    <div className="min-h-screen bg-[oklch(0.965_0.012_290)]">
      <div className="px-6 pt-5">
        <Crumbs
          items={crumb.split("/").map((s, i, arr) => {
            const label = s.trim();
            const to = CRUMB_LINKS[label];
            return { label, to: i === arr.length - 1 ? undefined : to };
          })}
        />
      </div>

      <div className="px-4 pb-10 pt-3">
        <div className="mx-auto flex max-w-[1280px] gap-5">
          {/* Sidebar */}
          <aside className={`${sideW} shrink-0 rounded-2xl bg-white shadow-card flex flex-col transition-[width] duration-200`}>
            <div className={`${collapsed ? "px-3 py-5 flex justify-center" : "px-5 py-5"} border-b border-border/60`}>
              {collapsed ? (
                <div className="h-10 w-10 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none">
                    <path d="M5 6h12L7 18h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ) : <Logo />}
            </div>
            <nav className="flex-1 p-3 space-y-1">
              {NAV.map((n) => <NavItem key={n.label} n={n} active={path === n.to} />)}
            </nav>
            <div className="p-3 border-t border-border/60 space-y-1">
              <Link
                to="/profile"
                title={collapsed ? "Settings" : undefined}
                className={`flex items-center ${collapsed ? "justify-center px-2" : "gap-3 px-3"} rounded-xl py-2.5 text-sm font-medium transition-colors ${
                  path === "/profile" ? "bg-accent text-accent-foreground" : "text-foreground/70 hover:bg-muted"
                }`}
              >
                <Settings className="h-4 w-4 shrink-0" />
                {!collapsed && "Settings"}
              </Link>
              <button
                onClick={() => setCollapsed((c) => !c)}
                title={collapsed ? "Expand" : "Minimize"}
                className={`w-full flex items-center ${collapsed ? "justify-center px-2" : "gap-3 px-3"} rounded-xl py-2.5 text-sm font-medium text-foreground/70 hover:bg-muted`}
              >
                {collapsed ? <Maximize2 className="h-4 w-4 shrink-0" /> : <Minimize2 className="h-4 w-4 shrink-0" />}
                {!collapsed && (collapsed ? "Expand" : "Minimize")}
              </button>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0 space-y-5">
            <div className="flex items-center justify-end gap-3 rounded-2xl bg-white px-5 py-3 shadow-card">
              <div ref={popRef} className="relative">
                <button
                  onClick={() => setNotifOpen((v) => !v)}
                  className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted relative"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-destructive" />
                </button>
                {notifOpen && (
                  <div className="absolute right-0 top-12 z-40 w-80 rounded-2xl bg-white shadow-card border border-border overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
                      <div className="font-semibold text-sm">Notifications</div>
                      <button className="text-xs text-primary font-medium">Mark all read</button>
                    </div>
                    <ul className="max-h-80 overflow-y-auto">
                      {NOTIFS.map((n, i) => (
                        <li key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-muted/40">
                          <span className={`mt-1.5 h-2 w-2 rounded-full ${n.dot}`} />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm">{n.t}</div>
                            <div className="text-xs text-muted-foreground">{n.time}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <a href="#" className="block text-center text-xs text-primary font-medium py-2.5 border-t border-border/60">View all</a>
                  </div>
                )}
              </div>
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
