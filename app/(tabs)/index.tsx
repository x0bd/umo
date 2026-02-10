import { useEffect } from 'react'
import { Pressable, Image } from 'react-native'
import { ScrollView, YStack, XStack, Text, View } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import * as Haptics from 'expo-haptics'
import Animated, {
  FadeInDown,
  FadeInRight,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated'
import {
  ArrowUpRight,
  ArrowDownLeft,
  Bell,
  RefreshCw,
  ChevronRight,
  Zap,
  TrendingUp,
  Clock,
  Utensils,
  Mountain,
  Coffee,
  Car,
  ShoppingBag,
  Plane,
  Home as HomeIcon,
  PartyPopper,
} from '@tamagui/lucide-icons'
import { useThemeMode } from '@/providers/theme-mode'
import { useExchangeRate } from '@/hooks/use-exchange-rate'

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
// BALANCE CARD — With accent glow
// ============================================
const BalanceCard = () => {
  const { isDark } = useThemeMode()
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
      <AnimatedYStack style={animatedStyle} position="relative">
        {/* Accent glow behind card */}
        <View
          position="absolute"
          top={-20}
          right={-20}
          width={150}
          height={150}
          borderRadius={75}
          backgroundColor="$accentGhost"
          opacity={0.6}
        />
        
        <YStack
          backgroundColor="$cardBg"
          borderRadius={24}
          padding={24}
          borderWidth={1}
          borderColor="$cardBorder"
          gap={20}
          overflow="hidden"
        >
          {/* Balance Header */}
          <XStack justifyContent="space-between" alignItems="flex-start">
            <YStack gap={6}>
              <XStack alignItems="center" gap={6}>
                <View
                  width={6}
                  height={6}
                  borderRadius={3}
                  backgroundColor="$accent"
                />
                <Text
                  fontSize={12}
                  fontWeight="500"
                  letterSpacing={0.6}
                  textTransform="uppercase"
                  color="$colorMuted"
                >
                  Your Balance
                </Text>
              </XStack>
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
              borderWidth={1}
              borderColor="$featureBorder"
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
              borderRadius={16}
              padding={14}
              borderWidth={1}
              borderColor="$borderColorSoft"
              gap={6}
            >
              <XStack alignItems="center" gap={6}>
                <View
                  width={20}
                  height={20}
                  borderRadius={6}
                  backgroundColor="$errorSoft"
                  alignItems="center"
                  justifyContent="center"
                >
                  <ArrowUpRight size={11} color="$error" strokeWidth={2.5} />
                </View>
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
              borderRadius={16}
              padding={14}
              borderWidth={1}
              borderColor="$borderColorSoft"
              gap={6}
            >
              <XStack alignItems="center" gap={6}>
                <View
                  width={20}
                  height={20}
                  borderRadius={6}
                  backgroundColor="$successSoft"
                  alignItems="center"
                  justifyContent="center"
                >
                  <ArrowDownLeft size={11} color="$success" strokeWidth={2.5} />
                </View>
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
// EXCHANGE RATE CARD — With accent highlight
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
      borderWidth={1}
      borderColor="$cardBorder"
    >
      <XStack alignItems="center" gap={12}>
        <View
          width={40}
          height={40}
          borderRadius={12}
          backgroundColor="$accentSoft"
          alignItems="center"
          justifyContent="center"
        >
          <TrendingUp size={18} color="$accent" strokeWidth={1.8} />
        </View>
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
            borderRadius={10}
            backgroundColor="$backgroundHover"
            borderWidth={1}
            borderColor="$borderColorSoft"
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
// SECTION HEADER — With accent dot
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
    <XStack alignItems="center" gap={8}>
      <View
        width={4}
        height={4}
        borderRadius={2}
        backgroundColor="$accent"
      />
      <Text
        fontSize={13}
        fontWeight="600"
        letterSpacing={0.5}
        textTransform="uppercase"
        color="$colorFaint"
      >
        {title}
      </Text>
    </XStack>
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
// ACTIVE SPLIT CARD — With icon support
// ============================================
const ActiveSplitCard = ({
  title,
  venue,
  amount,
  members,
  isLive = false,
  iconType = 'food',
  imageUrl,
  delay = 0,
}: {
  title: string
  venue: string
  amount: string
  members: number
  isLive?: boolean
  iconType?: keyof typeof SPLIT_ICONS
  imageUrl?: string
  delay?: number
}) => {
  const scale = useSharedValue(1)
  const Icon = SPLIT_ICONS[iconType]

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15 })
  }

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 })
  }

  return (
    <AnimatedXStack
      entering={FadeInDown.delay(delay).springify()}
      style={animatedStyle}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          router.push(`/session/${title.replace(/\s+/g, '-').toLowerCase()}`)
        }}
        style={{ flex: 1 }}
      >
        <XStack
          backgroundColor={isLive ? '$featureBg' : '$cardBg'}
          borderRadius={20}
          padding={16}
          alignItems="center"
          gap={14}
          borderWidth={1}
          borderColor={isLive ? '$featureBorder' : '$cardBorder'}
          overflow="hidden"
        >
          {/* Glow effect for live */}
          {isLive && (
            <View
              position="absolute"
              top={-50}
              right={-50}
              width={120}
              height={120}
              borderRadius={60}
              backgroundColor="$featureGlow"
            />
          )}

          {/* Icon/Image */}
          <View
            width={48}
            height={48}
            borderRadius={14}
            backgroundColor={isLive ? '$accentSoft' : '$backgroundHover'}
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
          >
            {imageUrl ? (
              <Image
                source={{ uri: imageUrl }}
                style={{ width: 48, height: 48 }}
                resizeMode="cover"
              />
            ) : (
              <Icon
                size={22}
                color={isLive ? '$accent' : '$colorMuted'}
                strokeWidth={1.8}
              />
            )}
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
                  backgroundColor="$accent"
                  paddingHorizontal={6}
                  paddingVertical={2}
                  borderRadius={4}
                >
                  <XStack alignItems="center" gap={3}>
                    <Zap size={8} color="$accentText" strokeWidth={3} />
                    <Text fontSize={9} fontWeight="700" color="$accentText" letterSpacing={0.4}>
                      LIVE
                    </Text>
                  </XStack>
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
// FRIEND AVATAR — With accent border for balance
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
            width={56}
            height={56}
            borderRadius={18}
            borderWidth={2}
            borderColor={isOwed ? '$success' : '$accent'}
            overflow="hidden"
            backgroundColor="$cardBg"
          >
            <Image
              source={{ uri: imageUrl }}
              style={{ width: 52, height: 52 }}
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
// MAIN SCREEN
// ============================================
export default function HomeScreen() {
  const insets = useSafeAreaInsets()
  const { isDark } = useThemeMode()

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
            <XStack alignItems="center" gap={6}>
              <Text
                fontSize={26}
                fontWeight="600"
                letterSpacing={-0.8}
                color="$color"
              >
                Tino
              </Text>
              <Text fontSize={20}>👋</Text>
            </XStack>
          </YStack>

          {/* Profile + Notifications */}
          <XStack alignItems="center" gap={10}>
            <Pressable onPress={() => Haptics.selectionAsync()}>
              <View
                width={40}
                height={40}
                borderRadius={12}
                backgroundColor="$cardBg"
                alignItems="center"
                justifyContent="center"
                borderWidth={1}
                borderColor="$cardBorder"
                position="relative"
              >
                <Bell size={18} color="$colorMuted" strokeWidth={1.8} />
                {/* Notification dot with accent */}
                <View
                  position="absolute"
                  top={8}
                  right={8}
                  width={8}
                  height={8}
                  borderRadius={4}
                  backgroundColor="$accent"
                  borderWidth={2}
                  borderColor="$background"
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
                borderWidth={2}
                borderColor="$accentSoft"
              >
                <Image
                  source={{ uri: AVATARS.user }}
                  style={{ width: 40, height: 40 }}
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
