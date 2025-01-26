export interface Resource {
  title: string;
  type: 'documentation' | 'template' | 'example' | 'video' | 'training';
  url: string;
  description: string;
}