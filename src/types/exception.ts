export type ExceptionStatus = 'pending' | 'approved' | 'rejected';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type RiskProbability = 'low' | 'moderate' | 'likely';

export interface ExceptionStyle {
  statusColors: Record<ExceptionStatus, {
    bg: string;
    text: string;
    border: string;
    icon: string;
  }>;
  riskLevelColors: Record<RiskLevel, {
    bg: string;
    text: string;
    border: string;
    icon: string;
  }>;
  probabilityColors: Record<RiskProbability, {
    bg: string;
    text: string;
  }>;
}

export interface Exception {
  id: string;
  principle_id: string;
  title: string;
  description: string;
  justification: string;
  risk_assessment: {
    level: RiskLevel;
    impact: string;
    probability: RiskProbability;
    mitigation: string[];
  };
  status: ExceptionStatus;
  approved_by?: string;
  approval_date?: string;
  expiry_date?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  comments: ExceptionComment[];
  style: ExceptionStyle;
}

export interface ExceptionComment {
  id: string;
  exception_id: string;
  user_id: string;
  content: string;
  created_at: string;
}