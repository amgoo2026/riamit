import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  HelpCircle, Clock, Star, Lightbulb, Hand, Search, Timer,
  Users, Gamepad2, Info, LogOut, User as UserIcon,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { Crumbs } from "@/components/Crumbs";
import mystery from "@/assets/mystery.jpg";

export const Route = createFileRoute("/lobby")({
  head: () => ({ meta: [{ title: "Mystery Quest — Lobby" }] }),
  component: LobbyPage,
});

const PARTICIPANTS = [
  { initials: "M3", name: "Mark32 (You)", grad: "from-pink-500 to-orange-400" },
  { initials: "PM", name: "Priya32", grad: "from-cyan-400 to-blue-500" },
  { initials: "KS", name: "Kartar45", grad: "from-blue-500 to-indigo-600" },
  { initials: "VM", name: "Vikram36", grad: "from-violet-500 to-purple-600" },
];

function LobbyPage() {
  const nav = useNavigate();
  const [secs, setSecs] = useState(14 * 60 + 45);
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => { if (secs === 0) nav({ to: "/game" }); }, [secs, nav]);

  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");

  return (
    <div className="min-h-screen bg-purple-900 text-white p-4 md:p-6">
      {/* Top bar */}
      <header className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="font-semibold">Mystery Quest</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 grid place-items-center text-xs font-bold">SK</div>
          <span className="text-sm">Sneha Kapoor</span>
        </div>
      </header>

      <div className="mt-4">
        <Crumbs
          tone="dark"
          items={[
            { label: "Home", to: "/" },
            { label: "Join", to: "/join" },
            { label: "Lobby" },
          ]}
        />
      </div>

      <main className="mt-4 grid gap-5 lg:grid-cols-[1fr_2fr_1.1fr]">
        {/* Logo card */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-8 grid place-items-center min-h-[360px]">
          <div className="text-center">
            <div className="mx-auto h-44 w-44 rounded-3xl bg-gradient-to-br from-purple-600 via-fuchsia-600 to-purple-900 grid place-items-center shadow-glow ring-2 ring-white/20">
              <Search className="h-20 w-20 text-white" />
            </div>
            <div className="mt-5 text-3xl font-black tracking-wide">MYSTERY</div>
            <div className="text-xl font-semibold text-purple-300 -mt-1">QUEST</div>
          </div>
        </div>

        {/* Case banner */}
        <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 relative min-h-[360px]">
          <img src={mystery} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-950/90 via-purple-950/40 to-transparent" />
          <div className="relative p-6">
            <div className="inline-block rounded-xl border-2 border-cyan-400/60 bg-purple-900/40 backdrop-blur px-4 py-3">
              <div className="text-lg font-bold">Case: The Bungalow Secret</div>
              <div className="text-xs text-white/80">Uncover the truth. Catch the culprit</div>
            </div>
          </div>
        </div>

        {/* Rules */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6">
          <h3 className="text-lg font-bold mb-4">Rules</h3>
          <ul className="space-y-3 text-sm">
            <Rule icon={HelpCircle}>You have 5 questions to find the truth.</Rule>
            <Rule icon={Clock}>Each participant gets 2 minutes to answer.</Rule>
            <Rule icon={Star}>No answer in time will cost <span className="text-orange-400 font-semibold">-10 points</span>.</Rule>
            <Rule icon={Lightbulb}>Clue Rooms opens after 10 minutes</Rule>
            <Rule icon={Hand}>Use Lie Detector round wisely to uncover suspicious answers. (7 minutes round)</Rule>
            <Rule icon={Search}>Find the culprit before time runs out!</Rule>
            <Rule icon={Timer}>Game Duration: 25 Minutes</Rule>
          </ul>
        </div>
      </main>

      <section className="mt-5 grid gap-5 lg:grid-cols-2">
        {/* Group & Status */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-purple-500/30 grid place-items-center">
              <Users className="h-5 w-5 text-purple-300" />
            </div>
            <h3 className="text-lg font-bold">Your Group & Status</h3>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-4 text-sm">
            <Stat label="Group Capacity" value="5" />
            <Stat label="Joined" value="4" />
            <Stat label="Remaining" value="1" />
          </div>
          <div className="mt-6 flex items-end gap-5 flex-wrap">
            {PARTICIPANTS.map((p) => (
              <div key={p.name} className="text-center">
                <div className={`h-14 w-14 mx-auto rounded-full bg-gradient-to-br ${p.grad} grid place-items-center font-bold ring-2 ring-white/15`}>
                  {p.initials}
                </div>
                <div className="mt-2 text-xs">{p.name}</div>
                <div className="text-[11px] text-cyan-300">(Ready)</div>
              </div>
            ))}
            <div className="text-center">
              <div className="h-14 w-14 mx-auto rounded-full bg-white/10 grid place-items-center ring-2 ring-white/10">
                <UserIcon className="h-6 w-6 text-white/50" />
              </div>
              <div className="mt-2 text-[11px] text-white/65 max-w-[80px]">Waiting for participant</div>
            </div>
          </div>
        </div>

        {/* Session status */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-purple-500/30 grid place-items-center">
              <Gamepad2 className="h-5 w-5 text-purple-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Session Status</h3>
              <p className="text-xs text-white/60">Ensure all the participants have joined and groups are complete</p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-[1fr_auto] items-stretch">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex gap-3">
              <Info className="h-4 w-4 text-purple-300 mt-0.5 shrink-0" />
              <p className="text-xs text-white/80 leading-relaxed">
                Your group requires exactly 5 participants. The game will start automatically once all players have joined at the scheduled time. Please contact your organizer to complete your group.
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 text-center min-w-[140px]">
              <div className="text-xs text-white/70">Game Starts in</div>
              <div className="mt-1 text-3xl font-black tabular-nums">{mm}: {ss}</div>
            </div>
          </div>

          <Link
            to="/join"
            className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary text-white py-3 text-sm font-semibold shadow-glow"
          >
            <LogOut className="h-4 w-4" /> Leave Lobby
          </Link>
        </div>
      </section>

      <p className="mt-8 text-center text-xs text-white/55">
        Powered by <span className="text-white">Zoventro</span> · © 2026 zoventro.com All Rights Reserved
      </p>
    </div>
  );
}

function Rule({ icon: Icon, children }: { icon: any; children: React.ReactNode }) {
  return (
    <li className="flex gap-3 items-start">
      <Icon className="h-4 w-4 text-purple-300 mt-0.5 shrink-0" />
      <span className="text-white/85">{children}</span>
    </li>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-3">
      <div className="text-[11px] text-white/60">{label}</div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
    </div>
  );
}
