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
    background: '#0A0A0B',
    card: '#111113',
    border: '#2A2A2E',
    primary: '#E85D75',
    text: '#FFFFFF',
    notification: '#E85D75',
  },
}

const UmoLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F4F4F5',
    card: '#FFFFFF',
    border: '#D4D4D8',
    primary: '#E85D75',
    text: '#111113',
    notification: '#E85D75',
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
                backgroundColor: isDark ? '#0A0A0B' : '#F4F4F5',
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
            <Stack.Screen name="settings" />
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
