import { createFileRoute } from "@tanstack/react-router";
import {
  Share2, MessageCircle, Mail, Link2, MoreHorizontal,
  Calendar, Clock, ShieldCheck, Download, Users, Boxes,
  UserMinus, MousePointerClick, Play, Info, CheckCircle2, Layers,
} from "lucide-react";
import { DashboardShell } from "@/components/DashboardShell";
import mystery from "@/assets/mystery.jpg";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Organizer Dashboard — Zoventro" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <DashboardShell crumb="Organizer Dashboard">
      {/* Event Overview */}
      <section className="rounded-2xl bg-white p-6 shadow-card">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Event Overview</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your event, track participation, and prepare for the scheduled start.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium mr-1">Share Access Link</span>
            <IconBtn><MessageCircle className="h-4 w-4 text-emerald-500" /></IconBtn>
            <IconBtn><Mail className="h-4 w-4 text-primary" /></IconBtn>
            <PillIcon icon={Link2} label="Copy Link" />
            <PillIcon icon={Share2} label="More" />
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[260px_1fr_260px]">
          <img src={mystery} alt="Mystery Quest" className="h-[180px] w-full rounded-2xl object-cover" />

          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 22l-6-4-6 4 1.5-8.5L2 9h7z"/></svg>
              </div>
              <h2 className="text-xl font-bold">Mystery Quest</h2>
              <span className="rounded-full bg-emerald-100 text-emerald-700 px-2.5 py-0.5 text-xs font-semibold">Active</span>
              <span className="text-xs text-muted-foreground">Package ID: WHD-8291</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              A story-driven team challenge where employees collaborate, question, and compete to solve the case.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-4 text-sm">
              <Field label="Package" value="Standard Pack" />
              <Field label="Team Size" value="Up to 100 Participants" />
              <Field label="Groups" value="10 Groups (5 per group)" />
            </div>
            <div className="mt-5 grid grid-cols-4 gap-4 border-t border-border/60 pt-4 text-sm">
              <IconField icon={Calendar} label="Date" value="02 Apr 2026" extra="(Thursday)" />
              <IconField icon={Clock} label="Start Time" value="11:00 AM" extra="(IST)" />
              <IconField icon={ShieldCheck} label="Access Validity" value="5 Days" extra="from activation" />
              <IconField icon={Download} label="GST Invoice" value={<a className="text-primary">download</a>} />
            </div>
          </div>

          <div className="rounded-2xl bg-purple-50/60 border border-purple-100 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span>Reschedule</span>
              <span className="text-xs font-normal text-muted-foreground">• 1 time allowed</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              You can reschedule your event once before starting the game.
            </p>
            <button className="mt-3 w-full rounded-full border border-primary/40 text-primary text-sm font-medium py-2 hover:bg-primary hover:text-white transition-colors">
              Reschedule Event
            </button>
            <div className="mt-4 text-xs text-muted-foreground">Current Schedule</div>
            <div className="mt-1 flex items-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> 02 Apr 2026</span>
              <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> 11:00 AM</span>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">Reschedule untill</div>
            <div className="text-sm">02 Apr 2026, 10:00 AM</div>
          </div>
        </div>
      </section>

      {/* Progress + Status */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardTitle icon={Layers} color="text-primary" bg="bg-primary/10">Event Progress</CardTitle>
          <div className="grid grid-cols-2 gap-6 mt-5">
            <Stat icon={Users} label="Participants Joined" value="46" total="50" pct={92} />
            <Stat icon={Boxes} label="Groups Formed" value="09" total="10" pct={90} />
          </div>
          <div className="grid grid-cols-2 gap-6 mt-6 border-t border-border/60 pt-5">
            <Stat2 icon={UserMinus} label="Remaining to form group" value="02" sub="2 more participants needed" />
            <Stat2 icon={MousePointerClick} label="Access Link Clicks" value="78" sub="Total clicks on link" />
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-bold">Event Status</h3>
          <p className="text-sm text-muted-foreground mt-1">Ensure all the participants have joined and groups are complete.</p>
          <button className="mt-4 w-full rounded-full bg-gradient-primary text-white py-3 font-semibold inline-flex items-center justify-center gap-2 shadow-glow">
            <Play className="h-4 w-4" /> Starting in 5 min
          </button>
          <div className="mt-3 flex items-start gap-2 rounded-xl bg-purple-50 px-4 py-3 text-sm">
            <Info className="h-4 w-4 text-primary mt-0.5" />
            <span>Your event is scheduled to begin at 11:00 AM, Today.</span>
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" />Minimum 5 players per group required.</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" />Join within 15 minutes of the start time.</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" />Teams form automatically, late joiners may miss participation.</li>
          </ul>
        </Card>
      </div>

      {/* Recent Groups + Participants */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between">
            <CardTitle icon={Layers} color="text-primary" bg="bg-primary/10">Recent Groups</CardTitle>
            <a className="text-sm text-primary font-medium">View All Groups</a>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <GroupCard num={10} count="3 / 5" status="In Progress" tone="warning" />
            <GroupCard num={9} count="5 / 5" status="Complete" tone="success" />
            <GroupCard num={8} count="5 / 5" status="Complete" tone="success" />
          </div>
          <p className="text-xs text-muted-foreground mt-4">9 of 10 groups are complete. 2 more participants needed.</p>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <CardTitle icon={Users} color="text-primary" bg="bg-primary/10">Recent Participants</CardTitle>
            <a className="text-sm text-primary font-medium">View All</a>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Ensure all the participants have joined and groups are complete</p>
          <div className="mt-4 space-y-3">
            {[
              ["AM","Arjun Mehta","Joined 10:42 AM","Group 4","bg-amber-100 text-amber-700"],
              ["SK","Sneha Kapoor","Joined 10:40 AM","Group 4","bg-pink-100 text-pink-700"],
              ["RV","Rohan Verma","Joined 10:30 AM","Group 4","bg-orange-100 text-orange-700"],
              ["PN","Priya Nair","Joined yesterday 10:00 AM","Group 4","bg-purple-100 text-purple-700"],
            ].map(([i,n,t,g,c]) => (
              <div key={n} className="flex items-center gap-3 text-sm">
                <div className={`grid h-8 w-8 place-items-center rounded-full text-xs font-semibold ${c}`}>{i}</div>
                <div className="flex-1 font-medium">{n}</div>
                <div className="text-xs text-muted-foreground">{t}</div>
                <span className="rounded-full bg-purple-100 text-primary text-xs px-2.5 py-0.5 font-medium">{g}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardShell>
  );
}

function IconBtn({ children }: { children: React.ReactNode }) {
  return <button className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-muted">{children}</button>;
}
function PillIcon({ icon: Icon, label }: any) {
  return (
    <button className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-medium hover:bg-muted">
      <Icon className="h-3.5 w-3.5" /> {label}
    </button>
  );
}
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-semibold mt-0.5">{value}</div>
    </div>
  );
}
function IconField({ icon: Icon, label, value, extra }: any) {
  return (
    <div>
      <div className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
        <span className="grid h-5 w-5 place-items-center rounded-md bg-muted"><Icon className="h-3 w-3" /></span>
        {label}
      </div>
      <div className="font-semibold mt-1">{value} {extra && <span className="text-xs text-muted-foreground font-normal">{extra}</span>}</div>
    </div>
  );
}
function Card({ children }: { children: React.ReactNode }) {
  return <section className="rounded-2xl bg-white p-6 shadow-card">{children}</section>;
}
function CardTitle({ icon: Icon, color, bg, children }: any) {
  return (
    <h3 className="inline-flex items-center gap-2 text-lg font-bold">
      <span className={`grid h-7 w-7 place-items-center rounded-lg ${bg} ${color}`}><Icon className="h-4 w-4" /></span>
      {children}
    </h3>
  );
}
function Stat({ icon: Icon, label, value, total, pct }: any) {
  return (
    <div>
      <div className="text-xs text-muted-foreground inline-flex items-center gap-1.5"><Icon className="h-3.5 w-3.5" />{label}</div>
      <div className="mt-2 text-2xl font-bold">{value} <span className="text-base text-muted-foreground font-medium">/ {total}</span></div>
      <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: `${pct}%` }} /></div>
    </div>
  );
}
function Stat2({ icon: Icon, label, value, sub }: any) {
  return (
    <div>
      <div className="text-xs text-muted-foreground inline-flex items-center gap-1.5"><Icon className="h-3.5 w-3.5" />{label}</div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{sub}</div>
    </div>
  );
}
function GroupCard({ num, count, status, tone }: any) {
  const toneCls = tone === "success" ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700";
  return (
    <div className="rounded-xl border border-border p-3">
      <div className="font-semibold">Group {num}</div>
      <div className="text-xs text-muted-foreground">{count}</div>
      <div className="mt-3 flex -space-x-1.5">
        {["bg-amber-200","bg-purple-200","bg-pink-200","bg-orange-200","bg-emerald-200"].map((c,i) => (
          <span key={i} className={`h-6 w-6 rounded-full border-2 border-white ${c}`} />
        ))}
      </div>
      <div className={`mt-3 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${toneCls}`}>{status}</div>
    </div>
  );
}
