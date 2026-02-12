import {
  Check,
  Copy,
  Link,
  QrCode,
  Share2,
  X,
} from '@tamagui/lucide-icons'
import * as Haptics from 'expo-haptics'
import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { Pressable, Share } from 'react-native'
import * as Clipboard from 'expo-clipboard'
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Text, View, XStack, YStack } from 'tamagui'

// ============================================
// ANIMATED COMPONENTS
// ============================================
const AnimatedYStack = Animated.createAnimatedComponent(YStack)
const AnimatedXStack = Animated.createAnimatedComponent(XStack)
const AnimatedView = Animated.createAnimatedComponent(View)

// ============================================
// FAKE QR CODE (Visual representation)
// ============================================
const FakeQRCode = ({ code }: { code: string }) => {
  // Generate a deterministic pattern based on code
  const pattern = code.split('').map((c) => c.charCodeAt(0) % 2)

  return (
    <View
      width={200}
      height={200}
      backgroundColor="white"
      borderRadius={16}
      padding={16}
      alignItems="center"
      justifyContent="center"
    >
      {/* QR Pattern Grid */}
      <View
        width={168}
        height={168}
        flexDirection="row"
        flexWrap="wrap"
      >
        {/* Corner markers */}
        <View position="absolute" top={0} left={0}>
          <QRCorner />
        </View>
        <View position="absolute" top={0} right={0}>
          <QRCorner />
        </View>
        <View position="absolute" bottom={0} left={0}>
          <QRCorner />
        </View>

        {/* Pattern cells */}
        {Array.from({ length: 121 }).map((_, i) => {
          const row = Math.floor(i / 11)
          const col = i % 11
          // Skip corner areas
          if ((row < 3 && col < 3) || (row < 3 && col > 7) || (row > 7 && col < 3)) {
            return <View key={i} width={12} height={12} />
          }
          const filled = (i + pattern[i % pattern.length]) % 3 !== 0
          return (
            <View
              key={i}
              width={12}
              height={12}
              backgroundColor={filled ? '#000' : 'transparent'}
              borderRadius={2}
              margin={1.5}
            />
          )
        })}
      </View>
    </View>
  )
}

const QRCorner = () => (
  <View width={42} height={42} padding={4}>
    <View
      width={34}
      height={34}
      borderWidth={4}
      borderColor="#000"
      borderRadius={6}
      alignItems="center"
      justifyContent="center"
    >
      <View width={14} height={14} backgroundColor="#000" borderRadius={2} />
    </View>
  </View>
)

// ============================================
// PULSING RING
// ============================================
const PulsingRing = ({ delay = 0 }: { delay?: number }) => {
  const scale = useSharedValue(1)
  const opacity = useSharedValue(0.4)

  // Start animation
  scale.value = withRepeat(
    withSequence(
      withTiming(1, { duration: 0 }),
      withTiming(1.5, { duration: 2000 })
    ),
    -1
  )
  opacity.value = withRepeat(
    withSequence(
      withTiming(0.4, { duration: 0 }),
      withTiming(0, { duration: 2000 })
    ),
    -1
  )

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }))

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: 200,
          height: 200,
          borderRadius: 100,
          borderWidth: 2,
          borderColor: '#E85D75',
        },
        animatedStyle,
      ]}
    />
  )
}

// ============================================
// ACTION BUTTON
// ============================================
const ActionButton = ({
  icon: Icon,
  label,
  onPress,
  isPrimary = false,
  delay = 0,
}: {
  icon: typeof Copy
  label: string
  onPress: () => void
  isPrimary?: boolean
  delay?: number
}) => {
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const handlePress = () => {
    scale.value = withSequence(withSpring(0.95), withSpring(1))
    onPress()
  }

  return (
    <AnimatedYStack
      entering={FadeInDown.delay(delay).springify()}
      style={animatedStyle}
      flex={1}
    >
      <Pressable onPress={handlePress} style={{ flex: 1 }}>
        <YStack
          backgroundColor={isPrimary ? '$accent' : '$cardBg'}
          borderRadius={16}
          paddingVertical={16}
          paddingHorizontal={12}
          alignItems="center"
          gap={8}
          borderWidth={isPrimary ? 0 : 1}
          borderColor="$cardBorder"
        >
          <View
            width={44}
            height={44}
            borderRadius={12}
            backgroundColor={isPrimary ? 'rgba(255,255,255,0.2)' : '$backgroundHover'}
            alignItems="center"
            justifyContent="center"
          >
            <Icon
              size={20}
              color={isPrimary ? '$accentText' : '$colorMuted'}
              strokeWidth={1.8}
            />
          </View>
          <Text
            fontSize={13}
            fontWeight="600"
            letterSpacing={-0.2}
            color={isPrimary ? '$accentText' : '$color'}
          >
            {label}
          </Text>
        </YStack>
      </Pressable>
    </AnimatedYStack>
  )
}

// ============================================
// MAIN SCREEN
// ============================================
export default function ShareBillScreen() {
  const insets = useSafeAreaInsets()
  const params = useLocalSearchParams<{
    id: string
    name?: string
  }>()

  const billName = params.name || 'Bill'

  // Generate a 4-character code from the ID
  const code = (params.id || 'XXXX').slice(-4).toUpperCase()
  const shareUrl = `umo.app/join/${code}`

  const [copied, setCopied] = useState(false)

  const handleCopyCode = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    await Clipboard.setStringAsync(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyLink = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    await Clipboard.setStringAsync(shareUrl)
  }

  const handleShare = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    try {
      await Share.share({
        message: `Join my bill split "${billName}" on Umo!\n\nCode: ${code}\n${shareUrl}`,
      })
    } catch (error) {
      console.error('Share error:', error)
    }
  }

  const handleClose = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    router.back()
  }

  return (
    <YStack flex={1} backgroundColor="$background">
      <YStack
        flex={1}
        paddingTop={insets.top + 12}
        paddingHorizontal={20}
        paddingBottom={insets.bottom + 20}
      >
        {/* Header */}
        <AnimatedXStack
          entering={FadeInUp.delay(50).springify()}
          justifyContent="space-between"
          alignItems="center"
          marginBottom={40}
        >
          <YStack gap={4}>
            <XStack alignItems="center" gap={6}>
              <View
                width={6}
                height={6}
                borderRadius={3}
                backgroundColor="$success"
              />
              <Text
                fontSize={11}
                fontWeight="600"
                letterSpacing={0.8}
                textTransform="uppercase"
                color="$colorMuted"
              >
                Live
              </Text>
            </XStack>
            <Text
              fontSize={26}
              fontWeight="600"
              letterSpacing={-0.8}
              color="$color"
            >
              Share Bill
            </Text>
          </YStack>

          <Pressable onPress={handleClose}>
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

        {/* QR Code Area */}
        <AnimatedYStack
          entering={FadeIn.delay(100)}
          alignItems="center"
          gap={24}
          flex={1}
          justifyContent="center"
          marginTop={-40}
        >
          {/* QR Code with Rings */}
          <View alignItems="center" justifyContent="center">
            <PulsingRing delay={0} />
            <PulsingRing delay={600} />
            <AnimatedView
              entering={FadeIn.delay(200)}
              shadowColor="$accent"
              shadowOffset={{ width: 0, height: 8 }}
              shadowOpacity={0.15}
              shadowRadius={24}
              elevation={8}
            >
              <FakeQRCode code={code} />
            </AnimatedView>
          </View>

          {/* Bill Name */}
          <AnimatedYStack
            entering={FadeInDown.delay(250).springify()}
            alignItems="center"
            gap={4}
          >
            <Text
              fontSize={20}
              fontWeight="600"
              letterSpacing={-0.4}
              color="$color"
            >
              {billName}
            </Text>
            <Text fontSize={14} color="$colorMuted">
              Scan to join this split
            </Text>
          </AnimatedYStack>

          {/* Code Display */}
          <Pressable onPress={handleCopyCode}>
            <AnimatedXStack
              entering={FadeInDown.delay(300).springify()}
              backgroundColor="$cardBg"
              borderRadius={16}
              borderWidth={1}
              borderColor={copied ? '$success' : '$cardBorder'}
              paddingVertical={14}
              paddingHorizontal={24}
              alignItems="center"
              gap={12}
            >
              <Text
                fontFamily="$mono"
                fontSize={32}
                fontWeight="700"
                letterSpacing={4}
                color="$color"
              >
                {code}
              </Text>
              <View
                width={32}
                height={32}
                borderRadius={8}
                backgroundColor={copied ? '$successSoft' : '$backgroundHover'}
                alignItems="center"
                justifyContent="center"
              >
                {copied ? (
                  <Check size={16} color="$success" strokeWidth={2.5} />
                ) : (
                  <Copy size={16} color="$colorMuted" strokeWidth={2} />
                )}
              </View>
            </AnimatedXStack>
          </Pressable>
        </AnimatedYStack>

        {/* Action Buttons */}
        <XStack gap={12}>
          <ActionButton
            icon={Link}
            label="Copy Link"
            onPress={handleCopyLink}
            delay={350}
          />
          <ActionButton
            icon={Share2}
            label="Share"
            onPress={handleShare}
            isPrimary
            delay={400}
          />
        </XStack>
      </YStack>
    </YStack>
  )
}

