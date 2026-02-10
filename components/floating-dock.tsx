import { Pressable } from 'react-native'
import { XStack, YStack, Text, View } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Home, Activity, Plus, Settings } from '@tamagui/lucide-icons'
import { usePathname, router } from 'expo-router'
import * as Haptics from 'expo-haptics'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  interpolate,
  Extrapolation,
  withRepeat,
} from 'react-native-reanimated'
import { useThemeMode } from '@/providers/theme-mode'
import { useEffect } from 'react'

// ============================================
// ANIMATED DOCK ITEM
// ============================================
interface DockItemProps {
  icon: typeof Home
  label: string
  isActive: boolean
  onPress: () => void
  showDot?: boolean
}

const DockItem = ({ icon: Icon, label, isActive, onPress, showDot }: DockItemProps) => {
  const scale = useSharedValue(1)
  const translateY = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
  }))

  const handlePressIn = () => {
    scale.value = withSpring(0.9, { damping: 15 })
    translateY.value = withSpring(-2, { damping: 15 })
  }

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 })
    translateY.value = withSpring(0, { damping: 15 })
  }

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onPress()
  }

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
    >
      <Animated.View style={animatedStyle}>
        <YStack alignItems="center" gap={4} minWidth={56}>
          <View
            width={44}
            height={44}
            borderRadius={14}
            backgroundColor={isActive ? '$accentSoft' : 'transparent'}
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <Icon
              size={22}
              color={isActive ? '$accent' : '$colorMuted'}
              strokeWidth={isActive ? 2.2 : 1.7}
            />
            
            {/* Active indicator dot */}
            {isActive && (
              <View
                position="absolute"
                bottom={-6}
                width={4}
                height={4}
                borderRadius={2}
                backgroundColor="$accent"
              />
            )}
            
            {/* Notification dot */}
            {showDot && !isActive && (
              <View
                position="absolute"
                top={8}
                right={8}
                width={6}
                height={6}
                borderRadius={3}
                backgroundColor="$accent"
              />
            )}
          </View>
          
          <Text
            fontSize={10}
            fontWeight={isActive ? '600' : '500'}
            color={isActive ? '$accent' : '$colorFaint'}
            letterSpacing={0.2}
          >
            {label}
          </Text>
        </YStack>
      </Animated.View>
    </Pressable>
  )
}

// ============================================
// FLOATING ADD BUTTON
// ============================================
const AddButton = () => {
  const scale = useSharedValue(1)
  const rotation = useSharedValue(0)
  const glowOpacity = useSharedValue(0.3)

  // Subtle pulse animation
  useEffect(() => {
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.5, { duration: 1500 }),
        withTiming(0.3, { duration: 1500 })
      ),
      -1,
      true
    )
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }))

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }))

  const handlePressIn = () => {
    scale.value = withSpring(0.92, { damping: 12 })
  }

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 12 })
  }

  const handlePress = () => {
    rotation.value = withSequence(
      withSpring(90, { damping: 12 }),
      withSpring(0, { damping: 12 })
    )
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    router.push('/modal')
  }

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
    >
      <View position="relative" alignItems="center" justifyContent="center">
        {/* Glow ring */}
        <Animated.View
          style={[
            {
              position: 'absolute',
              width: 64,
              height: 64,
              borderRadius: 20,
              backgroundColor: '#E85D75',
            },
            glowStyle,
          ]}
        />
        
        <Animated.View style={animatedStyle}>
          <View
            width={56}
            height={56}
            borderRadius={18}
            backgroundColor="$accent"
            alignItems="center"
            justifyContent="center"
            shadowColor="#E85D75"
            shadowOffset={{ width: 0, height: 6 }}
            shadowOpacity={0.4}
            shadowRadius={16}
            elevation={12}
          >
            <Plus size={26} color="$accentText" strokeWidth={2.5} />
          </View>
        </Animated.View>
      </View>
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
  const isSettings = pathname === '/settings'

  return (
    <View
      position="absolute"
      bottom={insets.bottom + 12}
      left={16}
      right={16}
      alignItems="center"
    >
      <XStack
        backgroundColor="$dockBg"
        borderRadius={28}
        paddingHorizontal={12}
        paddingVertical={10}
        gap={6}
        alignItems="center"
        justifyContent="center"
        borderWidth={1}
        borderColor="$dockBorder"
        shadowColor={isDark ? '#000' : '#71717A'}
        shadowOffset={{ width: 0, height: 12 }}
        shadowOpacity={isDark ? 0.5 : 0.15}
        shadowRadius={32}
        elevation={20}
        style={{
          // @ts-ignore - Glass effect
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        {/* Left section */}
        <XStack gap={2}>
          <DockItem
            icon={Home}
            label="Home"
            isActive={isHome}
            onPress={() => router.push('/')}
          />
          <DockItem
            icon={Activity}
            label="Activity"
            isActive={isActivity}
            onPress={() => router.push('/explore')}
            showDot
          />
        </XStack>

        {/* Center Add Button */}
        <View marginHorizontal={8}>
          <AddButton />
        </View>

        {/* Right section */}
        <XStack gap={2}>
          <DockItem
            icon={Settings}
            label="Settings"
            isActive={isSettings}
            onPress={() => router.push('/settings')}
          />
        </XStack>
      </XStack>
      
      {/* Home indicator line (iOS style) */}
      <View
        width={134}
        height={5}
        borderRadius={3}
        backgroundColor={isDark ? '$colorGhost' : '$colorFaint'}
        marginTop={8}
        opacity={0.5}
      />
    </View>
  )
}
