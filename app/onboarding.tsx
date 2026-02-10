import { useState, useRef } from 'react'
import { Dimensions, Animated, Pressable } from 'react-native'
import { YStack, XStack, Text, View } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import * as Haptics from 'expo-haptics'
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
// ONBOARDING SLIDES DATA
// ============================================
const slides = [
  {
    id: 1,
    tag: 'WELCOME',
    title: 'Split bills.\nSettle debts.',
    subtitle: 'The Zimbabwean way.',
    description: 'Handle USD/ZiG conversions and settle up instantly via EcoCash, OneMoney, or Innbucks.',
    icon: Wallet,
    accentColor: '#FF1A55',
  },
  {
    id: 2,
    tag: 'MULTI-CURRENCY',
    title: 'Real-time\nexchange rates.',
    subtitle: 'USD ↔ ZiG',
    description: 'Set a "Table Rate" for your session. See every split in both currencies automatically.',
    icon: RefreshCw,
    accentColor: '#00E676',
  },
  {
    id: 3,
    tag: 'SQUAD',
    title: 'Friends.\nNo friction.',
    subtitle: 'Micro-ledger built-in.',
    description: 'Track IOUs, running tabs, and small change amounts that can\'t be settled immediately.',
    icon: Users,
    accentColor: '#7C4DFF',
  },
  {
    id: 4,
    tag: 'PAYNOW',
    title: 'One tap.\nSettled.',
    subtitle: 'Powered by Paynow.',
    description: 'Trigger EcoCash or OneMoney prompts directly from the app. No more awkward "I\'ll pay you later".',
    icon: Zap,
    accentColor: '#FF1A55',
  },
]

// ============================================
// SLIDE COMPONENT
// ============================================
const OnboardingSlide = ({ 
  slide, 
  index, 
  currentIndex,
  theme,
}: { 
  slide: typeof slides[0]
  index: number
  currentIndex: number
  theme: 'light' | 'dark'
}) => {
  const Icon = slide.icon
  const isDark = theme === 'dark'

  return (
    <YStack
      width={SCREEN_WIDTH}
      paddingHorizontal={24}
      paddingTop={60}
      gap={32}
    >
      {/* Tag Pill */}
      <View
        alignSelf="flex-start"
        backgroundColor={isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}
        paddingHorizontal={12}
        paddingVertical={6}
        borderRadius={100}
      >
        <Text
          fontSize={10}
          fontWeight="700"
          letterSpacing={1.5}
          textTransform="uppercase"
          color={isDark ? '$whiteMuted' : '$greySub'}
        >
          {slide.tag}
        </Text>
      </View>

      {/* Icon Container */}
      <View
        width={80}
        height={80}
        borderRadius={24}
        backgroundColor={slide.accentColor}
        alignItems="center"
        justifyContent="center"
        shadowColor={slide.accentColor}
        shadowOffset={{ width: 0, height: 12 }}
        shadowOpacity={0.4}
        shadowRadius={24}
      >
        <Icon size={36} color="#FFFFFF" strokeWidth={2} />
      </View>

      {/* Title */}
      <YStack gap={8}>
        <Text
          fontSize={48}
          fontWeight="500"
          letterSpacing={-2}
          lineHeight={50}
          color={isDark ? '$white' : '$greyText'}
        >
          {slide.title}
        </Text>
        <Text
          fontSize={20}
          fontWeight="600"
          letterSpacing={-0.5}
          color={slide.accentColor}
        >
          {slide.subtitle}
        </Text>
      </YStack>

      {/* Description */}
      <Text
        fontSize={16}
        lineHeight={24}
        color={isDark ? '$whiteMuted' : '$greySub'}
        maxWidth={320}
      >
        {slide.description}
      </Text>

      {/* Flow Decoration */}
      <YStack position="relative" marginTop={20} paddingLeft={20}>
        <View
          position="absolute"
          left={0}
          top={0}
          bottom={0}
          width={1}
          backgroundColor={isDark ? '$lineFaint' : '$greyLine'}
        >
          <View
            position="absolute"
            bottom={0}
            left={-3}
            width={7}
            height={7}
            borderRightWidth={1}
            borderBottomWidth={1}
            borderColor={isDark ? '$line' : '$greyLine'}
            style={{ transform: [{ rotate: '45deg' }] }}
          />
        </View>
        <XStack gap={12} paddingVertical={12}>
          <View
            width={8}
            height={8}
            borderRadius={4}
            backgroundColor={slide.accentColor}
          />
          <Text fontSize={13} fontWeight="500" color={isDark ? '$whiteDim' : '$greySub'}>
            Step {index + 1} of {slides.length}
          </Text>
        </XStack>
      </YStack>
    </YStack>
  )
}

// ============================================
// DOT INDICATOR
// ============================================
const DotIndicator = ({ 
  count, 
  activeIndex,
  theme,
}: { 
  count: number
  activeIndex: number
  theme: 'light' | 'dark'
}) => {
  const isDark = theme === 'dark'

  return (
    <XStack gap={8} justifyContent="center" paddingVertical={20}>
      {Array.from({ length: count }).map((_, i) => (
        <View
          key={i}
          width={i === activeIndex ? 24 : 8}
          height={8}
          borderRadius={4}
          backgroundColor={i === activeIndex 
            ? '$pink' 
            : isDark ? '$lineFaint' : '$greyLine'
          }
          animation="quick"
        />
      ))}
    </XStack>
  )
}

// ============================================
// MAIN ONBOARDING SCREEN
// ============================================
export default function OnboardingScreen() {
  const insets = useSafeAreaInsets()
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollRef = useRef<any>(null)
  const scrollX = useRef(new Animated.Value(0)).current

  const { isDark, toggle } = useThemeMode()
  const theme = isDark ? 'dark' : 'light'

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { 
      useNativeDriver: false,
      listener: (event: any) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH)
        if (index !== currentIndex) {
          setCurrentIndex(index)
          Haptics.selectionAsync()
        }
      }
    }
  )

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      scrollRef.current?.scrollTo({ 
        x: (currentIndex + 1) * SCREEN_WIDTH, 
        animated: true 
      })
    } else {
      // Navigate to main app
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
    <YStack 
      flex={1} 
      backgroundColor="$background"
    >
      {/* Header */}
      <XStack
        paddingTop={insets.top + 12}
        paddingHorizontal={20}
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Logo */}
        <XStack alignItems="center" gap={6}>
          <View
            width={28}
            height={28}
            borderRadius={8}
            backgroundColor="$pink"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize={14} fontWeight="800" color="#FFF">U</Text>
          </View>
          <Text
            fontSize={18}
            fontWeight="700"
            letterSpacing={-0.5}
            color={isDarkMode ? '$white' : '$greyText'}
          >
            umo
          </Text>
        </XStack>

        {/* Theme Toggle + Skip */}
        <XStack gap={12} alignItems="center">
          <Pressable onPress={toggleTheme}>
            <View
              paddingHorizontal={10}
              paddingVertical={8}
              borderRadius={999}
              borderWidth={1}
              borderColor="$borderColorSubtle"
              backgroundColor="$surface"
            >
              <XStack alignItems="center" gap={8}>
                {isDark ? (
                  <Sun size={14} color="$colorMuted" strokeWidth={2.5} />
                ) : (
                  <Moon size={14} color="$colorMuted" strokeWidth={2.5} />
                )}
                <Text fontSize={11} fontWeight="600" color="$colorMuted" letterSpacing={-0.2}>
                  {isDark ? 'Light' : 'Dark'}
                </Text>
              </XStack>
            </View>
          </Pressable>

          <Pressable onPress={handleSkip}>
            <Text
              fontSize={14}
              fontWeight="500"
              color="$colorMuted"
            >
              Skip
            </Text>
          </Pressable>
        </XStack>
      </XStack>

      {/* Slides */}
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        style={{ flex: 1 }}
      >
        {slides.map((slide, index) => (
          <OnboardingSlide
            key={slide.id}
            slide={slide}
            index={index}
            currentIndex={currentIndex}
            theme={theme}
          />
        ))}
      </Animated.ScrollView>

      {/* Bottom Section */}
      <YStack 
        paddingHorizontal={20} 
        paddingBottom={insets.bottom + 20}
        gap={16}
      >
        <DotIndicator 
          count={slides.length} 
          activeIndex={currentIndex}
          theme={theme}
        />

        {/* CTA Button */}
        <Pressable onPress={handleNext}>
          <XStack
            backgroundColor={isDark ? '$white' : '$pink'}
            borderRadius={50}
            paddingVertical={20}
            paddingHorizontal={24}
            alignItems="center"
            justifyContent="space-between"
          >
            <Text 
              fontSize={16} 
              fontWeight="600" 
              letterSpacing={-0.5}
              color={isDark ? '$black' : '$white'}
            >
              {isLastSlide ? 'Get Started' : 'Continue'}
            </Text>
            <View
              width={32}
              height={32}
              borderRadius={16}
              backgroundColor={isDark ? '$black' : 'rgba(255,255,255,0.2)'}
              alignItems="center"
              justifyContent="center"
            >
              {isLastSlide ? (
                <Zap size={16} color="#FFFFFF" strokeWidth={2.5} />
              ) : (
                <ArrowRight size={16} color="#FFFFFF" strokeWidth={2.5} />
              )}
            </View>
          </XStack>
        </Pressable>

        {/* Terms */}
        <Text
          textAlign="center"
          fontSize={12}
          color="$colorFaint"
          lineHeight={18}
        >
          By continuing, you agree to our{' '}
          <Text color="$pink" fontWeight="500">Terms</Text> and{' '}
          <Text color="$pink" fontWeight="500">Privacy Policy</Text>
        </Text>
      </YStack>
    </YStack>
  )
}

