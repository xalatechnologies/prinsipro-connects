export interface Reference {
  id: string;
  type: string;
  code: string;
  title: string;
  description: string;
  url?: string;
  created_at: string;
}

export interface ReferenceMapping {
  reference_id: string;
  description: string;
}