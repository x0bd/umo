import './global.css';

import { StatusBar } from 'expo-status-bar';
import { SignInScreen } from './components/screens/SignInScreen';
import { SignUpScreen } from './components/screens/SignUpScreen';
import { ServicesScreen } from './components/screens/ServicesScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { Rabbit } from 'lucide-react-native';
import { AnimatePresence, MotiView } from 'moti';
import { useRef, useState } from 'react';
import { Dimensions, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: W, height: H } = Dimensions.get('window');
const IMG_H = H * 0.56;

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

function Segments({ total, active }: { total: number; active: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
      {Array.from({ length: total }).map((_, i) => (
        <MotiView
          key={i}
          animate={{
            width: i === active ? 30 : 8,
            backgroundColor: i === active ? '#FF0048' : i < active ? '#FFAABB' : 'rgba(0,0,0,0.13)',
          }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          style={{ height: 3, borderRadius: 2 }}
        />
      ))}
    </View>
  );
}

function NextBtn({ onPress }: { onPress: () => void }) {
  const [p, setP] = useState(false);
  return (
    <Pressable onPress={onPress} onPressIn={() => setP(true)} onPressOut={() => setP(false)}>
      <MotiView
        animate={{ scale: p ? 0.88 : 1 }}
        transition={{ type: 'spring', stiffness: 450, damping: 18 }}
        style={{
          width: 54,
          height: 54,
          borderRadius: 27,
          backgroundColor: '#FF0048',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#FF0048',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.4,
          shadowRadius: 14,
          elevation: 8,
        }}>
        <Text style={{ fontSize: 20, color: '#450010', marginLeft: 2 }}>→</Text>
      </MotiView>
    </Pressable>
  );
}

function GetStartedBtn({ onPress }: { onPress?: () => void }) {
  const [p, setP] = useState(false);
  return (
    <Pressable onPress={onPress} onPressIn={() => setP(true)} onPressOut={() => setP(false)}>
      <MotiView
        animate={{ scale: p ? 0.97 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          backgroundColor: '#FF0048',
          borderRadius: 18,
          paddingHorizontal: 24,
          paddingVertical: 18,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          shadowColor: '#FF0048',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.35,
          shadowRadius: 16,
          elevation: 8,
        }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#450010', letterSpacing: -0.3 }}>
          Get Started
        </Text>
        <Text style={{ fontSize: 17, color: '#450010', fontWeight: '600' }}>→</Text>
      </MotiView>
    </Pressable>
  );
}

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
    <View style={{ flex: 1, backgroundColor: '#111' }}>
      <StatusBar style="light" />

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
        style={{ position: 'absolute', top: 0, left: 0, width: W, height: IMG_H }}>
        {SLIDES.map((slide) => (
          <View key={slide.id} style={{ width: W, height: IMG_H }}>
            <Image
              source={{ uri: slide.image }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
            <View style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(5,5,5,0.2)' }} />
          </View>
        ))}
      </ScrollView>

      {/* CONTENT CARD */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: H * 0.52,
          backgroundColor: '#F4F4F4',
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          overflow: 'hidden',
        }}>
        <View
          style={{
            position: 'absolute',
            left: 22,
            top: 24,
            bottom: 24,
            width: 1,
            backgroundColor: '#E2E2E2',
          }}
        />
        <View
          style={{
            flex: 1,
            paddingLeft: 44,
            paddingRight: 26,
            paddingTop: 30,
            paddingBottom: insets.bottom + 22,
          }}>
          <AnimatePresence exitBeforeEnter>
            <MotiView
              key={active}
              from={{ opacity: 0, translateY: 18 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -10 }}
              transition={{ type: 'timing', duration: 190 }}
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <View>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 20 }}>
                  <View
                    style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#FF0048' }}
                  />
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '700',
                      letterSpacing: 3.5,
                      color: '#FF0048',
                      textTransform: 'uppercase',
                    }}>
                    {SLIDES[active].eyebrow}
                  </Text>
                  <View style={{ flex: 1 }} />
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '500',
                      letterSpacing: 0.8,
                      color: '#BBBBBB',
                    }}>
                    {String(active + 1).padStart(2, '0')}&thinsp;/&thinsp;
                    {String(SLIDES.length).padStart(2, '0')}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 44,
                    fontWeight: '600',
                    color: '#0E0E0E',
                    letterSpacing: -2.6,
                    lineHeight: 46,
                    marginBottom: 16,
                  }}>
                  {SLIDES[active].headline}
                </Text>
                <Text
                  style={{
                    fontSize: 14.5,
                    color: '#5A5A5A',
                    lineHeight: 22,
                    letterSpacing: 0.05,
                    maxWidth: 280,
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
                      justifyContent: 'space-between',
                    }}>
                    <Segments total={SLIDES.length} active={active} />
                    <NextBtn onPress={() => goTo(active + 1)} />
                  </MotiView>
                ) : (
                  <MotiView
                    key="cta"
                    from={{ opacity: 0, translateY: 16 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'timing', duration: 200 }}
                    style={{ gap: 10 }}>
                    <View style={{ marginBottom: 4 }}>
                      <Segments total={SLIDES.length} active={active} />
                    </View>
                    <GetStartedBtn onPress={onGetStarted} />
                    <Pressable
                      onPress={onSignIn}
                      style={{ alignItems: 'center', paddingVertical: 8 }}>
                      <Text style={{ fontSize: 13.5, color: '#888', letterSpacing: 0.1 }}>
                        Already have an account?{'  '}
                        <Text style={{ color: '#111', fontWeight: '700', letterSpacing: -0.1 }}>
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

      {/* TOP CHROME */}
      <View
        style={{
          position: 'absolute',
          top: insets.top + 10,
          left: 20,
          right: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <MotiView
          from={{ opacity: 0, translateX: -8 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ type: 'spring', delay: 200 }}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              backgroundColor: '#FF0048',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#FF0048',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.45,
              shadowRadius: 8,
              elevation: 5,
            }}>
            <Rabbit size={15} color="#fff" strokeWidth={1.75} />
          </View>
        </MotiView>
        <MotiView
          animate={{ opacity: isLast ? 0 : 1 }}
          transition={{ type: 'timing', duration: 250 }}>
          <Pressable onPress={() => goTo(SLIDES.length - 1)}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '500',
                color: 'rgba(255,255,255,0.65)',
                letterSpacing: 0.3,
              }}>
              Skip
            </Text>
          </Pressable>
        </MotiView>
      </View>

      {/* IMAGE DOTS INDICATOR */}
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 600, delay: 400 }}
        style={{
          position: 'absolute',
          bottom: H * 0.52 + 14,
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 5,
        }}>
        {SLIDES.map((_, i) => (
          <MotiView
            key={i}
            animate={{ width: i === active ? 16 : 5, opacity: i === active ? 1 : 0.45 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            style={{ height: 5, borderRadius: 3, backgroundColor: '#ffffff' }}
          />
        ))}
      </MotiView>
    </View>
  );
}

type Screen = 'onboarding' | 'signup' | 'signin' | 'services' | 'home';

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
      {screen === 'home' && <HomeScreen onNewSession={() => console.log('new session')} />}
    </SafeAreaProvider>
  );
}
