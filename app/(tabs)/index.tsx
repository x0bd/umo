import { ScrollView, YStack, XStack, Text, styled, Circle, Square } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { 
  Send, 
  Download, 
  Zap, 
  ScanLine, 
  TrendingUp,
  Users,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Bell,
  User
} from '@tamagui/lucide-icons'

// ============================================
// APPLE-LEVEL COMPONENTS
// ============================================

const Card = styled(YStack, {
  backgroundColor: '$surface',
  borderRadius: 16,
  padding: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.04,
  shadowRadius: 8,
})

const YellowCard = styled(YStack, {
  backgroundColor: '$yellow',
  borderRadius: 20,
  padding: 24,
})

const ActionButton = styled(YStack, {
  alignItems: 'center',
  gap: 8,
  pressStyle: { opacity: 0.6, scale: 0.95 },
})

const IconCircle = styled(YStack, {
  width: 56,
  height: 56,
  borderRadius: 28,
  alignItems: 'center',
  justifyContent: 'center',
})

const Pill = styled(XStack, {
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 100,
  alignItems: 'center',
  gap: 4,
})

const TransactionItem = styled(XStack, {
  paddingVertical: 14,
  alignItems: 'center',
  justifyContent: 'space-between',
  pressStyle: { opacity: 0.6 },
})

const Avatar = styled(YStack, {
  width: 40,
  height: 40,
  borderRadius: 20,
  alignItems: 'center',
  justifyContent: 'center',
})

// --- Mock Data ---
const transactions = [
  { id: 1, name: 'Tendai M.', desc: 'Lunch split', amount: -12.50, type: 'out', color: '#FFE500' },
  { id: 2, name: 'Rudo K.', desc: 'Uber refund', amount: 8.00, type: 'in', color: '#22C55E' },
  { id: 3, name: 'BBQ Squad', desc: 'Braai contribution', amount: -25.00, type: 'out', color: '#3B82F6' },
]

export default function HomeScreen() {
  const insets = useSafeAreaInsets()

  return (
    <ScrollView 
      backgroundColor="$background" 
      showsVerticalScrollIndicator={false}
    >
      <YStack 
        paddingTop={insets.top + 12}
        paddingBottom={insets.bottom + 100}
        paddingHorizontal={20}
        gap={24}
      >
        {/* HEADER */}
        <XStack justifyContent="space-between" alignItems="center" paddingTop={8}>
          <YStack gap={2}>
            <Text fontSize={13} fontWeight="500" color="$colorMuted">
              Good morning
            </Text>
            <Text fontSize={22} fontWeight="700" color="$color" letterSpacing={-0.5}>
              Welcome back
            </Text>
          </YStack>
          <XStack gap={12}>
            <Circle 
              size={40} 
              backgroundColor="$backgroundHover"
              pressStyle={{ opacity: 0.6 }}
            >
              <Bell size={20} color="$color" strokeWidth={2} />
            </Circle>
            <Circle 
              size={40} 
              backgroundColor="$yellow"
              pressStyle={{ opacity: 0.6 }}
            >
              <User size={20} color="$color" strokeWidth={2} />
            </Circle>
          </XStack>
        </XStack>

        {/* BALANCE CARD */}
        <YellowCard>
          <YStack gap={16}>
            <XStack justifyContent="space-between" alignItems="center">
              <Text fontSize={13} fontWeight="600" color="$color" opacity={0.7}>
                Total Balance
              </Text>
              <Pill backgroundColor="rgba(0,0,0,0.08)">
                <TrendingUp size={12} color="$color" strokeWidth={2.5} />
                <Text fontSize={12} fontWeight="700" color="$color">+12%</Text>
              </Pill>
            </XStack>
            
            <XStack alignItems="baseline">
              <Text fontSize={24} fontWeight="600" color="$color" marginTop={6}>$</Text>
              <Text fontFamily="$mono" fontSize={52} fontWeight="600" color="$color" letterSpacing={-2}>
                247
              </Text>
              <Text fontFamily="$mono" fontSize={24} fontWeight="500" color="$color" opacity={0.5} marginTop={6}>
                .50
              </Text>
            </XStack>

            <XStack gap={8}>
              <Pill backgroundColor="$greenPale">
                <ArrowDownLeft size={12} color="$green" strokeWidth={2.5} />
                <Text fontSize={12} fontWeight="600" color="$green">$12.50 incoming</Text>
              </Pill>
            </XStack>
          </YStack>
        </YellowCard>

        {/* QUICK ACTIONS */}
        <XStack justifyContent="space-between" paddingHorizontal={8}>
          <ActionButton>
            <IconCircle backgroundColor="$yellow">
              <Send size={22} color="$color" strokeWidth={2} />
            </IconCircle>
            <Text fontSize={12} fontWeight="600" color="$color">Send</Text>
          </ActionButton>

          <ActionButton>
            <IconCircle backgroundColor="$yellowPale">
              <Download size={22} color="$color" strokeWidth={2} />
            </IconCircle>
            <Text fontSize={12} fontWeight="600" color="$color">Request</Text>
          </ActionButton>

          <ActionButton>
            <IconCircle backgroundColor="$yellowPale">
              <Zap size={22} color="$color" strokeWidth={2} />
            </IconCircle>
            <Text fontSize={12} fontWeight="600" color="$color">Split</Text>
          </ActionButton>

          <ActionButton>
            <IconCircle backgroundColor="$backgroundHover">
              <ScanLine size={22} color="$color" strokeWidth={2} />
            </IconCircle>
            <Text fontSize={12} fontWeight="600" color="$color">Scan</Text>
          </ActionButton>
        </XStack>

        {/* RATE CARD */}
        <Card>
          <XStack justifyContent="space-between" alignItems="center">
            <YStack gap={4}>
              <Text fontSize={12} fontWeight="600" color="$colorMuted">
                Exchange Rate
              </Text>
              <XStack alignItems="baseline" gap={6}>
                <Text fontSize={13} fontWeight="500" color="$colorMuted">1 USD =</Text>
                <Text fontFamily="$mono" fontSize={24} fontWeight="700" color="$color">
                  13.85
                </Text>
                <Text fontSize={13} fontWeight="600" color="$color">ZiG</Text>
              </XStack>
            </YStack>
            <Square 
              size={44} 
              backgroundColor="$yellow" 
              borderRadius={12}
              alignItems="center"
              justifyContent="center"
            >
              <RefreshCw size={20} color="$color" strokeWidth={2} />
            </Square>
          </XStack>
        </Card>

        {/* ACTIVITY */}
        <YStack gap={14}>
          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize={17} fontWeight="700" color="$color">Recent Activity</Text>
            <XStack alignItems="center" gap={2} pressStyle={{ opacity: 0.6 }}>
              <Text fontSize={14} fontWeight="600" color="$colorMuted">See all</Text>
              <ChevronRight size={18} color="$colorMuted" strokeWidth={2} />
            </XStack>
          </XStack>

          <Card padding={0} overflow="hidden">
            {transactions.map((tx, index) => (
              <TransactionItem 
                key={tx.id}
                paddingHorizontal={16}
                borderBottomWidth={index < transactions.length - 1 ? 1 : 0}
                borderBottomColor="$borderColorSubtle"
              >
                <XStack gap={12} alignItems="center">
                  <Avatar backgroundColor={tx.color}>
                    {tx.type === 'in' ? (
                      <ArrowDownLeft size={18} color="white" strokeWidth={2.5} />
                    ) : (
                      <ArrowUpRight size={18} color="white" strokeWidth={2.5} />
                    )}
                  </Avatar>
                  <YStack gap={2}>
                    <Text fontSize={15} fontWeight="600" color="$color">{tx.name}</Text>
                    <Text fontSize={13} color="$colorMuted">{tx.desc}</Text>
                  </YStack>
                </XStack>
                <Text 
                  fontFamily="$mono" 
                  fontSize={15} 
                  fontWeight="600"
                  color={tx.type === 'in' ? '$green' : '$color'}
                >
                  {tx.type === 'in' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                </Text>
              </TransactionItem>
            ))}
          </Card>
        </YStack>

        {/* GROUPS */}
        <Card 
          backgroundColor="$yellowPale"
          pressStyle={{ opacity: 0.8, scale: 0.99 }}
        >
          <XStack alignItems="center" gap={14}>
            <Square 
              size={48} 
              backgroundColor="$yellow" 
              borderRadius={14}
              alignItems="center"
              justifyContent="center"
            >
              <Users size={22} color="$color" strokeWidth={2} />
            </Square>
            <YStack flex={1} gap={2}>
              <Text fontSize={15} fontWeight="700" color="$color">
                3 Active Groups
              </Text>
              <Text fontSize={13} color="$colorSubtle">
                You're owed $37.50 total
              </Text>
            </YStack>
            <ChevronRight size={22} color="$colorMuted" strokeWidth={2} />
          </XStack>
        </Card>

        {/* SETTLE UP */}
        <YStack 
          backgroundColor="$yellow"
          borderRadius={14}
          padding={16}
          alignItems="center"
          pressStyle={{ backgroundColor: '$yellowDark', scale: 0.98 }}
        >
          <XStack alignItems="center" gap={8}>
            <Zap size={20} color="$color" strokeWidth={2.5} />
            <Text fontSize={16} fontWeight="700" color="$color">
              Settle Up
            </Text>
          </XStack>
        </YStack>

      </YStack>
    </ScrollView>
  )
}
