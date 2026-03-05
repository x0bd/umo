import { BillDetailSession } from './BillDetailScreen';
import {
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  Flame,
  ShoppingBag,
  Sparkles,
  UtensilsCrossed,
  Wallet2,
} from 'lucide-react-native';
import { MotiView } from 'moti';
import { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ─── Types ─────────────────────────────────────────────────────────────────────
type Filter = 'all' | 'pending' | 'settled' | 'you_owe';

// ─── Photos ────────────────────────────────────────────────────────────────────
const PHOTOS = {
  TM: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces',
  SN: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=faces',
  KC: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces',
  AM: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces',
  RM: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces',
  BN: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces',
  JK: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=faces',
};

// ─── Data ──────────────────────────────────────────────────────────────────────
const HISTORY = [
  {
    group: 'Today',
    totalSpent: 36.5,
    items: [
      {
        id: 'h1',
        venue: 'Grill & Chill',
        venueIcon: UtensilsCrossed,
        venueColor: '#FF6B35',
        time: '8:42 pm',
        status: 'pending',
        myShare: 12.0,
        currency: 'USD',
        direction: 'owe',
        participants: [{ key: 'TM' }, { key: 'SN' }, { key: 'KC' }, { key: 'AM' }],
      },
      {
        id: 'h2',
        venue: 'Java Coffee',
        venueIcon: Flame,
        venueColor: '#6F4E37',
        time: '9:15 am',
        status: 'settled',
        myShare: 6.5,
        currency: 'USD',
        direction: 'owed',
        participants: [{ key: 'TM' }, { key: 'KC' }],
      },
    ],
  },
  {
    group: 'Yesterday',
    totalSpent: 62.0,
    items: [
      {
        id: 'h3',
        venue: "Nando's Borrowdale",
        venueIcon: Flame,
        venueColor: '#E8350A',
        time: '7:30 pm',
        status: 'settled',
        myShare: 8.0,
        currency: 'USD',
        direction: 'owed',
        participants: [{ key: 'TM' }, { key: 'RM' }, { key: 'JK' }],
      },
      {
        id: 'h4',
        venue: 'Chicken Slice',
        venueIcon: UtensilsCrossed,
        venueColor: '#D4A017',
        time: '1:10 pm',
        status: 'pending',
        myShare: 18.0,
        currency: 'USD',
        direction: 'owe',
        participants: [{ key: 'TM' }, { key: 'SN' }, { key: 'AM' }],
      },
      {
        id: 'h5',
        venue: 'Sportsman Supplies',
        venueIcon: ShoppingBag,
        venueColor: '#1A73E8',
        time: '11:00 am',
        status: 'settled',
        myShare: 36.0,
        currency: 'USD',
        direction: 'owed',
        participants: [{ key: 'TM' }, { key: 'BN' }],
      },
    ],
  },
  {
    group: 'Mon 24 Feb',
    totalSpent: 4200,
    items: [
      {
        id: 'h6',
        venue: 'Avondale Flea Market',
        venueIcon: ShoppingBag,
        venueColor: '#9A6F00',
        time: '3:00 pm',
        status: 'partial',
        myShare: 4200,
        currency: 'ZiG',
        direction: 'owe',
        participants: [{ key: 'TM' }, { key: 'BN' }],
      },
    ],
  },
];

const TOTAL_SUMMARY = {
  settled: 50.5,
  pending: 30.0,
  youOwe: 12.0,
};

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

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'settled', label: 'Settled' },
  { key: 'you_owe', label: 'You Owe' },
];

// ─── ParticipantStack ─────────────────────────────────────────────────────────
function ParticipantStack({ participants }: { participants: { key: string }[] }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {participants.slice(0, 4).map((p, i) => {
        const src = PHOTOS[p.key as keyof typeof PHOTOS];
        return (
          <View
            key={i}
            style={{
              marginLeft: i === 0 ? 0 : -7,
              width: 22,
              height: 22,
              borderRadius: 11,
              overflow: 'hidden',
              borderWidth: 1.5,
              borderColor: '#E6E6E6',
              backgroundColor: '#ccc',
            }}>
            {src && <Image source={{ uri: src }} style={{ width: '100%', height: '100%' }} />}
          </View>
        );
      })}
      {participants.length > 4 && (
        <View
          style={{
            marginLeft: -7,
            width: 22,
            height: 22,
            borderRadius: 11,
            backgroundColor: '#D8D8D8',
            borderWidth: 1.5,
            borderColor: '#E6E6E6',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ fontSize: 7.5, fontWeight: '700', color: '#555' }}>
            +{participants.length - 4}
          </Text>
        </View>
      )}
    </View>
  );
}

// ─── SessionRow ───────────────────────────────────────────────────────────────
function SessionRow({
  item,
  isLast,
  onPress,
}: {
  item: (typeof HISTORY)[0]['items'][0];
  isLast: boolean;
  onPress?: () => void;
}) {
  const Icon = item.venueIcon;
  const isOwed = item.direction === 'owed';
  const formattedAmount =
    item.currency === 'ZiG'
      ? `ZiG ${(item.myShare as number).toLocaleString()}`
      : `$${(item.myShare as number).toFixed(2)}`;

  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          paddingVertical: 14,
          borderBottomWidth: isLast ? 0 : 1,
          borderBottomColor: 'rgba(0,0,0,0.06)',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 13,
        }}>
        {/* ICON BADGE */}
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 15,
            backgroundColor: item.venueColor + '15',
            flexShrink: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon size={22} color={item.venueColor} strokeWidth={1.75} />
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
              {item.venue}
            </Text>
            {/* STATUS PILL */}
            <View
              style={{
                backgroundColor: STATUS_BG[item.status],
                borderRadius: 100,
                paddingHorizontal: 8,
                paddingVertical: 3,
              }}>
              <Text
                style={{
                  fontSize: 9,
                  fontWeight: '700',
                  color: STATUS_COLORS[item.status],
                  letterSpacing: 0.5,
                  textTransform: 'uppercase',
                }}>
                {item.status}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            {/* LEFT: AVATARS + TIME */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
              <ParticipantStack participants={item.participants} />
              <Text style={{ fontSize: 11, color: '#999', letterSpacing: 0.1 }}>{item.time}</Text>
            </View>

            {/* RIGHT: AMOUNT + DIRECTION */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              {isOwed ? (
                <ArrowDownLeft size={11} color="#00A550" strokeWidth={2.5} />
              ) : (
                <ArrowUpRight size={11} color="#FF0048" strokeWidth={2.5} />
              )}
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '700',
                  color:
                    item.status === 'settled' && isOwed
                      ? '#00A550'
                      : item.status === 'settled'
                        ? '#555'
                        : isOwed
                          ? '#00A550'
                          : '#000',
                  letterSpacing: -0.5,
                }}>
                {formattedAmount}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export function HistoryScreen({
  onSessionPress,
}: {
  onSessionPress?: (item: BillDetailSession) => void;
}) {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<Filter>('all');

  const filteredHistory = HISTORY.map((group) => ({
    ...group,
    items: group.items.filter((item) => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'pending') return item.status === 'pending';
      if (activeFilter === 'settled') return item.status === 'settled';
      if (activeFilter === 'you_owe') return item.direction === 'owe';
      return true;
    }),
  })).filter((g) => g.items.length > 0);

  return (
    <View style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + 18,
          paddingBottom: insets.bottom + 128,
        }}>
        {/* ── HEADER ─────────────────────────────────────────────────── */}
        <MotiView
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 260 }}
          style={{
            paddingHorizontal: 20,
            marginBottom: 22,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              style={{
                fontSize: 9.5,
                fontWeight: '600',
                color: '#9A9A9A',
                letterSpacing: 1.6,
                textTransform: 'uppercase',
                marginBottom: 3,
              }}>
              February 2026
            </Text>
            <Text
              style={{
                fontSize: 34,
                fontWeight: '600',
                color: '#0E0E0E',
                letterSpacing: -1.4,
                lineHeight: 36,
              }}>
              Activity
            </Text>
          </View>
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
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 5,
              elevation: 1,
            }}>
            <Clock size={16} color="#444" strokeWidth={1.75} />
          </Pressable>
        </MotiView>

        {/* ── SUMMARY CARD — dark hero ───────────────────────────────── */}
        <MotiView
          from={{ opacity: 0, translateY: 18 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 300, delay: 50 }}
          style={{ marginHorizontal: 20, marginBottom: 16 }}>
          <View
            style={{
              backgroundColor: '#141414',
              borderRadius: 28,
              padding: 24,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.3,
              shadowRadius: 24,
              elevation: 12,
            }}>
            {/* LABEL */}
            <Text
              style={{
                fontSize: 9.5,
                fontWeight: '600',
                color: '#FF0048',
                letterSpacing: 1.6,
                textTransform: 'uppercase',
                marginBottom: 6,
              }}>
              Month to date
            </Text>

            {/* HERO TOTAL */}
            <Text
              style={{
                fontSize: 58,
                fontWeight: '300',
                color: '#fff',
                letterSpacing: -3.5,
                lineHeight: 58,
                marginBottom: 22,
              }}>
              $82.50
            </Text>

            {/* HAIRLINE */}
            <View
              style={{
                height: 1,
                backgroundColor: 'rgba(255,255,255,0.07)',
                marginBottom: 18,
              }}
            />

            {/* 3-COL STATS */}
            <View style={{ flexDirection: 'row' }}>
              {/* SETTLED */}
              <View style={{ flex: 1 }}>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                  <CheckCircle2 size={10} color="#00A550" strokeWidth={2.5} />
                  <Text
                    style={{
                      fontSize: 9,
                      fontWeight: '700',
                      color: 'rgba(255,255,255,0.3)',
                      textTransform: 'uppercase',
                      letterSpacing: 0.9,
                    }}>
                    Settled
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 19,
                    fontWeight: '600',
                    color: '#00C853',
                    letterSpacing: -0.8,
                  }}>
                  ${TOTAL_SUMMARY.settled.toFixed(2)}
                </Text>
              </View>

              {/* DIVIDER */}
              <View
                style={{
                  width: 1,
                  backgroundColor: 'rgba(255,255,255,0.07)',
                  marginHorizontal: 16,
                  alignSelf: 'stretch',
                }}
              />

              {/* PENDING */}
              <View style={{ flex: 1 }}>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                  <Sparkles size={10} color="#FB8C00" strokeWidth={2.5} />
                  <Text
                    style={{
                      fontSize: 9,
                      fontWeight: '700',
                      color: 'rgba(255,255,255,0.3)',
                      textTransform: 'uppercase',
                      letterSpacing: 0.9,
                    }}>
                    Pending
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 19,
                    fontWeight: '600',
                    color: '#FFB300',
                    letterSpacing: -0.8,
                  }}>
                  ${TOTAL_SUMMARY.pending.toFixed(2)}
                </Text>
              </View>

              {/* DIVIDER */}
              <View
                style={{
                  width: 1,
                  backgroundColor: 'rgba(255,255,255,0.07)',
                  marginHorizontal: 16,
                  alignSelf: 'stretch',
                }}
              />

              {/* YOU OWE */}
              <View style={{ flex: 1 }}>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                  <ArrowUpRight size={10} color="#FF0048" strokeWidth={2.5} />
                  <Text
                    style={{
                      fontSize: 9,
                      fontWeight: '700',
                      color: 'rgba(255,255,255,0.3)',
                      textTransform: 'uppercase',
                      letterSpacing: 0.9,
                    }}>
                    You Owe
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 19,
                    fontWeight: '600',
                    color: '#FF0048',
                    letterSpacing: -0.8,
                  }}>
                  ${TOTAL_SUMMARY.youOwe.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </MotiView>

        {/* ── FILTER TABS ─────────────────────────────────────────────── */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 220, delay: 100 }}
          style={{ marginBottom: 18 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}>
            {FILTERS.map((f) => {
              const active = activeFilter === f.key;
              return (
                <Pressable key={f.key} onPress={() => setActiveFilter(f.key)}>
                  <View
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 9,
                      borderRadius: 100,
                      backgroundColor: active ? '#0E0E0E' : '#fff',
                      borderWidth: 1,
                      borderColor: active ? '#0E0E0E' : '#E8E8E8',
                      shadowColor: active ? '#000' : 'transparent',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: active ? 0.15 : 0,
                      shadowRadius: 8,
                      elevation: active ? 4 : 0,
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '600',
                        color: active ? '#fff' : '#888',
                        letterSpacing: -0.2,
                      }}>
                      {f.label}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        </MotiView>

        {/* ── GROUPED HISTORY ─────────────────────────────────────────── */}
        {filteredHistory.map((group, gi) => (
          <MotiView
            key={group.group}
            from={{ opacity: 0, translateY: 16 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 280, delay: 120 + gi * 60 }}
            style={{ marginHorizontal: 20, marginBottom: 14 }}>
            <View
              style={{
                backgroundColor: '#E6E6E6',
                borderRadius: 28,
                padding: 24,
              }}>
              {/* GROUP HEADER */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  marginBottom: 20,
                }}>
                {/* LEFT: GROUP LABEL */}
                <View>
                  <Text
                    style={{
                      fontSize: 9,
                      fontWeight: '700',
                      color: 'rgba(0,0,0,0.35)',
                      textTransform: 'uppercase',
                      letterSpacing: 1.4,
                      marginBottom: 3,
                    }}>
                    {group.group}
                  </Text>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: '500',
                      color: '#000',
                      letterSpacing: -1,
                    }}>
                    {group.items.length} transaction{group.items.length !== 1 ? 's' : ''}
                  </Text>
                </View>

                {/* RIGHT: GROUP TOTAL */}
                <View style={{ alignItems: 'flex-end' }}>
                  <Text
                    style={{
                      fontSize: 9,
                      fontWeight: '700',
                      color: 'rgba(0,0,0,0.35)',
                      textTransform: 'uppercase',
                      letterSpacing: 1.2,
                      marginBottom: 3,
                    }}>
                    Total
                  </Text>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: '700',
                      color: '#000',
                      letterSpacing: -1,
                    }}>
                    {group.items[0].currency === 'ZiG'
                      ? `ZiG ${group.totalSpent.toLocaleString()}`
                      : `$${group.totalSpent.toFixed(2)}`}
                  </Text>
                </View>
              </View>

              {/* HAIRLINE */}
              <View
                style={{
                  height: 1,
                  backgroundColor: 'rgba(0,0,0,0.07)',
                  marginBottom: 4,
                }}
              />

              {/* ROWS */}
              {group.items.map((item, ii) => (
                <SessionRow
                  key={item.id}
                  item={item}
                  isLast={ii === group.items.length - 1}
                  onPress={() => onSessionPress?.(item as unknown as BillDetailSession)}
                />
              ))}

              {/* SEE MORE FOOTER */}
              {group.items.length >= 3 && (
                <>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: 'rgba(0,0,0,0.06)',
                      marginTop: 4,
                      marginBottom: 12,
                    }}
                  />
                  <Pressable
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 4,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '700',
                        color: 'rgba(0,0,0,0.35)',
                        letterSpacing: 0.2,
                      }}>
                      View all from {group.group}
                    </Text>
                    <ChevronRight size={12} color="rgba(0,0,0,0.35)" strokeWidth={2.5} />
                  </Pressable>
                </>
              )}
            </View>
          </MotiView>
        ))}

        {/* ── EMPTY STATE ─────────────────────────────────────────────── */}
        {filteredHistory.length === 0 && (
          <MotiView
            from={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'timing', duration: 260 }}
            style={{ marginHorizontal: 20 }}>
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 28,
                padding: 48,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#EBEBEB',
              }}>
              <View
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  backgroundColor: '#F4F4F4',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 14,
                }}>
                <Wallet2 size={22} color="#999" strokeWidth={1.5} />
              </View>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '600',
                  color: '#0E0E0E',
                  letterSpacing: -0.5,
                  marginBottom: 6,
                }}>
                Nothing here
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: '#BBBBBB',
                  textAlign: 'center',
                  lineHeight: 18,
                }}>
                No transactions match this filter yet.
              </Text>
            </View>
          </MotiView>
        )}
      </ScrollView>
    </View>
  );
}
