import {
    Camera,
    QrCode,
    X
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
import { Text, View, XStack, YStack } from 'tamagui'

// ============================================
// ANIMATED COMPONENTS
// ============================================
const AnimatedYStack = Animated.createAnimatedComponent(YStack)
const AnimatedXStack = Animated.createAnimatedComponent(XStack)

// ============================================
// 間 — CODE INPUT BOX
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
    width={60}
    height={72}
    borderRadius={20}
    backgroundColor={value ? '$cardBg' : '$backgroundHover'}
    alignItems="center"
    justifyContent="center"
    shadowColor="#000"
    shadowOffset={{ width: 0, height: 2 }}
    shadowOpacity={value ? 0.04 : 0}
    shadowRadius={8}
    // No borders
  >
    <Text
      fontFamily="$mono"
      fontSize={32}
      fontWeight="600"
      letterSpacing={0}
      color="$color"
    >
      {value}
    </Text>
    {isFocused && !value && (
      <View
        position="absolute"
        width={2}
        height={24}
        backgroundColor="$accent"
        borderRadius={1}
      />
    )}
  </View>
)

// ============================================
// 間 — MAIN SCREEN
// ============================================
export default function JoinScreen() {
  const insets = useSafeAreaInsets()
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

    setIsLoading(false)
    router.replace({
      pathname: '/session/[id]',
      params: {
        id: `session-${code}`,
        name: 'Joined Bill',
        currency: 'USD',
        isHost: 'false',
      },
    })
  }

  const handleScanQR = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    // TODO: Open camera logic
    inputRef.current?.focus()
  }

  const handleClose = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    router.back()
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const codeChars = code.padEnd(4, ' ').split('')
  const focusedIndex = code.length < 4 ? code.length : -1

  return (
    <YStack flex={1} backgroundColor="$background">
      {/* Hidden TextInput */}
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
          <YStack gap={2}>
            <Text
              fontSize={11}
              fontWeight="500"
              letterSpacing={0.8}
              textTransform="uppercase"
              color="$accent"
            >
              Enter Code
            </Text>
            <Text
              fontSize={26}
              fontWeight="600"
              letterSpacing={-0.8}
              color="$color"
            >
              Join Split
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
          gap={24}
          marginTop={20}
        >
          <Text fontSize={15} color="$colorMuted" textAlign="center" lineHeight={22}>
            Ask your friend for the 4-digit code{'\n'}to join their bill.
          </Text>

          {/* Code Boxes */}
          <Pressable onPress={focusInput}>
            <XStack gap={12}>
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
              padding={16}
              alignItems="center"
              gap={16}
              shadowColor="#000"
              shadowOffset={{ width: 0, height: 2 }}
              shadowOpacity={0.06}
              shadowRadius={12}
              elevation={2}
            >
              <View
                width={52}
                height={52}
                borderRadius={14}
                backgroundColor="$accentSoft"
                alignItems="center"
                justifyContent="center"
              >
                <QrCode size={22} color="$accent" strokeWidth={2} />
              </View>

              <YStack flex={1} gap={2}>
                <Text
                  fontSize={16}
                  fontWeight="600"
                  letterSpacing={-0.2}
                  color="$color"
                >
                  Scan QR Code
                </Text>
                <Text fontSize={13} color="$colorMuted" lineHeight={18}>
                  Point camera at a code
                </Text>
              </YStack>

              <View
                width={36}
                height={36}
                borderRadius={9999}
                backgroundColor="$backgroundHover"
                alignItems="center"
                justifyContent="center"
              >
                <Camera size={16} color="$colorMuted" strokeWidth={2} />
              </View>
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
            >
              <Text
                fontSize={16}
                fontWeight="600"
                letterSpacing={-0.2}
                color={canJoin ? '$accentText' : '$colorMuted'}
              >
                {isLoading ? 'Joining...' : 'Join Split'}
              </Text>
            </XStack>
          </Pressable>
        </Animated.View>
      </YStack>
    </YStack>
  )
}
