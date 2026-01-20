import { Search, Briefcase, GraduationCap, Coins, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { OpportunityType } from '@/types/opportunity';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: OpportunityType | 'all';
  onFilterChange: (filter: OpportunityType | 'all') => void;
}

const filters: { type: OpportunityType | 'all'; label: string; icon: React.ReactNode }[] = [
  { type: 'all', label: 'All', icon: null },
  { type: 'scholarship', label: 'Scholarships', icon: <GraduationCap className="h-4 w-4" /> },
  { type: 'job', label: 'Jobs', icon: <Briefcase className="h-4 w-4" /> },
  { type: 'grant', label: 'Grants', icon: <Coins className="h-4 w-4" /> },
  { type: 'program', label: 'Programs', icon: <Users className="h-4 w-4" /> },
];

export function HeroSection({ searchQuery, onSearchChange, activeFilter, onFilterChange }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-info/5 py-16 md:py-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-info/10 blur-3xl" />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl animate-fade-in">
            Discover Your Next{' '}
            <span className="bg-gradient-to-r from-primary via-info to-primary bg-clip-text text-transparent">
              Opportunity
            </span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Find scholarships, jobs, grants, and programs tailored to your goals. 
            Never miss a deadline with personalized reminders.
          </p>

          {/* Search bar */}
          <div className="mt-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative mx-auto max-w-2xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search opportunities by keyword, organization, or location..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="h-14 rounded-2xl border-border bg-card pl-12 pr-4 text-base shadow-card focus:shadow-card-hover transition-shadow"
              />
            </div>
          </div>

          {/* Filter tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {filters.map((filter) => (
              <Button
                key={filter.type}
                variant={activeFilter === filter.type ? 'default' : 'secondary'}
                size="sm"
                onClick={() => onFilterChange(filter.type)}
                className="rounded-full"
              >
                {filter.icon}
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
