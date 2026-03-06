import { Clock, Home, Plus, Users, Wallet } from 'lucide-react-native';
import { MotiView } from 'moti';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ─── DockTab ──────────────────────────────────────────────────────────────────

function DockTab({
  icon: Icon,
  active,
  onPress,
}: {
  icon: typeof Home;
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
        animate={{ scale: pressed ? 0.82 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        style={{
          paddingHorizontal: 22,
          paddingVertical: 14,
          borderRadius: 100,
          backgroundColor: active ? '#2C2C2C' : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
        }}>
        <Icon size={23} color={active ? '#fff' : '#5A5A5A'} strokeWidth={active ? 2 : 1.75} />
        {active && (
          <MotiView
            from={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
            <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#FFFFFF' }} />
          </MotiView>
        )}
      </MotiView>
    </Pressable>
  );
}

// ─── NavDock ──────────────────────────────────────────────────────────────────

export function NavDock({
  activeTab,
  onTabChange,
  onNewSession,
}: {
  activeTab: string;
  onTabChange: (t: string) => void;
  onNewSession?: () => void;
}) {
  const insets = useSafeAreaInsets();
  const [fabPressed, setFabPressed] = useState(false);

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: insets.bottom + 16,
        alignItems: 'center',
      }}>
      <MotiView
        from={{ opacity: 0, translateY: 40 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', stiffness: 190, damping: 22, delay: 220 }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#111111',
          borderRadius: 100,
          paddingHorizontal: 8,
          paddingVertical: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 14 },
          shadowOpacity: 0.4,
          shadowRadius: 32,
          elevation: 20,
        }}>
        <DockTab icon={Home} active={activeTab === 'home'} onPress={() => onTabChange('home')} />
        <DockTab
          icon={Clock}
          active={activeTab === 'activity'}
          onPress={() => onTabChange('activity')}
        />

        {/* Centre FAB */}
        <Pressable
          onPress={onNewSession}
          onPressIn={() => setFabPressed(true)}
          onPressOut={() => setFabPressed(false)}
          style={{ marginHorizontal: 6 }}>
          <MotiView
            animate={{ scale: fabPressed ? 0.85 : 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: '#FFFFFF',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.15,
              shadowRadius: 18,
              elevation: 4,
            }}>
            <Plus size={27} color="#111111" strokeWidth={2.5} />
          </MotiView>
        </Pressable>

        <DockTab
          icon={Users}
          active={activeTab === 'people'}
          onPress={() => onTabChange('people')}
        />
        <DockTab
          icon={Wallet}
          active={activeTab === 'wallet'}
          onPress={() => onTabChange('wallet')}
        />
      </MotiView>
    </View>
  );
}
