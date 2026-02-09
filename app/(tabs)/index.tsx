import { useState } from 'react'
import { ScrollView, YStack, XStack, Text, View, styled } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Platform } from 'react-native'
import { 
  ArrowUpRight,
  ArrowDownLeft,
  ChevronRight,
  Bell,
  Plus,
  Receipt,
  Wallet,
  RefreshCw,
} from '@tamagui/lucide-icons'

// ============================================
// SPLTR-INSPIRED COMPONENTS
// Dark bg + Pink card + Grey card + Flow lines
// ============================================

// --- Vertical Pill Label ---
const VerticalPill = ({ label, variant = 'dark' }: { label: string; variant?: 'dark' | 'pink' | 'grey' }) => {
  const bg = variant === 'pink' 
    ? 'rgba(69, 0, 16, 0.15)' 
    : variant === 'grey' 
      ? 'rgba(0,0,0,0.08)' 
      : '#1A1A1A'
  const color = variant === 'pink' 
    ? '#450010' 
    : variant === 'grey' 
      ? '#111111' 
      : '#999999'

  return (
    <YStack 
      width={24} 
      alignItems="center" 
      justifyContent="flex-start"
      flexShrink={0}
      marginRight={8}
    >
      <View
        style={{
          // @ts-ignore - web-only CSS
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
          color={color}
          backgroundColor={bg}
          paddingHorizontal={4}
          paddingVertical={12}
          borderRadius={100}
          // @ts-ignore
          whiteSpace="nowrap"
        >
          {label}
        </Text>
      </View>
    </YStack>
  )
}

// --- Flow Step (vertical line + arrow + content) ---
const FlowStep = ({ 
  label, 
  value, 
  isLast = false, 
  isTotal = false,
  variant = 'dark',
}: { 
  label: string
  value: string
  isLast?: boolean
  isTotal?: boolean
  variant?: 'dark' | 'pink' | 'grey'
}) => {
  const lineColor = variant === 'pink' 
    ? 'rgba(69,0,16,0.3)' 
    : variant === 'grey' 
      ? 'rgba(0,0,0,0.2)' 
      : 'rgba(255,255,255,0.2)'
  const labelColor = variant === 'pink' 
    ? 'rgba(69,0,16,0.6)' 
    : variant === 'grey' 
      ? '#555555' 
      : 'rgba(255,255,255,0.5)'
  const valueColor = variant === 'pink' 
    ? '#450010' 
    : variant === 'grey' 
      ? '#111111' 
      : '#FFFFFF'

  return (
    <XStack position="relative" paddingBottom={isLast ? 0 : 24}>
      {/* Vertical line */}
      {!isLast && (
        <View
          position="absolute"
          left={0}
          top={6}
          bottom={-6}
          width={1}
          backgroundColor={lineColor}
        >
          {/* Arrow marker */}
          <View
            position="absolute"
            bottom={0}
            left={-3}
            width={7}
            height={7}
            borderRightWidth={1}
            borderBottomWidth={1}
            borderColor={lineColor}
            style={{ transform: [{ rotate: '45deg' }] }}
          />
        </View>
      )}
      
      <YStack paddingLeft={20} flex={1}>
        <Text
          fontSize={12}
          fontWeight="600"
          textTransform="uppercase"
          letterSpacing={0.5}
          color={labelColor}
          marginBottom={2}
        >
          {label}
        </Text>
        <Text
          fontSize={isTotal ? 36 : 20}
          fontWeight={isTotal ? '600' : '500'}
          letterSpacing={isTotal ? -1.5 : -0.5}
          color={valueColor}
          lineHeight={isTotal ? 40 : 26}
        >
          {value}
        </Text>
      </YStack>
    </XStack>
  )
}

// --- Split Member Item ---
const SplitItem = ({ 
  initials, 
  name, 
  desc, 
  amount, 
  isPaid,
  avatarBg = '#D1D1D1',
}: { 
  initials: string
  name: string
  desc: string
  amount: string
  isPaid: boolean
  avatarBg?: string
}) => (
  <XStack
    justifyContent="space-between"
    alignItems="center"
    paddingVertical={14}
    borderBottomWidth={1}
    borderBottomColor="rgba(0,0,0,0.08)"
    pressStyle={{ opacity: 0.7 }}
  >
    <XStack alignItems="center" gap={12}>
      <View
        width={32}
        height={32}
        borderRadius={16}
        backgroundColor={avatarBg}
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize={11} fontWeight="600" color="#111">
          {initials}
        </Text>
      </View>
      <YStack>
        <Text fontSize={15} fontWeight="500" color="#111111" letterSpacing={-0.2}>
          {name}
        </Text>
        <Text fontSize={12} color="#555555" opacity={0.8}>
          {desc}
        </Text>
      </YStack>
    </XStack>
    <YStack alignItems="flex-end" gap={2}>
      <Text fontSize={15} fontWeight="600" color="#111111">
        {amount}
      </Text>
      {isPaid ? (
        <View 
          backgroundColor="#000" 
          paddingHorizontal={6} 
          paddingVertical={2} 
          borderRadius={4}
        >
          <Text fontSize={9} fontWeight="700" letterSpacing={0.5} textTransform="uppercase" color="#FFF">
            Paid
          </Text>
        </View>
      ) : (
        <Text fontSize={9} fontWeight="700" letterSpacing={0.5} textTransform="uppercase" color="#111" opacity={0.4}>
          Pending
        </Text>
      )}
    </YStack>
  </XStack>
)

// --- Connector Line (between cards) ---
const ConnectorLine = () => (
  <View marginLeft={54} height={20} position="relative">
    <View width={1} height={20} backgroundColor="#333333" />
    <View
      position="absolute"
      bottom={0}
      left={-3}
      width={7}
      height={7}
      borderRightWidth={1}
      borderBottomWidth={1}
      borderColor="#333333"
      style={{ transform: [{ rotate: '45deg' }] }}
    />
  </View>
)

// --- Mock Data ---
const members = [
  { id: 1, initials: 'Y', name: 'You', desc: 'Payer', amount: '$47.50', isPaid: true, avatarBg: '#000' },
  { id: 2, initials: 'TM', name: 'Tendai M.', desc: 'Shared pizza', amount: '$47.50', isPaid: false, avatarBg: '#D1D1D1' },
  { id: 3, initials: 'RK', name: 'Rudo K.', desc: 'Drinks only', amount: '$47.50', isPaid: false, avatarBg: '#C4C4C4' },
]

// ============================================
// MAIN SCREEN
// ============================================
export default function HomeScreen() {
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
        {/* ======== HEADER ======== */}
        <XStack 
          justifyContent="space-between" 
          alignItems="center"
          paddingBottom={12}
        >
          <Text
            fontSize={32}
            fontWeight="500"
            letterSpacing={-1.5}
            color="#FFFFFF"
            lineHeight={32}
          >
            Check Split
          </Text>
          <Text fontSize={14} color="#666666" letterSpacing={-0.2}>
            #4021
          </Text>
        </XStack>

        {/* ======== PINK CARD — Balance/Receipt ======== */}
        <XStack width="100%">
          <VerticalPill label="Balance" variant="dark" />
          
          <YStack
            flex={1}
            backgroundColor="#FF1A55"
            borderRadius={28}
            padding={24}
            minHeight={240}
          >
            <Text 
              fontSize={14} 
              fontWeight="500" 
              color="#450010" 
              opacity={0.7}
              marginBottom={4}
            >
              Total Amount
            </Text>
            <Text 
              fontFamily="$mono"
              fontSize={56} 
              fontWeight="500" 
              color="#450010" 
              letterSpacing={-3}
              lineHeight={52}
              marginBottom={24}
            >
              $142.50
            </Text>

            <YStack marginTop="auto">
              <FlowStep 
                label="Currency" 
                value="USD → ZiG" 
                variant="pink"
              />
              <FlowStep 
                label="Rate" 
                value="1 USD = 13.85 ZiG" 
                variant="pink"
              />
              <FlowStep 
                label="In ZiG" 
                value="ZiG 1,973.63" 
                isLast 
                variant="pink"
              />
            </YStack>
          </YStack>
        </XStack>

        {/* ======== CONNECTOR ======== */}
        <ConnectorLine />

        {/* ======== GREY CARD — Members/Split ======== */}
        <XStack width="100%" flex={1}>
          <VerticalPill label="Members" variant="grey" />

          <YStack
            flex={1}
            backgroundColor="#E6E6E6"
            borderRadius={28}
            padding={24}
          >
            <YStack gap={0}>
              {members.map((member) => (
                <SplitItem
                  key={member.id}
                  initials={member.initials}
                  name={member.name}
                  desc={member.desc}
                  amount={member.amount}
                  isPaid={member.isPaid}
                  avatarBg={member.avatarBg}
                />
              ))}
            </YStack>
          </YStack>
        </XStack>

        {/* ======== EXCHANGE RATE PILL ======== */}
        <XStack
          backgroundColor="#0D0D0D"
          borderRadius={16}
          padding={16}
          alignItems="center"
          justifyContent="space-between"
          borderWidth={1}
          borderColor="rgba(255,255,255,0.06)"
        >
          <YStack gap={2}>
            <Text fontSize={12} fontWeight="600" textTransform="uppercase" letterSpacing={0.5} color="rgba(255,255,255,0.4)">
              Exchange Rate
            </Text>
            <XStack alignItems="baseline" gap={6}>
              <Text fontSize={14} fontWeight="500" color="rgba(255,255,255,0.5)">1 USD =</Text>
              <Text fontFamily="$mono" fontSize={24} fontWeight="700" color="#FFFFFF" letterSpacing={-1}>
                13.85
              </Text>
              <Text fontSize={14} fontWeight="600" color="#FF1A55">ZiG</Text>
            </XStack>
          </YStack>
          <View
            width={40}
            height={40}
            borderRadius={12}
            backgroundColor="rgba(255,255,255,0.06)"
            alignItems="center"
            justifyContent="center"
            pressStyle={{ opacity: 0.6, scale: 0.95 }}
          >
            <RefreshCw size={18} color="#666666" strokeWidth={2} />
          </View>
        </XStack>

        {/* ======== CTA BUTTON ======== */}
        <XStack
          backgroundColor="#FFFFFF"
          borderRadius={50}
          paddingVertical={20}
          paddingHorizontal={24}
          alignItems="center"
          justifyContent="space-between"
          pressStyle={{ scale: 0.98, opacity: 0.9 }}
        >
          <Text fontSize={16} fontWeight="600" color="#000000" letterSpacing={-0.5}>
            Request Payments
          </Text>
          <View
            width={28}
            height={28}
            borderRadius={14}
            backgroundColor="#000000"
            alignItems="center"
            justifyContent="center"
          >
            <ArrowUpRight size={16} color="#FFFFFF" strokeWidth={2.5} />
          </View>
        </XStack>

      </YStack>
    </ScrollView>
  )
}
