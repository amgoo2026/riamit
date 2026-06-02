import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users, HandHeart, Target, Zap, MonitorPlay, ShieldCheck,
  Clock, Link2, Lock, Sparkles, Check, Crown,
  UserPlus, MailCheck, Share2, Gamepad2,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PillButton } from "@/components/PillButton";
import hero from "@/assets/hero.jpg";
import mystery from "@/assets/mystery.jpg";
import cook from "@/assets/cook.jpg";
import cta from "@/assets/cta.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zoventro — Interactive Team Engagement Platform" },
      { name: "description", content: "Turn team activities into interactive experiences. Built for HR, designed for real engagement. Setup in minutes, no IT required." },
      { property: "og:title", content: "Zoventro — Interactive Team Engagement" },
      { property: "og:description", content: "Boost engagement, collaboration and energy without complicated setups." },
    ],
  }),
  component: Home,
});

const FEATURES = [
  { icon: HandHeart, color: "text-info", bg: "bg-info/15", title: "Drive Real Participation, Not Just Attendance", desc: "Move beyond passive sessions where people just show up. Every participant actively contributes, interacts, and plays a role." },
  { icon: Users, color: "text-primary", bg: "bg-primary/15", title: "Turn Employees Into Active Contributors", desc: "Encourage real collaboration, not just observation. Participants think, respond, and engage with each other continuously." },
  { icon: Target, color: "text-success", bg: "bg-success/15", title: "Structured Activities With Clear Outcomes", desc: "Each activity is built with defined roles, rules, and objectives. Outcomes are clear, measurable, and aligned with team goals." },
  { icon: Zap, color: "text-pink", bg: "bg-pink/15", title: "Setup in Minutes, No Training Needed", desc: "Get started quickly without lengthy onboarding. The platform is intuitive and easy for both organizers and participants." },
  { icon: MonitorPlay, color: "text-warning", bg: "bg-warning/15", title: "No IT Required, Just Open and Play", desc: "Zoventro runs entirely in the browser. No app installations, no infrastructure, no IT tickets — just open and participate." },
  { icon: ShieldCheck, color: "text-white", bg: "bg-gradient-primary", title: "Secure and Time-Bound Access", desc: "Each package generates unique access credentials per participant. All access expires automatically after 5 days.", featured: true },
];

const STEPS = [
  { n: "01", icon: UserPlus, title: "Register & Choose a Package", desc: "The HR or Organizer registers using their official company email ID, selects the appropriate package, and completes payment.", meta: "Takes 2 minutes", metaIcon: Clock },
  { n: "02", icon: MailCheck, title: "Receive a unique join link", desc: "A secure, shareable access link is generated instantly after activation. Send it to participants via email or WhatsApp.", meta: "Instant setup", metaIcon: Link2 },
  { n: "03", icon: Share2, title: "Share Link & Start the Game", desc: "Participants open the link, enter their details, and verify via OTP. They join instantly, no login, no app download.", meta: "No passwords needed", metaIcon: Lock },
  { n: "04", icon: Gamepad2, title: "Start Game & Track Live", desc: "Teams are auto-grouped and ready to play with assigned roles. Track participation, groups, and results in real-time.", meta: "Zero manual effort", metaIcon: Sparkles },
];

const PLANS = [
  { name: "Trial Pack", price: "₹499", best: "Small teams, workshops, family events", includes: ["Up to 5 participants", "1 auto-created group", "Single session", "Lets you test before buying"] },
  { name: "Starter Pack", price: "₹2,999", best: "Training sessions, mid-size teams", includes: ["Up to 50 participants", "10 auto-created groups", "Even user distribution", "Instant activation"] },
  { name: "Growth Pack", price: "₹4,999", best: "Corporate events and team engagement", includes: ["Up to 100 participants", "20 auto-created groups", "Even user distribution", "Instant activation"], popular: true },
  { name: "Business Pack", price: "₹8,999", best: "Large corporate events and offsites", includes: ["Up to 300 participants", "60 auto-created groups", "Even user distribution", "Instant activation"] },
  { name: "Enterprise Pack", price: "₹19,999", best: "Enterprise-level brands", includes: ["Up to 500 participants", "100 auto-created groups", "Even user distribution", "Fully managed setup"] },
];

function Home() {
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative px-4 pt-6">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-hero">
          <img src={hero} alt="" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-purple-900/40 to-transparent" />
          <Header floating />
          <div className="relative px-6 md:px-14 pt-44 pb-24 max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.05]">
              Turn Teams Activities Into Interactive Experiences
            </h1>
            <p className="mt-5 text-white/80 max-w-md">
              Boost engagement, collaboration, and energy, without complicated setups.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/create"><PillButton variant="light">Get Started Now</PillButton></Link>
              <PillButton variant="outline-light" withArrow={false}>Explore Activities</PillButton>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-4 mt-20">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Built for HR. Designed for Real Team Engagement</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">Everything you need for structured, engaging team experiences, without operational overhead.</p>
        </div>
        <div className="mx-auto max-w-6xl mt-12 grid gap-5 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className={`group rounded-2xl p-7 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated ${f.featured ? "bg-gradient-primary text-white" : "bg-card hover:bg-gradient-primary hover:text-white"}`}
            >
              <div className={`mx-auto h-14 w-14 rounded-full grid place-items-center transition-colors duration-300 ${f.featured ? "bg-white/20" : `${f.bg} group-hover:bg-white/20`}`}>
                <f.icon className={`h-6 w-6 transition-colors duration-300 ${f.featured ? "text-white" : `${f.color} group-hover:text-white`}`} />
              </div>
              <h3 className={`mt-5 font-semibold text-lg ${f.featured ? "text-white" : ""}`}>{f.title}</h3>
              <p className={`mt-3 text-sm leading-relaxed transition-colors duration-300 ${f.featured ? "text-white/85" : "text-muted-foreground group-hover:text-white/85"}`}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ACTIVITIES */}
      <section id="activities" className="px-4 mt-24">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-gradient-soft p-10 md:p-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">Explore Interactive Experiences</h2>
            <p className="mt-3 text-muted-foreground">Designed to engage people, spark thinking, and create memorable moments.</p>
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <ActivityCard
              image={mystery}
              name="Mystery Quest"
              desc="A story-driven team challenge where employees collaborate, question, and compete to solve the case."
              bullets={[
                "Role-based activity (Investigator, Culprit, Witness, and more)",
                "Real-time questioning and deduction",
                "Time-bound challenges to maintain urgency",
                "Built for communication and strategic thinking",
              ]}
              footer="Builds stronger communication, sharper thinking, and real team collaboration in a high-energy environment."
            />
            <ActivityCard
              image={cook}
              name="Cook & Create"
              desc="A fast-paced creative challenge where teams collaborate to build something unique under constraints."
              bullets={[
                "Secret ingredient-based activity",
                "Step-by-step collaborative creation",
                "Limited actions per player for balanced participation",
                "Fun, unpredictable, and creative outcomes",
              ]}
              footer="Encourages creativity, quick thinking, and seamless team coordination in a playful setting."
              accent="warm"
            />
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="px-4 mt-24">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Choose Your Package</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">Packages are non-refundable once activated, as access is delivered digitally and instantly upon payment.</p>
        </div>
        <div className="mx-auto max-w-6xl mt-10 grid gap-5 md:grid-cols-3">
          {PLANS.slice(0, 3).map((p) => <PriceCard key={p.name} plan={p} />)}
        </div>
        <div className="mx-auto max-w-4xl mt-5 grid gap-5 md:grid-cols-2">
          {PLANS.slice(3).map((p) => <PriceCard key={p.name} plan={p} />)}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="px-4 mt-24">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-gradient-soft p-10 md:p-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">Simple Setup, Seamless Experience in easy steps</h2>
            <p className="mt-3 text-muted-foreground">From setup to session, everything is designed to be quick, clear, and effortless.</p>
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-2xl bg-card p-7 shadow-card">
                <div className="text-primary text-xs font-semibold tracking-widest border border-primary/30 inline-flex rounded-full px-3 py-1">{s.n}</div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-primary">
                      <s.metaIcon className="h-3.5 w-3.5" /> {s.meta}
                    </div>
                  </div>
                  <div className="h-20 w-20 rounded-2xl bg-purple-100 grid place-items-center shrink-0">
                    <s.icon className="h-9 w-9 text-primary" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COST PER EMPLOYEE */}
      <section id="cost" className="px-4 mt-24">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-6 items-stretch">
          <div className="rounded-[2rem] bg-card p-10 md:p-12 shadow-card flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">See your cost<br />per Employee</h2>
            <p className="mt-5 text-muted-foreground max-w-md">
              Estimate your cost instantly and plan your team engagement session.
            </p>
          </div>
          <CostCalculator />
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 mt-20">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] min-h-[340px] grid place-items-center text-center px-6">
          <img src={cta} alt="" width={1536} height={768} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 to-purple-900/70" />
          <div className="relative max-w-xl py-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Stop Planning. Start Engaging.</h2>
            <p className="mt-4 text-white/80">Most team activities take weeks to plan and still fall flat. Zoventro gets your team engaged in minutes — with zero follow-up headaches.</p>
            <div className="mt-7 flex flex-wrap gap-3 justify-center">
              <Link to="/create"><PillButton variant="light">Get Started Now</PillButton></Link>
              <PillButton variant="outline-light" withArrow={false}>Contact Us</PillButton>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ActivityCard({
  image,
  name,
  desc,
  bullets = [],
  footer,
  accent = "purple",
}: {
  image: string;
  name: string;
  desc: string;
  bullets?: string[];
  footer?: string;
  accent?: "purple" | "warm";
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl min-h-[460px] shadow-elevated group">
      <img src={image} alt={name} width={1024} height={768} loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className={`absolute inset-0 ${accent === "warm" ? "bg-gradient-to-r from-game-brown/85 via-game-brown/55 to-game-brown/30" : "bg-gradient-to-r from-purple-950/90 via-purple-900/65 to-purple-900/35"}`} />
      <div className="relative h-full flex flex-col md:flex-row gap-5 p-7 text-white">
        <div className="md:w-1/3 flex md:block justify-center shrink-0">
          <div className="h-28 w-28 md:h-36 md:w-36 rounded-2xl bg-white/10 backdrop-blur grid place-items-center p-3">
            <span className="text-center text-xs font-bold uppercase tracking-wider opacity-90">{name}</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <h3 className="text-3xl font-bold">{name}</h3>
          <p className="mt-3 text-sm text-white/85">{desc}</p>
          {bullets.length > 0 && (
            <ul className="mt-4 space-y-1.5 text-sm text-white/90 list-disc pl-5 marker:text-white/70">
              {bullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
          )}
          {footer && <p className="mt-4 text-sm text-white/80">{footer}</p>}
          <div className="mt-6">
            <button className="rounded-full bg-white/10 backdrop-blur border border-white/40 px-6 py-2.5 text-sm hover:bg-white hover:text-foreground transition">Explore Activity</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PriceCard({ plan }: { plan: typeof PLANS[number] }) {
  const popular = plan.popular;
  return (
    <div className={`group relative rounded-2xl p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated ${popular ? "bg-gradient-primary text-white" : "bg-card hover:bg-gradient-primary hover:text-white"}`}>
      {popular && (
        <div className="absolute -top-3 right-6 inline-flex items-center gap-1 rounded-full bg-warning text-foreground text-[10px] font-semibold uppercase tracking-wider px-3 py-1">
          <Crown className="h-3 w-3" /> Best Popular
        </div>
      )}
      <h3 className={`font-semibold text-lg ${popular ? "text-white" : ""}`}>{plan.name}</h3>
      <p className={`mt-1 text-xs transition-colors duration-300 ${popular ? "text-white/75" : "text-muted-foreground group-hover:text-white/75"}`}>Best for: {plan.best}</p>
      <div className="mt-5 flex items-baseline gap-2">
        <span className="text-3xl font-bold">{plan.price}</span>
        <span className={`text-xs transition-colors duration-300 ${popular ? "text-white/75" : "text-muted-foreground group-hover:text-white/75"}`}>One Time Payment</span>
      </div>
      <div className={`mt-5 pt-5 border-t transition-colors duration-300 ${popular ? "border-white/20" : "border-border group-hover:border-white/20"}`}>
        <p className={`text-xs font-semibold mb-3 ${popular ? "text-white/85" : "group-hover:text-white/85"}`}>This plan includes:</p>
        <ul className="space-y-2.5">
          {plan.includes.map((inc) => (
            <li key={inc} className="flex items-start gap-2 text-sm">
              <Check className={`h-4 w-4 mt-0.5 shrink-0 transition-colors duration-300 ${popular ? "text-white" : "text-success group-hover:text-white"}`} />
              <span className={`transition-colors duration-300 ${popular ? "text-white/90" : "text-foreground/80 group-hover:text-white/90"}`}>{inc}</span>
            </li>
          ))}
        </ul>
      </div>
      <button className={`mt-6 w-full inline-flex items-center justify-between rounded-full pl-5 pr-1.5 py-1.5 text-sm font-medium transition-colors duration-300 ${popular ? "bg-white text-primary" : "bg-gradient-primary text-white group-hover:bg-white group-hover:text-primary"}`}>
        Pay &amp; Activate
        <span className={`grid h-8 w-8 place-items-center rounded-full transition-colors duration-300 ${popular ? "bg-gradient-primary text-white" : "bg-white/20 group-hover:bg-gradient-primary group-hover:text-white"}`}>→</span>
      </button>
    </div>
  );
}

const COST_TIERS = [
  { cap: 5, price: 499, groups: 1, name: "Trial Pack" },
  { cap: 50, price: 2999, groups: 10, name: "Starter Pack" },
  { cap: 100, price: 4999, groups: 20, name: "Growth Pack" },
  { cap: 300, price: 8999, groups: 60, name: "Business Pack" },
  { cap: 500, price: 19999, groups: 100, name: "Enterprise Pack" },
];

function CostCalculator() {
  const [count, setCount] = useState(100);
  const tier = useMemo(() => COST_TIERS.find((t) => count <= t.cap) ?? COST_TIERS[COST_TIERS.length - 1], [count]);
  const perEmployee = Math.round(tier.price / Math.max(count, 1));

  return (
    <div className="rounded-[2rem] bg-gradient-soft p-6 md:p-8 shadow-card">
      <label className="block text-sm font-medium">How many employees are you engaging?</label>
      <div className="mt-4 flex items-center gap-4">
        <input
          type="range"
          min={1}
          max={500}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="flex-1 accent-primary h-1.5 rounded-full"
        />
        <span className="text-lg font-semibold w-14 text-right">{count}</span>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <StatCard value={`₹${perEmployee}`} label="Cost per employee" />
        <StatCard value={`₹${tier.price.toLocaleString("en-IN")}`} label="total package cost" />
        <StatCard value={String(tier.groups)} label="groups auto-formed" />
      </div>

      <div className="mt-4 rounded-2xl bg-card/70 p-5 text-sm">
        <p className="font-semibold mb-2">Simple Cost Breakdown:</p>
        <ul className="space-y-1.5 text-muted-foreground">
          <li><span className="text-primary font-medium">Zoventro {tier.name}</span> ({count} people) = ₹{tier.price.toLocaleString("en-IN")} | ₹{perEmployee}/person</li>
          <li><span className="text-primary font-medium">Hired facilitator</span> = ₹35,000 – ₹40,500 | no reporting</li>
          <li><span className="text-primary font-medium">Team Lunch</span> = ₹50,000 – | forgotten by next week</li>
        </ul>
      </div>

      <div className="mt-4 rounded-2xl bg-card/70 p-5 flex items-center gap-3">
        <div>
          <p className="text-xs text-muted-foreground">Recommended:</p>
          <span className="inline-block mt-1 rounded-full bg-gradient-primary text-white text-xs font-semibold px-3 py-1">{tier.name}</span>
        </div>
        <p className="text-xs text-muted-foreground flex-1">
          Zoventro is up to 5x more cost-effective than traditional team activities.
        </p>
      </div>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-card p-4 text-center shadow-card">
      <div className="text-lg font-bold text-primary">{value}</div>
      <div className="mt-1 text-[11px] text-muted-foreground leading-tight">{label}</div>
    </div>
  );
}
