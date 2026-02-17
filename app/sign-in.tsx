import { auth } from '@/lib/neon'
import { Eye, EyeOff, Mail } from '@tamagui/lucide-icons'
import * as Haptics from 'expo-haptics'
import { router } from 'expo-router'
import { useState } from 'react'
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    TextInput,
} from 'react-native'
import Animated, {
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

// ============================================
// 間 — MINIMAL INPUT FIELD
// ============================================
const FormField = ({
  icon: Icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default' as any,
  autoCapitalize = 'sentences' as any,
  delay = 0,
  rightElement,
}: {
  icon: typeof Mail
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  secureTextEntry?: boolean
  keyboardType?: any
  autoCapitalize?: any
  delay?: number
  rightElement?: React.ReactNode
}) => (
  <Animated.View entering={FadeInDown.delay(delay).springify()}>
    <XStack
      backgroundColor="$cardBg"
      borderRadius={14}
      paddingHorizontal={16}
      paddingVertical={4}
      alignItems="center"
      gap={12}
      height={56}
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 1 }}
      shadowOpacity={0.04}
      shadowRadius={8}
      elevation={2}
    >
      <Icon size={18} color="$colorMuted" strokeWidth={1.8} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#6B6B70"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        style={{
          flex: 1,
          fontSize: 16,
          color: '#FFFFFF',
          fontWeight: '500',
          letterSpacing: -0.2,
        }}
      />
      {rightElement}
    </XStack>
  </Animated.View>
)

// ============================================
// 間 — SIGN IN SCREEN
// ============================================
export default function SignInScreen() {
  const insets = useSafeAreaInsets()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const buttonScale = useSharedValue(1)
  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }))

  const isValid = email.includes('@') && password.length >= 6

  const handleSignIn = async () => {
    if (!isValid || isLoading) return
    setError(null)
    setIsLoading(true)
    buttonScale.value = withSequence(withSpring(0.97), withSpring(1))

    try {
      const result = await auth.signIn.email({
        email: email.trim(),
        password,
      })

      if (result.error) {
        setError(result.error.message || 'Invalid email or password')
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        return
      }

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      router.replace('/(tabs)')
    } catch (err: any) {
      setError(err?.message || 'Network error. Check your connection.')
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <YStack flex={1} backgroundColor="$background">
        <YStack
          flex={1}
          paddingTop={insets.top + 24}
          paddingHorizontal={24}
          paddingBottom={insets.bottom + 20}
          justifyContent="space-between"
        >
          {/* Top Section */}
          <YStack gap={32}>
            {/* Header */}
            <AnimatedYStack entering={FadeInUp.delay(50).springify()} gap={8}>
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
                <Text fontSize={18} fontWeight="700" letterSpacing={-0.5} color="$color">
                  umo
                </Text>
              </XStack>

              <YStack gap={4} marginTop={16}>
                <Text
                  fontSize={32}
                  fontWeight="600"
                  letterSpacing={-1.2}
                  color="$color"
                  lineHeight={36}
                >
                  Welcome{'\n'}back.
                </Text>
                <Text fontSize={15} color="$colorMuted" lineHeight={22} marginTop={4}>
                  Sign in to continue splitting bills.
                </Text>
              </YStack>
            </AnimatedYStack>

            {/* Form Fields */}
            <YStack gap={12}>
              <FormField
                icon={Mail}
                placeholder="Email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                delay={150}
              />
              <FormField
                icon={showPassword ? EyeOff : Eye}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                delay={200}
                rightElement={
                  <Pressable
                    onPress={() => {
                      Haptics.selectionAsync()
                      setShowPassword(!showPassword)
                    }}
                    hitSlop={8}
                  >
                    {showPassword ? (
                      <EyeOff size={18} color="$colorMuted" strokeWidth={1.8} />
                    ) : (
                      <Eye size={18} color="$colorMuted" strokeWidth={1.8} />
                    )}
                  </Pressable>
                }
              />
            </YStack>
          </YStack>

          {/* Bottom Section */}
          <YStack gap={16}>
            {/* Sign In Button */}
            <Animated.View
              entering={FadeInDown.delay(250).springify()}
              style={buttonAnimatedStyle}
            >
              <Pressable onPress={handleSignIn} disabled={!isValid || isLoading}>
                <XStack
                  backgroundColor={isValid ? '$accent' : '$backgroundHover'}
                  borderRadius={9999}
                  paddingVertical={18}
                  alignItems="center"
                  justifyContent="center"
                  gap={8}
                  opacity={isLoading ? 0.7 : 1}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text
                      fontSize={16}
                      fontWeight="600"
                      letterSpacing={-0.2}
                      color={isValid ? '$accentText' : '$colorMuted'}
                    >
                      Sign In
                    </Text>
                  )}
                </XStack>
              </Pressable>
            </Animated.View>

            {/* Error Message */}
            {error && (
              <Animated.View entering={FadeInDown.springify()}>
                <Text textAlign="center" fontSize={13} color="$error" fontWeight="500">
                  {error}
                </Text>
              </Animated.View>
            )}

            {/* Create Account Link */}
            <Animated.View entering={FadeInDown.delay(300).springify()}>
              <XStack justifyContent="center" gap={4}>
                <Text fontSize={14} color="$colorMuted">
                  Don't have an account?
                </Text>
                <Pressable
                  onPress={() => {
                    Haptics.selectionAsync()
                    router.push('/create-account')
                  }}
                >
                  <Text fontSize={14} fontWeight="600" color="$accent">
                    Create One
                  </Text>
                </Pressable>
              </XStack>
            </Animated.View>
          </YStack>
        </YStack>
      </YStack>
    </KeyboardAvoidingView>
  )
}
