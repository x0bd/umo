import { useState, createContext, useContext } from 'react'
import { useColorScheme } from 'react-native'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { TamaguiProvider, Theme } from 'tamagui'
import 'react-native-reanimated'

import config from '@/tamagui.config'

// ============================================
// THEME CONTEXT
// ============================================
type ThemeMode = 'light' | 'dark' | 'system'

interface ThemeContextType {
  mode: ThemeMode
  isDark: boolean
  setMode: (mode: ThemeMode) => void
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'system',
  isDark: true,
  setMode: () => {},
  toggle: () => {},
})

export const useThemeMode = () => useContext(ThemeContext)

// ============================================
// NAVIGATION THEMES
// ============================================
const UmoDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#050505',
    card: '#050505',
    border: '#333333',
    primary: '#FF1A55',
    text: '#FFFFFF',
    notification: '#FF1A55',
  },
}

const UmoLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FAFAFA',
    card: '#FFFFFF',
    border: '#E6E6E6',
    primary: '#FF1A55',
    text: '#111111',
    notification: '#FF1A55',
  },
}

// ============================================
// ROOT LAYOUT
// ============================================
export const unstable_settings = {
  initialRouteName: 'onboarding',
}

export default function RootLayout() {
  const systemColorScheme = useColorScheme()
  const [mode, setMode] = useState<ThemeMode>('system')

  // Resolve actual theme
  const resolvedTheme = mode === 'system' 
    ? (systemColorScheme ?? 'dark') 
    : mode
  const isDark = resolvedTheme === 'dark'

  const toggle = () => {
    setMode(isDark ? 'light' : 'dark')
  }

  const themeContextValue: ThemeContextType = {
    mode,
    isDark,
    setMode,
    toggle,
  }

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <TamaguiProvider config={config} defaultTheme={resolvedTheme}>
        <Theme name={resolvedTheme}>
          <ThemeProvider value={isDark ? UmoDarkTheme : UmoLightTheme}>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { 
                  backgroundColor: isDark ? '#050505' : '#FAFAFA' 
                },
                animation: 'slide_from_right',
              }}
            >
              <Stack.Screen 
                name="onboarding" 
                options={{ 
                  animation: 'fade',
                }} 
              />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen 
                name="modal" 
                options={{ 
                  presentation: 'modal',
                  animation: 'slide_from_bottom',
                }} 
              />
            </Stack>
            <StatusBar style={isDark ? 'light' : 'dark'} />
          </ThemeProvider>
        </Theme>
      </TamaguiProvider>
    </ThemeContext.Provider>
  )
}
