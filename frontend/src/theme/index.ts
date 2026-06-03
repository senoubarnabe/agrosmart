import { Platform } from "react-native";

export const colors = {
  surface: "#f7fbf1",
  surfaceDim: "#d8dbd2",
  surfaceBright: "#f7fbf1",
  surfaceContainerLowest: "#ffffff",
  surfaceContainerLow: "#f2f5ec",
  surfaceContainer: "#ecefe6",
  surfaceContainerHigh: "#e6e9e0",
  surfaceContainerHighest: "#e0e4db",
  onSurface: "#191d17",
  onSurfaceVariant: "#41493e",
  inverseSurface: "#2d322c",
  inverseOnSurface: "#eff2e9",
  outline: "#717a6d",
  outlineVariant: "#c0c9bb",
  surfaceTint: "#2a6b2c",
  primary: "#00450d",
  onPrimary: "#ffffff",
  primaryContainer: "#1b5e20",
  onPrimaryContainer: "#90d689",
  inversePrimary: "#91d78a",
  secondary: "#8f4e00",
  onSecondary: "#ffffff",
  secondaryContainer: "#ff8f00",
  onSecondaryContainer: "#623400",
  tertiary: "#721900",
  onTertiary: "#ffffff",
  tertiaryContainer: "#9b2500",
  onTertiaryContainer: "#ffb29d",
  error: "#ba1a1a",
  onError: "#ffffff",
  errorContainer: "#ffdad6",
  onErrorContainer: "#93000a",
  primaryFixed: "#acf4a4",
  primaryFixedDim: "#91d78a",
  onPrimaryFixed: "#002203",
  onPrimaryFixedVariant: "#0c5216",
  secondaryFixed: "#ffdcc2",
  secondaryFixedDim: "#ffb77a",
  onSecondaryFixed: "#2e1500",
  onSecondaryFixedVariant: "#6d3a00",
  tertiaryFixed: "#ffdbd1",
  tertiaryFixedDim: "#ffb5a1",
  onTertiaryFixed: "#3b0800",
  onTertiaryFixedVariant: "#881f00",
  background: "#f7fbf1",
  water: "#4aa7ff",
};

export const spacing = {
  base: 8,
  gutter: 16,
  mobile: 20,
  stackSm: 12,
  stackMd: 24,
  stackLg: 40,
};

export const radius = {
  sm: 4,
  md: 12,
  lg: 16,
  xl: 24,
  card: 24,
  full: 999,
};

export const type = {
  display: { fontSize: 48, lineHeight: 56, fontWeight: "700" as const },
  h1: { fontSize: 32, lineHeight: 40, fontWeight: "700" as const },
  h1Mobile: { fontSize: 24, lineHeight: 32, fontWeight: "700" as const },
  h2: { fontSize: 20, lineHeight: 28, fontWeight: "700" as const },
  bodyLg: { fontSize: 18, lineHeight: 26, fontWeight: "500" as const },
  body: { fontSize: 16, lineHeight: 24, fontWeight: "400" as const },
  label: { fontSize: 14, lineHeight: 20, fontWeight: "800" as const },
  labelSm: { fontSize: 12, lineHeight: 16, fontWeight: "700" as const },
};

export const fonts = {
  heading: Platform.select({ ios: "Avenir Next", android: "sans-serif-condensed", default: "system-ui" }),
  body: Platform.select({ ios: "Avenir", android: "sans-serif", default: "system-ui" }),
};

export const shadow = {
  card: {
    shadowColor: colors.primaryContainer,
    shadowOpacity: 0.1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  lift: {
    shadowColor: colors.primaryContainer,
    shadowOpacity: 0.16,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
};
