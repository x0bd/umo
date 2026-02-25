import { MotiView } from 'moti';
import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Home, Clock, User, Plus } from 'lucide-react-native';
import { useRouter, usePathname } from 'expo-router';

const TABS = [
  { icon: Home, label: 'Home', href: '/(tabs)/' },
  { icon: Clock, label: 'Activity', href: '/(tabs)/activity' },
  { icon: User, label: 'Profile', href: '/(tabs)/profile' },
] as const;

export function Dock() {
  const router = useRouter();
  const pathname = usePathname();
  const [fabPressed, setFabPressed] = useState(false);

  const isActive = (href: string) => {
    if (href === '/(tabs)/') return pathname === '/' || pathname === '/(tabs)/';
    return pathname.includes(href.replace('/(tabs)', ''));
  };

  return (
    <View className="pointer-events-none absolute bottom-6 left-0 right-0 items-center px-6">
      <View
        className="flex-row items-center rounded-full bg-[#111111] px-2 py-2"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 24,
          elevation: 12,
          pointerEvents: 'auto',
        }}>
        {/* Home */}
        <DockTab
          icon={TABS[0].icon}
          label={TABS[0].label}
          active={isActive(TABS[0].href)}
          onPress={() => router.push(TABS[0].href as any)}
        />

        {/* Activity */}
        <DockTab
          icon={TABS[1].icon}
          label={TABS[1].label}
          active={isActive(TABS[1].href)}
          onPress={() => router.push(TABS[1].href as any)}
        />

        {/* FAB — New Session */}
        <Pressable
          onPress={() => router.push('/session/new' as any)}
          onPressIn={() => setFabPressed(true)}
          onPressOut={() => setFabPressed(false)}
          style={{ marginHorizontal: 6 }}>
          <MotiView
            animate={{ scale: fabPressed ? 0.9 : 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            className="h-14 w-14 items-center justify-center rounded-full bg-[#FF0048]"
            style={{
              shadowColor: '#FF0048',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.4,
              shadowRadius: 12,
              elevation: 8,
            }}>
            <Plus size={24} color="#FFFFFF" strokeWidth={2.5} />
          </MotiView>
        </Pressable>

        {/* Profile */}
        <DockTab
          icon={TABS[2].icon}
          label={TABS[2].label}
          active={isActive(TABS[2].href)}
          onPress={() => router.push(TABS[2].href as any)}
        />
      </View>
    </View>
  );
}

function DockTab({
  icon: Icon,
  label,
  active,
  onPress,
}: {
  icon: typeof Home;
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}>
      <MotiView
        animate={{ scale: pressed ? 0.9 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
        className="items-center justify-center rounded-full px-5 py-3"
        style={{ minWidth: 56 }}>
        <Icon
          size={22}
          color={active ? '#FFFFFF' : 'rgba(255,255,255,0.35)'}
          strokeWidth={active ? 2.5 : 2}
        />
      </MotiView>
    </Pressable>
  );
}
