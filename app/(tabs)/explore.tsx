import {
    ArrowDownLeft,
    ArrowUpRight,
    Coffee,
    Filter,
    Mountain,
    ShoppingBag,
    Utensils
} from '@tamagui/lucide-icons'
import * as Haptics from 'expo-haptics'
import { useState } from 'react'
import { Pressable } from 'react-native'
import Animated, {
    FadeInDown,
    FadeInUp,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScrollView, Text, View, XStack, YStack } from 'tamagui'

// ============================================
// ANIMATED COMPONENTS
// ============================================
const AnimatedYStack = Animated.createAnimatedComponent(YStack)
const AnimatedXStack = Animated.createAnimatedComponent(XStack)

// ============================================
// TYPES
// ============================================
type FilterType = 'all' | 'active' | 'pending' | 'completed'

// ============================================
// 間 — STATS CARD
// ============================================
const StatsCard = ({
  label,
  amount,
  trend,
  delay = 0,
}: {
  label: string
  amount: string
  trend: 'up' | 'down'
  delay?: number
}) => (
  <AnimatedYStack
    entering={FadeInDown.delay(delay).springify()}
    flex={1}
    backgroundColor="$cardBg"
    borderRadius={18}
    padding={18}
    gap={10}
    shadowColor="#000"
    shadowOffset={{ width: 0, height: 2 }}
    shadowOpacity={0.06}
    shadowRadius={12}
    elevation={3}
  >
    <XStack alignItems="center" gap={6}>
      {trend === 'up' ? (
        <ArrowUpRight size={12} color="$error" strokeWidth={2} />
      ) : (
        <ArrowDownLeft size={12} color="$success" strokeWidth={2} />
      )}
      <Text fontSize={11} fontWeight="500" color="$colorMuted" letterSpacing={0.3}>
        {label}
      </Text>
    </XStack>
    <Text fontFamily="$mono" fontSize={26} fontWeight="600" color="$color" letterSpacing={-1}>
      {amount}
    </Text>
  </AnimatedYStack>
)

// ============================================
// 間 — ACTIVITY CARD
// ============================================
const ActivityCard = ({
  title,
  subtitle,
  amount,
  date,
  status,
  icon: Icon,
  delay = 0,
}: {
  title: string
  subtitle: string
  amount: string
  date: string
  status: 'active' | 'pending' | 'completed'
  icon: typeof Utensils
  delay?: number
}) => {
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const statusConfig = {
    active: { text: 'Active', bg: '$accentGhost', color: '$accent' },
    pending: { text: 'Pending', bg: '$backgroundHover', color: '$colorMuted' },
    completed: { text: 'Done', bg: '$successSoft', color: '$success' },
  }

  const s = statusConfig[status]

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
        onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
        style={{ flex: 1 }}
      >
        <XStack
          backgroundColor="$cardBg"
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
          <View
            width={44}
            height={44}
            borderRadius={12}
            backgroundColor="$backgroundHover"
            alignItems="center"
            justifyContent="center"
          >
            <Icon size={20} color="$colorMuted" strokeWidth={1.6} />
          </View>

          <YStack flex={1} gap={4}>
            <XStack alignItems="center" gap={8}>
              <Text
                fontSize={15}
                fontWeight="600"
                letterSpacing={-0.2}
                color="$color"
                numberOfLines={1}
                flex={1}
              >
                {title}
              </Text>
              <View
                backgroundColor={s.bg}
                paddingHorizontal={6}
                paddingVertical={2}
                borderRadius={4}
              >
                <Text fontSize={9} fontWeight="600" color={s.color} letterSpacing={0.4}>
                  {s.text}
                </Text>
              </View>
            </XStack>
            <Text fontSize={12} color="$colorMuted" numberOfLines={1}>
              {subtitle}
            </Text>
          </YStack>

          <YStack alignItems="flex-end" gap={2}>
            <Text fontFamily="$mono" fontSize={16} fontWeight="600" color="$color" letterSpacing={-0.3}>
              {amount}
            </Text>
            <Text fontSize={10} color="$colorFaint">
              {date}
            </Text>
          </YStack>
        </XStack>
      </Pressable>
    </AnimatedXStack>
  )
}

// ============================================
// 間 — FILTER CHIP
// ============================================
const FilterChip = ({
  label,
  isActive,
  onPress,
}: {
  label: string
  isActive: boolean
  onPress: () => void
}) => (
  <Pressable
    onPress={() => {
      Haptics.selectionAsync()
      onPress()
    }}
  >
    <View
      paddingHorizontal={14}
      paddingVertical={8}
      borderRadius={9999}
      backgroundColor={isActive ? '$accent' : '$backgroundHover'}
    >
      <Text
        fontSize={13}
        fontWeight={isActive ? '600' : '500'}
        color={isActive ? '$accentText' : '$colorMuted'}
      >
        {label}
      </Text>
    </View>
  </Pressable>
)

// ============================================
// 間 — MAIN SCREEN
// ============================================
export default function ActivityScreen() {
  const insets = useSafeAreaInsets()
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')

  return (
    <ScrollView
      backgroundColor="$background"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 140 }}
    >
      <YStack paddingTop={insets.top + 12} paddingHorizontal={20} gap={24}>
        {/* Header */}
        <AnimatedXStack
          entering={FadeInUp.delay(50).springify()}
          justifyContent="space-between"
          alignItems="center"
        >
          <YStack gap={2}>
            <Text fontSize={13} color="$colorMuted" fontWeight="500">
              Overview
            </Text>
            <Text fontSize={26} fontWeight="600" letterSpacing={-0.8} color="$color">
              Activity
            </Text>
          </YStack>

          <Pressable onPress={() => Haptics.selectionAsync()}>
            <View
              width={40}
              height={40}
              borderRadius={9999}
              backgroundColor="$backgroundHover"
              alignItems="center"
              justifyContent="center"
            >
              <Filter size={18} color="$colorMuted" strokeWidth={1.8} />
            </View>
          </Pressable>
        </AnimatedXStack>

        {/* Stats Row */}
        <XStack gap={12}>
          <StatsCard label="You Owe" amount="$68.75" trend="up" delay={100} />
          <StatsCard label="Owed to You" amount="$95.00" trend="down" delay={150} />
        </XStack>

        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        >
          {([
            { key: 'all', label: 'All' },
            { key: 'active', label: 'Active' },
            { key: 'pending', label: 'Pending' },
            { key: 'completed', label: 'Completed' },
          ] as const).map(({ key, label }) => (
            <FilterChip
              key={key}
              label={label}
              isActive={activeFilter === key}
              onPress={() => setActiveFilter(key)}
            />
          ))}
        </ScrollView>

        {/* Activity List */}
        <YStack gap={10}>
          {/* Section: Active */}
          <Text
            fontSize={11}
            fontWeight="500"
            letterSpacing={0.8}
            textTransform="uppercase"
            color="$colorFaint"
            marginBottom={4}
          >
            Active Now
          </Text>
          <ActivityCard
            title="Lunch Split"
            subtitle="Nando's · 3 people"
            amount="$47.50"
            date="Today"
            status="active"
            icon={Utensils}
            delay={200}
          />

          {/* Section: Pending */}
          <Text
            fontSize={11}
            fontWeight="500"
            letterSpacing={0.8}
            textTransform="uppercase"
            color="$colorFaint"
            marginTop={12}
            marginBottom={4}
          >
            Pending
          </Text>
          <ActivityCard
            title="Coffee Run"
            subtitle="Vida e Caffè · 2 people"
            amount="$7.50"
            date="Yesterday"
            status="pending"
            icon={Coffee}
            delay={250}
          />
          <ActivityCard
            title="Groceries"
            subtitle="Pick n Pay · 2 people"
            amount="$31.15"
            date="Oct 12"
            status="pending"
            icon={ShoppingBag}
            delay={300}
          />

          {/* Section: Completed */}
          <Text
            fontSize={11}
            fontWeight="500"
            letterSpacing={0.8}
            textTransform="uppercase"
            color="$colorFaint"
            marginTop={12}
            marginBottom={4}
          >
            Completed
          </Text>
          <ActivityCard
            title="Weekend Trip"
            subtitle="Nyanga · 5 people"
            amount="$125.00"
            date="Oct 8"
            status="completed"
            icon={Mountain}
            delay={350}
          />
        </YStack>
      </YStack>
    </ScrollView>
  )
}
