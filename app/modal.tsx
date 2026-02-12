import {
    ArrowRight,
    Link,
    Receipt,
    X
} from '@tamagui/lucide-icons'
import * as Haptics from 'expo-haptics'
import { router } from 'expo-router'
import { Image, Pressable } from 'react-native'
import Animated, {
    FadeIn,
    FadeInDown,
    FadeInUp,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Text, View, XStack, YStack } from 'tamagui'

// ============================================
// ANIMATED COMPONENTS
// ============================================
const AnimatedYStack = Animated.createAnimatedComponent(YStack)
const AnimatedXStack = Animated.createAnimatedComponent(XStack)

// ============================================
// 間 — ACTION ROW
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

  return (
    <AnimatedXStack
      entering={FadeInDown.delay(delay).springify()}
      style={animatedStyle}
    >
      <Pressable
        onPressIn={() => {
          scale.value = withSpring(0.98, { damping: 15 })
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 15 })
        }}
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
          shadowColor="#000"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.06}
          shadowRadius={12}
          elevation={3}
        >
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
// 間 — QUICK RESUME CARD
// ============================================
const QuickResumeCard = () => {
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

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
        onPressIn={() => {
          scale.value = withSpring(0.98, { damping: 15 })
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 15 })
        }}
        onPress={handlePress}
        style={{ flex: 1 }}
      >
        <XStack
          backgroundColor="$cardBg"
          borderRadius={18}
          padding={14}
          alignItems="center"
          gap={12}
          shadowColor="#000"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.06}
          shadowRadius={12}
          elevation={3}
        >
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
                backgroundColor="$accentGhost"
                paddingHorizontal={6}
                paddingVertical={2}
                borderRadius={4}
              >
                <Text fontSize={9} fontWeight="600" color="$accent" letterSpacing={0.4}>
                  LIVE
                </Text>
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
// 間 — MAIN MODAL
// ============================================
export default function ModalScreen() {
  const insets = useSafeAreaInsets()

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
              fontWeight="500"
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
              borderRadius={9999}
              backgroundColor="$backgroundHover"
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
            title="Create New Bill"
            description="Add items and split with friends"
            onPress={() => {
              router.back()
              setTimeout(() => router.push('/session/new'), 100)
            }}
            isPrimary
            delay={100}
          />
          <ActionRow
            icon={Link}
            title="Join a Split"
            description="Enter a code from a friend"
            onPress={() => {
              router.back()
              setTimeout(() => router.push('/join'), 100)
            }}
            delay={150}
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
              fontWeight="500"
              letterSpacing={0.8}
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

        {/* Cancel Button */}
        <Animated.View entering={FadeInDown.delay(350).springify()}>
          <Pressable onPress={close}>
            <XStack
              backgroundColor="$backgroundHover"
              borderRadius={9999}
              paddingVertical={16}
              paddingHorizontal={18}
              alignItems="center"
              justifyContent="center"
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
