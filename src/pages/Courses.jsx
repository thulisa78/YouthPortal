import { useState, useMemo } from 'react';
import { BookOpen, Clock, Award } from 'lucide-react';
import PageHero from '../components/PageHero';
import SearchFilterBar from '../components/SearchFilterBar';
import EmptyState from '../components/EmptyState';
import ListingCard from '../components/ListingCard';
import { AnimatedGrid } from '../components/AnimatedGrid';
import { courses } from '../data/listings';

const categories = [...new Set(courses.map((c) => c.category))];
const levels = [...new Set(courses.map((c) => c.level))];

export default function Courses() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchesSearch =
        !search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.provider.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !category || c.category === category;
      const matchesLevel = !level || c.level === level;
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [search, category, level]);

  return (
    <div className="space-y-5">
      <PageHero
        icon={BookOpen}
        title="Free Courses"
        subtitle="Upskill yourself for free — many courses include certificates."
        count={courses.length}
        gradient="from-[var(--color-violet)] to-[var(--color-coral)]"
      />

      <SearchFilterBar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search courses..."
        filters={[
          { label: 'All Categories', value: category, onChange: setCategory, options: categories },
          { label: 'All Levels', value: level, onChange: setLevel, options: levels },
        ]}
      />

      {filtered.length === 0 ? (
        <EmptyState
          title="No courses found"
          message="Try changing your search or filters. New courses are added regularly."
        />
      ) : (
        <AnimatedGrid>
          {filtered.map((c) => (
            <ListingCard
              key={c.id}
              item={c}
              type="course"
              accentColor={{
                badge: 'bg-purple-50 text-purple-600',
                button: 'bg-gradient-to-r from-blue-500 to-purple-600',
              }}
              metaItems={[
                { icon: <Clock size={12} />, label: c.duration },
                ...(c.certificate ? [{ icon: <Award size={12} />, label: 'Certificate' }] : []),
              ]}
            />
          ))}
        </AnimatedGrid>
      )}
    </div>
  );
}
