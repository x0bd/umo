import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { TamaguiProvider, Theme } from 'tamagui'
import 'react-native-reanimated'

import config from '@/tamagui.config'
import { ThemeModeProvider, useThemeMode } from '@/providers/theme-mode'

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

function RootLayoutInner() {
  const { resolvedTheme, isDark } = useThemeMode()
  return (
    <TamaguiProvider config={config} defaultTheme={resolvedTheme}>
      <Theme name={resolvedTheme}>
        <ThemeProvider value={isDark ? UmoDarkTheme : UmoLightTheme}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: isDark ? '#050505' : '#FAFAFA',
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
            <Stack.Screen name="session" />
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
  )
}

export default function RootLayout() {
  return (
    <ThemeModeProvider>
      <RootLayoutInner />
    </ThemeModeProvider>
  )
}
