import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { AreasPage } from '@/pages/admin/areas/AreasPage';
import { CategoriesPage } from '@/pages/admin/categories/CategoriesPage';
import { PrinciplesPage } from '@/pages/admin/principles/PrinciplesPage';
import { UsersPage } from '@/pages/admin/users/UsersPage';
import { RolesPage } from '@/pages/admin/roles/RolesPage';
import { ActivityPage } from '@/pages/admin/activity/ActivityPage';
import { NotificationsPage } from '@/pages/admin/notifications/NotificationsPage';
import { SettingsPage } from '@/pages/admin/settings/SettingsPage';

export function AdminRoutes() {
  return (
    <RequireAuth>
      <Routes>
        <Route index element={<AdminDashboard userRole="admin" />} />
        <Route path="areas" element={<AreasPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="principles" element={<PrinciplesPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="roles" element={<RolesPage />} />
        <Route path="activity" element={<ActivityPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Routes>
    </RequireAuth>
  );
}