import { Pressable } from 'react-native'
import { XStack, View } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Home, Activity, Sun, Moon, Plus } from '@tamagui/lucide-icons'
import { usePathname, router } from 'expo-router'
import * as Haptics from 'expo-haptics'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated'
import { useThemeMode } from '@/providers/theme-mode'

// ============================================
// ANIMATED DOCK ITEM
// ============================================
interface DockItemProps {
  icon: typeof Home
  isActive: boolean
  onPress: () => void
}

const DockItem = ({ icon: Icon, isActive, onPress }: DockItemProps) => {
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const handlePress = () => {
    scale.value = withSequence(withSpring(0.85), withSpring(1))
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onPress()
  }

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={animatedStyle}>
        <View
          width={48}
          height={48}
          borderRadius={14}
          backgroundColor={isActive ? '$accentSoft' : 'transparent'}
          alignItems="center"
          justifyContent="center"
          borderWidth={isActive ? 1 : 0}
          borderColor={isActive ? '$featureBorder' : 'transparent'}
        >
          <Icon
            size={22}
            color={isActive ? '$accent' : '$colorMuted'}
            strokeWidth={isActive ? 2.2 : 1.8}
          />
        </View>
      </Animated.View>
    </Pressable>
  )
}

// ============================================
// ADD BUTTON
// ============================================
const AddButton = () => {
  const scale = useSharedValue(1)
  const rotation = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }))

  const handlePress = () => {
    scale.value = withSequence(withSpring(0.9), withSpring(1))
    rotation.value = withSequence(withSpring(90), withSpring(0))
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    router.push('/modal')
  }

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={animatedStyle}>
        <View
          width={52}
          height={52}
          borderRadius={16}
          backgroundColor="$accent"
          alignItems="center"
          justifyContent="center"
          shadowColor="$accent"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.3}
          shadowRadius={12}
          elevation={8}
        >
          <Plus size={24} color="$accentText" strokeWidth={2.5} />
        </View>
      </Animated.View>
    </Pressable>
  )
}

// ============================================
// THEME TOGGLE
// ============================================
const ThemeToggle = () => {
  const { isDark, toggle } = useThemeMode()
  const rotation = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }))

  const handlePress = () => {
    rotation.value = withSpring(rotation.value + 180)
    Haptics.selectionAsync()
    toggle()
  }

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={animatedStyle}>
        <View
          width={48}
          height={48}
          borderRadius={14}
          backgroundColor="$backgroundHover"
          borderWidth={1}
          borderColor="$borderColorSoft"
          alignItems="center"
          justifyContent="center"
        >
          {isDark ? (
            <Sun size={20} color="$colorMuted" strokeWidth={1.8} />
          ) : (
            <Moon size={20} color="$colorMuted" strokeWidth={1.8} />
          )}
        </View>
      </Animated.View>
    </Pressable>
  )
}

// ============================================
// MAIN DOCK
// ============================================
export function FloatingDock() {
  const insets = useSafeAreaInsets()
  const pathname = usePathname()
  const { isDark } = useThemeMode()

  const isHome = pathname === '/' || pathname === '/index'
  const isActivity = pathname === '/explore'

  return (
    <View
      position="absolute"
      bottom={insets.bottom + 16}
      left={20}
      right={20}
      alignItems="center"
    >
      <XStack
        backgroundColor="$dockBg"
        borderRadius={22}
        paddingHorizontal={8}
        paddingVertical={8}
        gap={4}
        alignItems="center"
        justifyContent="center"
        borderWidth={1}
        borderColor="$dockBorder"
        shadowColor="#000"
        shadowOffset={{ width: 0, height: 8 }}
        shadowOpacity={isDark ? 0.4 : 0.12}
        shadowRadius={24}
        elevation={16}
        // Glass effect
        style={{
          // @ts-ignore
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <DockItem icon={Home} isActive={isHome} onPress={() => router.push('/')} />
        <AddButton />
        <DockItem icon={Activity} isActive={isActivity} onPress={() => router.push('/explore')} />
        <ThemeToggle />
      </XStack>
    </View>
  )
}
