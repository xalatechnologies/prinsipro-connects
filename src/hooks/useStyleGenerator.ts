import { useMemo } from 'react';
import { generateStyles, generateLayoutProperties, generateAnimationProperties } from '@utils/styleGenerator';
import { StyleConfig } from '@/types/style';

interface StyleGeneratorOptions {
  title: string;
  description: string;
  type: string;
  importance?: 'high' | 'medium' | 'low';
  interactive?: boolean;
}

export function useStyleGenerator(options: StyleGeneratorOptions) {
  const styles = useMemo(() => {
    const baseStyles = generateStyles({
      title: options.title,
      description: options.description
    });
    
    const layout = generateLayoutProperties({
      type: options.type,
      importance: options.importance || 'medium'
    });
    
    const animations = generateAnimationProperties({
      type: options.type,
      interactive: options.interactive
    });
    
    return {
      styles: baseStyles,
      layout,
      animations
    };
  }, [options.title, options.description, options.type, options.importance, options.interactive]);
  
  return styles;
}