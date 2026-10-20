import { useState, useMemo } from 'react';
import { Briefcase, Wallet, Building2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import SearchFilterBar from '../components/SearchFilterBar';
import EmptyState from '../components/EmptyState';
import ListingCard from '../components/ListingCard';
import { AnimatedGrid } from '../components/AnimatedGrid';
import { fundingOptions } from '../data/listings';

const types = [...new Set(fundingOptions.map((f) => f.type))];
const sectors = [...new Set(fundingOptions.map((f) => f.sector))];

export default function Funding() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [sector, setSector] = useState('');

  const filtered = useMemo(() => {
    return fundingOptions.filter((f) => {
      const matchesSearch =
        !search ||
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.provider.toLowerCase().includes(search.toLowerCase());
      const matchesType = !type || f.type === type;
      const matchesSector = !sector || f.sector === sector;
      return matchesSearch && matchesType && matchesSector;
    });
  }, [search, type, sector]);

  return (
    <div className="space-y-5">
      <PageHero
        icon={Briefcase}
        title="Business Funding"
        subtitle="Grants, loans, and programs to start or grow your business."
        count={fundingOptions.length}
        gradient="from-[var(--color-coral)] to-[var(--color-violet)]"
      />

      <SearchFilterBar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search funding options..."
        filters={[
          { label: 'All Types', value: type, onChange: setType, options: types },
          { label: 'All Sectors', value: sector, onChange: setSector, options: sectors },
        ]}
      />

      {filtered.length === 0 ? (
        <EmptyState
          title="No funding options found"
          message="Try changing your search or filters. New opportunities are added regularly."
        />
      ) : (
        <AnimatedGrid>
          {filtered.map((f) => (
            <ListingCard
              key={f.id}
              item={f}
              type="funding"
              accentColor={{
                badge: 'bg-orange-50 text-orange-600',
                button: 'bg-orange-500',
              }}
              metaItems={[
                { icon: <Building2 size={12} />, label: f.type },
                { icon: <Wallet size={12} />, label: f.amount },
              ]}
            />
          ))}
        </AnimatedGrid>
      )}
    </div>
  );
}
