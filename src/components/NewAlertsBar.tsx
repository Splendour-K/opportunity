import { Bell, X, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface NewAlertsBarProps {
  count: number;
  onDismiss: () => void;
}

export function NewAlertsBar({ count, onDismiss }: NewAlertsBarProps) {
  if (count === 0) return null;

  return (
    <div className="gradient-new text-primary-foreground">
      <div className="container flex items-center justify-between py-2.5">
        <div className="flex items-center gap-3">
          <Bell className="h-4 w-4 animate-bounce-soft" />
          <span className="text-sm font-medium">
            {count} new opportunit{count !== 1 ? 'ies' : 'y'} match{count === 1 ? 'es' : ''} your interests!
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 text-primary-foreground hover:bg-primary-foreground/20 gap-1"
          >
            View All
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-primary-foreground hover:bg-primary-foreground/20"
          onClick={onDismiss}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
