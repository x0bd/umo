import { router } from 'expo-router'
import { Pressable } from 'react-native'
import { YStack, XStack, Text, View } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Haptics from 'expo-haptics'
import { X, ArrowRight, Sparkles } from '@tamagui/lucide-icons'

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
        gap={16}
        maxWidth={520}
        marginHorizontal="auto"
        width="100%"
      >
        {/* Header */}
        <XStack alignItems="center" justifyContent="space-between">
          <YStack gap={2}>
            <Text fontSize={12} fontWeight="700" letterSpacing={1} textTransform="uppercase" color="$colorMuted">
              Modal
            </Text>
            <Text fontSize={28} fontWeight="500" letterSpacing={-1} color="$color" lineHeight={30}>
              Quick Actions
            </Text>
          </YStack>

          <Pressable onPress={close}>
            <View
              width={40}
              height={40}
              borderRadius={14}
              backgroundColor="$surface"
              borderWidth={1}
              borderColor="$borderColorSubtle"
              alignItems="center"
              justifyContent="center"
              pressStyle={{ opacity: 0.8, scale: 0.98 }}
            >
              <X size={18} color="$colorMuted" strokeWidth={2.5} />
            </View>
          </Pressable>
        </XStack>

        {/* Content Card */}
        <YStack
          backgroundColor="$surface"
          borderRadius={28}
          padding={24}
          borderWidth={1}
          borderColor="$borderColorSubtle"
          gap={16}
        >
          <XStack alignItems="center" gap={12}>
            <View
              width={44}
              height={44}
              borderRadius={16}
              backgroundColor="$pink"
              alignItems="center"
              justifyContent="center"
            >
              <Sparkles size={20} color="#FFFFFF" strokeWidth={2.5} />
            </View>
            <YStack>
              <Text fontSize={16} fontWeight="600" letterSpacing={-0.3} color="$color">
                UI-only mode
              </Text>
              <Text fontSize={13} color="$colorMuted" lineHeight={18}>
                This screen is purely for design polish. No backend work.
              </Text>
            </YStack>
          </XStack>

          <YStack
            borderTopWidth={1}
            borderTopColor="$borderColorSubtle"
            paddingTop={16}
            gap={12}
          >
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                router.replace('/(tabs)')
              }}
            >
              <XStack
                backgroundColor="$pink"
                borderRadius={20}
                paddingVertical={16}
                paddingHorizontal={18}
                alignItems="center"
                justifyContent="space-between"
                pressStyle={{ opacity: 0.9, scale: 0.99 }}
              >
                <Text fontSize={15} fontWeight="700" letterSpacing={-0.2} color="$pinkText">
                  Go to Home
                </Text>
                <View
                  width={28}
                  height={28}
                  borderRadius={14}
                  backgroundColor="rgba(69,0,16,0.15)"
                  alignItems="center"
                  justifyContent="center"
                >
                  <ArrowRight size={16} color="$pinkText" strokeWidth={2.5} />
                </View>
              </XStack>
            </Pressable>

            <Pressable onPress={close}>
              <XStack
                backgroundColor="$backgroundHover"
                borderRadius={20}
                paddingVertical={16}
                paddingHorizontal={18}
                alignItems="center"
                justifyContent="space-between"
                borderWidth={1}
                borderColor="$borderColorSubtle"
                pressStyle={{ opacity: 0.9, scale: 0.99 }}
              >
                <Text fontSize={15} fontWeight="600" letterSpacing={-0.2} color="$color">
                  Close
                </Text>
                <Text fontSize={14} fontWeight="600" color="$colorMuted">
                  Esc
                </Text>
              </XStack>
            </Pressable>
          </YStack>
        </YStack>
      </YStack>
    </YStack>
  )
}
