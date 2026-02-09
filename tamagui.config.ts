import { createFont, createTamagui, createTokens } from 'tamagui'
import { shorthands } from '@tamagui/shorthands'
import { animations } from '@tamagui/config/v3'

// CHUNKY BOLD FONT - Duolingo vibes
const headingFont = createFont({
  family: '"Nunito", "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
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
    true: 18,
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
    true: 26,
  },
  weight: {
    4: '600',
    5: '700',
    6: '700',
    7: '800',
    8: '900',
  },
  letterSpacing: {
    4: 0,
    5: -0.5,
    6: -0.5,
    7: -1,
    8: -1.5,
    9: -2,
    10: -2.5,
    11: -3,
    12: -4,
  },
})

// Mono for numbers
const monoFont = createFont({
  family: '"Space Mono", "JetBrains Mono", Menlo, monospace',
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
    true: 18,
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
    true: 26,
  },
  weight: {
    4: '500',
    5: '600',
    6: '700',
    7: '700',
  },
  letterSpacing: {
    4: 0,
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
    // BRUTAL YELLOW - Cyberpunk 2077 vibes
    yellow: '#FCCD00',       // Primary yellow
    yellowBright: '#FFE234', // Hover state
    yellowDark: '#E6B800',   // Pressed state
    yellowMuted: '#FFF8DC',  // Subtle backgrounds
    yellowPale: '#FFFBEB',   // Card highlights
    
    // Pure foundations
    white: '#FFFFFF',
    offWhite: '#FAFAFA',
    cream: '#F5F5F0',
    
    // Blacks for contrast
    black: '#1A1A1A',
    charcoal: '#2D2D2D',
    grey: '#666666',
    greyLight: '#999999',
    greyPale: '#E5E5E5',
    
    // Semantic - Bold & Playful
    success: '#34D058',      // Fresh green for money
    successMuted: '#E6F9ED',
    error: '#FF4757',        // Punchy red
    errorMuted: '#FFE8EA',
    info: '#4A9EFF',         // Sky blue
    infoMuted: '#E8F4FF',
    
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
    8: 40,
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
    heading: headingFont,
    body: headingFont,
    mono: monoFont,
  },
  shorthands,
  animations,
  themes: {
    // LIGHT MODE ONLY - Bright, bold, playful
    light: {
      background: tokens.color.white,
      backgroundStrong: tokens.color.offWhite,
      backgroundHover: tokens.color.cream,
      backgroundPress: tokens.color.greyPale,
      backgroundTransparent: 'rgba(255,255,255,0)',
      
      surface: tokens.color.white,
      surfaceHover: tokens.color.offWhite,
      surfaceActive: tokens.color.cream,
      
      // Text
      color: tokens.color.black,
      colorSubtle: tokens.color.charcoal,
      colorMuted: tokens.color.grey,
      colorFaint: tokens.color.greyLight,
      
      // Borders - THICK AND BOLD
      borderColor: tokens.color.black,
      borderColorSubtle: tokens.color.greyPale,
      borderColorFocus: tokens.color.yellow,
      
      // THE STAR - BRUTAL YELLOW
      primary: tokens.color.yellow,
      primaryHover: tokens.color.yellowBright,
      primaryPress: tokens.color.yellowDark,
      primaryMuted: tokens.color.yellowMuted,
      primaryPale: tokens.color.yellowPale,
      
      // Semantic
      success: tokens.color.success,
      successMuted: tokens.color.successMuted,
      error: tokens.color.error,
      errorMuted: tokens.color.errorMuted,
      info: tokens.color.info,
      infoMuted: tokens.color.infoMuted,
      
      // Shadows - 3D chunky feel
      shadowColor: tokens.color.black,
    },
    // Keep dark as alias to light (no dark mode)
    dark: {
      background: tokens.color.white,
      backgroundStrong: tokens.color.offWhite,
      backgroundHover: tokens.color.cream,
      backgroundPress: tokens.color.greyPale,
      backgroundTransparent: 'rgba(255,255,255,0)',
      
      surface: tokens.color.white,
      surfaceHover: tokens.color.offWhite,
      surfaceActive: tokens.color.cream,
      
      color: tokens.color.black,
      colorSubtle: tokens.color.charcoal,
      colorMuted: tokens.color.grey,
      colorFaint: tokens.color.greyLight,
      
      borderColor: tokens.color.black,
      borderColorSubtle: tokens.color.greyPale,
      borderColorFocus: tokens.color.yellow,
      
      primary: tokens.color.yellow,
      primaryHover: tokens.color.yellowBright,
      primaryPress: tokens.color.yellowDark,
      primaryMuted: tokens.color.yellowMuted,
      primaryPale: tokens.color.yellowPale,
      
      success: tokens.color.success,
      successMuted: tokens.color.successMuted,
      error: tokens.color.error,
      errorMuted: tokens.color.errorMuted,
      info: tokens.color.info,
      infoMuted: tokens.color.infoMuted,
      
      shadowColor: tokens.color.black,
    },
  },
})

export type AppConfig = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig
