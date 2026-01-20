import { Bookmark, BookmarkCheck, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Opportunity, OpportunityType } from '@/types/opportunity';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onToggleSave: (id: string) => void;
}

const typeLabels: Record<OpportunityType, string> = {
  scholarship: 'Scholarship',
  job: 'Job',
  grant: 'Grant',
  program: 'Program',
};

function getDaysUntilDeadline(deadline: Date): number {
  const now = new Date();
  const diff = deadline.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function getDeadlineStatus(days: number): { label: string; variant: 'urgent' | 'warning' | 'secondary' } {
  if (days <= 3) return { label: `${days} day${days !== 1 ? 's' : ''} left`, variant: 'urgent' };
  if (days <= 14) return { label: `${days} days left`, variant: 'warning' };
  return { label: `${days} days left`, variant: 'secondary' };
}

export function OpportunityCard({ opportunity, onToggleSave }: OpportunityCardProps) {
  const daysLeft = getDaysUntilDeadline(opportunity.deadline);
  const deadlineStatus = getDeadlineStatus(daysLeft);

  return (
    <Card className="group relative overflow-hidden border-border bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
      {opportunity.isNew && (
        <div className="absolute top-0 right-0">
          <Badge variant="new" className="rounded-none rounded-bl-lg">
            New
          </Badge>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <Badge variant={opportunity.type} className="mb-2">
              {typeLabels[opportunity.type]}
            </Badge>
            <h3 className="font-display text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {opportunity.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{opportunity.organization}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleSave(opportunity.id)}
            className="shrink-0 hover:bg-primary/10"
          >
            {opportunity.isSaved ? (
              <BookmarkCheck className="h-5 w-5 text-primary" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {opportunity.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {opportunity.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap items-center gap-4 pt-3 border-t border-border">
        <div className="flex items-center gap-1.5 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Badge variant={deadlineStatus.variant} className="font-medium">
            {deadlineStatus.label}
          </Badge>
        </div>

        {opportunity.amount && (
          <span className="text-sm font-semibold text-success">
            {opportunity.amount}
          </span>
        )}

        {opportunity.location && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="truncate max-w-[120px]">{opportunity.location}</span>
          </div>
        )}

        <Button variant="ghost" size="sm" className="ml-auto gap-1 text-primary hover:text-primary">
          View Details
          <ExternalLink className="h-3.5 w-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
