import { Pressable } from 'react-native'
import { XStack, View, Text } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Home, Activity, Sun, Moon, Plus } from '@tamagui/lucide-icons'
import { usePathname, router } from 'expo-router'
import * as Haptics from 'expo-haptics'
import { useThemeMode } from '@/providers/theme-mode'

interface DockItemProps {
  icon: typeof Home
  label: string
  isActive: boolean
  onPress: () => void
}

const DockItem = ({ icon: Icon, label, isActive, onPress }: DockItemProps) => {
  const { isDark } = useThemeMode()
  
  return (
    <Pressable 
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        onPress()
      }}
      style={{ alignItems: 'center', gap: 4 }}
    >
      <View
        width={44}
        height={44}
        borderRadius={14}
        backgroundColor={isActive ? '$pink' : 'transparent'}
        alignItems="center"
        justifyContent="center"
      >
        <Icon 
          size={22} 
          color={isActive ? '#FFFFFF' : isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'} 
          strokeWidth={isActive ? 2.5 : 1.8} 
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
        backgroundColor={isDark ? 'rgba(20,20,20,0.95)' : 'rgba(255,255,255,0.95)'}
        borderRadius={999}
        paddingHorizontal={8}
        paddingVertical={8}
        gap={4}
        alignItems="center"
        justifyContent="center"
        borderWidth={1}
        borderColor={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}
        shadowColor="#000"
        shadowOffset={{ width: 0, height: 8 }}
        shadowOpacity={isDark ? 0.5 : 0.15}
        shadowRadius={24}
        elevation={12}
        // Backdrop blur effect (web)
        style={{
          // @ts-ignore
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {/* Home */}
        <DockItem 
          icon={Home} 
          label="Home" 
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
            width={52}
            height={52}
            borderRadius={16}
            backgroundColor="$pink"
            alignItems="center"
            justifyContent="center"
            marginHorizontal={8}
            shadowColor="#FF1A55"
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.4}
            shadowRadius={12}
          >
            <Plus size={26} color="#FFFFFF" strokeWidth={2.5} />
          </View>
        </Pressable>

        {/* Activity */}
        <DockItem 
          icon={Activity} 
          label="Activity" 
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
            width={44}
            height={44}
            borderRadius={14}
            backgroundColor={isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}
            alignItems="center"
            justifyContent="center"
          >
            {isDark ? (
              <Sun size={20} color="rgba(255,255,255,0.5)" strokeWidth={1.8} />
            ) : (
              <Moon size={20} color="rgba(0,0,0,0.5)" strokeWidth={1.8} />
            )}
          </View>
        </Pressable>
      </XStack>
    </View>
  )
}

