import { motion } from 'framer-motion';

export default function PageHero({ icon: Icon, title, subtitle, count, gradient }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} px-6 py-7 text-white shadow-[0_10px_30px_-12px_rgba(59,31,82,0.5)] sm:px-8 sm:py-8`}
    >
      {/* signature sunrise motif */}
      <div className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 animate-float-slow rounded-full bg-white/10 blur-sm" />
      <div className="pointer-events-none absolute -bottom-16 right-10 h-32 w-32 animate-float-slower rounded-full bg-white/10" />

      <div className="relative flex items-start gap-4">
        <motion.div
          initial={{ scale: 0.6, rotate: -12, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'backOut' }}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm"
        >
          <Icon size={22} strokeWidth={2.25} />
        </motion.div>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-[var(--font-display)] text-2xl font-bold sm:text-[28px]">{title}</h1>
          </div>
          <p className="mt-1 text-[15px] text-white/90">
            {subtitle}{' '}
            <span className="ml-1 inline-flex items-center rounded-full bg-white/25 px-2.5 py-0.5 align-middle text-xs font-semibold">
              {count} available
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
