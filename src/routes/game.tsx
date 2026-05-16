import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  FileText, Lightbulb, Gamepad2, Camera, X, MapPin, Calendar, Cloud, Video,
  ZoomIn, ShieldCheck, Eye, AlertCircle, Send, Clock, UserX, ScanSearch,
  ThumbsUp, ThumbsDown,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import mystery from "@/assets/mystery.jpg";

export const Route = createFileRoute("/game")({
  head: () => ({ meta: [{ title: "Mystery Quest — Case Summary" }] }),
  component: GamePage,
});

const PEOPLE = [
  { role: "Farmer Leader", name: "Kartar Singh", short: "Kartar45", grad: "from-amber-700 via-orange-600 to-red-900",
    objective: "Unfold yourself and avoid suspicion.",
    youKnow: ["You visited at 10:00 PM for a compensation discussion.", "You left around 10:30 PM.", "The dispute had turned serious recently."],
    keep: ["Your motive is strong.", "Your answers must sound favorable.", "Maximize points."] },
  { role: "Son", name: "Vikram Malhotra", short: "Vikram36", grad: "from-slate-700 via-zinc-700 to-slate-900",
    objective: "Avoid showing direct involvement in the murder.",
    youKnow: ["You inherit the entire estate.", "You were inside the house that night.", "Tensions existed within the family."],
    keep: ["You can act as bystanders.", "You can use Lie Detector for 7 minutes.", "You can impersonate Son for bonus score."] },
  { role: "Daughter-in-law", name: "Priya Malhotra", short: "Priya32", grad: "from-fuchsia-700 via-purple-600 to-rose-900",
    objective: "Show comfort, your statement shapes the timeline.",
    youKnow: ["You heard a loud scream around midnight.", "You were favored at the time.", "You did not see anyone directly."],
    keep: ["Your testimony is critical.", "The only one who heard the scream.", "Maximize points."] },
  { role: "Servant", name: "Raju", short: "Raju48", grad: "from-emerald-800 via-green-700 to-zinc-900",
    objective: "Stay unnoticed while protecting your version of the truth.",
    youKnow: ["You have access to all areas of the house.", "You are unaware of late-night calls.", "You saw a fresh move that visitor."],
    keep: ["Silence can be safer than honesty.", "Reveal only what hurts you.", "Maximize points."] },
  { role: "Investigator", name: "(You)", short: "Mark32 (You)", grad: "from-violet-600 via-purple-700 to-purple-950",
    objective: "Find and rescue the case clipping before time runs out.",
    youKnow: ["Everyone in the house is a suspect.", "Statements may not be reliable.", "The timeline holds key inconsistencies."],
    keep: ["You can ask 5 questions.", "Restrict only what hurts you.", "You can interrogate any participant."] },
];

const PHOTOS = [mystery, mystery, mystery, mystery, mystery];

type Phase = "summary" | "investigation";
type ModalKey = null | "question" | "answer" | "vote" | "clue" | "accuse";

function GamePage() {
  const [phase, setPhase] = useState<Phase>("summary");
  const [secsHdr, setSecsHdr] = useState(24 * 60 + 58);
  const [secsCase, setSecsCase] = useState(4 * 60 + 58);
  const [openPerson, setOpenPerson] = useState<number | null>(null);
  const [secretOpened, setSecretOpened] = useState(false);
  const [openPhotos, setOpenPhotos] = useState(false);

  // investigation state
  const [selectedAskee, setSelectedAskee] = useState<number>(1);
  const [question, setQuestion] = useState("");
  const [modal, setModal] = useState<ModalKey>(null);
  const [questionsLeft, setQuestionsLeft] = useState(5);
  const [activity, setActivity] = useState<{ to: string; q: string; a?: string }[]>([
    { to: "Fred36", q: "Where were you between 10 PM - 11 PM", a: "I was in the study room." },
    { to: "Oni86", q: "Why did you visit the bungalow last night?" },
  ]);

  useEffect(() => {
    const t = setInterval(() => {
      setSecsHdr((s) => Math.max(0, s - 1));
      setSecsCase((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const sendQuestion = () => {
    if (!question.trim() || questionsLeft <= 0) return;
    setActivity((a) => [{ to: PEOPLE[selectedAskee].short, q: question.trim() }, ...a]);
    setQuestionsLeft((q) => q - 1);
    setModal("answer");
  };

  return (
    <div className="min-h-screen bg-[#0d0820] text-white p-4 md:p-6">
      {/* Header */}
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

      {phase === "summary" ? (
        <SummaryView
          fmt={fmt}
          secsCase={secsCase}
          secretOpened={secretOpened}
          setOpenPerson={setOpenPerson}
          setSecretOpened={setSecretOpened}
          setOpenPhotos={setOpenPhotos}
          onBegin={() => setPhase("investigation")}
        />
      ) : (
        <InvestigationView
          questionsLeft={questionsLeft}
          selectedAskee={selectedAskee}
          setSelectedAskee={setSelectedAskee}
          question={question}
          setQuestion={setQuestion}
          sendQuestion={sendQuestion}
          activity={activity}
          openModal={setModal}
          locked={modal === "answer"}
        />
      )}

      {openPerson !== null && <PersonModal person={PEOPLE[openPerson]} onClose={() => setOpenPerson(null)} />}
      {openPhotos && <PhotosModal onClose={() => setOpenPhotos(false)} />}
      {modal === "answer" && <AnswerModal target={PEOPLE[selectedAskee]} question={question} onClose={() => { setModal("vote"); }} />}
      {modal === "vote" && <VoteModal target={PEOPLE[selectedAskee]} question={question} onClose={() => { setQuestion(""); setModal(null); }} />}
      {modal === "clue" && <ClueRoomModal onClose={() => setModal(null)} />}
      {modal === "accuse" && <AccuseModal onClose={() => setModal(null)} />}
    </div>
  );
}

/* -------- Summary view (case briefing) -------- */
function SummaryView(props: {
  fmt: (s: number) => string; secsCase: number; secretOpened: boolean;
  setOpenPerson: (i: number) => void; setSecretOpened: (b: boolean) => void;
  setOpenPhotos: (b: boolean) => void; onBegin: () => void;
}) {
  const { fmt, secsCase, secretOpened, setOpenPerson, setSecretOpened, setOpenPhotos, onBegin } = props;
  return (
    <>
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

          <div className="mt-7 flex flex-wrap gap-3">
            <button onClick={() => setOpenPhotos(true)} className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold shadow-glow">
              <Camera className="h-4 w-4" /> View Investigation Photos
            </button>
            <button onClick={onBegin} className="inline-flex items-center gap-2 rounded-full bg-gradient-warm px-6 py-3 text-sm font-semibold shadow-glow">
              <ScanSearch className="h-4 w-4" /> Begin Investigation
            </button>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6">
            <h3 className="text-center text-lg font-bold">Key People in the Bungalow</h3>
            <div className="mt-5 grid grid-cols-5 gap-2.5">
              {PEOPLE.map((p, i) => (
                <button
                  key={p.role}
                  onClick={() => setOpenPerson(i)}
                  className={`group rounded-2xl border p-2 text-center transition hover:-translate-y-0.5 ${
                    p.role === "Investigator" ? "border-purple-400 ring-2 ring-purple-400/40 bg-purple-500/10" : "border-white/10 bg-white/5 hover:bg-white/10"
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

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-5 text-center">
              <p className="text-sm">Open the Secret Box to<br />reveal your role.</p>
              <div className="mx-auto mt-3 h-32 w-32 rounded-2xl bg-gradient-to-br from-purple-700 via-purple-900 to-indigo-950 grid place-items-center ring-2 ring-amber-400/40 shadow-elevated">
                <span className="text-5xl font-black text-amber-300">?</span>
              </div>
              <button
                disabled={secretOpened}
                onClick={() => { setOpenPerson(PEOPLE.findIndex(p => p.name === "(You)")); setSecretOpened(true); }}
                className={`mt-4 w-full rounded-full py-2.5 text-sm font-semibold shadow-glow ${secretOpened ? "bg-white/10 text-white/50 cursor-not-allowed" : "bg-gradient-primary"}`}
              >
                {secretOpened ? "Secret Box Opened" : "Open Secret Box"}
              </button>
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
    </>
  );
}

/* -------- Investigation view -------- */
function InvestigationView(props: {
  questionsLeft: number; selectedAskee: number; setSelectedAskee: (i: number) => void;
  question: string; setQuestion: (s: string) => void; sendQuestion: () => void;
  activity: { to: string; q: string; a?: string }[]; openModal: (m: ModalKey) => void;
  locked?: boolean;
}) {
  const { questionsLeft, selectedAskee, setSelectedAskee, question, setQuestion, sendQuestion, activity, openModal, locked = false } = props;
  const [invSecs, setInvSecs] = useState(18 * 60 + 42);
  useEffect(() => { const t = setInterval(() => setInvSecs((s) => Math.max(0, s - 1)), 1000); return () => clearInterval(t); }, []);
  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <>
      {/* Investigation toolbar */}
      <div className="mt-5 rounded-2xl border border-white/10 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 backdrop-blur p-4 flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-purple-500/30 grid place-items-center"><FileText className="h-5 w-5 text-purple-200" /></div>
          <h1 className="text-lg font-bold tracking-wide">Investigation</h1>
        </div>
        <div className="ml-auto flex items-center gap-3 flex-wrap">
          <div className="text-center">
            <button className="inline-flex items-center gap-2 rounded-full bg-emerald-500/90 hover:bg-emerald-500 px-4 py-2 text-xs font-semibold">
              <FileText className="h-4 w-4" /> Case Summary
            </button>
            <div className="text-[10px] text-emerald-300 mt-1">Available for 5:00 minutes only</div>
          </div>
          <div className="text-center">
            <div className="text-[11px] text-white/70">Investigation Time Left</div>
            <div className="text-amber-300 font-bold tabular-nums">{fmt(invSecs)}</div>
          </div>
          <div className="text-center">
            <div className="text-[11px] text-white/70">Questions Left</div>
            <div className="text-amber-300 font-bold">{questionsLeft}/5</div>
          </div>
          <div className="text-center">
            <button className="inline-flex items-center gap-2 rounded-full bg-gradient-blue px-4 py-2 text-xs font-semibold">
              <ScanSearch className="h-4 w-4" /> Lie Detector
            </button>
            <div className="text-[10px] text-emerald-300 mt-1">● Available</div>
          </div>
          <div className="text-center">
            <button onClick={() => openModal("clue")} className="inline-flex items-center gap-2 rounded-full bg-gradient-warm px-4 py-2 text-xs font-semibold">
              <Lightbulb className="h-4 w-4" /> Clue Room
            </button>
            <div className="text-[10px] text-amber-300 mt-1">● New Clue</div>
          </div>
          <button onClick={() => openModal("accuse")} className="inline-flex items-center gap-2 rounded-full bg-rose-600 hover:bg-rose-500 px-4 py-2 text-xs font-semibold">
            <UserX className="h-4 w-4" /> Final Accusation
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[260px_1fr_320px]">
        {/* Players */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-sm font-bold mb-4">Players</h3>
          <ul className="space-y-2">
            {PEOPLE.map((p, i) => (
              <li key={p.short} className={`rounded-xl border p-2 flex items-center gap-2 ${i === selectedAskee ? "border-purple-400 bg-purple-500/10" : "border-white/10 bg-white/5"}`}>
                <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${p.grad} grid place-items-center text-[10px] font-bold`}>{p.short.slice(0, 2)}</div>
                <div className="flex-1">
                  <div className="text-xs font-semibold">{p.short}</div>
                  <div className="text-[10px] text-emerald-400">● Available</div>
                </div>
                {i === 1 && <span className="text-[10px] text-amber-300 tabular-nums">01:15</span>}
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-xl bg-purple-500/10 border border-purple-400/30 p-3">
            <div className="text-[10px] text-white/70">Your Role</div>
            <div className="text-purple-300 font-black tracking-widest">INVESTIGATOR</div>
            <p className="text-[10px] text-white/70 mt-1">Ask up to 5 questions to uncover the truth and identify the Hidden Culprit</p>
          </div>
        </div>

        {/* Ask question */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-bold">Ask a Question</h3>
          <p className="text-xs text-white/70">Select a player to ask a question</p>
          <div className="mt-4 grid grid-cols-5 gap-2">
            {PEOPLE.map((p, i) => (
              <button key={p.short} onClick={() => setSelectedAskee(i)} className={`relative rounded-xl border p-2 text-center transition ${i === selectedAskee ? "border-purple-400 ring-2 ring-purple-400/40 bg-purple-500/10" : "border-white/10 bg-white/5 hover:bg-white/10"}`}>
                <div className={`mx-auto h-14 w-14 rounded-full bg-gradient-to-br ${p.grad} grid place-items-center`}>
                  <Eye className="h-5 w-5 text-white/80" />
                </div>
                <div className="mt-1.5 text-[11px] font-semibold">{p.short}</div>
                {i === selectedAskee && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-purple-500 ring-2 ring-purple-300" />}
              </button>
            ))}
          </div>
          <div className="mt-6">
            <label className="text-xs text-white/70">Type your question (max 120 characters)</label>
            <div className="mt-1 relative">
              <textarea value={question} onChange={(e) => setQuestion(e.target.value.slice(0, 120))}
                placeholder="Type your question here..."
                className="w-full h-28 rounded-xl bg-black/30 border border-white/10 p-3 text-sm placeholder:text-white/40 focus:outline-none focus:border-purple-400" />
              <span className="absolute bottom-2 right-3 text-[10px] text-white/50">{question.length}/120</span>
            </div>
          </div>
          <button onClick={sendQuestion} disabled={!question.trim()}
            className="mt-5 w-full rounded-full bg-gradient-primary py-3 text-sm font-semibold shadow-glow disabled:opacity-40">
            <Send className="h-4 w-4 inline mr-2" /> Send Question
          </button>
          <p className="mt-2 text-center text-[11px] text-white/60">All answers are visible to everyone after the player submits.</p>
        </div>

        {/* Activity + Score */}
        <div className="space-y-5">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-bold mb-3">Recent Activity</h3>
            <ul className="space-y-3 max-h-[320px] overflow-auto pr-1">
              {activity.map((a, i) => (
                <li key={i} className="rounded-xl bg-purple-500/10 border border-purple-400/20 p-3">
                  <div className="flex items-start gap-2">
                    <div className="h-7 w-7 rounded-full bg-purple-500/40 grid place-items-center text-[10px]">YA</div>
                    <div className="flex-1">
                      <div className="text-[11px] text-white/70">You asked <span className="text-pink-300 font-semibold">{a.to}</span></div>
                      <div className="text-xs">{a.q}</div>
                      <div className="text-[10px] text-white/40 mt-1">02:35</div>
                    </div>
                  </div>
                  {a.a && (
                    <div className="mt-2 flex items-start gap-2 border-t border-white/10 pt-2">
                      <div className="h-7 w-7 rounded-full bg-rose-500/40 grid place-items-center text-[10px]">{a.to.slice(0,2)}</div>
                      <div className="flex-1">
                        <div className="text-[11px] text-pink-300">{a.to} <span className="text-amber-300">Answered</span></div>
                        <div className="text-xs">{a.a}</div>
                        <div className="text-[10px] text-white/40 mt-1">03:37</div>
                      </div>
                    </div>
                  )}
                  {!a.a && (
                    <div className="mt-2 flex items-center gap-2 border-t border-white/10 pt-2">
                      <Clock className="h-3 w-3 text-amber-300" />
                      <span className="text-[11px] text-amber-300">Waiting for answer...</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-bold mb-3">Score Board</h3>
            <div className="grid grid-cols-5 gap-2 text-center text-[11px]">
              {[["You", 120], ["Oni86", 50], ["John32", 100], ["James45", 80], ["Fred36", 60]].map(([n, p]) => (
                <div key={n as string}>
                  <div className="text-white/70">{n}</div>
                  <div className="text-amber-300 font-bold">{p}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* -------- Modals -------- */
function Step({ time, text }: { time: string; text: string }) {
  return (
    <li className="relative flex gap-4">
      <span className="absolute -left-[22px] top-1.5 h-3 w-3 rounded-full bg-purple-400 ring-4 ring-purple-500/20" />
      <span className="text-purple-200 font-medium w-20 shrink-0">{time}</span>
      <span className="text-white/85">{text}</span>
    </li>
  );
}

function ModalShell({ children, onClose, max = "max-w-lg" }: { children: React.ReactNode; onClose: () => void; max?: string }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className={`relative w-full ${max} rounded-3xl border border-white/15 bg-purple-950/95 shadow-elevated`}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 h-9 w-9 grid place-items-center rounded-xl bg-purple-700/40 hover:bg-purple-600/60">
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
}

function PersonModal({ person, onClose }: { person: typeof PEOPLE[number]; onClose: () => void }) {
  return (
    <ModalShell onClose={onClose} max="max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] overflow-hidden rounded-3xl">
        <div className={`bg-gradient-to-br ${person.grad} grid place-items-center min-h-[260px]`}><Eye className="h-16 w-16 text-white/80" /></div>
        <div className="p-6">
          <div className="text-[11px] uppercase tracking-widest text-white/60">Your Role</div>
          <h2 className="text-3xl font-black text-purple-200">{person.role.toUpperCase()}</h2>
          <p className="mt-1 text-xs text-white/70">{person.objective}</p>
          <Section title="OBJECTIVE" items={[person.objective]} icon="🎯" />
          <Section title="WHAT YOU KNOW" items={person.youKnow} icon="💡" />
          <Section title="KEEP IN MIND" items={person.keep} icon="📌" />
          <div className="mt-4 flex items-center gap-2 text-xs text-white/60"><ShieldCheck className="h-3.5 w-3.5" /> Keep your role secret</div>
          <button onClick={onClose} className="mt-5 w-full rounded-full bg-gradient-primary py-2.5 text-sm font-semibold shadow-glow">Okay, Continue</button>
        </div>
      </div>
    </ModalShell>
  );
}

function Section({ title, items, icon }: { title: string; items: string[]; icon: string }) {
  return (
    <div className="mt-4">
      <div className="text-[11px] font-bold tracking-widest text-purple-300 flex items-center gap-2"><span>{icon}</span> {title}</div>
      <ul className="mt-1.5 space-y-1 text-xs text-white/85 list-disc pl-5">{items.map((t, i) => <li key={i}>{t}</li>)}</ul>
    </div>
  );
}

function PhotosModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell onClose={onClose} max="max-w-2xl">
      <div className="p-7">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full border border-purple-400/40 grid place-items-center"><Camera className="h-5 w-5 text-purple-300" /></div>
          <div><h3 className="text-lg font-bold">Investigation Photos</h3><p className="text-xs text-white/65">You can submit your accusation now.</p></div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {PHOTOS.map((src, i) => (
            <div key={i} className="relative group aspect-square overflow-hidden rounded-xl ring-1 ring-white/10 cursor-zoom-in">
              <img src={src} alt={`Evidence ${i + 1}`} className="h-full w-full object-cover" />
              <div className="absolute bottom-1.5 right-1.5 h-7 w-7 rounded-full bg-white/90 text-zinc-800 grid place-items-center"><ZoomIn className="h-3.5 w-3.5" /></div>
            </div>
          ))}
        </div>
        <p className="mt-5 text-center text-xs text-white/70">Check the image carefully, you might get clues.</p>
        <button onClick={onClose} className="mt-4 w-full rounded-full bg-gradient-primary py-3 text-sm font-semibold shadow-glow">Okay Continue</button>
      </div>
    </ModalShell>
  );
}

function AnswerModal({ target, question, onClose }: { target: typeof PEOPLE[number]; question: string; onClose: () => void }) {
  const [secs, setSecs] = useState(118);
  const [ans, setAns] = useState("");
  useEffect(() => { const t = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000); return () => clearInterval(t); }, []);
  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  return (
    <ModalShell onClose={onClose}>
      <div className="p-6">
        <div className="flex items-start gap-3">
          <div className="h-12 w-12 rounded-full bg-purple-700/40 grid place-items-center"><ShieldCheck className="h-5 w-5 text-purple-200" /></div>
          <div>
            <h3 className="text-lg font-bold">You have been asked a Question</h3>
            <p className="text-xs text-white/65">By SC (Investigator) in Lie Detector Mode</p>
          </div>
        </div>
        <div className="mt-5 rounded-2xl border border-white/10 bg-purple-500/10 p-4 text-center">
          <div className="text-[11px] text-white/60">Question</div>
          <div className="mt-1 text-base">{question || "Where were you between 10 PM - 11 PM"}</div>
        </div>
        <div className="mt-5 text-center">
          <Clock className="h-5 w-5 mx-auto text-white/60" />
          <div className="text-xs text-white/65 mt-1">Time Left to answer</div>
          <div className="text-2xl font-black text-amber-300 tabular-nums">{fmt(secs)}</div>
        </div>
        <div className="mt-5">
          <label className="text-xs text-white/70">Type your answer (max 120 characters)</label>
          <div className="mt-1 relative">
            <textarea value={ans} onChange={(e) => setAns(e.target.value.slice(0, 120))} placeholder="Type your answer here..." className="w-full h-24 rounded-xl bg-black/30 border border-white/10 p-3 text-sm placeholder:text-white/40 focus:outline-none focus:border-purple-400" />
            <span className="absolute bottom-2 right-3 text-[10px] text-white/50">{ans.length}/120</span>
          </div>
        </div>
        <button onClick={onClose} className="mt-4 w-full rounded-full bg-gradient-primary py-3 text-sm font-semibold shadow-glow">Submit Answer To Start Voting</button>
        <p className="mt-2 text-center text-[11px] text-white/60">Your answer will be visible to all players.</p>
      </div>
    </ModalShell>
  );
}

function VoteModal({ target, question, onClose }: { target: typeof PEOPLE[number]; question: string; onClose: () => void }) {
  const [vote, setVote] = useState<"believable" | "suspicious" | null>(null);
  return (
    <ModalShell onClose={onClose}>
      <div className="p-6">
        <div className="flex items-start gap-3">
          <div className="h-12 w-12 rounded-full bg-purple-700/40 grid place-items-center"><ShieldCheck className="h-5 w-5 text-purple-200" /></div>
          <div><h3 className="text-lg font-bold">Vote on the Answer</h3><p className="text-xs text-white/65">By SC (Investigator)</p></div>
        </div>
        <div className="mt-5 rounded-2xl border border-white/10 bg-purple-500/10 p-4 text-center">
          <div className="text-[11px] text-white/60">Question</div>
          <div className="mt-1 text-base">{question || "Where were you between 10 PM - 11 PM"}</div>
        </div>
        <div className="mt-4">
          <div className="text-xs text-pink-300 mb-1">{target.short} Answer</div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-sm">I was in the library reading a book.</div>
        </div>
        <div className="mt-5">
          <div className="text-xs text-pink-300 mb-2">Select Votes</div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setVote("believable")} className={`rounded-xl border py-3 text-sm font-semibold ${vote === "believable" ? "border-emerald-400 bg-emerald-500/20 text-emerald-300" : "border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10"}`}>
              <ThumbsUp className="h-4 w-4 inline mr-2" /> Believable
            </button>
            <button onClick={() => setVote("suspicious")} className={`rounded-xl border py-3 text-sm font-semibold ${vote === "suspicious" ? "border-rose-400 bg-rose-500/20 text-rose-300" : "border-rose-500/40 text-rose-300 hover:bg-rose-500/10"}`}>
              <ThumbsDown className="h-4 w-4 inline mr-2" /> Suspicious
            </button>
          </div>
        </div>
        <button onClick={onClose} disabled={!vote} className="mt-6 w-full rounded-full bg-gradient-primary py-3 text-sm font-semibold shadow-glow disabled:opacity-40">Submit Vote</button>
        <p className="mt-2 text-center text-[11px] text-white/60">Your votes will be visible to all players.</p>
      </div>
    </ModalShell>
  );
}

function ClueRoomModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell onClose={onClose} max="max-w-2xl">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full border border-amber-400/50 bg-amber-500/10 grid place-items-center"><Lightbulb className="h-5 w-5 text-amber-300" /></div>
          <h3 className="text-lg font-black tracking-widest">CLUE ROOM</h3>
          <span className="text-xs text-emerald-400">Unlocked at 10:00</span>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="aspect-square rounded-xl bg-gradient-to-br from-amber-700 to-amber-900 grid place-items-center text-amber-200 font-black tracking-widest">TOP SECRET</div>
            <div className="mt-3 text-amber-300 text-sm font-bold">Clue #1</div>
            <p className="text-xs text-white/80 mt-1">A torn page was found near the window outside the study room.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-amber-300 text-sm font-bold">Clue Details</div>
            <p className="text-xs text-white/80 mt-1">A piece of torn paper was discovered outside the study window.</p>
            <p className="text-xs text-white/80 mt-2">There are some written numbers on it. Could be important.</p>
            <div className="mt-3 rounded-xl bg-zinc-900 p-4 text-center font-mono text-amber-100">12 - 7 - 4 - 11<br />9 - 3</div>
          </div>
        </div>
        <p className="mt-5 text-center text-xs text-white/70">This clue is visible to all players. Use it wisely.</p>
      </div>
    </ModalShell>
  );
}

function AccuseModal({ onClose }: { onClose: () => void }) {
  const [pick, setPick] = useState<number | null>(1);
  const [reason, setReason] = useState("");
  return (
    <ModalShell onClose={onClose} max="max-w-2xl">
      <div className="p-6">
        <div className="flex items-start gap-3">
          <div className="h-12 w-12 rounded-full border border-rose-400/50 bg-rose-500/10 grid place-items-center"><UserX className="h-5 w-5 text-rose-300" /></div>
          <div><h3 className="text-lg font-bold">Make Your Final Accusation</h3><p className="text-xs text-white/65">You can submit your accusation now.</p></div>
        </div>
        <div className="mt-5 grid grid-cols-5 gap-2">
          {PEOPLE.map((p, i) => (
            <button key={p.short} onClick={() => setPick(i)} className={`relative rounded-xl border p-2 text-center ${pick === i ? "border-purple-400 ring-2 ring-purple-400/40 bg-purple-500/10" : "border-white/10 bg-white/5 hover:bg-white/10"}`}>
              <div className={`mx-auto h-14 w-14 rounded-full bg-gradient-to-br ${p.grad} grid place-items-center`}><Eye className="h-5 w-5 text-white/80" /></div>
              <div className="mt-1.5 text-[11px] font-semibold">{p.short}</div>
              {pick === i && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-purple-500 ring-2 ring-purple-300" />}
            </button>
          ))}
        </div>
        <div className="mt-5">
          <label className="text-xs text-white/80">Why do you think this player is the culprit? <span className="text-white/50">(Optional)</span></label>
          <div className="mt-1 relative">
            <textarea value={reason} onChange={(e) => setReason(e.target.value.slice(0, 120))} placeholder="Type your reason here..." className="w-full h-24 rounded-xl bg-black/30 border border-white/10 p-3 text-sm placeholder:text-white/40 focus:outline-none focus:border-purple-400" />
            <span className="absolute bottom-2 right-3 text-[10px] text-white/50">{reason.length}/120</span>
          </div>
        </div>
        <Link to="/results" onClick={onClose} className="mt-5 block text-center w-full rounded-full bg-gradient-primary py-3 text-sm font-semibold shadow-glow">Submit Answer</Link>
        <p className="mt-2 text-center text-[11px] text-white/60">Once submitted, you cannot change your answer.</p>
      </div>
    </ModalShell>
  );
}
