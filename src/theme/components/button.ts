import { tokens } from '../tokens';

export const buttonStyles = {
  base: {
    display: 'inline-flex items-center justify-center',
    font: 'font-medium',
    transition: 'transition-colors duration-200',
    focus: 'focus:outline-none focus:ring-2 focus:ring-offset-2'
  },
  variants: {
    primary: {
      background: 'bg-primary hover:bg-primary-dark',
      text: 'text-white',
      border: 'border-transparent'
    },
    secondary: {
      background: 'bg-gray-100 hover:bg-gray-200',
      text: 'text-gray-900',
      border: 'border-gray-200'
    },
    ghost: {
      background: 'hover:bg-gray-100',
      text: 'text-gray-600 hover:text-gray-900',
      border: 'border-transparent'
    },
    destructive: {
      background: 'bg-red-600 hover:bg-red-700',
      text: 'text-white',
      border: 'border-transparent'
    }
  },
  sizes: {
    sm: {
      padding: 'px-3 py-1.5',
      text: 'text-sm',
      height: 'h-8'
    },
    md: {
      padding: 'px-4 py-2',
      text: 'text-base',
      height: 'h-10'
    },
    lg: {
      padding: 'px-6 py-3',
      text: 'text-lg',
      height: 'h-12'
    },
    icon: {
      padding: 'p-2',
      size: 'w-9 h-9'
    }
  }
};