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
          Update your organizer details, billing information, and account preferences.
        </p>
      </section>

      {/* Organizer Details */}
      <section className="rounded-2xl bg-white p-6 shadow-card">
        <h2 className="font-bold">Organizer Details</h2>
        <p className="text-xs text-muted-foreground mt-1">Update your name, email, and organization information.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <BField label="Full Name" defaultValue="Priya Rastogi" />
          <BField label="Official Email ID" type="email" defaultValue="PriyaRa@inocreation.com" />
          <BField label="Company / Organization Name" defaultValue="Inocreation Technologies" />
          <BField label="Company Website" defaultValue="Inocreation.com" />
          <BField label="Designation" defaultValue="HR Manager" />
          <BField label="Phone Number" defaultValue="+91 98765 43210" />
        </div>
        <button className="mt-5 group inline-flex items-center gap-2 rounded-full bg-gradient-primary text-white pl-5 pr-1.5 py-1.5 shadow-glow text-sm font-medium">
          Save Changes
          <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20"><ArrowRight className="h-4 w-4" /></span>
        </button>
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

function BField({ label, defaultValue, type = "text" }: { label: string; defaultValue: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input
        type={type}
        defaultValue={defaultValue}
        className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
      />
    </label>
  );
}
