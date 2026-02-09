import { ScrollView, YStack, XStack, Text, styled } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ArrowUpRight, ArrowDownLeft, Zap, Users, QrCode, TrendingUp } from '@tamagui/lucide-icons'

// ============================================
// CHUNKY STYLED COMPONENTS - Duolingo Energy
// ============================================

// 3D Button with offset shadow
const ChunkyButton = styled(YStack, {
  backgroundColor: '$primary',
  borderRadius: '$5',
  borderWidth: 3,
  borderColor: '$color',
  paddingVertical: '$4',
  paddingHorizontal: '$6',
  // 3D shadow effect
  shadowColor: '$color',
  shadowOffset: { width: 4, height: 4 },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 0,
  pressStyle: {
    shadowOffset: { width: 2, height: 2 },
    transform: [{ translateX: 2 }, { translateY: 2 }],
  },
})

// Action circles with thick borders
const ActionButton = styled(YStack, {
  alignItems: 'center',
  gap: '$2',
  pressStyle: { 
    scale: 0.95,
  },
})

const ActionCircle = styled(YStack, {
  width: 72,
  height: 72,
  borderRadius: 36,
  backgroundColor: '$surface',
  borderWidth: 3,
  borderColor: '$color',
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: '$color',
  shadowOffset: { width: 3, height: 3 },
  shadowOpacity: 1,
  shadowRadius: 0,
})

const ActionLabel = styled(Text, {
  fontSize: 14,
  fontWeight: '700',
  color: '$color',
})

// Cards with chunky borders
const Card = styled(YStack, {
  backgroundColor: '$surface',
  borderRadius: '$5',
  borderWidth: 3,
  borderColor: '$color',
  padding: '$5',
  shadowColor: '$color',
  shadowOffset: { width: 4, height: 4 },
  shadowOpacity: 1,
  shadowRadius: 0,
})

const YellowCard = styled(YStack, {
  backgroundColor: '$primary',
  borderRadius: '$5',
  borderWidth: 3,
  borderColor: '$color',
  padding: '$5',
  shadowColor: '$color',
  shadowOffset: { width: 4, height: 4 },
  shadowOpacity: 1,
  shadowRadius: 0,
})

// Transaction row
const TransactionRow = styled(XStack, {
  paddingVertical: '$4',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottomWidth: 2,
  borderBottomColor: '$borderColorSubtle',
})

const Avatar = styled(YStack, {
  width: 48,
  height: 48,
  borderRadius: 24,
  backgroundColor: '$primaryMuted',
  borderWidth: 2,
  borderColor: '$color',
  alignItems: 'center',
  justifyContent: 'center',
})

// Badge pill
const Badge = styled(XStack, {
  backgroundColor: '$successMuted',
  paddingHorizontal: '$3',
  paddingVertical: '$1',
  borderRadius: '$full',
  borderWidth: 2,
  borderColor: '$success',
})

// --- Mock Data ---
const transactions = [
  { id: 1, name: 'Tendai', desc: 'Lunch split 🍔', amount: -12.50, type: 'expense', initials: 'TM' },
  { id: 2, name: 'Rudo', desc: 'Uber fare 🚗', amount: 8.00, type: 'income', initials: 'RK' },
  { id: 3, name: 'BBQ Crew', desc: 'Braai meats 🔥', amount: -25.00, type: 'expense', initials: '🍖' },
]

export default function HomeScreen() {
  const insets = useSafeAreaInsets()

  return (
    <ScrollView 
      backgroundColor="$background" 
      showsVerticalScrollIndicator={false}
    >
      <YStack 
        paddingTop={insets.top + 20}
        paddingBottom={insets.bottom + 120}
        paddingHorizontal="$5"
        gap="$6"
      >
        {/* Header */}
        <XStack justifyContent="space-between" alignItems="center">
          <YStack>
            <Text fontSize={16} fontWeight="700" color="$colorMuted">Hey there! 👋</Text>
            <Text fontSize={28} fontWeight="800" color="$color">Your Balance</Text>
          </YStack>
          <YStack 
            width={48} 
            height={48} 
            borderRadius={24} 
            backgroundColor="$primary"
            borderWidth={3}
            borderColor="$color"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize={20}>😎</Text>
          </YStack>
        </XStack>

        {/* HERO BALANCE CARD */}
        <YellowCard>
          <YStack alignItems="center" gap="$3">
            <Text fontSize={16} fontWeight="700" color="$color" opacity={0.7}>
              TOTAL BALANCE
            </Text>
            <XStack alignItems="flex-start">
              <Text 
                fontSize={32} 
                fontWeight="800" 
                color="$color" 
                marginTop={8}
              >
                $
              </Text>
              <Text 
                fontFamily="$mono" 
                fontSize={72} 
                fontWeight="700" 
                color="$color"
                letterSpacing={-4}
              >
                247
              </Text>
              <Text 
                fontFamily="$mono" 
                fontSize={36} 
                fontWeight="700" 
                color="$color"
                opacity={0.7}
                marginTop={8}
              >
                .50
              </Text>
            </XStack>
            <Badge>
              <TrendingUp size={14} color="$success" strokeWidth={3} />
              <Text fontSize={14} fontWeight="700" color="$success" marginLeft="$1">
                +$12.50 today
              </Text>
            </Badge>
          </YStack>
        </YellowCard>

        {/* QUICK ACTIONS */}
        <XStack justifyContent="space-between" paddingHorizontal="$2">
          <ActionButton>
            <ActionCircle backgroundColor="$primary">
              <ArrowUpRight size={28} color="$color" strokeWidth={2.5} />
            </ActionCircle>
            <ActionLabel>Send</ActionLabel>
          </ActionButton>

          <ActionButton>
            <ActionCircle backgroundColor="$primary">
              <ArrowDownLeft size={28} color="$color" strokeWidth={2.5} />
            </ActionCircle>
            <ActionLabel>Request</ActionLabel>
          </ActionButton>

          <ActionButton>
            <ActionCircle>
              <Zap size={28} color="$color" strokeWidth={2.5} />
            </ActionCircle>
            <ActionLabel>Split</ActionLabel>
          </ActionButton>

          <ActionButton>
            <ActionCircle>
              <QrCode size={28} color="$color" strokeWidth={2.5} />
            </ActionCircle>
            <ActionLabel>Scan</ActionLabel>
          </ActionButton>
        </XStack>

        {/* EXCHANGE RATE */}
        <Card>
          <XStack justifyContent="space-between" alignItems="center">
            <YStack gap="$1">
              <Text fontSize={14} fontWeight="700" color="$colorMuted">
                USD → ZiG
              </Text>
              <XStack alignItems="baseline" gap="$2">
                <Text fontFamily="$mono" fontSize={32} fontWeight="700" color="$color">
                  13.85
                </Text>
                <Text fontSize={14} fontWeight="700" color="$success">
                  +2.1%
                </Text>
              </XStack>
            </YStack>
            <YStack 
              backgroundColor="$primaryMuted" 
              padding="$3" 
              borderRadius="$4"
              borderWidth={2}
              borderColor="$primary"
            >
              <Text fontSize={24}>💱</Text>
            </YStack>
          </XStack>
        </Card>

        {/* RECENT ACTIVITY */}
        <YStack gap="$3">
          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize={20} fontWeight="800" color="$color">
              Recent Activity
            </Text>
            <Text fontSize={14} fontWeight="700" color="$primary" pressStyle={{ opacity: 0.7 }}>
              See all →
            </Text>
          </XStack>

          <Card>
            {transactions.map((tx, index) => (
              <TransactionRow 
                key={tx.id}
                borderBottomWidth={index < transactions.length - 1 ? 2 : 0}
              >
                <XStack gap="$3" alignItems="center">
                  <Avatar>
                    <Text fontSize={16} fontWeight="700">{tx.initials}</Text>
                  </Avatar>
                  <YStack>
                    <Text fontSize={16} fontWeight="700" color="$color">
                      {tx.name}
                    </Text>
                    <Text fontSize={14} color="$colorMuted">
                      {tx.desc}
                    </Text>
                  </YStack>
                </XStack>
                <Text 
                  fontFamily="$mono" 
                  fontSize={18} 
                  fontWeight="700"
                  color={tx.type === 'income' ? '$success' : '$color'}
                >
                  {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                </Text>
              </TransactionRow>
            ))}
          </Card>
        </YStack>

        {/* CTA - SETTLE UP */}
        <ChunkyButton pressStyle={{ scale: 0.98 }}>
          <XStack alignItems="center" justifyContent="center" gap="$3">
            <Text fontSize={18} fontWeight="800" color="$color">
              ⚡ Settle Up Now
            </Text>
          </XStack>
        </ChunkyButton>

        {/* GROUPS PREVIEW */}
        <Card>
          <XStack alignItems="center" gap="$3">
            <YStack 
              width={56} 
              height={56} 
              borderRadius="$4"
              backgroundColor="$info"
              borderWidth={3}
              borderColor="$color"
              alignItems="center"
              justifyContent="center"
            >
              <Users size={28} color="white" strokeWidth={2.5} />
            </YStack>
            <YStack flex={1}>
              <Text fontSize={18} fontWeight="800" color="$color">
                3 Active Groups
              </Text>
              <Text fontSize={14} color="$colorMuted">
                BBQ Crew owes you $12.50
              </Text>
            </YStack>
            <Text fontSize={24}>→</Text>
          </XStack>
        </Card>

      </YStack>
    </ScrollView>
  )
}
