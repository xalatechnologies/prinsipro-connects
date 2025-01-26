import type { Principle } from './principle';
import type { ImplementationGuideline } from './implementation';
import type { LucideIcon } from 'lucide-react';

export interface CategoryTab {
  id: string;
  label: string;
  icon: LucideIcon;
  description?: string;
}

export interface CategoryStyle {
  icon: LucideIcon;
  bgColor: string;
  textColor: string;
  borderColor: string;
  iconColor: string;
  hoverBg: string;
  tabs: CategoryTab[];
}

export interface Category {
  id: string;
  area_id: string;
  name: string;
  description: string;
  principles: Principle[];
  guidelines: ImplementationGuideline[];
  created_at: string;
  style: CategoryStyle;
}