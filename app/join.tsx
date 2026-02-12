import {
  ArrowRight,
  Camera,
  Hash,
  QrCode,
  X,
} from '@tamagui/lucide-icons'
import * as Haptics from 'expo-haptics'
import { router } from 'expo-router'
import { useRef, useState } from 'react'
import { Pressable, TextInput } from 'react-native'
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Text, View, XStack, YStack, useTheme } from 'tamagui'

// ============================================
// ANIMATED COMPONENTS
// ============================================
const AnimatedYStack = Animated.createAnimatedComponent(YStack)
const AnimatedXStack = Animated.createAnimatedComponent(XStack)

// ============================================
// CODE INPUT BOX
// ============================================
const CodeInputBox = ({
  value,
  isFocused,
  index,
}: {
  value: string
  isFocused: boolean
  index: number
}) => (
  <View
    width={56}
    height={72}
    borderRadius={16}
    borderWidth={2}
    borderColor={isFocused ? '$accent' : value ? '$borderColor' : '$borderColorSoft'}
    backgroundColor={value ? '$cardBg' : '$backgroundHover'}
    alignItems="center"
    justifyContent="center"
  >
    <Text
      fontFamily="$mono"
      fontSize={28}
      fontWeight="700"
      letterSpacing={0}
      color="$color"
    >
      {value}
    </Text>
    {isFocused && !value && (
      <View
        position="absolute"
        width={2}
        height={28}
        backgroundColor="$accent"
        borderRadius={1}
      />
    )}
  </View>
)

// ============================================
// MAIN SCREEN
// ============================================
export default function JoinScreen() {
  const insets = useSafeAreaInsets()
  const theme = useTheme()
  const inputRef = useRef<TextInput>(null)

  const [code, setCode] = useState('')
  const [isFocused, setIsFocused] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const buttonScale = useSharedValue(1)
  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }))

  const canJoin = code.length === 4

  const handleCodeChange = (text: string) => {
    // Only allow alphanumeric, max 4 chars
    const cleaned = text.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4)
    setCode(cleaned)
    setError(null)
  }

  const handleJoin = async () => {
    if (!canJoin) return

    buttonScale.value = withSequence(withSpring(0.97), withSpring(1))
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    // For now, navigate to the session
    // In production, this would validate the code first
    setIsLoading(false)
    router.replace({
      pathname: '/session/[id]',
      params: {
        id: `session-${code}`,
        name: 'Joined Bill', // Would come from API
        currency: 'USD',
        isHost: 'false',
      },
    })
  }

  const handleScanQR = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    // TODO: Open camera for QR scanning
    // For now, just focus the input
    inputRef.current?.focus()
  }

  const handleClose = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    router.back()
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  // Split code into 4 characters
  const codeChars = code.padEnd(4, ' ').split('')
  const focusedIndex = code.length < 4 ? code.length : -1

  return (
    <YStack flex={1} backgroundColor="$background">
      {/* Hidden TextInput for keyboard */}
      <TextInput
        ref={inputRef}
        value={code}
        onChangeText={handleCodeChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoFocus
        keyboardType="default"
        autoCapitalize="characters"
        autoCorrect={false}
        maxLength={4}
        style={{
          position: 'absolute',
          opacity: 0,
          height: 0,
          width: 0,
        }}
      />

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
              <Hash size={12} color="$accent" strokeWidth={2.5} />
              <Text
                fontSize={11}
                fontWeight="600"
                letterSpacing={0.8}
                textTransform="uppercase"
                color="$colorMuted"
              >
                Enter Code
              </Text>
            </XStack>
            <Text
              fontSize={28}
              fontWeight="600"
              letterSpacing={-0.8}
              color="$color"
            >
              Join a Split
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

        {/* Code Input */}
        <AnimatedYStack
          entering={FadeInDown.delay(100).springify()}
          alignItems="center"
          gap={20}
          marginTop={40}
        >
          <Text fontSize={15} color="$colorMuted" textAlign="center">
            Enter the 4-character code from your friend
          </Text>

          {/* Code Boxes */}
          <Pressable onPress={focusInput}>
            <XStack gap={10}>
              {codeChars.map((char, index) => (
                <CodeInputBox
                  key={index}
                  value={char.trim()}
                  isFocused={isFocused && index === focusedIndex}
                  index={index}
                />
              ))}
            </XStack>
          </Pressable>

          {/* Error Message */}
          {error && (
            <Animated.View entering={FadeIn}>
              <Text fontSize={13} color="$error" textAlign="center">
                {error}
              </Text>
            </Animated.View>
          )}
        </AnimatedYStack>

        {/* Or Divider */}
        <AnimatedXStack
          entering={FadeIn.delay(200)}
          alignItems="center"
          gap={16}
          marginVertical={40}
        >
          <View flex={1} height={1} backgroundColor="$borderColorSoft" />
          <Text fontSize={12} color="$colorFaint" fontWeight="500">
            OR
          </Text>
          <View flex={1} height={1} backgroundColor="$borderColorSoft" />
        </AnimatedXStack>

        {/* Scan QR Option */}
        <AnimatedYStack entering={FadeInDown.delay(250).springify()}>
          <Pressable onPress={handleScanQR}>
            <XStack
              backgroundColor="$cardBg"
              borderRadius={20}
              padding={20}
              alignItems="center"
              gap={16}
              borderWidth={1}
              borderColor="$cardBorder"
            >
              <View
                width={56}
                height={56}
                borderRadius={16}
                backgroundColor="$accentSoft"
                alignItems="center"
                justifyContent="center"
              >
                <QrCode size={24} color="$accent" strokeWidth={1.8} />
              </View>

              <YStack flex={1} gap={2}>
                <Text
                  fontSize={17}
                  fontWeight="600"
                  letterSpacing={-0.3}
                  color="$color"
                >
                  Scan QR Code
                </Text>
                <Text fontSize={13} color="$colorMuted" lineHeight={18}>
                  Point your camera at a friend's QR code
                </Text>
              </YStack>

              <Camera size={20} color="$colorMuted" strokeWidth={1.8} />
            </XStack>
          </Pressable>
        </AnimatedYStack>

        {/* Spacer */}
        <View flex={1} />

        {/* Join Button */}
        <Animated.View style={buttonAnimatedStyle}>
          <Pressable onPress={handleJoin} disabled={!canJoin || isLoading}>
            <XStack
              backgroundColor={canJoin ? '$accent' : '$backgroundHover'}
              borderRadius={9999}
              paddingVertical={18}
              paddingHorizontal={24}
              alignItems="center"
              justifyContent="center"
              opacity={isLoading ? 0.7 : 1}
            >
              {isLoading ? (
                <Text
                  fontSize={16}
                  fontWeight="600"
                  letterSpacing={-0.2}
                  color="$accentText"
                >
                  Joining...
                </Text>
              ) : (
                <XStack alignItems="center" gap={8}>
                  <Text
                    fontSize={16}
                    fontWeight="600"
                    letterSpacing={-0.2}
                    color={canJoin ? '$accentText' : '$colorMuted'}
                  >
                    Join Split
                  </Text>
                  {canJoin && (
                    <ArrowRight size={18} color="$accentText" strokeWidth={2} />
                  )}
                </XStack>
              )}
            </XStack>
          </Pressable>
        </Animated.View>
      </YStack>
    </YStack>
  )
}

