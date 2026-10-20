import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Map, ExternalLink, Calendar, Building2, ChevronDown, Search } from 'lucide-react';
import PageHero from '../components/PageHero';
import { AnimatedGrid, AnimatedItem } from '../components/AnimatedGrid';

const LEARNERSHIPS = [
  // Government
  { id: 1, title: 'IT Learnership (NQF 5)', org: 'Department of Public Service and Administration', type: 'Government', sector: 'IT & Technology', province: 'Gauteng', deadline: '2025-07-31', duration: '12 months', stipend: 'R3 500/month', url: '#', description: 'Gain practical IT skills while working in government. Covers networking, support and software.' },
  { id: 2, title: 'Finance Learnership', org: 'National Treasury', type: 'Government', sector: 'Finance', province: 'Gauteng', deadline: '2025-08-15', duration: '18 months', stipend: 'R4 000/month', url: '#', description: 'Structured learnership in public finance management, budgeting and reporting.' },
  { id: 3, title: 'Human Resources Learnership', org: 'City of Cape Town', type: 'Municipality', sector: 'Human Resources', province: 'Western Cape', deadline: '2025-09-01', duration: '12 months', stipend: 'R3 200/month', url: '#', description: 'HR learnership supporting recruitment, employee relations and people management.' },
  // SETAs
  { id: 4, title: 'Software Development Learnership', org: 'MICT SETA', type: 'SETA', sector: 'IT & Technology', province: 'National', deadline: '2025-07-15', duration: '12 months', stipend: 'R4 500/month', url: '#', description: 'Learn software development fundamentals — HTML, CSS, JavaScript, and introductory Python.' },
  { id: 5, title: 'Wholesale & Retail Learnership', org: 'W&R SETA', type: 'SETA', sector: 'Retail', province: 'National', deadline: '2025-08-30', duration: '12 months', stipend: 'R2 800/month', url: '#', description: 'Retail operations learnership covering stock management, customer service and merchandising.' },
  { id: 6, title: 'Banking Learnership (NQF 4)', org: 'BANKSETA', type: 'SETA', sector: 'Finance', province: 'National', deadline: '2025-07-20', duration: '12 months', stipend: 'R3 000/month', url: '#', description: 'Entry-level banking operations: teller skills, compliance, and financial products.' },
  { id: 7, title: 'Construction Learnership', org: 'CETA', type: 'SETA', sector: 'Construction', province: 'National', deadline: '2025-09-15', duration: '24 months', stipend: 'R2 500/month', url: '#', description: 'Construction trades learnership covering bricklaying, plumbing, and project management basics.' },
  // Graduate Programmes
  { id: 8, title: 'Technology Graduate Programme', org: 'Standard Bank', type: 'Graduate Programme', sector: 'IT & Technology', province: 'Gauteng', deadline: '2025-06-30', duration: '24 months', stipend: 'R18 000/month', url: '#', description: 'Structured 2-year graduate programme for IT and data science graduates. Rotational programme across business units.' },
  { id: 9, title: 'Finance Graduate Programme', org: 'Investec', type: 'Graduate Programme', sector: 'Finance', province: 'Gauteng', deadline: '2025-07-31', duration: '18 months', stipend: 'R22 000/month', url: '#', description: 'Rotational graduate programme for finance, economics, and accounting graduates.' },
  { id: 10, title: 'Engineering Internship', org: 'Eskom', type: 'Graduate Programme', sector: 'Engineering', province: 'National', deadline: '2025-08-01', duration: '12 months', stipend: 'R12 000/month', url: '#', description: 'Practical engineering internship for final-year and recent engineering graduates.' },
  // Municipalities
  { id: 11, title: 'Data Analyst Internship', org: 'Johannesburg Metro', type: 'Municipality', sector: 'IT & Technology', province: 'Gauteng', deadline: '2025-07-01', duration: '12 months', stipend: 'R6 000/month', url: '#', description: 'Work with city data to improve service delivery. Requires basic SQL or Excel skills.' },
  { id: 12, title: 'Environmental Management Internship', org: 'eThekwini Municipality', type: 'Municipality', sector: 'Environment', province: 'KwaZulu-Natal', deadline: '2025-09-30', duration: '12 months', stipend: 'R4 500/month', url: '#', description: 'Environmental planning and waste management internship in the Durban metro.' },
];

const TYPES = [...new Set(LEARNERSHIPS.map(l => l.type))];
const SECTORS = [...new Set(LEARNERSHIPS.map(l => l.sector))];
const PROVINCES = [...new Set(LEARNERSHIPS.map(l => l.province))];

const TYPE_STYLE = {
  'Government':        'bg-blue-50 text-blue-700',
  'SETA':              'bg-emerald-50 text-emerald-700',
  'Graduate Programme':'bg-purple-50 text-purple-700',
  'Municipality':      'bg-orange-50 text-orange-700',
};

export default function Learnerships() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [sector, setSector] = useState('');
  const [province, setProvince] = useState('');

  const filtered = useMemo(() => {
    return LEARNERSHIPS.filter(l => {
      const q = search.toLowerCase();
      const matchSearch = !search || l.title.toLowerCase().includes(q) || l.org.toLowerCase().includes(q) || l.sector.toLowerCase().includes(q);
      return matchSearch && (!type || l.type === type) && (!sector || l.sector === sector) && (!province || l.province === province);
    });
  }, [search, type, sector, province]);

  const deadlineSoon = (d) => {
    if (!d) return false;
    const diff = (new Date(d) - new Date()) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 21;
  };

  return (
    <div className="space-y-5">
      <PageHero
        icon={Map}
        title="Learnerships & Internships"
        subtitle="Opportunities from government, SETAs, municipalities, and companies."
        count={LEARNERSHIPS.length}
        gradient="from-pink-500 to-[var(--color-violet)]"
      />

      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="rounded-2xl border border-black/5 bg-white p-4 space-y-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
      >
        <div className="relative">
          <Search size={15} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title, organisation, or sector..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'All Types', value: type, onChange: setType, options: TYPES },
            { label: 'All Sectors', value: sector, onChange: setSector, options: SECTORS },
            { label: 'All Provinces', value: province, onChange: setProvince, options: PROVINCES },
          ].map(({ label, value, onChange, options }) => (
            <div key={label} className="relative">
              <select
                value={value}
                onChange={e => onChange(e.target.value)}
                className="h-9 rounded-full border border-gray-200 bg-white pl-3 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 appearance-none"
              >
                <option value="">{label}</option>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-2.5 text-gray-400" />
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400">{filtered.length} opportunit{filtered.length === 1 ? 'y' : 'ies'} found</p>
      </motion.div>

      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-dashed border-gray-300 py-14 text-center"
        >
          <Map size={36} className="mx-auto mb-3 text-gray-300" />
          <p className="font-semibold text-gray-500">No opportunities match your filters</p>
          <p className="mt-1 text-sm text-gray-400">Try adjusting your search or clearing filters.</p>
        </motion.div>
      ) : (
        <AnimatedGrid>
          {filtered.map(l => (
            <AnimatedItem key={l.id}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="group flex h-full flex-col rounded-2xl border border-black/5 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_16px_36px_-16px_rgba(59,31,82,0.35)]"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${TYPE_STYLE[l.type] || 'bg-gray-100 text-gray-600'}`}>
                  {l.type}
                </span>
                {deadlineSoon(l.deadline) && (
                  <span className="rounded-full bg-orange-50 px-2 py-0.5 text-xs font-semibold text-orange-600">Closing soon</span>
                )}
              </div>
              <h3 className="font-bold text-gray-900 leading-snug">{l.title}</h3>
              <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                <Building2 size={13} strokeWidth={2} />
                <span>{l.org}</span>
              </div>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-gray-500">{l.description}</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-gray-50 px-2.5 py-1.5">
                  <p className="text-gray-400">Duration</p>
                  <p className="font-semibold text-gray-700">{l.duration}</p>
                </div>
                <div className="rounded-lg bg-gray-50 px-2.5 py-1.5">
                  <p className="text-gray-400">Stipend</p>
                  <p className="font-semibold text-gray-700">{l.stipend}</p>
                </div>
                <div className="rounded-lg bg-gray-50 px-2.5 py-1.5">
                  <p className="text-gray-400">Province</p>
                  <p className="font-semibold text-gray-700">{l.province}</p>
                </div>
                <div className="rounded-lg bg-gray-50 px-2.5 py-1.5">
                  <p className="text-gray-400">Deadline</p>
                  <p className={`font-semibold ${deadlineSoon(l.deadline) ? 'text-orange-600' : 'text-gray-700'}`}>{l.deadline}</p>
                </div>
              </div>
              <a
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-pink-500 to-[var(--color-violet)] py-2 text-xs font-semibold text-white transition-transform hover:brightness-110 active:scale-[0.98]"
              >
                Apply Now <ExternalLink size={11} />
              </a>
            </motion.div>
            </AnimatedItem>
          ))}
        </AnimatedGrid>
      )}
    </div>
  );
}
