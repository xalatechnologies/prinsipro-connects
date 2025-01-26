import { Building, Shield, BookOpen } from 'lucide-react';

export type ReferenceType = 'DigDir' | 'NSM' | 'NFK';

export interface ReferenceStyle {
  name: string;
  icon: typeof Building | typeof Shield | typeof BookOpen;
  bgColor: string;
  textColor: string;
  borderColor: string;
  hoverBg: string;
  hoverText: string;
  badgeBg: string;
  badgeText: string;
}

export interface ReferenceMapping {
  reference_id: string;
  type: ReferenceType;
  code: string;
  description: string;
  url?: string;
}

export const REFERENCE_STYLES: Record<ReferenceType, ReferenceStyle> = {
  DigDir: {
    name: 'Digitaliseringsdirektoratet',
    icon: Building,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-200',
    hoverBg: 'hover:bg-blue-200',
    hoverText: 'hover:text-blue-900',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-700'
  },
  NSM: {
    name: 'Nasjonal Sikkerhetsmyndighet',
    icon: Shield,
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-800',
    borderColor: 'border-purple-200',
    hoverBg: 'hover:bg-purple-200',
    hoverText: 'hover:text-purple-900',
    badgeBg: 'bg-purple-50',
    badgeText: 'text-purple-700'
  },
  NFK: {
    name: 'Nordre Follo Kommune',
    icon: BookOpen,
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    borderColor: 'border-green-200',
    hoverBg: 'hover:bg-green-200',
    hoverText: 'hover:text-green-900',
    badgeBg: 'bg-green-50',
    badgeText: 'text-green-700'
  }
};