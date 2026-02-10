import {
    RefreshCw,
    Users,
    Wallet,
    Zap,
} from '@tamagui/lucide-icons'
import * as Haptics from 'expo-haptics'
import { router } from 'expo-router'
import { useCallback, useRef, useState } from 'react'
import { Dimensions, Image, Pressable, ScrollView as RNScrollView } from 'react-native'
import Animated, {
    Extrapolation,
    FadeInDown,
    FadeInUp,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Text, View, XStack, YStack } from 'tamagui'

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
    accent: true,
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
    description: "Running tabs, small change, amounts that can't be settled immediately.",
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
    accent: true,
  },
]

// ============================================
// ANIMATED COMPONENTS
// ============================================
const AnimatedView = Animated.createAnimatedComponent(View)
const AnimatedXStack = Animated.createAnimatedComponent(XStack)
const AnimatedYStack = Animated.createAnimatedComponent(YStack)

// ============================================
// 間 — SLIDE COMPONENT
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
      [0, 1, 0],
      Extrapolation.CLAMP
    )

    const translateY = interpolate(
      scrollX.value,
      inputRange,
      [40, 0, 40],
      Extrapolation.CLAMP
    )

    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.92, 1, 0.92],
      Extrapolation.CLAMP
    )

    return {
      opacity,
      transform: [{ translateY }, { scale }],
    }
  })

  return (
    <View width={SCREEN_WIDTH} paddingHorizontal={24}>
      <Animated.View style={animatedStyle}>
        <YStack gap={28} paddingTop={16}>
          {/* Image Card */}
          <View
            height={220}
            borderRadius={24}
            overflow="hidden"
            backgroundColor="$cardBg"
            shadowColor="#000"
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.08}
            shadowRadius={16}
            elevation={4}
          >
            <Image
              source={{ uri: slide.image }}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode="cover"
            />
            {/* Dimmed overlay for text clarity */}
            <View
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              backgroundColor="rgba(0,0,0,0.15)"
            />
            {/* Tag */}
            <View
              position="absolute"
              top={16}
              left={16}
              backgroundColor="rgba(255,255,255,0.15)"
              paddingHorizontal={10}
              paddingVertical={5}
              borderRadius={6}
            >
              <Text
                fontSize={10}
                fontWeight="700"
                letterSpacing={0.8}
                textTransform="uppercase"
                color="white"
              >
                {slide.tag}
              </Text>
            </View>
            {/* Icon */}
            <View
              position="absolute"
              bottom={16}
              right={16}
              width={44}
              height={44}
              borderRadius={12}
              backgroundColor={slide.accent ? '$accent' : 'rgba(255,255,255,0.2)'}
              alignItems="center"
              justifyContent="center"
            >
              <Icon size={20} color="white" strokeWidth={2} />
            </View>
          </View>

          {/* Title Group */}
          <YStack gap={10}>
            <Text
              fontSize={40}
              fontWeight="700"
              letterSpacing={-1.8}
              lineHeight={44}
              color="$color"
            >
              {slide.title}
            </Text>
            <Text
              fontSize={18}
              fontWeight="600"
              letterSpacing={-0.3}
              color="$accent"
            >
              {slide.subtitle}
            </Text>
          </YStack>

          {/* Description */}
          <Text
            fontSize={16}
            lineHeight={24}
            color="$colorMuted"
            maxWidth={300}
          >
            {slide.description}
          </Text>
        </YStack>
      </Animated.View>
    </View>
  )
}

// ============================================
// 間 — DOT (refined, thinner)
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
      [6, 24, 6],
      Extrapolation.CLAMP
    )

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.25, 1, 0.25],
      Extrapolation.CLAMP
    )

    return { width, opacity }
  })

  return (
    <AnimatedView
      height={4}
      borderRadius={2}
      backgroundColor="$accent"
      style={animatedStyle}
    />
  )
}

// ============================================
// 間 — DOT INDICATOR
// ============================================
const DotIndicator = ({
  count,
  scrollX,
}: {
  count: number
  scrollX: Animated.SharedValue<number>
}) => (
  <XStack gap={6} justifyContent="center" paddingVertical={16}>
    {Array.from({ length: count }).map((_, i) => (
      <Dot key={i} index={i} scrollX={scrollX} />
    ))}
  </XStack>
)

// ============================================
// 間 — MAIN SCREEN
// ============================================
export default function OnboardingScreen() {
  const insets = useSafeAreaInsets()
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollRef = useRef<RNScrollView>(null)
  const scrollX = useSharedValue(0)

  const buttonScale = useSharedValue(1)

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }))

  const handleScrollEnd = useCallback((event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH)
    setCurrentIndex(index)
  }, [])

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
      router.push('/create-account')
    }
  }

  const handleSkip = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    router.push('/create-account')
  }

  const isLastSlide = currentIndex === slides.length - 1

  return (
    <YStack flex={1} backgroundColor="$background">
      {/* Header */}
      <AnimatedXStack
        entering={FadeInDown.delay(100).springify()}
        paddingTop={insets.top + 12}
        paddingHorizontal={24}
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Logo */}
        <XStack alignItems="center" gap={8}>
          <View
            width={28}
            height={28}
            borderRadius={9999}
            backgroundColor="$accent"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize={14} fontWeight="800" color="$accentText">
              U
            </Text>
          </View>
          <Text fontSize={20} fontWeight="700" letterSpacing={-0.5} color="$color">
            umo
          </Text>
        </XStack>

        {/* Skip */}
        <Pressable onPress={handleSkip}>
          <Text fontSize={14} fontWeight="500" color="$accent">
            Skip
          </Text>
        </Pressable>
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
      <AnimatedYStack
        entering={FadeInUp.delay(200).springify()}
        paddingHorizontal={24}
        paddingBottom={insets.bottom + 16}
        gap={12}
      >
        <DotIndicator count={slides.length} scrollX={scrollX} />

        {/* CTA Button */}
        <Animated.View style={buttonAnimatedStyle}>
          <Pressable onPress={handleNext}>
            <XStack
              backgroundColor="$accent"
              borderRadius={9999}
              paddingVertical={18}
              alignItems="center"
              justifyContent="center"
            >
              <Text
                fontSize={16}
                fontWeight="600"
                letterSpacing={-0.2}
                color="$accentText"
              >
                {isLastSlide ? 'Create Account' : 'Continue'}
              </Text>
            </XStack>
          </Pressable>
        </Animated.View>

        {/* Sign In link */}
        <XStack justifyContent="center" gap={4} paddingTop={4}>
          <Text fontSize={13} color="$colorFaint">
            Already have an account?
          </Text>
          <Pressable onPress={() => Haptics.selectionAsync()}>
            <Text fontSize={13} fontWeight="600" color="$accent">
              Sign In
            </Text>
          </Pressable>
        </XStack>
      </AnimatedYStack>
    </YStack>
  )
}
