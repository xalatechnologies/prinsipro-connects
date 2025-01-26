import { Area, Category, Principle, Measure, Exception, Reference, GovernanceBoard } from '@/types';

export interface IDataService {
  // Existing methods
  getAreas(): Promise<Area[]>;
  getArea(id: string): Promise<Area | null>;
  getCategory(id: string): Promise<Category | null>;
  getPrinciple(id: string): Promise<Principle | null>;
  getMeasure(id: string): Promise<Measure | null>;
  searchContent(query: string): Promise<{
    type: 'area' | 'category' | 'principle' | 'measure';
    item: Area | Category | Principle | Measure;
    path: string[];
  }[]>;
  generateSitemap(): Promise<string>;

  // New methods for enhanced functionality
  getExceptions(status?: string): Promise<Exception[]>;
  createException(exception: Omit<Exception, 'id' | 'created_at'>): Promise<Exception>;
  updateException(id: string, exception: Partial<Exception>): Promise<Exception>;
  
  getReferences(type?: string): Promise<Reference[]>;
  mapReference(mapping: Omit<ReferenceMapping, 'id' | 'created_at'>): Promise<ReferenceMapping>;
  
  getGovernanceBoard(id: string): Promise<GovernanceBoard | null>;
  getBoardMembers(boardId: string): Promise<BoardMember[]>;
  
  createProgressUpdate(update: Omit<ProgressUpdate, 'id' | 'created_at'>): Promise<ProgressUpdate>;
  getMilestones(measureId: string): Promise<Milestone[]>;
  updateMilestone(id: string, milestone: Partial<Milestone>): Promise<Milestone>;
}