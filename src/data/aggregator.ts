import { Area, Category, Principle, Measure } from '@/types';
import { mockAreas } from './areas/mockAreas';
import { mockCategories } from './categories/mockCategories';
import { mockPrinciples } from './principles/mockPrinciples';
import { mockMeasures } from './measures/mockMeasures';
import { mockReferences } from './references/mockReferences';
import { mockExceptions } from './exceptions/mockExceptions';
import { mockAttachments } from './attachments/mockAttachments';
import { mockImplementationGuidelines } from './guidelines/mockImplementationGuidelines';

interface AggregatedData {
  areas: Area[];
  useCaseLinks: Map<string, string[]>;
  referenceLinks: Map<string, string[]>;
}

export function aggregateData(): AggregatedData {
  // Deep clone the areas to avoid modifying the original data
  const areas = JSON.parse(JSON.stringify(mockAreas));
  const useCaseLinks = new Map<string, string[]>();
  const referenceLinks = new Map<string, string[]>();

  // Process areas and their relationships
  areas.forEach(area => {
    // Find categories for this area
    const areaCategories = mockCategories.filter(cat => cat.area_id === area.id);
    
    // For each category, find its principles
    area.categories = areaCategories.map(category => {
      // Find principles for this category
      const categoryPrinciples = mockPrinciples
        .filter(p => p.category_id === category.id)
        .map(principle => {
          // Find measures for this principle
          const principleMeasures = mockMeasures.filter(m => m.principle_id === principle.id);
          
          // Find exceptions for this principle
          const exceptions = mockExceptions.filter(ex => 
            ex.principle_id === principle.id
          );

          // Find references for this principle
          const references = mockReferences.filter(ref => 
            ref.principles?.includes(principle.id)
          );

          // Find attachments for this principle
          const attachments = mockAttachments.filter(att =>
            att.objectType === 'principle' && att.objectId === principle.id
          );

          // Find implementation guide for this principle
          const implementation = mockImplementationGuidelines.find(
            guide => guide.id === `impl-${principle.id}`
          );

          return {
            ...principle,
            measures: principleMeasures,
            exceptions,
            references,
            attachments,
            implementation
          };
        });

      return {
        ...category,
        principles: categoryPrinciples
      };
    });
  });

  return {
    areas,
    useCaseLinks,
    referenceLinks
  };
}

export function getAreaById(id: string): Area | undefined {
  const { areas } = aggregateData();
  return areas.find(area => area.id === id);
}

export function getCategoryById(id: string): Category | undefined {
  const { areas } = aggregateData();
  for (const area of areas) {
    const category = area.categories.find(cat => cat.id === id);
    if (category) return category;
  }
  return undefined;
}

export function getPrincipleById(id: string): Principle | undefined {
  const { areas } = aggregateData();
  for (const area of areas) {
    for (const category of area.categories) {
      const principle = category.principles.find(p => p.id === id);
      if (principle) return principle;
    }
  }
  return undefined;
}

export function getMeasureById(id: string): Measure | undefined {
  const { areas } = aggregateData();
  for (const area of areas) {
    for (const category of area.categories) {
      for (const principle of category.principles) {
        const measure = principle.measures.find(m => m.id === id);
        if (measure) return measure;
      }
    }
  }
  return undefined;
}