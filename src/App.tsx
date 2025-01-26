import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { SignIn } from '@/pages/auth/SignIn';
import { SignUp } from '@/pages/auth/SignUp';
import { ResetPassword } from '@/pages/auth/ResetPassword';
import { AdminRoutes } from '@/routes/AdminRoutes';
import { MainLayout } from '@/layouts/MainLayout';
import { AreaView } from '@/features/areas/AreaView';
import { ManagementView } from '@/features/management/ManagementView';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { useDataService } from '@hooks/useDataService';
import { Area, Category } from '@types/index';
import { Users, FileText, AlertTriangle, Activity } from 'lucide-react';
import { StyledCard } from '@/components/ui/StyledCard';
import { ExceptionList } from '@components/governance/ExceptionList';
import { GovernanceOverview } from '@components/governance/GovernanceOverview';
import { ReferenceList } from '@components/governance/ReferenceList';
import { LoadingPage } from '@/components/LoadingPage';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorBoundary } from '@/components/ErrorBoundary';

function App() {
  const dataService = useDataService();
  const [areas, setAreas] = useState<Area[]>([]);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'areas' | 'governance' | 'exceptions' | 'references' | 'manage'>('areas');
  const [showTour, setShowTour] = useState(false);
  const [tourKey, setTourKey] = useState(0);
  const [managementView, setManagementView] = useState<'areas' | 'categories' | 'principles' | null>(null);
  const [selectedManagementArea, setSelectedManagementArea] = useState<Area | null>(null);
  const [selectedManagementCategory, setSelectedManagementCategory] = useState<Category | null>(null);

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

  const handleStartTour = useCallback(() => {
    setShowTour(true);
    setTourKey(prev => prev + 1);
  }, []);

  const handleTourComplete = useCallback(() => {
    setShowTour(false);
  }, []);

  const handleTourStart = useCallback(() => {
    setShowTour(true);
    setTourKey(prev => prev + 1);
  }, []);

  // Management handlers
  const handleAreaUpdate = async (area: Area) => {
    // In a real app, this would call an API
    setAreas(prev => prev.map(a => a.id === area.id ? area : a));
  };

  const handleAreaDelete = async (areaId: string) => {
    // In a real app, this would call an API
    setAreas(prev => prev.filter(a => a.id !== areaId));
  };

  const handleAreaCreate = async (area: Omit<Area, 'id'>) => {
    // In a real app, this would call an API
    const newArea = {
      ...area,
      id: `area-${Date.now()}`,
      categories: [],
      useCases: []
    } as Area;
    setAreas(prev => [...prev, newArea]);
  };

  if (loading) {
    return (
      <LoadingPage />
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  const currentArea = areas.find(area => area.id === selectedArea);
  const currentCategory = currentArea?.categories.find(cat => cat.id === selectedCategory);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          
          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminRoutes />} />
          
          {/* Protected Routes */}
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