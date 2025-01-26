import { BaseStyle, StyleConfig, StatusStyle } from '@/types/style';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export function createBaseStyle(
  baseColor: string,
  iconName: keyof typeof Icons
): BaseStyle {
  return {
    bgColor: `bg-${baseColor}-50`,
    textColor: `text-${baseColor}-900`,
    borderColor: `border-${baseColor}-200`,
    icon: Icons[iconName],
    hoverStates: {
      bgColor: `bg-${baseColor}-100`,
      transform: 'scale(1.02)'
    }
  };
}

export function createStatusStyle(
  baseColor: string,
  darkMode = false
): StatusStyle {
  return {
    bg: darkMode ? `bg-${baseColor}-900` : `bg-${baseColor}-100`,
    text: darkMode ? `text-${baseColor}-100` : `text-${baseColor}-900`,
    border: `border-${baseColor}-${darkMode ? '700' : '200'}`,
    icon: `text-${baseColor}-${darkMode ? '400' : '600'}`
  };
}

export function createStyleConfig(
  baseStyle: BaseStyle,
  baseColor: string
): StyleConfig {
  return {
    ...baseStyle,
    iconColor: `text-${baseColor}-600`,
    descriptionColor: `text-${baseColor}-700`,
    responsibleColor: `text-${baseColor}-600`,
    statusColors: {
      active: createStatusStyle('green'),
      pending: createStatusStyle('yellow'),
      inactive: createStatusStyle('gray')
    }
  };
}