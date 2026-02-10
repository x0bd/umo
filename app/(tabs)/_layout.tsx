import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { Home, Activity } from '@tamagui/lucide-icons';

import { HapticTab } from '@/components/haptic-tab';
import { useThemeMode } from '@/providers/theme-mode';

export default function TabLayout() {
  const { isDark } = useThemeMode();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF1A55',
        tabBarInactiveTintColor: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: isDark ? '#050505' : '#FFFFFF',
          borderTopColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
          height: Platform.OS === 'ios' ? 88 : 64,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          letterSpacing: 0.5,
          textTransform: 'uppercase',
          marginTop: 2,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Home 
              size={22} 
              color={color} 
              strokeWidth={focused ? 2.5 : 1.5}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Activity',
          tabBarIcon: ({ color, focused }) => (
            <Activity 
              size={22} 
              color={color} 
              strokeWidth={focused ? 2.5 : 1.5}
            />
          ),
        }}
      />
    </Tabs>
  );
}
