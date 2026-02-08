// Theme constants matching For Crypto website - LIGHT THEME with ORANGE ACCENTS
export const Colors = {
  primary: '#ff6000',           // Orange accent/primary
  primaryForeground: '#ffffff', // White text on orange
  background: '#ffffff',        // White background  
  foreground: '#1a1a1a',       // Dark text on white
  muted: '#f5f5f5',            // Light gray muted
  mutedForeground: '#525252',   // Medium gray text
  border: '#e5e5e5',           // Light border
  surface: '#f5f5f5',          // Light surface
  card: '#f5f5f5',             // Light card background
  destructive: '#dc2626',
  destructiveForeground: '#ffffff',
} as const;

export const Typography = {
  fontFamily: 'Figtree',
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
} as const;