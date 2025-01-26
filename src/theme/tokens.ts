// Design tokens for the entire application
export const tokens = {
  colors: {
    primary: {
      50: '#f5f7fa',
      100: '#ebeef5',
      200: '#d8e0ed',
      300: '#b4c2db',
      400: '#8fa4c8',
      500: '#6a86b6',
      600: '#4f6a9f',
      700: '#3d5482',
      800: '#2c3d61',
      900: '#1b2640',
      DEFAULT: '#003057'
    },
    gray: {
      50: '#f8f9fa',
      100: '#f1f3f5',
      200: '#e9ecef',
      300: '#dee2e6',
      400: '#ced4da',
      500: '#adb5bd',
      600: '#868e96',
      700: '#495057',
      800: '#343a40',
      900: '#212529'
    },
    success: {
      light: '#d1fae5',
      DEFAULT: '#059669',
      dark: '#065f46'
    },
    warning: {
      light: '#fef3c7',
      DEFAULT: '#d97706',
      dark: '#92400e'
    },
    error: {
      light: '#fee2e2',
      DEFAULT: '#dc2626',
      dark: '#991b1b'
    },
    info: {
      light: '#dbeafe',
      DEFAULT: '#2563eb',
      dark: '#1e40af'
    }
  },
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem'
  },
  typography: {
    fonts: {
      sans: '"Open Sans", Arial, sans-serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
    },
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    },
    weights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    },
    lineHeights: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2'
    }
  },
  animation: {
    durations: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    },
    easings: {
      default: [0.4, 0, 0.2, 1],
      in: [0.4, 0, 1, 1],
      out: [0, 0, 0.2, 1],
      inOut: [0.4, 0, 0.2, 1]
    }
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
  },
  radii: {
    none: '0',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px'
  }
};