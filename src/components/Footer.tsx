import { Instagram, Facebook, Linkedin, MessageCircle, ArrowUp } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer id="contact" className="bg-card mt-16">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
              Corporate &amp; Event Engagement<br />Gaming Platform
            </p>
          </div>
          <Col title="Pages" items={["Home", "Pricing", "Blog", "Contact", "FAQs", "Login"]} />
          <Col title="Legal" items={["Privacy Policy", "Legal Policy", "Refund Policy", "Terms & Conditions"]} />
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-primary mb-3">CONTACT</h4>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>+91 9112340092</li>
              <li>support@zoventro.com</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-primary mb-3">FOLLOW US</h4>
            <div className="flex gap-2">
              {[Instagram, MessageCircle, Facebook, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground/70 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>© 2026 zoventro.com All Rights Reserved</span>
          <span className="max-w-md text-center">
            Zoventro is a digital team engagement platform. All activities are organized and managed by the designated HR contact or event organizer of the respective organization.
          </span>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="grid h-10 w-10 place-items-center rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-xs font-semibold tracking-widest text-primary mb-3">{title.toUpperCase()}</h4>
      <ul className="space-y-2 text-sm text-foreground/80">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="hover:text-primary transition-colors">{i}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
