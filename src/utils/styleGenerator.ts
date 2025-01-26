import type { LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { StyleConfig, BaseStyle, TabStyle } from '@/types/style';

interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
}

type IconName = keyof typeof Icons;

// Map content types to appropriate icons
const CONTENT_TYPE_ICONS: Record<ContentType, IconName> = {
  security: 'Shield',
  development: 'Code',
  cloud: 'Cloud',
  integration: 'Network',
  identity: 'Key',
  automation: 'Bot',
  documentation: 'BookOpen',
  governance: 'Building',
  architecture: 'Layout',
  data: 'Database',
  api: 'Webhook',
  testing: 'TestTube',
  monitoring: 'Activity',
  compliance: 'CheckSquare',
  risk: 'AlertTriangle',
  strategy: 'Target',
  infrastructure: 'Server',
  performance: 'Gauge',
  accessibility: 'Accessibility',
  usability: 'Users'
};

type ContentType = keyof typeof CONTENT_TYPE_ICONS;
const COLOR_SCHEMES: Record<ContentType, ColorScheme> = {
  security: { primary: 'red', secondary: 'rose', accent: 'pink' },
  development: { primary: 'emerald', secondary: 'green', accent: 'lime' },
  cloud: { primary: 'blue', secondary: 'sky', accent: 'indigo' },
  integration: { primary: 'purple', secondary: 'violet', accent: 'fuchsia' },
  identity: { primary: 'amber', secondary: 'yellow', accent: 'orange' },
  automation: { primary: 'indigo', secondary: 'violet', accent: 'purple' },
  documentation: { primary: 'gray', secondary: 'slate', accent: 'zinc' },
  governance: { primary: 'blue', secondary: 'indigo', accent: 'violet' },
  architecture: { primary: 'slate', secondary: 'gray', accent: 'zinc' },
  data: { primary: 'cyan', secondary: 'sky', accent: 'blue' },
  api: { primary: 'violet', secondary: 'purple', accent: 'indigo' },
  testing: { primary: 'green', secondary: 'emerald', accent: 'teal' },
  monitoring: { primary: 'orange', secondary: 'amber', accent: 'yellow' },
  compliance: { primary: 'teal', secondary: 'cyan', accent: 'sky' },
  risk: { primary: 'rose', secondary: 'red', accent: 'pink' },
  strategy: { primary: 'indigo', secondary: 'blue', accent: 'violet' },
  infrastructure: { primary: 'zinc', secondary: 'gray', accent: 'slate' },
  performance: { primary: 'amber', secondary: 'yellow', accent: 'orange' },
  accessibility: { primary: 'purple', secondary: 'violet', accent: 'indigo' },
  usability: { primary: 'emerald', secondary: 'green', accent: 'teal' }
} satisfies Record<ContentType, ColorScheme>;

interface ContentAnalysis {
  primaryType: ContentType;
  secondaryTypes: ContentType[];
  sentiment: 'neutral' | 'positive' | 'warning' | 'critical';
}

function analyzeContent(text: string): ContentAnalysis {
  const normalizedText = text.toLowerCase();
  const types = Object.keys(CONTENT_TYPE_ICONS) as ContentType[];
  
  // Find primary content type based on keyword frequency
  const typeScores = types.map(type => ({
    type,
    score: normalizedText.split(type.toLowerCase()).length - 1
  }));
  
  const sortedTypes = typeScores.sort((a, b) => b.score - a.score);
  const primaryType = sortedTypes.length > 0 ? sortedTypes[0].type : 'documentation';
  
  // Find secondary content types
  const secondaryTypes = typeScores
    .filter(score => score.type !== primaryType && score.score > 0)
    .map(score => score.type)
    .slice(0, 2);
  
  // Determine sentiment based on keywords
  const sentiment = normalizedText.includes('critical') || normalizedText.includes('risk')
    ? 'critical'
    : normalizedText.includes('warning') || normalizedText.includes('caution')
    ? 'warning'
    : normalizedText.includes('success') || normalizedText.includes('completed')
    ? 'positive'
    : 'neutral';
  
  return { primaryType, secondaryTypes, sentiment };
}

function generateColorScheme(
  contentType: ContentType,
  sentiment: ContentAnalysis['sentiment']
): ColorScheme {
  const baseScheme = COLOR_SCHEMES[contentType as keyof typeof COLOR_SCHEMES] || COLOR_SCHEMES.development;
  
  // Adjust colors based on sentiment
  switch (sentiment) {
    case 'critical':
      return { ...baseScheme, primary: 'red' };
    case 'warning':
      return { ...baseScheme, primary: 'amber' };
    case 'positive':
      return { ...baseScheme, primary: 'green' };
    default:
      return baseScheme;
  }
}

function getIcon(contentType: ContentType): LucideIcon {
  const iconName = CONTENT_TYPE_ICONS[contentType] || 'HelpCircle';
  return Icons[iconName as keyof typeof Icons];
}

export function generateStyles(content: {
  title: string;
  description: string;
}): StyleConfig {
  const { primaryType, secondaryTypes, sentiment } = analyzeContent(
    `${content.title} ${content.description}`
  );
  
  const colorScheme = generateColorScheme(primaryType, sentiment);
  const icon = getIcon(primaryType);
  
  const baseStyle: BaseStyle = {
    bgColor: `bg-${colorScheme.primary}-50`,
    textColor: `text-${colorScheme.primary}-900`,
    borderColor: `border-${colorScheme.primary}-200`,
    icon,
    hoverStates: {
      bgColor: `hover:bg-${colorScheme.primary}-100`,
      transform: 'scale(1.02)'
    }
  };
  
  return {
    ...baseStyle,
    iconColor: `text-${colorScheme.primary}-600`,
    descriptionColor: `text-${colorScheme.primary}-700`,
    responsibleColor: `text-${colorScheme.secondary}-600`,
    statusColors: {
      active: {
        bg: `bg-${colorScheme.accent}-100`,
        text: `text-${colorScheme.accent}-900`,
        border: `border-${colorScheme.accent}-200`
      },
      pending: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-900',
        border: 'border-yellow-200'
      },
      inactive: {
        bg: 'bg-gray-100',
        text: 'text-gray-900',
        border: 'border-gray-200'
      }
    },
    tabs: []
  };
}

export function generateLayoutProperties(content: {
  type: string;
  importance: 'high' | 'medium' | 'low';
}): {
  spacing: string;
  padding: string;
  rounded: string;
  shadow: string;
} {
  // Adjust layout based on content type and importance
  const baseSpacing = content.type === 'section' ? 8 : 6;
  const basePadding = content.type === 'section' ? 6 : 4;
  
  const importanceMultiplier = {
    high: 1.5,
    medium: 1,
    low: 0.75
  }[content.importance];
  
  return {
    spacing: `space-y-${Math.round(baseSpacing * importanceMultiplier)}`,
    padding: `p-${Math.round(basePadding * importanceMultiplier)}`,
    rounded: content.type === 'section' ? 'rounded-xl' : 'rounded-lg',
    shadow: content.importance === 'high' 
      ? 'shadow-lg'
      : content.importance === 'medium'
      ? 'shadow-md'
      : 'shadow-sm'
  };
}

export function generateAnimationProperties(content: {
  type: string;
  interactive?: boolean;
}): {
  initial: object;
  animate: object;
  transition: object;
  whileHover?: object;
  whileTap?: object;
} {
  const base = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  };
  
  if (!content.interactive) {
    return base;
  }
  
  return {
    ...base,
    whileHover: { scale: 1.02, transition: { duration: 0.2 } },
    whileTap: { scale: 0.98 }
  };
}