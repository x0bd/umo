import './global.css';

import { StatusBar } from 'expo-status-bar';
import { MotiText, MotiView } from 'moti';
import { View, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-[#050505]">
        <StatusBar style="light" />
        <View className="flex-1 items-center justify-center px-8">
          {/* Logo mark */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', delay: 100 }}
            className="mb-6 h-20 w-20 items-center justify-center rounded-[28px] bg-[#FF1A55]">
            <Text className="text-4xl font-bold text-white" style={{ letterSpacing: -2 }}>
              間
            </Text>
          </MotiView>

          {/* App name */}
          <MotiText
            from={{ opacity: 0, translateY: 16 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', delay: 200 }}
            className="text-5xl font-bold text-white"
            style={{ letterSpacing: -3 }}>
            umo
          </MotiText>

          {/* Tagline */}
          <MotiText
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 600, delay: 400 }}
            className="mt-3 text-center text-base text-[#888888]">
            Split bills. Settle up. Zimbabwe-style.
          </MotiText>

          {/* Divider pill */}
          <MotiView
            from={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ type: 'spring', delay: 600 }}
            className="mt-8 h-1 w-12 rounded-full bg-[#FF1A55]"
          />

          {/* Status badge */}
          <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', delay: 800 }}
            className="mt-6 rounded-full border border-[#333333] px-4 py-2">
            <Text className="text-xs text-[#E6E6E6]" style={{ letterSpacing: 2 }}>
              COMING SOON
            </Text>
          </MotiView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
