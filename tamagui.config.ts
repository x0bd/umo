import { createFont, createTamagui, createTokens } from 'tamagui'
import { shorthands } from '@tamagui/shorthands'
import { animations } from '@tamagui/config/v3'

// System fonts that ACTUALLY work everywhere
const bodyFont = createFont({
  family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  size: {
    1: 12,
    2: 14,
    3: 15,
    4: 16,
    5: 18,
    6: 20,
    7: 24,
    8: 32,
    9: 40,
    10: 52,
    11: 64,
    12: 80,
    true: 16,
  },
  lineHeight: {
    1: 18,
    2: 20,
    3: 22,
    4: 24,
    5: 26,
    6: 28,
    7: 32,
    8: 40,
    9: 50,
    10: 62,
    11: 74,
    12: 92,
    true: 24,
  },
  weight: {
    4: '400',
    5: '500',
    6: '600',
    7: '700',
    8: '800',
    9: '900',
  },
  letterSpacing: {
    4: 0,
    5: 0,
    6: -0.3,
    7: -0.5,
    8: -1,
    9: -1.5,
    10: -2,
    11: -2.5,
    12: -3,
  },
})

// Mono font for numbers
const monoFont = createFont({
  family: '"SF Mono", SFMono-Regular, ui-monospace, Menlo, Monaco, "Cascadia Mono", monospace',
  size: {
    1: 12,
    2: 14,
    3: 15,
    4: 16,
    5: 18,
    6: 20,
    7: 24,
    8: 32,
    9: 40,
    10: 52,
    11: 64,
    12: 80,
    true: 16,
  },
  lineHeight: {
    1: 18,
    2: 20,
    3: 22,
    4: 24,
    5: 26,
    6: 28,
    7: 32,
    8: 40,
    9: 50,
    10: 62,
    11: 74,
    12: 92,
    true: 24,
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
    // BRUTAL YELLOW
    yellow: '#FFE500',        // Bright cyberpunk yellow
    yellowLight: '#FFF44F',   // Lighter
    yellowDark: '#E6CE00',    // Pressed
    yellowPale: '#FFFDE7',    // Soft bg
    
    // Foundations
    white: '#FFFFFF',
    offWhite: '#FAFAFA',
    
    // Blacks & Greys
    black: '#000000',
    ink: '#1A1A1A',
    charcoal: '#333333',
    grey: '#666666',
    greyLight: '#999999',
    greyPale: '#E0E0E0',
    greyFaint: '#F5F5F5',
    
    // Semantic
    green: '#22C55E',
    greenPale: '#DCFCE7',
    red: '#EF4444',
    redPale: '#FEE2E2',
    blue: '#3B82F6',
    bluePale: '#DBEAFE',
    
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
    7: 32,
    true: 16,
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
    light: {
      background: tokens.color.white,
      backgroundStrong: tokens.color.offWhite,
      backgroundHover: tokens.color.greyFaint,
      backgroundPress: tokens.color.greyPale,
      backgroundTransparent: 'rgba(255,255,255,0)',
      
      surface: tokens.color.white,
      surfaceHover: tokens.color.greyFaint,
      
      color: tokens.color.ink,
      colorSubtle: tokens.color.charcoal,
      colorMuted: tokens.color.grey,
      colorFaint: tokens.color.greyLight,
      
      borderColor: tokens.color.ink,
      borderColorSubtle: tokens.color.greyPale,
      
      // YELLOW
      yellow: tokens.color.yellow,
      yellowLight: tokens.color.yellowLight,
      yellowDark: tokens.color.yellowDark,
      yellowPale: tokens.color.yellowPale,
      
      // Semantic
      green: tokens.color.green,
      greenPale: tokens.color.greenPale,
      red: tokens.color.red,
      redPale: tokens.color.redPale,
      blue: tokens.color.blue,
      bluePale: tokens.color.bluePale,
    },
    dark: {
      // Same as light - NO DARK MODE
      background: tokens.color.white,
      backgroundStrong: tokens.color.offWhite,
      backgroundHover: tokens.color.greyFaint,
      backgroundPress: tokens.color.greyPale,
      backgroundTransparent: 'rgba(255,255,255,0)',
      
      surface: tokens.color.white,
      surfaceHover: tokens.color.greyFaint,
      
      color: tokens.color.ink,
      colorSubtle: tokens.color.charcoal,
      colorMuted: tokens.color.grey,
      colorFaint: tokens.color.greyLight,
      
      borderColor: tokens.color.ink,
      borderColorSubtle: tokens.color.greyPale,
      
      yellow: tokens.color.yellow,
      yellowLight: tokens.color.yellowLight,
      yellowDark: tokens.color.yellowDark,
      yellowPale: tokens.color.yellowPale,
      
      green: tokens.color.green,
      greenPale: tokens.color.greenPale,
      red: tokens.color.red,
      redPale: tokens.color.redPale,
      blue: tokens.color.blue,
      bluePale: tokens.color.bluePale,
    },
  },
})

export type AppConfig = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig
