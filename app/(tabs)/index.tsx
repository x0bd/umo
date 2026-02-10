import { useExchangeRate } from '@/hooks/use-exchange-rate'
import {
    ArrowDownLeft,
    ArrowUpRight,
    Bell,
    Car,
    ChevronRight,
    Clock,
    Coffee,
    Home as HomeIcon,
    Mountain,
    PartyPopper,
    Plane,
    RefreshCw,
    ShoppingBag,
    TrendingUp,
    Utensils,
} from '@tamagui/lucide-icons'
import * as Haptics from 'expo-haptics'
import { router } from 'expo-router'
import { useEffect } from 'react'
import { Image, Pressable } from 'react-native'
import Animated, {
    Easing,
    FadeInDown,
    FadeInRight,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScrollView, Text, View, XStack, YStack } from 'tamagui'

// Unsplash avatar URLs
const AVATARS = {
  user: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces',
  tendai: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=faces',
  rudo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
  shami: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces',
  nyasha: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
  danai: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces',
}

// Split icons mapping
const SPLIT_ICONS = {
  food: Utensils,
  trip: Mountain,
  coffee: Coffee,
  ride: Car,
  groceries: ShoppingBag,
  travel: Plane,
  rent: HomeIcon,
  party: PartyPopper,
}

// ============================================
// ANIMATED COMPONENTS
// ============================================
const AnimatedView = Animated.createAnimatedComponent(View)
const AnimatedXStack = Animated.createAnimatedComponent(XStack)
const AnimatedYStack = Animated.createAnimatedComponent(YStack)

// ============================================
// 間 — BALANCE CARD
// ============================================
const BalanceCard = () => {
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const handlePress = () => {
    scale.value = withSequence(withSpring(0.98), withSpring(1))
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  }

  return (
    <Pressable onPress={handlePress}>
      <AnimatedYStack style={animatedStyle}>
        <YStack
          backgroundColor="$cardBg"
          borderRadius={20}
          padding={24}
          gap={20}
          shadowColor="#000"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.06}
          shadowRadius={12}
          elevation={3}
        >
          {/* Balance Header */}
          <XStack justifyContent="space-between" alignItems="flex-start">
            <YStack gap={6}>
              <Text
                fontSize={12}
                fontWeight="500"
                letterSpacing={0.8}
                textTransform="uppercase"
                color="$colorMuted"
              >
                Your Balance
              </Text>
              <Text
                fontFamily="$mono"
                fontSize={42}
                fontWeight="600"
                letterSpacing={-2}
                color="$color"
              >
                $142.50
              </Text>
            </YStack>

            <View
              backgroundColor="$accentSoft"
              paddingHorizontal={10}
              paddingVertical={6}
              borderRadius={8}
            >
              <Text fontSize={11} fontWeight="600" color="$accent" letterSpacing={0.5}>
                USD
              </Text>
            </View>
          </XStack>

          {/* Stats Row */}
          <XStack gap={12}>
            <YStack
              flex={1}
              backgroundColor="$backgroundSoft"
              borderRadius={14}
              padding={14}
              gap={6}
            >
              <XStack alignItems="center" gap={6}>
                <ArrowUpRight size={12} color="$error" strokeWidth={2} />
                <Text fontSize={11} fontWeight="500" color="$colorMuted" letterSpacing={0.3}>
                  You Owe
                </Text>
              </XStack>
              <Text fontFamily="$mono" fontSize={20} fontWeight="600" color="$color" letterSpacing={-0.5}>
                $68.75
              </Text>
            </YStack>

            <YStack
              flex={1}
              backgroundColor="$backgroundSoft"
              borderRadius={14}
              padding={14}
              gap={6}
            >
              <XStack alignItems="center" gap={6}>
                <ArrowDownLeft size={12} color="$success" strokeWidth={2} />
                <Text fontSize={11} fontWeight="500" color="$colorMuted" letterSpacing={0.3}>
                  Owed to You
                </Text>
              </XStack>
              <Text fontFamily="$mono" fontSize={20} fontWeight="600" color="$color" letterSpacing={-0.5}>
                $95.00
              </Text>
            </YStack>
          </XStack>
        </YStack>
      </AnimatedYStack>
    </Pressable>
  )
}

// ============================================
// 間 — EXCHANGE RATE CARD
// ============================================
const ExchangeRateCard = () => {
  const { rate, isLoading, lastUpdated, refresh, error } = useExchangeRate()
  const rotation = useSharedValue(0)

  const handleRefresh = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    rotation.value = withTiming(rotation.value + 360, {
      duration: 600,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    })
    await refresh()
  }

  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }))

  const pulse = useSharedValue(1)
  useEffect(() => {
    if (isLoading) {
      pulse.value = withRepeat(
        withSequence(
          withTiming(0.7, { duration: 400 }),
          withTiming(1, { duration: 400 })
        ),
        -1
      )
    } else {
      pulse.value = withSpring(1)
    }
  }, [isLoading])

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: pulse.value,
  }))

  const timeAgo = () => {
    const diff = Date.now() - lastUpdated.getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'Just now'
    if (mins === 1) return '1 min ago'
    return `${mins} mins ago`
  }

  return (
    <XStack
      backgroundColor="$cardBg"
      borderRadius={16}
      padding={16}
      alignItems="center"
      justifyContent="space-between"
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.06}
      shadowRadius={12}
      elevation={3}
    >
      <XStack alignItems="center" gap={12}>
        <TrendingUp size={18} color="$accent" strokeWidth={1.8} />
        <YStack gap={2}>
          <XStack alignItems="center" gap={6}>
            <Text fontSize={11} fontWeight="500" color="$colorMuted" letterSpacing={0.3}>
              1 USD =
            </Text>
            <Animated.View style={pulseStyle}>
              <Text fontFamily="$mono" fontSize={18} fontWeight="700" color="$color" letterSpacing={-0.5}>
                {rate.toFixed(2)}
              </Text>
            </Animated.View>
            <Text fontSize={12} fontWeight="600" color="$accent">
              ZiG
            </Text>
          </XStack>
          <XStack alignItems="center" gap={4}>
            <Clock size={10} color="$colorFaint" strokeWidth={2} />
            <Text fontSize={10} color="$colorFaint">
              {error || timeAgo()}
            </Text>
          </XStack>
        </YStack>
      </XStack>

      <Pressable onPress={handleRefresh}>
        <Animated.View style={spinStyle}>
          <View
            width={36}
            height={36}
            borderRadius={9999}
            backgroundColor="$backgroundHover"
            alignItems="center"
            justifyContent="center"
          >
            <RefreshCw size={15} color="$colorMuted" strokeWidth={2} />
          </View>
        </Animated.View>
      </Pressable>
    </XStack>
  )
}

// ============================================
// 間 — SECTION HEADER
// ============================================
const SectionHeader = ({
  title,
  action,
  onAction,
}: {
  title: string
  action?: string
  onAction?: () => void
}) => (
  <XStack justifyContent="space-between" alignItems="center" marginBottom={12}>
    <Text
      fontSize={11}
      fontWeight="500"
      letterSpacing={0.8}
      textTransform="uppercase"
      color="$colorFaint"
    >
      {title}
    </Text>
    {action && (
      <Pressable onPress={onAction}>
        <XStack alignItems="center" gap={4}>
          <Text fontSize={13} fontWeight="500" color="$accent">
            {action}
          </Text>
          <ChevronRight size={14} color="$accent" strokeWidth={2} />
        </XStack>
      </Pressable>
    )}
  </XStack>
)

// ============================================
// 間 — ACTIVE SPLIT CARD
// ============================================
const ActiveSplitCard = ({
  title,
  venue,
  amount,
  members,
  isLive = false,
  iconType = 'food',
  delay = 0,
}: {
  title: string
  venue: string
  amount: string
  members: number
  isLive?: boolean
  iconType?: keyof typeof SPLIT_ICONS
  delay?: number
}) => {
  const scale = useSharedValue(1)
  const Icon = SPLIT_ICONS[iconType]

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
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          router.push(`/session/${title.replace(/\s+/g, '-').toLowerCase()}`)
        }}
        style={{ flex: 1 }}
      >
        <XStack
          backgroundColor={isLive ? '$featureBg' : '$cardBg'}
          borderRadius={18}
          padding={16}
          alignItems="center"
          gap={14}
          shadowColor="#000"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.06}
          shadowRadius={12}
          elevation={3}
        >
          {/* Icon */}
          <View
            width={44}
            height={44}
            borderRadius={12}
            backgroundColor="$backgroundHover"
            alignItems="center"
            justifyContent="center"
          >
            <Icon
              size={20}
              color={isLive ? '$accent' : '$colorMuted'}
              strokeWidth={1.6}
            />
          </View>

          {/* Content */}
          <YStack flex={1} gap={4}>
            <XStack alignItems="center" gap={8}>
              <Text
                fontSize={16}
                fontWeight="600"
                letterSpacing={-0.3}
                color="$color"
                numberOfLines={1}
              >
                {title}
              </Text>
              {isLive && (
                <View
                  backgroundColor="$accentGhost"
                  paddingHorizontal={6}
                  paddingVertical={2}
                  borderRadius={4}
                >
                  <Text fontSize={9} fontWeight="600" color="$accent" letterSpacing={0.4}>
                    LIVE
                  </Text>
                </View>
              )}
            </XStack>
            <Text fontSize={13} color="$colorMuted">
              {venue} · {members} {members === 1 ? 'person' : 'people'}
            </Text>
          </YStack>

          {/* Amount */}
          <YStack alignItems="flex-end" gap={2}>
            <Text fontFamily="$mono" fontSize={17} fontWeight="600" color="$color" letterSpacing={-0.3}>
              {amount}
            </Text>
            <Text fontSize={11} color="$colorFaint">
              Your share
            </Text>
          </YStack>
        </XStack>
      </Pressable>
    </AnimatedXStack>
  )
}

// ============================================
// 間 — FRIEND AVATAR
// ============================================
const FriendAvatar = ({
  name,
  amount,
  imageUrl,
  isOwed = false,
  delay = 0,
}: {
  name: string
  amount: string
  imageUrl: string
  isOwed?: boolean
  delay?: number
}) => {
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <Animated.View
      entering={FadeInRight.delay(delay).springify()}
      style={animatedStyle}
    >
      <Pressable
        onPressIn={() => {
          scale.value = withSpring(0.95)
        }}
        onPressOut={() => {
          scale.value = withSpring(1)
        }}
        onPress={() => Haptics.selectionAsync()}
      >
        <YStack alignItems="center" gap={8} width={72}>
          <View
            width={52}
            height={52}
            borderRadius={16}
            borderWidth={1.5}
            borderColor="$borderColor"
            overflow="hidden"
            backgroundColor="$cardBg"
          >
            <Image
              source={{ uri: imageUrl }}
              style={{ width: 49, height: 49 }}
              resizeMode="cover"
            />
          </View>
          <YStack alignItems="center" gap={2}>
            <Text fontSize={12} fontWeight="500" color="$color" numberOfLines={1}>
              {name}
            </Text>
            <Text
              fontSize={11}
              fontWeight="600"
              color={isOwed ? '$success' : '$accent'}
            >
              {isOwed ? '+' : '-'}{amount}
            </Text>
          </YStack>
        </YStack>
      </Pressable>
    </Animated.View>
  )
}

// ============================================
// 間 — MAIN SCREEN
// ============================================
export default function HomeScreen() {
  const insets = useSafeAreaInsets()

  return (
    <ScrollView
      backgroundColor="$background"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 140 }}
    >
      <YStack
        paddingTop={insets.top + 12}
        paddingHorizontal={20}
        gap={24}
      >
        {/* ======== HEADER ======== */}
        <AnimatedXStack
          entering={FadeInDown.delay(50).springify()}
          justifyContent="space-between"
          alignItems="center"
        >
          <YStack gap={2}>
            <Text fontSize={13} color="$colorMuted" fontWeight="500">
              Good evening
            </Text>
            <Text
              fontSize={26}
              fontWeight="600"
              letterSpacing={-0.8}
              color="$color"
            >
              Tino
            </Text>
          </YStack>

          {/* Profile + Notifications */}
          <XStack alignItems="center" gap={10}>
            <Pressable onPress={() => Haptics.selectionAsync()}>
              <View
                width={40}
                height={40}
                borderRadius={9999}
                backgroundColor="$backgroundHover"
                alignItems="center"
                justifyContent="center"
                position="relative"
              >
                <Bell size={18} color="$colorMuted" strokeWidth={1.8} />
                {/* Notification dot */}
                <View
                  position="absolute"
                  top={9}
                  right={9}
                  width={6}
                  height={6}
                  borderRadius={3}
                  backgroundColor="$accent"
                />
              </View>
            </Pressable>

            <Pressable
              onPress={() => {
                Haptics.selectionAsync()
                router.push('/settings')
              }}
            >
              <View
                width={44}
                height={44}
                borderRadius={14}
                overflow="hidden"
                borderWidth={1.5}
                borderColor="$borderColor"
              >
                <Image
                  source={{ uri: AVATARS.user }}
                  style={{ width: 41, height: 41 }}
                  resizeMode="cover"
                />
              </View>
            </Pressable>
          </XStack>
        </AnimatedXStack>

        {/* ======== BALANCE CARD ======== */}
        <AnimatedView entering={FadeInDown.delay(100).springify()}>
          <BalanceCard />
        </AnimatedView>

        {/* ======== EXCHANGE RATE ======== */}
        <AnimatedView entering={FadeInDown.delay(150).springify()}>
          <ExchangeRateCard />
        </AnimatedView>

        {/* ======== ACTIVE SPLITS ======== */}
        <YStack>
          <SectionHeader
            title="Active Splits"
            action="See All"
            onAction={() => router.push('/explore')}
          />
          <YStack gap={10}>
            <ActiveSplitCard
              title="Lunch Split"
              venue="Nando's"
              amount="$47.50"
              members={3}
              isLive
              iconType="food"
              delay={200}
            />
            <ActiveSplitCard
              title="Weekend Trip"
              venue="Nyanga"
              amount="$125.00"
              members={5}
              iconType="trip"
              delay={250}
            />
            <ActiveSplitCard
              title="Groceries"
              venue="Pick n Pay"
              amount="$31.15"
              members={2}
              iconType="groceries"
              delay={300}
            />
          </YStack>
        </YStack>

        {/* ======== FRIENDS ======== */}
        <YStack>
          <SectionHeader title="Friends" action="Manage" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, paddingRight: 20 }}
          >
            <FriendAvatar
              name="Tendai"
              amount="$47.50"
              imageUrl={AVATARS.tendai}
              delay={350}
            />
            <FriendAvatar
              name="Rudo"
              amount="$32.00"
              imageUrl={AVATARS.rudo}
              isOwed
              delay={400}
            />
            <FriendAvatar
              name="Shami"
              amount="$15.25"
              imageUrl={AVATARS.shami}
              delay={450}
            />
            <FriendAvatar
              name="Nyasha"
              amount="$28.00"
              imageUrl={AVATARS.nyasha}
              isOwed
              delay={500}
            />
            <FriendAvatar
              name="Danai"
              amount="$12.50"
              imageUrl={AVATARS.danai}
              delay={550}
            />
          </ScrollView>
        </YStack>
      </YStack>
    </ScrollView>
  )
}
