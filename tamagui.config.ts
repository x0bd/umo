import { config } from '@tamagui/config/v3'
import { createTamagui } from 'tamagui'

// Custom tokens for Umo fintech theme
const customTokens = {
  color: {
    // Primary brand colors
    primary: '#0066FF',
    primaryDark: '#0052CC',
    primaryLight: '#3384FF',
    
    // USD color
    usdGreen: '#00C853',
    usdGreenLight: '#69F0AE',
    
    // ZiG color
    zigBlue: '#2962FF',
    zigBlueLight: '#768FFF',
    
    // Neutrals
    background: '#FFFFFF',
    backgroundDark: '#0A0A0A',
    surface: '#F5F5F5',
    surfaceDark: '#1A1A1A',
    
    // Semantic colors
    success: '#00C853',
    warning: '#FFB300',
    error: '#FF3B30',
    
    // Text colors
    textPrimary: '#000000',
    textSecondary: '#666666',
    textTertiary: '#999999',
    textPrimaryDark: '#FFFFFF',
    textSecondaryDark: '#AAAAAA',
    textTertiaryDark: '#666666',
  },
  radius: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    true: 12, // default
    full: 9999,
  },
}

const tamaguiConfig = createTamagui({
  ...config,
  tokens: {
    ...config.tokens,
    color: {
      ...config.tokens.color,
      ...customTokens.color,
    },
    radius: {
      ...config.tokens.radius,
      ...customTokens.radius,
    },
  },
  themes: {
    light: {
      background: customTokens.color.background,
      backgroundHover: customTokens.color.surface,
      backgroundPress: customTokens.color.surface,
      backgroundFocus: customTokens.color.surface,
      color: customTokens.color.textPrimary,
      colorHover: customTokens.color.textSecondary,
      colorPress: customTokens.color.textPrimary,
      colorFocus: customTokens.color.textPrimary,
      borderColor: '#E0E0E0',
      borderColorHover: '#CCCCCC',
      borderColorPress: '#B3B3B3',
      borderColorFocus: customTokens.color.primary,
      placeholderColor: customTokens.color.textTertiary,
      primary: customTokens.color.primary,
      primaryHover: customTokens.color.primaryDark,
      primaryPress: customTokens.color.primaryDark,
      success: customTokens.color.success,
      warning: customTokens.color.warning,
      error: customTokens.color.error,
    },
    dark: {
      background: customTokens.color.backgroundDark,
      backgroundHover: customTokens.color.surfaceDark,
      backgroundPress: customTokens.color.surfaceDark,
      backgroundFocus: customTokens.color.surfaceDark,
      color: customTokens.color.textPrimaryDark,
      colorHover: customTokens.color.textSecondaryDark,
      colorPress: customTokens.color.textPrimaryDark,
      colorFocus: customTokens.color.textPrimaryDark,
      borderColor: '#2A2A2A',
      borderColorHover: '#3A3A3A',
      borderColorPress: '#4A4A4A',
      borderColorFocus: customTokens.color.primary,
      placeholderColor: customTokens.color.textTertiaryDark,
      primary: customTokens.color.primaryLight,
      primaryHover: customTokens.color.primary,
      primaryPress: customTokens.color.primary,
      success: customTokens.color.success,
      warning: customTokens.color.warning,
      error: customTokens.color.error,
    },
  },
})

export type AppConfig = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig

