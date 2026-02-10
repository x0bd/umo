import { animations } from '@tamagui/config/v3'
import { shorthands } from '@tamagui/shorthands'
import { createFont, createTamagui, createTokens } from 'tamagui'

// ============================================
// UMO DESIGN SYSTEM
// Swiss Minimalism × Material You
// ============================================

// Premium sans-serif with excellent legibility
const bodyFont = createFont({
  family: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
  size: {
    1: 11,
    2: 12,
    3: 13,
    4: 14,
    5: 15,
    6: 17,
    7: 20,
    8: 24,
    9: 32,
    10: 40,
    11: 48,
    12: 64,
    true: 15,
  },
  lineHeight: {
    1: 14,
    2: 16,
    3: 17,
    4: 18,
    5: 20,
    6: 22,
    7: 26,
    8: 30,
    9: 38,
    10: 46,
    11: 54,
    12: 70,
    true: 20,
  },
  weight: {
    1: '400',
    2: '400',
    3: '400',
    4: '450',
    5: '500',
    6: '550',
    7: '600',
    8: '700',
    9: '800',
  },
  letterSpacing: {
    1: 0.4,
    2: 0.2,
    3: 0.1,
    4: 0,
    5: -0.2,
    6: -0.4,
    7: -0.6,
    8: -0.8,
    9: -1,
    10: -1.2,
    11: -1.5,
    12: -2,
  },
})

// Refined monospace for numbers
const monoFont = createFont({
  family: "'SF Mono', 'JetBrains Mono', 'Fira Code', ui-monospace, Menlo, Monaco, monospace",
  size: {
    1: 11,
    2: 12,
    3: 13,
    4: 14,
    5: 15,
    6: 17,
    7: 20,
    8: 24,
    9: 32,
    10: 40,
    11: 48,
    12: 64,
    true: 15,
  },
  lineHeight: {
    1: 14,
    2: 16,
    3: 17,
    4: 18,
    5: 20,
    6: 22,
    7: 26,
    8: 30,
    9: 38,
    10: 46,
    11: 54,
    12: 70,
    true: 20,
  },
  weight: {
    4: '400',
    5: '500',
    6: '600',
    7: '700',
  },
  letterSpacing: {
    4: -0.3,
    5: -0.4,
    6: -0.6,
    7: -0.8,
    8: -1,
    9: -1.2,
    10: -1.5,
    11: -1.8,
    12: -2.2,
  },
})

const tokens = createTokens({
  color: {
    // ========== NEUTRALS (Warm-tinted) ==========
    // Dark Mode Surfaces
    neutral950: '#0A0A0B',
    neutral900: '#111113',
    neutral850: '#161618',
    neutral800: '#1C1C1F',
    neutral750: '#232326',
    neutral700: '#2A2A2E',
    neutral600: '#3A3A40',
    neutral500: '#52525B',
    neutral400: '#71717A',
    neutral300: '#A1A1AA',
    neutral200: '#D4D4D8',
    neutral100: '#E4E4E7',
    neutral50: '#F4F4F5',
    neutral25: '#FAFAFA',
    white: '#FFFFFF',
    black: '#000000',

    // ========== ACCENT (Coral/Rose — restrained) ==========
    accent: '#E85D75',        // Primary accent - warm coral-rose
    accentMuted: '#D4566B',   // Hover state
    accentSoft: 'rgba(232, 93, 117, 0.12)',
    accentGhost: 'rgba(232, 93, 117, 0.06)',

    // ========== SEMANTIC ==========
    success: '#22C55E',
    successMuted: '#16A34A',
    successSoft: 'rgba(34, 197, 94, 0.12)',

    warning: '#F59E0B',
    warningSoft: 'rgba(245, 158, 11, 0.12)',

    error: '#EF4444',
    errorSoft: 'rgba(239, 68, 68, 0.12)',

    info: '#3B82F6',
    infoSoft: 'rgba(59, 130, 246, 0.12)',

    // ========== SPECIAL ==========
    overlay: 'rgba(0,0,0,0.5)',
    glass: 'rgba(255,255,255,0.05)',
    glassDark: 'rgba(0,0,0,0.3)',

    transparent: 'transparent',
  },
  space: {
    0: 0,
    0.5: 2,
    1: 4,
    1.5: 6,
    2: 8,
    2.5: 10,
    3: 12,
    3.5: 14,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    12: 48,
    14: 56,
    16: 64,
    20: 80,
    true: 16,
  },
  size: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 44,
    12: 48,
    14: 56,
    16: 64,
    20: 80,
    true: 44,
  },
  radius: {
    0: 0,
    1: 4,
    2: 6,
    3: 8,
    4: 12,
    5: 16,
    6: 20,
    7: 24,
    8: 28,
    full: 9999,
    true: 16,
  },
  zIndex: {
    0: 0,
    1: 100,
    2: 200,
    3: 300,
    4: 400,
    5: 500,
  },
})

const tamaguiConfig = createTamagui({
  tokens,
  fonts: {
    heading: bodyFont,
    body: bodyFont,
    mono: monoFont,
  },
  shorthands,
  animations,
  themes: {
    dark: {
      // Surfaces
      background: tokens.color.neutral950,
      backgroundStrong: tokens.color.black,
      backgroundSoft: tokens.color.neutral900,
      backgroundMuted: tokens.color.neutral850,
      backgroundHover: tokens.color.neutral800,
      backgroundPress: tokens.color.neutral750,
      backgroundTransparent: 'rgba(0,0,0,0)',

      // Elevated surfaces
      surface: tokens.color.neutral900,
      surfaceHover: tokens.color.neutral850,
      surfaceActive: tokens.color.neutral800,
      surfaceRaised: tokens.color.neutral850,

      // Text
      color: tokens.color.white,
      colorStrong: tokens.color.white,
      colorSoft: tokens.color.neutral200,
      colorMuted: tokens.color.neutral400,
      colorFaint: tokens.color.neutral500,
      colorGhost: tokens.color.neutral600,

      // Borders
      borderColor: tokens.color.neutral700,
      borderColorSoft: tokens.color.neutral800,
      borderColorStrong: tokens.color.neutral600,
      borderColorAccent: tokens.color.accent,

      // Accent
      accent: tokens.color.accent,
      accentMuted: tokens.color.accentMuted,
      accentSoft: tokens.color.accentSoft,
      accentGhost: tokens.color.accentGhost,
      accentText: tokens.color.white,

      // Semantic
      success: tokens.color.success,
      successSoft: tokens.color.successSoft,
      warning: tokens.color.warning,
      warningSoft: tokens.color.warningSoft,
      error: tokens.color.error,
      errorSoft: tokens.color.errorSoft,
      info: tokens.color.info,
      infoSoft: tokens.color.infoSoft,

      // Components
      cardBg: tokens.color.neutral900,
      cardBgHover: tokens.color.neutral850,
      cardBorder: tokens.color.neutral800,
      cardBorderHover: tokens.color.neutral700,

      dockBg: 'rgba(17,17,19,0.92)',
      dockBorder: tokens.color.neutral800,

      inputBg: tokens.color.neutral850,
      inputBorder: tokens.color.neutral700,
      inputBorderFocus: tokens.color.accent,

      // Overlays
      overlay: tokens.color.overlay,
      glass: tokens.color.glass,

      // Feature card (accent tinted)
      featureBg: tokens.color.neutral900,
      featureBorder: 'rgba(232, 93, 117, 0.08)',
      featureGlow: 'rgba(232, 93, 117, 0.04)',
    },
    light: {
      // Surfaces
      background: tokens.color.neutral50,
      backgroundStrong: tokens.color.white,
      backgroundSoft: tokens.color.neutral25,
      backgroundMuted: tokens.color.neutral100,
      backgroundHover: tokens.color.neutral100,
      backgroundPress: tokens.color.neutral200,
      backgroundTransparent: 'rgba(255,255,255,0)',

      // Elevated surfaces
      surface: tokens.color.white,
      surfaceHover: tokens.color.neutral50,
      surfaceActive: tokens.color.neutral100,
      surfaceRaised: tokens.color.white,

      // Text
      color: tokens.color.neutral900,
      colorStrong: tokens.color.black,
      colorSoft: tokens.color.neutral700,
      colorMuted: tokens.color.neutral500,
      colorFaint: tokens.color.neutral400,
      colorGhost: tokens.color.neutral300,

      // Borders
      borderColor: tokens.color.neutral200,
      borderColorSoft: tokens.color.neutral100,
      borderColorStrong: tokens.color.neutral300,
      borderColorAccent: tokens.color.accent,

      // Accent
      accent: tokens.color.accent,
      accentMuted: tokens.color.accentMuted,
      accentSoft: tokens.color.accentSoft,
      accentGhost: tokens.color.accentGhost,
      accentText: tokens.color.white,

      // Semantic
      success: tokens.color.successMuted,
      successSoft: tokens.color.successSoft,
      warning: tokens.color.warning,
      warningSoft: tokens.color.warningSoft,
      error: tokens.color.error,
      errorSoft: tokens.color.errorSoft,
      info: tokens.color.info,
      infoSoft: tokens.color.infoSoft,

      // Components
      cardBg: tokens.color.white,
      cardBgHover: tokens.color.neutral50,
      cardBorder: tokens.color.neutral200,
      cardBorderHover: tokens.color.neutral300,

      dockBg: 'rgba(255,255,255,0.88)',
      dockBorder: tokens.color.neutral200,

      inputBg: tokens.color.white,
      inputBorder: tokens.color.neutral200,
      inputBorderFocus: tokens.color.accent,

      // Overlays
      overlay: 'rgba(0,0,0,0.3)',
      glass: 'rgba(255,255,255,0.7)',

      // Feature card (accent tinted)
      featureBg: tokens.color.white,
      featureBorder: 'rgba(232, 93, 117, 0.06)',
      featureGlow: 'rgba(232, 93, 117, 0.02)',
    },
  },
})

export type AppConfig = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig
