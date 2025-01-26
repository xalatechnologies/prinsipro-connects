import React from 'react';
import { Navbar } from '@/components/Navbar';
import { SearchBar } from '@/components/SearchBar';
import { ChatBot } from '@/components/ChatBot';
import { TourButton } from '@/components/tour/TourButton';
import { OnboardingTour } from '@/components/tour/OnboardingTour';
import { ToastProvider } from '@/components/ui/toast';

interface MainLayoutProps {
  children: React.ReactNode;
  onSearch: (type: string, id: string) => void;
  onAreaSelect: (areaId: string) => void;
  onViewChange: (view: string) => void;
  currentView: string;
  showTour: boolean;
  tourKey: number;
  onTourComplete: () => void;
  onTourStart: () => void;
}

export function MainLayout({
  children,
  onSearch,
  onAreaSelect,
  onViewChange,
  currentView,
  showTour,
  tourKey,
  onTourComplete,
  onTourStart
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div data-tour="navbar" className="sticky top-0 z-50 bg-white shadow-sm">
        <Navbar 
          onAreaSelect={onAreaSelect} 
          onViewChange={onViewChange} 
          currentView={currentView} 
        />
      </div>
      
      <div className="container mx-auto">
        <div data-tour="search" className="py-8">
          <SearchBar onResultClick={onSearch} />
        </div>
        
        <main className="pb-16">
          {children}
        </main>
      </div>

      <div data-tour="chat" className="fixed bottom-6 right-6 z-40">
        <ChatBot onNavigate={onSearch} />
      </div>

      <TourButton onClick={onTourStart} />
      
      {showTour && (
        <OnboardingTour 
          key={tourKey} 
          onComplete={onTourComplete}
          run={showTour}
        />
      )}

      <ToastProvider />
    </div>
  );
}