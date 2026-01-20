export type OpportunityType = 'scholarship' | 'job' | 'grant' | 'program';

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  type: OpportunityType;
  description: string;
  deadline: Date;
  amount?: string;
  location?: string;
  tags: string[];
  isNew?: boolean;
  isSaved?: boolean;
  url?: string;
}
