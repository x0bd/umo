import { useState } from 'react'
import { Pressable, Dimensions } from 'react-native'
import { ScrollView, YStack, XStack, Text, View } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import * as Haptics from 'expo-haptics'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  Users,
  Percent,
  Zap,
} from '@tamagui/lucide-icons'
import { useThemeMode } from '@/providers/theme-mode'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const SLIDER_WIDTH = SCREEN_WIDTH - 88 // 20px padding each side + 24px card padding each side

// ============================================
// MOCK DATA
// ============================================
const billData = {
  venue: 'Izakaya Omakase',
  table: 'Table 4',
  date: 'Sat, Oct 14',
  items: '3× Chef\'s Select, 1× Junmai Ginjo',
  subtotal: 240.0,
}

// ============================================
// FLOW ITEM (Grey card)
// ============================================
const FlowItem = ({
  label,
  value,
  isDim = false,
  isLast = false,
}: {
  label: string
  value: string
  isDim?: boolean
  isLast?: boolean
}) => (
  <YStack gap={4} position="relative" paddingLeft={20}>
    {/* Connector dot */}
    <View
      position="absolute"
      left={-4}
      top={4}
      width={8}
      height={8}
      borderRadius={4}
      backgroundColor="$colorMuted"
      opacity={0.4}
    />
    {/* Line */}
    {!isLast && (
      <View
        position="absolute"
        left={-1}
        top={14}
        bottom={-16}
        width={1}
        backgroundColor="$borderColorSubtle"
      />
    )}
    <Text
      fontSize={12}
      fontWeight="600"
      textTransform="uppercase"
      letterSpacing={0.5}
      color="$colorMuted"
    >
      {label}
    </Text>
    <Text
      fontSize={17}
      fontWeight="500"
      letterSpacing={-0.3}
      color="$color"
      opacity={isDim ? 0.5 : 1}
      lineHeight={22}
    >
      {value}
    </Text>
  </YStack>
)

// ============================================
// FLOW ITEM (Pink card)
// ============================================
const PinkFlowItem = ({
  label,
  value,
  isLast = false,
}: {
  label: string
  value: string
  isLast?: boolean
}) => (
  <YStack gap={4} position="relative" paddingLeft={20}>
    {/* Connector dot */}
    <View
      position="absolute"
      left={-4}
      top={4}
      width={8}
      height={8}
      borderRadius={4}
      backgroundColor="$pinkText"
      opacity={0.4}
    />
    {/* Line */}
    {!isLast && (
      <View
        position="absolute"
        left={-1}
        top={14}
        bottom={-16}
        width={1}
        backgroundColor="rgba(69,0,16,0.15)"
      />
    )}
    <Text
      fontSize={12}
      fontWeight="600"
      textTransform="uppercase"
      letterSpacing={0.5}
      color="$pinkText"
      opacity={0.6}
    >
      {label}
    </Text>
    <Text
      fontSize={17}
      fontWeight="500"
      letterSpacing={-0.3}
      color="$pinkText"
      lineHeight={22}
    >
      {value}
    </Text>
  </YStack>
)

// ============================================
// SPLIT COUNTER
// ============================================
const SplitCounter = ({
  count,
  onDecrement,
  onIncrement,
}: {
  count: number
  onDecrement: () => void
  onIncrement: () => void
}) => (
  <XStack alignItems="center" gap={16}>
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        onDecrement()
      }}
    >
      <View
        width={44}
        height={44}
        borderRadius={14}
        backgroundColor="rgba(69,0,16,0.12)"
        alignItems="center"
        justifyContent="center"
        borderWidth={1}
        borderColor="rgba(69,0,16,0.08)"
      >
        <Text fontSize={22} fontWeight="400" color="$pinkText" lineHeight={24}>
          −
        </Text>
      </View>
    </Pressable>

    <YStack alignItems="center" minWidth={80}>
      <Text
        fontFamily="$mono"
        fontSize={48}
        fontWeight="500"
        letterSpacing={-3}
        color="$pinkText"
        lineHeight={52}
      >
        {count}
      </Text>
      <Text
        fontSize={12}
        fontWeight="600"
        textTransform="uppercase"
        letterSpacing={0.5}
        color="$pinkText"
        opacity={0.6}
      >
        {count === 1 ? 'Person' : 'People'}
      </Text>
    </YStack>

    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        onIncrement()
      }}
    >
      <View
        width={44}
        height={44}
        borderRadius={14}
        backgroundColor="rgba(69,0,16,0.12)"
        alignItems="center"
        justifyContent="center"
        borderWidth={1}
        borderColor="rgba(69,0,16,0.08)"
      >
        <Text fontSize={22} fontWeight="400" color="$pinkText" lineHeight={24}>
          +
        </Text>
      </View>
    </Pressable>
  </XStack>
)

// ============================================
// MAIN SCREEN
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

  const handleConfirm = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    router.replace('/(tabs)')
  }

  return (
    <YStack flex={1} backgroundColor="$background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <YStack
          paddingTop={insets.top + 12}
          paddingHorizontal={20}
          gap={20}
        >
          {/* ======== HEADER ======== */}
          <XStack alignItems="center" justifyContent="space-between">
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                router.back()
              }}
            >
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
                <ArrowLeft size={18} color="$colorMuted" strokeWidth={2} />
              </View>
            </Pressable>

            <YStack alignItems="flex-end" gap={2}>
              <Text
                fontSize={14}
                color="$colorMuted"
                fontWeight="500"
              >
                Settlement
              </Text>
              <Text
                fontSize={18}
                fontWeight="500"
                letterSpacing={-0.5}
                color="$color"
              >
                {billData.venue}
              </Text>
            </YStack>
          </XStack>

          {/* ======== PAGE TITLE ======== */}
          <YStack gap={4}>
            <Text
              fontSize={36}
              fontWeight="500"
              letterSpacing={-1.5}
              color="$color"
              lineHeight={40}
            >
              Total
            </Text>
            <Text
              fontSize={36}
              fontWeight="500"
              letterSpacing={-1.5}
              color="$colorMuted"
              lineHeight={40}
            >
              vs. Yours
            </Text>
          </YStack>

          {/* ======== RECEIPT CARD (Grey) ======== */}
          <YStack
            backgroundColor={isDark ? '$cardBg' : '#EAEAEA'}
            borderRadius={28}
            padding={24}
            borderWidth={1}
            borderColor="$cardBorder"
            gap={4}
          >
            {/* Card title */}
            <Text
              fontSize={26}
              fontWeight="500"
              letterSpacing={-1}
              color="$color"
              marginBottom={24}
              lineHeight={28}
            >
              Evening{'\n'}Tab
            </Text>

            {/* Flow items */}
            <YStack gap={24}>
              <FlowItem
                label="Source"
                value={`${billData.venue}\n${billData.table}`}
              />
              <FlowItem
                label="Consumed"
                value={billData.items}
              />
              <FlowItem
                label="Subtotal"
                value={`$${billData.subtotal.toFixed(2)}`}
              />
              <FlowItem
                label="Gratuity"
                value={`${tipPercent}% — $${tipAmount.toFixed(2)}`}
              />
              <FlowItem
                label="Total Bill"
                value={`$${totalBill.toFixed(2)}`}
                isLast
              />
            </YStack>
          </YStack>

          {/* ======== PERSONAL SHARE CARD (Pink) ======== */}
          <YStack
            backgroundColor="$pink"
            borderRadius={28}
            padding={24}
            gap={24}
            shadowColor="$pink"
            shadowOffset={{ width: 0, height: 8 }}
            shadowOpacity={0.25}
            shadowRadius={24}
          >
            {/* Card title */}
            <Text
              fontSize={26}
              fontWeight="500"
              letterSpacing={-1}
              color="$pinkText"
              lineHeight={28}
            >
              Personal{'\n'}Share
            </Text>

            {/* Flow details */}
            <YStack gap={24}>
              <PinkFlowItem
                label="Algorithm"
                value={`Equal Split (${splitCount})`}
              />
              <PinkFlowItem
                label="Gratuity"
                value={`${tipPercent}% Included`}
                isLast
              />
            </YStack>

            {/* Split Counter */}
            <YStack gap={12}>
              <Text
                fontSize={12}
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing={0.5}
                color="$pinkText"
                opacity={0.6}
              >
                Split Between
              </Text>
              <XStack justifyContent="center">
                <SplitCounter
                  count={splitCount}
                  onDecrement={() => setSplitCount((c) => Math.max(1, c - 1))}
                  onIncrement={() => setSplitCount((c) => Math.min(12, c + 1))}
                />
              </XStack>
            </YStack>

            {/* Tip Selector */}
            <YStack gap={12}>
              <Text
                fontSize={12}
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing={0.5}
                color="$pinkText"
                opacity={0.6}
              >
                Tip
              </Text>
              <XStack gap={8} flexWrap="wrap">
                {tips.map((tip) => (
                  <Pressable
                    key={tip}
                    onPress={() => {
                      Haptics.selectionAsync()
                      setTipPercent(tip)
                    }}
                  >
                    <View
                      paddingHorizontal={16}
                      paddingVertical={10}
                      borderRadius={12}
                      backgroundColor={
                        tip === tipPercent
                          ? 'rgba(0,0,0,0.85)'
                          : 'rgba(69,0,16,0.12)'
                      }
                      borderWidth={1}
                      borderColor={
                        tip === tipPercent
                          ? 'rgba(0,0,0,0.9)'
                          : 'rgba(69,0,16,0.08)'
                      }
                    >
                      <Text
                        fontSize={14}
                        fontWeight="600"
                        color={tip === tipPercent ? '#FFFFFF' : '$pinkText'}
                      >
                        {tip}%
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </XStack>
            </YStack>

            {/* Due Amount */}
            <YStack
              paddingTop={20}
              borderTopWidth={1}
              borderTopColor="rgba(69,0,16,0.12)"
              gap={8}
            >
              <Text
                fontSize={12}
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing={0.5}
                color="$pinkText"
                opacity={0.7}
              >
                Due Now
              </Text>
              <Text
                fontFamily="$mono"
                fontSize={56}
                fontWeight="600"
                letterSpacing={-3}
                color="$pinkText"
                lineHeight={58}
              >
                ${perPerson.toFixed(2)}
              </Text>
              <Text
                fontSize={13}
                color="$pinkText"
                opacity={0.6}
              >
                per person · {splitCount} way split
              </Text>
            </YStack>

            {/* Confirm Button */}
            <Pressable onPress={handleConfirm}>
              <XStack
                backgroundColor="rgba(0,0,0,0.85)"
                borderRadius={16}
                paddingVertical={20}
                paddingHorizontal={20}
                alignItems="center"
                justifyContent="space-between"
              >
                <XStack alignItems="center" gap={10}>
                  <Zap size={18} color="#FFFFFF" strokeWidth={2.5} />
                  <Text
                    fontSize={16}
                    fontWeight="600"
                    color="#FFFFFF"
                    letterSpacing={-0.3}
                  >
                    Settle Up
                  </Text>
                </XStack>
                <View
                  width={28}
                  height={28}
                  borderRadius={14}
                  backgroundColor="rgba(255,255,255,0.15)"
                  alignItems="center"
                  justifyContent="center"
                >
                  <ArrowRight size={14} color="#FFFFFF" strokeWidth={2.5} />
                </View>
              </XStack>
            </Pressable>
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  )
}

