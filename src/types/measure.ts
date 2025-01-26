import { Milestone, ProgressUpdate } from './progress';

export type MeasureStatus = 'planlagt' | 'pågående' | 'fullført';
export type MeasurePriority = 'høy' | 'medium' | 'lav';

export interface MeasureStyle {
  statusColors: Record<MeasureStatus, {
    bg: string;
    text: string;
    border: string;
    icon: string;
  }>;
  priorityColors: Record<MeasurePriority, {
    bg: string;
    text: string;
    border: string;
  }>;
  hoverBg: string;
  progressBarColors: {
    bg: string;
    fill: string;
    text: string;
  };
}

export interface Measure {
  id: string;
  principle_id: string;
  title: string;
  description: string;
  responsible: string;
  status: MeasureStatus;
  priority: MeasurePriority;
  deadline?: string;
  dependencies?: string[];
  milestones: Milestone[];
  progress: ProgressUpdate[];
  progress_percentage: number;
  last_status_update: string;
  next_review_date: string;
  created_at: string;
  updated_at: string;
  style: MeasureStyle;
}