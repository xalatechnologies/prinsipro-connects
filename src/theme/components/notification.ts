import { tokens } from '../tokens';

export const notificationStyles = {
  base: {
    wrapper: 'relative overflow-hidden rounded-lg p-4',
    content: 'flex items-start gap-4',
    icon: 'flex-shrink-0',
    text: 'flex-grow min-w-0'
  },
  variants: {
    info: {
      background: 'bg-blue-50',
      border: 'border border-blue-100',
      icon: 'text-blue-500',
      title: 'text-blue-900',
      message: 'text-blue-800'
    },
    success: {
      background: 'bg-green-50',
      border: 'border border-green-100',
      icon: 'text-green-500',
      title: 'text-green-900',
      message: 'text-green-800'
    },
    warning: {
      background: 'bg-amber-50',
      border: 'border border-amber-100',
      icon: 'text-amber-500',
      title: 'text-amber-900',
      message: 'text-amber-800'
    },
    error: {
      background: 'bg-red-50',
      border: 'border border-red-100',
      icon: 'text-red-500',
      title: 'text-red-900',
      message: 'text-red-800'
    }
  },
  animation: {
    enter: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: {
        duration: tokens.animation.durations.normal,
        ease: tokens.animation.easings.out
      }
    },
    exit: {
      initial: { opacity: 1, x: 0 },
      animate: { opacity: 0, x: 20 },
      transition: {
        duration: tokens.animation.durations.normal,
        ease: tokens.animation.easings.in
      }
    }
  }
};