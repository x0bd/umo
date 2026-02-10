import { router } from 'expo-router'
import { Pressable, Image } from 'react-native'
import { YStack, XStack, Text, View } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Haptics from 'expo-haptics'
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  SlideInDown,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from 'react-native-reanimated'
import {
  X,
  ArrowRight,
  Receipt,
  Camera,
  Users,
  Zap,
  Scan,
  Link,
} from '@tamagui/lucide-icons'
import { useThemeMode } from '@/providers/theme-mode'

// ============================================
// ANIMATED COMPONENTS
// ============================================
const AnimatedYStack = Animated.createAnimatedComponent(YStack)
const AnimatedXStack = Animated.createAnimatedComponent(XStack)

// ============================================
// ACTION ROW
// ============================================
const ActionRow = ({
  icon: Icon,
  title,
  description,
  onPress,
  isPrimary = false,
  delay = 0,
}: {
  icon: typeof Receipt
  title: string
  description: string
  onPress: () => void
  isPrimary?: boolean
  delay?: number
}) => {
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15 })
  }

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 })
  }

  return (
    <AnimatedXStack
      entering={FadeInDown.delay(delay).springify()}
      style={animatedStyle}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          onPress()
        }}
        style={{ flex: 1 }}
      >
        <XStack
          backgroundColor={isPrimary ? '$featureBg' : '$cardBg'}
          borderRadius={18}
          padding={16}
          alignItems="center"
          gap={14}
          borderWidth={1}
          borderColor={isPrimary ? '$featureBorder' : '$cardBorder'}
          overflow="hidden"
        >
          {isPrimary && (
            <View
              position="absolute"
              top={-40}
              right={-40}
              width={100}
              height={100}
              borderRadius={50}
              backgroundColor="$featureGlow"
            />
          )}

          <View
            width={44}
            height={44}
            borderRadius={14}
            backgroundColor={isPrimary ? '$accentSoft' : '$backgroundHover'}
            alignItems="center"
            justifyContent="center"
          >
            <Icon
              size={20}
              color={isPrimary ? '$accent' : '$colorMuted'}
              strokeWidth={1.8}
            />
          </View>

          <YStack flex={1} gap={2}>
            <Text
              fontSize={16}
              fontWeight="600"
              letterSpacing={-0.2}
              color="$color"
            >
              {title}
            </Text>
            <Text fontSize={13} color="$colorMuted" lineHeight={18}>
              {description}
            </Text>
          </YStack>

          <ArrowRight size={18} color="$colorGhost" strokeWidth={2} />
        </XStack>
      </Pressable>
    </AnimatedXStack>
  )
}

// ============================================
// QUICK RESUME CARD
// ============================================
const QuickResumeCard = () => {
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15 })
  }

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 })
  }

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    router.back()
    setTimeout(() => router.push('/session/lunch-split'), 100)
  }

  return (
    <AnimatedXStack
      entering={FadeInDown.delay(300).springify()}
      style={animatedStyle}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={{ flex: 1 }}
      >
        <XStack
          backgroundColor="$cardBg"
          borderRadius={18}
          padding={14}
          alignItems="center"
          gap={12}
          borderWidth={1}
          borderColor="$cardBorder"
        >
          {/* Image */}
          <View
            width={52}
            height={52}
            borderRadius={14}
            overflow="hidden"
            backgroundColor="$backgroundHover"
          >
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=100&h=100&fit=crop',
              }}
              style={{ width: 52, height: 52 }}
              resizeMode="cover"
            />
          </View>

          <YStack flex={1} gap={4}>
            <XStack alignItems="center" gap={8}>
              <Text
                fontSize={15}
                fontWeight="600"
                letterSpacing={-0.2}
                color="$color"
              >
                Lunch Split
              </Text>
              <View
                backgroundColor="$accent"
                paddingHorizontal={6}
                paddingVertical={2}
                borderRadius={4}
              >
                <XStack alignItems="center" gap={3}>
                  <Zap size={8} color="$accentText" strokeWidth={3} />
                  <Text fontSize={9} fontWeight="700" color="$accentText" letterSpacing={0.4}>
                    LIVE
                  </Text>
                </XStack>
              </View>
            </XStack>
            <Text fontSize={12} color="$colorMuted">
              Nando's · 3 people · $47.50
            </Text>
          </YStack>

          <ArrowRight size={16} color="$colorGhost" strokeWidth={2} />
        </XStack>
      </Pressable>
    </AnimatedXStack>
  )
}

// ============================================
// MAIN MODAL
// ============================================
export default function ModalScreen() {
  const insets = useSafeAreaInsets()
  const { isDark } = useThemeMode()

  const close = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    router.back()
  }

  return (
    <YStack flex={1} backgroundColor="$background">
      <YStack
        paddingTop={insets.top + 12}
        paddingHorizontal={20}
        paddingBottom={insets.bottom + 20}
        gap={24}
        flex={1}
      >
        {/* Header */}
        <AnimatedXStack
          entering={FadeInUp.delay(50).springify()}
          alignItems="center"
          justifyContent="space-between"
        >
          <YStack gap={2}>
            <Text
              fontSize={11}
              fontWeight="600"
              letterSpacing={0.8}
              textTransform="uppercase"
              color="$colorMuted"
            >
              New Split
            </Text>
            <Text
              fontSize={26}
              fontWeight="600"
              letterSpacing={-0.8}
              color="$color"
            >
              Start a Bill
            </Text>
          </YStack>

          <Pressable onPress={close}>
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
              <X size={18} color="$colorMuted" strokeWidth={2} />
            </View>
          </Pressable>
        </AnimatedXStack>

        {/* Actions */}
        <YStack gap={10}>
          <ActionRow
            icon={Receipt}
            title="Manual Entry"
            description="Add items and amounts yourself"
            onPress={() => {
              router.back()
              setTimeout(() => router.push('/session/new'), 100)
            }}
            isPrimary
            delay={100}
          />
          <ActionRow
            icon={Scan}
            title="Scan Receipt"
            description="Use your camera to capture the bill"
            onPress={() => {
              router.back()
              setTimeout(() => router.push('/session/scan'), 100)
            }}
            delay={150}
          />
          <ActionRow
            icon={Link}
            title="Join a Split"
            description="Enter a code from a friend"
            onPress={close}
            delay={200}
          />
        </YStack>

        {/* Divider */}
        <Animated.View entering={FadeIn.delay(250)}>
          <View height={1} backgroundColor="$borderColorSoft" />
        </Animated.View>

        {/* Quick Resume */}
        <YStack gap={12}>
          <Animated.View entering={FadeInDown.delay(260).springify()}>
            <Text
              fontSize={11}
              fontWeight="600"
              letterSpacing={0.6}
              textTransform="uppercase"
              color="$colorFaint"
            >
              Quick Resume
            </Text>
          </Animated.View>
          <QuickResumeCard />
        </YStack>

        {/* Spacer */}
        <View flex={1} />

        {/* Close Button */}
        <Animated.View entering={FadeInDown.delay(350).springify()}>
          <Pressable onPress={close}>
            <XStack
              backgroundColor="$backgroundHover"
              borderRadius={16}
              paddingVertical={16}
              paddingHorizontal={18}
              alignItems="center"
              justifyContent="center"
              borderWidth={1}
              borderColor="$borderColorSoft"
            >
              <Text fontSize={15} fontWeight="600" letterSpacing={-0.2} color="$color">
                Cancel
              </Text>
            </XStack>
          </Pressable>
        </Animated.View>
      </YStack>
    </YStack>
  )
}
