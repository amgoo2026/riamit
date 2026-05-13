import { createFileRoute } from "@tanstack/react-router";
import { Search, Filter, Download, MoreHorizontal, Users } from "lucide-react";
import { DashboardShell } from "@/components/DashboardShell";

export const Route = createFileRoute("/groups")({
  head: () => ({ meta: [{ title: "Groups — Zoventro" }] }),
  component: GroupsPage,
});

type Row = { id: number; name: string; lead: string; members: number; cap: number; status: "Complete" | "In Progress" | "Pending"; updated: string };

const ROWS: Row[] = [
  { id: 1, name: "Group 1", lead: "Arjun Mehta", members: 5, cap: 5, status: "Complete", updated: "10:42 AM" },
  { id: 2, name: "Group 2", lead: "Sneha Kapoor", members: 5, cap: 5, status: "Complete", updated: "10:40 AM" },
  { id: 3, name: "Group 3", lead: "Rohan Verma", members: 5, cap: 5, status: "Complete", updated: "10:30 AM" },
  { id: 4, name: "Group 4", lead: "Priya Nair", members: 5, cap: 5, status: "Complete", updated: "10:20 AM" },
  { id: 5, name: "Group 5", lead: "Karan Singh", members: 5, cap: 5, status: "Complete", updated: "10:15 AM" },
  { id: 6, name: "Group 6", lead: "Neha Sharma", members: 5, cap: 5, status: "Complete", updated: "10:05 AM" },
  { id: 7, name: "Group 7", lead: "Vikas Rao", members: 5, cap: 5, status: "Complete", updated: "09:58 AM" },
  { id: 8, name: "Group 8", lead: "Anita Desai", members: 5, cap: 5, status: "Complete", updated: "09:45 AM" },
  { id: 9, name: "Group 9", lead: "Manish Gupta", members: 5, cap: 5, status: "Complete", updated: "09:30 AM" },
  { id: 10, name: "Group 10", lead: "Riya Joshi", members: 3, cap: 5, status: "In Progress", updated: "10:50 AM" },
];

const tone = (s: Row["status"]) =>
  s === "Complete" ? "bg-emerald-100 text-emerald-700" :
  s === "In Progress" ? "bg-orange-100 text-orange-700" :
  "bg-muted text-foreground/60";

function GroupsPage() {
  return (
    <DashboardShell crumb="Organizer Dashboard / Groups">
      <section className="rounded-2xl bg-white p-6 shadow-card">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary"><Users className="h-4 w-4" /></span>
              Groups
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage all teams formed for the event. Track completion and members in real time.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input placeholder="Search groups…" className="rounded-full border border-border pl-8 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <button className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-medium hover:bg-muted"><Filter className="h-3.5 w-3.5" /> Filter</button>
            <button className="inline-flex items-center gap-1.5 rounded-full bg-gradient-primary text-white px-4 py-2 text-xs font-medium shadow-glow"><Download className="h-3.5 w-3.5" /> Export</button>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="py-3 px-4 font-semibold">Group</th>
                <th className="py-3 px-4 font-semibold">Team Lead</th>
                <th className="py-3 px-4 font-semibold">Members</th>
                <th className="py-3 px-4 font-semibold">Avatars</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Last Updated</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.id} className="border-t border-border/60 hover:bg-muted/30">
                  <td className="py-3 px-4 font-semibold">{r.name}</td>
                  <td className="py-3 px-4">{r.lead}</td>
                  <td className="py-3 px-4 text-muted-foreground">{r.members} / {r.cap}</td>
                  <td className="py-3 px-4">
                    <div className="flex -space-x-1.5">
                      {["bg-amber-200","bg-purple-200","bg-pink-200","bg-orange-200","bg-emerald-200"].slice(0, r.members).map((c,i) => (
                        <span key={i} className={`h-6 w-6 rounded-full border-2 border-white ${c}`} />
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${tone(r.status)}`}>{r.status}</span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{r.updated}</td>
                  <td className="py-3 px-4 text-right">
                    <button className="grid h-8 w-8 place-items-center rounded-full hover:bg-muted ml-auto"><MoreHorizontal className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>Showing 1–10 of 10 groups</span>
          <div className="flex items-center gap-2">
            <button className="rounded-md border border-border px-3 py-1.5">Previous</button>
            <button className="rounded-md border border-border px-3 py-1.5">Next</button>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}
