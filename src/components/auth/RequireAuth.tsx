import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RequireAuthProps {
  children: React.ReactNode;
  requiredRole?: string;
  userRoles?: string[];
}

export function RequireAuth({ children, requiredRole, userRoles }: RequireAuthProps) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#003057] mx-auto mb-4" />
          <p className="text-gray-600">Laster inn...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    // Save the attempted URL for redirecting after login
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  // Check if user has required role (if specified)
  if (requiredRole && !userRoles?.includes(requiredRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Ingen tilgang</h1>
          <p className="text-gray-600 mb-6">
            Du har ikke tilstrekkelige rettigheter til å se denne siden.
          </p>
          <Button
            onClick={() => navigate('/')}
            className="bg-[#003057] hover:bg-[#002543] text-white"
          >
            Gå til forsiden
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}