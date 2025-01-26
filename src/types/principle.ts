import { Measure } from './measure';
import { ImplementationGuideline } from './implementation';
import { ReferenceMapping } from './reference';
import { Exception } from './exception';
import { Review } from './progress';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { Attachment } from './attachment';

export type PrincipleStatus = 'draft' | 'review' | 'approved' | 'deprecated';

export interface PrincipleStyle {
  icon: LucideIcon;
  implementationIcon: LucideIcon;
  goalIcon: LucideIcon;
  importanceIcon: LucideIcon;
  consequencesIcon: LucideIcon;
  exceptionsIcon: LucideIcon;
  
  bgColor: string;
  textColor: string;
  descriptionColor: string;
  borderColor: string;
  
  goalBg: string;
  goalTextColor: string;
  goalDescriptionColor: string;
  goalIconColor: string;
  
  importanceBg: string;
  importanceTextColor: string;
  importanceDescriptionColor: string;
  importanceIconColor: string;
  
  consequencesBg: string;
  consequencesTextColor: string;
  consequencesDescriptionColor: string;
  consequencesIconColor: string;
  
  exceptionsBg: string;
  exceptionsTextColor: string;
  exceptionsDescriptionColor: string;
  exceptionsIconColor: string;
  
  statusColors: Record<PrincipleStatus, {
    bg: string;
    text: string;
    border: string;
  }>;
  
  hoverBg: string;
}

export interface Principle {
  id: string;
  category_id: string;
  title: string;
  description: string;
  goal: string;
  importance: string;
  consequences: string;
  rationale: string;
  measures: Measure[];
  exceptions: string[];
  implementation?: ImplementationGuideline;
  references: ReferenceMapping[];
  reviews: Review[];
  status: PrincipleStatus;
  version: string;
  created_at: string;
  updated_at: string;
  style: PrincipleStyle;
  attachments?: Attachment[];
}