import { useThemeMode } from '@/providers/theme-mode'
import {
    ArrowLeft,
    Check,
    Minus,
    Percent,
    Plus,
    Receipt,
    Users,
    Zap,
} from '@tamagui/lucide-icons'
import * as Haptics from 'expo-haptics'
import { router } from 'expo-router'
import { useState } from 'react'
import { Image, Pressable } from 'react-native'
import Animated, {
    FadeInDown,
    FadeInUp,
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScrollView, Text, View, XStack, YStack } from 'tamagui'

// ============================================
// MOCK DATA
// ============================================
const billData = {
  venue: 'Izakaya Omakase',
  table: 'Table 4',
  date: 'Sat, Oct 14',
  items: "3× Chef's Select, 1× Junmai Ginjo",
  subtotal: 240.0,
  headerImage: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=400&h=180&fit=crop',
}

// ============================================
// ANIMATED COMPONENTS
// ============================================
const AnimatedYStack = Animated.createAnimatedComponent(YStack)

// ============================================
// 間 — TIP OPTION
// ============================================
const TipOption = ({
  value,
  isSelected,
  onSelect,
}: {
  value: number
  isSelected: boolean
  onSelect: () => void
}) => {
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const handlePress = () => {
    scale.value = withSequence(withSpring(0.92), withSpring(1))
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onSelect()
  }

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={animatedStyle}>
        <View
          paddingHorizontal={16}
          paddingVertical={10}
          borderRadius={10}
          backgroundColor={isSelected ? '$accent' : '$backgroundHover'}
        >
          <Text
            fontSize={14}
            fontWeight="600"
            color={isSelected ? '$accentText' : '$colorMuted'}
          >
            {value}%
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  )
}

// ============================================
// 間 — SPLIT COUNTER
// ============================================
const SplitCounter = ({
  count,
  onDecrement,
  onIncrement,
}: {
  count: number
  onDecrement: () => void
  onIncrement: () => void
}) => {
  const countScale = useSharedValue(1)

  const countAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: countScale.value }],
  }))

  const handleChange = (fn: () => void) => {
    countScale.value = withSequence(withSpring(1.1), withSpring(1))
    fn()
  }

  return (
    <XStack alignItems="center" gap={20}>
      <Pressable
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          handleChange(onDecrement)
        }}
      >
        <View
          width={44}
          height={44}
          borderRadius={12}
          backgroundColor="$backgroundHover"
          alignItems="center"
          justifyContent="center"
        >
          <Minus size={18} color="$colorMuted" strokeWidth={2} />
        </View>
      </Pressable>

      <Animated.View style={countAnimatedStyle}>
        <YStack alignItems="center" minWidth={80}>
          <Text
            fontFamily="$mono"
            fontSize={48}
            fontWeight="600"
            letterSpacing={-2}
            color="$color"
          >
            {count}
          </Text>
          <Text fontSize={11} fontWeight="500" color="$colorMuted" letterSpacing={0.3}>
            {count === 1 ? 'Person' : 'People'}
          </Text>
        </YStack>
      </Animated.View>

      <Pressable
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          handleChange(onIncrement)
        }}
      >
        <View
          width={44}
          height={44}
          borderRadius={12}
          backgroundColor="$backgroundHover"
          alignItems="center"
          justifyContent="center"
        >
          <Plus size={18} color="$colorMuted" strokeWidth={2} />
        </View>
      </Pressable>
    </XStack>
  )
}

// ============================================
// 間 — INFO ROW
// ============================================
const InfoRow = ({
  label,
  value,
  isMono = false,
}: {
  label: string
  value: string
  isMono?: boolean
}) => (
  <XStack justifyContent="space-between" alignItems="center" paddingVertical={8}>
    <Text fontSize={13} fontWeight="500" color="$colorMuted">
      {label}
    </Text>
    <Text
      fontSize={isMono ? 15 : 14}
      fontWeight="500"
      fontFamily={isMono ? '$mono' : '$body'}
      color="$color"
      letterSpacing={isMono ? -0.2 : 0}
    >
      {value}
    </Text>
  </XStack>
)

// ============================================
// 間 — MAIN SCREEN
// ============================================
export default function FinalizeScreen() {
  const insets = useSafeAreaInsets()
  const { isDark } = useThemeMode()
  const [splitCount, setSplitCount] = useState(3)
  const [tipPercent, setTipPercent] = useState(20)

  const tips = [0, 10, 15, 20, 25]

  // Calculations
  const tipAmount = billData.subtotal * (tipPercent / 100)
  const totalBill = billData.subtotal + tipAmount
  const perPerson = totalBill / splitCount

  const buttonScale = useSharedValue(1)

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }))

  const handleConfirm = () => {
    buttonScale.value = withSequence(withSpring(0.97), withSpring(1))
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    router.replace('/(tabs)')
  }

  return (
    <YStack flex={1} backgroundColor="$background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header Image */}
        <View height={140} overflow="hidden">
          <Image
            source={{ uri: billData.headerImage }}
            style={{ width: '100%', height: 140, opacity: isDark ? 0.6 : 0.85 }}
            resizeMode="cover"
          />
          {/* Solid fade for native compat */}
          <View
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            height={50}
            backgroundColor="$background"
            opacity={0.85}
          />
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
              router.back()
            }}
            style={{ position: 'absolute', top: insets.top + 8, left: 16 }}
          >
            <View
              width={40}
              height={40}
              borderRadius={9999}
              backgroundColor="rgba(0,0,0,0.4)"
              alignItems="center"
              justifyContent="center"
            >
              <ArrowLeft size={18} color="white" strokeWidth={2} />
            </View>
          </Pressable>
        </View>

        <YStack paddingHorizontal={20} marginTop={-20} gap={20}>
          {/* Page Title */}
          <AnimatedYStack entering={FadeInUp.delay(50).springify()} gap={4}>
            <Text fontSize={28} fontWeight="600" letterSpacing={-1} color="$color">
              Settlement
            </Text>
            <Text fontSize={14} color="$colorMuted">
              {billData.venue} · {billData.date}
            </Text>
          </AnimatedYStack>

          {/* Bill Summary Card */}
          <AnimatedYStack
            entering={FadeInDown.delay(100).springify()}
            backgroundColor="$cardBg"
            borderRadius={20}
            padding={20}
            shadowColor="#000"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.06}
            shadowRadius={12}
            elevation={3}
          >
            <XStack alignItems="center" gap={10} marginBottom={12}>
              <Receipt size={16} color="$colorMuted" strokeWidth={1.8} />
              <Text fontSize={17} fontWeight="600" letterSpacing={-0.3} color="$color">
                Bill Summary
              </Text>
            </XStack>

            <YStack borderTopWidth={1} borderTopColor="$borderColorSoft" paddingTop={8}>
              <InfoRow label="Items" value={billData.items} />
              <InfoRow label="Subtotal" value={`$${billData.subtotal.toFixed(2)}`} isMono />
              <InfoRow label={`Tip (${tipPercent}%)`} value={`$${tipAmount.toFixed(2)}`} isMono />
              <View height={1} backgroundColor="$borderColorSoft" marginVertical={8} />
              <XStack justifyContent="space-between" alignItems="center" paddingVertical={4}>
                <Text fontSize={14} fontWeight="600" color="$color">
                  Total Bill
                </Text>
                <Text fontFamily="$mono" fontSize={20} fontWeight="700" color="$color" letterSpacing={-0.5}>
                  ${totalBill.toFixed(2)}
                </Text>
              </XStack>
            </YStack>
          </AnimatedYStack>

          {/* Split Settings Card */}
          <AnimatedYStack
            entering={FadeInDown.delay(150).springify()}
            backgroundColor="$cardBg"
            borderRadius={20}
            padding={20}
            gap={20}
            shadowColor="#000"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.06}
            shadowRadius={12}
            elevation={3}
          >
            <XStack alignItems="center" gap={10}>
              <Users size={16} color="$colorMuted" strokeWidth={1.8} />
              <Text fontSize={17} fontWeight="600" letterSpacing={-0.3} color="$color">
                Split Options
              </Text>
            </XStack>

            {/* Split Counter */}
            <YStack alignItems="center" gap={12}>
              <Text fontSize={11} fontWeight="500" textTransform="uppercase" letterSpacing={0.8} color="$colorMuted">
                Split Between
              </Text>
              <SplitCounter
                count={splitCount}
                onDecrement={() => setSplitCount((c) => Math.max(1, c - 1))}
                onIncrement={() => setSplitCount((c) => Math.min(12, c + 1))}
              />
            </YStack>

            {/* Tip Selector */}
            <YStack gap={12}>
              <XStack alignItems="center" gap={6}>
                <Percent size={12} color="$colorMuted" strokeWidth={2} />
                <Text fontSize={11} fontWeight="500" textTransform="uppercase" letterSpacing={0.8} color="$colorMuted">
                  Tip
                </Text>
              </XStack>
              <XStack gap={8} flexWrap="wrap">
                {tips.map((tip) => (
                  <TipOption
                    key={tip}
                    value={tip}
                    isSelected={tip === tipPercent}
                    onSelect={() => setTipPercent(tip)}
                  />
                ))}
              </XStack>
            </YStack>
          </AnimatedYStack>

          {/* Your Share Card */}
          <AnimatedYStack
            entering={FadeInDown.delay(200).springify()}
            backgroundColor="$featureBg"
            borderRadius={20}
            padding={24}
            gap={16}
            shadowColor="#000"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.06}
            shadowRadius={12}
            elevation={3}
          >
            <XStack alignItems="center" gap={10}>
              <Zap size={16} color="$accent" strokeWidth={2} />
              <Text fontSize={17} fontWeight="600" letterSpacing={-0.3} color="$color">
                Your Share
              </Text>
            </XStack>

            <YStack alignItems="center" gap={4} paddingVertical={12}>
              <Text
                fontFamily="$mono"
                fontSize={56}
                fontWeight="600"
                letterSpacing={-3}
                color="$color"
              >
                ${perPerson.toFixed(2)}
              </Text>
              <Text fontSize={13} color="$colorMuted">
                per person · {splitCount} way split
              </Text>
            </YStack>

            <XStack
              backgroundColor="$backgroundHover"
              borderRadius={10}
              padding={12}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize={12} color="$colorMuted">
                Equal split with {tipPercent}% tip included
              </Text>
              <Check size={14} color="$success" strokeWidth={2.5} />
            </XStack>
          </AnimatedYStack>

          {/* Confirm Button */}
          <Animated.View style={buttonAnimatedStyle}>
            <Pressable onPress={handleConfirm}>
              <XStack
                backgroundColor="$accent"
                borderRadius={9999}
                paddingVertical={18}
                paddingHorizontal={20}
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize={16} fontWeight="600" color="$accentText" letterSpacing={-0.2}>
                  Settle Up
                </Text>
              </XStack>
            </Pressable>
          </Animated.View>
        </YStack>
      </ScrollView>
    </YStack>
  )
}
