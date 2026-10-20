import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

export default function SearchFilterBar({ search, onSearchChange, filters, placeholder = 'Search...' }) {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <div className="relative flex-1">
        <Search
          size={17}
          className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
            focused ? 'text-[var(--color-violet)]' : 'text-gray-400'
          }`}
        />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-9 text-sm text-gray-700 placeholder:text-gray-400 transition-shadow focus:border-[var(--color-violet-light)] focus:outline-none focus:ring-4 focus:ring-[var(--color-violet)]/10"
        />
        {search && (
          <button
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-300 transition-colors hover:bg-gray-100 hover:text-gray-500"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {filters.map((f) => (
        <select
          key={f.label}
          value={f.value}
          onChange={(e) => f.onChange(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-700 transition-shadow focus:border-[var(--color-violet-light)] focus:outline-none focus:ring-4 focus:ring-[var(--color-violet)]/10 sm:w-44"
        >
          <option value="">{f.label}</option>
          {f.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ))}
    </motion.div>
  );
}
