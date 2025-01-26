import { Category } from './category';
import { UseCase } from './useCase';
import type { LucideIcon } from 'lucide-react';
import { Stats } from './stats';

export type AreaId = string;

export interface AreaTab {
  id: string;
  label: string;
  icon: LucideIcon;
  description?: string;
}

export interface AreaStyle {
  icon: LucideIcon;
  bgColor: string;
  iconColor: string;
  textColor: string;
  descriptionColor: string;
  responsibleColor: string;
  hoverBg: string;
  hoverShadow: string;
  borderColor: string;
  tabs: AreaTab[];
}

export interface Area {
  id: AreaId;
  name: string;
  description: string;
  responsible: string;
  categories: Category[];
  useCases: UseCase[];
  created_at: string;
  stats?: Stats;
  style: AreaStyle;
}