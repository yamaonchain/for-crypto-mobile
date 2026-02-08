// Theme constants matching For Crypto website
export const Colors = {
  primary: '#ff6000',      // Orange primary
  primaryForeground: '#ffffff',
  background: '#ffffff',
  foreground: '#151515',
  muted: '#f2f2f2',
  mutedForeground: '#525252',
  border: '#e5e5e5',
  surface: '#fafafa',
  card: '#f2f2f2',
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