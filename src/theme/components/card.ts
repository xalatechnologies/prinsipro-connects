import { tokens } from '../tokens';

export const cardStyles = {
  base: {
    background: 'bg-white',
    border: 'border border-gray-200',
    padding: 'p-6',
    radius: 'rounded-xl',
    shadow: 'shadow-sm'
  },
  variants: {
    default: {
      background: 'bg-white',
      hover: ''
    },
    hover: {
      background: 'bg-white hover:bg-gray-50',
      transform: 'transition-transform hover:scale-[1.02]'
    },
    interactive: {
      background: 'bg-white hover:bg-gray-50',
      transform: 'transition-all hover:scale-[1.02] hover:-translate-y-1',
      shadow: 'shadow-sm hover:shadow-md'
    }
  },
  sizes: {
    sm: { padding: 'p-4' },
    md: { padding: 'p-6' },
    lg: { padding: 'p-8' }
  }
};

export const cardAnimations = {
  enter: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: tokens.animation.durations.normal,
      ease: tokens.animation.easings.out
    }
  },
  exit: {
    initial: { opacity: 1, y: 0 },
    animate: { opacity: 0, y: -20 },
    transition: {
      duration: tokens.animation.durations.normal,
      ease: tokens.animation.easings.in
    }
  }
};