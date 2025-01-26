import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { SignIn } from '@/pages/auth/SignIn';
import { SignUp } from '@/pages/auth/SignUp';
import { ResetPassword } from '@/pages/auth/ResetPassword';
import { AdminRoutes } from '@/routes/AdminRoutes';
import { MainLayout } from '@/layouts/MainLayout';
import { AreaView } from '@/features/areas/AreaView';
import { ManagementView } from '@/features/management/ManagementView';
import { useDataService } from '@hooks/useDataService';
import type { Area } from '@/types';
import { ExceptionList } from '@components/governance/ExceptionList';
import { GovernanceOverview } from '@components/governance/GovernanceOverview';
import { ReferenceList } from '@components/governance/ReferenceList';
import { LoadingPage } from '@/components/LoadingPage';

export type ViewType = 'areas' | 'governance' | 'exceptions' | 'references' | 'manage';

interface MainLayoutProps {
  onSearch: (type: string, id: string) => void;
  onAreaSelect: (areaId: string | null) => void;
  onViewChange: (view: ViewType) => void;
  currentView: ViewType;
  showTour: boolean;
  tourKey: number;
  onTourComplete: () => void;
  onTourStart: () => void;
}

function App() {
  const dataService = useDataService();
  const [areas, setAreas] = useState<Area[]>([]);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<ViewType>('areas');
  const [showTour, setShowTour] = useState(false);
  const [tourKey, setTourKey] = useState(0);

  useEffect(() => {
    const loadAreas = async () => {
      try {
        const loadedAreas = await dataService.getAreas();
        setAreas(loadedAreas);
        setLoading(false);
      } catch (err) {
        setError('Failed to load areas');
        setLoading(false);
      }
    };

    loadAreas();
  }, [dataService]);

  const handleSearchResult = useCallback(async (type: string, id: string) => {
    if (type === 'area') {
      setSelectedArea(id);
      setSelectedCategory(null);
      setView('areas');
    } else if (type === 'category') {
      const category = await dataService.getCategory(id);
      if (category) {
        const area = areas.find(a => a.categories.some(c => c.id === category.id));
        if (area) {
          setSelectedArea(area.id);
          setSelectedCategory(id);
          setView('areas');
        }
      }
    }
  }, [areas, dataService]);

  const handleTourComplete = useCallback(() => {
    setShowTour(false);
  }, []);

  const handleTourStart = useCallback(() => {
    setShowTour(true);
    setTourKey(prev => prev + 1);
  }, []);

  const handleAreaUpdate = (area: Area) => {
    setAreas(prev => prev.map(a => a.id === area.id ? area : a));
  };

  const handleAreaDelete = (areaId: string) => {
    setAreas(prev => prev.filter(a => a.id !== areaId));
  };

  const handleAreaCreate = (newArea: Omit<Area, 'id'>) => {
    const areaWithId: Area = {
      ...newArea,
      id: `area-${Date.now()}`, // Temporary ID generation
      categories: [],
      useCases: [],
      created_at: new Date().toISOString()
    };
    setAreas(prev => [...prev, areaWithId]);
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/*" element={
            <RequireAuth>
              <MainLayout
                onSearch={handleSearchResult}
                onAreaSelect={setSelectedArea}
                onViewChange={setView}
                currentView={view}
                showTour={showTour}
                tourKey={tourKey}
                onTourComplete={handleTourComplete}
                onTourStart={handleTourStart}
              >
                {view === 'manage' && (
                  <ManagementView
                    areas={areas}
                    onAreaUpdate={handleAreaUpdate}
                    onAreaDelete={handleAreaDelete}
                    onAreaCreate={handleAreaCreate}
                  />
                )}
                {view === 'areas' && (
                  <AreaView
                    areas={areas}
                    selectedArea={selectedArea}
                    selectedCategory={selectedCategory}
                    onAreaSelect={setSelectedArea}
                    onCategorySelect={setSelectedCategory}
                  />
                )}
                {view === 'governance' && <GovernanceOverview />}
                {view === 'exceptions' && <ExceptionList />}
                {view === 'references' && <ReferenceList />}
              </MainLayout>
            </RequireAuth>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;