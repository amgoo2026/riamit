import { createFileRoute } from "@tanstack/react-router";
import { Search, Filter, Download, Users } from "lucide-react";
import { DashboardShell } from "@/components/DashboardShell";

export const Route = createFileRoute("/participants")({
  head: () => ({ meta: [{ title: "Participants — Zoventro" }] }),
  component: ParticipantsPage,
});

type P = { initials: string; name: string; email: string; group: string; joined: string; tone: string };

const PEOPLE: P[] = [
  { initials: "AM", name: "Arjun Mehta", email: "arjun@inocreation.com", group: "Group 4", joined: "Joined 10:42 AM", tone: "bg-amber-100 text-amber-700" },
  { initials: "SK", name: "Sneha Kapoor", email: "sneha@inocreation.com", group: "Group 4", joined: "Joined 10:40 AM", tone: "bg-pink-100 text-pink-700" },
  { initials: "RV", name: "Rohan Verma", email: "rohan@inocreation.com", group: "Group 4", joined: "Joined 10:30 AM", tone: "bg-orange-100 text-orange-700" },
  { initials: "PN", name: "Priya Nair", email: "priya@inocreation.com", group: "Group 4", joined: "Joined yesterday 10:00 AM", tone: "bg-purple-100 text-purple-700" },
  { initials: "KS", name: "Karan Singh", email: "karan@inocreation.com", group: "Group 3", joined: "Joined yesterday 09:45 AM", tone: "bg-emerald-100 text-emerald-700" },
  { initials: "NS", name: "Neha Sharma", email: "neha@inocreation.com", group: "Group 2", joined: "Joined yesterday 09:30 AM", tone: "bg-sky-100 text-sky-700" },
  { initials: "VR", name: "Vikas Rao", email: "vikas@inocreation.com", group: "Group 1", joined: "Joined yesterday 09:10 AM", tone: "bg-rose-100 text-rose-700" },
];

function ParticipantsPage() {
  return (
    <DashboardShell crumb="Organizer Dashboard / Participants">
      <section className="rounded-2xl bg-white p-6 shadow-card">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary"><Users className="h-4 w-4" /></span>
              Participants
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Ensure all the participants have joined and groups are complete.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input placeholder="Search participants…" className="rounded-full border border-border pl-8 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <button className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-medium hover:bg-muted"><Filter className="h-3.5 w-3.5" /> Filter</button>
            <button className="inline-flex items-center gap-1.5 rounded-full bg-gradient-primary text-white px-4 py-2 text-xs font-medium shadow-glow"><Download className="h-3.5 w-3.5" /> Export</button>
          </div>
        </div>

        <div className="mt-6 divide-y divide-border/60">
          {PEOPLE.map((p) => (
            <div key={p.email} className="flex items-center gap-4 py-3.5">
              <div className={`grid h-10 w-10 place-items-center rounded-full text-xs font-semibold ${p.tone}`}>{p.initials}</div>
              <div className="flex-1 min-w-0">
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-muted-foreground truncate">{p.email}</div>
              </div>
              <div className="text-xs text-muted-foreground">{p.joined}</div>
              <span className="rounded-full bg-purple-100 text-primary text-xs px-2.5 py-0.5 font-medium">{p.group}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>Showing 1–{PEOPLE.length} of 46 participants</span>
          <div className="flex items-center gap-2">
            <button className="rounded-md border border-border px-3 py-1.5">Previous</button>
            <button className="rounded-md border border-border px-3 py-1.5">Next</button>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}
