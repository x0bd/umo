import { ChevronRight } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Pressable } from 'react-native'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated'
import { Text, XStack, YStack } from 'tamagui'

export function Collapsible({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const rotation = useSharedValue(0)

  const arrowStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }))

  const handlePress = () => {
    setIsOpen(!isOpen)
    rotation.value = withTiming(isOpen ? 0 : 90, { duration: 200 })
  }

  return (
    <YStack>
      <Pressable onPress={handlePress}>
        <XStack alignItems="center" gap={8} paddingVertical={8}>
          <Animated.View style={arrowStyle}>
            <ChevronRight size={18} color="$colorMuted" />
          </Animated.View>
          <Text fontSize={15} fontWeight="600" color="$color">
            {title}
          </Text>
        </XStack>
      </Pressable>
      {isOpen && (
        <YStack paddingLeft={26} paddingTop={4}>
          {children}
        </YStack>
      )}
    </YStack>
  )
}
