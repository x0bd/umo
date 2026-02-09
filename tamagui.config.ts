import { createFont, createTamagui, createTokens } from 'tamagui'
import { shorthands } from '@tamagui/shorthands'
import { animations } from '@tamagui/config/v3'

// ============================================
// SPLTR-INSPIRED DESIGN SYSTEM
// Dark + Hot Pink + Grey
// ============================================

const bodyFont = createFont({
  family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  size: {
    1: 10,
    2: 12,
    3: 14,
    4: 15,
    5: 16,
    6: 20,
    7: 24,
    8: 32,
    9: 40,
    10: 48,
    11: 56,
    12: 72,
    true: 15,
  },
  lineHeight: {
    1: 14,
    2: 16,
    3: 18,
    4: 20,
    5: 22,
    6: 26,
    7: 30,
    8: 36,
    9: 44,
    10: 52,
    11: 58,
    12: 76,
    true: 20,
  },
  weight: {
    1: '400',
    2: '400',
    3: '400',
    4: '400',
    5: '500',
    6: '600',
    7: '700',
    8: '800',
    9: '900',
  },
  letterSpacing: {
    1: 0.5,
    2: 0.5,
    3: 0,
    4: 0,
    5: -0.3,
    6: -0.5,
    7: -0.8,
    8: -1.5,
    9: -2,
    10: -2,
    11: -3,
    12: -4,
  },
})

const monoFont = createFont({
  family: "'SF Mono', SFMono-Regular, ui-monospace, Menlo, Monaco, 'Cascadia Mono', monospace",
  size: {
    1: 10,
    2: 12,
    3: 14,
    4: 15,
    5: 16,
    6: 20,
    7: 24,
    8: 32,
    9: 40,
    10: 48,
    11: 56,
    12: 72,
    true: 15,
  },
  lineHeight: {
    1: 14,
    2: 16,
    3: 18,
    4: 20,
    5: 22,
    6: 26,
    7: 30,
    8: 36,
    9: 44,
    10: 52,
    11: 58,
    12: 76,
    true: 20,
  },
  weight: {
    4: '400',
    5: '500',
    6: '600',
    7: '700',
  },
  letterSpacing: {
    4: -0.5,
    5: -0.5,
    6: -1,
    7: -1.5,
    8: -2,
    9: -2.5,
    10: -3,
    11: -3,
    12: -4,
  },
})

const tokens = createTokens({
  color: {
    // Core dark
    bgDark: '#050505',
    bgBlack: '#080808',
    bgCard: '#0D0D0D',

    // Hot pink accent
    pink: '#FF1A55',
    pinkDark: '#E6003D',
    pinkText: '#450010',
    pinkLine: '#CC003A',
    pinkMuted: 'rgba(255, 26, 85, 0.15)',
    pinkSoft: 'rgba(255, 26, 85, 0.08)',

    // Grey card
    grey: '#E6E6E6',
    greyDark: '#D1D1D1',
    greyMid: '#C4C4C4',
    greyText: '#111111',
    greySub: '#555555',
    greyLine: '#BBBBBB',
    greyFaint: 'rgba(0,0,0,0.08)',

    // Text
    white: '#FFFFFF',
    whiteDim: 'rgba(255,255,255,0.8)',
    whiteMuted: 'rgba(255,255,255,0.5)',
    whiteGhost: 'rgba(255,255,255,0.2)',
    black: '#000000',
    blackDim: 'rgba(0,0,0,0.6)',
    blackMuted: 'rgba(0,0,0,0.4)',

    // Accents
    line: '#333333',
    lineFaint: 'rgba(255,255,255,0.1)',
    pill: '#1A1A1A',
    accent666: '#666666',
    accent808: '#808080',
    accent999: '#999999',

    // Semantic
    green: '#00E676',
    greenDark: '#00C853',
    red: '#FF3B5C',

    transparent: 'transparent',
  },
  space: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 32,
    8: 40,
    9: 48,
    10: 64,
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
    7: 32,
    8: 40,
    9: 48,
    10: 64,
    11: 80,
    12: 96,
    true: 48,
  },
  radius: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 50,
    true: 28,
    full: 9999,
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
      background: tokens.color.bgDark,
      backgroundStrong: tokens.color.bgBlack,
      backgroundHover: tokens.color.bgCard,
      backgroundPress: tokens.color.line,
      backgroundTransparent: 'rgba(0,0,0,0)',

      surface: tokens.color.bgCard,
      surfaceHover: tokens.color.line,

      color: tokens.color.white,
      colorSubtle: tokens.color.whiteDim,
      colorMuted: tokens.color.whiteMuted,
      colorFaint: tokens.color.whiteGhost,

      borderColor: tokens.color.line,
      borderColorSubtle: tokens.color.lineFaint,

      // Pink accent
      pink: tokens.color.pink,
      pinkDark: tokens.color.pinkDark,
      pinkText: tokens.color.pinkText,
      pinkMuted: tokens.color.pinkMuted,

      // Grey card
      grey: tokens.color.grey,
      greyText: tokens.color.greyText,
      greySub: tokens.color.greySub,

      // Semantic
      green: tokens.color.green,
      red: tokens.color.red,
    },
    light: {
      // Mirror dark — this app IS dark mode
      background: tokens.color.bgDark,
      backgroundStrong: tokens.color.bgBlack,
      backgroundHover: tokens.color.bgCard,
      backgroundPress: tokens.color.line,
      backgroundTransparent: 'rgba(0,0,0,0)',

      surface: tokens.color.bgCard,
      surfaceHover: tokens.color.line,

      color: tokens.color.white,
      colorSubtle: tokens.color.whiteDim,
      colorMuted: tokens.color.whiteMuted,
      colorFaint: tokens.color.whiteGhost,

      borderColor: tokens.color.line,
      borderColorSubtle: tokens.color.lineFaint,

      pink: tokens.color.pink,
      pinkDark: tokens.color.pinkDark,
      pinkText: tokens.color.pinkText,
      pinkMuted: tokens.color.pinkMuted,

      grey: tokens.color.grey,
      greyText: tokens.color.greyText,
      greySub: tokens.color.greySub,

      green: tokens.color.green,
      red: tokens.color.red,
    },
  },
})

export type AppConfig = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig
