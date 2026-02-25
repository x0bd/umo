import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  ChevronRight,
  Clock,
  Home,
  Plus,
  QrCode,
  Rabbit,
  RefreshCw,
  Users,
  Wallet,
} from 'lucide-react-native';
import { MotiView } from 'moti';
import { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  onNewSession?: () => void;
}

// ─── Unsplash portrait photos ────────────────────────────────────────────────
const PHOTOS = {
  TM: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces',
  SN: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=faces',
  KC: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces',
  AM: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces',
  RM: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces',
  BN: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces',
  JK: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=faces',
};

// ─── Mock data ────────────────────────────────────────────────────────────────

const USER = { name: 'Tendai', initials: 'TM', photo: PHOTOS.TM };
const BALANCE = { youOwe: 12.0, owedToYou: 27.5 };

const FRIENDS = [
  { key: 'SN', initials: 'SN', name: 'Sasha N.', color: '#1A73E8', owes: 8.5, currency: 'USD' },
  { key: 'KC', initials: 'KC', name: 'Kuda C.', color: '#00A550', owes: 14.0, currency: 'USD' },
  { key: 'AM', initials: 'AM', name: 'Ash M.', color: '#8B1CC8', owes: 5.0, currency: 'USD' },
  { key: 'RM', initials: 'RM', name: 'Rudo M.', color: '#F05A28', owes: -12.0, currency: 'USD' },
  { key: 'BN', initials: 'BN', name: 'Bry N.', color: '#9A6F00', owes: 4200, currency: 'ZiG' },
];

const SESSIONS = [
  {
    id: '1',
    venue: 'Grill & Chill',
    venuePhoto: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=120&h=120&fit=crop',
    date: 'Today',
    status: 'pending',
    myShare: 12.0,
    currency: 'USD',
    participants: [
      { key: 'TM', initials: 'TM', color: '#FF0048' },
      { key: 'SN', initials: 'SN', color: '#1A73E8' },
      { key: 'KC', initials: 'KC', color: '#00A550' },
      { key: 'AM', initials: 'AM', color: '#8B1CC8' },
    ],
  },
  {
    id: '2',
    venue: "Nando's Borrowdale",
    venuePhoto: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=120&h=120&fit=crop',
    date: 'Yesterday',
    status: 'settled',
    myShare: 8.0,
    currency: 'USD',
    participants: [
      { key: 'TM', initials: 'TM', color: '#FF0048' },
      { key: 'RM', initials: 'RM', color: '#F05A28' },
      { key: 'JK', initials: 'JK', color: '#1B3A6B' },
    ],
  },
  {
    id: '3',
    venue: 'Avondale Flea Market',
    venuePhoto: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=120&h=120&fit=crop',
    date: 'Mon 24 Feb',
    status: 'partial',
    myShare: 4200,
    currency: 'ZiG',
    participants: [
      { key: 'TM', initials: 'TM', color: '#FF0048' },
      { key: 'BN', initials: 'BN', color: '#9A6F00' },
    ],
  },
];

const STATUS_COLORS: Record<string, string> = {
  pending: '#FB8C00',
  settled: '#00A550',
  partial: '#1A73E8',
};
const STATUS_BG: Record<string, string> = {
  pending: '#FFF3E0',
  settled: '#E8F5EE',
  partial: '#EEF3FD',
};

const QUICK_ACTIONS = [
  { icon: Plus, label: 'New Split', bg: '#FF0048', fg: '#fff', iconBg: 'rgba(255,255,255,0.22)' },
  { icon: QrCode, label: 'Scan QR', bg: '#fff', fg: '#0E0E0E', iconBg: '#F4F4F4' },
  { icon: ArrowUpRight, label: 'Request', bg: '#fff', fg: '#0E0E0E', iconBg: '#F4F4F4' },
  { icon: RefreshCw, label: 'Settle', bg: '#fff', fg: '#0E0E0E', iconBg: '#F4F4F4' },
];

// ─── PersonAvatar — photo with initials fallback ──────────────────────────────
function PersonAvatar({
  photoKey,
  initials,
  color,
  size,
  borderColor = '#fff',
  borderWidth = 2,
}: {
  photoKey: string;
  initials: string;
  color: string;
  size: number;
  borderColor?: string;
  borderWidth?: number;
}) {
  const src = PHOTOS[photoKey as keyof typeof PHOTOS];
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth,
        borderColor,
        overflow: 'hidden',
        backgroundColor: color + '22',
      }}>
      {src ? (
        <Image source={{ uri: src }} style={{ width: '100%', height: '100%' }} />
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: size * 0.3, fontWeight: '700', color }}>{initials}</Text>
        </View>
      )}
    </View>
  );
}

// ─── Participant stack ────────────────────────────────────────────────────────
function ParticipantStack({
  participants,
  borderColor = '#fff',
}: {
  participants: { key: string; initials: string; color: string }[];
  borderColor?: string;
}) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {participants.slice(0, 4).map((p, i) => (
        <View key={i} style={{ marginLeft: i === 0 ? 0 : -8 }}>
          <PersonAvatar
            photoKey={p.key}
            initials={p.initials}
            color={p.color}
            size={24}
            borderColor={borderColor}
            borderWidth={1.5}
          />
        </View>
      ))}
      {participants.length > 4 && (
        <View
          style={{
            marginLeft: -8,
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: '#E0E0E0',
            borderWidth: 1.5,
            borderColor,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ fontSize: 8, fontWeight: '700', color: '#555' }}>
            +{participants.length - 4}
          </Text>
        </View>
      )}
    </View>
  );
}

// ─── Nav Dock ─────────────────────────────────────────────────────────────────
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
            <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#FF0048' }} />
          </MotiView>
        )}
      </MotiView>
    </Pressable>
  );
}

function NavDock({
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
              backgroundColor: '#FF0048',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#FF0048',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.6,
              shadowRadius: 18,
              elevation: 12,
            }}>
            <Plus size={27} color="#fff" strokeWidth={2.5} />
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

// ─── Main screen ──────────────────────────────────────────────────────────────
export function HomeScreen({ onNewSession }: Props) {
  const insets = useSafeAreaInsets();
  const net = BALANCE.owedToYou - BALANCE.youOwe;
  const [activeTab, setActiveTab] = useState('home');

  return (
    <View style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + 18,
          paddingBottom: insets.bottom + 128,
        }}>
        {/* ── HEADER ───────────────────────────────────────────────── */}
        <MotiView
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 260 }}
          style={{
            paddingHorizontal: 20,
            marginBottom: 22,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {/* LOGO + GREETING */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 11 }}>
            <View
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                backgroundColor: '#FF0048',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#FF0048',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.4,
                shadowRadius: 10,
                elevation: 6,
              }}>
              <Rabbit size={17} color="#fff" strokeWidth={1.75} />
            </View>
            <View>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '600',
                  color: '#BBBBBB',
                  letterSpacing: 2.2,
                  textTransform: 'uppercase',
                }}>
                Good morning
              </Text>
              <Text
                style={{
                  fontSize: 21,
                  fontWeight: '700',
                  color: '#0E0E0E',
                  letterSpacing: -0.9,
                  lineHeight: 23,
                }}>
                {USER.name} 👋
              </Text>
            </View>
          </View>

          {/* RIGHT — NOTIF + AVATAR */}
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            {/* Bell with badge */}
            <Pressable
              style={{
                width: 42,
                height: 42,
                borderRadius: 13,
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#EBEBEB',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 5,
                elevation: 1,
              }}>
              <Bell size={17} color="#444" strokeWidth={1.5} />
              {/* Badge */}
              <View
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 9,
                  width: 7,
                  height: 7,
                  borderRadius: 4,
                  backgroundColor: '#FF0048',
                  borderWidth: 1.5,
                  borderColor: '#fff',
                }}
              />
            </Pressable>

            {/* User photo avatar */}
            <View
              style={{
                borderRadius: 13,
                overflow: 'hidden',
                width: 42,
                height: 42,
                borderWidth: 2,
                borderColor: '#FF0048',
              }}>
              <Image source={{ uri: USER.photo }} style={{ width: '100%', height: '100%' }} />
            </View>
          </View>
        </MotiView>

        {/* ── PINK CARD — Balance ───────────────────────────────────── */}
        <MotiView
          from={{ opacity: 0, translateY: 22 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 300, delay: 60 }}
          style={{ marginHorizontal: 20, marginBottom: 14 }}>
          <View
            style={{
              backgroundColor: '#FF0048',
              borderRadius: 28,
              padding: 26,
              overflow: 'hidden',
            }}>
            {/* DECORATIVE CIRCLE (depth texture) */}
            <View
              style={{
                position: 'absolute',
                right: -48,
                top: -48,
                width: 180,
                height: 180,
                borderRadius: 90,
                backgroundColor: 'rgba(255,255,255,0.06)',
              }}
            />
            <View
              style={{
                position: 'absolute',
                right: -10,
                bottom: 40,
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: 'rgba(255,255,255,0.04)',
              }}
            />

            {/* TITLE ROW */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 20,
              }}>
              <Text
                style={{
                  fontSize: 31,
                  fontWeight: '500',
                  letterSpacing: -1.5,
                  color: '#450010',
                  lineHeight: 33,
                }}>
                Your{'\n'}Balance
              </Text>
              <View
                style={{
                  backgroundColor: 'rgba(69,0,16,0.13)',
                  borderRadius: 100,
                  paddingHorizontal: 13,
                  paddingVertical: 6,
                }}>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '700',
                    color: '#450010',
                    letterSpacing: 1.2,
                    textTransform: 'uppercase',
                  }}>
                  Feb 2026
                </Text>
              </View>
            </View>

            {/* FLOW */}
            <View
              style={{
                paddingLeft: 20,
                borderLeftWidth: 1,
                borderLeftColor: 'rgba(69,0,16,0.22)',
                marginLeft: 4,
                gap: 18,
                marginBottom: 24,
              }}>
              {/* NET */}
              <View style={{ position: 'relative' }}>
                <View
                  style={{
                    position: 'absolute',
                    left: -25,
                    top: 9,
                    width: 8,
                    height: 8,
                    borderBottomWidth: 1,
                    borderRightWidth: 1,
                    borderColor: '#450010',
                    transform: [{ rotate: '45deg' }],
                    opacity: 0.5,
                  }}
                />
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '700',
                    color: '#450010',
                    textTransform: 'uppercase',
                    letterSpacing: 1.2,
                    opacity: 0.55,
                    marginBottom: 3,
                  }}>
                  Net owed to you
                </Text>
                <Text
                  style={{
                    fontSize: 56,
                    fontWeight: '500',
                    color: '#450010',
                    letterSpacing: -3.2,
                    lineHeight: 58,
                  }}>
                  ${net.toFixed(2)}
                </Text>
              </View>

              {/* STATS ROW */}
              <View style={{ flexDirection: 'row', gap: 16 }}>
                <View style={{ flex: 1, position: 'relative' }}>
                  <View
                    style={{
                      position: 'absolute',
                      left: -25,
                      top: 7,
                      width: 8,
                      height: 8,
                      borderBottomWidth: 1,
                      borderRightWidth: 1,
                      borderColor: '#450010',
                      transform: [{ rotate: '45deg' }],
                      opacity: 0.35,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 9.5,
                      fontWeight: '700',
                      color: '#450010',
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      opacity: 0.55,
                      marginBottom: 3,
                    }}>
                    Owed to you
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <ArrowDownLeft size={13} color="#450010" strokeWidth={2.5} />
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '600',
                        color: '#450010',
                        letterSpacing: -0.8,
                      }}>
                      ${BALANCE.owedToYou.toFixed(2)}
                    </Text>
                  </View>
                  {/* Mini face row of who owes */}
                  <View style={{ flexDirection: 'row', marginTop: 7 }}>
                    {FRIENDS.filter((f) => f.owes > 0)
                      .slice(0, 3)
                      .map((f, i) => (
                        <View key={i} style={{ marginLeft: i === 0 ? 0 : -6 }}>
                          <PersonAvatar
                            photoKey={f.key}
                            initials={f.initials}
                            color={f.color}
                            size={20}
                            borderColor="rgba(255,0,72,0.4)"
                            borderWidth={1.5}
                          />
                        </View>
                      ))}
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 9.5,
                      fontWeight: '700',
                      color: '#450010',
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      opacity: 0.55,
                      marginBottom: 3,
                    }}>
                    You owe
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <ArrowUpRight size={13} color="#450010" strokeWidth={2.5} />
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '600',
                        color: '#450010',
                        letterSpacing: -0.8,
                      }}>
                      ${BALANCE.youOwe.toFixed(2)}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 7 }}>
                    {FRIENDS.filter((f) => f.owes < 0)
                      .slice(0, 2)
                      .map((f, i) => (
                        <View key={i} style={{ marginLeft: i === 0 ? 0 : -6 }}>
                          <PersonAvatar
                            photoKey={f.key}
                            initials={f.initials}
                            color={f.color}
                            size={20}
                            borderColor="rgba(255,0,72,0.4)"
                            borderWidth={1.5}
                          />
                        </View>
                      ))}
                  </View>
                </View>
              </View>
            </View>

            {/* SETTLE UP CTA */}
            <Pressable
              style={{
                backgroundColor: '#450010',
                borderRadius: 16,
                padding: 18,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{ fontSize: 15.5, fontWeight: '600', color: '#fff', letterSpacing: -0.2 }}>
                Settle Up
              </Text>
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ChevronRight size={16} color="rgba(255,255,255,0.7)" strokeWidth={2} />
              </View>
            </Pressable>
          </View>
        </MotiView>

        {/* ── QUICK ACTIONS ─────────────────────────────────────────── */}
        <MotiView
          from={{ opacity: 0, translateY: 14 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 260, delay: 120 }}
          style={{ marginBottom: 22 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}>
            {QUICK_ACTIONS.map((action, i) => {
              const Icon = action.icon;
              return (
                <Pressable key={i}>
                  <MotiView
                    style={{
                      backgroundColor: action.bg,
                      borderRadius: 18,
                      paddingRight: 18,
                      paddingLeft: 6,
                      paddingVertical: 6,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 9,
                      borderWidth: action.bg === '#fff' ? 1 : 0,
                      borderColor: '#E8E8E8',
                      shadowColor: action.bg === '#FF0048' ? '#FF0048' : '#000',
                      shadowOffset: { width: 0, height: action.bg === '#FF0048' ? 8 : 2 },
                      shadowOpacity: action.bg === '#FF0048' ? 0.38 : 0.05,
                      shadowRadius: action.bg === '#FF0048' ? 14 : 6,
                      elevation: action.bg === '#FF0048' ? 7 : 1,
                    }}>
                    <View
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 12,
                        backgroundColor: action.iconBg,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon size={17} color={action.fg} strokeWidth={2} />
                    </View>
                    <Text
                      style={{
                        fontSize: 13.5,
                        fontWeight: '600',
                        color: action.fg,
                        letterSpacing: -0.2,
                      }}>
                      {action.label}
                    </Text>
                  </MotiView>
                </Pressable>
              );
            })}
          </ScrollView>
        </MotiView>

        {/* ── PEOPLE — Who owes who ──────────────────────────────────── */}
        <MotiView
          from={{ opacity: 0, translateY: 14 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 260, delay: 150 }}
          style={{ marginBottom: 22 }}>
          <View
            style={{
              paddingHorizontal: 20,
              marginBottom: 13,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
              <View style={{ width: 3, height: 16, borderRadius: 2, backgroundColor: '#FF0048' }} />
              <Text
                style={{ fontSize: 13, fontWeight: '700', color: '#0E0E0E', letterSpacing: -0.3 }}>
                People
              </Text>
            </View>
            <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#BBBBBB' }}>Manage</Text>
              <ChevronRight size={13} color="#BBBBBB" strokeWidth={2.5} />
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}>
            {FRIENDS.map((f, i) => {
              const isPositive = f.owes > 0;
              return (
                <Pressable key={i}>
                  <View
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: 20,
                      padding: 14,
                      width: 112,
                      borderWidth: 1,
                      borderColor: '#EBEBEB',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.05,
                      shadowRadius: 6,
                      elevation: 1,
                      alignItems: 'flex-start',
                    }}>
                    {/* CIRCULAR PHOTO AVATAR */}
                    <View
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 21,
                        overflow: 'hidden',
                        borderWidth: 2,
                        borderColor: f.color + '55',
                        marginBottom: 10,
                        backgroundColor: f.color + '18',
                      }}>
                      <Image
                        source={{ uri: PHOTOS[f.key as keyof typeof PHOTOS] }}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 12.5,
                        fontWeight: '700',
                        color: '#0E0E0E',
                        letterSpacing: -0.2,
                        marginBottom: 2,
                      }}
                      numberOfLines={1}>
                      {f.name.split(' ')[0]}
                    </Text>
                    <Text
                      style={{
                        fontSize: 9.5,
                        fontWeight: '700',
                        color: isPositive ? '#00A550' : '#FF0048',
                        letterSpacing: 0.2,
                        marginBottom: 3,
                        textTransform: 'uppercase',
                      }}>
                      {isPositive ? 'owes you' : 'you owe'}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '700',
                        color: isPositive ? '#00A550' : '#FF0048',
                        letterSpacing: -0.6,
                      }}>
                      {f.currency === 'ZiG'
                        ? `Z${Math.abs(f.owes).toLocaleString()}`
                        : `$${Math.abs(f.owes).toFixed(2)}`}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        </MotiView>

        {/* ── GRAY CARD — Recent Bills ──────────────────────────────── */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 300, delay: 190 }}
          style={{ marginHorizontal: 20, marginBottom: 14 }}>
          <View style={{ backgroundColor: '#E6E6E6', borderRadius: 28, padding: 24 }}>
            {/* TITLE ROW */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 22,
              }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: '500',
                  letterSpacing: -1.5,
                  color: '#000',
                  lineHeight: 32,
                }}>
                Recent{'\n'}Bills
              </Text>
              <Pressable
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 5,
                  borderRadius: 100,
                  backgroundColor: 'rgba(0,0,0,0.08)',
                  alignSelf: 'flex-start',
                  marginTop: 4,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 2,
                }}>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '700',
                    color: 'rgba(0,0,0,0.45)',
                    letterSpacing: 0.8,
                    textTransform: 'uppercase',
                  }}>
                  See all
                </Text>
              </Pressable>
            </View>

            {/* FLOW CONTAINER */}
            <View
              style={{
                paddingLeft: 20,
                borderLeftWidth: 1,
                borderLeftColor: 'rgba(0,0,0,0.14)',
                marginLeft: 4,
              }}>
              {SESSIONS.map((session, i) => (
                <View key={session.id} style={{ position: 'relative' }}>
                  <View
                    style={{
                      position: 'absolute',
                      left: -25,
                      top: 22,
                      width: 8,
                      height: 8,
                      borderBottomWidth: 1,
                      borderRightWidth: 1,
                      borderColor: 'rgba(0,0,0,0.45)',
                      transform: [{ rotate: '45deg' }],
                    }}
                  />

                  <Pressable>
                    <View
                      style={{
                        paddingVertical: 14,
                        borderBottomWidth: i < SESSIONS.length - 1 ? 1 : 0,
                        borderBottomColor: 'rgba(0,0,0,0.07)',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 13,
                      }}>
                      {/* VENUE PHOTO */}
                      <View
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 14,
                          overflow: 'hidden',
                          backgroundColor: '#ccc',
                          flexShrink: 0,
                        }}>
                        <Image
                          source={{ uri: session.venuePhoto }}
                          style={{ width: '100%', height: '100%' }}
                          resizeMode="cover"
                        />
                      </View>

                      {/* CONTENT */}
                      <View style={{ flex: 1 }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 5,
                          }}>
                          <Text
                            style={{
                              fontSize: 14.5,
                              fontWeight: '700',
                              color: '#000',
                              letterSpacing: -0.3,
                              flex: 1,
                              marginRight: 8,
                            }}
                            numberOfLines={1}>
                            {session.venue}
                          </Text>
                          <View
                            style={{
                              backgroundColor: STATUS_BG[session.status],
                              borderRadius: 100,
                              paddingHorizontal: 8,
                              paddingVertical: 3,
                            }}>
                            <Text
                              style={{
                                fontSize: 9,
                                fontWeight: '700',
                                color: STATUS_COLORS[session.status],
                                letterSpacing: 0.5,
                                textTransform: 'uppercase',
                              }}>
                              {session.status}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                            <ParticipantStack
                              participants={session.participants}
                              borderColor="#E6E6E6"
                            />
                            <Text style={{ fontSize: 11, color: '#777', letterSpacing: 0.05 }}>
                              {session.date}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: '700',
                              color: session.status === 'settled' ? '#00A550' : '#000',
                              letterSpacing: -0.5,
                            }}>
                            {session.currency === 'ZiG'
                              ? `ZiG ${(session.myShare as number).toLocaleString()}`
                              : `$${(session.myShare as number).toFixed(2)}`}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </Pressable>
                </View>
              ))}
            </View>
          </View>
        </MotiView>
      </ScrollView>

      {/* ── NAV DOCK ─────────────────────────────────────────────────── */}
      <NavDock activeTab={activeTab} onTabChange={setActiveTab} onNewSession={onNewSession} />
    </View>
  );
}
