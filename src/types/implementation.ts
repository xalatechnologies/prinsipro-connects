import { Resource } from './resource';
import { Tool } from './tool';

export interface ImplementationStyle {
  stepBg: string;
  stepText: string;
  stepBorder: string;
  checklistColors: {
    bg: string;
    text: string;
    icon: string;
  };
  resourceColors: {
    bg: string;
    text: string;
    border: string;
    hoverBorder: string;
  };
  toolColors: {
    bg: string;
    text: string;
    border: string;
    linkColor: string;
  };
}

export interface ImplementationGuideline {
  id: string;
  category_id: string;
  title: string;
  description: string;
  steps: ImplementationStep[];
  tools: Tool[];
  created_at: string;
  style: ImplementationStyle;
}

export interface ImplementationStep {
  order: number;
  title: string;
  description: string;
  checklist: string[];
  resources: Resource[];
}