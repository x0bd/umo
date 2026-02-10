import { Pressable } from 'react-native'
import { ScrollView, YStack, XStack, Text, View } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { 
  Clock, 
  Check,
  ChevronRight,
  Users,
  Zap,
  Car,
  ShoppingBag,
  Utensils,
} from '@tamagui/lucide-icons'
import { useThemeMode } from '@/providers/theme-mode'

const R = {
  card: 20,
  icon: 16,
  chip: 999,
}

// ============================================
// ACTIVITY DATA
// ============================================
const activities = [
  { 
    id: 1, 
    title: 'Lunch Split', 
    venue: 'Nando\'s — Table 6',
    amount: '$142.50', 
    yourShare: '$47.50',
    members: 3,
    date: 'Today, 1:30 PM',
    status: 'active' as const,
    icon: Utensils,
  },
  { 
    id: 2, 
    title: 'Uber Ride', 
    venue: 'Airport → CBD',
    amount: '$24.00', 
    yourShare: '$8.00',
    members: 3,
    date: 'Yesterday',
    status: 'settled' as const,
    icon: Car,
  },
  { 
    id: 3, 
    title: 'BBQ Night', 
    venue: 'Braai @ Rudo\'s',
    amount: '$85.00', 
    yourShare: '$21.25',
    members: 4,
    date: 'Feb 5',
    status: 'pending' as const,
    icon: Users,
  },
  { 
    id: 4, 
    title: 'Groceries', 
    venue: 'Pick n Pay',
    amount: '$62.30', 
    yourShare: '$31.15',
    members: 2,
    date: 'Feb 3',
    status: 'settled' as const,
    icon: ShoppingBag,
  },
]

// ============================================
// ACTIVITY CARD (Full-width, no vertical pill)
// ============================================
const ActivityCard = ({ 
  activity 
}: { 
  activity: typeof activities[0] 
}) => {
  const isActive = activity.status === 'active'
  const isSettled = activity.status === 'settled'
  const Icon = activity.icon

  return (
    <Pressable>
      <XStack
        backgroundColor={isActive ? '$cardTint' : '$cardBg'}
        borderRadius={R.card}
        padding={18}
        alignItems="center"
        gap={14}
        borderWidth={1}
        borderColor={isActive ? '$pink' : '$cardBorder'}
      >
        {/* Icon */}
        <View
          width={48}
          height={48}
          borderRadius={R.icon}
          backgroundColor={isActive ? '$pinkMuted' : '$backgroundHover'}
          alignItems="center"
          justifyContent="center"
          borderWidth={1}
          borderColor={isActive ? 'rgba(0,0,0,0.08)' : '$borderColorSubtle'}
        >
          {isActive ? (
            <Zap size={22} color="$pinkText" strokeWidth={2} />
          ) : (
            <Icon size={22} color="$colorMuted" strokeWidth={1.8} />
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
              flex={1}
            >
              {activity.title}
            </Text>
            {isActive && (
              <View
                backgroundColor="$pinkMuted"
                paddingHorizontal={6}
                paddingVertical={2}
                borderRadius={4}
              >
                <Text fontSize={9} fontWeight="700" color="$pinkText" letterSpacing={0.5}>
                  LIVE
                </Text>
              </View>
            )}
            {isSettled && (
              <View
                backgroundColor="$black"
                paddingHorizontal={6}
                paddingVertical={2}
                borderRadius={4}
              >
                <XStack alignItems="center" gap={3}>
                  <Check size={10} color="#FFF" strokeWidth={3} />
                  <Text fontSize={9} fontWeight="700" color="#FFF" letterSpacing={0.5}>
                    DONE
                  </Text>
                </XStack>
              </View>
            )}
          </XStack>
          <Text 
            fontSize={13} 
            color="$colorMuted"
            numberOfLines={1}
          >
            {activity.venue} · {activity.members} people
          </Text>
          <Text 
            fontSize={11} 
            color="$colorMuted"
            opacity={0.7}
          >
            {activity.date}
          </Text>
        </YStack>

        {/* Amount */}
        <YStack alignItems="flex-end" gap={2}>
          <Text 
            fontFamily="$mono" 
            fontSize={18} 
            fontWeight="600" 
            color="$color"
            letterSpacing={-0.5}
          >
            {activity.yourShare}
          </Text>
          <Text fontSize={10} color="$colorMuted" opacity={0.7}>
            of {activity.amount}
          </Text>
        </YStack>

        {/* Chevron */}
        <ChevronRight 
          size={18} 
          color="$colorMuted"
          strokeWidth={2}
          opacity={0.5}
        />
      </XStack>
    </Pressable>
  )
}

// ============================================
// SECTION HEADER
// ============================================
const SectionHeader = ({ title }: { title: string }) => (
  <Text
    fontSize={13}
    fontWeight="700"
    letterSpacing={1}
    textTransform="uppercase"
    color="$colorMuted"
    marginBottom={12}
  >
    {title}
  </Text>
)

// ============================================
// MAIN SCREEN
// ============================================
export default function ActivityScreen() {
  const insets = useSafeAreaInsets()
  const { isDark } = useThemeMode()

  const activeItems = activities.filter(a => a.status === 'active')
  const pendingItems = activities.filter(a => a.status === 'pending')
  const settledItems = activities.filter(a => a.status === 'settled')

  return (
    <ScrollView 
      backgroundColor="$background" 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      <YStack
        paddingTop={insets.top + 16}
        paddingHorizontal={20}
        gap={24}
      >
        {/* Header */}
        <YStack gap={4}>
          <Text fontSize={14} color="$colorMuted" fontWeight="500">
            Your activity
          </Text>
          <Text 
            fontSize={28} 
            fontWeight="600" 
            letterSpacing={-1} 
            color="$color"
          >
            All Splits
          </Text>
        </YStack>

        {/* Stats row */}
        <XStack gap={12}>
          <YStack 
            flex={1} 
            backgroundColor="$surface" 
            borderRadius={16} 
            padding={16}
            borderWidth={1}
            borderColor="$borderColorSubtle"
          >
            <Text fontSize={12} fontWeight="600" textTransform="uppercase" letterSpacing={0.5} color="$colorMuted">
              You Owe
            </Text>
            <Text fontFamily="$mono" fontSize={22} fontWeight="600" letterSpacing={-1} color="$pink" marginTop={4}>
              $68.75
            </Text>
          </YStack>
          <YStack 
            flex={1} 
            backgroundColor="$surface" 
            borderRadius={16} 
            padding={16}
            borderWidth={1}
            borderColor="$borderColorSubtle"
          >
            <Text fontSize={12} fontWeight="600" textTransform="uppercase" letterSpacing={0.5} color="$colorMuted">
              Owed to You
            </Text>
            <Text fontFamily="$mono" fontSize={22} fontWeight="600" letterSpacing={-1} color="$green" marginTop={4}>
              $95.00
            </Text>
          </YStack>
        </XStack>

        {/* Active */}
        {activeItems.length > 0 && (
          <YStack>
            <SectionHeader title="Active Now" />
            <YStack gap={10}>
              {activeItems.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </YStack>
          </YStack>
        )}

        {/* Pending */}
        {pendingItems.length > 0 && (
          <YStack>
            <SectionHeader title="Pending Settlement" />
            <YStack gap={10}>
              {pendingItems.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </YStack>
          </YStack>
        )}

        {/* Settled */}
        {settledItems.length > 0 && (
          <YStack>
            <SectionHeader title="Completed" />
            <YStack gap={10}>
              {settledItems.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </YStack>
          </YStack>
        )}
      </YStack>
    </ScrollView>
  )
}
