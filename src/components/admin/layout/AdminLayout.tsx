import React from 'react';
import { Navbar } from '@/components/Navbar';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function AdminLayout({ children, className }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <Navbar 
          onAreaSelect={() => {}} 
          onViewChange={() => {}} 
          currentView="admin" 
        />
      </div>

      <div className={cn(
        "container max-w-[1600px] mx-auto py-8",
        className
      )}>
        {children}
      </div>
    </div>
  );
}