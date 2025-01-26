import React, { useState } from 'react';
import { Menu, User, LogOut, Shield } from 'lucide-react';
import { NordreFolloLogo } from '@/assets/logo';
import { SideMenu } from '@/components/navigation/SideMenu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './ui/button';

interface NavbarProps {
  onAreaSelect: (areaId: string) => void;
  onViewChange: (view: string) => void;
  currentView: string;
}

export function Navbar({ onAreaSelect, onViewChange, currentView }: NavbarProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const isAdmin = true; // In a real app, get this from user roles

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth/signin');
  };

  const handleAdminNavigation = () => {
    navigate('/admin');
  };

  return (
    <>
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto">
          <div className="flex justify-between items-center h-20 px-4">
            <div className="flex">
              <button 
                onClick={handleLogoClick}
                className="flex-shrink-0 flex items-center hover:opacity-90 transition-opacity"
                aria-label="Gå til forsiden"
              >
                <NordreFolloLogo />
              </button>
            </div>
            <div className="flex items-center gap-4">
              {user && (
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    className="text-gray-600 hover:text-gray-900 relative"
                    onClick={() => navigate('/profile')}
                  >
                    <User className="h-5 w-5 mr-2" />
                    Min profil
                  </Button>
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      className="text-gray-600 hover:text-gray-900"
                      onClick={handleAdminNavigation}
                    >
                      <Shield className="h-5 w-5 mr-2" />
                      Admin Dashboard
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    className="text-gray-600 hover:text-gray-900"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logg ut
                  </Button>
                  <Button
                    onClick={() => setIsSideMenuOpen(true)}
                    variant="outline"
                    size="icon"
                    aria-label="Åpne meny"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <SideMenu 
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
        onAreaSelect={onAreaSelect}
        userRole={isAdmin ? 'admin' : 'viewer'}
      />
    </>
  );
}