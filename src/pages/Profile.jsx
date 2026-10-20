import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Star, Trophy, BookOpen, Briefcase, GraduationCap, Bookmark, History as HistoryIcon,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { bursaries, fundingOptions, courses } from '../data/listings';
import AnimatedCounter from '../components/AnimatedCounter';

function ProgressRow({ icon: Icon, label, value, goal, color }) {
  const pct = Math.min(100, (value / goal) * 100);
  const remaining = Math.max(0, goal - value);
  return (
    <div className="py-3">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-2 font-medium text-gray-800">
          <Icon size={15} className={color} />
          {label}
        </span>
        <span className="text-gray-500">{value} / {goal}</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full bg-sunrise"
        />
      </div>
      <p className="mt-1 text-xs text-gray-400">
        {remaining === 0 ? 'Goal reached!' : `${remaining} more to reach your goal`}
      </p>
    </div>
  );
}

export default function Profile() {
  const { user, saved, viewedCount, savedCountByType, totalSaved } = useApp();
  const [tab, setTab] = useState('saved');

  const allItems = [
    ...bursaries.map((b) => ({ ...b, type: 'bursary' })),
    ...fundingOptions.map((f) => ({ ...f, type: 'funding' })),
    ...courses.map((c) => ({ ...c, type: 'course' })),
  ];
  const savedItems = allItems.filter((item) => saved.some((s) => s.id === item.id && s.type === item.type));

  return (
    <div className="space-y-5">
      {/* Header card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl bg-[var(--color-ink)] p-6 text-white sm:p-7"
      >
        <div className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 animate-float-slow rounded-full bg-[var(--color-violet)]/25 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 left-10 h-32 w-32 animate-float-slower rounded-full bg-[var(--color-coral)]/20 blur-2xl" />

        <div className="relative flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
            <User size={26} />
          </div>
          <div>
            <h1 className="font-[var(--font-display)] text-xl font-bold">{user.name}</h1>
            <p className="text-sm text-white/70">{user.email}</p>
            <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-gold)]">
              <Star size={12} fill="currentColor" /> {user.role}
            </span>
          </div>
        </div>

        <div className="relative mt-5 grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-white/10 py-4 text-center ring-1 ring-white/10">
            <p className="font-[var(--font-display)] text-2xl font-bold"><AnimatedCounter value={totalSaved} /></p>
            <p className="text-sm text-white/70">Saved Items</p>
          </div>
          <div className="rounded-xl bg-white/10 py-4 text-center ring-1 ring-white/10">
            <p className="font-[var(--font-display)] text-2xl font-bold"><AnimatedCounter value={viewedCount} /></p>
            <p className="text-sm text-white/70">Items Viewed</p>
          </div>
        </div>
      </motion.div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:p-6"
      >
        <div className="mb-1 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sunrise text-white">
            <Trophy size={14} />
          </div>
          <h2 className="font-[var(--font-display)] text-base font-bold text-[var(--color-ink)]">My Progress</h2>
        </div>
        <div className="divide-y divide-gray-100">
          <ProgressRow icon={BookOpen} label="Courses Explored" value={savedCountByType('course')} goal={5} color="text-blue-500" />
          <ProgressRow icon={Briefcase} label="Funding Applications Saved" value={savedCountByType('funding')} goal={3} color="text-[var(--color-coral)]" />
          <ProgressRow icon={GraduationCap} label="Bursaries Saved" value={savedCountByType('bursary')} goal={3} color="text-emerald-500" />
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
      >
        <div className="relative grid grid-cols-2">
          <button
            onClick={() => setTab('saved')}
            className={`flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors ${
              tab === 'saved' ? 'text-[var(--color-ink)]' : 'text-gray-400 hover:bg-gray-50'
            }`}
          >
            <Bookmark size={15} /> Saved ({totalSaved})
          </button>
          <button
            onClick={() => setTab('history')}
            className={`flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors ${
              tab === 'history' ? 'text-[var(--color-ink)]' : 'text-gray-400 hover:bg-gray-50'
            }`}
          >
            <HistoryIcon size={15} /> History ({viewedCount})
          </button>
          <motion.div
            layout
            className="absolute bottom-0 h-0.5 w-1/2 bg-sunrise"
            animate={{ x: tab === 'saved' ? '0%' : '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
          />
        </div>

        <div className="border-t border-gray-100 p-5">
          <AnimatePresence mode="wait">
            {tab === 'saved' ? (
              <motion.div key="saved" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                {savedItems.length === 0 ? (
                  <p className="py-8 text-center text-sm text-gray-500">
                    Nothing saved yet. Bookmark a bursary, funding option, or course to see it here.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {savedItems.map((item, i) => (
                      <motion.li
                        key={`${item.type}-${item.id}`}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: i * 0.04 }}
                        className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3 transition-colors hover:bg-[var(--color-mist)]/50"
                      >
                        <span className="text-sm font-medium text-gray-800">{item.name}</span>
                        <span className="text-xs capitalize text-gray-400">{item.type}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ) : (
              <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                {viewedCount === 0 ? (
                  <p className="py-8 text-center text-sm text-gray-500">Hover over or open a listing to add it to your history.</p>
                ) : (
                  <p className="py-8 text-center text-sm text-gray-500">
                    You&rsquo;ve viewed {viewedCount} item{viewedCount === 1 ? '' : 's'} so far.
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
