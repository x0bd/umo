import { useState, useCallback } from 'react'
import { Pressable } from 'react-native'
import { ScrollView, YStack, XStack, Text, View } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useLocalSearchParams, router } from 'expo-router'
import * as Haptics from 'expo-haptics'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Receipt,
  CreditCard,
} from '@tamagui/lucide-icons'
import { useThemeMode } from '@/providers/theme-mode'

// ============================================
// MOCK DATA
// ============================================
interface ReceiptItem {
  id: number
  name: string
  desc: string
  price: number
  category: 'starters' | 'mains' | 'drinks'
}

const receiptItems: ReceiptItem[] = [
  { id: 1, name: 'Burrata & Figs', desc: 'Aged balsamic, basil oil', price: 18, category: 'starters' },
  { id: 2, name: 'Castelvetrano', desc: 'Marinated olives, citrus', price: 12, category: 'starters' },
  { id: 3, name: 'Spicy Vodka Rigatoni', desc: 'Calabrian chili, pecorino', price: 24, category: 'mains' },
  { id: 4, name: 'Veal Milanese', desc: 'Arugula salad, lemon', price: 28, category: 'mains' },
  { id: 5, name: 'Negroni', desc: 'Classic build', price: 16, category: 'drinks' },
  { id: 6, name: 'Aperol Spritz', desc: 'Prosecco, soda', price: 14, category: 'drinks' },
]

const sessionInfo = {
  name: "Mario's Italian",
  date: 'Sat, Oct 14',
  table: 'Table 4',
  members: 3,
}

const TAX_RATE = 0.20

// ============================================
// CIRCULAR CHECKBOX
// ============================================
const CircleCheck = ({
  checked,
  onToggle,
}: {
  checked: boolean
  onToggle: () => void
}) => {
  const { isDark } = useThemeMode()

  return (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        onToggle()
      }}
      hitSlop={8}
    >
      <View
        width={22}
        height={22}
        borderRadius={11}
        borderWidth={1.5}
        borderColor={checked ? '$pink' : (isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)')}
        backgroundColor={checked ? '$pink' : 'transparent'}
        alignItems="center"
        justifyContent="center"
      >
        {checked && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
      </View>
    </Pressable>
  )
}

// ============================================
// ITEM ROW
// ============================================
const ItemRow = ({
  item,
  isSelected,
  onToggle,
}: {
  item: ReceiptItem
  isSelected: boolean
  onToggle: () => void
}) => (
  <Pressable onPress={onToggle}>
    <XStack
      alignItems="center"
      paddingVertical={14}
      borderBottomWidth={1}
      borderBottomColor="$borderColorSubtle"
      opacity={isSelected ? 1 : 0.4}
      gap={14}
    >
      <CircleCheck checked={isSelected} onToggle={onToggle} />
      <YStack flex={1} gap={2}>
        <Text
          fontSize={15}
          fontWeight="600"
          letterSpacing={-0.2}
          color="$color"
        >
          {item.name}
        </Text>
        <Text
          fontSize={13}
          color="$colorMuted"
          lineHeight={18}
        >
          {item.desc}
        </Text>
      </YStack>
      <Text
        fontFamily="$mono"
        fontSize={15}
        fontWeight="500"
        color="$color"
        letterSpacing={-0.3}
      >
        ${item.price}
      </Text>
    </XStack>
  </Pressable>
)

// ============================================
// CATEGORY HEADER
// ============================================
const CategoryHeader = ({ title }: { title: string }) => (
  <XStack alignItems="center" gap={8} marginTop={8} marginBottom={4}>
    <ChevronDown size={12} color="$colorMuted" strokeWidth={2.5} />
    <Text
      fontSize={11}
      fontWeight="700"
      textTransform="uppercase"
      letterSpacing={0.5}
      color="$colorMuted"
    >
      {title}
    </Text>
  </XStack>
)

// ============================================
// FLOW STEP (line connector decoration)
// ============================================
const FlowStep = ({
  label,
  value,
  isLarge = false,
  isLast = false,
}: {
  label: string
  value: string
  isLarge?: boolean
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
      backgroundColor="$pink"
      opacity={0.6}
    />
    {/* Line */}
    {!isLast && (
      <View
        position="absolute"
        left={-1}
        top={14}
        bottom={-12}
        width={1}
        backgroundColor="$colorFaint"
      />
    )}
    <Text
      fontSize={11}
      fontWeight="700"
      textTransform="uppercase"
      letterSpacing={0.5}
      color="$pinkText"
      opacity={0.7}
    >
      {label}
    </Text>
    <Text
      fontSize={isLarge ? 42 : 15}
      fontWeight={isLarge ? '500' : '600'}
      letterSpacing={isLarge ? -2 : -0.2}
      color="$pinkText"
      fontFamily={isLarge ? '$mono' : '$body'}
    >
      {value}
    </Text>
  </YStack>
)

// ============================================
// MAIN SCREEN
// ============================================
export default function SessionReceiptScreen() {
  const insets = useSafeAreaInsets()
  const { id } = useLocalSearchParams<{ id: string }>()
  const { isDark } = useThemeMode()

  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set())

  const toggleItem = useCallback((itemId: number) => {
    setSelectedItems((prev) => {
      const next = new Set(prev)
      if (next.has(itemId)) {
        next.delete(itemId)
      } else {
        next.add(itemId)
      }
      return next
    })
  }, [])

  // Calculations
  const subtotal = receiptItems
    .filter((item) => selectedItems.has(item.id))
    .reduce((sum, item) => sum + item.price, 0)
  const tax = subtotal * TAX_RATE
  const total = subtotal + tax

  // Group items by category
  const starters = receiptItems.filter((i) => i.category === 'starters')
  const mains = receiptItems.filter((i) => i.category === 'mains')
  const drinks = receiptItems.filter((i) => i.category === 'drinks')

  const handleProceed = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    router.push('/session/finalize')
  }

  return (
    <YStack flex={1} backgroundColor="$background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
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
                fontSize={18}
                fontWeight="500"
                letterSpacing={-0.5}
                color="$color"
              >
                {sessionInfo.name}
              </Text>
              <Text fontSize={13} color="$colorMuted">
                {sessionInfo.date} · {sessionInfo.table}
              </Text>
            </YStack>
          </XStack>

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
            <XStack alignItems="center" gap={10} marginBottom={16}>
              <View
                width={36}
                height={36}
                borderRadius={12}
                backgroundColor={isDark ? '$backgroundHover' : 'rgba(0,0,0,0.06)'}
                alignItems="center"
                justifyContent="center"
              >
                <Receipt size={18} color="$colorMuted" strokeWidth={2} />
              </View>
              <YStack gap={2}>
                <Text
                  fontSize={22}
                  fontWeight="500"
                  letterSpacing={-0.8}
                  color="$color"
                  lineHeight={24}
                >
                  Full Receipt
                </Text>
                <Text fontSize={12} color="$colorMuted">
                  Tap items you ordered
                </Text>
              </YStack>
            </XStack>

            {/* Starters */}
            <CategoryHeader title="Starters" />
            {starters.map((item) => (
              <ItemRow
                key={item.id}
                item={item}
                isSelected={selectedItems.has(item.id)}
                onToggle={() => toggleItem(item.id)}
              />
            ))}

            {/* Mains */}
            <CategoryHeader title="Mains" />
            {mains.map((item) => (
              <ItemRow
                key={item.id}
                item={item}
                isSelected={selectedItems.has(item.id)}
                onToggle={() => toggleItem(item.id)}
              />
            ))}

            {/* Drinks */}
            <CategoryHeader title="Drinks" />
            {drinks.map((item) => (
              <ItemRow
                key={item.id}
                item={item}
                isSelected={selectedItems.has(item.id)}
                onToggle={() => toggleItem(item.id)}
              />
            ))}

            {/* Selection count */}
            <XStack
              justifyContent="space-between"
              alignItems="center"
              marginTop={16}
              paddingTop={12}
              borderTopWidth={1}
              borderTopColor="$borderColorSubtle"
            >
              <Text fontSize={13} fontWeight="500" color="$colorMuted">
                {selectedItems.size} of {receiptItems.length} items selected
              </Text>
              <Pressable
                onPress={() => {
                  Haptics.selectionAsync()
                  if (selectedItems.size === receiptItems.length) {
                    setSelectedItems(new Set())
                  } else {
                    setSelectedItems(new Set(receiptItems.map((i) => i.id)))
                  }
                }}
              >
                <Text fontSize={13} fontWeight="600" color="$pink">
                  {selectedItems.size === receiptItems.length ? 'Deselect All' : 'Select All'}
                </Text>
              </Pressable>
            </XStack>
          </YStack>

          {/* ======== SETTLEMENT CARD (Pink) ======== */}
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
            <XStack alignItems="center" gap={10}>
              <View
                width={36}
                height={36}
                borderRadius={12}
                backgroundColor="rgba(69,0,16,0.15)"
                alignItems="center"
                justifyContent="center"
              >
                <CreditCard size={18} color="$pinkText" strokeWidth={2} />
              </View>
              <Text
                fontSize={22}
                fontWeight="500"
                letterSpacing={-0.8}
                color="$pinkText"
                lineHeight={24}
              >
                Your Share
              </Text>
            </XStack>

            {/* Flow Steps */}
            <YStack gap={20}>
              <FlowStep
                label="Subtotal"
                value={`$${subtotal.toFixed(2)}`}
              />
              <FlowStep
                label="Tax & Tip (20%)"
                value={`$${tax.toFixed(2)}`}
              />
              <FlowStep
                label="Total Due"
                value={`$${total.toFixed(2)}`}
                isLarge
                isLast
              />
            </YStack>

            {/* Pay Button */}
            <Pressable onPress={handleProceed}>
              <XStack
                backgroundColor="rgba(0,0,0,0.85)"
                borderRadius={16}
                paddingVertical={18}
                paddingHorizontal={20}
                alignItems="center"
                justifyContent="space-between"
              >
                <Text
                  fontSize={16}
                  fontWeight="600"
                  color="#FFFFFF"
                  letterSpacing={-0.3}
                >
                  {total > 0 ? 'Proceed to Pay' : 'Select Items'}
                </Text>
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

