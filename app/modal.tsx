import { router } from 'expo-router'
import { Pressable } from 'react-native'
import { YStack, XStack, Text, View } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Haptics from 'expo-haptics'
import {
  X,
  ArrowRight,
  Receipt,
  Camera,
  Users,
  Zap,
  Plus,
} from '@tamagui/lucide-icons'
import { useThemeMode } from '@/providers/theme-mode'

// ============================================
// ACTION ROW
// ============================================
const ActionRow = ({
  icon: Icon,
  title,
  description,
  onPress,
  accentBg = false,
}: {
  icon: typeof Receipt
  title: string
  description: string
  onPress: () => void
  accentBg?: boolean
}) => {
  const { isDark } = useThemeMode()

  return (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        onPress()
      }}
    >
      <XStack
        backgroundColor={accentBg ? '$cardTint' : '$cardBg'}
        borderRadius={20}
        padding={18}
        alignItems="center"
        gap={14}
        borderWidth={1}
        borderColor={accentBg ? '$pink' : '$cardBorder'}
      >
        <View
          width={44}
          height={44}
          borderRadius={14}
          backgroundColor={accentBg ? '$pink' : '$backgroundHover'}
          alignItems="center"
          justifyContent="center"
        >
          <Icon
            size={20}
            color={accentBg ? '#FFFFFF' : '$colorMuted'}
            strokeWidth={2}
          />
        </View>
        <YStack flex={1} gap={2}>
          <Text
            fontSize={16}
            fontWeight="600"
            letterSpacing={-0.3}
            color="$color"
          >
            {title}
          </Text>
          <Text fontSize={13} color="$colorMuted" lineHeight={18}>
            {description}
          </Text>
        </YStack>
        <ArrowRight size={18} color="$colorMuted" strokeWidth={2} opacity={0.5} />
      </XStack>
    </Pressable>
  )
}

// ============================================
// MAIN MODAL
// ============================================
export default function ModalScreen() {
  const insets = useSafeAreaInsets()

  const close = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    router.back()
  }

  return (
    <YStack flex={1} backgroundColor="$background">
      <YStack
        paddingTop={insets.top + 16}
        paddingHorizontal={20}
        paddingBottom={insets.bottom + 20}
        gap={20}
        maxWidth={520}
        marginHorizontal="auto"
        width="100%"
      >
        {/* Header */}
        <XStack alignItems="center" justifyContent="space-between">
          <YStack gap={2}>
            <Text
              fontSize={12}
              fontWeight="700"
              letterSpacing={1}
              textTransform="uppercase"
              color="$colorMuted"
            >
              New Split
            </Text>
            <Text
              fontSize={28}
              fontWeight="500"
              letterSpacing={-1}
              color="$color"
              lineHeight={30}
            >
              Start a Bill
            </Text>
          </YStack>

          <Pressable onPress={close}>
            <View
              width={40}
              height={40}
              borderRadius={14}
              backgroundColor="$cardBg"
              borderWidth={1}
              borderColor="$cardBorder"
              alignItems="center"
              justifyContent="center"
            >
              <X size={18} color="$colorMuted" strokeWidth={2.5} />
            </View>
          </Pressable>
        </XStack>

        {/* Actions */}
        <YStack gap={10}>
          <ActionRow
            icon={Receipt}
            title="Quick Add"
            description="Manually add items and amounts"
            onPress={() => {
              router.back()
              setTimeout(() => router.push('/session/new'), 100)
            }}
            accentBg
          />
          <ActionRow
            icon={Camera}
            title="Scan Receipt"
            description="Use your camera to capture the bill"
            onPress={() => {
              router.back()
              setTimeout(() => router.push('/session/scan'), 100)
            }}
          />
          <ActionRow
            icon={Users}
            title="Join a Split"
            description="Enter a code from a friend's session"
            onPress={close}
          />
        </YStack>

        {/* Divider */}
        <View height={1} backgroundColor="$borderColorSubtle" />

        {/* Recent */}
        <YStack gap={12}>
          <Text
            fontSize={13}
            fontWeight="700"
            letterSpacing={0.8}
            textTransform="uppercase"
            color="$colorMuted"
          >
            Quick Resume
          </Text>

          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
              router.back()
              setTimeout(() => router.push('/session/lunch-split'), 100)
            }}
          >
            <XStack
              backgroundColor="$cardBg"
              borderRadius={20}
              padding={18}
              alignItems="center"
              gap={14}
              borderWidth={1}
              borderColor="$cardBorder"
            >
              <View
                width={44}
                height={44}
                borderRadius={14}
                backgroundColor="$pink"
                alignItems="center"
                justifyContent="center"
              >
                <Zap size={20} color="#FFFFFF" strokeWidth={2} />
              </View>
              <YStack flex={1} gap={2}>
                <XStack alignItems="center" gap={8}>
                  <Text
                    fontSize={16}
                    fontWeight="600"
                    letterSpacing={-0.3}
                    color="$color"
                  >
                    Lunch Split
                  </Text>
                  <View
                    backgroundColor="$pink"
                    paddingHorizontal={6}
                    paddingVertical={2}
                    borderRadius={4}
                  >
                    <Text
                      fontSize={9}
                      fontWeight="700"
                      color="#FFF"
                      letterSpacing={0.5}
                    >
                      LIVE
                    </Text>
                  </View>
                </XStack>
                <Text fontSize={13} color="$colorMuted">
                  Nando's · 3 people · $47.50
                </Text>
              </YStack>
              <ArrowRight
                size={18}
                color="$colorMuted"
                strokeWidth={2}
                opacity={0.5}
              />
            </XStack>
          </Pressable>
        </YStack>

        {/* Close Button */}
        <Pressable onPress={close}>
          <XStack
            backgroundColor="$backgroundHover"
            borderRadius={20}
            paddingVertical={16}
            paddingHorizontal={18}
            alignItems="center"
            justifyContent="center"
            borderWidth={1}
            borderColor="$borderColorSubtle"
          >
            <Text fontSize={15} fontWeight="600" letterSpacing={-0.2} color="$color">
              Cancel
            </Text>
          </XStack>
        </Pressable>
      </YStack>
    </YStack>
  )
}
