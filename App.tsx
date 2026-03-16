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
  const [ctaPressed, setCtaPressed] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: '#050505' }}>
      <StatusBar style="light" />

      {/* HERO IMAGE — full bleed with vignettes */}
      <View style={{ position: 'absolute', top: 0, left: 0, width: W, height: '58%' }}>
        <Image
          source={{ uri: HERO_IMAGE }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
        {/* Top vignette — brand mark reads clean */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 100,
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
          pointerEvents="none"
        />
        {/* Bottom vignette — smooth bleed into card */}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 120,
            backgroundColor: 'rgba(0,0,0,0.35)',
          }}
          pointerEvents="none"
        />
      </View>

      {/* TOP CHROME — Brand mark, floats over hero */}
      <View
        style={{
          position: 'absolute',
          top: insets.top + 20,
          left: 0,
          right: 0,
          alignItems: 'center',
          zIndex: 10,
        }}>
        <MotiView
          from={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 340, damping: 24, delay: 180 }}
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            backgroundColor: 'rgba(17,17,17,0.92)',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.35,
            shadowRadius: 16,
            elevation: 8,
            overflow: 'hidden',
          }}>
          <Rabbit size={22} color="#fff" strokeWidth={2.5} />
        </MotiView>
      </View>

      {/* CONTENT CARD — Lifted, refined */}
      <MotiView
        from={{ translateY: 24, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28, delay: 80 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -16 },
          shadowOpacity: 0.12,
          shadowRadius: 32,
          elevation: 24,
          overflow: 'hidden',
        }}>
        {/* Hairline at top — card edge */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            backgroundColor: 'rgba(0,0,0,0.06)',
          }}
        />
        <View
          style={{
            paddingHorizontal: 28,
            paddingTop: 32,
            paddingBottom: insets.bottom + 28,
          }}>
          {/* Eyebrow — staggered */}
          <MotiView
            from={{ opacity: 0, translateY: 8 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28, delay: 200 }}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <View
              style={{
                width: 5,
                height: 5,
                borderRadius: 2.5,
                backgroundColor: '#FF0048',
              }}
            />
            <Text
              style={{
                fontSize: 10,
                fontWeight: '700',
                letterSpacing: 2.2,
                color: '#555555',
                textTransform: 'uppercase',
              }}>
              Split the bill
            </Text>
          </MotiView>

          {/* Headline — staggered, punchier */}
          <MotiView
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 26, delay: 260 }}>
            <Text
              style={{
                fontSize: 38,
                fontWeight: '700',
                color: '#111111',
                letterSpacing: -2,
                lineHeight: 42,
                marginBottom: 12,
              }}>
              Split the bill.{'\n'}
              <Text style={{ color: 'rgba(17,17,17,0.35)', fontWeight: '600' }}>
                Not the mood.
              </Text>
            </Text>
          </MotiView>

          {/* Sub — staggered */}
          <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', stiffness: 360, damping: 26, delay: 340 }}
            style={{ marginBottom: 28 }}>
            <Text
              style={{
                fontSize: 15,
                color: '#666666',
                lineHeight: 24,
                letterSpacing: -0.2,
                maxWidth: 300,
              }}>
              Claim exactly what you ordered. Convert USD & ZiG on the fly. Settle
              with EcoCash, InnBucks, or cash — one tap.
            </Text>
          </MotiView>

          {/* CTAs — with press feedback */}
          <MotiView
            from={{ opacity: 0, translateY: 14 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26, delay: 420 }}
            style={{ gap: 14 }}>
            <Pressable
              onPress={onGetStarted}
              onPressIn={() => setCtaPressed(true)}
              onPressOut={() => setCtaPressed(false)}>
              <MotiView
                animate={{
                  scale: ctaPressed ? 0.97 : 1,
                  backgroundColor: ctaPressed ? '#0A0A0A' : '#111111',
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                style={{
                  borderRadius: 18,
                  paddingVertical: 20,
                  paddingHorizontal: 28,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 12 },
                  shadowOpacity: 0.28,
                  shadowRadius: 24,
                  elevation: 12,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#FFFFFF',
                    letterSpacing: -0.3,
                  }}>
                  Get Started
                </Text>
              </MotiView>
            </Pressable>

            <Pressable onPress={onSignIn} style={{ alignItems: 'center', paddingVertical: 10 }}>
              <Text style={{ fontSize: 14, color: '#888888', letterSpacing: 0.05 }}>
                Already have an account?{' '}
                <Text style={{ color: '#111111', fontWeight: '700', letterSpacing: -0.1 }}>
                  Sign in
                </Text>
              </Text>
            </Pressable>
          </MotiView>
        </View>
      </MotiView>
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
