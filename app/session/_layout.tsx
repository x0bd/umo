import { useThemeMode } from '@/providers/theme-mode'
import { Stack } from 'expo-router'

export default function SessionLayout() {
  const { isDark } = useThemeMode()

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: isDark ? '#0A0A0B' : '#F4F4F5',
        },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="[id]" />
      <Stack.Screen name="finalize" />
    </Stack>
  )
}

