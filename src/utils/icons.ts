import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export function getIconByName(name: string): LucideIcon {
  const icon = (Icons as Record<string, LucideIcon>)[name];
  if (!icon) {
    console.warn(`Icon "${name}" not found, using HelpCircle as fallback`);
    return Icons.HelpCircle;
  }
  return icon;
}