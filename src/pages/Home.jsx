import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles, GraduationCap, Briefcase, BookOpen, Lightbulb, TrendingUp, Users, Map,
  Zap, ClipboardList, FileText, ArrowRight, ArrowUpRight,
} from 'lucide-react';
import { bursaries, fundingOptions, courses } from '../data/listings';
import { useApp } from '../context/AppContext';
import AnimatedCounter from '../components/AnimatedCounter';

const stats = [
  { key: 'bursaries', label: 'Bursaries', icon: GraduationCap, color: 'text-emerald-500 bg-emerald-50' },
  { key: 'funding', label: 'Funding Options', icon: Briefcase, color: 'text-[var(--color-coral)] bg-orange-50' },
  { key: 'courses', label: 'Free Courses', icon: BookOpen, color: 'text-[var(--color-violet)] bg-[var(--color-mist)]' },
];

const opportunities = [
  {
    to: '/bursaries',
    icon: GraduationCap,
    title: 'Bursaries',
    description: 'Find bursaries for your studies — from matric to postgrad. Filter by field, province, and deadline.',
    bg: 'from-emerald-50 to-emerald-100/60',
    iconBg: 'bg-emerald-500',
    linkColor: 'text-emerald-600',
  },
  {
    to: '/funding',
    icon: Briefcase,
    title: 'Business Funding',
    description: 'Discover grants, loans, and programs to start or grow your business. Government and private sector options.',
    bg: 'from-orange-50 to-red-50/60',
    iconBg: 'bg-[var(--color-coral)]',
    linkColor: 'text-[var(--color-coral)]',
  },
  {
    to: '/courses',
    icon: BookOpen,
    title: 'Free Courses',
    description: 'Upskill yourself for free — tech, business, trades, and more. Many come with certificates.',
    bg: 'from-violet-50 to-purple-100/60',
    iconBg: 'bg-[var(--color-violet)]',
    linkColor: 'text-[var(--color-violet)]',
  },
];

const features = [
  {
    to: '/job-tracker',
    icon: ClipboardList,
    title: 'Job Application Tracker',
    description: 'Track every application, get interview and follow-up reminders, and see your success rate at a glance.',
    iconBg: 'bg-blue-500',
    cardBg: 'from-blue-50/80 to-blue-100/40',
    border: 'border-blue-100',
  },
  {
    to: '/cv-builder',
    icon: FileText,
    title: 'AI CV Builder',
    description: 'Upload your CV, get ATS compatibility feedback, a rewritten profile summary, and keyword suggestions.',
    iconBg: 'bg-[var(--color-violet)]',
    cardBg: 'from-violet-50/80 to-fuchsia-50/40',
    border: 'border-violet-100',
  },
  {
    to: '/learnerships',
    icon: Map,
    title: 'Learnerships & Internships',
    description: 'Opportunities from government, SETAs, municipalities, and graduate programmes — all in one place.',
    iconBg: 'bg-pink-500',
    cardBg: 'from-pink-50/80 to-rose-50/40',
    border: 'border-pink-100',
  },
  {
    to: '/skills-roadmaps',
    icon: TrendingUp,
    title: 'Free Skills Roadmaps',
    description: 'Pick a career path and see exactly which skills, free courses, projects, and certificates you need.',
    iconBg: 'bg-emerald-500',
    cardBg: 'from-green-50/80 to-teal-50/40',
    border: 'border-green-100',
  },
  {
    to: '/mentorship',
    icon: Users,
    title: 'Mentorship',
    description: 'Connect with volunteer professionals for career advice, industry insights, and network access.',
    iconBg: 'bg-[var(--color-coral)]',
    cardBg: 'from-orange-50/80 to-red-50/40',
    border: 'border-orange-100',
  },
];

const tips = [
  { icon: '1', color: 'bg-emerald-500', text: 'Apply early — most bursaries close months before the school year starts.' },
  { icon: '2', color: 'bg-[var(--color-coral)]', text: 'Save opportunities you like so you can come back to them later.' },
  { icon: '3', color: 'bg-blue-500', text: 'Free courses with certificates look great on your CV.' },
  { icon: '4', color: 'bg-[var(--color-violet)]', text: 'Government funding programs often have less competition — don\u2019t skip them.' },
];

const rotatingWords = ['Bursaries.', 'Funding.', 'Free skills.', 'Mentors.', 'Momentum.'];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Home() {
  const { user, isLoggedIn } = useApp();
  const firstName = isLoggedIn ? user.name.split(' ')[0] : 'there';
  const [wordIndex, setWordIndex] = useState(0);
  const [feedIndex, setFeedIndex] = useState(0);

  const counts = {
    bursaries: bursaries.length,
    funding: fundingOptions.length,
    courses: courses.length,
  };

  const feed = useMemo(
    () => [
      { label: 'Bursary', name: bursaries[0]?.name, meta: bursaries[0]?.provider, to: '/bursaries', color: 'bg-emerald-500' },
      { label: 'Funding', name: fundingOptions[0]?.name, meta: fundingOptions[0]?.provider, to: '/funding', color: 'bg-[var(--color-coral)]' },
      { label: 'Course', name: courses[0]?.name, meta: courses[0]?.provider, to: '/courses', color: 'bg-[var(--color-violet)]' },
      { label: 'Bursary', name: bursaries[1]?.name, meta: bursaries[1]?.provider, to: '/bursaries', color: 'bg-emerald-500' },
    ].filter((f) => f.name),
    []
  );

  useEffect(() => {
    const t = setInterval(() => setWordIndex((i) => (i + 1) % rotatingWords.length), 2000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setFeedIndex((i) => (i + 1) % feed.length), 3200);
    return () => clearInterval(t);
  }, [feed.length]);

  return (
    <div className="space-y-8">
      {/* ===== Hero ===== */}
      <div className="relative overflow-hidden rounded-[28px] bg-[var(--color-ink)] px-6 py-10 text-white sm:px-10 sm:py-14">
        {/* signature sunrise arc */}
        <div className="pointer-events-none absolute inset-x-0 -bottom-40 h-80 animate-sunrise-sweep bg-[radial-gradient(60%_100%_at_50%_100%,var(--color-coral)_0%,var(--color-violet)_45%,transparent_75%)] opacity-70 blur-2xl" />
        <div className="pointer-events-none absolute -right-10 top-10 h-40 w-40 animate-float-slow rounded-full bg-[var(--color-gold)]/20 blur-2xl" />
        <div className="pointer-events-none absolute left-10 top-24 h-24 w-24 animate-float-slower rounded-full bg-[var(--color-violet)]/30 blur-2xl" />

        <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/15"
            >
              <Sparkles size={13} className="text-[var(--color-gold)]" /> Youth Empowerment Portal
            </motion.span>

            <motion.h1 variants={fadeUp} className="mt-4 font-[var(--font-display)] text-[32px] font-bold leading-[1.1] sm:text-[44px]">
              Hey {firstName} 👋
              <br />
              Everything you need is{' '}
              <span className="relative inline-block h-[1.15em] w-[7ch] align-bottom sm:w-[8ch]">
                {rotatingWords.map((w, i) => (
                  <motion.span
                    key={w}
                    className="absolute left-0 top-0 whitespace-nowrap text-sunrise"
                    initial={false}
                    animate={
                      i === wordIndex
                        ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                        : { opacity: 0, y: i < wordIndex ? -14 : 14, filter: 'blur(3px)' }
                    }
                    transition={{ duration: 0.45, ease: 'easeInOut' }}
                  >
                    {w}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-4 max-w-lg text-[15px] text-white/70">
              Whether you need money for school, want to start a business, or just want to learn new
              skills — we&rsquo;ve got you. Everything in one place, completely free.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/bursaries"
                className="group inline-flex items-center gap-2 rounded-full bg-sunrise px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(124,58,237,0.65)] transition-transform duration-200 hover:scale-105 active:scale-95"
              >
                Start exploring
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/skills-roadmaps"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/15 transition-colors hover:bg-white/15"
              >
                <Zap size={14} /> See a roadmap
              </Link>
            </motion.div>
          </motion.div>

          {/* Interactive live opportunity feed */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
            className="relative"
          >
            <div className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10 backdrop-blur-sm">
              <p className="mb-3 flex items-center gap-1.5 px-1 text-xs font-semibold uppercase tracking-wider text-white/40">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Fresh on YouthRise
              </p>
              <div className="relative h-[104px]">
                {feed.map((f, i) => (
                  <motion.div
                    key={f.name + i}
                    initial={false}
                    animate={
                      i === feedIndex
                        ? { opacity: 1, y: 0, pointerEvents: 'auto' }
                        : { opacity: 0, y: 10, pointerEvents: 'none' }
                    }
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="absolute inset-0"
                  >
                    <Link to={f.to} className="group flex h-full flex-col justify-between rounded-xl bg-white/95 p-4 text-[var(--color-ink)] shadow-lg">
                      <div>
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white ${f.color}`}>
                          {f.label}
                        </span>
                        <p className="mt-2 truncate text-sm font-bold">{f.name}</p>
                        <p className="truncate text-xs text-gray-500">{f.meta}</p>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-semibold text-[var(--color-violet)] opacity-0 transition-opacity group-hover:opacity-100">
                        View <ArrowUpRight size={12} />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-3 flex justify-center gap-1.5">
                {feed.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setFeedIndex(i)}
                    aria-label={`Show item ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === feedIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ===== Stats ===== */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {stats.map(({ key, label, icon: Icon, color }) => (
          <motion.div
            key={key}
            variants={fadeUp}
            whileHover={{ y: -3 }}
            className="flex flex-col items-center rounded-2xl border border-black/5 bg-white py-6 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_14px_30px_-16px_rgba(59,31,82,0.35)]"
          >
            <div className={`mb-2 flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
              <Icon size={19} strokeWidth={2.25} />
            </div>
            <p className="font-[var(--font-display)] text-2xl font-bold text-[var(--color-ink)]">
              <AnimatedCounter value={counts[key]} />
            </p>
            <p className="text-sm text-gray-500">{label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* ===== Explore Opportunities ===== */}
      <div>
        <h2 className="mb-3 font-[var(--font-display)] text-lg font-bold text-[var(--color-ink)]">Explore Opportunities</h2>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ show: { transition: { staggerChildren: 0.09 } } }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {opportunities.map((op) => (
            <motion.div
              key={op.to}
              variants={fadeUp}
              whileHover={{ y: -5 }}
              className={`flex flex-col rounded-2xl bg-gradient-to-br ${op.bg} p-5 transition-shadow hover:shadow-[0_16px_36px_-18px_rgba(59,31,82,0.4)]`}
            >
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${op.iconBg} text-white`}>
                <op.icon size={19} strokeWidth={2.25} />
              </div>
              <h3 className="font-bold text-[var(--color-ink)]">{op.title}</h3>
              <p className="mt-1 flex-1 text-sm leading-relaxed text-gray-600">{op.description}</p>
              <Link to={op.to} className={`group mt-3 flex items-center gap-1 text-sm font-semibold ${op.linkColor}`}>
                Explore now
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ===== What Makes It Stand Out ===== */}
      <div className="rounded-2xl border border-black/5 bg-gradient-to-br from-white to-[var(--color-mist)]/60 p-6">
        <h2 className="mb-1 font-[var(--font-display)] text-lg font-bold text-[var(--color-ink)]">What Makes YouthRise Stand Out</h2>
        <p className="mb-4 text-sm text-gray-500">Tools designed specifically for what South African youth actually need.</p>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div key={feature.to} variants={fadeUp}>
              <Link
                to={feature.to}
                className={`group flex h-full flex-col rounded-xl border ${feature.border} bg-gradient-to-br ${feature.cardBg} p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
              >
                <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${feature.iconBg} text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <feature.icon size={18} strokeWidth={2} />
                </div>
                <h3 className="font-semibold text-[var(--color-ink)]">{feature.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{feature.description}</p>
                <span className="mt-3 flex items-center gap-1 text-xs font-semibold text-gray-500 transition-colors group-hover:text-[var(--color-violet)]">
                  Open <ArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ===== Quick Tips ===== */}
      <div className="rounded-2xl border border-black/5 bg-gradient-to-br from-[var(--color-mist)]/60 to-blue-50/40 p-5">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sunrise text-white">
            <Lightbulb size={15} />
          </div>
          <h2 className="font-[var(--font-display)] text-base font-bold text-[var(--color-ink)]">Quick Tips</h2>
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          {tips.map((tip, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.015 }}
              className="flex items-start gap-3 rounded-xl bg-white/80 p-3 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${tip.color}`}>
                {tip.icon}
              </span>
              <p className="text-sm text-gray-600">{tip.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
