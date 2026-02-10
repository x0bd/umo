import {
    Eye,
    EyeOff,
    Mail,
    Phone,
    User
} from '@tamagui/lucide-icons'
import * as Haptics from 'expo-haptics'
import { router } from 'expo-router'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, TextInput } from 'react-native'
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
  icon: typeof User
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
// 間 — MAIN SCREEN
// ============================================
export default function CreateAccountScreen() {
  const insets = useSafeAreaInsets()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const buttonScale = useSharedValue(1)
  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }))

  const isValid = name.trim().length > 1 && email.includes('@') && phone.length > 5

  const handleCreate = () => {
    if (!isValid) return
    buttonScale.value = withSequence(withSpring(0.97), withSpring(1))
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    // TODO: Hook up Supabase auth
    router.replace('/(tabs)')
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
                  Create your{'\n'}account.
                </Text>
                <Text fontSize={15} color="$colorMuted" lineHeight={22} marginTop={4}>
                  Join thousands splitting bills across Zimbabwe.
                </Text>
              </YStack>
            </AnimatedYStack>

            {/* Form Fields */}
            <YStack gap={12}>
              <FormField
                icon={User}
                placeholder="Full name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                delay={150}
              />
              <FormField
                icon={Mail}
                placeholder="Email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                delay={200}
              />
              <FormField
                icon={Phone}
                placeholder="Phone number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                delay={250}
              />
              <FormField
                icon={showPassword ? EyeOff : Eye}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                delay={300}
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
            {/* Create Button */}
            <Animated.View
              entering={FadeInDown.delay(350).springify()}
              style={buttonAnimatedStyle}
            >
              <Pressable onPress={handleCreate} disabled={!isValid}>
                <XStack
                  backgroundColor={isValid ? '$accent' : '$backgroundHover'}
                  borderRadius={9999}
                  paddingVertical={18}
                  alignItems="center"
                  justifyContent="center"
                  gap={8}
                >
                  <Text
                    fontSize={16}
                    fontWeight="600"
                    letterSpacing={-0.2}
                    color={isValid ? '$accentText' : '$colorMuted'}
                  >
                    Create Account
                  </Text>
                </XStack>
              </Pressable>
            </Animated.View>

            {/* Sign In Link */}
            <Animated.View entering={FadeInDown.delay(400).springify()}>
              <XStack justifyContent="center" gap={4}>
                <Text fontSize={14} color="$colorMuted">
                  Already have an account?
                </Text>
                <Pressable onPress={() => Haptics.selectionAsync()}>
                  <Text fontSize={14} fontWeight="600" color="$accent">
                    Sign In
                  </Text>
                </Pressable>
              </XStack>
            </Animated.View>

            {/* Terms */}
            <Animated.View entering={FadeInDown.delay(450).springify()}>
              <Text textAlign="center" fontSize={11} color="$colorGhost" lineHeight={16}>
                By creating an account, you agree to our{' '}
                <Text color="$colorMuted" fontWeight="500">
                  Terms
                </Text>{' '}
                and{' '}
                <Text color="$colorMuted" fontWeight="500">
                  Privacy Policy
                </Text>
              </Text>
            </Animated.View>
          </YStack>
        </YStack>
      </YStack>
    </KeyboardAvoidingView>
  )
}
