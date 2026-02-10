import { Pressable } from 'react-native'
import { XStack, View } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Home, Activity, Sun, Moon, Plus } from '@tamagui/lucide-icons'
import { usePathname, router } from 'expo-router'
import * as Haptics from 'expo-haptics'
import { useThemeMode } from '@/providers/theme-mode'

interface DockItemProps {
  icon: typeof Home
  isActive: boolean
  onPress: () => void
}

const DockItem = ({ icon: Icon, isActive, onPress }: DockItemProps) => {
  return (
    <Pressable 
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        onPress()
      }}
    >
      <View
        width={46}
        height={46}
        borderRadius={16}
        backgroundColor={isActive ? '$cardTintStrong' : 'transparent'}
        alignItems="center"
        justifyContent="center"
        borderWidth={isActive ? 1 : 0}
        borderColor={isActive ? '$pink' : 'transparent'}
      >
        <Icon 
          size={22}
          color={isActive ? '$pink' : '$colorMuted'}
          strokeWidth={isActive ? 2.5 : 2}
        />
      </View>
    </Pressable>
  )
}

export function FloatingDock() {
  const insets = useSafeAreaInsets()
  const pathname = usePathname()
  const { isDark, toggle } = useThemeMode()

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
        borderRadius={999}
        paddingHorizontal={10}
        paddingVertical={10}
        gap={10}
        alignItems="center"
        justifyContent="center"
        borderWidth={1}
        borderColor="$dockBorder"
        shadowColor="#000"
        shadowOffset={{ width: 0, height: 8 }}
        shadowOpacity={isDark ? 0.35 : 0.12}
        shadowRadius={28}
        elevation={12}
        // Backdrop blur effect (web)
        style={{
          // @ts-ignore
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        {/* Home */}
        <DockItem 
          icon={Home} 
          isActive={isHome}
          onPress={() => router.push('/')}
        />

        {/* Add Button */}
        <Pressable 
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
            router.push('/modal')
          }}
        >
          <View
            width={54}
            height={54}
            borderRadius={18}
            backgroundColor="$pink"
            alignItems="center"
            justifyContent="center"
            marginHorizontal={2}
            borderWidth={1}
            borderColor="rgba(255,255,255,0.20)"
            shadowColor="#000"
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={isDark ? 0.35 : 0.18}
            shadowRadius={16}
          >
            <Plus size={26} color="#FFFFFF" strokeWidth={2.5} />
          </View>
        </Pressable>

        {/* Activity */}
        <DockItem 
          icon={Activity} 
          isActive={isActivity}
          onPress={() => router.push('/explore')}
        />

        {/* Theme Toggle */}
        <Pressable 
          onPress={() => {
            Haptics.selectionAsync()
            toggle()
          }}
        >
          <View
            width={46}
            height={46}
            borderRadius={16}
            backgroundColor="$backgroundHover"
            borderWidth={1}
            borderColor="$borderColorSubtle"
            alignItems="center"
            justifyContent="center"
          >
            {isDark ? (
              <Sun size={20} color="$colorMuted" strokeWidth={2} />
            ) : (
              <Moon size={20} color="$colorMuted" strokeWidth={2} />
            )}
          </View>
        </Pressable>
      </XStack>
    </View>
  )
}

