import './global.css';

import { StatusBar } from 'expo-status-bar';
import { SignInScreen } from './components/screens/SignInScreen';
import { SignUpScreen } from './components/screens/SignUpScreen';
import { ServicesScreen } from './components/screens/ServicesScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { AddSplitScreen } from './components/screens/AddSplitScreen';

import { Rabbit } from 'lucide-react-native';
import { MotiView } from 'moti';
import { useState } from 'react';
import { Dimensions, Image, Pressable, Text, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: W } = Dimensions.get('window');

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85';

function OnboardingScreen({
  onGetStarted,
  onSignIn,
}: {
  onGetStarted: () => void;
  onSignIn: () => void;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <StatusBar style="light" />

      {/* TOP CHROME — Brand mark */}
      <View
        style={{
          position: 'absolute',
          top: insets.top + 16,
          left: 24,
          right: 24,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}>
        <MotiView
          from={{ opacity: 0, translateY: -8 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', delay: 200 }}
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            backgroundColor: '#111111',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 4,
          }}>
          <Rabbit size={20} color="#fff" strokeWidth={2.5} />
        </MotiView>
      </View>

      {/* HERO IMAGE */}
      <View style={{ position: 'absolute', top: 0, left: 0, width: W, height: '55%' }}>
        <Image
          source={{ uri: HERO_IMAGE }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
        <View
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.25)',
          }}
        />
      </View>

      {/* CONTENT CARD — Single page */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 36,
          borderTopRightRadius: 36,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -10 },
          shadowOpacity: 0.05,
          shadowRadius: 20,
          elevation: 20,
          paddingHorizontal: 32,
          paddingTop: 36,
          paddingBottom: insets.bottom + 24,
        }}>
        <MotiView
          from={{ opacity: 0, translateY: 16 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 320 }}
          style={{ flex: 1, justifyContent: 'space-between' }}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                marginBottom: 14,
              }}>
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: '#111111',
                }}
              />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '700',
                  letterSpacing: 2,
                  color: '#555555',
                  textTransform: 'uppercase',
                }}>
                Split the bill
              </Text>
            </View>

            <Text
              style={{
                fontSize: 36,
                fontWeight: '600',
                color: '#111111',
                letterSpacing: -1.8,
                lineHeight: 40,
                marginBottom: 14,
              }}>
              Split the bill.{'\n'}
              <Text style={{ color: 'rgba(17,17,17,0.4)' }}>Not the mood.</Text>
            </Text>

            <Text
              style={{
                fontSize: 15,
                color: '#666666',
                lineHeight: 24,
                letterSpacing: -0.1,
                maxWidth: 320,
              }}>
              Claim exactly what you ordered. Convert USD & ZiG on the fly. Settle
              with EcoCash, InnBucks, or cash — one tap.
            </Text>
          </View>

          <MotiView
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 280, delay: 120 }}
            style={{ gap: 16, marginTop: 24 }}>
            <Pressable onPress={onGetStarted}>
              <MotiView
                style={{
                  backgroundColor: '#111111',
                  borderRadius: 20,
                  paddingVertical: 18,
                  paddingHorizontal: 28,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 12 },
                  shadowOpacity: 0.25,
                  shadowRadius: 20,
                  elevation: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#FFFFFF',
                    letterSpacing: -0.2,
                  }}>
                  Get Started
                </Text>
              </MotiView>
            </Pressable>

            <Pressable onPress={onSignIn} style={{ alignItems: 'center', paddingVertical: 8 }}>
              <Text style={{ fontSize: 14, color: '#888888', letterSpacing: 0.1 }}>
                Already have an account?{' '}
                <Text style={{ color: '#111111', fontWeight: '700' }}>Sign in</Text>
              </Text>
            </Pressable>
          </MotiView>
        </MotiView>
      </View>
    </View>
  );
}

type Screen = 'onboarding' | 'signup' | 'signin' | 'services' | 'home' | 'new-split';

export default function App() {
  const [screen, setScreen] = useState<Screen>('onboarding');

  return (
    <SafeAreaProvider>
      {screen === 'onboarding' && (
        <OnboardingScreen
          onGetStarted={() => setScreen('signup')}
          onSignIn={() => setScreen('signin')}
        />
      )}
      {screen === 'signup' && (
        <SignUpScreen
          onSignedUp={() => setScreen('services')}
          onSignIn={() => setScreen('signin')}
          onBack={() => setScreen('onboarding')}
        />
      )}
      {screen === 'signin' && (
        <SignInScreen
          onSignedIn={() => setScreen('services')}
          onSignUp={() => setScreen('signup')}
          onBack={() => setScreen('onboarding')}
        />
      )}
      {screen === 'services' && <ServicesScreen onDone={() => setScreen('home')} />}
      {screen === 'home' && <HomeScreen onNewSession={() => setScreen('new-split')} />}
      {screen === 'new-split' && <AddSplitScreen onBack={() => setScreen('home')} />}
    </SafeAreaProvider>
  );
}
