import type { LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { AreaStyle, CategoryStyle } from '@/types';

export function createAreaStyle(
  iconName: keyof typeof Icons,
  baseColor: string
): AreaStyle {
  return {
    icon: Icons[iconName],
    bgColor: `bg-${baseColor}-50`,
    iconColor: `text-${baseColor}-700`,
    textColor: `text-${baseColor}-900`,
    descriptionColor: `text-${baseColor}-800`,
    responsibleColor: `text-${baseColor}-600`,
    hoverBg: `hover:bg-${baseColor}-100`,
    hoverShadow: 'hover:shadow-lg',
    borderColor: `border-${baseColor}-200`,
    tabs: []
  };
}

export function createCategoryStyle(baseColor: string): CategoryStyle {
  return {
    icon: Icons.BookOpen,
    bgColor: `bg-${baseColor}-50`,
    textColor: `text-${baseColor}-900`,
    borderColor: `border-${baseColor}-200`,
    iconColor: `text-${baseColor}-600`,
    hoverBg: `hover:bg-${baseColor}-100`,
    tabs: []
  };
}