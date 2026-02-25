import { ArrowDownLeft, ArrowUpRight, Bell, Clock, Home, QrCode, Plus, Rabbit, RefreshCw, Users, Wallet } from 'lucide-react-native';
import { MotiView } from 'moti';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  onNewSession?: () => void;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const USER = { name: 'Tendai', initials: 'TM' };

const BALANCE = { youOwe: 12.0, owedToYou: 27.5 };

const FRIENDS = [
  { initials: 'SN', name: 'Sasha N.', color: '#1A73E8', owes: 8.5, currency: 'USD' },
  { initials: 'KC', name: 'Kuda C.', color: '#00A550', owes: 14.0, currency: 'USD' },
  { initials: 'AM', name: 'Ash M.', color: '#8B1CC8', owes: 5.0, currency: 'USD' },
  { initials: 'RM', name: 'Rudo M.', color: '#F05A28', owes: -12.0, currency: 'USD' },
  { initials: 'BN', name: 'Bry N.', color: '#9A6F00', owes: 4200, currency: 'ZiG' },
];

const SESSIONS = [
  {
    id: '1',
    venue: 'Grill & Chill Harare',
    date: 'Today · 4 people',
    status: 'pending',
    myShare: 12.0,
    currency: 'USD',
    participants: [
      { initials: 'TM', color: '#FF0048' },
      { initials: 'SN', color: '#1A73E8' },
      { initials: 'KC', color: '#00A550' },
      { initials: 'AM', color: '#8B1CC8' },
    ],
  },
  {
    id: '2',
    venue: "Nando's Borrowdale",
    date: 'Yesterday · 3 people',
    status: 'settled',
    myShare: 8.0,
    currency: 'USD',
    participants: [
      { initials: 'TM', color: '#FF0048' },
      { initials: 'RM', color: '#F05A28' },
      { initials: 'JK', color: '#1B3A6B' },
    ],
  },
  {
    id: '3',
    venue: 'Avondale Flea Market',
    date: 'Mon 24 Feb · 2 people',
    status: 'partial',
    myShare: 4200,
    currency: 'ZiG',
    participants: [
      { initials: 'TM', color: '#FF0048' },
      { initials: 'BN', color: '#9A6F00' },
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
  { icon: Plus, label: 'New Split', bg: '#FF0048', fg: '#fff' },
  { icon: QrCode, label: 'Scan QR', bg: '#fff', fg: '#0E0E0E' },
  { icon: ArrowUpRight, label: 'Request', bg: '#fff', fg: '#0E0E0E' },
  { icon: RefreshCw, label: 'Settle', bg: '#fff', fg: '#0E0E0E' },
];

// ─── Participant avatar stack ─────────────────────────────────────────────────
function ParticipantStack({ participants }: { participants: { initials: string; color: string }[] }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {participants.slice(0, 4).map((p, i) => (
        <View
          key={i}
          style={{
            marginLeft: i === 0 ? 0 : -7,
            width: 22,
            height: 22,
            borderRadius: 11,
            backgroundColor: p.color + '18',
            borderWidth: 1.5,
            borderColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ fontSize: 7, fontWeight: '700', color: p.color }}>{p.initials}</Text>
        </View>
      ))}
    </View>
  );
}

// ─── Nav Dock ─────────────────────────────────────────────────────────────────
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
        animate={{ scale: pressed ? 0.84 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        style={{
          paddingHorizontal: 20,
          paddingVertical: 13,
          borderRadius: 100,
          backgroundColor: active ? '#2A2A2A' : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
        }}>
        <Icon size={22} color={active ? '#fff' : '#666'} strokeWidth={active ? 2 : 1.75} />
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
        paddingBottom: insets.bottom + 14,
        alignItems: 'center',
      }}>
      <MotiView
        from={{ opacity: 0, translateY: 32 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 200 }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#111111',
          borderRadius: 100,
          paddingHorizontal: 8,
          paddingVertical: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.35,
          shadowRadius: 28,
          elevation: 18,
        }}>
        <DockTab icon={Home} label="Home" active={activeTab === 'home'} onPress={() => onTabChange('home')} />
        <DockTab icon={Clock} label="Activity" active={activeTab === 'activity'} onPress={() => onTabChange('activity')} />

        {/* Centre FAB */}
        <Pressable
          onPress={onNewSession}
          onPressIn={() => setFabPressed(true)}
          onPressOut={() => setFabPressed(false)}
          style={{ marginHorizontal: 6 }}>
          <MotiView
            animate={{ scale: fabPressed ? 0.86 : 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            style={{
              width: 58,
              height: 58,
              borderRadius: 29,
              backgroundColor: '#FF0048',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#FF0048',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.55,
              shadowRadius: 16,
              elevation: 10,
            }}>
            <Plus size={26} color="#fff" strokeWidth={2.5} />
          </MotiView>
        </Pressable>

        <DockTab icon={Users} label="People" active={activeTab === 'people'} onPress={() => onTabChange('people')} />
        <DockTab icon={Wallet} label="Wallet" active={activeTab === 'wallet'} onPress={() => onTabChange('wallet')} />
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
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 120,
        }}>

        {/* ── HEADER ───────────────────────────────────────────────── */}
        <MotiView
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 260 }}
          style={{
            paddingHorizontal: 20,
            marginBottom: 24,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>

          {/* LOGO + GREETING */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 11 }}>
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 11,
                backgroundColor: '#FF0048',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#FF0048',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.38,
                shadowRadius: 8,
                elevation: 5,
              }}>
              <Rabbit size={16} color="#fff" strokeWidth={1.75} />
            </View>
            <View>
              <Text style={{ fontSize: 10, fontWeight: '600', color: '#AAAAAA', letterSpacing: 2, textTransform: 'uppercase' }}>
                Good morning
              </Text>
              <Text style={{ fontSize: 20, fontWeight: '700', color: '#0E0E0E', letterSpacing: -0.8, lineHeight: 22 }}>
                {USER.name} 👋
              </Text>
            </View>
          </View>

          {/* RIGHT ACTIONS */}
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Pressable
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#EBEBEB',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 1,
              }}>
              <Bell size={17} color="#555" strokeWidth={1.5} />
            </Pressable>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: '#FF0048',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 13, fontWeight: '800', color: '#fff' }}>{USER.initials}</Text>
            </View>
          </View>
        </MotiView>

        {/* ── PINK CARD — Balance ───────────────────────────────────── */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 300, delay: 60 }}
          style={{ marginHorizontal: 20, marginBottom: 14 }}>
          <View style={{ backgroundColor: '#FF0048', borderRadius: 28, padding: 26 }}>

            {/* TITLE ROW */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
              <Text style={{ fontSize: 30, fontWeight: '500', letterSpacing: -1.5, color: '#450010', lineHeight: 32 }}>
                Your{'\n'}Balance
              </Text>
              <View
                style={{
                  backgroundColor: 'rgba(69,0,16,0.12)',
                  borderRadius: 100,
                  paddingHorizontal: 12,
                  paddingVertical: 5,
                }}>
                <Text style={{ fontSize: 10, fontWeight: '700', color: '#450010', letterSpacing: 1.2, textTransform: 'uppercase' }}>
                  Feb 2026
                </Text>
              </View>
            </View>

            {/* FLOW — NET */}
            <View
              style={{
                paddingLeft: 20,
                borderLeftWidth: 1,
                borderLeftColor: 'rgba(69,0,16,0.2)',
                marginLeft: 4,
                gap: 18,
                marginBottom: 26,
              }}>
              <View style={{ position: 'relative' }}>
                <View style={{ position: 'absolute', left: -25, top: 9, width: 8, height: 8, borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#450010', transform: [{ rotate: '45deg' }], opacity: 0.5 }} />
                <Text style={{ fontSize: 10, fontWeight: '700', color: '#450010', textTransform: 'uppercase', letterSpacing: 1.2, opacity: 0.6, marginBottom: 3 }}>
                  Net owed to you
                </Text>
                <Text style={{ fontSize: 54, fontWeight: '500', color: '#450010', letterSpacing: -3, lineHeight: 56 }}>
                  ${net.toFixed(2)}
                </Text>
              </View>

              {/* TWO ROW STATS */}
              <View style={{ flexDirection: 'row', gap: 16 }}>
                <View style={{ flex: 1, position: 'relative' }}>
                  <View style={{ position: 'absolute', left: -25, top: 7, width: 8, height: 8, borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#450010', transform: [{ rotate: '45deg' }], opacity: 0.35 }} />
                  <Text style={{ fontSize: 9.5, fontWeight: '700', color: '#450010', textTransform: 'uppercase', letterSpacing: 1, opacity: 0.55, marginBottom: 2 }}>
                    Owed to you
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <ArrowDownLeft size={13} color="#450010" strokeWidth={2.5} />
                    <Text style={{ fontSize: 19, fontWeight: '600', color: '#450010', letterSpacing: -0.8 }}>
                      ${BALANCE.owedToYou.toFixed(2)}
                    </Text>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 9.5, fontWeight: '700', color: '#450010', textTransform: 'uppercase', letterSpacing: 1, opacity: 0.55, marginBottom: 2 }}>
                    You owe
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <ArrowUpRight size={13} color="#450010" strokeWidth={2.5} />
                    <Text style={{ fontSize: 19, fontWeight: '600', color: '#450010', letterSpacing: -0.8 }}>
                      ${BALANCE.youOwe.toFixed(2)}
                    </Text>
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
              <Text style={{ fontSize: 15, fontWeight: '600', color: '#fff', letterSpacing: -0.1 }}>
                Settle Up
              </Text>
              <Text style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)' }}>→</Text>
            </Pressable>
          </View>
        </MotiView>

        {/* ── QUICK ACTIONS ─────────────────────────────────────────── */}
        <MotiView
          from={{ opacity: 0, translateY: 16 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 280, delay: 120 }}
          style={{ marginBottom: 14 }}>
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
                      paddingHorizontal: 18,
                      paddingVertical: 14,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                      borderWidth: action.bg === '#fff' ? 1 : 0,
                      borderColor: '#EBEBEB',
                      shadowColor: action.bg === '#FF0048' ? '#FF0048' : '#000',
                      shadowOffset: { width: 0, height: action.bg === '#FF0048' ? 6 : 2 },
                      shadowOpacity: action.bg === '#FF0048' ? 0.35 : 0.05,
                      shadowRadius: action.bg === '#FF0048' ? 12 : 6,
                      elevation: action.bg === '#FF0048' ? 6 : 1,
                    }}>
                    <Icon size={17} color={action.fg} strokeWidth={2} />
                    <Text style={{ fontSize: 13.5, fontWeight: '600', color: action.fg, letterSpacing: -0.2 }}>
                      {action.label}
                    </Text>
                  </MotiView>
                </Pressable>
              );
            })}
          </ScrollView>
        </MotiView>

        {/* ── FRIENDS — Who owes who ─────────────────────────────────── */}
        <MotiView
          from={{ opacity: 0, translateY: 16 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 280, delay: 150 }}
          style={{ marginBottom: 14 }}>
          {/* SECTION LABEL */}
          <View style={{ paddingHorizontal: 20, marginBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View style={{ width: 3, height: 14, borderRadius: 2, backgroundColor: '#FF0048' }} />
              <Text style={{ fontSize: 12, fontWeight: '700', color: '#0E0E0E', letterSpacing: -0.2 }}>
                People
              </Text>
            </View>
            <Pressable>
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#AAAAAA' }}>Manage →</Text>
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
                      padding: 16,
                      width: 110,
                      borderWidth: 1,
                      borderColor: '#EBEBEB',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.04,
                      shadowRadius: 6,
                      elevation: 1,
                    }}>
                    {/* AVATAR */}
                    <View
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 19,
                        backgroundColor: f.color + '18',
                        borderWidth: 1.5,
                        borderColor: f.color + '44',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 10,
                      }}>
                      <Text style={{ fontSize: 12, fontWeight: '700', color: f.color }}>{f.initials}</Text>
                    </View>
                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#0E0E0E', letterSpacing: -0.2, marginBottom: 2 }} numberOfLines={1}>
                      {f.name.split(' ')[0]}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '700',
                        color: isPositive ? '#00A550' : '#FF0048',
                        letterSpacing: 0.1,
                      }}>
                      {isPositive ? 'owes you' : 'you owe'}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '700',
                        color: isPositive ? '#00A550' : '#FF0048',
                        letterSpacing: -0.5,
                        marginTop: 2,
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

            {/* CARD TITLE */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
              <Text style={{ fontSize: 30, fontWeight: '500', letterSpacing: -1.5, color: '#000', lineHeight: 32 }}>
                Recent{'\n'}Bills
              </Text>
              <Pressable
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 5,
                  borderRadius: 100,
                  backgroundColor: 'rgba(0,0,0,0.07)',
                  alignSelf: 'flex-start',
                  marginTop: 4,
                }}>
                <Text style={{ fontSize: 10, fontWeight: '700', color: '#000', letterSpacing: 0.8, textTransform: 'uppercase', opacity: 0.5 }}>
                  See all
                </Text>
              </Pressable>
            </View>

            {/* FLOW CONTAINER */}
            <View
              style={{
                paddingLeft: 20,
                borderLeftWidth: 1,
                borderLeftColor: 'rgba(0,0,0,0.15)',
                marginLeft: 4,
              }}>
              {SESSIONS.map((session, i) => (
                <View key={session.id} style={{ position: 'relative' }}>
                  {/* STEP MARKER */}
                  <View style={{ position: 'absolute', left: -25, top: 20, width: 8, height: 8, borderBottomWidth: 1, borderRightWidth: 1, borderColor: 'rgba(0,0,0,0.5)', transform: [{ rotate: '45deg' }] }} />

                  <Pressable>
                    <View
                      style={{
                        paddingVertical: 15,
                        borderBottomWidth: i < SESSIONS.length - 1 ? 1 : 0,
                        borderBottomColor: 'rgba(0,0,0,0.07)',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{ flex: 1, marginRight: 12 }}>
                        <Text style={{ fontSize: 14.5, fontWeight: '600', color: '#000', letterSpacing: -0.3, marginBottom: 4 }} numberOfLines={1}>
                          {session.venue}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                          <ParticipantStack participants={session.participants} />
                          <Text style={{ fontSize: 11, color: '#666', letterSpacing: 0.05 }}>
                            {session.date}
                          </Text>
                        </View>
                      </View>

                      <View style={{ alignItems: 'flex-end', gap: 5 }}>
                        <View style={{ backgroundColor: STATUS_BG[session.status], borderRadius: 100, paddingHorizontal: 8, paddingVertical: 3 }}>
                          <Text style={{ fontSize: 9, fontWeight: '700', color: STATUS_COLORS[session.status], letterSpacing: 0.6, textTransform: 'uppercase' }}>
                            {session.status}
                          </Text>
                        </View>
                        <Text style={{ fontSize: 15, fontWeight: '700', color: session.status === 'settled' ? '#00A550' : '#000', letterSpacing: -0.5 }}>
                          {session.currency === 'ZiG'
                            ? `ZiG ${(session.myShare as number).toLocaleString()}`
                            : `$${(session.myShare as number).toFixed(2)}`}
                        </Text>
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