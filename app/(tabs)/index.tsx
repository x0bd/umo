import { Pressable } from 'react-native'
import { ScrollView, YStack, XStack, Text, View } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { 
  ArrowUpRight,
  ArrowDownLeft,
  Bell,
  RefreshCw,
  ChevronRight,
  Users,
  Zap,
  Sparkles,
} from '@tamagui/lucide-icons'
import { useThemeMode } from '@/providers/theme-mode'
import { router } from 'expo-router'

const R = {
  card: 24,
  cardSm: 20,
  chip: 999,
  icon: 16,
}

// ============================================
// SECTION HEADER
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
      fontSize={13}
      fontWeight="700"
      letterSpacing={0.8}
      textTransform="uppercase"
      color="$colorMuted"
    >
      {title}
    </Text>
    {action && (
      <Pressable onPress={onAction}>
        <XStack alignItems="center" gap={4}>
          <Text fontSize={13} fontWeight="600" color="$pink">
            {action}
          </Text>
          <ChevronRight size={14} color="$pink" strokeWidth={2.5} />
        </XStack>
      </Pressable>
    )}
  </XStack>
)

// ============================================
// BALANCE CARD
// ============================================
const BalanceCard = () => {
  return (
    <YStack
      backgroundColor="$pink"
      borderRadius={R.card}
      padding={24}
      borderWidth={1}
      borderColor="rgba(0,0,0,0.08)"
    >
      <XStack justifyContent="space-between" alignItems="flex-start" marginBottom={20}>
        <YStack>
          <Text 
            fontSize={13} 
            fontWeight="600" 
            letterSpacing={0.5}
            textTransform="uppercase"
            color="$pinkText" 
            opacity={0.6}
            marginBottom={6}
          >
            Your Balance
          </Text>
          <Text 
            fontFamily="$mono"
            fontSize={44} 
            fontWeight="600" 
            color="$pinkText" 
            letterSpacing={-2}
            lineHeight={48}
          >
            $142.50
          </Text>
        </YStack>
        <View
          backgroundColor="$pinkMuted"
          paddingHorizontal={10}
          paddingVertical={6}
          borderRadius={R.chip}
        >
          <Text fontSize={11} fontWeight="700" color="$pinkText" letterSpacing={0.5}>
            USD
          </Text>
        </View>
      </XStack>

      {/* Quick stats */}
      <XStack gap={12}>
        <YStack 
          flex={1} 
          backgroundColor="$pinkSoft" 
          borderRadius={R.icon} 
          padding={14}
          borderWidth={1}
          borderColor="rgba(0,0,0,0.06)"
        >
          <XStack alignItems="center" gap={6} marginBottom={4}>
            <ArrowUpRight size={14} color="$pinkText" strokeWidth={2.5} />
            <Text fontSize={11} fontWeight="600" textTransform="uppercase" letterSpacing={0.5} color="$pinkText" opacity={0.6}>
              You Owe
            </Text>
          </XStack>
          <Text fontFamily="$mono" fontSize={20} fontWeight="600" color="$pinkText" letterSpacing={-0.5}>
            $68.75
          </Text>
        </YStack>
        <YStack 
          flex={1} 
          backgroundColor="$pinkSoft" 
          borderRadius={R.icon} 
          padding={14}
          borderWidth={1}
          borderColor="rgba(0,0,0,0.06)"
        >
          <XStack alignItems="center" gap={6} marginBottom={4}>
            <ArrowDownLeft size={14} color="$pinkText" strokeWidth={2.5} />
            <Text fontSize={11} fontWeight="600" textTransform="uppercase" letterSpacing={0.5} color="$pinkText" opacity={0.6}>
              Owed to You
            </Text>
          </XStack>
          <Text fontFamily="$mono" fontSize={20} fontWeight="600" color="$pinkText" letterSpacing={-0.5}>
            $95.00
          </Text>
        </YStack>
      </XStack>
    </YStack>
  )
}

// ============================================
// EXCHANGE RATE CARD
// ============================================
const ExchangeRateCard = () => {
  const { isDark } = useThemeMode()
  
  return (
    <XStack
      backgroundColor="$cardBg"
      borderRadius={R.cardSm}
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
          backgroundColor="$backgroundHover"
          alignItems="center"
          justifyContent="center"
        >
          <RefreshCw size={18} color="$colorMuted" strokeWidth={2} />
        </View>
        <YStack gap={2}>
          <Text fontSize={12} fontWeight="600" textTransform="uppercase" letterSpacing={0.5} color="$colorMuted">
            Today's Rate
          </Text>
          <XStack alignItems="baseline" gap={4}>
            <Text fontSize={11} fontWeight="500" color="$colorMuted">1 USD =</Text>
            <Text fontFamily="$mono" fontSize={18} fontWeight="700" color="$color" letterSpacing={-0.5}>
              13.85
            </Text>
            <Text fontSize={12} fontWeight="600" color="$pink">ZiG</Text>
          </XStack>
        </YStack>
      </XStack>
      <Pressable>
        <View
          paddingHorizontal={12}
          paddingVertical={8}
          borderRadius={R.chip}
          backgroundColor="$backgroundHover"
          borderWidth={1}
          borderColor="$borderColorSubtle"
        >
          <Text fontSize={11} fontWeight="600" color="$colorMuted">Update</Text>
        </View>
      </Pressable>
    </XStack>
  )
}

// ============================================
// ACTIVE SPLIT CARD
// ============================================
const ActiveSplitCard = ({ 
  title, 
  venue,
  amount, 
  members, 
  isLive = false,
}: { 
  title: string
  venue: string
  amount: string
  members: number
  isLive?: boolean
}) => {
  return (
    <Pressable onPress={() => router.push(`/session/${title.replace(/\s+/g, '-').toLowerCase()}`)}>
      <XStack
        backgroundColor={isLive ? '$cardTint' : '$cardBg'}
        borderRadius={R.cardSm}
        padding={18}
        alignItems="center"
        justifyContent="space-between"
        borderWidth={1}
        borderColor={isLive ? '$pink' : '$cardBorder'}
      >
        <XStack alignItems="center" gap={14}>
          <View
            width={44}
            height={44}
            borderRadius={14}
            backgroundColor={isLive ? '$pink' : '$backgroundHover'}
            alignItems="center"
            justifyContent="center"
          >
            {isLive ? (
              <Zap size={20} color="#FFFFFF" strokeWidth={2} />
            ) : (
              <Users size={20} color="$colorMuted" strokeWidth={2} />
            )}
          </View>
          <YStack gap={2}>
            <XStack alignItems="center" gap={8}>
              <Text fontSize={16} fontWeight="600" color="$greyText" letterSpacing={-0.3}>
                {title}
              </Text>
              {isLive && (
                <View
                  backgroundColor="$pink"
                  paddingHorizontal={6}
                  paddingVertical={2}
                  borderRadius={4}
                >
                  <Text fontSize={9} fontWeight="700" color="#FFF" letterSpacing={0.5}>
                    LIVE
                  </Text>
                </View>
              )}
            </XStack>
            <Text fontSize={13} color="$colorMuted">
              {venue} · {members} people
            </Text>
          </YStack>
        </XStack>
        <YStack alignItems="flex-end" gap={2}>
          <Text fontFamily="$mono" fontSize={18} fontWeight="600" color="$greyText" letterSpacing={-0.5}>
            {amount}
          </Text>
          <Text fontSize={11} color="$colorMuted">Your share</Text>
        </YStack>
      </XStack>
    </Pressable>
  )
}

// ============================================
// FRIEND AVATAR
// ============================================
const FriendAvatar = ({ 
  initials, 
  name,
  amount,
  isOwed = false,
}: { 
  initials: string
  name: string
  amount: string
  isOwed?: boolean
}) => (
  <Pressable>
    <YStack alignItems="center" gap={8} width={72}>
      <View
        width={52}
        height={52}
        borderRadius={R.icon}
        backgroundColor="$cardBg"
        alignItems="center"
        justifyContent="center"
        borderWidth={2}
        borderColor={isOwed ? '$green' : '$pink'}
      >
        <Text fontSize={16} fontWeight="600" color="$color">
          {initials}
        </Text>
      </View>
      <YStack alignItems="center" gap={2}>
        <Text fontSize={12} fontWeight="500" color="$color" numberOfLines={1}>
          {name}
        </Text>
        <Text 
          fontSize={11} 
          fontWeight="600" 
          color={isOwed ? '$green' : '$pink'}
        >
          {isOwed ? '+' : '-'}{amount}
        </Text>
      </YStack>
    </YStack>
  </Pressable>
)

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
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      <YStack 
        paddingTop={insets.top + 16}
        paddingHorizontal={20}
        gap={24}
      >
        {/* ======== HEADER ======== */}
        <XStack 
          justifyContent="space-between" 
          alignItems="center"
        >
          <YStack gap={2}>
            <Text fontSize={14} color="$colorMuted" fontWeight="500">
              Good evening
            </Text>
            <Text
              fontSize={28}
              fontWeight="600"
              letterSpacing={-1}
              color="$color"
            >
              Tino
            </Text>
          </YStack>
          
          {/* Profile Avatar */}
          <XStack alignItems="center" gap={12}>
            <Pressable>
              <View
                width={40}
                height={40}
                borderRadius={12}
                backgroundColor="$cardBg"
                alignItems="center"
                justifyContent="center"
                borderWidth={1}
                borderColor="$cardBorder"
              >
                <Bell size={20} color="$colorMuted" strokeWidth={1.8} />
              </View>
            </Pressable>
            <Pressable>
              <View
                width={44}
                height={44}
                borderRadius={14}
                backgroundColor="$cardBg"
                borderWidth={1}
                borderColor="$cardBorder"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize={14} fontWeight="700" color="$color">TM</Text>
              </View>
            </Pressable>
          </XStack>
        </XStack>

        {/* ======== BALANCE CARD ======== */}
        <BalanceCard />

        {/* ======== EXCHANGE RATE ======== */}
        <ExchangeRateCard />

        {/* ======== ACTIVE SPLITS ======== */}
        <YStack>
          <SectionHeader title="Active Splits" action="See All" onAction={() => router.push('/explore')} />
          <YStack gap={10}>
            <ActiveSplitCard 
              title="Lunch Split"
              venue="Nando's"
              amount="$47.50"
              members={3}
              isLive
            />
            <ActiveSplitCard 
              title="Weekend Trip"
              venue="Nyanga"
              amount="$125.00"
              members={5}
            />
          </YStack>
        </YStack>

        {/* ======== FRIENDS ======== */}
        <YStack>
          <SectionHeader title="Friends" action="Manage" />
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
          >
            <FriendAvatar initials="TM" name="Tendai" amount="$47.50" />
            <FriendAvatar initials="RK" name="Rudo" amount="$32.00" isOwed />
            <FriendAvatar initials="SM" name="Shami" amount="$15.25" />
            <FriendAvatar initials="NK" name="Nyasha" amount="$28.00" isOwed />
            <FriendAvatar initials="DM" name="Danai" amount="$12.50" />
          </ScrollView>
        </YStack>

      </YStack>
    </ScrollView>
  )
}
