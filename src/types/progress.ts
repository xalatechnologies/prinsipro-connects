export type MilestoneStatus = 'pending' | 'in_progress' | 'completed' | 'blocked';
export type ReviewStatus = 'pending' | 'approved' | 'rejected' | 'needs_changes';

export interface ProgressStyle {
  milestoneColors: Record<MilestoneStatus, {
    bg: string;
    text: string;
    border: string;
    icon: string;
  }>;
  reviewColors: Record<ReviewStatus, {
    bg: string;
    text: string;
    border: string;
    icon: string;
  }>;
  progressBarColors: {
    bg: string;
    fill: string;
    text: string;
  };
}

export interface Milestone {
  id: string;
  measure_id: string;
  title: string;
  description: string;
  due_date: string;
  completed_date?: string;
  status: MilestoneStatus;
  blockers?: string[];
  created_at: string;
  style: ProgressStyle;
}

export interface Review {
  id: string;
  principle_id: string;
  reviewer_id: string;
  status: ReviewStatus;
  comments: string;
  review_date: string;
  next_review_date: string;
  created_at: string;
  style: ProgressStyle;
}

export interface ProgressUpdate {
  id: string;
  measure_id: string;
  status: string;
  description: string;
  percentage: number;
  updated_by: string;
  created_at: string;
  style: ProgressStyle;
}