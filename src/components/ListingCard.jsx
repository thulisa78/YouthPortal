import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AnimatedItem } from './AnimatedGrid';

export default function ListingCard({ item, type, accentColor, metaItems }) {
  const { isSaved, toggleSaved, markViewed } = useApp();
  const saved = isSaved(item.id, type);

  return (
    <AnimatedItem>
      <motion.div
        onMouseEnter={() => markViewed(item.id)}
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_16px_36px_-16px_rgba(59,31,82,0.35)]"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-sunrise transition-transform duration-300 group-hover:scale-x-100"
        />

        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-[15px] font-bold text-[var(--color-ink)]">{item.name}</h3>
            <p className="mt-0.5 text-sm text-gray-500">{item.provider}</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.8 }}
            aria-label={saved ? 'Remove from saved' : 'Save'}
            onClick={() => toggleSaved(item.id, type)}
            className={`shrink-0 rounded-full p-2 transition-colors ${
              saved ? 'bg-amber-50 text-[var(--color-gold)]' : 'text-gray-300 hover:bg-gray-100 hover:text-gray-400'
            }`}
          >
            <motion.span
              animate={saved ? { scale: [1, 1.35, 1] } : { scale: 1 }}
              transition={{ duration: 0.35 }}
              className="block"
            >
              <Bookmark size={17} fill={saved ? 'currentColor' : 'none'} />
            </motion.span>
          </motion.button>
        </div>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-600">{item.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {metaItems.map((m, i) => (
            <span
              key={i}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${accentColor.badge}`}
            >
              {m.icon}
              {m.label}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block w-full rounded-xl py-2.5 text-center text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98] ${accentColor.button}`}
          >
            Learn more
          </a>
        </div>
      </motion.div>
    </AnimatedItem>
  );
}
