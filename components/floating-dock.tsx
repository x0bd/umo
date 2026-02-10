import { useThemeMode } from '@/providers/theme-mode'
import { Activity, Home, Plus, Settings } from '@tamagui/lucide-icons'
import * as Haptics from 'expo-haptics'
import { router, usePathname } from 'expo-router'
import { Pressable } from 'react-native'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View, XStack } from 'tamagui'

// ============================================
// 間 — DOCK ITEM
// Icon-only. State through weight, not noise.
// ============================================
interface DockItemProps {
  icon: typeof Home
  isActive: boolean
  onPress: () => void
}

const SPRING = { damping: 18, stiffness: 300 }

const DockItem = ({ icon: Icon, isActive, onPress }: DockItemProps) => {
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <Pressable
      onPressIn={() => {
        scale.value = withSpring(0.85, SPRING)
      }}
      onPressOut={() => {
        scale.value = withSpring(1, SPRING)
      }}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        onPress()
      }}
      hitSlop={8}
    >
      <Animated.View style={animatedStyle}>
        <View alignItems="center" justifyContent="center" width={44} height={44}>
          <Icon
            size={21}
            color={isActive ? '$color' : '$colorMuted'}
            strokeWidth={isActive ? 1.9 : 1.5}
          />
          {/* Active indicator — a single quiet dot */}
          {isActive && (
            <View
              position="absolute"
              bottom={4}
              width={3}
              height={3}
              borderRadius={1.5}
              backgroundColor="$accent"
            />
          )}
        </View>
      </Animated.View>
    </Pressable>
  )
}

// ============================================
// 間 — ADD BUTTON
// A circle that belongs. No glow, no pulse.
// It earns attention through form alone.
// ============================================
const AddButton = () => {
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <Pressable
      onPressIn={() => {
        scale.value = withSpring(0.88, SPRING)
      }}
      onPressOut={() => {
        scale.value = withSpring(1, SPRING)
      }}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        router.push('/modal')
      }}
      hitSlop={4}
    >
      <Animated.View style={animatedStyle}>
        <View
          width={40}
          height={40}
          borderRadius={9999}
          backgroundColor="$accent"
          alignItems="center"
          justifyContent="center"
        >
          <Plus size={18} color="white" strokeWidth={2} />
        </View>
      </Animated.View>
    </Pressable>
  )
}

// ============================================
// 間 — THE DOCK
// A pill. Four items. Generous space.
// Depth through a single diffuse shadow.
// ============================================
export function FloatingDock() {
  const insets = useSafeAreaInsets()
  const pathname = usePathname()
  const { isDark } = useThemeMode()

  const isHome = pathname === '/' || pathname === '/index'
  const isActivity = pathname === '/explore'
  const isSettings = pathname === '/settings'

  return (
    <View
      position="absolute"
      bottom={insets.bottom + 8}
      left={0}
      right={0}
      alignItems="center"
      pointerEvents="box-none"
    >
      <XStack
        backgroundColor="$dockBg"
        borderRadius={9999}
        paddingHorizontal={24}
        paddingVertical={12}
        gap={28}
        alignItems="center"
        justifyContent="center"
        shadowColor={isDark ? '#000' : '#71717A'}
        shadowOffset={{ width: 0, height: 4 }}
        shadowOpacity={isDark ? 0.12 : 0.06}
        shadowRadius={20}
        elevation={8}
      >
        <DockItem
          icon={Home}
          isActive={isHome}
          onPress={() => router.push('/')}
        />
        <DockItem
          icon={Activity}
          isActive={isActivity}
          onPress={() => router.push('/explore')}
        />
        <AddButton />
        <DockItem
          icon={Settings}
          isActive={isSettings}
          onPress={() => router.push('/settings')}
        />
      </XStack>
    </View>
  )
}
