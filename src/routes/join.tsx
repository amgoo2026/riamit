import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { ArrowRight, ArrowLeft, User, Mail, Calendar, Clock, Lock, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Crumbs } from "@/components/Crumbs";
import mystery from "@/assets/mystery.jpg";

export const Route = createFileRoute("/join")({
  head: () => ({ meta: [{ title: "Join Mystery Quest — Zoventro" }] }),
  component: JoinPage,
});

function JoinPage() {
  const [step, setStep] = useState<"form" | "otp" | "done">("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-gradient-hero text-white relative overflow-hidden">
      {/* glow blobs */}
      <div className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-purple-500/30 blur-3xl" />
      <div className="absolute top-1/3 -right-32 h-[420px] w-[420px] rounded-full bg-fuchsia-500/20 blur-3xl" />

      <header className="relative px-6 py-5 max-w-7xl mx-auto flex items-center justify-between">
        <Crumbs
          tone="dark"
          items={[
            { label: "Home", to: "/" },
            { label: "Participant Login" },
            { label: step === "form" ? "Details" : step === "otp" ? "Verify OTP" : "Verified" },
          ]}
        />
        <Logo />
      </header>

      <main className="relative px-4 pb-16">
        <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-2">
          {/* LEFT — quest info */}
          <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-elevated">
            <img
              src={mystery}
              alt="Mystery Quest"
              className="w-full h-56 object-cover rounded-2xl ring-1 ring-white/10"
            />
            <h1 className="mt-6 text-3xl font-bold leading-tight">
              Are you ready to<br />solve the mystery?
            </h1>
            <p className="mt-3 text-sm text-white/70">
              A story-driven team challenge where employees collaborate, question, and compete to solve the case.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-white/85">
              <li>• Role-based gameplay (Investigator, Culprit, Witness, and more)</li>
              <li>• Real-time questioning and deduction</li>
              <li>• Time-bound challenges to maintain urgency</li>
              <li>• Built for communication and strategic thinking</li>
            </ul>
            <p className="mt-5 text-sm text-white/70">
              Builds stronger communication, sharper thinking, and real team collaboration in a high-energy environment.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl bg-white/95 text-foreground p-4">
              <Meta icon={User} label="Organizer" v1="Priya Rastogi" v2="Inocreation Technologies" />
              <Meta icon={Calendar} label="Date" v1="02 Apr 2026" v2="(Thursday)" />
              <Meta icon={Clock} label="Start Time" v1="11:00 AM" v2="(IST)" />
            </div>
          </div>

          {/* RIGHT — form / otp */}
          <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-elevated min-h-[560px] flex flex-col">
            {step === "form" && (
              <FormStep
                name={name} setName={setName}
                email={email} setEmail={setEmail}
                onNext={() => name.trim() && email.includes("@") && setStep("otp")}
              />
            )}
            {step === "otp" && (
              <OtpStep email={email} onBack={() => setStep("form")} onVerify={() => setStep("done")} />
            )}
            {step === "done" && <DoneStep name={name} />}

            <div className="mt-auto pt-6 flex items-center gap-2 text-[11px] text-white/55">
              <Lock className="h-3.5 w-3.5" />
              Secure. Your details are protected & will be deleted after the event.
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-white/55">
          Powered by <span className="text-white">Zoventro</span> · © 2026 zoventro.com All Rights Reserved
        </p>
      </main>
    </div>
  );
}

function FormStep({
  name, setName, email, setEmail, onNext,
}: { name: string; setName: (v: string) => void; email: string; setEmail: (v: string) => void; onNext: () => void }) {
  return (
    <>
      <div className="text-xs uppercase tracking-widest text-white/60">You're invited to</div>
      <h2 className="mt-1 text-3xl font-bold">Mystery Quest</h2>
      <p className="mt-2 text-sm text-white/70">
        A story-driven team challenge where employees collaborate, question, and compete to solve the case.
      </p>

      <h3 className="mt-7 text-lg font-bold">Join the Game</h3>
      <p className="text-xs text-white/60">Enter your details to join the event and get assigned to your group.</p>

      <div className="mt-5 space-y-4">
        <Field icon={User} label="Full Name" placeholder="Enter your full name" value={name} onChange={setName} />
        <Field
          icon={Mail}
          label="Work Email"
          hint="An OTP will be sent to this email for verification"
          placeholder="Enter your work email"
          value={email}
          onChange={setEmail}
          type="email"
        />
      </div>

      <button
        onClick={onNext}
        className="mt-6 self-start group inline-flex items-center gap-2 rounded-full bg-gradient-primary text-white pl-5 pr-1.5 py-2 text-sm font-medium shadow-glow"
      >
        Send Verification Code
        <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20"><ArrowRight className="h-4 w-4" /></span>
      </button>
    </>
  );
}

function OtpStep({ email, onBack, onVerify }: { email: string; onBack: () => void; onVerify: () => void }) {
  const [vals, setVals] = useState<string[]>(["", "", "", "", "", ""]);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  useEffect(() => { refs.current[0]?.focus(); }, []);

  const setAt = (i: number, v: string) => {
    const c = v.replace(/\D/g, "").slice(-1);
    const n = [...vals]; n[i] = c; setVals(n);
    if (c && i < 5) refs.current[i + 1]?.focus();
  };
  const filled = vals.every(Boolean);

  return (
    <>
      <button onClick={onBack} className="self-start inline-flex items-center gap-2 text-xs text-white/80 bg-white/10 rounded-full px-3 py-1.5 hover:bg-white/15">
        <ArrowLeft className="h-3.5 w-3.5" /> Go Back
      </button>

      <h2 className="mt-6 text-3xl font-bold">Verify Your Email</h2>
      <p className="mt-2 text-sm text-white/70">Enter the OTP sent to your email to continue.</p>

      <p className="mt-6 text-xs text-white/65">
        We have sent a 6-digit code to your email{" "}
        <span className="text-white font-medium">{email || "you@company.com"}</span>
      </p>

      <div className="mt-4 flex gap-2.5">
        {vals.map((v, i) => (
          <input
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            value={v}
            onChange={(e) => setAt(i, e.target.value)}
            onKeyDown={(e) => { if (e.key === "Backspace" && !vals[i] && i > 0) refs.current[i - 1]?.focus(); }}
            inputMode="numeric"
            maxLength={1}
            className="h-14 w-12 rounded-2xl bg-white/5 border border-white/20 text-center text-2xl font-bold text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
          />
        ))}
      </div>

      <p className="mt-4 text-xs text-white/55">
        Didn't receive code? <button className="text-primary font-medium">Resend</button>
      </p>

      <button
        onClick={() => filled && onVerify()}
        className={`mt-6 self-start group inline-flex items-center gap-2 rounded-full text-white pl-5 pr-1.5 py-2 text-sm font-medium ${filled ? "bg-gradient-primary shadow-glow" : "bg-white/15"}`}
      >
        Verify &amp; Proceed
        <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20"><ArrowRight className="h-4 w-4" /></span>
      </button>
    </>
  );
}

function DoneStep({ name }: { name: string }) {
  return (
    <div className="flex-1 grid place-items-center text-center">
      <div>
        <div className="mx-auto h-16 w-16 grid place-items-center rounded-full bg-gradient-primary shadow-glow">
          <ShieldCheck className="h-8 w-8 text-white" />
        </div>
        <h2 className="mt-5 text-2xl font-bold">Welcome{ name ? `, ${name.split(" ")[0]}` : "" }!</h2>
        <p className="mt-2 text-sm text-white/70 max-w-xs mx-auto">
          You're verified and assigned to your group. Sit tight — the mystery begins shortly.
        </p>
        <Link
          to="/lobby"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-primary text-white pl-5 pr-1.5 py-2 text-sm font-medium shadow-glow"
        >
          Enter Lobby
          <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20"><ArrowRight className="h-4 w-4" /></span>
        </Link>
      </div>
    </div>
  );
}

function Field({
  icon: Icon, label, hint, placeholder, value, onChange, type = "text",
}: { icon: any; label: string; hint?: string; placeholder: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      {hint && <span className="block text-[11px] text-white/55 mt-0.5">{hint}</span>}
      <div className="mt-2 relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl bg-white/5 border border-white/15 pl-4 pr-11 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
        <Icon className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
      </div>
    </label>
  );
}

function Meta({ icon: Icon, label, v1, v2 }: { icon: any; label: string; v1: string; v2: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-primary" /> {label}
      </div>
      <div className="mt-1 text-sm font-semibold">{v1}</div>
      <div className="text-[11px] text-muted-foreground">{v2}</div>
    </div>
  );
}
