import { Stack } from 'expo-router'
import { useThemeMode } from '@/providers/theme-mode'

export default function SessionLayout() {
  const { isDark } = useThemeMode()

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: isDark ? '#050505' : '#F5F5F7',
        },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="[id]" />
      <Stack.Screen name="finalize" />
    </Stack>
  )
}

