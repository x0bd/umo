import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TamaguiProvider, Theme } from 'tamagui';
import 'react-native-reanimated';

import config from '@/tamagui.config';

// Full dark theme matching the spltr aesthetic
const UmoTheme = {
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
};

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <TamaguiProvider config={config} defaultTheme="dark">
      <Theme name="dark">
        <ThemeProvider value={UmoTheme}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#050505' },
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen 
              name="modal" 
              options={{ 
                presentation: 'modal',
                animation: 'slide_from_bottom',
              }} 
            />
          </Stack>
          <StatusBar style="light" />
        </ThemeProvider>
      </Theme>
    </TamaguiProvider>
  );
}
