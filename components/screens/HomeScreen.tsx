import { Bell, Plus, Rabbit, Receipt } from 'lucide-react-native';
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
    total: 47.5,
    currency: 'USD',
    status: 'pending',
    myShare: 12.0,
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
    total: 32.0,
    currency: 'USD',
    status: 'settled',
    myShare: 8.0,
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
    total: 18500,
    currency: 'ZiG',
    status: 'partial',
    myShare: 4200,
    participants: [
      { initials: 'TM', color: '#FF0048' },
      { initials: 'BN', color: '#9A6F00' },
    ],
  },
];

const BALANCE = {
  youOwe: 12.0,
  owedToYou: 27.5,
  currency: 'USD',
};

// ─── Sub-components ────────────────────────────────────────────────────────

function Avatar({
  initials,
  color,
  size = 36,
}: {
  initials: string;
  color: string;
  size?: number;
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color + '22',
        borderWidth: 1.5,
        borderColor: color + '55',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontSize: size * 0.3,
          fontWeight: '700',
          color: color,
          letterSpacing: -0.3,
        }}>
        {initials}
      </Text>
    </View>
  );
}

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  settled: 'Settled',
  partial: 'Partial',
};
const STATUS_COLORS: Record<string, string> = {
  pending: '#FB8C00',
  settled: '#00C853',
  partial: '#1A73E8',
};
const STATUS_BG: Record<string, string> = {
  pending: '#FFF3E0',
  settled: '#E8FAF0',
  partial: '#E8F1FD',
};

function SessionCard({ session, delay }: { session: (typeof SESSIONS)[0]; delay: number }) {
  const [pressed, setPressed] = useState(false);
  const statusColor = STATUS_COLORS[session.status];
  const statusBg = STATUS_BG[session.status];
  const statusLabel = STATUS_LABELS[session.status];

  return (
    <MotiView
      from={{ opacity: 0, translateY: 16 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 240, delay }}>
      <Pressable onPressIn={() => setPressed(true)} onPressOut={() => setPressed(false)}>
        <MotiView
          animate={{ scale: pressed ? 0.985 : 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{
            backgroundColor: '#fff',
            borderRadius: 22,
            borderWidth: 1,
            borderColor: '#EBEBEB',
            padding: 18,
            marginBottom: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.04,
            shadowRadius: 8,
            elevation: 1,
          }}>
          {/* TOP ROW */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14 }}>
            {/* ICON */}
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                backgroundColor: '#F6F6F6',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}>
              <Receipt size={20} color="#555" strokeWidth={1.5} />
            </View>

            {/* TITLE + DATE */}
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 15.5,
                  fontWeight: '700',
                  color: '#0E0E0E',
                  letterSpacing: -0.5,
                  marginBottom: 3,
                }}
                numberOfLines={1}>
                {session.venue}
              </Text>
              <Text style={{ fontSize: 12, color: '#AAAAAA', letterSpacing: 0.1 }}>
                {session.date}
              </Text>
            </View>

            {/* STATUS PILL */}
            <View
              style={{
                backgroundColor: statusBg,
                borderRadius: 100,
                paddingHorizontal: 10,
                paddingVertical: 4,
              }}>
              <Text
                style={{
                  fontSize: 10.5,
                  fontWeight: '700',
                  color: statusColor,
                  letterSpacing: 0.4,
                }}>
                {statusLabel}
              </Text>
            </View>
          </View>

          {/* DIVIDER */}
          <View style={{ height: 1, backgroundColor: '#F4F4F4', marginBottom: 14 }} />

          {/* BOTTOM ROW */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* PARTICIPANT AVATARS */}
            <View style={{ flexDirection: 'row', marginRight: 'auto' }}>
              {session.participants.slice(0, 4).map((p, i) => (
                <View
                  key={i}
                  style={{
                    marginLeft: i === 0 ? 0 : -8,
                    borderWidth: 2,
                    borderColor: '#fff',
                    borderRadius: 18,
                  }}>
                  <Avatar initials={p.initials} color={p.color} size={28} />
                </View>
              ))}
              {session.participants.length > 4 && (
                <View
                  style={{
                    marginLeft: -8,
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: '#F0F0F0',
                    borderWidth: 2,
                    borderColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{ fontSize: 9, fontWeight: '700', color: '#888' }}>
                    +{session.participants.length - 4}
                  </Text>
                </View>
              )}
            </View>

            {/* AMOUNT INFO */}
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 11, color: '#AAAAAA', letterSpacing: 0.1, marginBottom: 1 }}>
                My share
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: session.status === 'settled' ? '#00C853' : '#0E0E0E',
                  letterSpacing: -0.6,
                }}>
                {session.currency === 'ZiG'
                  ? `ZiG ${session.myShare.toLocaleString()}`
                  : `$${session.myShare.toFixed(2)}`}
              </Text>
            </View>
          </View>
        </MotiView>
      </Pressable>
    </MotiView>
  );
}

// ─── Main screen ─────────────────────────────────────────────────────────────

export function HomeScreen({ onNewSession }: Props) {
  const insets = useSafeAreaInsets();
  const net = BALANCE.owedToYou - BALANCE.youOwe;

  return (
    <View style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
        {/* ── DARK HEADER CARD ─────────────────────────────────────── */}
        <MotiView
          from={{ opacity: 0, translateY: -8 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 280 }}>
          <View
            style={{
              backgroundColor: '#0E0E0E',
              paddingTop: insets.top + 16,
              paddingBottom: 28,
              paddingHorizontal: 24,
              borderBottomLeftRadius: 32,
              borderBottomRightRadius: 32,
            }}>
            {/* NAV ROW */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 28,
              }}>
              {/* LOGO */}
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 9,
                    backgroundColor: '#FF0048',
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: '#FF0048',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.45,
                    shadowRadius: 8,
                    elevation: 5,
                  }}>
                  <Rabbit size={14} color="#fff" strokeWidth={1.75} />
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#fff',
                    letterSpacing: -0.8,
                  }}>
                  umo
                </Text>
              </View>

              {/* RIGHT: NOTIF + AVATAR */}
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Pressable
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    backgroundColor: '#1A1A1A',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Bell size={17} color="#888" strokeWidth={1.75} />
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
                  <Text style={{ fontSize: 13, fontWeight: '800', color: '#fff' }}>
                    {USER.initials}
                  </Text>
                </View>
              </View>
            </View>

            {/* GREETING */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 22 }}>
              <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#FF0048' }} />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '700',
                  letterSpacing: 3,
                  color: '#FF0048',
                  textTransform: 'uppercase',
                }}>
                Overview
              </Text>
            </View>

            <Text
              style={{
                fontSize: 13,
                color: '#666',
                letterSpacing: 0.05,
                marginBottom: 4,
              }}>
              Hey {USER.name} 👋
            </Text>
            <Text
              style={{
                fontSize: 38,
                fontWeight: '600',
                color: net >= 0 ? '#fff' : '#FF4D4D',
                letterSpacing: -2.2,
                lineHeight: 40,
                marginBottom: 24,
              }}>
              {net >= 0 ? `+$${net.toFixed(2)}` : `-$${Math.abs(net).toFixed(2)}`}
            </Text>

            {/* BALANCE PILLS ROW */}
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#1A1A1A',
                  borderRadius: 16,
                  padding: 14,
                  borderWidth: 1,
                  borderColor: '#2A2A2A',
                }}>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '600',
                    color: '#555',
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    marginBottom: 6,
                  }}>
                  You owe
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: '#FF6B6B',
                    letterSpacing: -0.8,
                  }}>
                  ${BALANCE.youOwe.toFixed(2)}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#1A1A1A',
                  borderRadius: 16,
                  padding: 14,
                  borderWidth: 1,
                  borderColor: '#2A2A2A',
                }}>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '600',
                    color: '#555',
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    marginBottom: 6,
                  }}>
                  Owed to you
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: '#4ADE80',
                    letterSpacing: -0.8,
                  }}>
                  ${BALANCE.owedToYou.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </MotiView>

        {/* ── SESSIONS LIST ─────────────────────────────────────────── */}
        <View style={{ paddingHorizontal: 20, paddingTop: 28 }}>
          {/* SECTION HEADER */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
              marginBottom: 18,
            }}>
            {/* LEFT SPINE */}
            <View style={{ width: 1, height: 28, backgroundColor: '#DEDEDE', borderRadius: 1 }} />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <View
                  style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#FF0048' }}
                />
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '700',
                    letterSpacing: 3.5,
                    color: '#FF0048',
                    textTransform: 'uppercase',
                  }}>
                  Recent Sessions
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: '600',
                  color: '#0E0E0E',
                  letterSpacing: -1.2,
                  marginTop: 2,
                }}>
                {SESSIONS.length} bills
              </Text>
            </View>
            <Pressable
              style={{
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 100,
                borderWidth: 1.5,
                borderColor: '#E0E0E0',
              }}>
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#555', letterSpacing: 0.1 }}>
                See all
              </Text>
            </Pressable>
          </View>

          {/* CARDS */}
          {SESSIONS.map((session, i) => (
            <SessionCard key={session.id} session={session} delay={i * 60} />
          ))}
        </View>
      </ScrollView>

      {/* ── NEW SESSION FAB ───────────────────────────────────────── */}
      <MotiView
        from={{ opacity: 0, translateY: 40 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22, delay: 300 }}
        style={{
          position: 'absolute',
          bottom: insets.bottom + 24,
          left: 24,
          right: 24,
        }}>
        <Pressable onPress={onNewSession}>
          <MotiView
            style={{
              backgroundColor: '#FF0048',
              borderRadius: 18,
              paddingHorizontal: 24,
              paddingVertical: 18,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              shadowColor: '#FF0048',
              shadowOffset: { width: 0, height: 12 },
              shadowOpacity: 0.42,
              shadowRadius: 20,
              elevation: 10,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Plus size={18} color="#fff" strokeWidth={2.5} />
              </View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: '#fff',
                  letterSpacing: -0.4,
                }}>
                New Session
              </Text>
            </View>
            <Text style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)' }}>→</Text>
          </MotiView>
        </Pressable>
      </MotiView>
    </View>
  );
}
