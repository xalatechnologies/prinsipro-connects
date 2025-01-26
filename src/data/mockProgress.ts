import { Milestone, Review, ProgressUpdate } from '@/types/progress';

const timestamp = new Date().toISOString();

export const mockMilestones: Milestone[] = [
  {
    id: 'milestone-1',
    measure_id: 'mfa-all',
    title: 'MFA for alle brukere',
    description: 'Implementer MFA for alle interne brukere',
    due_date: '2024-06-30T00:00:00.000Z',
    status: 'in_progress',
    created_at: timestamp
  },
  {
    id: 'milestone-2',
    measure_id: 'mfa-all',
    title: 'MFA for eksterne partnere',
    description: 'Utvid MFA til eksterne samarbeidspartnere',
    due_date: '2024-07-31T00:00:00.000Z',
    status: 'pending',
    created_at: timestamp
  }
];

export const mockReviews: Review[] = [
  {
    id: 'review-1',
    principle_id: 'zero-trust',
    reviewer_id: 'jan.johansen@nordrefollo.kommune.no',
    status: 'approved',
    comments: 'Prinsippet er godt implementert og følges',
    review_date: '2024-01-15T00:00:00.000Z',
    next_review_date: '2024-07-15T00:00:00.000Z',
    created_at: timestamp
  }
];

export const mockProgressUpdates: ProgressUpdate[] = [
  {
    id: 'progress-1',
    measure_id: 'mfa-all',
    status: 'pågående',
    description: 'MFA rullet ut til 60% av interne brukere',
    percentage: 60,
    updated_by: 'per.hansen@nordrefollo.kommune.no',
    created_at: timestamp
  }
];