// Design tokens matching https://forcrypto.fun (dark theme)
export const colors = {
  background: "#0a0a0a",
  foreground: "#e5e5e5",
  primary: "#ff6000",
  primaryForeground: "#ffffff",
  muted: "#1a1a1a",
  mutedForeground: "#a3a3a3",
  destructive: "#ef4444",
  border: "#262626",
  surface: "#171717",
  card: "#1a1a1a",
  accent: "#ff6000", // Keep for compatibility
  error: "#ef4444",
  success: "#22c55e",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
} as const;
