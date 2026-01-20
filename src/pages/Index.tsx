import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { NewAlertsBar } from '@/components/NewAlertsBar';
import { HeroSection } from '@/components/HeroSection';
import { RecommendationsSection } from '@/components/RecommendationsSection';
import { OpportunitiesGrid } from '@/components/OpportunitiesGrid';
import { Footer } from '@/components/Footer';
import { mockOpportunities } from '@/data/mockOpportunities';
import { OpportunityType, Opportunity } from '@/types/opportunity';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<OpportunityType | 'all'>('all');
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [showAlerts, setShowAlerts] = useState(true);

  const savedCount = useMemo(() => 
    opportunities.filter(o => o.isSaved).length, 
    [opportunities]
  );

  const newCount = useMemo(() => 
    opportunities.filter(o => o.isNew).length, 
    [opportunities]
  );

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(opportunity => {
      const matchesSearch = searchQuery === '' || 
        opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opportunity.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opportunity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opportunity.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesFilter = activeFilter === 'all' || opportunity.type === activeFilter;
      
      return matchesSearch && matchesFilter;
    });
  }, [opportunities, searchQuery, activeFilter]);

  const recommendedOpportunities = useMemo(() => 
    opportunities.filter(o => o.isNew || o.type === 'scholarship').slice(0, 3),
    [opportunities]
  );

  const handleToggleSave = (id: string) => {
    setOpportunities(prev => 
      prev.map(o => 
        o.id === id ? { ...o, isSaved: !o.isSaved } : o
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {showAlerts && <NewAlertsBar count={newCount} onDismiss={() => setShowAlerts(false)} />}
      <Header savedCount={savedCount} newAlerts={showAlerts ? newCount : 0} />
      
      <main className="flex-1">
        <HeroSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <RecommendationsSection
          opportunities={recommendedOpportunities}
          onToggleSave={handleToggleSave}
        />

        <OpportunitiesGrid
          opportunities={filteredOpportunities}
          onToggleSave={handleToggleSave}
          title="All Opportunities"
          subtitle={`${filteredOpportunities.length} opportunities available`}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
