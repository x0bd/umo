import { Tabs } from 'expo-router'
import { View } from 'tamagui'

import { FloatingDock } from '@/components/floating-dock'

export default function TabLayout() {
  return (
    <View flex={1}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="explore" />
      </Tabs>
      <FloatingDock />
    </View>
  )
}
