import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, Check } from 'lucide-react';

const quickLinks = [
  { label: 'Bursaries', to: '/bursaries' },
  { label: 'Funding Options', to: '/funding' },
  { label: 'Free Courses', to: '/courses' },
  { label: 'My Profile', to: '/profile' },
];

const resources = [
  { label: 'Blog', to: '#' },
  { label: 'FAQ', to: '#' },
  { label: 'Contact Us', to: '#' },
  { label: 'Privacy Policy', to: '#' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3500);
  };

  return (
    <footer className="relative overflow-hidden border-t border-black/5 bg-[var(--color-ink)] text-white">
      <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-[var(--color-violet)]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-[var(--color-coral)]/15 blur-3xl" />

      {/* Newsletter strip */}
      <div className="relative mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-[var(--font-display)] text-lg font-bold">Get new opportunities in your inbox</h3>
            <p className="mt-1 text-sm text-white/60">Fresh bursaries, funding rounds, and free courses — once a week, no spam.</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full max-w-sm gap-2 sm:w-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full min-w-0 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-[var(--color-violet-light)] focus:outline-none focus:ring-4 focus:ring-[var(--color-violet)]/20"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-sunrise px-4 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_-4px_rgba(124,58,237,0.6)] transition-transform hover:scale-105"
            >
              {subscribed ? (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1.5">
                  <Check size={15} /> Subscribed
                </motion.span>
              ) : (
                <>
                  Subscribe <ArrowRight size={14} />
                </>
              )}
            </motion.button>
          </form>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sunrise text-base font-bold text-white shadow-sm">
                Y
              </div>
              <span className="font-[var(--font-display)] text-lg font-bold">
                Youth<span className="text-sunrise">Rise</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              Empowering South African youth with access to bursaries, funding, and free courses to build their future.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-white">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.to} className="text-sm text-white/60 transition-colors hover:text-[var(--color-coral-light)]">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-white">Resources</h3>
            <ul className="space-y-2.5">
              {resources.map((l) => (
                <li key={l.label}>
                  <a href={l.to} className="text-sm text-white/60 transition-colors hover:text-[var(--color-coral-light)]">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-white">Contact</h3>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <Mail size={16} className="mt-0.5 shrink-0 text-[var(--color-coral-light)]" />
                <a href="mailto:info@youthrise.org.za" className="break-all text-sm text-white/60 transition-colors hover:text-[var(--color-coral-light)]">
                  info@youthrise.org.za
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone size={16} className="mt-0.5 shrink-0 text-[var(--color-coral-light)]" />
                <a href="tel:+27603420528" className="text-sm text-white/60 transition-colors hover:text-[var(--color-coral-light)]">
                  +27 (60) 342 0528
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--color-coral-light)]" />
                <p className="text-sm text-white/60">Johannesburg, South Africa</p>
              </div>
            </div>
          </div>
        </div>

        <div className="my-8 border-t border-white/10" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/40">© {currentYear} YouthRise. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {['f', '𝕏', 'in', '◉'].map((s, i) => (
              <a
                key={i}
                href="#"
                aria-label="social link"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white/50 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
