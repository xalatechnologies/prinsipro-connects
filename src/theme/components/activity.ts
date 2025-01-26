import { tokens } from '../tokens';

export const activityStyles = {
  base: {
    wrapper: 'relative overflow-hidden rounded-lg p-4',
    content: 'flex items-start gap-4',
    icon: {
      wrapper: 'p-2 rounded-lg transition-all duration-300',
      size: 'h-4 w-4'
    },
    text: {
      wrapper: 'flex-grow',
      title: 'font-medium text-gray-900',
      description: 'text-sm text-gray-600',
      time: 'text-xs text-gray-500 mt-1'
    }
  },
  types: {
    update: {
      icon: {
        background: 'bg-blue-100',
        color: 'text-blue-600'
      }
    },
    create: {
      icon: {
        background: 'bg-green-100',
        color: 'text-green-600'
      }
    },
    delete: {
      icon: {
        background: 'bg-red-100',
        color: 'text-red-600'
      }
    },
    system: {
      icon: {
        background: 'bg-purple-100',
        color: 'text-purple-600'
      }
    }
  },
  animation: {
    item: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: tokens.animation.durations.normal,
        ease: tokens.animation.easings.out
      }
    },
    hover: {
      scale: 1.02,
      rotate: 3
    }
  }
};