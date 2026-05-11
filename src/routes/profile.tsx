import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { DashboardShell } from "@/components/DashboardShell";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Edit Profile — Zoventro" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <DashboardShell crumb="Organizer Dashboard / Edit Profile">
      <section className="rounded-2xl bg-white p-6 shadow-card">
        <h1 className="text-2xl font-bold">Edit Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your event, track participation, and prepare for the scheduled start.
        </p>
      </section>

      {/* Organizer Details */}
      <section className="rounded-2xl bg-white p-6 shadow-card">
        <h2 className="font-bold">Organizer Details</h2>
        <p className="text-xs text-muted-foreground mt-1">You can not edit organizer details.</p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <ReadField label="Full Name" value="Priya Rastogi" />
          <ReadField label="Official Email ID" value="PriyaRa@inocreation.com" />
          <ReadField label="Company / Organization Name" value="Inocreation Technologies" />
          <ReadField label="Company Website" value="Inocreation.com" />
        </div>
      </section>

      {/* Billing Details */}
      <section className="rounded-2xl bg-white p-6 shadow-card">
        <h2 className="font-bold">Billing Details</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <BField label="GST Number" defaultValue="27ABCDE1234F1Z5" />
          <BField label="Billing Address" defaultValue="5th Floor, Prestige Trade Tower, MG Road" />
          <BField label="City" defaultValue="Bengaluru" />
          <BField label="State" defaultValue="Karnataka" />
          <BField label="PIN Code" defaultValue="560001" />
        </div>
        <button className="mt-5 group inline-flex items-center gap-2 rounded-full bg-gradient-primary text-white pl-5 pr-1.5 py-1.5 shadow-glow text-sm font-medium">
          Change and Update
          <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20"><ArrowRight className="h-4 w-4" /></span>
        </button>
      </section>

      {/* Payment Details */}
      <section className="rounded-2xl bg-white p-6 shadow-card">
        <h2 className="font-bold">Payment Details</h2>
        <p className="text-xs text-muted-foreground mt-1">We do not store or save any payment details.</p>
      </section>

      {/* Delete */}
      <section className="rounded-2xl bg-white p-6 shadow-card">
        <h2 className="font-bold">Delete Data</h2>
        <p className="text-xs text-muted-foreground mt-1">You can delete all your data and remove your account</p>
        <button className="mt-4 rounded-full border border-primary/50 text-primary px-5 py-2 text-sm font-medium hover:bg-primary hover:text-white transition-colors">
          Delete Data &amp; Account
        </button>
      </section>
    </DashboardShell>
  );
}

function ReadField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-medium">{value}</div>
    </div>
  );
}
function BField({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input
        defaultValue={defaultValue}
        className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
      />
    </label>
  );
}
