import {
  ArrowDownLeft,
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock,
  Flame,
  Plus,
  Search,
  ShoppingBag,
  UtensilsCrossed,
  X,
} from 'lucide-react-native';
import { AnimatePresence, MotiView } from 'moti';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Friend {
  key: string;
  name: string;
  handle: string;
  photo: string;
  color: string;
  owes: number; // + means they owe YOU, - means YOU owe them
  currency: 'USD' | 'ZiG';
  sessions: SharedSession[];
}

interface SharedSession {
  id: string;
  venue: string;
  date: string;
  amount: number;
  currency: 'USD' | 'ZiG';
  Icon: typeof UtensilsCrossed;
  color: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const PHOTOS = {
  SN: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=faces',
  KC: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces',
  AM: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces',
  RM: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces',
  BN: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces',
  JK: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=faces',
};

const FRIENDS: Friend[] = [
  {
    key: 'SN',
    name: 'Sasha N.',
    handle: '@sasha',
    photo: PHOTOS.SN,
    color: '#1A73E8',
    owes: 8.5,
    currency: 'USD',
    sessions: [
      {
        id: 's1',
        venue: 'Grill & Chill',
        date: 'Today',
        amount: 8.5,
        currency: 'USD',
        Icon: UtensilsCrossed,
        color: '#FF6B35',
      },
      {
        id: 's2',
        venue: "Nando's",
        date: 'Fri',
        amount: 4.0,
        currency: 'USD',
        Icon: Flame,
        color: '#E8350A',
      },
    ],
  },
  {
    key: 'KC',
    name: 'Kuda C.',
    handle: '@kuda',
    photo: PHOTOS.KC,
    color: '#00A550',
    owes: 14.0,
    currency: 'USD',
    sessions: [
      {
        id: 's3',
        venue: 'Avondale Market',
        date: 'Wed',
        amount: 14.0,
        currency: 'USD',
        Icon: ShoppingBag,
        color: '#1A73E8',
      },
    ],
  },
  {
    key: 'AM',
    name: 'Ash M.',
    handle: '@ashm',
    photo: PHOTOS.AM,
    color: '#8B1CC8',
    owes: 5.0,
    currency: 'USD',
    sessions: [
      {
        id: 's4',
        venue: 'Coffee Spot',
        date: 'Mon',
        amount: 5.0,
        currency: 'USD',
        Icon: Flame,
        color: '#6F4E37',
      },
    ],
  },
  {
    key: 'RM',
    name: 'Rudo M.',
    handle: '@rudo',
    photo: PHOTOS.RM,
    color: '#F05A28',
    owes: -12.0,
    currency: 'USD',
    sessions: [
      {
        id: 's5',
        venue: 'BookCafe',
        date: 'Last week',
        amount: -12.0,
        currency: 'USD',
        Icon: Clock,
        color: '#9A9A9A',
      },
    ],
  },
  {
    key: 'BN',
    name: 'Bry N.',
    handle: '@bry',
    photo: PHOTOS.BN,
    color: '#9A6F00',
    owes: 4200,
    currency: 'ZiG',
    sessions: [
      {
        id: 's6',
        venue: 'Eastgate Mall',
        date: 'Tue',
        amount: 4200,
        currency: 'ZiG',
        Icon: ShoppingBag,
        color: '#9A6F00',
      },
    ],
  },
  {
    key: 'JK',
    name: 'Jamal K.',
    handle: '@jamal',
    photo: PHOTOS.JK,
    color: '#C82060',
    owes: 0,
    currency: 'USD',
    sessions: [],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

type Currency = 'USD' | 'ZiG';

function formatAmt(amount: number, currency: Currency) {
  const abs = Math.abs(amount);
  if (currency === 'ZiG') return `ZiG ${abs.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  return `$${abs.toFixed(2)}`;
}

// ─── SectionLabel ─────────────────────────────────────────────────────────────

function SectionLabel({ label }: { label: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 14 }}>
      <View style={{ width: 3, height: 14, borderRadius: 2, backgroundColor: '#FF0048' }} />
      <Text
        style={{
          fontSize: 11,
          fontWeight: '700',
          color: '#9A9A9A',
          letterSpacing: 1.1,
          textTransform: 'uppercase',
        }}>
        {label}
      </Text>
    </View>
  );
}

// ─── Mini avatar stack ────────────────────────────────────────────────────────

function AvatarStack({ friends, max = 3 }: { friends: Friend[]; max?: number }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {friends.slice(0, max).map((f, i) => (
        <View
          key={f.key}
          style={{
            marginLeft: i === 0 ? 0 : -7,
            width: 22,
            height: 22,
            borderRadius: 11,
            overflow: 'hidden',
            borderWidth: 1.5,
            borderColor: 'rgba(255,255,255,0.12)',
          }}>
          <Image source={{ uri: f.photo }} style={{ width: '100%', height: '100%' }} />
        </View>
      ))}
      {friends.length > max && (
        <View
          style={{
            marginLeft: -7,
            width: 22,
            height: 22,
            borderRadius: 11,
            backgroundColor: 'rgba(255,255,255,0.12)',
            borderWidth: 1.5,
            borderColor: 'rgba(255,255,255,0.12)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ fontSize: 8, fontWeight: '700', color: 'rgba(255,255,255,0.6)' }}>
            +{friends.length - max}
          </Text>
        </View>
      )}
    </View>
  );
}

// ─── BalancePill ──────────────────────────────────────────────────────────────

function BalancePill({ owes, currency }: { owes: number; currency: Currency }) {
  if (owes === 0) {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        <View
          style={{
            width: 18,
            height: 18,
            borderRadius: 9,
            backgroundColor: '#E8F5E9',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Check size={10} color="#2E7D32" strokeWidth={3} />
        </View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#9A9A9A' }}>Settled</Text>
      </View>
    );
  }
  const positive = owes > 0;
  return (
    <View
      style={{
        backgroundColor: positive ? 'rgba(0,165,80,0.1)' : 'rgba(255,0,72,0.09)',
        borderRadius: 100,
        paddingHorizontal: 10,
        paddingVertical: 4,
      }}>
      <Text
        style={{
          fontSize: 12.5,
          fontWeight: '700',
          color: positive ? '#00A550' : '#FF0048',
          letterSpacing: -0.3,
        }}>
        {positive ? '+' : '−'}
        {formatAmt(owes, currency)}
      </Text>
    </View>
  );
}

// ─── FriendRow ────────────────────────────────────────────────────────────────

function FriendRow({
  friend,
  index,
  expanded,
  onPress,
  onSettle,
}: {
  friend: Friend;
  index: number;
  expanded: boolean;
  onPress: () => void;
  onSettle: () => void;
}) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 16 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 280, delay: index * 50 }}
      style={{ marginBottom: 10 }}>
      <Pressable onPress={onPress}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 22,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: expanded ? friend.color + '30' : 'rgba(0,0,0,0.06)',
            shadowColor: expanded ? friend.color : '#000',
            shadowOffset: { width: 0, height: expanded ? 10 : 4 },
            shadowOpacity: expanded ? 0.14 : 0.07,
            shadowRadius: expanded ? 20 : 10,
            elevation: expanded ? 5 : 2,
          }}>
          {/* ── Main row ── */}
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 14, gap: 13 }}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                overflow: 'hidden',
                borderWidth: 2,
                borderColor: friend.color + '55',
              }}>
              <Image
                source={{ uri: friend.photo }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </View>

            <View style={{ flex: 1, gap: 2 }}>
              <Text
                style={{
                  fontSize: 14.5,
                  fontWeight: '700',
                  color: '#0E0E0E',
                  letterSpacing: -0.35,
                }}>
                {friend.name}
              </Text>
              <Text style={{ fontSize: 11.5, color: '#AAAAAA', fontWeight: '500' }}>
                {friend.handle}
                {friend.sessions.length > 0
                  ? `  ·  ${friend.sessions.length} session${friend.sessions.length !== 1 ? 's' : ''}`
                  : ''}
              </Text>
            </View>

            <BalancePill owes={friend.owes} currency={friend.currency} />

            <MotiView
              animate={{ rotate: expanded ? '180deg' : '0deg' }}
              transition={{ type: 'spring', stiffness: 380, damping: 22 }}>
              <ChevronDown size={16} color="#CCCCCC" strokeWidth={2.5} />
            </MotiView>
          </View>

          {/* ── Expanded panel ── */}
          <AnimatePresence>
            {expanded && (
              <MotiView
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'timing', duration: 180 }}>
                <View
                  style={{
                    height: 1,
                    backgroundColor: 'rgba(0,0,0,0.05)',
                    marginHorizontal: 14,
                  }}
                />

                {/* Session rows */}
                {friend.sessions.length > 0 ? (
                  <View
                    style={{
                      margin: 12,
                      backgroundColor: '#F5F5F5',
                      borderRadius: 16,
                      overflow: 'hidden',
                    }}>
                    {friend.sessions.map((s, si) => {
                      const Icon = s.Icon;
                      return (
                        <View
                          key={s.id}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                            paddingHorizontal: 12,
                            paddingVertical: 11,
                            borderBottomWidth: si < friend.sessions.length - 1 ? 1 : 0,
                            borderBottomColor: 'rgba(0,0,0,0.05)',
                          }}>
                          <View
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 10,
                              backgroundColor: s.color + '18',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Icon size={14} color={s.color} strokeWidth={1.9} />
                          </View>
                          <Text
                            style={{
                              flex: 1,
                              fontSize: 13,
                              fontWeight: '600',
                              color: '#1A1A1A',
                              letterSpacing: -0.25,
                            }}
                            numberOfLines={1}>
                            {s.venue}
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              color: '#AAAAAA',
                              fontWeight: '500',
                              marginRight: 6,
                            }}>
                            {s.date}
                          </Text>
                          <Text
                            style={{
                              fontSize: 13.5,
                              fontWeight: '700',
                              color: '#1A1A1A',
                              letterSpacing: -0.35,
                              minWidth: 52,
                              textAlign: 'right',
                            }}>
                            {formatAmt(s.amount, s.currency)}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                ) : (
                  <View style={{ padding: 18, alignItems: 'center' }}>
                    <Text style={{ fontSize: 12.5, color: '#BBBBBB', fontWeight: '500' }}>
                      No sessions yet
                    </Text>
                  </View>
                )}

                {/* Action buttons */}
                {friend.owes !== 0 && (
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 8,
                      paddingHorizontal: 12,
                      paddingBottom: 12,
                      paddingTop: 2,
                    }}>
                    <Pressable
                      onPress={(e) => {
                        e.stopPropagation();
                        onSettle();
                      }}
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6,
                        backgroundColor: '#FF0048',
                        borderRadius: 14,
                        paddingVertical: 12,
                        shadowColor: '#FF0048',
                        shadowOffset: { width: 0, height: 5 },
                        shadowOpacity: 0.3,
                        shadowRadius: 10,
                        elevation: 4,
                      }}>
                      <Check size={13} color="#fff" strokeWidth={2.8} />
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: '700',
                          color: '#FFF',
                          letterSpacing: -0.2,
                        }}>
                        Settle up
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={(e) => e.stopPropagation()}
                      style={{
                        paddingHorizontal: 18,
                        backgroundColor: 'rgba(0,0,0,0.05)',
                        borderRadius: 14,
                        paddingVertical: 12,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: '700',
                          color: '#888',
                          letterSpacing: -0.2,
                        }}>
                        Remind
                      </Text>
                    </Pressable>
                  </View>
                )}
              </MotiView>
            )}
          </AnimatePresence>
        </View>
      </Pressable>
    </MotiView>
  );
}

// ─── Add Friend Sheet ─────────────────────────────────────────────────────────

function AddFriendSheet({
  visible,
  onClose,
  onAdd,
}: {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string, handle: string, photo: string) => void;
}) {
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [photo, setPhoto] = useState('');
  const insets = useSafeAreaInsets();

  function submit() {
    if (!name.trim()) return;
    onAdd(
      name.trim(),
      handle.trim() || `@${name.trim().toLowerCase().replace(/\s+/g, '')}`,
      photo.trim()
    );
    setName('');
    setHandle('');
    setPhoto('');
    onClose();
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'timing', duration: 220 }}
            style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <Pressable style={{ flex: 1 }} onPress={onClose} />
          </MotiView>

          {/* Sheet */}
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : undefined}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <MotiView
              from={{ translateY: 360 }}
              animate={{ translateY: 0 }}
              exit={{ translateY: 360 }}
              transition={{ type: 'spring', stiffness: 360, damping: 34 }}
              style={{
                backgroundColor: '#141414',
                borderTopLeftRadius: 32,
                borderTopRightRadius: 32,
                paddingHorizontal: 24,
                paddingTop: 16,
                paddingBottom: insets.bottom + 28,
              }}>
              {/* Handle */}
              <View
                style={{
                  width: 36,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  alignSelf: 'center',
                  marginBottom: 26,
                }}
              />

              {/* Header */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 26,
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: '600',
                      color: '#FFFFFF',
                      letterSpacing: -0.9,
                    }}>
                    Add Friend
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.3)',
                      marginTop: 2,
                      fontWeight: '500',
                    }}>
                    Invite them to split with you
                  </Text>
                </View>
                <Pressable onPress={onClose}>
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <X size={14} color="rgba(255,255,255,0.55)" strokeWidth={2.5} />
                  </View>
                </Pressable>
              </View>

              {/* Fields */}
              <View style={{ gap: 10 }}>
                <View
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.07)',
                    borderRadius: 18,
                    paddingHorizontal: 16,
                    paddingVertical: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 11,
                  }}>
                  <Text style={{ fontSize: 16, color: 'rgba(255,255,255,0.18)' }}>👤</Text>
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Full name"
                    placeholderTextColor="rgba(255,255,255,0.2)"
                    returnKeyType="next"
                    style={{
                      flex: 1,
                      fontSize: 15,
                      fontWeight: '600',
                      color: '#FFFFFF',
                      padding: 0,
                    }}
                  />
                </View>

                <View
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.07)',
                    borderRadius: 18,
                    paddingHorizontal: 16,
                    paddingVertical: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 11,
                  }}>
                  <Text style={{ fontSize: 14, fontWeight: '800', color: 'rgba(255,255,255,0.2)' }}>
                    @
                  </Text>
                  <TextInput
                    value={handle}
                    onChangeText={setHandle}
                    placeholder="handle (optional)"
                    placeholderTextColor="rgba(255,255,255,0.2)"
                    returnKeyType="next"
                    autoCapitalize="none"
                    style={{
                      flex: 1,
                      fontSize: 15,
                      fontWeight: '600',
                      color: '#FFFFFF',
                      padding: 0,
                    }}
                  />
                </View>

                <View
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.07)',
                    borderRadius: 18,
                    paddingHorizontal: 16,
                    paddingVertical: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 11,
                  }}>
                  <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.2)' }}>🔗</Text>
                  <TextInput
                    value={photo}
                    onChangeText={setPhoto}
                    placeholder="Photo URL (optional)"
                    placeholderTextColor="rgba(255,255,255,0.2)"
                    returnKeyType="done"
                    autoCapitalize="none"
                    keyboardType="url"
                    onSubmitEditing={submit}
                    style={{
                      flex: 1,
                      fontSize: 15,
                      fontWeight: '600',
                      color: '#FFFFFF',
                      padding: 0,
                    }}
                  />
                </View>
              </View>

              {/* Submit */}
              <Pressable
                onPress={submit}
                style={{
                  marginTop: 18,
                  backgroundColor: name.trim() ? '#FF0048' : 'rgba(255,0,72,0.2)',
                  borderRadius: 20,
                  paddingVertical: 17,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 8,
                  shadowColor: '#FF0048',
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: name.trim() ? 0.4 : 0,
                  shadowRadius: 16,
                  elevation: name.trim() ? 6 : 0,
                }}>
                <Text
                  style={{
                    fontSize: 15.5,
                    fontWeight: '700',
                    color: name.trim() ? '#FFF' : 'rgba(255,255,255,0.25)',
                    letterSpacing: -0.3,
                  }}>
                  Add Friend →
                </Text>
              </Pressable>
            </MotiView>
          </KeyboardAvoidingView>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export function PeopleScreen({ onBack }: { onBack: () => void }) {
  const insets = useSafeAreaInsets();
  const [friends, setFriends] = useState<Friend[]>(FRIENDS);
  const [query, setQuery] = useState('');
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = friends.filter(
    (f) =>
      f.name.toLowerCase().includes(query.toLowerCase()) ||
      f.handle.toLowerCase().includes(query.toLowerCase())
  );

  const owedFriends = friends.filter((f) => f.currency === 'USD' && f.owes > 0);
  const oweFriends = friends.filter((f) => f.currency === 'USD' && f.owes < 0);
  const totalOwedToYou = owedFriends.reduce((s, f) => s + f.owes, 0);
  const totalYouOwe = oweFriends.reduce((s, f) => s + Math.abs(f.owes), 0);
  const net = totalOwedToYou - totalYouOwe;

  function handleSettle(key: string) {
    setFriends((prev) => prev.map((f) => (f.key === key ? { ...f, owes: 0 } : f)));
    setExpandedKey(null);
  }

  function handleAdd(name: string, handle: string, photo: string) {
    const colors = ['#1A73E8', '#00A550', '#8B1CC8', '#F05A28', '#C82060', '#9A6F00'];
    const newFriend: Friend = {
      key: name.replace(/\s+/g, '').toUpperCase().slice(0, 2) + Date.now(),
      name,
      handle: handle.startsWith('@') ? handle : `@${handle}`,
      photo:
        photo ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=200&background=random`,
      color: colors[friends.length % colors.length],
      owes: 0,
      currency: 'USD',
      sessions: [],
    };
    setFriends((prev) => [...prev, newFriend]);
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
      <View style={{ height: insets.top }} />

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <MotiView
        from={{ opacity: 0, translateY: -8 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 240 }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingTop: 6,
          paddingBottom: 18,
          gap: 13,
        }}>
        <Pressable
          onPress={onBack}
          hitSlop={10}
          style={{
            width: 40,
            height: 40,
            borderRadius: 14,
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.08)',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.07,
            shadowRadius: 8,
            elevation: 2,
          }}>
          <ArrowLeft size={17} color="#1A1A1A" strokeWidth={2.25} />
        </Pressable>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 9.5,
              fontWeight: '700',
              color: '#AAAAAA',
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              marginBottom: 1,
            }}>
            Friends
          </Text>
          <Text
            style={{
              fontSize: 23,
              fontWeight: '600',
              color: '#0E0E0E',
              letterSpacing: -0.9,
              lineHeight: 25,
            }}>
            People
          </Text>
        </View>

        <Pressable
          onPress={() => setShowAdd(true)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            backgroundColor: '#FF0048',
            borderRadius: 14,
            paddingHorizontal: 14,
            paddingVertical: 9,
            shadowColor: '#FF0048',
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.35,
            shadowRadius: 10,
            elevation: 5,
          }}>
          <Plus size={13} color="#FFF" strokeWidth={2.8} />
          <Text style={{ fontSize: 13, fontWeight: '700', color: '#FFF', letterSpacing: -0.2 }}>
            Add
          </Text>
        </Pressable>
      </MotiView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}>
        {/* ── BALANCE HERO CARD ───────────────────────────────────────── */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 300, delay: 50 }}
          style={{ marginHorizontal: 20, marginBottom: 14 }}>
          <View
            style={{
              backgroundColor: '#141414',
              borderRadius: 28,
              padding: 26,
              overflow: 'hidden',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 14 },
              shadowOpacity: 0.38,
              shadowRadius: 30,
              elevation: 15,
            }}>
            {/* Title row */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 18,
              }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: '300',
                  letterSpacing: -1.5,
                  color: '#fff',
                  lineHeight: 32,
                }}>
                Your{'\n'}People
              </Text>
              <View
                style={{
                  backgroundColor: 'rgba(255,0,72,0.15)',
                  borderRadius: 100,
                  paddingHorizontal: 13,
                  paddingVertical: 6,
                }}>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '700',
                    color: '#FF0048',
                    letterSpacing: 1.2,
                    textTransform: 'uppercase',
                  }}>
                  {friends.length} friends
                </Text>
              </View>
            </View>

            {/* Net amount */}
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '700',
                  color: net >= 0 ? '#00A550' : '#FF0048',
                  letterSpacing: 1.6,
                  textTransform: 'uppercase',
                  marginBottom: 6,
                }}>
                {net >= 0 ? 'Net ahead' : 'Net owed'}
              </Text>
              <Text
                style={{
                  fontSize: 58,
                  fontWeight: '300',
                  color: '#fff',
                  letterSpacing: -3.5,
                  lineHeight: 58,
                }}>
                ${Math.abs(net).toFixed(2)}
              </Text>
            </View>

            {/* Hairline */}
            <View
              style={{
                height: 1,
                backgroundColor: 'rgba(255,255,255,0.07)',
                marginBottom: 18,
              }}
            />

            {/* Stats row */}
            <View style={{ flexDirection: 'row', marginBottom: 22 }}>
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                    marginBottom: 5,
                  }}>
                  <ArrowDownLeft size={11} color="rgba(255,255,255,0.35)" strokeWidth={2.5} />
                  <Text
                    style={{
                      fontSize: 9.5,
                      fontWeight: '700',
                      color: 'rgba(255,255,255,0.35)',
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                    }}>
                    Owed to you
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: '600',
                    color: '#fff',
                    letterSpacing: -1,
                    marginBottom: 8,
                  }}>
                  ${totalOwedToYou.toFixed(2)}
                </Text>
                <AvatarStack friends={owedFriends} max={3} />
              </View>

              <View
                style={{
                  width: 1,
                  backgroundColor: 'rgba(255,255,255,0.07)',
                  marginHorizontal: 18,
                  alignSelf: 'stretch',
                }}
              />

              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                    marginBottom: 5,
                  }}>
                  <ArrowUpRight size={11} color="rgba(255,255,255,0.35)" strokeWidth={2.5} />
                  <Text
                    style={{
                      fontSize: 9.5,
                      fontWeight: '700',
                      color: 'rgba(255,255,255,0.35)',
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                    }}>
                    You owe
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: '600',
                    color: '#fff',
                    letterSpacing: -1,
                    marginBottom: 8,
                  }}>
                  ${totalYouOwe.toFixed(2)}
                </Text>
                <AvatarStack friends={oweFriends} max={3} />
              </View>
            </View>

            {/* Hairline */}
            <View
              style={{
                height: 1,
                backgroundColor: 'rgba(255,255,255,0.07)',
                marginBottom: 16,
              }}
            />

            {/* Settle + Remind */}
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Pressable
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  paddingVertical: 13,
                  backgroundColor: '#FF0048',
                  borderRadius: 14,
                }}>
                <Check size={13} color="#fff" strokeWidth={2.5} />
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '700',
                    color: '#fff',
                    letterSpacing: -0.1,
                  }}>
                  Settle All
                </Text>
              </Pressable>
              <Pressable
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  paddingVertical: 13,
                  backgroundColor: 'rgba(255,255,255,0.07)',
                  borderRadius: 14,
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '700',
                    color: 'rgba(255,255,255,0.55)',
                    letterSpacing: -0.1,
                  }}>
                  Remind All
                </Text>
              </Pressable>
            </View>
          </View>
        </MotiView>

        {/* ── SEARCH ─────────────────────────────────────────────────────── */}
        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 260, delay: 100 }}
          style={{
            marginHorizontal: 20,
            marginBottom: 20,
            backgroundColor: '#FFFFFF',
            borderRadius: 18,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,
            paddingVertical: 12,
            gap: 10,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.06)',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 1,
          }}>
          <Search size={16} color="#BBBBBB" strokeWidth={2.3} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search people…"
            placeholderTextColor="#C0C0C0"
            returnKeyType="search"
            style={{
              flex: 1,
              fontSize: 14.5,
              fontWeight: '500',
              color: '#0E0E0E',
              padding: 0,
            }}
          />
          <AnimatePresence>
            {query.length > 0 && (
              <MotiView
                from={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ type: 'spring', stiffness: 420, damping: 22 }}>
                <Pressable
                  onPress={() => setQuery('')}
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    backgroundColor: '#EBEBEB',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <X size={11} color="#888" strokeWidth={2.5} />
                </Pressable>
              </MotiView>
            )}
          </AnimatePresence>
        </MotiView>

        {/* ── FRIENDS LIST ───────────────────────────────────────────────── */}
        <View style={{ paddingHorizontal: 20 }}>
          <SectionLabel
            label={`${filtered.length} ${filtered.length === 1 ? 'person' : 'people'}`}
          />

          {filtered.length === 0 ? (
            <MotiView
              from={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'timing', duration: 220 }}
              style={{ alignItems: 'center', paddingTop: 50, gap: 12 }}>
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 22,
                  backgroundColor: '#EBEBEB',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Search size={26} color="#CCCCCC" strokeWidth={1.5} />
              </View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: '#1A1A1A',
                  letterSpacing: -0.4,
                }}>
                {query ? 'No results' : 'No friends yet'}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: '#AAAAAA',
                  textAlign: 'center',
                  maxWidth: 220,
                  lineHeight: 19,
                  fontWeight: '500',
                }}>
                {query
                  ? `Nothing matches "${query}"`
                  : 'Tap Add at the top to invite someone to split with.'}
              </Text>
            </MotiView>
          ) : (
            filtered.map((friend, i) => (
              <FriendRow
                key={friend.key}
                friend={friend}
                index={i}
                expanded={expandedKey === friend.key}
                onPress={() => setExpandedKey((prev) => (prev === friend.key ? null : friend.key))}
                onSettle={() => handleSettle(friend.key)}
              />
            ))
          )}
        </View>
      </ScrollView>

      {/* ── ADD FRIEND SHEET ─────────────────────────────────────────────── */}
      <AddFriendSheet visible={showAdd} onClose={() => setShowAdd(false)} onAdd={handleAdd} />
    </View>
  );
}
