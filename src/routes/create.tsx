import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PillButton } from "@/components/PillButton";
import { Check, Mail, User, Calendar, Clock, Copy, MessageCircle, Share2, CheckCircle2, X } from "lucide-react";
import mystery from "@/assets/mystery.jpg";
import cook from "@/assets/cook.jpg";

type Pkg = {
  id: string;
  name: string;
  best: string;
  price: string;
  perUser?: string;
  features: string[];
};

const PACKAGES: Pkg[] = [
  { id: "trial", name: "Trial Pack", best: "Best for: Small teams, workshops, family events", price: "₹499", features: ["Up to 5 participants", "1 auto-created groups", "Single session", "Lets you test before buying"] },
  { id: "starter", name: "Starter Pack", best: "Best for: Training sessions, mid-size teams", price: "₹2,999", perUser: "₹60/user", features: ["Up to 50 participants", "10 auto-created groups", "Even user distribution", "Instant activation"] },
  { id: "growth", name: "Growth Pack", best: "Best for: Corporate events and team engagement", price: "₹4,999", perUser: "₹50/user", features: ["Up to 100 participants", "20 auto-created groups", "Even user distribution", "Instant activation"] },
  { id: "business", name: "Business Pack", best: "Best for: Large corporate events and offsites", price: "₹8,999", perUser: "₹45/user", features: ["Up to 300 participants", "60 auto-created groups", "Even user distribution", "Instant activation"] },
  { id: "enterprise", name: "Enterprise Pack", best: "Best for: Training sessions, mid-size teams", price: "₹19,999", perUser: "₹40/user", features: ["Up to 500 participants", "100 auto-created groups", "Even user distribution", "Fully managed setup"] },
];

export const Route = createFileRoute("/create")({
  head: () => ({
    meta: [
      { title: "Create Your Session — Zoventro" },
      { name: "description", content: "Set up your account, choose a package, and start your team engagement experience in minutes." },
      { property: "og:title", content: "Create Your Session — Zoventro" },
    ],
  }),
  component: CreatePage,
});

const STEPS = ["Details", "Verify", "Setup", "Payment"];

function CreatePage() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [pkg, setPkg] = useState<Pkg | null>(null);

  return (
    <div className="min-h-screen pb-10">
      <div className="pt-6"><Header /></div>

      <section className="px-4 mt-12">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Create Your Session &amp;<br />Activate Your Activity</h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Set up your account, choose a package, and start your team experience in minutes.</p>
        </div>

        {done ? (
          <SuccessCard onReset={() => { setDone(false); setStep(0); }} />
        ) : (
          <div className="mx-auto max-w-6xl mt-12 grid lg:grid-cols-2 gap-8 items-start">
            <div className="rounded-3xl overflow-hidden shadow-elevated min-h-[520px] bg-gradient-soft">
              <img src={step >= 2 ? cook : mystery} alt="" className="h-full w-full object-cover min-h-[520px]" />
            </div>

            <div className="rounded-3xl bg-card shadow-elevated p-8 md:p-10">
              <Stepper step={step} />
              <div className="mt-8">
                {step === 0 && <DetailsStep onNext={() => setStep(1)} />}
                {step === 1 && <VerifyStep onNext={() => setStep(2)} />}
                {step === 2 && <SetupStep onNext={() => setStep(3)} pkg={pkg} setPkg={setPkg} />}
                {step === 3 && <PaymentStep onNext={() => setDone(true)} pkg={pkg} />}
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-between">
      {STEPS.map((label, i) => {
        const active = i === step;
        const complete = i < step;
        return (
          <div key={label} className="flex-1 flex items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div className={`grid h-10 w-10 place-items-center rounded-full text-sm font-semibold transition-colors ${
                complete ? "bg-primary/20 text-primary" : active ? "bg-primary text-primary-foreground shadow-glow" : "bg-muted text-muted-foreground"
              }`}>
                {complete ? <Check className="h-5 w-5" /> : String(i + 1).padStart(2, "0")}
              </div>
              <span className={`text-xs ${active ? "text-primary font-semibold" : "text-muted-foreground"}`}>{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-[2px] mx-2 mb-6 rounded ${i < step ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function Field({ label, hint, icon: Icon, type = "text", placeholder }: { label: string; hint?: string; icon?: any; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      {hint && <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>}
      <div className="mt-1.5 relative">
        <input type={type} placeholder={placeholder} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        {Icon && <Icon className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />}
      </div>
    </div>
  );
}

function DetailsStep({ onNext }: { onNext: () => void }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-4">
      <h2 className="text-2xl font-bold">Organizer Details</h2>
      <p className="text-sm text-muted-foreground">Provide basic details to set up your team engagement activity.</p>
      <Field label="Full Name" hint="Primary Contact Person" icon={User} placeholder="Enter your full name" />
      <Field label="Official Email ID" hint="An OTP will be sent to this email for verification" icon={Mail} type="email" placeholder="Enter your work email" />
      <Field label="Company / Organization Name" placeholder="Enter Company Name" />
      <Field label="Company Website" placeholder="Enter Company Website" />
      <PillButton type="submit" variant="primary">Submit &amp; Verify Email</PillButton>
      <p className="text-xs text-muted-foreground pt-2">Already have an account? <a className="text-primary font-semibold" href="#">Login</a></p>
    </form>
  );
}

function VerifyStep({ onNext }: { onNext: () => void }) {
  const [otp, setOtp] = useState(["5", "9", "4", "", "", ""]);
  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">Verify Your Email</h2>
        <p className="text-sm text-muted-foreground mt-1">Enter the OTP sent to your email to continue.</p>
      </div>
      <p className="text-sm">We have sent a 6 digit code to your email <span className="font-semibold">shubham@example.com</span></p>
      <div className="flex gap-2.5">
        {otp.map((d, i) => (
          <input
            key={i}
            value={d}
            onChange={(e) => {
              const next = [...otp]; next[i] = e.target.value.slice(-1); setOtp(next);
            }}
            maxLength={1}
            className="h-14 w-14 rounded-lg border-2 border-input text-center text-xl font-bold text-primary focus:border-primary focus:outline-none"
          />
        ))}
      </div>
      <p className="text-sm text-muted-foreground">Didn't receive code? <button type="button" className="text-primary font-semibold">Resend</button></p>
      <PillButton type="submit" variant="primary">Verify &amp; Continue</PillButton>
    </form>
  );
}

function SetupStep({ onNext, pkg, setPkg }: { onNext: () => void; pkg: Pkg | null; setPkg: (p: Pkg) => void }) {
  const [activity, setActivity] = useState("mystery");
  const [open, setOpen] = useState(false);
  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">Choose Your Activity, Package &amp; Schedule</h2>
        <p className="text-sm text-muted-foreground mt-1">Select your activity, team size, and schedule your experience.</p>
      </div>

      <div>
        <label className="text-sm font-semibold">Choose your Activity</label>
        <div className="mt-2 grid grid-cols-2 gap-3">
          {[
            { id: "mystery", name: "Mystery Quest", img: mystery },
            { id: "cook", name: "Cook & Create", img: cook },
          ].map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setActivity(a.id)}
              className={`flex items-center justify-between gap-3 rounded-xl border-2 p-2 pl-4 transition ${activity === a.id ? "border-primary bg-primary/5" : "border-border"}`}
            >
              <div className="flex items-center gap-2">
                <span className={`h-4 w-4 rounded-full border-2 ${activity === a.id ? "border-primary" : "border-muted-foreground"} grid place-items-center`}>
                  {activity === a.id && <span className="h-2 w-2 rounded-full bg-primary" />}
                </span>
                <span className="text-sm font-medium">{a.name}</span>
              </div>
              <img src={a.img} alt={a.name} className="h-10 w-12 rounded-md object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold">Choose your Package</label>
          {pkg && (
            <button type="button" onClick={() => setOpen(true)} className="rounded-full bg-purple-100 text-primary px-4 py-1 text-xs font-medium">Change Package</button>
          )}
        </div>
        {pkg ? (
          <div className="mt-2 rounded-xl border-2 border-primary p-4 grid grid-cols-2 gap-4">
            <div>
              <p className="font-bold">{pkg.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{pkg.best}</p>
              <p className="mt-2 text-lg font-bold">{pkg.price} <span className="text-xs font-normal text-muted-foreground">One Time Payment</span></p>
              {pkg.perUser && <p className="text-xs text-muted-foreground">{pkg.perUser}</p>}
            </div>
            <div>
              <p className="text-xs font-semibold mb-1">This plan includes:</p>
              <ul className="space-y-1">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-1.5 text-xs"><Check className="h-3.5 w-3.5 text-success mt-0.5 shrink-0" />{f}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <button type="button" onClick={() => setOpen(true)} className="mt-2 w-full rounded-xl border border-input p-2 flex justify-center">
            <span className="rounded-full bg-purple-100 text-primary px-5 py-1.5 text-sm font-medium">Choose Package</span>
          </button>
        )}
      </div>

      <div className="rounded-xl bg-purple-50 p-4 text-xs text-foreground/80 space-y-1.5">
        <p className="font-semibold text-foreground">Schedule Your Session</p>
        <p>• Session access is valid for 5 days from the moment of payment activation.</p>
        <p>• Share the session link with participants 10 minutes before scheduled start time.</p>
        <p>• You can update your session date and time once from your HR Dashboard.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium">Date</label>
          <div className="relative mt-1.5">
            <input type="text" placeholder="Select date" className="w-full rounded-lg border border-input px-4 py-2.5 text-sm" />
            <Calendar className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Start Time</label>
          <div className="relative mt-1.5">
            <input type="text" placeholder="Select time" className="w-full rounded-lg border border-input px-4 py-2.5 text-sm" />
            <Clock className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
      </div>

      <PillButton type="submit" variant="primary" disabled={!pkg}>Continue to Payment</PillButton>

      {open && (
        <PackageModal
          current={pkg}
          onClose={() => setOpen(false)}
          onConfirm={(p) => { setPkg(p); setOpen(false); }}
        />
      )}
    </form>
  );
}

function PackageModal({ current, onClose, onConfirm }: { current: Pkg | null; onClose: () => void; onConfirm: (p: Pkg) => void }) {
  const [sel, setSel] = useState<Pkg | null>(current ?? PACKAGES[1]);
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={onClose}>
      <div className="bg-card rounded-3xl shadow-elevated w-full max-w-5xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-xl font-bold">Choose your Package</h3>
          <button type="button" onClick={onClose} className="h-9 w-9 grid place-items-center rounded-full hover:bg-muted"><X className="h-5 w-5" /></button>
        </div>
        <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PACKAGES.map((p) => {
            const active = sel?.id === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSel(p)}
                className={`text-left rounded-2xl border-2 p-5 transition ${active ? "border-primary shadow-glow" : "border-border"}`}
              >
                <div className="flex items-start justify-between">
                  <p className="font-bold">{p.name}</p>
                  <span className={`h-5 w-5 rounded-full border-2 grid place-items-center ${active ? "border-primary" : "border-muted-foreground"}`}>
                    {active && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 min-h-[32px]">{p.best}</p>
                <p className="mt-3 text-xl font-bold">{p.price} {p.perUser && <span className="text-xs font-normal text-muted-foreground">{p.perUser}</span>}<span className="text-xs font-normal text-muted-foreground"> One Time Payment</span></p>
                <p className="text-xs font-semibold mt-4">This plan includes:</p>
                <ul className="mt-2 space-y-1.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs"><Check className="h-3.5 w-3.5 text-success mt-0.5 shrink-0" />{f}</li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>
        <div className="flex justify-between gap-3 p-6 border-t border-border">
          <button type="button" onClick={onClose} className="rounded-full border border-border px-6 py-2.5 text-sm">Cancel</button>
          <button type="button" disabled={!sel} onClick={() => sel && onConfirm(sel)} className="rounded-full bg-gradient-primary text-white px-8 py-2.5 text-sm font-medium shadow-glow disabled:opacity-50">Confirm</button>
        </div>
      </div>
    </div>
  );
}

function PaymentStep({ onNext, pkg }: { onNext: () => void; pkg: Pkg | null }) {
  const priceNum = pkg ? Number(pkg.price.replace(/[^\d]/g, "")) : 0;
  const taxes = Math.round(priceNum * 0.06);
  const gst = Math.round(priceNum * 0.04);
  const total = priceNum + taxes + gst;
  const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">Review &amp; Activate Your Team Activity</h2>
        <p className="text-sm text-muted-foreground mt-1">Complete payment to generate your access link and start your activity.</p>
      </div>

      <div>
        <p className="text-sm font-semibold mb-2">Organizer Details</p>
        <div className="rounded-xl border border-border p-4 grid grid-cols-2 gap-3 text-sm">
          <div><p className="text-xs text-muted-foreground">Full Name</p><p className="font-medium">Saurabh Chandra Rai</p></div>
          <div><p className="text-xs text-muted-foreground">Official Email ID</p><p className="font-medium">Saurabh@inocreation.com</p></div>
          <div><p className="text-xs text-muted-foreground">Company / Organization Name</p><p className="font-medium">Inocreation Technologies</p></div>
          <div><p className="text-xs text-muted-foreground">Company Website</p><p className="font-medium">inocreation.com</p></div>
        </div>
      </div>

      <Section title="Activity & Package">
        <Row k="Selected Activity" v="Mystery Quest" />
        <Row k="Selected Package" v={pkg ? `${pkg.name} @ ${pkg.price}` : "—"} />
      </Section>

      <Section title="Schedule">
        <Row k="Date" v="02 Apr 2026" />
        <Row k="Start Time" v="11:00 AM" />
      </Section>

      <div>
        <p className="text-sm font-semibold">Billing Details (GST Invoice)</p>
        <p className="text-xs text-muted-foreground mt-0.5">A GST invoice will be automatically generated and sent to your registered email after successful payment</p>
        <div className="mt-3 space-y-3">
          <BField label="GST Number" placeholder="Enter GST Number" />
          <BField label="Billing Address" placeholder="Enter Billing Address" />
          <div className="grid grid-cols-2 gap-3">
            <BField label="City" placeholder="Enter City" />
            <BField label="State" placeholder="Enter State" />
          </div>
          <BField label="PIN Code" placeholder="Enter PIN Code" />
        </div>
      </div>

      <div className="rounded-xl border border-border p-4 space-y-2">
        <Row k="Package Price" v={fmt(priceNum)} />
        <Row k="Taxes" v={fmt(taxes)} />
        <Row k="Additional Charges" v="₹0" />
        <Row k="GST Amount" v={fmt(gst)} />
        <div className="border-t border-border pt-2.5 mt-2.5">
          <Row k="Total Payable" v={fmt(total)} bold />
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold mb-2">Select payment Method</p>
        <div className="grid grid-cols-2 gap-3">
          {["UPI", "Paytm", "Debit/Credit Card", "Net Banking"].map((m, i) => (
            <label key={m} className={`flex items-center gap-2 rounded-lg border p-3 text-sm cursor-pointer ${i === 0 ? "border-primary bg-primary/5" : "border-input"}`}>
              <input type="radio" name="pay" defaultChecked={i === 0} className="accent-primary" /> {m}
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-purple-50 p-4 space-y-2 text-xs">
        {[
          "I confirm I am an authorized representative of my organization and have approval to create this session on its behalf.",
          "I confirm that all participants have been informed about this session and have consented to participate.",
          "I have read and agree to the Terms & Conditions and Privacy Policy.",
          "I understand this is a non-refundable digital service after activation, except in cases of verified technical failure on Zoventro's platform as outlined in the Refund Policy.",
          "I understand the session must be used within 5 days of activation, after which all access will expire automatically.",
        ].map((t) => (
          <label key={t} className="flex items-start gap-2"><input type="checkbox" className="mt-0.5 accent-primary" /> <span>{t}</span></label>
        ))}
      </div>

      <PillButton type="submit" variant="primary">Pay &amp; Activate Event</PillButton>
    </form>
  );
}

function BField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="text-xs font-medium">{label}</label>
      <input type="text" placeholder={placeholder} className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm font-semibold mb-2">{title}</p>
      <div className="rounded-xl border border-border p-4 space-y-2">{children}</div>
    </div>
  );
}
function Row({ k, v, bold }: { k: string; v: string; bold?: boolean }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{k}</span>
      <span className={bold ? "font-bold text-base" : "font-medium"}>{v}</span>
    </div>
  );
}

function SuccessCard({ onReset }: { onReset: () => void }) {
  return (
    <div className="mx-auto max-w-3xl mt-12 rounded-3xl bg-card shadow-elevated p-10 text-center">
      <div className="mx-auto h-16 w-16 rounded-full bg-success/15 grid place-items-center">
        <CheckCircle2 className="h-9 w-9 text-success" />
      </div>
      <h2 className="mt-5 text-3xl font-bold">Your Team Activity is Ready!</h2>
      <p className="mt-2 text-muted-foreground">Congratulations! Your activity has been successfully activated.</p>

      <div className="mt-8 rounded-2xl border border-border p-5 text-left">
        <p className="text-sm font-semibold">Event Access Link</p>
        <p className="text-xs text-muted-foreground mt-0.5">Share this link with participants 10 minutes before the start time</p>
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 rounded-lg border border-input bg-muted px-4 py-2.5 text-sm font-mono">https://zoventro.com/join/xyz123</div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-primary text-white px-4 py-2.5 text-sm font-medium"><Copy className="h-4 w-4" /> Copy</button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {[{ i: MessageCircle, l: "WhatsApp" }, { i: Mail, l: "Email" }, { i: Share2, l: "More" }].map(({ i: Icon, l }) => (
            <button key={l} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs hover:bg-accent"><Icon className="h-3.5 w-3.5" /> {l}</button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        <button onClick={onReset} className="rounded-full border border-border px-6 py-2.5 text-sm">Go to Home Page</button>
        <PillButton variant="primary">Go to Dashboard</PillButton>
      </div>
    </div>
  );
}
