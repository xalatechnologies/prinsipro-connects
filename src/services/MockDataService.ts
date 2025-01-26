import { IDataService } from '@services/interfaces/IDataService';
import { mockAreas } from '@data/areas/mockAreas';
import { mockCategories } from '@data/categories/mockCategories';
import { mockPrinciples } from '@data/principles/mockPrinciples';
import { mockMeasures } from '@data/measures/mockMeasures';
import { mockExceptions } from '@data/exceptions/mockExceptions';
import { mockImplementationGuidelines } from '@data/guidelines/mockImplementationGuidelines';
import { mockUseCases } from '@data/useCases/mockUseCases';
import { mockReferences } from '@data/references/mockReferences';
import { Area, Category, Principle, Measure, Exception, Reference, GovernanceBoard, Milestone, ProgressUpdate } from '@types/index';
import { generateSitemap } from '@utils/sitemap';

export class MockDataService implements IDataService {
  // Existing methods
  async getAreas(): Promise<Area[]> {
    const areas = mockAreas;
    
    // Attach categories and related data
    areas.forEach(area => {
      // Find categories for this area
      area.categories = mockCategories
        .filter(cat => cat.area_id === area.id)
        .map(category => {
          // Link implementation guidelines
          category.guidelines = mockImplementationGuidelines.filter(
            g => g.category_id === category.id
          );

          // Find and attach principles
          category.principles = mockPrinciples
            .filter(p => p.category_id === category.id)
            .map(principle => ({
              ...principle,
              measures: mockMeasures.filter(m => m.principle_id === principle.id),
              exceptions: mockExceptions.filter(ex => ex.principle_id === principle.id),
              references: mockReferences
                .filter(ref => ref.code === principle.id.toUpperCase())
                .map(ref => ({
                  reference_id: ref.id,
                  description: ref.description
                }))
            }));

          return category;
        });

      // Attach use cases
      area.useCases = mockUseCases.filter(uc => 
        uc.title.toLowerCase().includes(area.name.toLowerCase())
      );
    });

    return areas;
  }

  async getArea(id: string): Promise<Area | null> {
    const areas = await this.getAreas();
    return areas.find(area => area.id === id) || null;
  }

  async getCategory(id: string): Promise<Category | null> {
    const areas = await this.getAreas();
    for (const area of areas) {
      const category = area.categories.find(cat => cat.id === id);
      if (category) return category;
    }
    return null;
  }

  async getPrinciple(id: string): Promise<Principle | null> {
    const areas = await this.getAreas();
    for (const area of areas) {
      for (const category of area.categories) {
        const principle = category.principles.find(p => p.id === id);
        if (principle) return principle;
      }
    }
    return null;
  }

  async getMeasure(id: string): Promise<Measure | null> {
    const areas = await this.getAreas();
    for (const area of areas) {
      for (const category of area.categories) {
        for (const principle of category.principles) {
          const measure = principle.measures.find(m => m.id === id);
          if (measure) return measure;
        }
      }
    }
    return null;
  }

  async getExceptions(status?: string): Promise<Exception[]> {
    if (status) {
      return mockExceptions.filter(e => e.status === status);
    }
    return mockExceptions;
  }

  async createException(exception: Omit<Exception, 'id' | 'created_at'>): Promise<Exception> {
    const newException: Exception = {
      ...exception,
      id: `exception-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      comments: []
    };
    return newException;
  }

  async updateException(id: string, exception: Partial<Exception>): Promise<Exception> {
    const existingException = mockExceptions.find(e => e.id === id);
    if (!existingException) {
      throw new Error('Exception not found');
    }
    return {
      ...existingException,
      ...exception,
      updated_at: new Date().toISOString()
    };
  }

  async getReferences(type?: string): Promise<Reference[]> {
    if (type) {
      return mockReferences.filter(r => r.type === type);
    }
    return mockReferences;
  }

  async mapReference(mapping: any): Promise<any> {
    const newMapping = {
      ...mapping,
      id: `mapping-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    return newMapping;
  }

  async getGovernanceBoard(id: string): Promise<GovernanceBoard | null> {
    return null; // Mock implementation
  }

  async getBoardMembers(boardId: string): Promise<any[]> {
    return []; // Mock implementation
  }

  async getMilestones(measureId: string): Promise<Milestone[]> {
    return []; // Mock implementation
  }

  async updateMilestone(id: string, milestone: Partial<Milestone>): Promise<Milestone> {
    throw new Error('Not implemented');
  }

  async createProgressUpdate(update: Omit<ProgressUpdate, 'id' | 'created_at'>): Promise<ProgressUpdate> {
    const newUpdate: ProgressUpdate = {
      ...update,
      id: `progress-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    return newUpdate;
  }

  async generateSitemap(): Promise<string> {
    const areas = await this.getAreas();
    return generateSitemap(areas);
  }

  async searchContent(query: string): Promise<{
    type: 'area' | 'category' | 'principle' | 'measure';
    item: Area | Category | Principle | Measure;
    path: string[];
  }[]> {
    const areas = await this.getAreas();
    const results: {
      type: 'area' | 'category' | 'principle' | 'measure';
      item: Area | Category | Principle | Measure;
      path: string[];
    }[] = [];
    
    const normalizedQuery = query.toLowerCase();

    for (const area of areas) {
      if (this.matchesSearch(area, normalizedQuery)) {
        results.push({
          type: 'area',
          item: area,
          path: [area.name]
        });
      }

      for (const category of area.categories) {
        if (this.matchesSearch(category, normalizedQuery)) {
          results.push({
            type: 'category',
            item: category,
            path: [area.name, category.name]
          });
        }

        for (const principle of category.principles) {
          if (this.matchesSearch(principle, normalizedQuery)) {
            results.push({
              type: 'principle',
              item: principle,
              path: [area.name, category.name, principle.title]
            });
          }

          for (const measure of principle.measures) {
            if (this.matchesSearch(measure, normalizedQuery)) {
              results.push({
                type: 'measure',
                item: measure,
                path: [area.name, category.name, principle.title, measure.title]
              });
            }
          }
        }
      }
    }

    return results;
  }

  private matchesSearch(item: any, query: string): boolean {
    return (
      (item.name?.toLowerCase().includes(query)) ||
      (item.title?.toLowerCase().includes(query)) ||
      (item.description?.toLowerCase().includes(query))
    );
  }
}