import type { LucideIcon } from 'lucide-react';

export type AdminMenuCategory = 'content' | 'users' | 'security' | 'system';

export interface AdminMenuItem {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  category: AdminMenuCategory;
  roles: ('admin' | 'editor' | 'viewer')[];
}