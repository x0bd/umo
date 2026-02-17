import { AuthProvider, useAuth } from '@/providers/auth'
import { ThemeModeProvider, useThemeMode } from '@/providers/theme-mode'
import config from '@/tamagui.config'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import 'react-native-reanimated'
import { TamaguiProvider, Theme, YStack } from 'tamagui'

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

// ============================================
// AUTH GUARD — Redirects based on session
// ============================================
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (isLoading) return

    if (isAuthenticated) {
      router.replace('/(tabs)')
    }
    // If not authenticated, stay on onboarding (initialRouteName)
  }, [isAuthenticated, isLoading])

  if (isLoading) {
    return (
      <YStack flex={1} backgroundColor="$background" alignItems="center" justifyContent="center">
        <ActivityIndicator size="large" color="#E85D75" />
      </YStack>
    )
  }

  return <>{children}</>
}

function RootLayoutInner() {
  const { resolvedTheme, isDark } = useThemeMode()
  return (
    <TamaguiProvider config={config} defaultTheme={resolvedTheme}>
      <Theme name={resolvedTheme}>
        <ThemeProvider value={isDark ? UmoDarkTheme : UmoLightTheme}>
          <AuthProvider>
            <AuthGuard>
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
                <Stack.Screen
                  name="create-account"
                  options={{
                    animation: 'slide_from_right',
                  }}
                />
                <Stack.Screen
                  name="sign-in"
                  options={{
                    animation: 'slide_from_right',
                  }}
                />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="session" />
                <Stack.Screen name="settings" />
                <Stack.Screen
                  name="join"
                  options={{
                    presentation: 'modal',
                    animation: 'slide_from_bottom',
                  }}
                />
                <Stack.Screen
                  name="modal"
                  options={{
                    presentation: 'modal',
                    animation: 'slide_from_bottom',
                  }}
                />
              </Stack>
            </AuthGuard>
          </AuthProvider>
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
