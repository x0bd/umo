import { useAuth } from '@/providers/auth'
import { useThemeMode } from '@/providers/theme-mode'
import {
    ArrowLeft,
    Bell,
    ChevronRight,
    CreditCard,
    Globe,
    Heart,
    HelpCircle,
    LogOut,
    Moon,
    Palette,
    Shield,
    Smartphone,
    Sun,
    User,
} from '@tamagui/lucide-icons'
import * as Haptics from 'expo-haptics'
import { router } from 'expo-router'
import { Image, Pressable, Switch } from 'react-native'
import Animated, {
    FadeInDown,
    FadeInUp,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScrollView, Text, View, XStack, YStack } from 'tamagui'

// Avatar
const AVATAR_URL = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces'

// ============================================
// ANIMATED COMPONENTS
// ============================================
const AnimatedYStack = Animated.createAnimatedComponent(YStack)
const AnimatedXStack = Animated.createAnimatedComponent(XStack)

// ============================================
// 間 — SETTINGS ROW
// ============================================
const SettingsRow = ({
  icon: Icon,
  label,
  value,
  onPress,
  isDestructive = false,
  showChevron = true,
  accentIcon = false,
  delay = 0,
}: {
  icon: typeof User
  label: string
  value?: string
  onPress?: () => void
  isDestructive?: boolean
  showChevron?: boolean
  accentIcon?: boolean
  delay?: number
}) => {
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <AnimatedXStack
      entering={FadeInDown.delay(delay).springify()}
      style={animatedStyle}
    >
      <Pressable
        onPressIn={() => {
          scale.value = withSpring(0.98, { damping: 15 })
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 15 })
        }}
        onPress={() => {
          Haptics.selectionAsync()
          onPress?.()
        }}
        style={{ flex: 1 }}
        disabled={!onPress}
      >
        <XStack
          paddingVertical={14}
          paddingHorizontal={4}
          alignItems="center"
          gap={14}
        >
          <Icon
            size={18}
            color={accentIcon ? '$accent' : isDestructive ? '$error' : '$colorMuted'}
            strokeWidth={1.8}
          />

          <YStack flex={1}>
            <Text
              fontSize={15}
              fontWeight="500"
              color={isDestructive ? '$error' : '$color'}
              letterSpacing={-0.2}
            >
              {label}
            </Text>
          </YStack>

          {value && (
            <Text fontSize={14} color="$colorMuted">
              {value}
            </Text>
          )}

          {showChevron && onPress && (
            <ChevronRight size={18} color="$colorGhost" strokeWidth={2} />
          )}
        </XStack>
      </Pressable>
    </AnimatedXStack>
  )
}

// ============================================
// 間 — TOGGLE ROW
// ============================================
const ToggleRow = ({
  icon: Icon,
  label,
  value,
  onToggle,
  accentIcon = false,
  delay = 0,
}: {
  icon: typeof Moon
  label: string
  value: boolean
  onToggle: () => void
  accentIcon?: boolean
  delay?: number
}) => {
  return (
    <AnimatedXStack entering={FadeInDown.delay(delay).springify()}>
      <XStack
        paddingVertical={14}
        paddingHorizontal={4}
        alignItems="center"
        gap={14}
      >
        <Icon
          size={18}
          color={accentIcon ? '$accent' : '$colorMuted'}
          strokeWidth={1.8}
        />

        <Text
          flex={1}
          fontSize={15}
          fontWeight="500"
          color="$color"
          letterSpacing={-0.2}
        >
          {label}
        </Text>

        <Switch
          value={value}
          onValueChange={() => {
            Haptics.selectionAsync()
            onToggle()
          }}
          trackColor={{ false: '#3A3A40', true: '#E85D75' }}
          thumbColor="#FFFFFF"
          ios_backgroundColor="#3A3A40"
        />
      </XStack>
    </AnimatedXStack>
  )
}

// ============================================
// 間 — SECTION HEADER
// ============================================
const SectionHeader = ({ title, delay = 0 }: { title: string; delay?: number }) => (
  <Animated.View entering={FadeInDown.delay(delay).springify()}>
    <Text
      fontSize={11}
      fontWeight="500"
      letterSpacing={0.8}
      textTransform="uppercase"
      color="$colorFaint"
      marginTop={24}
      marginBottom={8}
      paddingHorizontal={4}
    >
      {title}
    </Text>
  </Animated.View>
)

// ============================================
// 間 — MAIN SCREEN
// ============================================
export default function SettingsScreen() {
  const insets = useSafeAreaInsets()
  const { isDark, toggle } = useThemeMode()
  const { user, signOut } = useAuth()

  return (
    <YStack flex={1} backgroundColor="$background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <YStack paddingTop={insets.top + 12} paddingHorizontal={20}>
          {/* Header */}
          <AnimatedXStack
            entering={FadeInUp.delay(50).springify()}
            alignItems="center"
            justifyContent="space-between"
            marginBottom={24}
          >
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                router.back()
              }}
            >
              <View
                width={40}
                height={40}
                borderRadius={9999}
                backgroundColor="$backgroundHover"
                alignItems="center"
                justifyContent="center"
              >
                <ArrowLeft size={18} color="$colorMuted" strokeWidth={2} />
              </View>
            </Pressable>

            <Text fontSize={17} fontWeight="600" color="$color" letterSpacing={-0.3}>
              Settings
            </Text>

            <View width={40} />
          </AnimatedXStack>

          {/* Profile Card */}
          <AnimatedYStack
            entering={FadeInDown.delay(100).springify()}
            backgroundColor="$cardBg"
            borderRadius={20}
            padding={20}
            marginBottom={8}
            shadowColor="#000"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.06}
            shadowRadius={12}
            elevation={3}
          >
            <Pressable
              onPress={() => {
                Haptics.selectionAsync()
              }}
            >
              <XStack alignItems="center" gap={16}>
                {/* Avatar */}
                <View
                  width={64}
                  height={64}
                  borderRadius={18}
                  padding={2}
                  backgroundColor="$accentSoft"
                >
                  <View
                    width={60}
                    height={60}
                    borderRadius={16}
                    overflow="hidden"
                  >
                    <Image
                      source={{ uri: AVATAR_URL }}
                      style={{ width: 60, height: 60 }}
                      resizeMode="cover"
                    />
                  </View>
                </View>

                <YStack flex={1} gap={4}>
                  <Text fontSize={20} fontWeight="600" color="$color" letterSpacing={-0.5}>
                    {user?.name || 'Guest'}
                  </Text>
                  <Text fontSize={14} color="$colorMuted">
                    {user?.email || 'Not signed in'}
                  </Text>
                  <View
                    backgroundColor="$accentGhost"
                    paddingHorizontal={8}
                    paddingVertical={3}
                    borderRadius={6}
                    alignSelf="flex-start"
                    marginTop={4}
                  >
                    <Text fontSize={11} fontWeight="600" color="$accent">
                      Pro Member
                    </Text>
                  </View>
                </YStack>

                <ChevronRight size={20} color="$colorGhost" strokeWidth={2} />
              </XStack>
            </Pressable>
          </AnimatedYStack>

          {/* Account Section */}
          <SectionHeader title="Account" delay={150} />
          <AnimatedYStack
            entering={FadeInDown.delay(170).springify()}
            backgroundColor="$cardBg"
            borderRadius={16}
            paddingHorizontal={14}
            shadowColor="#000"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.06}
            shadowRadius={12}
            elevation={3}
          >
            <SettingsRow
              icon={User}
              label="Edit Profile"
              onPress={() => {}}
              delay={180}
            />
            <View height={1} backgroundColor="$borderColorSoft" marginLeft={32} />
            <SettingsRow
              icon={CreditCard}
              label="Payment Methods"
              value="3 cards"
              onPress={() => {}}
              delay={200}
            />
            <View height={1} backgroundColor="$borderColorSoft" marginLeft={32} />
            <SettingsRow
              icon={Globe}
              label="Currency"
              value="USD"
              onPress={() => {}}
              accentIcon
              delay={220}
            />
          </AnimatedYStack>

          {/* Preferences Section */}
          <SectionHeader title="Preferences" delay={240} />
          <AnimatedYStack
            entering={FadeInDown.delay(260).springify()}
            backgroundColor="$cardBg"
            borderRadius={16}
            paddingHorizontal={14}
            shadowColor="#000"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.06}
            shadowRadius={12}
            elevation={3}
          >
            <ToggleRow
              icon={isDark ? Moon : Sun}
              label="Dark Mode"
              value={isDark}
              onToggle={toggle}
              accentIcon
              delay={270}
            />
            <View height={1} backgroundColor="$borderColorSoft" marginLeft={32} />
            <SettingsRow
              icon={Palette}
              label="Accent Color"
              value="Coral"
              onPress={() => {}}
              delay={290}
            />
            <View height={1} backgroundColor="$borderColorSoft" marginLeft={32} />
            <SettingsRow
              icon={Bell}
              label="Notifications"
              onPress={() => {}}
              delay={310}
            />
            <View height={1} backgroundColor="$borderColorSoft" marginLeft={32} />
            <SettingsRow
              icon={Smartphone}
              label="Haptic Feedback"
              value="On"
              onPress={() => {}}
              delay={330}
            />
          </AnimatedYStack>

          {/* Support Section */}
          <SectionHeader title="Support" delay={350} />
          <AnimatedYStack
            entering={FadeInDown.delay(370).springify()}
            backgroundColor="$cardBg"
            borderRadius={16}
            paddingHorizontal={14}
            shadowColor="#000"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.06}
            shadowRadius={12}
            elevation={3}
          >
            <SettingsRow
              icon={HelpCircle}
              label="Help Center"
              onPress={() => {}}
              delay={380}
            />
            <View height={1} backgroundColor="$borderColorSoft" marginLeft={32} />
            <SettingsRow
              icon={Shield}
              label="Privacy Policy"
              onPress={() => {}}
              delay={400}
            />
            <View height={1} backgroundColor="$borderColorSoft" marginLeft={32} />
            <SettingsRow
              icon={Heart}
              label="Rate the App"
              onPress={() => {}}
              accentIcon
              delay={420}
            />
          </AnimatedYStack>

          {/* Logout */}
          <AnimatedYStack
            entering={FadeInDown.delay(450).springify()}
            backgroundColor="$cardBg"
            borderRadius={16}
            paddingHorizontal={14}
            marginTop={24}
            shadowColor="#000"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.06}
            shadowRadius={12}
            elevation={3}
          >
            <SettingsRow
              icon={LogOut}
              label="Log Out"
              onPress={async () => {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
                await signOut()
                router.replace('/onboarding')
              }}
              isDestructive
              showChevron={false}
              delay={460}
            />
          </AnimatedYStack>

          {/* Version */}
          <Animated.View entering={FadeInDown.delay(480).springify()}>
            <Text
              textAlign="center"
              fontSize={12}
              color="$colorGhost"
              marginTop={24}
            >
              Umo v1.0.0 · Made with{' '}
              <Text color="$accent">♥</Text>
              {' '}in Harare
            </Text>
          </Animated.View>
        </YStack>
      </ScrollView>
    </YStack>
  )
}
