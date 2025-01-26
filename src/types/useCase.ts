export interface UseCase {
  id: string;
  area_id: string;
  title: string;
  description: string;
  businessContext: string;
  technicalContext: string;
  solution: string;
  benefits: string[];
  challenges: string[];
  lessons: string[];
  status: 'proposed' | 'implemented' | 'archived';
  created_at: string;
}