import {
  ArrowRight,
  ChevronDown,
  DollarSign,
  MapPin,
  Sparkles,
  X,
} from '@tamagui/lucide-icons'
import * as Haptics from 'expo-haptics'
import { router } from 'expo-router'
import { useState } from 'react'
import { Pressable, TextInput } from 'react-native'
import Animated, {
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
const AnimatedView = Animated.createAnimatedComponent(View)

// ============================================
// CURRENCY TOGGLE
// ============================================
const CurrencyToggle = ({
  value,
  onChange,
}: {
  value: 'USD' | 'ZiG'
  onChange: (currency: 'USD' | 'ZiG') => void
}) => {
  const handleToggle = (currency: 'USD' | 'ZiG') => {
    if (currency !== value) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      onChange(currency)
    }
  }

  return (
    <XStack
      backgroundColor="$backgroundHover"
      borderRadius={14}
      padding={4}
      gap={4}
    >
      <Pressable onPress={() => handleToggle('USD')} style={{ flex: 1 }}>
        <View
          paddingVertical={14}
          paddingHorizontal={20}
          borderRadius={10}
          backgroundColor={value === 'USD' ? '$cardBg' : 'transparent'}
          alignItems="center"
          shadowColor={value === 'USD' ? '#000' : 'transparent'}
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={value === 'USD' ? 0.1 : 0}
          shadowRadius={8}
          elevation={value === 'USD' ? 3 : 0}
        >
          <Text
            fontSize={15}
            fontWeight={value === 'USD' ? '600' : '500'}
            color={value === 'USD' ? '$color' : '$colorMuted'}
            letterSpacing={-0.2}
          >
            USD $
          </Text>
        </View>
      </Pressable>

      <Pressable onPress={() => handleToggle('ZiG')} style={{ flex: 1 }}>
        <View
          paddingVertical={14}
          paddingHorizontal={20}
          borderRadius={10}
          backgroundColor={value === 'ZiG' ? '$cardBg' : 'transparent'}
          alignItems="center"
          shadowColor={value === 'ZiG' ? '#000' : 'transparent'}
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={value === 'ZiG' ? 0.1 : 0}
          shadowRadius={8}
          elevation={value === 'ZiG' ? 3 : 0}
        >
          <Text
            fontSize={15}
            fontWeight={value === 'ZiG' ? '600' : '500'}
            color={value === 'ZiG' ? '$color' : '$colorMuted'}
            letterSpacing={-0.2}
          >
            ZiG Z$
          </Text>
        </View>
      </Pressable>
    </XStack>
  )
}

// ============================================
// INPUT FIELD
// ============================================
const InputField = ({
  icon: Icon,
  placeholder,
  value,
  onChangeText,
  autoFocus = false,
}: {
  icon: typeof MapPin
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  autoFocus?: boolean
}) => {
  const theme = useTheme()
  const [isFocused, setIsFocused] = useState(false)

  return (
    <XStack
      backgroundColor="$cardBg"
      borderRadius={16}
      borderWidth={1}
      borderColor={isFocused ? '$accent' : '$cardBorder'}
      padding={16}
      alignItems="center"
      gap={12}
    >
      <View
        width={40}
        height={40}
        borderRadius={12}
        backgroundColor="$backgroundHover"
        alignItems="center"
        justifyContent="center"
      >
        <Icon size={18} color={isFocused ? '$accent' : '$colorMuted'} strokeWidth={1.8} />
      </View>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={theme.colorFaint?.val}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoFocus={autoFocus}
        style={{
          flex: 1,
          fontSize: 17,
          fontWeight: '500',
          color: theme.color?.val,
          letterSpacing: -0.3,
        }}
      />
    </XStack>
  )
}

// ============================================
// VENUE SUGGESTION
// ============================================
const VenueSuggestion = ({
  name,
  address,
  onSelect,
  delay = 0,
}: {
  name: string
  address: string
  onSelect: () => void
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
          Haptics.selectionAsync()
          onSelect()
        }}
        style={{ flex: 1 }}
      >
        <XStack
          backgroundColor="$backgroundHover"
          borderRadius={12}
          padding={12}
          alignItems="center"
          gap={10}
        >
          <View
            width={32}
            height={32}
            borderRadius={8}
            backgroundColor="$accentSoft"
            alignItems="center"
            justifyContent="center"
          >
            <MapPin size={14} color="$accent" strokeWidth={2} />
          </View>
          <YStack flex={1} gap={1}>
            <Text fontSize={14} fontWeight="600" color="$color" letterSpacing={-0.2}>
              {name}
            </Text>
            <Text fontSize={12} color="$colorMuted">
              {address}
            </Text>
          </YStack>
          <ChevronDown
            size={14}
            color="$colorGhost"
            strokeWidth={2}
            style={{ transform: [{ rotate: '-90deg' }] }}
          />
        </XStack>
      </Pressable>
    </AnimatedXStack>
  )
}

// ============================================
// MAIN SCREEN
// ============================================
export default function NewSessionScreen() {
  const insets = useSafeAreaInsets()
  const [billName, setBillName] = useState('')
  const [currency, setCurrency] = useState<'USD' | 'ZiG'>('USD')
  const [venue, setVenue] = useState('')

  const buttonScale = useSharedValue(1)

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }))

  const canProceed = billName.trim().length > 0

  const handleCreate = () => {
    if (!canProceed) return
    buttonScale.value = withSequence(withSpring(0.97), withSpring(1))
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)

    // Generate a simple ID and navigate
    const sessionId = `bill-${Date.now()}`
    router.replace({
      pathname: '/session/[id]',
      params: {
        id: sessionId,
        name: billName.trim(),
        currency,
        venue: venue.trim() || undefined,
        isHost: 'true',
      },
    })
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
        paddingBottom={insets.bottom + 16}
      >
        {/* Header */}
        <AnimatedXStack
          entering={FadeInUp.delay(50).springify()}
          justifyContent="space-between"
          alignItems="center"
          marginBottom={32}
        >
          <YStack gap={4}>
            <XStack alignItems="center" gap={6}>
              <View
                width={6}
                height={6}
                borderRadius={3}
                backgroundColor="$accent"
              />
              <Text
                fontSize={11}
                fontWeight="600"
                letterSpacing={0.8}
                textTransform="uppercase"
                color="$colorMuted"
              >
                New Split
              </Text>
            </XStack>
            <Text
              fontSize={28}
              fontWeight="600"
              letterSpacing={-0.8}
              color="$color"
            >
              Create Bill
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

        {/* Form */}
        <YStack gap={20} flex={1}>
          {/* Bill Name */}
          <AnimatedYStack entering={FadeInDown.delay(100).springify()} gap={8}>
            <Text
              fontSize={12}
              fontWeight="500"
              letterSpacing={0.4}
              textTransform="uppercase"
              color="$colorMuted"
              paddingLeft={4}
            >
              Bill Name
            </Text>
            <InputField
              icon={Sparkles}
              placeholder="e.g., Friday Dinner"
              value={billName}
              onChangeText={setBillName}
              autoFocus
            />
          </AnimatedYStack>

          {/* Currency */}
          <AnimatedYStack entering={FadeInDown.delay(150).springify()} gap={8}>
            <Text
              fontSize={12}
              fontWeight="500"
              letterSpacing={0.4}
              textTransform="uppercase"
              color="$colorMuted"
              paddingLeft={4}
            >
              Currency
            </Text>
            <CurrencyToggle value={currency} onChange={setCurrency} />
            <Text fontSize={12} color="$colorFaint" paddingLeft={4}>
              Everyone will pay in {currency === 'USD' ? 'US Dollars' : 'Zimbabwe Gold'}
            </Text>
          </AnimatedYStack>

          {/* Venue (Optional) */}
          <AnimatedYStack entering={FadeInDown.delay(200).springify()} gap={8}>
            <Text
              fontSize={12}
              fontWeight="500"
              letterSpacing={0.4}
              textTransform="uppercase"
              color="$colorMuted"
              paddingLeft={4}
            >
              Venue{' '}
              <Text color="$colorFaint" fontWeight="400">
                (Optional)
              </Text>
            </Text>
            <InputField
              icon={MapPin}
              placeholder="Restaurant or location"
              value={venue}
              onChangeText={setVenue}
            />
          </AnimatedYStack>

          {/* Quick Venue Suggestions */}
          {!venue && (
            <AnimatedYStack entering={FadeInDown.delay(250).springify()} gap={8}>
              <Text
                fontSize={11}
                fontWeight="500"
                letterSpacing={0.6}
                textTransform="uppercase"
                color="$colorFaint"
                paddingLeft={4}
              >
                Nearby
              </Text>
              <YStack gap={6}>
                <VenueSuggestion
                  name="Nando's Sam Levy"
                  address="Sam Levy's Village"
                  onSelect={() => setVenue("Nando's Sam Levy")}
                  delay={280}
                />
                <VenueSuggestion
                  name="Peech Tree"
                  address="Borrowdale"
                  onSelect={() => setVenue('Peech Tree')}
                  delay={310}
                />
              </YStack>
            </AnimatedYStack>
          )}

          {/* Spacer */}
          <View flex={1} />

          {/* Create Button */}
          <Animated.View style={buttonAnimatedStyle}>
            <Pressable onPress={handleCreate} disabled={!canProceed}>
              <XStack
                backgroundColor={canProceed ? '$accent' : '$backgroundHover'}
                borderRadius={9999}
                paddingVertical={18}
                paddingHorizontal={24}
                alignItems="center"
                justifyContent="space-between"
              >
                <Text
                  fontSize={16}
                  fontWeight="600"
                  letterSpacing={-0.2}
                  color={canProceed ? '$accentText' : '$colorMuted'}
                >
                  Create Bill
                </Text>
                <View
                  width={32}
                  height={32}
                  borderRadius={9999}
                  backgroundColor={canProceed ? 'rgba(255,255,255,0.2)' : '$backgroundPress'}
                  alignItems="center"
                  justifyContent="center"
                >
                  <ArrowRight
                    size={16}
                    color={canProceed ? '$accentText' : '$colorMuted'}
                    strokeWidth={2}
                  />
                </View>
              </XStack>
            </Pressable>
          </Animated.View>
        </YStack>
      </YStack>
    </YStack>
  )
}

