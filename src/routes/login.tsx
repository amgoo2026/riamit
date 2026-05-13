import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — Zoventro" }] }),
  component: LoginPage,
});

function LoginPage() {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[oklch(0.965_0.012_290)] flex flex-col">
      <div className="pt-4">
        <Header />
      </div>
      <main className="flex-1 px-4 py-10">
        <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-2 rounded-3xl overflow-hidden bg-white shadow-card">
          <img src={hero} alt="Team" className="h-full w-full object-cover min-h-[420px]" />
          <div className="p-8 sm:p-12 flex flex-col justify-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Login to
              <br />
              <span className="text-gradient-primary">Access Your Organizer Dashboard</span>
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Manage your team activity, track participation, and run seamless team experiences.
            </p>

            {step === "email" ? (
              <EmailStep
                email={email}
                setEmail={setEmail}
                onNext={() => email.includes("@") && setStep("otp")}
              />
            ) : (
              <OtpStep
                email={email}
                onBack={() => setStep("email")}
                onVerify={() => navigate({ to: "/dashboard" })}
              />
            )}

            <div className="mt-10 text-xs text-muted-foreground">
              Don't have an account?
              <br />
              Choose Your Package &amp; Register.{" "}
              <Link to="/create" className="text-primary font-medium">Get Started Now</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function EmailStep({ email, setEmail, onNext }: { email: string; setEmail: (v: string) => void; onNext: () => void }) {
  return (
    <div className="mt-8">
      <label className="block text-sm font-semibold">Official Email ID</label>
      <p className="text-xs text-muted-foreground mt-0.5">An OTP will be sent to this email for verification</p>
      <div className="mt-3 relative">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your work email"
          className="w-full rounded-xl border border-border bg-background pl-4 pr-11 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
        <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
      <button
        onClick={onNext}
        className="mt-6 group inline-flex items-center gap-2 rounded-full bg-gradient-primary text-white pl-5 pr-1.5 py-2 text-sm font-medium shadow-glow"
      >
        Send Verification Code
        <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20"><ArrowRight className="h-4 w-4" /></span>
      </button>
    </div>
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
    <div className="mt-8">
      <label className="block text-sm font-semibold">Verify Your Email</label>
      <p className="text-xs text-muted-foreground mt-0.5">Enter the OTP sent to your email to continue.</p>
      <p className="text-xs mt-3">We have sent a 6-digit code to your email <span className="text-primary font-medium">{email || "you@company.com"}</span></p>
      <div className="mt-4 flex gap-2">
        {vals.map((v, i) => (
          <input
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            value={v}
            onChange={(e) => setAt(i, e.target.value)}
            onKeyDown={(e) => { if (e.key === "Backspace" && !vals[i] && i > 0) refs.current[i - 1]?.focus(); }}
            inputMode="numeric"
            maxLength={1}
            className="h-12 w-12 rounded-xl border border-border text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Didn't receive code? <button className="text-primary font-medium">Resend</button> · <button onClick={onBack} className="text-primary font-medium">Change Email</button>
      </p>
      <button
        onClick={() => filled && onVerify()}
        className={`mt-6 group inline-flex items-center gap-2 rounded-full text-white pl-5 pr-1.5 py-2 text-sm font-medium ${filled ? "bg-gradient-primary shadow-glow" : "bg-muted-foreground/40"}`}
      >
        Verify &amp; Proceed
        <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20"><ArrowRight className="h-4 w-4" /></span>
      </button>
    </div>
  );
}
