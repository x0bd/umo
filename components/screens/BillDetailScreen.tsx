import {
  ArrowDownLeft,
  ArrowLeft,
  ArrowUpRight,
  Bell,
  CheckCircle2,
  Clock,
  FileText,
  Receipt,
  Share2,
  Users,
  Wallet,
} from 'lucide-react-native';
import { MotiView } from 'moti';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ─── Types ─────────────────────────────────────────────────────────────────────
export interface BillDetailSession {
  id: string;
  venue: string;
  venueIcon: any;
  venueColor: string;
  date?: string;
  time?: string;
  status: 'pending' | 'settled' | 'partial';
  myShare: number;
  currency: 'USD' | 'ZiG';
  direction?: 'owe' | 'owed';
  participants: { key: string }[];
}

interface Props {
  session: BillDetailSession;
  onBack: () => void;
}

// ─── Design tokens ─────────────────────────────────────────────────────────────
const STATUS_COLORS = { pending: '#FB8C00', settled: '#00A550', partial: '#1A73E8' } as const;
const STATUS_BG = { pending: '#FFF3E0', settled: '#E8F5EE', partial: '#EEF3FD' } as const;
const STATUS_LABELS = { pending: 'Pending', settled: 'Settled', partial: 'Partial' } as const;

// ─── Photos ────────────────────────────────────────────────────────────────────
const PHOTOS: Record<string, string> = {
  TM: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces',
  SN: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=faces',
  KC: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces',
  AM: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces',
  RM: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces',
  BN: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces',
  JK: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=faces',
};

// ─── Participant catalogue ──────────────────────────────────────────────────────
const PEOPLE: Record<string, { name: string; initials: string; color: string; role?: 'you' }> = {
  TM: { name: 'You', initials: 'TM', color: '#FF0048', role: 'you' },
  SN: { name: 'Sasha N.', initials: 'SN', color: '#1A73E8' },
  KC: { name: 'Kuda C.', initials: 'KC', color: '#00A550' },
  AM: { name: 'Ash M.', initials: 'AM', color: '#8B1CC8' },
  RM: { name: 'Rudo M.', initials: 'RM', color: '#F05A28' },
  BN: { name: 'Bry N.', initials: 'BN', color: '#9A6F00' },
  JK: { name: 'Jake K.', initials: 'JK', color: '#00796B' },
};

// ─── Mock bill line items per session ─────────────────────────────────────────
type LineItem = { name: string; price: number };
const BILL_ITEMS: Record<string, LineItem[]> = {
  '1': [
    { name: 'Beef Burger', price: 14.5 },
    { name: 'Chicken Wings', price: 12.0 },
    { name: 'Loaded Fries', price: 9.0 },
    { name: 'Coke × 4', price: 10.5 },
  ],
  '2': [
    { name: 'Peri-Peri Half Chicken', price: 18.0 },
    { name: 'Peri Chips', price: 8.0 },
    { name: 'Bottomless Soft Drink', price: 6.0 },
  ],
  '3': [
    { name: 'Vintage Armchair', price: 1800.0 },
    { name: 'Ceramic Planters × 3', price: 540.0 },
    { name: 'Woven Basket', price: 320.0 },
    { name: 'Delivery Fee', price: 180.0 },
  ],
  h1: [
    { name: 'Beef Burger', price: 14.5 },
    { name: 'Chicken Wings', price: 12.0 },
    { name: 'Loaded Fries', price: 9.0 },
    { name: 'Coke × 4', price: 10.5 },
  ],
  h2: [
    { name: 'Flat White', price: 4.5 },
    { name: 'Cappuccino', price: 4.0 },
    { name: 'Banana Bread', price: 3.5 },
  ],
  h3: [
    { name: 'Peri-Peri Half Chicken', price: 18.0 },
    { name: 'Peri Chips', price: 8.0 },
    { name: 'Soft Drink', price: 6.0 },
  ],
  h4: [
    { name: 'Sadza & Nyama', price: 15.0 },
    { name: 'Grilled Tilapia', price: 18.0 },
    { name: 'Local Brew × 2', price: 14.0 },
    { name: 'Tip', price: 5.0 },
  ],
  h5: [
    { name: 'Vintage Armchair', price: 1800.0 },
    { name: 'Ceramic Planters × 3', price: 540.0 },
    { name: 'Woven Basket', price: 320.0 },
    { name: 'Delivery Fee', price: 180.0 },
  ],
};

// ─── Mock per-participant share per session ─────────────────────────────────────
const PARTICIPANT_SHARES: Record<string, Record<string, { share: number; settled: boolean }>> = {
  '1': {
    TM: { share: 12.0, settled: false },
    SN: { share: 14.0, settled: false },
    KC: { share: 11.0, settled: true },
    AM: { share: 9.0, settled: false },
  },
  '2': {
    TM: { share: 8.0, settled: true },
    SN: { share: 8.0, settled: true },
    JK: { share: 8.0, settled: true },
    RM: { share: 8.0, settled: true },
  },
  '3': {
    TM: { share: 4200.0, settled: false },
    KC: { share: 4200.0, settled: true },
    BN: { share: 4200.0, settled: false },
  },
  h1: {
    TM: { share: 12.0, settled: false },
    SN: { share: 14.0, settled: false },
    KC: { share: 11.0, settled: true },
    AM: { share: 9.0, settled: false },
  },
  h2: {
    TM: { share: 6.5, settled: true },
    KC: { share: 6.0, settled: true },
  },
  h3: {
    TM: { share: 8.0, settled: true },
    RM: { share: 8.0, settled: true },
    JK: { share: 8.0, settled: true },
  },
  h4: {
    TM: { share: 18.0, settled: false },
    SN: { share: 18.0, settled: true },
    RM: { share: 16.0, settled: false },
  },
  h5: {
    TM: { share: 4200.0, settled: false },
    KC: { share: 4200.0, settled: true },
    BN: { share: 4200.0, settled: false },
  },
};

// ─── Helper: format currency ───────────────────────────────────────────────────
function fmt(amount: number, currency: 'USD' | 'ZiG') {
  if (currency === 'ZiG') return `ZiG ${amount.toLocaleString()}`;
  return `$${amount.toFixed(2)}`;
}

// ─── Sub-component: Section label ─────────────────────────────────────────────
function SectionLabel({ label }: { label: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
      <View style={{ width: 3, height: 14, borderRadius: 2, backgroundColor: '#FF0048' }} />
      <Text
        style={{
          fontSize: 9.5,
          fontWeight: '700',
          color: '#AAAAAA',
          letterSpacing: 1.6,
          textTransform: 'uppercase',
        }}>
        {label}
      </Text>
    </View>
  );
}

// ─── Sub-component: Avatar ─────────────────────────────────────────────────────
function PersonAvatar({ personKey, size = 40 }: { personKey: string; size?: number }) {
  const photo = PHOTOS[personKey];
  const person = PEOPLE[personKey];
  const radius = size * 0.3;

  if (photo) {
    return (
      <Image
        source={{ uri: photo }}
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          backgroundColor: '#E0E0E0',
        }}
      />
    );
  }
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        backgroundColor: (person?.color ?? '#666') + '20',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontSize: size * 0.35,
          fontWeight: '700',
          color: person?.color ?? '#666',
          letterSpacing: -0.3,
        }}>
        {person?.initials ?? personKey}
      </Text>
    </View>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export function BillDetailScreen({ session, onBack }: Props) {
  const insets = useSafeAreaInsets();

  const lineItems = BILL_ITEMS[session.id] ?? [];
  const pShareMap = PARTICIPANT_SHARES[session.id] ?? {};

  // Total = sum of line items, or fallback to myShare * participants
  const billTotal =
    lineItems.length > 0
      ? lineItems.reduce((s, i) => s + i.price, 0)
      : session.myShare * session.participants.length;

  const isOwed = session.direction === 'owed';
  const statusColor = STATUS_COLORS[session.status];
  const statusBg = STATUS_BG[session.status];

  const pendingCount = session.participants.filter((p) => {
    const ps = pShareMap[p.key];
    return ps ? !ps.settled : false;
  }).length;

  return (
    <View style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
      {/* ── TOP SAFE-AREA HEADER ──────────────────────────────────────── */}
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingHorizontal: 20,
          paddingBottom: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Pressable
          onPress={onBack}
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
            shadowOpacity: 0.06,
            shadowRadius: 6,
            elevation: 2,
          }}>
          <ArrowLeft size={18} color="#0E0E0E" strokeWidth={2} />
        </Pressable>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          {/* Share */}
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
              shadowOpacity: 0.06,
              shadowRadius: 6,
              elevation: 2,
            }}>
            <Share2 size={16} color="#444" strokeWidth={1.75} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 140 }}>
        {/* ── HERO CARD — Dark ──────────────────────────────────────────── */}
        <MotiView
          from={{ opacity: 0, translateY: 20, scale: 0.97 }}
          animate={{ opacity: 1, translateY: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          style={{ marginHorizontal: 20, marginBottom: 16 }}>
          <View
            style={{
              backgroundColor: '#141414',
              borderRadius: 28,
              padding: 24,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 12 },
              shadowOpacity: 0.35,
              shadowRadius: 28,
              elevation: 14,
            }}>
            {/* TOP ROW: icon + status pill */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: 18,
              }}>
              {/* VENUE ICON BADGE */}
              <View
                style={{
                  width: 66,
                  height: 66,
                  borderRadius: 20,
                  backgroundColor: session.venueColor + '22',
                  borderWidth: 1.5,
                  borderColor: session.venueColor + '40',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <session.venueIcon size={30} color={session.venueColor} strokeWidth={1.6} />
              </View>

              {/* STATUS + DIRECTION */}
              <View style={{ alignItems: 'flex-end', gap: 6 }}>
                <View
                  style={{
                    backgroundColor: statusBg,
                    borderRadius: 100,
                    paddingHorizontal: 12,
                    paddingVertical: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '700',
                      color: statusColor,
                      letterSpacing: 0.8,
                      textTransform: 'uppercase',
                    }}>
                    {STATUS_LABELS[session.status]}
                  </Text>
                </View>
                {session.direction && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                    }}>
                    {isOwed ? (
                      <ArrowDownLeft size={12} color="#00C853" strokeWidth={2.5} />
                    ) : (
                      <ArrowUpRight size={12} color="#FF0048" strokeWidth={2.5} />
                    )}
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '600',
                        color: isOwed ? '#00C853' : '#FF0048',
                        letterSpacing: 0.3,
                      }}>
                      {isOwed ? 'They owe you' : 'You owe'}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* VENUE NAME */}
            <Text
              style={{
                fontSize: 26,
                fontWeight: '600',
                color: '#fff',
                letterSpacing: -1.0,
                lineHeight: 28,
                marginBottom: 6,
              }}>
              {session.venue}
            </Text>

            {/* META: date · time · n people */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 24 }}>
              {session.date && (
                <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', letterSpacing: 0.1 }}>
                  {session.date}
                </Text>
              )}
              {session.date && session.time && (
                <View
                  style={{
                    width: 3,
                    height: 3,
                    borderRadius: 2,
                    backgroundColor: 'rgba(255,255,255,0.2)',
                  }}
                />
              )}
              {session.time && (
                <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', letterSpacing: 0.1 }}>
                  {session.time}
                </Text>
              )}
              <View
                style={{
                  width: 3,
                  height: 3,
                  borderRadius: 2,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                }}
              />
              <Users size={11} color="rgba(255,255,255,0.35)" strokeWidth={2} />
              <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', letterSpacing: 0.1 }}>
                {session.participants.length}{' '}
                {session.participants.length === 1 ? 'person' : 'people'}
              </Text>
            </View>

            {/* HAIRLINE */}
            <View
              style={{
                height: 1,
                backgroundColor: 'rgba(255,255,255,0.07)',
                marginBottom: 20,
              }}
            />

            {/* AMOUNTS: total + my share */}
            <View style={{ flexDirection: 'row', gap: 0 }}>
              {/* TOTAL */}
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 9,
                    fontWeight: '700',
                    color: 'rgba(255,255,255,0.3)',
                    textTransform: 'uppercase',
                    letterSpacing: 1.2,
                    marginBottom: 5,
                  }}>
                  Bill Total
                </Text>
                <Text
                  style={{
                    fontSize: 34,
                    fontWeight: '300',
                    color: '#fff',
                    letterSpacing: -2,
                    lineHeight: 36,
                  }}>
                  {fmt(billTotal, session.currency)}
                </Text>
              </View>

              {/* DIVIDER */}
              <View
                style={{
                  width: 1,
                  backgroundColor: 'rgba(255,255,255,0.07)',
                  marginHorizontal: 20,
                  alignSelf: 'stretch',
                }}
              />

              {/* MY SHARE */}
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 9,
                    fontWeight: '700',
                    color: 'rgba(255,255,255,0.3)',
                    textTransform: 'uppercase',
                    letterSpacing: 1.2,
                    marginBottom: 5,
                  }}>
                  Your Share
                </Text>
                <Text
                  style={{
                    fontSize: 34,
                    fontWeight: '600',
                    color: '#FF0048',
                    letterSpacing: -2,
                    lineHeight: 36,
                  }}>
                  {fmt(session.myShare, session.currency)}
                </Text>
              </View>
            </View>
          </View>
        </MotiView>

        {/* ── BILL BREAKDOWN ────────────────────────────────────────────── */}
        {lineItems.length > 0 && (
          <MotiView
            from={{ opacity: 0, translateY: 16 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 280, delay: 80 }}
            style={{ marginHorizontal: 20, marginBottom: 14 }}>
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 24,
                padding: 22,
                borderWidth: 1,
                borderColor: '#F0F0F0',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.04,
                shadowRadius: 10,
                elevation: 2,
              }}>
              <SectionLabel label="Bill Items" />

              {lineItems.map((item, i) => (
                <View key={i}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingVertical: 11,
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                      <View
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: '#E0E0E0',
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '500',
                          color: '#1A1A1A',
                          letterSpacing: -0.2,
                        }}>
                        {item.name}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: '#0E0E0E',
                        letterSpacing: -0.4,
                      }}>
                      {fmt(item.price, session.currency)}
                    </Text>
                  </View>
                  {i < lineItems.length - 1 && (
                    <View style={{ height: 1, backgroundColor: '#F5F5F5', marginLeft: 16 }} />
                  )}
                </View>
              ))}

              {/* TOTAL ROW */}
              <View
                style={{
                  height: 1,
                  backgroundColor: '#EBEBEB',
                  marginTop: 6,
                  marginBottom: 14,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '700',
                    color: '#AAAAAA',
                    letterSpacing: 0.5,
                    textTransform: 'uppercase',
                  }}>
                  Total
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '700',
                    color: '#0E0E0E',
                    letterSpacing: -0.8,
                  }}>
                  {fmt(billTotal, session.currency)}
                </Text>
              </View>
            </View>
          </MotiView>
        )}

        {/* ── PARTICIPANTS ──────────────────────────────────────────────── */}
        <MotiView
          from={{ opacity: 0, translateY: 16 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 280, delay: 140 }}
          style={{ marginHorizontal: 20, marginBottom: 14 }}>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 24,
              padding: 22,
              borderWidth: 1,
              borderColor: '#F0F0F0',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.04,
              shadowRadius: 10,
              elevation: 2,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 16,
              }}>
              <SectionLabel label="Participants" />
              {pendingCount > 0 && (
                <View
                  style={{
                    backgroundColor: '#FFF3E0',
                    borderRadius: 100,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    marginBottom: 16,
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '700',
                      color: '#FB8C00',
                      letterSpacing: 0.4,
                    }}>
                    {pendingCount} pending
                  </Text>
                </View>
              )}
            </View>

            {session.participants.map((p, i) => {
              const person = PEOPLE[p.key];
              const pShare = pShareMap[p.key];
              const isYou = person?.role === 'you';
              const settled = pShare?.settled ?? false;
              const share = pShare?.share ?? session.myShare;

              return (
                <View key={p.key}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 12,
                      gap: 12,
                    }}>
                    {/* AVATAR */}
                    <PersonAvatar personKey={p.key} size={44} />

                    {/* NAME + STATUS */}
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 14.5,
                          fontWeight: '600',
                          color: '#0E0E0E',
                          letterSpacing: -0.3,
                          marginBottom: 3,
                        }}>
                        {person?.name ?? p.key}
                        {isYou && (
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: '500',
                              color: '#BBBBBB',
                              letterSpacing: 0,
                            }}>
                            {' '}
                            (you)
                          </Text>
                        )}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 5,
                        }}>
                        {settled ? (
                          <CheckCircle2 size={11} color="#00A550" strokeWidth={2.5} />
                        ) : (
                          <Clock size={11} color="#FB8C00" strokeWidth={2.5} />
                        )}
                        <Text
                          style={{
                            fontSize: 11,
                            fontWeight: '600',
                            color: settled ? '#00A550' : '#FB8C00',
                            letterSpacing: 0.1,
                          }}>
                          {settled ? 'Settled' : isYou ? 'Pending' : 'Owes'}
                        </Text>
                      </View>
                    </View>

                    {/* AMOUNT */}
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '700',
                          color: settled ? '#BBBBBB' : isYou ? '#FF0048' : '#0E0E0E',
                          letterSpacing: -0.6,
                          textDecorationLine: settled ? 'line-through' : 'none',
                        }}>
                        {fmt(share, session.currency)}
                      </Text>
                    </View>
                  </View>
                  {i < session.participants.length - 1 && (
                    <View style={{ height: 1, backgroundColor: '#F5F5F5', marginLeft: 56 }} />
                  )}
                </View>
              );
            })}
          </View>
        </MotiView>

        {/* ── SPLIT INFO ────────────────────────────────────────────────── */}
        <MotiView
          from={{ opacity: 0, translateY: 14 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 270, delay: 190 }}
          style={{ marginHorizontal: 20, marginBottom: 14 }}>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 24,
              padding: 22,
              borderWidth: 1,
              borderColor: '#F0F0F0',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.04,
              shadowRadius: 10,
              elevation: 2,
            }}>
            <SectionLabel label="Split Details" />

            <View style={{ flexDirection: 'row', gap: 10 }}>
              {/* METHOD */}
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#F7F7F7',
                  borderRadius: 16,
                  padding: 14,
                  alignItems: 'center',
                  gap: 8,
                }}>
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    backgroundColor: '#FF0048' + '16',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <FileText size={16} color="#FF0048" strokeWidth={1.75} />
                </View>
                <Text
                  style={{
                    fontSize: 9,
                    fontWeight: '700',
                    color: '#AAAAAA',
                    letterSpacing: 1.2,
                    textTransform: 'uppercase',
                  }}>
                  Method
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: '#0E0E0E',
                    letterSpacing: -0.3,
                  }}>
                  Equal Split
                </Text>
              </View>

              {/* PEOPLE COUNT */}
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#F7F7F7',
                  borderRadius: 16,
                  padding: 14,
                  alignItems: 'center',
                  gap: 8,
                }}>
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    backgroundColor: '#1A73E8' + '16',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Users size={16} color="#1A73E8" strokeWidth={1.75} />
                </View>
                <Text
                  style={{
                    fontSize: 9,
                    fontWeight: '700',
                    color: '#AAAAAA',
                    letterSpacing: 1.2,
                    textTransform: 'uppercase',
                  }}>
                  People
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: '#0E0E0E',
                    letterSpacing: -0.3,
                  }}>
                  {session.participants.length}
                </Text>
              </View>

              {/* CURRENCY */}
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#F7F7F7',
                  borderRadius: 16,
                  padding: 14,
                  alignItems: 'center',
                  gap: 8,
                }}>
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    backgroundColor: '#00A550' + '16',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Wallet size={16} color="#00A550" strokeWidth={1.75} />
                </View>
                <Text
                  style={{
                    fontSize: 9,
                    fontWeight: '700',
                    color: '#AAAAAA',
                    letterSpacing: 1.2,
                    textTransform: 'uppercase',
                  }}>
                  Currency
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: '#0E0E0E',
                    letterSpacing: -0.3,
                  }}>
                  {session.currency}
                </Text>
              </View>
            </View>
          </View>
        </MotiView>
      </ScrollView>

      {/* ── BOTTOM ACTION BAR ─────────────────────────────────────────────── */}
      <MotiView
        from={{ opacity: 0, translateY: 32 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26, delay: 120 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : 24,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#EBEBEB',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -8 },
          shadowOpacity: 0.06,
          shadowRadius: 20,
          elevation: 16,
        }}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {/* SETTLE UP — primary CTA */}
          {session.status !== 'settled' && (
            <Pressable
              style={({ pressed }) => ({
                flex: 1,
                height: 56,
                backgroundColor: pressed ? '#CC003A' : '#FF0048',
                borderRadius: 18,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: 8,
                shadowColor: '#FF0048',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.4,
                shadowRadius: 16,
                elevation: 10,
              })}>
              <CheckCircle2 size={18} color="#fff" strokeWidth={2.5} />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: '#fff',
                  letterSpacing: -0.4,
                }}>
                Settle Up
              </Text>
            </Pressable>
          )}

          {/* REMIND ALL — secondary */}
          {session.status !== 'settled' && pendingCount > 0 && (
            <Pressable
              style={({ pressed }) => ({
                flex: 1,
                height: 56,
                backgroundColor: pressed ? '#F5F5F5' : '#F0F0F0',
                borderRadius: 18,
                borderWidth: 0,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: 8,
              })}>
              <Bell size={17} color="#0E0E0E" strokeWidth={1.75} />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '600',
                  color: '#0E0E0E',
                  letterSpacing: -0.3,
                }}>
                Remind All
              </Text>
            </Pressable>
          )}

          {/* If fully settled — show a "View Receipt" full-width button */}
          {session.status === 'settled' && (
            <Pressable
              style={({ pressed }) => ({
                flex: 1,
                height: 56,
                backgroundColor: pressed ? '#1A1A1A' : '#0E0E0E',
                borderRadius: 18,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: 8,
              })}>
              <Receipt size={17} color="#fff" strokeWidth={1.75} />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: '#fff',
                  letterSpacing: -0.4,
                }}>
                View Receipt
              </Text>
            </Pressable>
          )}
        </View>
      </MotiView>
    </View>
  );
}
