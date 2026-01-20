import { Sparkles } from 'lucide-react';
import { Opportunity } from '@/types/opportunity';
import { OpportunityCard } from './OpportunityCard';

interface RecommendationsSectionProps {
  opportunities: Opportunity[];
  onToggleSave: (id: string) => void;
}

export function RecommendationsSection({ opportunities, onToggleSave }: RecommendationsSectionProps) {
  if (opportunities.length === 0) return null;

  return (
    <section className="py-12 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="container">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              Recommended for You
            </h2>
            <p className="text-sm text-muted-foreground">
              Based on your interests and profile
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {opportunities.slice(0, 3).map((opportunity, index) => (
            <div
              key={opportunity.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <OpportunityCard opportunity={opportunity} onToggleSave={onToggleSave} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
