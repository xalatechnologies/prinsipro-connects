import type { LucideIcon } from 'lucide-react';

export interface BaseStyle {
  bgColor: string;
  textColor: string;
  borderColor?: string;
  icon?: LucideIcon;
  hoverStates?: HoverStyle;
}

export interface HoverStyle {
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  transform?: string;
}

export interface StatusStyle {
  bg: string;
  text: string;
  border: string;
  icon?: string;
}

export interface StyleConfig extends BaseStyle {
  iconColor: string;
  descriptionColor: string;
  responsibleColor: string;
  statusColors?: Record<string, StatusStyle>;
  tabs?: TabStyle[];
}

export interface TabStyle {
  id: string;
  label: string;
  icon: LucideIcon;
  description?: string;
}

// Re-export specific style interfaces that extend the base styles
export * from './area';
export * from './category';
export * from './principle';
export * from './measure';
export * from './reference';
export * from './exception';
export * from './implementation';
export * from './progress';