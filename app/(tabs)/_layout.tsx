import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { Home, Receipt, Users, User } from '@tamagui/lucide-icons';

import { HapticTab } from '@/components/haptic-tab';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1A1A1A',
        tabBarInactiveTintColor: '#999999',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#1A1A1A',
          borderTopWidth: 3,
          paddingTop: 12,
          paddingBottom: Platform.OS === 'ios' ? 28 : 16,
          height: Platform.OS === 'ios' ? 96 : 76,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Home 
              size={26} 
              color={focused ? '#FCCD00' : color} 
              strokeWidth={focused ? 3 : 2} 
              fill={focused ? '#FCCD00' : 'none'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Activity',
          tabBarIcon: ({ color, focused }) => (
            <Receipt 
              size={26} 
              color={focused ? '#FCCD00' : color} 
              strokeWidth={focused ? 3 : 2}
              fill={focused ? '#FCCD00' : 'none'}
            />
          ),
        }}
      />
    </Tabs>
  );
}
