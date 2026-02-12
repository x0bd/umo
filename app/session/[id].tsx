import {
  ArrowLeft,
  Check,
  Minus,
  Plus,
  QrCode,
  Share2,
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

// ============================================
// ANIMATED COMPONENTS
// ============================================
const AnimatedYStack = Animated.createAnimatedComponent(YStack)
const AnimatedXStack = Animated.createAnimatedComponent(XStack)
const AnimatedView = Animated.createAnimatedComponent(View)

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
  itemCount,
  claimedCount,
}: {
  total: number
  yourShare: number
  currency: string
  itemCount: number
  claimedCount: number
}) => {
  const currencySymbol = currency === 'USD' ? '$' : 'Z$'

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
            Items Claimed
          </Text>
          <Text fontSize={16} fontWeight="600" color="$accentText">
            {claimedCount} of {itemCount}
          </Text>
        </YStack>
      </XStack>
    </AnimatedYStack>
  )
}

// ============================================
// EMPTY STATE
// ============================================
const EmptyState = () => (
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
        Add items from the receipt to get started
      </Text>
    </YStack>
  </AnimatedYStack>
)

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
  const [members] = useState<Member[]>([
    { id: 'me', name: 'You', avatar: 'Y', isHost: true },
  ])

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
  const yourShare = items.reduce((sum, item) => {
    if (!item.claimedBy.includes(currentUserId)) return sum
    return sum + item.amount / item.claimedBy.length
  }, 0)
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
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <YStack gap={16}>
          {/* Add Item Input (Host only) */}
          {isHost && <AddItemInput onAdd={handleAddItem} currency={currency} />}

          {/* Items List */}
          {items.length === 0 ? (
            <EmptyState />
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
                  Items
                </Text>
                <Text
                  fontSize={12}
                  fontWeight="500"
                  color="$colorFaint"
                >
                  Tap to claim
                </Text>
              </XStack>

              {items.map((item, index) => (
                <BillItemRow
                  key={item.id}
                  item={item}
                  currency={currency}
                  isHost={isHost}
                  isClaimed={item.claimedBy.includes(currentUserId)}
                  onToggleClaim={() => handleToggleClaim(item.id)}
                  onDelete={() => handleDeleteItem(item.id)}
                  memberCount={members.length}
                  delay={index * 30}
                />
              ))}
            </YStack>
          )}

          {/* Running Total */}
          {items.length > 0 && (
            <AnimatedXStack
              entering={FadeIn.delay(100)}
              justifyContent="space-between"
              alignItems="center"
              paddingHorizontal={4}
              paddingTop={8}
            >
              <Text fontSize={14} fontWeight="500" color="$colorMuted">
                Running Total
              </Text>
              <Text
                fontFamily="$mono"
                fontSize={20}
                fontWeight="700"
                letterSpacing={-0.5}
                color="$color"
              >
                {currencySymbol}{total.toFixed(2)}
              </Text>
            </AnimatedXStack>
          )}
        </YStack>
      </ScrollView>

      {/* Bottom Action */}
      {items.length > 0 && (
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
