import { Opportunity } from '@/types/opportunity';
import { OpportunityCard } from './OpportunityCard';
import { SearchX } from 'lucide-react';

interface OpportunitiesGridProps {
  opportunities: Opportunity[];
  onToggleSave: (id: string) => void;
  title: string;
  subtitle?: string;
}

export function OpportunitiesGrid({ opportunities, onToggleSave, title, subtitle }: OpportunitiesGridProps) {
  return (
    <section className="py-12">
      <div className="container">
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </div>

        {opportunities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mb-4">
              <SearchX className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground">No opportunities found</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-md">
              Try adjusting your search or filters to discover more opportunities.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {opportunities.map((opportunity, index) => (
              <div
                key={opportunity.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <OpportunityCard opportunity={opportunity} onToggleSave={onToggleSave} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
