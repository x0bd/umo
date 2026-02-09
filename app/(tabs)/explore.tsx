import { ScrollView, YStack, XStack, Text, View } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  Check,
  ChevronRight,
} from '@tamagui/lucide-icons'

// ============================================
// ACTIVITY SCREEN — SPLTR AESTHETIC
// Dark bg, flow lines, tight typography
// ============================================

const activities = [
  { 
    id: 1, 
    title: 'Lunch Split', 
    subtitle: 'Nando\'s — Table 6',
    amount: '$142.50', 
    yourShare: '$47.50',
    members: 3,
    date: 'Today',
    status: 'active' as const,
  },
  { 
    id: 2, 
    title: 'Uber Ride', 
    subtitle: 'Airport → CBD',
    amount: '$24.00', 
    yourShare: '$8.00',
    members: 3,
    date: 'Yesterday',
    status: 'settled' as const,
  },
  { 
    id: 3, 
    title: 'BBQ Night', 
    subtitle: 'Braai @ Rudo\'s',
    amount: '$85.00', 
    yourShare: '$21.25',
    members: 4,
    date: 'Feb 5',
    status: 'pending' as const,
  },
  { 
    id: 4, 
    title: 'Groceries', 
    subtitle: 'Pick n Pay',
    amount: '$62.30', 
    yourShare: '$31.15',
    members: 2,
    date: 'Feb 3',
    status: 'settled' as const,
  },
]

const ActivityCard = ({ 
  activity 
}: { 
  activity: typeof activities[0] 
}) => {
  const isActive = activity.status === 'active'
  const isSettled = activity.status === 'settled'

  return (
    <XStack
      backgroundColor={isActive ? '#FF1A55' : '#E6E6E6'}
      borderRadius={28}
      padding={24}
      pressStyle={{ scale: 0.98, opacity: 0.9 }}
    >
      {/* Side pill */}
      <YStack 
        width={24} 
        alignItems="center" 
        justifyContent="flex-start"
        flexShrink={0}
        marginRight={8}
      >
        <View
          style={{
            // @ts-ignore
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: [{ rotate: '180deg' }],
          }}
        >
          <Text
            fontSize={9}
            fontWeight="700"
            letterSpacing={1}
            textTransform="uppercase"
            color={isActive ? '#450010' : '#111111'}
            backgroundColor={isActive ? 'rgba(69,0,16,0.15)' : 'rgba(0,0,0,0.08)'}
            paddingHorizontal={4}
            paddingVertical={10}
            borderRadius={100}
            // @ts-ignore
            whiteSpace="nowrap"
          >
            {activity.status === 'settled' ? 'Done' : activity.status === 'active' ? 'Live' : 'Owed'}
          </Text>
        </View>
      </YStack>

      {/* Content */}
      <YStack flex={1} gap={16}>
        <YStack>
          <Text 
            fontSize={24} 
            fontWeight="500" 
            letterSpacing={-1} 
            color={isActive ? '#450010' : '#111111'}
            lineHeight={26}
          >
            {activity.title}
          </Text>
          <Text 
            fontSize={14} 
            color={isActive ? 'rgba(69,0,16,0.6)' : '#555555'}
            marginTop={2}
          >
            {activity.subtitle}
          </Text>
        </YStack>

        {/* Flow line section */}
        <YStack position="relative" paddingLeft={20}>
          {/* Vertical line */}
          <View
            position="absolute"
            left={0}
            top={6}
            bottom={6}
            width={1}
            backgroundColor={isActive ? 'rgba(69,0,16,0.2)' : 'rgba(0,0,0,0.15)'}
          />

          <YStack gap={16}>
            <YStack>
              <Text 
                fontSize={12} 
                fontWeight="600" 
                textTransform="uppercase" 
                letterSpacing={0.5}
                color={isActive ? 'rgba(69,0,16,0.5)' : '#555555'}
              >
                Total
              </Text>
              <Text 
                fontSize={18} 
                fontWeight="500" 
                letterSpacing={-0.5}
                color={isActive ? '#450010' : '#111111'}
              >
                {activity.amount}
              </Text>
            </YStack>

            <XStack justifyContent="space-between" alignItems="flex-end">
              <YStack>
                <Text 
                  fontSize={12} 
                  fontWeight="600" 
                  textTransform="uppercase" 
                  letterSpacing={0.5}
                  color={isActive ? 'rgba(69,0,16,0.5)' : '#555555'}
                >
                  Your Share
                </Text>
                <Text 
                  fontSize={32} 
                  fontWeight="600" 
                  letterSpacing={-1.5}
                  color={isActive ? '#450010' : '#111111'}
                  lineHeight={36}
                >
                  {activity.yourShare}
                </Text>
              </YStack>

              <XStack gap={4} alignItems="center" marginBottom={4}>
                <Text 
                  fontSize={13} 
                  fontWeight="500"
                  color={isActive ? 'rgba(69,0,16,0.6)' : '#555555'}
                >
                  {activity.members} people
                </Text>
              </XStack>
            </XStack>
          </YStack>
        </YStack>

        {/* Status row */}
        <XStack justifyContent="space-between" alignItems="center" marginTop={4}>
          <Text fontSize={13} color={isActive ? 'rgba(69,0,16,0.5)' : '#555555'}>
            {activity.date}
          </Text>
          {isSettled ? (
            <XStack 
              backgroundColor={isActive ? 'rgba(69,0,16,0.15)' : '#000'} 
              paddingHorizontal={10} 
              paddingVertical={4} 
              borderRadius={6}
              gap={4}
              alignItems="center"
            >
              <Check size={12} color="#FFF" strokeWidth={3} />
              <Text fontSize={10} fontWeight="700" letterSpacing={0.5} textTransform="uppercase" color="#FFF">
                Settled
              </Text>
            </XStack>
          ) : (
            <XStack 
              alignItems="center" 
              gap={4}
              opacity={0.5}
            >
              <Clock size={13} color={isActive ? '#450010' : '#111'} strokeWidth={2} />
              <Text fontSize={10} fontWeight="700" letterSpacing={0.5} textTransform="uppercase" color={isActive ? '#450010' : '#111'}>
                {activity.status === 'active' ? 'In Progress' : 'Pending'}
              </Text>
            </XStack>
          )}
        </XStack>
      </YStack>
    </XStack>
  )
}

export default function ActivityScreen() {
  const insets = useSafeAreaInsets()

  return (
    <ScrollView 
      backgroundColor="#050505" 
      showsVerticalScrollIndicator={false}
      style={{
        // @ts-ignore
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      <YStack
        paddingTop={insets.top + 24}
        paddingBottom={insets.bottom + 100}
        paddingHorizontal={20}
        gap={20}
        maxWidth={450}
        marginHorizontal="auto"
        width="100%"
      >
        {/* Header */}
        <YStack paddingBottom={12} gap={4}>
          <Text 
            fontSize={48} 
            fontWeight="500" 
            letterSpacing={-2} 
            color="#FFFFFF"
            lineHeight={48}
          >
            Your{'\n'}
            <Text color="#666666">Splits</Text>
          </Text>
          <Text fontSize={15} color="rgba(255,255,255,0.5)" marginTop={8} lineHeight={22}>
            Track and settle group expenses.{'\n'}All amounts in USD.
          </Text>
        </YStack>

        {/* Stats row */}
        <XStack gap={12}>
          <YStack 
            flex={1} 
            backgroundColor="#0D0D0D" 
            borderRadius={16} 
            padding={16}
            borderWidth={1}
            borderColor="rgba(255,255,255,0.06)"
          >
            <Text fontSize={12} fontWeight="600" textTransform="uppercase" letterSpacing={0.5} color="rgba(255,255,255,0.4)">
              You Owe
            </Text>
            <Text fontFamily="$mono" fontSize={24} fontWeight="600" letterSpacing={-1} color="#FF1A55" marginTop={4}>
              $68.75
            </Text>
          </YStack>
          <YStack 
            flex={1} 
            backgroundColor="#0D0D0D" 
            borderRadius={16} 
            padding={16}
            borderWidth={1}
            borderColor="rgba(255,255,255,0.06)"
          >
            <Text fontSize={12} fontWeight="600" textTransform="uppercase" letterSpacing={0.5} color="rgba(255,255,255,0.4)">
              Owed to You
            </Text>
            <Text fontFamily="$mono" fontSize={24} fontWeight="600" letterSpacing={-1} color="#00E676" marginTop={4}>
              $95.00
            </Text>
          </YStack>
        </XStack>

        {/* Activity cards */}
        <YStack gap={16}>
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </YStack>

        {/* Bottom spacer */}
        <View height={20} />
      </YStack>
    </ScrollView>
  )
}
