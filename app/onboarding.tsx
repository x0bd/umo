import { useState, useRef, useCallback } from 'react'
import { Dimensions, Pressable, Image, ScrollView as RNScrollView } from 'react-native'
import { YStack, XStack, Text, View } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import * as Haptics from 'expo-haptics'
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  interpolate,
  Extrapolation,
  runOnJS,
} from 'react-native-reanimated'
import {
  ArrowRight,
  Wallet,
  Users,
  Zap,
  RefreshCw,
  Sun,
  Moon,
} from '@tamagui/lucide-icons'
import { useThemeMode } from '@/providers/theme-mode'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

// ============================================
// SLIDE DATA
// ============================================
const slides = [
  {
    id: 1,
    tag: 'Welcome',
    title: 'Split bills.\nSettle debts.',
    subtitle: 'The simple way.',
    description: 'Handle multi-currency splits and settle up instantly via mobile money.',
    icon: Wallet,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    tag: 'Multi-Currency',
    title: 'Real-time\nexchange rates.',
    subtitle: 'USD ↔ ZiG',
    description: 'See every split in both currencies. Rates update automatically.',
    icon: RefreshCw,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    tag: 'Friends',
    title: 'Track IOUs.\nNo friction.',
    subtitle: 'Built-in ledger.',
    description: 'Running tabs, small change, amounts that can\'t be settled immediately.',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop',
  },
  {
    id: 4,
    tag: 'Pay Now',
    title: 'One tap.\nSettled.',
    subtitle: 'Mobile money.',
    description: 'Trigger EcoCash or OneMoney prompts directly. No more "I\'ll pay you later".',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&h=300&fit=crop',
  },
]

// ============================================
// ANIMATED COMPONENTS
// ============================================
const AnimatedView = Animated.createAnimatedComponent(View)
const AnimatedXStack = Animated.createAnimatedComponent(XStack)

// ============================================
// SLIDE COMPONENT
// ============================================
const OnboardingSlide = ({
  slide,
  index,
  scrollX,
}: {
  slide: typeof slides[0]
  index: number
  scrollX: Animated.SharedValue<number>
}) => {
  const { isDark } = useThemeMode()
  const Icon = slide.icon

  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * SCREEN_WIDTH,
      index * SCREEN_WIDTH,
      (index + 1) * SCREEN_WIDTH,
    ]

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.3, 1, 0.3],
      Extrapolation.CLAMP
    )

    const translateY = interpolate(
      scrollX.value,
      inputRange,
      [30, 0, 30],
      Extrapolation.CLAMP
    )

    return {
      opacity,
      transform: [{ translateY }],
    }
  })

  return (
    <View width={SCREEN_WIDTH} paddingHorizontal={24}>
      <Animated.View style={animatedStyle}>
        <YStack gap={24} paddingTop={20}>
          {/* Tag */}
          <View
            alignSelf="flex-start"
            backgroundColor="$backgroundHover"
            paddingHorizontal={12}
            paddingVertical={6}
            borderRadius={8}
            borderWidth={1}
            borderColor="$borderColorSoft"
          >
            <Text
              fontSize={11}
              fontWeight="600"
              letterSpacing={0.6}
              textTransform="uppercase"
              color="$colorMuted"
            >
              {slide.tag}
            </Text>
          </View>

          {/* Image Card */}
          <View
            height={180}
            borderRadius={20}
            overflow="hidden"
            backgroundColor="$cardBg"
          >
            <Image
              source={{ uri: slide.image }}
              style={{
                width: '100%',
                height: '100%',
                opacity: isDark ? 0.8 : 1,
              }}
              resizeMode="cover"
            />
            {/* Icon Overlay */}
            <View
              position="absolute"
              bottom={16}
              left={16}
              width={48}
              height={48}
              borderRadius={14}
              backgroundColor="$accent"
              alignItems="center"
              justifyContent="center"
              shadowColor="$accent"
              shadowOffset={{ width: 0, height: 4 }}
              shadowOpacity={0.3}
              shadowRadius={12}
            >
              <Icon size={22} color="$accentText" strokeWidth={2} />
            </View>
          </View>

          {/* Title */}
          <YStack gap={8}>
            <Text
              fontSize={38}
              fontWeight="600"
              letterSpacing={-1.5}
              lineHeight={42}
              color="$color"
            >
              {slide.title}
            </Text>
            <Text
              fontSize={18}
              fontWeight="500"
              letterSpacing={-0.3}
              color="$accent"
            >
              {slide.subtitle}
            </Text>
          </YStack>

          {/* Description */}
          <Text
            fontSize={15}
            lineHeight={22}
            color="$colorMuted"
            maxWidth={320}
          >
            {slide.description}
          </Text>
        </YStack>
      </Animated.View>
    </View>
  )
}

// ============================================
// SINGLE DOT COMPONENT (proper hooks usage)
// ============================================
const Dot = ({
  index,
  scrollX,
}: {
  index: number
  scrollX: Animated.SharedValue<number>
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * SCREEN_WIDTH,
      index * SCREEN_WIDTH,
      (index + 1) * SCREEN_WIDTH,
    ]

    const width = interpolate(
      scrollX.value,
      inputRange,
      [8, 24, 8],
      Extrapolation.CLAMP
    )

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.3, 1, 0.3],
      Extrapolation.CLAMP
    )

    return { width, opacity }
  })

  return (
    <AnimatedView
      height={8}
      borderRadius={4}
      backgroundColor="$accent"
      style={animatedStyle}
    />
  )
}

// ============================================
// DOT INDICATOR
// ============================================
const DotIndicator = ({
  count,
  scrollX,
}: {
  count: number
  scrollX: Animated.SharedValue<number>
}) => {
  return (
    <XStack gap={8} justifyContent="center" paddingVertical={20}>
      {Array.from({ length: count }).map((_, i) => (
        <Dot key={i} index={i} scrollX={scrollX} />
      ))}
    </XStack>
  )
}

// ============================================
// MAIN SCREEN
// ============================================
export default function OnboardingScreen() {
  const insets = useSafeAreaInsets()
  const { isDark, toggle } = useThemeMode()
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollRef = useRef<RNScrollView>(null)
  const scrollX = useSharedValue(0)

  const buttonScale = useSharedValue(1)

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }))

  // Handle scroll end to update current index
  const handleScrollEnd = useCallback((event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH)
    setCurrentIndex(index)
  }, [])

  // Handle scroll to update shared value
  const handleScroll = useCallback((event: any) => {
    scrollX.value = event.nativeEvent.contentOffset.x
  }, [])

  const handleNext = () => {
    buttonScale.value = withSequence(withSpring(0.97), withSpring(1))

    if (currentIndex < slides.length - 1) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      scrollRef.current?.scrollTo({
        x: (currentIndex + 1) * SCREEN_WIDTH,
        animated: true,
      })
      setCurrentIndex(currentIndex + 1)
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      router.replace('/(tabs)')
    }
  }

  const handleSkip = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    router.replace('/(tabs)')
  }

  const toggleTheme = () => {
    Haptics.selectionAsync()
    toggle()
  }

  const isLastSlide = currentIndex === slides.length - 1

  return (
    <YStack flex={1} backgroundColor="$background">
      {/* Header */}
      <AnimatedXStack
        entering={FadeInDown.delay(100).springify()}
        paddingTop={insets.top + 12}
        paddingHorizontal={20}
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Logo */}
        <XStack alignItems="center" gap={8}>
          <View
            width={32}
            height={32}
            borderRadius={10}
            backgroundColor="$accent"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize={16} fontWeight="800" color="$accentText">
              U
            </Text>
          </View>
          <Text fontSize={20} fontWeight="700" letterSpacing={-0.5} color="$color">
            umo
          </Text>
        </XStack>

        {/* Theme + Skip */}
        <XStack gap={10} alignItems="center">
          <Pressable onPress={toggleTheme}>
            <View
              width={40}
              height={40}
              borderRadius={12}
              backgroundColor="$cardBg"
              borderWidth={1}
              borderColor="$cardBorder"
              alignItems="center"
              justifyContent="center"
            >
              {isDark ? (
                <Sun size={18} color="$colorMuted" strokeWidth={1.8} />
              ) : (
                <Moon size={18} color="$colorMuted" strokeWidth={1.8} />
              )}
            </View>
          </Pressable>

          <Pressable onPress={handleSkip}>
            <View
              paddingHorizontal={14}
              paddingVertical={10}
              borderRadius={10}
              backgroundColor="$backgroundHover"
            >
              <Text fontSize={14} fontWeight="500" color="$colorMuted">
                Skip
              </Text>
            </View>
          </Pressable>
        </XStack>
      </AnimatedXStack>

      {/* Slides */}
      <RNScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
        decelerationRate="fast"
        style={{ flex: 1 }}
      >
        {slides.map((slide, index) => (
          <OnboardingSlide key={slide.id} slide={slide} index={index} scrollX={scrollX} />
        ))}
      </RNScrollView>

      {/* Bottom Section */}
      <YStack paddingHorizontal={20} paddingBottom={insets.bottom + 16} gap={12}>
        <DotIndicator count={slides.length} scrollX={scrollX} />

        {/* CTA Button */}
        <Animated.View style={buttonAnimatedStyle}>
          <Pressable onPress={handleNext}>
            <XStack
              backgroundColor="$accent"
              borderRadius={16}
              paddingVertical={18}
              paddingHorizontal={20}
              alignItems="center"
              justifyContent="space-between"
            >
              <Text
                fontSize={16}
                fontWeight="600"
                letterSpacing={-0.2}
                color="$accentText"
              >
                {isLastSlide ? 'Get Started' : 'Continue'}
              </Text>
              <View
                width={28}
                height={28}
                borderRadius={8}
                backgroundColor="rgba(255,255,255,0.2)"
                alignItems="center"
                justifyContent="center"
              >
                {isLastSlide ? (
                  <Zap size={14} color="$accentText" strokeWidth={2.5} />
                ) : (
                  <ArrowRight size={14} color="$accentText" strokeWidth={2.5} />
                )}
              </View>
            </XStack>
          </Pressable>
        </Animated.View>

        {/* Terms */}
        <Text textAlign="center" fontSize={11} color="$colorGhost" lineHeight={16}>
          By continuing, you agree to our{' '}
          <Text color="$colorMuted" fontWeight="500">
            Terms
          </Text>{' '}
          and{' '}
          <Text color="$colorMuted" fontWeight="500">
            Privacy Policy
          </Text>
        </Text>
      </YStack>
    </YStack>
  )
}
