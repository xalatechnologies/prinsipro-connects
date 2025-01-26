import { IDataService } from '@services/interfaces/IDataService';
import { ArdoqClient } from '@lib/ardoq';
import { Area, Category, Principle, Measure } from '@types/index';
import { ArdoqWorkspace, ArdoqComponent, ArdoqReference } from '@types/ardoq';

export class ArdoqDataService implements IDataService {
  private client: ArdoqClient;
  private workspaceId: string;

  constructor(token: string, workspaceId: string) {
    this.client = new ArdoqClient(token);
    this.workspaceId = workspaceId;
  }

  async getAreas(): Promise<Area[]> {
    try {
      const components = await this.client.getComponents(this.workspaceId);
      const references = await this.client.getReferences(this.workspaceId);
      
      return this.transformToAreas(components, references);
    } catch (error) {
      console.error('Error fetching areas from Ardoq:', error);
      throw error;
    }
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

  private transformToAreas(components: ArdoqComponent[], references: ArdoqReference[]): Area[] {
    // Implementation of transforming Ardoq data structure to our internal structure
    // This would need to be implemented based on your specific Ardoq data model
    return [];
  }
}