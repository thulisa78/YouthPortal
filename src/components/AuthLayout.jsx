import { motion } from 'framer-motion';
import { Sparkles, GraduationCap, Briefcase, BookOpen } from 'lucide-react';

const floaters = [
  { icon: GraduationCap, label: 'Bursaries', delay: 0 },
  { icon: Briefcase, label: 'Funding', delay: 0.15 },
  { icon: BookOpen, label: 'Free courses', delay: 0.3 },
];

export default function AuthLayout({ eyebrow, title, subtitle, children }) {
  return (
    <div className="flex min-h-screen bg-[var(--color-cream)]">
      {/* Brand panel */}
      <div className="relative hidden w-[44%] shrink-0 overflow-hidden bg-[var(--color-ink)] text-white lg:flex lg:flex-col lg:justify-between lg:p-10">
        <div className="pointer-events-none absolute inset-x-0 -bottom-32 h-72 animate-sunrise-sweep bg-[radial-gradient(60%_100%_at_50%_100%,var(--color-coral)_0%,var(--color-violet)_45%,transparent_75%)] opacity-70 blur-2xl" />
        <div className="pointer-events-none absolute -right-16 top-16 h-40 w-40 animate-float-slow rounded-full bg-[var(--color-gold)]/20 blur-2xl" />

        <a href="/" className="relative flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sunrise text-base font-bold text-white shadow-sm">Y</div>
          <span className="font-[var(--font-display)] text-lg font-bold">
            Youth<span className="text-sunrise">Rise</span>
          </span>
        </a>

        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/15">
            <Sparkles size={13} className="text-[var(--color-gold)]" /> Youth Empowerment Portal
          </span>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-bold leading-tight">
            Your future starts with one login.
          </h2>
          <p className="mt-3 max-w-sm text-sm text-white/60">
            Bursaries, funding, free courses, and career tools — all in one free place, built for South
            African youth.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {floaters.map(({ icon: Icon, label, delay }) => (
              <motion.span
                key={label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + delay }}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium ring-1 ring-white/10"
              >
                <Icon size={13} className="text-[var(--color-coral-light)]" /> {label}
              </motion.span>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-white/30">© {new Date().getFullYear()} YouthRise. Free, forever.</p>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full max-w-md rounded-2xl border border-black/5 bg-white px-6 py-8 shadow-[0_20px_50px_-24px_rgba(59,31,82,0.35)] sm:px-8"
        >
          <div className="mb-7 lg:hidden">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sunrise text-lg font-bold text-white shadow-sm">
              Y
            </div>
          </div>
          <div className="mb-7 text-center">
            {eyebrow && (
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-mist)] px-3 py-1 text-xs font-semibold text-[var(--color-violet)]">
                {eyebrow}
              </span>
            )}
            <h1 className="font-[var(--font-display)] text-2xl font-bold text-[var(--color-ink)]">{title}</h1>
            <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
          </div>
          {children}
        </motion.div>
      </div>
    </div>
  );
}
