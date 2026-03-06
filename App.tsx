import './global.css';

import { StatusBar } from 'expo-status-bar';
import { SignInScreen } from './components/screens/SignInScreen';
import { SignUpScreen } from './components/screens/SignUpScreen';
import { ServicesScreen } from './components/screens/ServicesScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { AddSplitScreen } from './components/screens/AddSplitScreen';

import { Rabbit } from 'lucide-react-native';
import { AnimatePresence, MotiView } from 'moti';
import { useRef, useState } from 'react';
import { Dimensions, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: W } = Dimensions.get('window');

const SLIDES = [
  {
    id: 0,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85',
    eyebrow: 'ITEMIZE',
    headline: 'Every item,\naccounted for.',
    sub: 'No more "just split it." Claim exactly what you ordered — down to the last drink.',
  },
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=85',
    eyebrow: 'CONVERT',
    headline: 'USD. ZiG.\nYour call.',
    sub: 'Set a live table rate. We convert between USD and ZiG on the fly, for everyone.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=900&q=85',
    eyebrow: 'SETTLE',
    headline: 'Close the loop\ninstantly.',
    sub: 'From "you owe me" to paid. EcoCash, InnBucks, or cash. One tap.',
  },
];

function OnboardingScreen({
  onGetStarted,
  onSignIn,
}: {
  onGetStarted: () => void;
  onSignIn: () => void;
}) {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();
  const isLast = active === SLIDES.length - 1;

  function goTo(i: number) {
    scrollRef.current?.scrollTo({ x: W * i, animated: true });
    setActive(i);
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <StatusBar style="light" />

      {/* TOP CHROME - Minimalist Header */}
      <View
        style={{
          position: 'absolute',
          top: insets.top + 16,
          left: 24,
          right: 24,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10,
        }}>
        <MotiView
          from={{ opacity: 0, translateY: -8 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', delay: 200 }}
          style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* Refined Brand Mark */}
          <View
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              backgroundColor: '#FF0048',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#FF0048',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.35,
              shadowRadius: 12,
              elevation: 6,
            }}>
            <Rabbit size={20} color="#fff" strokeWidth={2.5} />
          </View>
        </MotiView>

        <MotiView
          animate={{ opacity: isLast ? 0 : 1 }}
          transition={{ type: 'timing', duration: 250 }}>
          <Pressable onPress={() => goTo(SLIDES.length - 1)} hitSlop={16}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '600',
                color: '#E0E0E0', // lighter since bg might be dark image
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                textShadowColor: 'rgba(0,0,0,0.4)',
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 4,
              }}>
              Skip
            </Text>
          </Pressable>
        </MotiView>
      </View>

      {/* IMAGE CONTAINER */}
      <View style={{ position: 'absolute', top: 0, left: 0, width: W, height: '60%' }}>
        {/* IMAGE STRIP */}
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onMomentumScrollEnd={(e) => {
            const idx = Math.round(e.nativeEvent.contentOffset.x / W);
            setActive(idx);
          }}
          style={{ width: W, height: '100%' }}>
          {SLIDES.map((slide) => (
            <View key={slide.id} style={{ width: W, height: '100%' }}>
              <Image
                source={{ uri: slide.image }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
              <View style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.2)' }} />
            </View>
          ))}
        </ScrollView>
        {/* IMAGE DOTS INDICATOR - Positioned at bottom of wrapper */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 600, delay: 400 }}
          style={{
            position: 'absolute',
            bottom: 32,
            left: 0,
            right: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 6,
            zIndex: 10,
          }}>
          {SLIDES.map((_, i) => (
            <MotiView
              key={i}
              animate={{ width: i === active ? 24 : 6, opacity: i === active ? 1 : 0.5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              style={{ height: 6, borderRadius: 3, backgroundColor: '#ffffff' }}
            />
          ))}
        </MotiView>
      </View>



      {/* CONTENT CARD - Sleek Platinum/White aesthetic */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '48%',
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 36,
          borderTopRightRadius: 36,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -10 },
          shadowOpacity: 0.05,
          shadowRadius: 20,
          elevation: 20,
        }}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 32,
            paddingTop: 40,
            paddingBottom: insets.bottom + 24,
          }}>
          <AnimatePresence exitBeforeEnter>
            <MotiView
              key={active}
              from={{ opacity: 0, translateY: 12 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -8 }}
              transition={{ type: 'timing', duration: 220 }}
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <View>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  {/* Subtle Dot Indicator instead of bold red */}
                  <View
                    style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#111111' }}
                  />
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '700',
                      letterSpacing: 2,
                      color: '#555555',
                      textTransform: 'uppercase',
                    }}>
                    {SLIDES[active].eyebrow}
                  </Text>
                </View>

                <Text
                  style={{
                    fontSize: 40,
                    fontWeight: '600',
                    color: '#111111',
                    letterSpacing: -2,
                    lineHeight: 44,
                    marginBottom: 16,
                  }}>
                  {SLIDES[active].headline}
                </Text>

                <Text
                  style={{
                    fontSize: 15,
                    color: '#666666',
                    lineHeight: 24,
                    letterSpacing: 0,
                    maxWidth: 300,
                  }}>
                  {SLIDES[active].sub}
                </Text>
              </View>

              <AnimatePresence exitBeforeEnter>
                {!isLast ? (
                  <MotiView
                    key="nav"
                    from={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'timing', duration: 160 }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}>
                    <Pressable onPress={() => goTo(active + 1)} hitSlop={12}>
                      <MotiView
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: 28,
                          backgroundColor: '#111111',
                          alignItems: 'center',
                          justifyContent: 'center',
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 8 },
                          shadowOpacity: 0.2,
                          shadowRadius: 16,
                          elevation: 8,
                        }}>
                        <Text style={{ fontSize: 24, color: '#FFFFFF', marginLeft: 2 }}>→</Text>
                      </MotiView>
                    </Pressable>
                  </MotiView>
                ) : (
                  <MotiView
                    key="cta"
                    from={{ opacity: 0, translateY: 16 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'timing', duration: 240 }}
                    style={{ gap: 16 }}>
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
                        <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFFFFF', letterSpacing: -0.2 }}>
                          Get Started
                        </Text>
                      </MotiView>
                    </Pressable>

                    <Pressable
                      onPress={onSignIn}
                      style={{ alignItems: 'center', paddingVertical: 8 }}>
                      <Text style={{ fontSize: 14, color: '#888888', letterSpacing: 0.1 }}>
                        Already have an account?{' '}
                        <Text style={{ color: '#111111', fontWeight: '700' }}>
                          Sign in
                        </Text>
                      </Text>
                    </Pressable>
                  </MotiView>
                )}
              </AnimatePresence>
            </MotiView>
          </AnimatePresence>
        </View>
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
