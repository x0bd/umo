import { Pressable, Image } from 'react-native'
import { ScrollView, YStack, XStack, Text, View } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import * as Haptics from 'expo-haptics'
import Animated, {
  FadeInDown,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'
import {
  Clock,
  Check,
  ChevronRight,
  Zap,
  Car,
  ShoppingBag,
  Utensils,
  MapPin,
  Calendar,
} from '@tamagui/lucide-icons'
import { useThemeMode } from '@/providers/theme-mode'

// ============================================
// TYPES & DATA
// ============================================
type ActivityStatus = 'active' | 'pending' | 'settled'

interface Activity {
  id: number
  title: string
  venue: string
  amount: string
  yourShare: string
  members: number
  date: string
  status: ActivityStatus
  icon: typeof Utensils
  imageUrl?: string
}

const activities: Activity[] = [
  {
    id: 1,
    title: 'Lunch Split',
    venue: "Nando's — Table 6",
    amount: '$142.50',
    yourShare: '$47.50',
    members: 3,
    date: 'Today, 1:30 PM',
    status: 'active',
    icon: Utensils,
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=100&h=100&fit=crop',
  },
  {
    id: 2,
    title: 'Uber Ride',
    venue: 'Airport → CBD',
    amount: '$24.00',
    yourShare: '$8.00',
    members: 3,
    date: 'Yesterday',
    status: 'settled',
    icon: Car,
  },
  {
    id: 3,
    title: 'BBQ Night',
    venue: "Braai @ Rudo's",
    amount: '$85.00',
    yourShare: '$21.25',
    members: 4,
    date: 'Feb 5',
    status: 'pending',
    icon: MapPin,
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=100&h=100&fit=crop',
  },
  {
    id: 4,
    title: 'Groceries',
    venue: 'Pick n Pay',
    amount: '$62.30',
    yourShare: '$31.15',
    members: 2,
    date: 'Feb 3',
    status: 'settled',
    icon: ShoppingBag,
  },
]

// ============================================
// ANIMATED COMPONENTS
// ============================================
const AnimatedXStack = Animated.createAnimatedComponent(XStack)

// ============================================
// STATS CARD
// ============================================
const StatsCard = ({
  label,
  amount,
  type,
  delay = 0,
}: {
  label: string
  amount: string
  type: 'owe' | 'owed'
  delay?: number
}) => {
  const isOwe = type === 'owe'

  return (
    <Animated.View
      entering={FadeInUp.delay(delay).springify()}
      style={{ flex: 1 }}
    >
      <YStack
        flex={1}
        backgroundColor="$cardBg"
        borderRadius={16}
        padding={16}
        borderWidth={1}
        borderColor="$cardBorder"
        gap={8}
      >
        <XStack alignItems="center" gap={6}>
          <View
            width={18}
            height={18}
            borderRadius={5}
            backgroundColor={isOwe ? '$errorSoft' : '$successSoft'}
            alignItems="center"
            justifyContent="center"
          >
            {isOwe ? (
              <Text fontSize={10} color="$error">↗</Text>
            ) : (
              <Text fontSize={10} color="$success">↙</Text>
            )}
          </View>
          <Text fontSize={11} fontWeight="500" color="$colorMuted" letterSpacing={0.3}>
            {label}
          </Text>
        </XStack>
        <Text
          fontFamily="$mono"
          fontSize={24}
          fontWeight="600"
          letterSpacing={-1}
          color={isOwe ? '$error' : '$success'}
        >
          {amount}
        </Text>
      </YStack>
    </Animated.View>
  )
}

// ============================================
// ACTIVITY CARD
// ============================================
const ActivityCard = ({
  activity,
  delay = 0,
}: {
  activity: Activity
  delay?: number
}) => {
  const { isDark } = useThemeMode()
  const isActive = activity.status === 'active'
  const isSettled = activity.status === 'settled'
  const Icon = activity.icon

  const scale = useSharedValue(1)

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
          router.push(`/session/${activity.id}`)
        }}
        style={{ flex: 1 }}
      >
        <XStack
          backgroundColor={isActive ? '$featureBg' : '$cardBg'}
          borderRadius={18}
          padding={16}
          alignItems="center"
          gap={12}
          borderWidth={1}
          borderColor={isActive ? '$featureBorder' : '$cardBorder'}
          overflow="hidden"
        >
          {/* Subtle glow for active */}
          {isActive && (
            <View
              position="absolute"
              top={-40}
              right={-40}
              width={100}
              height={100}
              borderRadius={50}
              backgroundColor="$featureGlow"
            />
          )}

          {/* Icon/Image */}
          <View
            width={46}
            height={46}
            borderRadius={14}
            backgroundColor={isActive ? '$accentSoft' : '$backgroundHover'}
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
          >
            {activity.imageUrl ? (
              <Image
                source={{ uri: activity.imageUrl }}
                style={{ width: 46, height: 46 }}
                resizeMode="cover"
              />
            ) : (
              <Icon
                size={20}
                color={isActive ? '$accent' : '$colorMuted'}
                strokeWidth={1.8}
              />
            )}
          </View>

          {/* Content */}
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
                {activity.title}
              </Text>
              {isActive && (
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
              {isSettled && (
                <View
                  backgroundColor="$successSoft"
                  paddingHorizontal={6}
                  paddingVertical={2}
                  borderRadius={4}
                >
                  <XStack alignItems="center" gap={3}>
                    <Check size={9} color="$success" strokeWidth={3} />
                    <Text fontSize={9} fontWeight="700" color="$success" letterSpacing={0.4}>
                      DONE
                    </Text>
                  </XStack>
                </View>
              )}
            </XStack>
            <Text fontSize={12} color="$colorMuted" numberOfLines={1}>
              {activity.venue}
            </Text>
            <XStack alignItems="center" gap={4}>
              <Calendar size={10} color="$colorFaint" strokeWidth={2} />
              <Text fontSize={11} color="$colorFaint">
                {activity.date}
              </Text>
              <Text fontSize={11} color="$colorGhost">·</Text>
              <Text fontSize={11} color="$colorFaint">
                {activity.members} {activity.members === 1 ? 'person' : 'people'}
              </Text>
            </XStack>
          </YStack>

          {/* Amount */}
          <YStack alignItems="flex-end" gap={2}>
            <Text
              fontFamily="$mono"
              fontSize={17}
              fontWeight="600"
              color="$color"
              letterSpacing={-0.3}
            >
              {activity.yourShare}
            </Text>
            <Text fontSize={10} color="$colorFaint">
              of {activity.amount}
            </Text>
          </YStack>

          {/* Chevron */}
          <ChevronRight size={16} color="$colorGhost" strokeWidth={2} />
        </XStack>
      </Pressable>
    </AnimatedXStack>
  )
}

// ============================================
// SECTION HEADER
// ============================================
const SectionHeader = ({ title, count }: { title: string; count?: number }) => (
  <XStack alignItems="center" gap={8} marginBottom={10}>
    <Text
      fontSize={12}
      fontWeight="600"
      letterSpacing={0.5}
      textTransform="uppercase"
      color="$colorFaint"
    >
      {title}
    </Text>
    {count !== undefined && (
      <View
        backgroundColor="$backgroundHover"
        paddingHorizontal={6}
        paddingVertical={2}
        borderRadius={4}
      >
        <Text fontSize={10} fontWeight="600" color="$colorMuted">
          {count}
        </Text>
      </View>
    )}
  </XStack>
)

// ============================================
// MAIN SCREEN
// ============================================
export default function ActivityScreen() {
  const insets = useSafeAreaInsets()

  const activeItems = activities.filter((a) => a.status === 'active')
  const pendingItems = activities.filter((a) => a.status === 'pending')
  const settledItems = activities.filter((a) => a.status === 'settled')

  return (
    <ScrollView
      backgroundColor="$background"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      <YStack paddingTop={insets.top + 12} paddingHorizontal={20} gap={24}>
        {/* Header */}
        <Animated.View entering={FadeInDown.delay(50).springify()}>
          <YStack gap={4}>
            <Text fontSize={13} color="$colorMuted" fontWeight="500">
              Your activity
            </Text>
            <Text fontSize={28} fontWeight="600" letterSpacing={-1} color="$color">
              All Splits
            </Text>
          </YStack>
        </Animated.View>

        {/* Stats */}
        <XStack gap={12}>
          <StatsCard label="You Owe" amount="$68.75" type="owe" delay={100} />
          <StatsCard label="Owed to You" amount="$95.00" type="owed" delay={150} />
        </XStack>

        {/* Active */}
        {activeItems.length > 0 && (
          <YStack>
            <SectionHeader title="Active Now" count={activeItems.length} />
            <YStack gap={10}>
              {activeItems.map((activity, i) => (
                <ActivityCard key={activity.id} activity={activity} delay={200 + i * 50} />
              ))}
            </YStack>
          </YStack>
        )}

        {/* Pending */}
        {pendingItems.length > 0 && (
          <YStack>
            <SectionHeader title="Pending" count={pendingItems.length} />
            <YStack gap={10}>
              {pendingItems.map((activity, i) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  delay={300 + i * 50}
                />
              ))}
            </YStack>
          </YStack>
        )}

        {/* Settled */}
        {settledItems.length > 0 && (
          <YStack>
            <SectionHeader title="Completed" count={settledItems.length} />
            <YStack gap={10}>
              {settledItems.map((activity, i) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  delay={400 + i * 50}
                />
              ))}
            </YStack>
          </YStack>
        )}
      </YStack>
    </ScrollView>
  )
}
