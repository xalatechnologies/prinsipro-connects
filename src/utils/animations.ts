import { tokens } from '@/theme/tokens';

export function createStaggeredItemVariants(index: number) {
  return {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: tokens.animation.durations.normal,
        ease: tokens.animation.easings.out,
        delay: index * 0.1
      }
    }
  };
}

export const animationConfig = {
  card: {
    hover: {
      scale: 1.02,
      transition: {
        duration: tokens.animation.durations.fast,
        ease: tokens.animation.easings.default
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: tokens.animation.durations.fast,
        ease: tokens.animation.easings.default
      }
    }
  },
  list: {
    container: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          ease: tokens.animation.easings.out
        }
      }
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      show: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: tokens.animation.durations.normal,
          ease: tokens.animation.easings.out
        }
      }
    }
  },
  fade: {
    in: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: {
        duration: tokens.animation.durations.normal,
        ease: tokens.animation.easings.out
      }
    },
    out: {
      initial: { opacity: 1 },
      animate: { opacity: 0 },
      transition: {
        duration: tokens.animation.durations.normal,
        ease: tokens.animation.easings.in
      }
    }
  },
  slide: {
    up: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: tokens.animation.durations.normal,
        ease: tokens.animation.easings.out
      }
    },
    down: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: tokens.animation.durations.normal,
        ease: tokens.animation.easings.out
      }
    },
    left: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      transition: {
        duration: tokens.animation.durations.normal,
        ease: tokens.animation.easings.out
      }
    },
    right: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: {
        duration: tokens.animation.durations.normal,
        ease: tokens.animation.easings.out
      }
    }
  }
};