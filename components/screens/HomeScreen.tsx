import { Bell, Clock, Home, Plus, Rabbit, User } from 'lucide-react-native';
import { MotiView } from 'moti';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  onNewSession?: () => void;
}

// ─── Mock data ───────────────────────────────────────────────────────────────

const USER = { name: 'Tendai', initials: 'TM' };

const SESSIONS = [
  {
    id: '1',
    venue: 'Grill & Chill Harare',
    date: 'Today',
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
    date: 'Yesterday',
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
    date: 'Mon 24 Feb',
    status: 'partial',
    myShare: 4200,
    currency: 'ZiG',
    participants: [
      { initials: 'TM', color: '#FF0048' },
      { initials: 'BN', color: '#9A6F00' },
    ],
  },
];

const BALANCE = { youOwe: 12.0, owedToYou: 27.5 };

const STATUS_COLORS: Record<string, string> = {
  pending: '#FB8C00',
  settled: '#00A550',
  partial: '#1A73E8',
};

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
            backgroundColor: p.color + '22',
            borderWidth: 1.5,
            borderColor: '#E6E6E6',
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
        animate={{ scale: pressed ? 0.85 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        style={{
          paddingHorizontal: 18,
          paddingVertical: 11,
          borderRadius: 100,
          backgroundColor: active ? '#252525' : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon size={20} color={active ? '#fff' : '#555'} strokeWidth={active ? 2 : 1.75} />
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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#111111',
          borderRadius: 100,
          paddingHorizontal: 6,
          paddingVertical: 6,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.5,
          shadowRadius: 24,
          elevation: 14,
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
          style={{ marginHorizontal: 4 }}>
          <MotiView
            animate={{ scale: fabPressed ? 0.88 : 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: '#FF0048',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#FF0048',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.5,
              shadowRadius: 12,
              elevation: 8,
            }}>
            <Plus size={22} color="#fff" strokeWidth={2.5} />
          </MotiView>
        </Pressable>

        <DockTab
          icon={User}
          active={activeTab === 'profile'}
          onPress={() => onTabChange('profile')}
        />
      </View>
    </View>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────
export function HomeScreen({ onNewSession }: Props) {
  const insets = useSafeAreaInsets();
  const net = BALANCE.owedToYou - BALANCE.youOwe;
  const [activeTab, setActiveTab] = useState('home');

  return (
    <View style={{ flex: 1, backgroundColor: '#050505' }}>
      {/* LEFT SPINE LINE */}
      <View
        style={{
          position: 'absolute',
          left: 20,
          top: insets.top + 56,
          bottom: insets.bottom + 96,
          width: 1,
          backgroundColor: 'rgba(255,255,255,0.1)',
          zIndex: 1,
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 110,
        }}>

        {/* ── HEADER ──────────────────────────────────────────────── */}
        <MotiView
          from={{ opacity: 0, translateX: -14 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ type: 'timing', duration: 280 }}
          style={{ paddingLeft: 44, paddingRight: 20, marginBottom: 32 }}>

          {/* RABBIT LOGO — left spine anchor */}
          <View style={{ position: 'absolute', left: 7, top: 0 }}>
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                backgroundColor: '#FF0048',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#FF0048',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.45,
                shadowRadius: 8,
                elevation: 5,
              }}>
              <Rabbit size={13} color="#fff" strokeWidth={1.75} />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
            <View>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '600',
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: 2.5,
                  textTransform: 'uppercase',
                  marginBottom: 6,
                }}>
                Overview
              </Text>
              <Text
                style={{
                  fontSize: 42,
                  fontWeight: '500',
                  color: '#fff',
                  letterSpacing: -2.2,
                  lineHeight: 44,
                }}>
                Hey{'\n'}{USER.name}
              </Text>
            </View>

            {/* NOTIF + USER AVATAR */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 }}>
              <Pressable
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  backgroundColor: '#1A1A1A',
                  borderWidth: 1,
                  borderColor: '#2A2A2A',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Bell size={16} color="#555" strokeWidth={1.5} />
              </Pressable>
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  backgroundColor: '#FF0048',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{ fontSize: 12, fontWeight: '800', color: '#fff' }}>
                  {USER.initials}
                </Text>
              </View>
            </View>
          </View>
        </MotiView>

        {/* ── GRAY CARD — Recent Bills ─────────────────────────────── */}
        <MotiView
          from={{ opacity: 0, translateY: 28 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 320, delay: 80 }}
          style={{ marginHorizontal: 20, marginBottom: 14 }}>
          <View
            style={{
              backgroundColor: '#E6E6E6',
              borderRadius: 28,
              padding: 24,
            }}>
            {/* CARD TITLE */}
            <Text
              style={{
                fontSize: 30,
                fontWeight: '500',
                letterSpacing: -1.4,
                color: '#000',
                lineHeight: 32,
                marginBottom: 24,
              }}>
              Recent{'\n'}Bills
            </Text>

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
                  {/* DIAMOND STEP MARKER */}
                  <View
                    style={{
                      position: 'absolute',
                      left: -25,
                      top: 18,
                      width: 8,
                      height: 8,
                      borderBottomWidth: 1,
                      borderRightWidth: 1,
                      borderColor: 'rgba(0,0,0,0.5)',
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
                        justifyContent: 'space-between',
                      }}>
                      <View style={{ flex: 1, marginRight: 12 }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 7,
                            marginBottom: 5,
                          }}>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: '600',
                              color: '#000',
                              letterSpacing: -0.3,
                            }}
                            numberOfLines={1}>
                            {session.venue}
                          </Text>
                          <View
                            style={{
                              backgroundColor: STATUS_COLORS[session.status] + '25',
                              borderRadius: 100,
                              paddingHorizontal: 7,
                              paddingVertical: 2,
                            }}>
                            <Text
                              style={{
                                fontSize: 8.5,
                                fontWeight: '700',
                                color: STATUS_COLORS[session.status],
                                letterSpacing: 0.5,
                                textTransform: 'uppercase',
                              }}>
                              {session.status}
                            </Text>
                          </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                          <ParticipantStack participants={session.participants} />
                          <Text style={{ fontSize: 11, color: '#888', letterSpacing: 0.1 }}>
                            {session.date}
                          </Text>
                        </View>
                      </View>

                      <View style={{ alignItems: 'flex-end' }}>
                        <Text
                          style={{
                            fontSize: 9.5,
                            fontWeight: '600',
                            color: '#888',
                            textTransform: 'uppercase',
                            letterSpacing: 0.4,
                            marginBottom: 2,
                          }}>
                          My share
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: session.status === 'settled' ? '#00A550' : '#000',
                            letterSpacing: -0.6,
                          }}>
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

            {/* SEE ALL */}
            <Pressable style={{ marginTop: 16, alignSelf: 'flex-start' }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '600',
                  color: 'rgba(0,0,0,0.4)',
                  letterSpacing: 0.2,
                }}>
                See all sessions →
              </Text>
            </Pressable>
          </View>
        </MotiView>

        {/* ── PINK CARD — Balance ──────────────────────────────────── */}
        <MotiView
          from={{ opacity: 0, translateY: 28 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 320, delay: 160 }}
          style={{ marginHorizontal: 20, marginBottom: 14 }}>
          <View
            style={{
              backgroundColor: '#FF0048',
              borderRadius: 28,
              padding: 24,
            }}>
            {/* CARD TITLE */}
            <Text
              style={{
                fontSize: 30,
                fontWeight: '500',
                letterSpacing: -1.4,
                color: '#450010',
                lineHeight: 32,
                marginBottom: 24,
              }}>
              Your{'\n'}Balance
            </Text>

            {/* FLOW CONTAINER */}
            <View
              style={{
                paddingLeft: 20,
                borderLeftWidth: 1,
                borderLeftColor: 'rgba(69,0,16,0.22)',
                marginLeft: 4,
                gap: 20,
              }}>
              {/* NET */}
              <View style={{ position: 'relative' }}>
                <View
                  style={{
                    position: 'absolute',
                    left: -25,
                    top: 8,
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
                    opacity: 0.6,
                    marginBottom: 4,
                  }}>
                  Net owed to you
                </Text>
                <Text
                  style={{
                    fontSize: 52,
                    fontWeight: '500',
                    color: '#450010',
                    letterSpacing: -2.8,
                    lineHeight: 54,
                  }}>
                  ${net.toFixed(2)}
                </Text>
              </View>

              {/* YOU OWE */}
              <View style={{ position: 'relative' }}>
                <View
                  style={{
                    position: 'absolute',
                    left: -25,
                    top: 8,
                    width: 8,
                    height: 8,
                    borderBottomWidth: 1,
                    borderRightWidth: 1,
                    borderColor: '#450010',
                    transform: [{ rotate: '45deg' }],
                    opacity: 0.4,
                  }}
                />
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '700',
                    color: '#450010',
                    textTransform: 'uppercase',
                    letterSpacing: 1.2,
                    opacity: 0.6,
                    marginBottom: 2,
                  }}>
                  You owe
                </Text>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: '600',
                    color: '#450010',
                    letterSpacing: -1,
                    opacity: 0.75,
                  }}>
                  ${BALANCE.youOwe.toFixed(2)}
                </Text>
              </View>
            </View>

            {/* SETTLE UP CTA */}
            <Pressable
              style={{
                marginTop: 28,
                backgroundColor: '#450010',
                borderRadius: 16,
                padding: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{ fontSize: 16, fontWeight: '600', color: '#fff', letterSpacing: -0.2 }}>
                Settle Up
              </Text>
              <Text style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)' }}>→</Text>
            </Pressable>
          </View>
        </MotiView>
      </ScrollView>

      {/* ── NAV DOCK ────────────────────────────────────────────────── */}
      <NavDock activeTab={activeTab} onTabChange={setActiveTab} onNewSession={onNewSession} />
    </View>
  );
}
