import {
  ArrowLeft,
  Check,
  DollarSign,
  Divide,
  Hand,
  Minus,
  Plus,
  QrCode,
  Receipt,
  Trash2,
  Users,
} from '@tamagui/lucide-icons'
import * as Haptics from 'expo-haptics'
import { router, useLocalSearchParams } from 'expo-router'
import { useCallback, useRef, useState } from 'react'
import { Pressable, TextInput, Keyboard } from 'react-native'
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScrollView, Text, View, XStack, YStack, useTheme } from 'tamagui'

// ============================================
// TYPES
// ============================================
interface BillItem {
  id: string
  name: string
  amount: number
  claimedBy: string[] // user IDs who claimed this item
}

interface Member {
  id: string
  name: string
  avatar: string
  isHost: boolean
}

type SplitMode = 'items' | 'equal' | 'custom'

// ============================================
// ANIMATED COMPONENTS
// ============================================
const AnimatedYStack = Animated.createAnimatedComponent(YStack)
const AnimatedXStack = Animated.createAnimatedComponent(XStack)
const AnimatedView = Animated.createAnimatedComponent(View)

// ============================================
// SPLIT MODE SELECTOR
// ============================================
const SplitModeSelector = ({
  mode,
  onChange,
}: {
  mode: SplitMode
  onChange: (mode: SplitMode) => void
}) => {
  const modes: { id: SplitMode; icon: typeof Receipt; label: string }[] = [
    { id: 'items', icon: Receipt, label: 'By Item' },
    { id: 'equal', icon: Divide, label: 'Equal' },
    { id: 'custom', icon: Hand, label: 'Custom' },
  ]

  return (
    <AnimatedXStack
      entering={FadeInDown.delay(50).springify()}
      backgroundColor="$backgroundHover"
      borderRadius={14}
      padding={4}
      gap={4}
    >
      {modes.map((m) => {
        const isActive = mode === m.id
        const Icon = m.icon
        return (
          <Pressable
            key={m.id}
            onPress={() => {
              if (m.id !== mode) {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                onChange(m.id)
              }
            }}
            style={{ flex: 1 }}
          >
            <XStack
              paddingVertical={10}
              paddingHorizontal={12}
              borderRadius={10}
              backgroundColor={isActive ? '$cardBg' : 'transparent'}
              alignItems="center"
              justifyContent="center"
              gap={6}
              shadowColor={isActive ? '#000' : 'transparent'}
              shadowOffset={{ width: 0, height: 2 }}
              shadowOpacity={isActive ? 0.08 : 0}
              shadowRadius={6}
              elevation={isActive ? 2 : 0}
            >
              <Icon
                size={14}
                color={isActive ? '$accent' : '$colorMuted'}
                strokeWidth={2}
              />
              <Text
                fontSize={12}
                fontWeight={isActive ? '600' : '500'}
                color={isActive ? '$color' : '$colorMuted'}
                letterSpacing={-0.2}
              >
                {m.label}
              </Text>
            </XStack>
          </Pressable>
        )
      })}
    </AnimatedXStack>
  )
}

// ============================================
// MEMBER COUNT STEPPER
// ============================================
const MemberStepper = ({
  count,
  onChange,
}: {
  count: number
  onChange: (count: number) => void
}) => {
  const handleDecrement = () => {
    if (count > 1) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      onChange(count - 1)
    }
  }

  const handleIncrement = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onChange(count + 1)
  }

  return (
    <XStack
      backgroundColor="$cardBg"
      borderRadius={14}
      borderWidth={1}
      borderColor="$cardBorder"
      padding={4}
      alignItems="center"
      gap={4}
    >
      <Pressable onPress={handleDecrement}>
        <View
          width={40}
          height={40}
          borderRadius={10}
          backgroundColor={count > 1 ? '$backgroundHover' : 'transparent'}
          alignItems="center"
          justifyContent="center"
          opacity={count > 1 ? 1 : 0.3}
        >
          <Minus size={18} color="$colorMuted" strokeWidth={2} />
        </View>
      </Pressable>

      <XStack
        flex={1}
        alignItems="center"
        justifyContent="center"
        gap={8}
        paddingHorizontal={12}
      >
        <Users size={16} color="$accent" strokeWidth={2} />
        <Text
          fontFamily="$mono"
          fontSize={24}
          fontWeight="700"
          letterSpacing={-0.5}
          color="$color"
        >
          {count}
        </Text>
        <Text fontSize={14} color="$colorMuted">
          {count === 1 ? 'person' : 'people'}
        </Text>
      </XStack>

      <Pressable onPress={handleIncrement}>
        <View
          width={40}
          height={40}
          borderRadius={10}
          backgroundColor="$backgroundHover"
          alignItems="center"
          justifyContent="center"
        >
          <Plus size={18} color="$accent" strokeWidth={2} />
        </View>
      </Pressable>
    </XStack>
  )
}

// ============================================
// CUSTOM AMOUNT INPUT
// ============================================
const CustomAmountInput = ({
  value,
  onChange,
  currency,
  total,
}: {
  value: string
  onChange: (value: string) => void
  currency: string
  total: number
}) => {
  const theme = useTheme()
  const [isFocused, setIsFocused] = useState(false)
  const currencySymbol = currency === 'USD' ? '$' : 'Z$'
  const numValue = parseFloat(value) || 0
  const remaining = total - numValue

  return (
    <AnimatedYStack entering={FadeIn.delay(100)} gap={16}>
      {/* Amount Input */}
      <YStack
        backgroundColor="$cardBg"
        borderRadius={20}
        borderWidth={2}
        borderColor={isFocused ? '$accent' : '$cardBorder'}
        padding={20}
        alignItems="center"
        gap={8}
      >
        <Text
          fontSize={12}
          fontWeight="500"
          letterSpacing={0.6}
          textTransform="uppercase"
          color="$colorMuted"
        >
          I'll Pay
        </Text>

        <XStack alignItems="flex-start" gap={4}>
          <Text
            fontSize={24}
            fontWeight="600"
            color="$colorMuted"
            marginTop={8}
          >
            {currencySymbol}
          </Text>
          <TextInput
            value={value}
            onChangeText={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            keyboardType="decimal-pad"
            placeholder="0.00"
            placeholderTextColor={theme.colorFaint?.val}
            style={{
              fontSize: 56,
              fontWeight: '700',
              color: theme.color?.val,
              letterSpacing: -2,
              textAlign: 'center',
              minWidth: 120,
            }}
          />
        </XStack>

        {total > 0 && (
          <Text fontSize={13} color="$colorMuted">
            of {currencySymbol}{total.toFixed(2)} total
          </Text>
        )}
      </YStack>

      {/* Quick Amount Pills */}
      {total > 0 && (
        <XStack gap={8} justifyContent="center" flexWrap="wrap">
          {[0.25, 0.5, 0.75, 1].map((fraction) => {
            const amount = total * fraction
            const label = fraction === 1 ? 'Full' : `${fraction * 100}%`
            return (
              <Pressable
                key={fraction}
                onPress={() => {
                  Haptics.selectionAsync()
                  onChange(amount.toFixed(2))
                }}
              >
                <View
                  paddingVertical={8}
                  paddingHorizontal={14}
                  borderRadius={8}
                  backgroundColor={
                    numValue === amount ? '$accentSoft' : '$backgroundHover'
                  }
                  borderWidth={1}
                  borderColor={numValue === amount ? '$accent' : 'transparent'}
                >
                  <Text
                    fontSize={13}
                    fontWeight="600"
                    color={numValue === amount ? '$accent' : '$colorMuted'}
                  >
                    {label}
                  </Text>
                </View>
              </Pressable>
            )
          })}
        </XStack>
      )}

      {/* Remaining indicator */}
      {remaining > 0 && numValue > 0 && (
        <AnimatedXStack
          entering={FadeIn}
          backgroundColor="$warningSoft"
          borderRadius={12}
          padding={12}
          alignItems="center"
          justifyContent="center"
          gap={8}
        >
          <Text fontSize={13} color="$warning" fontWeight="500">
            {currencySymbol}{remaining.toFixed(2)} still needs to be covered
          </Text>
        </AnimatedXStack>
      )}
    </AnimatedYStack>
  )
}

// ============================================
// ADD ITEM INPUT
// ============================================
const AddItemInput = ({
  onAdd,
  currency,
}: {
  onAdd: (name: string, amount: number) => void
  currency: string
}) => {
  const theme = useTheme()
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const amountRef = useRef<TextInput>(null)

  const canAdd = name.trim().length > 0 && parseFloat(amount) > 0

  const handleAdd = () => {
    if (!canAdd) return
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onAdd(name.trim(), parseFloat(amount))
    setName('')
    setAmount('')
  }

  const handleNameSubmit = () => {
    amountRef.current?.focus()
  }

  const currencySymbol = currency === 'USD' ? '$' : 'Z$'

  return (
    <AnimatedYStack
      entering={FadeInDown.delay(100).springify()}
      backgroundColor="$cardBg"
      borderRadius={20}
      borderWidth={1}
      borderColor={isFocused ? '$accent' : '$cardBorder'}
      padding={16}
      gap={12}
    >
      <XStack alignItems="center" gap={8}>
        <Plus size={16} color="$accent" strokeWidth={2} />
        <Text
          fontSize={13}
          fontWeight="600"
          letterSpacing={-0.2}
          color="$color"
        >
          Add Item
        </Text>
      </XStack>

      <XStack gap={12} alignItems="center">
        {/* Name Input */}
        <View flex={1}>
          <TextInput
            placeholder="Item name"
            placeholderTextColor={theme.colorFaint?.val}
            value={name}
            onChangeText={setName}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onSubmitEditing={handleNameSubmit}
            returnKeyType="next"
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: theme.color?.val,
              letterSpacing: -0.2,
              backgroundColor: theme.backgroundHover?.val,
              paddingHorizontal: 14,
              paddingVertical: 12,
              borderRadius: 12,
            }}
          />
        </View>

        {/* Amount Input */}
        <XStack
          backgroundColor="$backgroundHover"
          borderRadius={12}
          paddingHorizontal={14}
          paddingVertical={12}
          alignItems="center"
          gap={4}
          width={100}
        >
          <Text fontSize={14} fontWeight="500" color="$colorMuted">
            {currencySymbol}
          </Text>
          <TextInput
            ref={amountRef}
            placeholder="0.00"
            placeholderTextColor={theme.colorFaint?.val}
            value={amount}
            onChangeText={setAmount}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            keyboardType="decimal-pad"
            returnKeyType="done"
            onSubmitEditing={handleAdd}
            style={{
              flex: 1,
              fontSize: 16,
              fontWeight: '600',
              color: theme.color?.val,
              letterSpacing: -0.3,
              textAlign: 'right',
            }}
          />
        </XStack>

        {/* Add Button */}
        <Pressable onPress={handleAdd} disabled={!canAdd}>
          <View
            width={44}
            height={44}
            borderRadius={12}
            backgroundColor={canAdd ? '$accent' : '$backgroundHover'}
            alignItems="center"
            justifyContent="center"
          >
            <Check
              size={18}
              color={canAdd ? '$accentText' : '$colorMuted'}
              strokeWidth={2.5}
            />
          </View>
        </Pressable>
      </XStack>
    </AnimatedYStack>
  )
}

// ============================================
// BILL ITEM ROW
// ============================================
const BillItemRow = ({
  item,
  currency,
  isHost,
  isClaimed,
  onToggleClaim,
  onDelete,
  memberCount,
  delay = 0,
}: {
  item: BillItem
  currency: string
  isHost: boolean
  isClaimed: boolean
  onToggleClaim: () => void
  onDelete: () => void
  memberCount: number
  delay?: number
}) => {
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const currencySymbol = currency === 'USD' ? '$' : 'Z$'
  const claimCount = item.claimedBy.length
  const splitAmount = claimCount > 0 ? item.amount / claimCount : item.amount

  const handlePress = () => {
    scale.value = withSequence(withSpring(0.98), withSpring(1))
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onToggleClaim()
  }

  return (
    <Animated.View
      entering={FadeInDown.delay(delay).springify()}
      exiting={FadeOut.duration(200)}
      layout={Layout.springify()}
    >
      <Animated.View style={animatedStyle}>
        <Pressable onPress={handlePress}>
          <XStack
            backgroundColor="$cardBg"
            borderRadius={16}
            padding={14}
            alignItems="center"
            gap={12}
            borderWidth={1}
            borderColor={isClaimed ? '$accent' : '$cardBorder'}
            opacity={isClaimed ? 1 : 0.7}
          >
            {/* Checkbox */}
            <View
              width={24}
              height={24}
              borderRadius={8}
              borderWidth={1.5}
              borderColor={isClaimed ? '$accent' : '$borderColor'}
              backgroundColor={isClaimed ? '$accent' : 'transparent'}
              alignItems="center"
              justifyContent="center"
            >
              {isClaimed && <Check size={14} color="$accentText" strokeWidth={3} />}
            </View>

            {/* Item Info */}
            <YStack flex={1} gap={2}>
              <Text
                fontSize={15}
                fontWeight="600"
                letterSpacing={-0.2}
                color="$color"
              >
                {item.name}
              </Text>
              {claimCount > 0 && (
                <XStack alignItems="center" gap={4}>
                  <Users size={10} color="$colorMuted" strokeWidth={2} />
                  <Text fontSize={11} color="$colorMuted">
                    {claimCount} {claimCount === 1 ? 'person' : 'people'}
                    {claimCount > 1 && ` · ${currencySymbol}${splitAmount.toFixed(2)} each`}
                  </Text>
                </XStack>
              )}
            </YStack>

            {/* Amount */}
            <Text
              fontFamily="$mono"
              fontSize={16}
              fontWeight="600"
              letterSpacing={-0.3}
              color="$color"
            >
              {currencySymbol}{item.amount.toFixed(2)}
            </Text>

            {/* Delete (Host only) */}
            {isHost && (
              <Pressable
                onPress={(e) => {
                  e.stopPropagation()
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                  onDelete()
                }}
                hitSlop={8}
              >
                <View
                  width={32}
                  height={32}
                  borderRadius={8}
                  backgroundColor="$errorSoft"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Trash2 size={14} color="$error" strokeWidth={2} />
                </View>
              </Pressable>
            )}
          </XStack>
        </Pressable>
      </Animated.View>
    </Animated.View>
  )
}

// ============================================
// SUMMARY CARD
// ============================================
const SummaryCard = ({
  total,
  yourShare,
  currency,
  mode,
  memberCount,
  itemCount,
  claimedCount,
}: {
  total: number
  yourShare: number
  currency: string
  mode: SplitMode
  memberCount: number
  itemCount?: number
  claimedCount?: number
}) => {
  const currencySymbol = currency === 'USD' ? '$' : 'Z$'

  const getModeLabel = () => {
    switch (mode) {
      case 'equal':
        return `Split equally · ${memberCount} people`
      case 'custom':
        return 'Custom amount'
      default:
        return `${claimedCount} of ${itemCount} items`
    }
  }

  return (
    <AnimatedYStack
      entering={FadeInUp.delay(150).springify()}
      backgroundColor="$accent"
      borderRadius={24}
      padding={20}
      gap={16}
    >
      {/* Your Share */}
      <YStack gap={4}>
        <Text
          fontSize={12}
          fontWeight="500"
          letterSpacing={0.4}
          textTransform="uppercase"
          color="rgba(255,255,255,0.7)"
        >
          Your Share
        </Text>
        <Text
          fontFamily="$mono"
          fontSize={40}
          fontWeight="700"
          letterSpacing={-1.5}
          color="$accentText"
        >
          {currencySymbol}{yourShare.toFixed(2)}
        </Text>
      </YStack>

      {/* Divider */}
      <View height={1} backgroundColor="rgba(255,255,255,0.15)" />

      {/* Stats Row */}
      <XStack justifyContent="space-between">
        <YStack gap={2}>
          <Text fontSize={11} color="rgba(255,255,255,0.6)">
            Bill Total
          </Text>
          <Text
            fontFamily="$mono"
            fontSize={16}
            fontWeight="600"
            color="$accentText"
          >
            {currencySymbol}{total.toFixed(2)}
          </Text>
        </YStack>

        <YStack gap={2} alignItems="flex-end">
          <Text fontSize={11} color="rgba(255,255,255,0.6)">
            Split Method
          </Text>
          <Text fontSize={14} fontWeight="600" color="$accentText">
            {getModeLabel()}
          </Text>
        </YStack>
      </XStack>
    </AnimatedYStack>
  )
}

// ============================================
// EMPTY STATE
// ============================================
const EmptyState = ({ mode }: { mode: SplitMode }) => (
  <AnimatedYStack
    entering={FadeIn.delay(200)}
    flex={1}
    alignItems="center"
    justifyContent="center"
    gap={12}
    paddingVertical={60}
  >
    <View
      width={64}
      height={64}
      borderRadius={20}
      backgroundColor="$backgroundHover"
      alignItems="center"
      justifyContent="center"
    >
      <Plus size={28} color="$colorMuted" strokeWidth={1.5} />
    </View>
    <YStack alignItems="center" gap={4}>
      <Text fontSize={17} fontWeight="600" color="$color" letterSpacing={-0.3}>
        No items yet
      </Text>
      <Text fontSize={14} color="$colorMuted" textAlign="center" maxWidth={240}>
        {mode === 'items'
          ? 'Add items from the receipt to get started'
          : 'Add items to calculate the total bill'}
      </Text>
    </YStack>
  </AnimatedYStack>
)

// ============================================
// EQUAL SPLIT VIEW
// ============================================
const EqualSplitView = ({
  total,
  memberCount,
  onMemberCountChange,
  currency,
}: {
  total: number
  memberCount: number
  onMemberCountChange: (count: number) => void
  currency: string
}) => {
  const currencySymbol = currency === 'USD' ? '$' : 'Z$'
  const perPerson = memberCount > 0 ? total / memberCount : 0

  return (
    <AnimatedYStack entering={FadeIn.delay(100)} gap={16}>
      {/* Member Stepper */}
      <YStack gap={8}>
        <Text
          fontSize={12}
          fontWeight="500"
          letterSpacing={0.6}
          textTransform="uppercase"
          color="$colorMuted"
          paddingLeft={4}
        >
          Number of People
        </Text>
        <MemberStepper count={memberCount} onChange={onMemberCountChange} />
      </YStack>

      {/* Per Person Display */}
      {total > 0 && (
        <AnimatedYStack
          entering={FadeIn}
          backgroundColor="$cardBg"
          borderRadius={20}
          padding={24}
          alignItems="center"
          gap={8}
          borderWidth={1}
          borderColor="$cardBorder"
        >
          <Text
            fontSize={12}
            fontWeight="500"
            letterSpacing={0.6}
            textTransform="uppercase"
            color="$colorMuted"
          >
            Each Person Pays
          </Text>
          <Text
            fontFamily="$mono"
            fontSize={48}
            fontWeight="700"
            letterSpacing={-1.5}
            color="$color"
          >
            {currencySymbol}{perPerson.toFixed(2)}
          </Text>
          <Text fontSize={13} color="$colorFaint">
            {currencySymbol}{total.toFixed(2)} ÷ {memberCount} = {currencySymbol}{perPerson.toFixed(2)}
          </Text>
        </AnimatedYStack>
      )}
    </AnimatedYStack>
  )
}

// ============================================
// MAIN SCREEN
// ============================================
export default function BillSessionScreen() {
  const insets = useSafeAreaInsets()
  const params = useLocalSearchParams<{
    id: string
    name?: string
    currency?: string
    venue?: string
    isHost?: string
  }>()

  const billName = params.name || 'Bill'
  const currency = params.currency || 'USD'
  const venue = params.venue
  const isHost = params.isHost === 'true'
  const currentUserId = 'me' // TODO: Get from auth

  // State
  const [items, setItems] = useState<BillItem[]>([])
  const [splitMode, setSplitMode] = useState<SplitMode>('items')
  const [memberCount, setMemberCount] = useState(2)
  const [customAmount, setCustomAmount] = useState('')

  // Add item
  const handleAddItem = useCallback((name: string, amount: number) => {
    const newItem: BillItem = {
      id: `item-${Date.now()}`,
      name,
      amount,
      claimedBy: [],
    }
    setItems((prev) => [...prev, newItem])
    Keyboard.dismiss()
  }, [])

  // Toggle claim
  const handleToggleClaim = useCallback(
    (itemId: string) => {
      setItems((prev) =>
        prev.map((item) => {
          if (item.id !== itemId) return item
          const isClaimed = item.claimedBy.includes(currentUserId)
          return {
            ...item,
            claimedBy: isClaimed
              ? item.claimedBy.filter((id) => id !== currentUserId)
              : [...item.claimedBy, currentUserId],
          }
        })
      )
    },
    [currentUserId]
  )

  // Delete item
  const handleDeleteItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId))
  }, [])

  // Calculations
  const total = items.reduce((sum, item) => sum + item.amount, 0)

  const yourShare = (() => {
    switch (splitMode) {
      case 'equal':
        return memberCount > 0 ? total / memberCount : 0
      case 'custom':
        return parseFloat(customAmount) || 0
      default:
        return items.reduce((sum, item) => {
          if (!item.claimedBy.includes(currentUserId)) return sum
          return sum + item.amount / item.claimedBy.length
        }, 0)
    }
  })()

  const claimedCount = items.filter((item) =>
    item.claimedBy.includes(currentUserId)
  ).length

  // Navigation
  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    router.back()
  }

  const handleShare = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    router.push({
      pathname: '/session/share',
      params: { id: params.id, name: billName },
    })
  }

  const buttonScale = useSharedValue(1)
  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }))

  const handleProceed = () => {
    buttonScale.value = withSequence(withSpring(0.97), withSpring(1))
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    router.push('/session/finalize')
  }

  const currencySymbol = currency === 'USD' ? '$' : 'Z$'

  return (
    <YStack flex={1} backgroundColor="$background">
      {/* Header */}
      <AnimatedXStack
        entering={FadeInUp.delay(50).springify()}
        paddingTop={insets.top + 8}
        paddingHorizontal={16}
        paddingBottom={12}
        alignItems="center"
        justifyContent="space-between"
        backgroundColor="$background"
        borderBottomWidth={1}
        borderBottomColor="$borderColorSoft"
      >
        <XStack alignItems="center" gap={12}>
          <Pressable onPress={handleBack}>
            <View
              width={40}
              height={40}
              borderRadius={12}
              backgroundColor="$backgroundHover"
              alignItems="center"
              justifyContent="center"
            >
              <ArrowLeft size={18} color="$color" strokeWidth={2} />
            </View>
          </Pressable>

          <YStack gap={1}>
            <Text
              fontSize={18}
              fontWeight="600"
              letterSpacing={-0.3}
              color="$color"
            >
              {billName}
            </Text>
            {venue && (
              <Text fontSize={12} color="$colorMuted">
                {venue}
              </Text>
            )}
          </YStack>
        </XStack>

        <XStack gap={8}>
          {/* Share */}
          <Pressable onPress={handleShare}>
            <View
              width={40}
              height={40}
              borderRadius={12}
              backgroundColor="$accentSoft"
              alignItems="center"
              justifyContent="center"
            >
              <QrCode size={18} color="$accent" strokeWidth={2} />
            </View>
          </Pressable>
        </XStack>
      </AnimatedXStack>

      {/* Content */}
      <ScrollView
        flex={1}
        contentContainerStyle={{ padding: 16, paddingBottom: 280 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <YStack gap={16}>
          {/* Split Mode Selector */}
          <SplitModeSelector mode={splitMode} onChange={setSplitMode} />

          {/* Add Item Input (Host only, always shown for adding total) */}
          {isHost && <AddItemInput onAdd={handleAddItem} currency={currency} />}

          {/* Mode-specific content */}
          {splitMode === 'equal' && (
            <EqualSplitView
              total={total}
              memberCount={memberCount}
              onMemberCountChange={setMemberCount}
              currency={currency}
            />
          )}

          {splitMode === 'custom' && (
            <CustomAmountInput
              value={customAmount}
              onChange={setCustomAmount}
              currency={currency}
              total={total}
            />
          )}

          {/* Items List (shown for 'items' mode, or as reference for other modes) */}
          {items.length === 0 ? (
            <EmptyState mode={splitMode} />
          ) : (
            <YStack gap={8}>
              <XStack alignItems="center" justifyContent="space-between" paddingHorizontal={4}>
                <Text
                  fontSize={12}
                  fontWeight="500"
                  letterSpacing={0.6}
                  textTransform="uppercase"
                  color="$colorMuted"
                >
                  {splitMode === 'items' ? 'Items · Tap to claim' : 'Bill Items'}
                </Text>
                <Text
                  fontFamily="$mono"
                  fontSize={14}
                  fontWeight="600"
                  color="$color"
                >
                  {currencySymbol}{total.toFixed(2)}
                </Text>
              </XStack>

              {items.map((item, index) => (
                <BillItemRow
                  key={item.id}
                  item={item}
                  currency={currency}
                  isHost={isHost}
                  isClaimed={item.claimedBy.includes(currentUserId)}
                  onToggleClaim={() =>
                    splitMode === 'items' && handleToggleClaim(item.id)
                  }
                  onDelete={() => handleDeleteItem(item.id)}
                  memberCount={memberCount}
                  delay={index * 30}
                />
              ))}
            </YStack>
          )}
        </YStack>
      </ScrollView>

      {/* Bottom Action */}
      {(items.length > 0 || splitMode === 'custom') && (
        <YStack
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          paddingHorizontal={16}
          paddingBottom={insets.bottom + 16}
          paddingTop={16}
          backgroundColor="$background"
          borderTopWidth={1}
          borderTopColor="$borderColorSoft"
        >
          {/* Summary */}
          <SummaryCard
            total={total}
            yourShare={yourShare}
            currency={currency}
            mode={splitMode}
            memberCount={memberCount}
            itemCount={items.length}
            claimedCount={claimedCount}
          />

          {/* Proceed Button */}
          {yourShare > 0 && (
            <Animated.View style={[buttonAnimatedStyle, { marginTop: 12 }]}>
              <Pressable onPress={handleProceed}>
                <XStack
                  backgroundColor="$color"
                  borderRadius={9999}
                  paddingVertical={16}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text
                    fontSize={15}
                    fontWeight="600"
                    letterSpacing={-0.2}
                    color="$background"
                  >
                    Continue to Settlement
                  </Text>
                </XStack>
              </Pressable>
            </Animated.View>
          )}
        </YStack>
      )}
    </YStack>
  )
}
