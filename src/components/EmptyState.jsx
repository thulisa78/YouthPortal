import { motion } from 'framer-motion';
import { SearchX } from 'lucide-react';

export default function EmptyState({ title, message }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-mist)]"
      >
        <SearchX size={22} className="text-[var(--color-violet)]" />
      </motion.div>
      <p className="text-[15px] font-semibold text-[var(--color-ink)]">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-gray-500">{message}</p>
    </motion.div>
  );
}
