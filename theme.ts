export const theme = {
  colors: {
    primary: '#ff6000',
    primaryForeground: '#ffffff',
    background: '#ffffff',
    foreground: '#151515',
    muted: '#f2f2f2',
    mutedForeground: '#525252',
    destructive: '#dc2626',
    destructiveForeground: '#ffffff',
    border: '#e5e5e5',
    input: '#f2f2f2',
    ring: '#ff6000',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
}

export type Theme = typeof theme