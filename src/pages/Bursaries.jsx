import { useState, useMemo } from 'react';
import { GraduationCap, Calendar, MapPin, Wallet } from 'lucide-react';
import PageHero from '../components/PageHero';
import SearchFilterBar from '../components/SearchFilterBar';
import EmptyState from '../components/EmptyState';
import ListingCard from '../components/ListingCard';
import { AnimatedGrid } from '../components/AnimatedGrid';
import { bursaries } from '../data/listings';

const fields = [...new Set(bursaries.map((b) => b.field))];
const provinces = [...new Set(bursaries.map((b) => b.province))];

export default function Bursaries() {
  const [search, setSearch] = useState('');
  const [field, setField] = useState('');
  const [province, setProvince] = useState('');

  const filtered = useMemo(() => {
    return bursaries.filter((b) => {
      const matchesSearch =
        !search ||
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.provider.toLowerCase().includes(search.toLowerCase());
      const matchesField = !field || b.field === field;
      const matchesProvince = !province || b.province === province;
      return matchesSearch && matchesField && matchesProvince;
    });
  }, [search, field, province]);

  return (
    <div className="space-y-5">
      <PageHero
        icon={GraduationCap}
        title="Bursaries"
        subtitle="Find funding for your studies — from matric to postgrad."
        count={bursaries.length}
        gradient="from-emerald-400 to-[var(--color-violet)]"
      />

      <SearchFilterBar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search bursaries..."
        filters={[
          { label: 'All Fields', value: field, onChange: setField, options: fields },
          { label: 'All Provinces', value: province, onChange: setProvince, options: provinces },
        ]}
      />

      {filtered.length === 0 ? (
        <EmptyState
          title="No bursaries found"
          message="Try changing your search or filters. New bursaries are added regularly."
        />
      ) : (
        <AnimatedGrid>
          {filtered.map((b) => (
            <ListingCard
              key={b.id}
              item={b}
              type="bursary"
              accentColor={{
                badge: 'bg-emerald-50 text-emerald-600',
                button: 'bg-emerald-500',
              }}
              metaItems={[
                { icon: <MapPin size={12} />, label: b.province },
                { icon: <Wallet size={12} />, label: b.amount },
                { icon: <Calendar size={12} />, label: `Closes ${b.deadline}` },
              ]}
            />
          ))}
        </AnimatedGrid>
      )}
    </div>
  );
}
