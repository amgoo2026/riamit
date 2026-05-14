import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  FileText, Lightbulb, Gamepad2, Camera, X, MapPin, Calendar, Cloud, Video,
  ZoomIn, ShieldCheck, Eye, AlertCircle,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import mystery from "@/assets/mystery.jpg";

export const Route = createFileRoute("/game")({
  head: () => ({ meta: [{ title: "Mystery Quest — Case Summary" }] }),
  component: GamePage,
});

const PEOPLE = [
  { role: "Farmer Leader", name: "Kartar Singh", grad: "from-amber-700 via-orange-600 to-red-900",
    objective: "Unfold yourself and avoid suspicion.",
    youKnow: ["You visited at 10:00 PM for a compensation discussion.", "You left around 10:30 PM.", "The dispute had turned serious recently."],
    keep: ["Your motive is strong.", "Your answers must sound favorable.", "Maximize points."] },
  { role: "Son", name: "Vikram Malhotra", grad: "from-slate-700 via-zinc-700 to-slate-900",
    objective: "Avoid showing direct involvement in the murder.",
    youKnow: ["You inherit the entire estate.", "You were inside the house that night.", "Tensions existed within the family."],
    keep: ["You can act as bystanders.", "You can use Lie Detector for 7 minutes.", "You can impersonate Son for bonus score."] },
  { role: "Daughter-in-law", name: "Priya Malhotra", grad: "from-fuchsia-700 via-purple-600 to-rose-900",
    objective: "Show comfort, your statement shapes the timeline.",
    youKnow: ["You heard a loud scream around midnight.", "You were favored at the time.", "You did not see anyone directly."],
    keep: ["Your testimony is critical.", "The only one who heard the scream.", "Maximize points."] },
  { role: "Servant", name: "Raju", grad: "from-emerald-800 via-green-700 to-zinc-900",
    objective: "Stay unnoticed while protecting your version of the truth.",
    youKnow: ["You have access to all areas of the house.", "You are unaware of late-night calls.", "You saw a fresh move that visitor."],
    keep: ["Silence can be safer than honesty.", "Reveal only what hurts you.", "Maximize points."] },
  { role: "Investigator", name: "(You)", grad: "from-violet-600 via-purple-700 to-purple-950",
    objective: "Find and rescue the case clipping before time runs out.",
    youKnow: ["Everyone in the house is a suspect.", "Statements may not be reliable.", "The timeline holds key inconsistencies."],
    keep: ["You can ask 5 questions.", "Restrict only what hurts you.", "You can interrogate any participant."] },
];

const PHOTOS = [mystery, mystery, mystery, mystery, mystery];

function GamePage() {
  const [secsHdr, setSecsHdr] = useState(24 * 60 + 58);
  const [secsCase, setSecsCase] = useState(4 * 60 + 58);
  const [openPerson, setOpenPerson] = useState<number | null>(null);
  const [secretOpened, setSecretOpened] = useState(false);
  const [openPhotos, setOpenPhotos] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setSecsHdr((s) => Math.max(0, s - 1));
      setSecsCase((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}: ${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-purple-900 text-white p-4 md:p-6">
      <header className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="font-semibold">Mystery Quest</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm">
            Game Time Remaining <span className="ml-2 font-bold tabular-nums">{fmt(secsHdr)}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 grid place-items-center text-xs font-bold">SK</div>
            <span className="text-sm">Sneha Kapoor</span>
          </div>
        </div>
      </header>

      <div className="mt-6 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-purple-500/30 grid place-items-center">
            <FileText className="h-5 w-5 text-purple-200" />
          </div>
          <h1 className="text-xl font-bold tracking-wide">CASE SUMMARY</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-full bg-gradient-blue px-5 py-2.5 text-sm font-semibold shadow-glow">
            <Lightbulb className="h-4 w-4" /> Strategy Guide
          </button>
          <button className="inline-flex items-center gap-2 rounded-full bg-gradient-warm px-5 py-2.5 text-sm font-semibold shadow-glow">
            <Gamepad2 className="h-4 w-4" /> View Game Rules
          </button>
        </div>
      </div>

      <main className="mt-5 grid gap-5 lg:grid-cols-[2fr_1.4fr]">
        {/* Case story */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-7 relative overflow-hidden">
          <h2 className="text-3xl font-black text-purple-200">The Bungalow Secret</h2>
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div className="space-y-4 text-sm leading-relaxed">
              <p>An old wealthy businessman, Raghav Malhotra, is <span className="text-rose-400 font-semibold">found dead</span> in his luxury bungalow.</p>
              <p>He was recently in a legal dispute with local farmers, accused of illegally taking their land for a "Dream City Project".</p>
              <p className="font-bold uppercase tracking-wider text-white/90">On the night of the murder</p>
              <ol className="space-y-3 border-l-2 border-purple-500/40 pl-4">
                <Step time="10:00 PM" text="A farmer leader visited him at 10:00 PM to finalize a compensation deal" />
                <Step time="10:30 PM" text="He left the house." />
                <Step time="12:00 AM" text="A loud scream was heard by the daughter-in-law" />
              </ol>
              <p>After that, the businessman was <span className="text-rose-400 font-semibold">found dead</span> in his room.</p>
              <div className="inline-block bg-amber-100/95 text-zinc-900 text-xs px-3 py-1.5 rounded-sm rotate-[-1deg]">
                Now, <span className="text-rose-700 font-bold">everyone</span> present in the house is a <span className="text-rose-700 font-bold">suspect.</span>
              </div>
            </div>

            {/* Polaroid stack */}
            <div className="relative min-h-[320px]">
              <div className="absolute top-2 left-4 rotate-[-6deg] rounded-md bg-white p-2 shadow-elevated">
                <img src={mystery} alt="" className="h-32 w-44 object-cover" />
              </div>
              <div className="absolute top-12 right-2 rotate-[5deg] rounded-md bg-white p-2 shadow-elevated">
                <div className="h-28 w-40 bg-gradient-to-br from-zinc-700 to-zinc-900 grid place-items-center">
                  <AlertCircle className="h-10 w-10 text-amber-300/70" />
                </div>
              </div>
              <div className="absolute bottom-0 left-2 right-6 rotate-[-2deg] rounded-md bg-amber-100/95 text-zinc-900 p-4 shadow-elevated">
                <div className="text-xs font-bold tracking-wider">QUICK FACTS</div>
                <ul className="mt-2 space-y-1 text-[12px]">
                  <li className="flex gap-2 items-center"><MapPin className="h-3.5 w-3.5" /> Location: Malhotra Bungalow</li>
                  <li className="flex gap-2 items-center"><Calendar className="h-3.5 w-3.5" /> 28th April, 11:00 PM - 12:30 AM</li>
                  <li className="flex gap-2 items-center"><Cloud className="h-3.5 w-3.5" /> Weather: Rainy Night</li>
                  <li className="flex gap-2 items-center"><Video className="h-3.5 w-3.5" /> CCTV: Not working due to storm</li>
                </ul>
              </div>
            </div>
          </div>

          <button
            onClick={() => setOpenPhotos(true)}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold shadow-glow"
          >
            <Camera className="h-4 w-4" /> View Investigation Photos
          </button>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Key People */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6">
            <h3 className="text-center text-lg font-bold">Key People in the Bungalow</h3>
            <div className="mt-5 grid grid-cols-5 gap-2.5">
              {PEOPLE.map((p, i) => (
                <button
                  key={p.role}
                  onClick={() => setOpenPerson(i)}
                  className={`group rounded-2xl border p-2 text-center transition hover:-translate-y-0.5 ${
                    p.role === "Investigator"
                      ? "border-purple-400 ring-2 ring-purple-400/40 bg-purple-500/10"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className={`aspect-[3/4] rounded-xl bg-gradient-to-br ${p.grad} ring-1 ring-white/10 grid place-items-center`}>
                    <Eye className="h-7 w-7 text-white/70 group-hover:scale-110 transition" />
                  </div>
                  <div className="mt-2 text-[11px] font-semibold leading-tight">{p.role}</div>
                  <div className="text-[11px] text-pink-400 leading-tight">{p.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Secret box */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-5 text-center">
              <p className="text-sm">Open the Secret Box to<br />reveal your role.</p>
              <div className="mx-auto mt-3 h-32 w-32 rounded-2xl bg-gradient-to-br from-purple-700 via-purple-900 to-indigo-950 grid place-items-center ring-2 ring-amber-400/40 shadow-elevated">
                <span className="text-5xl font-black text-amber-300">?</span>
              </div>
              <button onClick={() => setOpenPerson(PEOPLE.findIndex(p => p.name === "(You)"))} className="mt-4 w-full rounded-full bg-gradient-primary py-2.5 text-sm font-semibold shadow-glow">Open Secret Box</button>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-5 text-center flex flex-col">
              <p className="text-xs text-white/80">You can view the case summary only once. Remember the details!</p>
              <div className="mt-4 flex-1 rounded-2xl bg-white/5 border border-white/10 p-4 grid place-items-center">
                <div>
                  <div className="text-xs text-white/70">Time Remaining for Case Summary</div>
                  <div className="mt-2 text-3xl font-black tabular-nums">{fmt(secsCase)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Person modal */}
      {openPerson !== null && (
        <PersonModal person={PEOPLE[openPerson]} onClose={() => setOpenPerson(null)} />
      )}

      {/* Photos modal */}
      {openPhotos && <PhotosModal onClose={() => setOpenPhotos(false)} />}
    </div>
  );
}

function Step({ time, text }: { time: string; text: string }) {
  return (
    <li className="relative flex gap-4">
      <span className="absolute -left-[22px] top-1.5 h-3 w-3 rounded-full bg-purple-400 ring-4 ring-purple-500/20" />
      <span className="text-purple-200 font-medium w-20 shrink-0">{time}</span>
      <span className="text-white/85">{text}</span>
    </li>
  );
}

function PersonModal({ person, onClose }: { person: typeof PEOPLE[number]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-3xl border border-white/15 bg-purple-950/95 shadow-elevated overflow-hidden"
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 h-8 w-8 grid place-items-center rounded-full bg-white/10 hover:bg-white/20">
          <X className="h-4 w-4" />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
          <div className={`bg-gradient-to-br ${person.grad} grid place-items-center min-h-[260px]`}>
            <Eye className="h-16 w-16 text-white/80" />
          </div>
          <div className="p-6">
            <div className="text-[11px] uppercase tracking-widest text-white/60">Your Role</div>
            <h2 className="text-3xl font-black text-purple-200">{person.role.toUpperCase()}</h2>
            <p className="mt-1 text-xs text-white/70">{person.objective}</p>

            <Section title="OBJECTIVE" items={[person.objective]} icon="🎯" />
            <Section title="WHAT YOU KNOW" items={person.youKnow} icon="💡" />
            <Section title="KEEP IN MIND" items={person.keep} icon="📌" />

            <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
              <ShieldCheck className="h-3.5 w-3.5" /> Keep your role secret
            </div>

            <button onClick={onClose} className="mt-5 w-full rounded-full bg-gradient-primary py-2.5 text-sm font-semibold shadow-glow">
              Okay, Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, items, icon }: { title: string; items: string[]; icon: string }) {
  return (
    <div className="mt-4">
      <div className="text-[11px] font-bold tracking-widest text-purple-300 flex items-center gap-2">
        <span>{icon}</span> {title}
      </div>
      <ul className="mt-1.5 space-y-1 text-xs text-white/85 list-disc pl-5">
        {items.map((t, i) => <li key={i}>{t}</li>)}
      </ul>
    </div>
  );
}

function PhotosModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-3xl border border-white/15 bg-purple-950/95 shadow-elevated p-7"
      >
        <button onClick={onClose} className="absolute top-4 right-4 h-9 w-9 grid place-items-center rounded-xl bg-purple-700/40 hover:bg-purple-600/60">
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full border border-purple-400/40 grid place-items-center">
            <Camera className="h-5 w-5 text-purple-300" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Investigation Photos</h3>
            <p className="text-xs text-white/65">You can submit your accusation now.</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {PHOTOS.map((src, i) => (
            <div key={i} className="relative group aspect-square overflow-hidden rounded-xl ring-1 ring-white/10 cursor-zoom-in">
              <img src={src} alt={`Evidence ${i + 1}`} className="h-full w-full object-cover" />
              <div className="absolute bottom-1.5 right-1.5 h-7 w-7 rounded-full bg-white/90 text-zinc-800 grid place-items-center">
                <ZoomIn className="h-3.5 w-3.5" />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-5 text-center text-xs text-white/70">Check the image carefully, you might get clues.</p>
        <button onClick={onClose} className="mt-4 w-full rounded-full bg-gradient-primary py-3 text-sm font-semibold shadow-glow">
          Okay Continue
        </button>
      </div>
    </div>
  );
}
