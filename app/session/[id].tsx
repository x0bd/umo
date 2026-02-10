import { useThemeMode } from '@/providers/theme-mode'
import {
    ArrowLeft,
    Check,
    ChevronDown,
    Coffee,
    CreditCard,
    Receipt,
    Utensils,
    Wine
} from '@tamagui/lucide-icons'
import * as Haptics from 'expo-haptics'
import { router, useLocalSearchParams } from 'expo-router'
import { useCallback, useState } from 'react'
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
// TYPES & MOCK DATA
// ============================================
interface ReceiptItem {
  id: number
  name: string
  desc: string
  price: number
  category: 'starters' | 'mains' | 'drinks'
  imageUrl?: string
}

const receiptItems: ReceiptItem[] = [
  {
    id: 1,
    name: 'Burrata & Figs',
    desc: 'Aged balsamic, basil oil',
    price: 18,
    category: 'starters',
    imageUrl: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=80&h=80&fit=crop',
  },
  {
    id: 2,
    name: 'Castelvetrano Olives',
    desc: 'Marinated, citrus zest',
    price: 12,
    category: 'starters',
  },
  {
    id: 3,
    name: 'Spicy Vodka Rigatoni',
    desc: 'Calabrian chili, pecorino',
    price: 24,
    category: 'mains',
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=80&h=80&fit=crop',
  },
  {
    id: 4,
    name: 'Veal Milanese',
    desc: 'Arugula salad, lemon',
    price: 28,
    category: 'mains',
    imageUrl: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=80&h=80&fit=crop',
  },
  {
    id: 5,
    name: 'Negroni',
    desc: 'Classic build',
    price: 16,
    category: 'drinks',
  },
  {
    id: 6,
    name: 'Aperol Spritz',
    desc: 'Prosecco, soda',
    price: 14,
    category: 'drinks',
  },
]

const sessionInfo = {
  name: "Mario's Italian",
  date: 'Sat, Oct 14',
  table: 'Table 4',
  members: 3,
  headerImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=200&fit=crop',
}

const TAX_RATE = 0.20

const CATEGORY_ICONS = {
  starters: Utensils,
  mains: Coffee,
  drinks: Wine,
}

// ============================================
// ANIMATED COMPONENTS
// ============================================
const AnimatedYStack = Animated.createAnimatedComponent(YStack)

// ============================================
// 間 — CIRCULAR CHECKBOX
// ============================================
const CircleCheck = ({
  checked,
  onToggle,
}: {
  checked: boolean
  onToggle: () => void
}) => {
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const handlePress = () => {
    scale.value = withSequence(withSpring(0.85), withSpring(1))
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onToggle()
  }

  return (
    <Pressable onPress={handlePress} hitSlop={8}>
      <Animated.View style={animatedStyle}>
        <View
          width={24}
          height={24}
          borderRadius={12}
          borderWidth={1}
          borderColor={checked ? '$accent' : '$borderColor'}
          backgroundColor={checked ? '$accent' : 'transparent'}
          alignItems="center"
          justifyContent="center"
        >
          {checked && <Check size={13} color="$accentText" strokeWidth={3} />}
        </View>
      </Animated.View>
    </Pressable>
  )
}

// ============================================
// 間 — ITEM ROW
// ============================================
const ItemRow = ({
  item,
  isSelected,
  onToggle,
  delay = 0,
}: {
  item: ReceiptItem
  isSelected: boolean
  onToggle: () => void
  delay?: number
}) => (
  <Animated.View entering={FadeInDown.delay(delay).springify()}>
    <Pressable onPress={onToggle} style={{ flex: 1 }}>
      <XStack
        alignItems="center"
        paddingVertical={14}
        gap={12}
        opacity={isSelected ? 1 : 0.5}
      >
        <CircleCheck checked={isSelected} onToggle={onToggle} />

        {item.imageUrl ? (
          <View
            width={44}
            height={44}
            borderRadius={10}
            overflow="hidden"
            backgroundColor="$backgroundHover"
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={{ width: 44, height: 44 }}
              resizeMode="cover"
            />
          </View>
        ) : (
          <View
            width={44}
            height={44}
            borderRadius={10}
            backgroundColor="$backgroundHover"
            alignItems="center"
            justifyContent="center"
          >
            {(() => {
              const Icon = CATEGORY_ICONS[item.category]
              return <Icon size={18} color="$colorMuted" strokeWidth={1.5} />
            })()}
          </View>
        )}

        <YStack flex={1} gap={2}>
          <Text fontSize={15} fontWeight="600" letterSpacing={-0.2} color="$color">
            {item.name}
          </Text>
          <Text fontSize={12} color="$colorMuted" lineHeight={16}>
            {item.desc}
          </Text>
        </YStack>

        <Text
          fontFamily="$mono"
          fontSize={15}
          fontWeight="500"
          color="$color"
          letterSpacing={-0.2}
        >
          ${item.price}
        </Text>
      </XStack>
    </Pressable>
  </Animated.View>
)

// ============================================
// 間 — CATEGORY HEADER
// ============================================
const CategoryHeader = ({ title }: { title: string }) => (
  <XStack alignItems="center" gap={6} marginTop={16} marginBottom={8}>
    <ChevronDown size={12} color="$colorMuted" strokeWidth={2} />
    <Text
      fontSize={11}
      fontWeight="500"
      textTransform="uppercase"
      letterSpacing={0.8}
      color="$colorMuted"
    >
      {title}
    </Text>
  </XStack>
)

// ============================================
// 間 — SUMMARY ROW
// ============================================
const SummaryRow = ({
  label,
  value,
  isTotal = false,
}: {
  label: string
  value: string
  isTotal?: boolean
}) => (
  <XStack justifyContent="space-between" alignItems="center" paddingVertical={isTotal ? 12 : 6}>
    <Text
      fontSize={isTotal ? 14 : 13}
      fontWeight={isTotal ? '600' : '500'}
      color={isTotal ? '$color' : '$colorMuted'}
    >
      {label}
    </Text>
    <Text
      fontFamily="$mono"
      fontSize={isTotal ? 22 : 14}
      fontWeight={isTotal ? '700' : '500'}
      color={isTotal ? '$color' : '$colorMuted'}
      letterSpacing={isTotal ? -0.5 : 0}
    >
      {value}
    </Text>
  </XStack>
)

// ============================================
// 間 — MAIN SCREEN
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

  const buttonScale = useSharedValue(1)

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }))

  const handleProceed = () => {
    buttonScale.value = withSequence(withSpring(0.97), withSpring(1))
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    router.push('/session/finalize')
  }

  return (
    <YStack flex={1} backgroundColor="$background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header Image */}
        <View height={160} overflow="hidden">
          <Image
            source={{ uri: sessionInfo.headerImage }}
            style={{ width: '100%', height: 160, opacity: isDark ? 0.7 : 0.9 }}
            resizeMode="cover"
          />
          {/* Gradient fade — solid block for native compat */}
          <View
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            height={60}
            backgroundColor="$background"
            opacity={0.85}
          />
          {/* Back button */}
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

        <YStack paddingHorizontal={20} marginTop={-30} gap={20}>
          {/* Session Info */}
          <AnimatedYStack entering={FadeInUp.delay(100).springify()} gap={4}>
            <Text fontSize={26} fontWeight="600" letterSpacing={-0.8} color="$color">
              {sessionInfo.name}
            </Text>
            <Text fontSize={14} color="$colorMuted">
              {sessionInfo.date} · {sessionInfo.table} · {sessionInfo.members} people
            </Text>
          </AnimatedYStack>

          {/* Receipt Card */}
          <AnimatedYStack
            entering={FadeInDown.delay(150).springify()}
            backgroundColor="$cardBg"
            borderRadius={20}
            padding={20}
            shadowColor="#000"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.06}
            shadowRadius={12}
            elevation={3}
          >
            {/* Card Header */}
            <XStack alignItems="center" gap={10} marginBottom={8}>
              <Receipt size={16} color="$colorMuted" strokeWidth={1.8} />
              <YStack>
                <Text fontSize={17} fontWeight="600" letterSpacing={-0.3} color="$color">
                  Full Receipt
                </Text>
                <Text fontSize={12} color="$colorMuted">
                  Tap items you ordered
                </Text>
              </YStack>
            </XStack>

            {/* Starters */}
            <CategoryHeader title="Starters" />
            {starters.map((item, i) => (
              <ItemRow
                key={item.id}
                item={item}
                isSelected={selectedItems.has(item.id)}
                onToggle={() => toggleItem(item.id)}
                delay={200 + i * 30}
              />
            ))}

            {/* Mains */}
            <CategoryHeader title="Mains" />
            {mains.map((item, i) => (
              <ItemRow
                key={item.id}
                item={item}
                isSelected={selectedItems.has(item.id)}
                onToggle={() => toggleItem(item.id)}
                delay={280 + i * 30}
              />
            ))}

            {/* Drinks */}
            <CategoryHeader title="Drinks" />
            {drinks.map((item, i) => (
              <ItemRow
                key={item.id}
                item={item}
                isSelected={selectedItems.has(item.id)}
                onToggle={() => toggleItem(item.id)}
                delay={360 + i * 30}
              />
            ))}

            {/* Selection count */}
            <XStack
              justifyContent="space-between"
              alignItems="center"
              marginTop={16}
              paddingTop={12}
              borderTopWidth={1}
              borderTopColor="$borderColorSoft"
            >
              <Text fontSize={12} fontWeight="500" color="$colorMuted">
                {selectedItems.size} of {receiptItems.length} items
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
                <Text fontSize={12} fontWeight="600" color="$accent">
                  {selectedItems.size === receiptItems.length ? 'Clear All' : 'Select All'}
                </Text>
              </Pressable>
            </XStack>
          </AnimatedYStack>

          {/* Settlement Summary */}
          <AnimatedYStack
            entering={FadeInDown.delay(400).springify()}
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
              <CreditCard size={16} color="$accent" strokeWidth={1.8} />
              <Text fontSize={17} fontWeight="600" letterSpacing={-0.3} color="$color">
                Your Share
              </Text>
            </XStack>

            <YStack gap={4} borderTopWidth={1} borderTopColor="$borderColorSoft" paddingTop={12}>
              <SummaryRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              <SummaryRow label="Tax & Tip (20%)" value={`$${tax.toFixed(2)}`} />
              <View height={1} backgroundColor="$borderColorSoft" marginVertical={8} />
              <SummaryRow label="Total Due" value={`$${total.toFixed(2)}`} isTotal />
            </YStack>
          </AnimatedYStack>

          {/* Proceed Button */}
          <Animated.View style={buttonAnimatedStyle}>
            <Pressable onPress={handleProceed} disabled={total === 0}>
              <XStack
                backgroundColor={total > 0 ? '$accent' : '$backgroundHover'}
                borderRadius={9999}
                paddingVertical={18}
                paddingHorizontal={20}
                alignItems="center"
                justifyContent="center"
              >
                <Text
                  fontSize={16}
                  fontWeight="600"
                  color={total > 0 ? '$accentText' : '$colorMuted'}
                  letterSpacing={-0.2}
                >
                  {total > 0 ? 'Proceed to Pay' : 'Select Items'}
                </Text>
              </XStack>
            </Pressable>
          </Animated.View>
        </YStack>
      </ScrollView>
    </YStack>
  )
}
