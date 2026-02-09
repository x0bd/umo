import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TamaguiProvider, Theme } from 'tamagui';
import 'react-native-reanimated';

import config from '@/tamagui.config';

// Bright, playful theme - NO DARK MODE
const UmoTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
    card: '#FFFFFF',
    border: '#1A1A1A',
    primary: '#FCCD00',
    text: '#1A1A1A',
  },
};

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <Theme name="light">
        <ThemeProvider value={UmoTheme}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#FFFFFF' },
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
          <StatusBar style="dark" />
        </ThemeProvider>
      </Theme>
    </TamaguiProvider>
  );
}
