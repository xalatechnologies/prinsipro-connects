export interface Tool {
  name: string;
  description: string;
  url?: string;
  type: 'software' | 'framework' | 'service' | 'other';
}