import {
  ArrowLeft,
  Check,
  ChevronRight,
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
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
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

function formatAmt(amount: number, currency: 'USD' | 'ZiG') {
  const abs = Math.abs(amount);
  if (currency === 'ZiG') return `ZiG ${abs.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  return `$${abs.toFixed(2)}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Avatar({ uri, size = 44, color }: { uri: string; size?: number; color: string }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: color + '44',
      }}>
      <Image source={{ uri }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
    </View>
  );
}

function BalancePill({ owes, currency }: { owes: number; currency: 'USD' | 'ZiG' }) {
  if (owes === 0)
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
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
        <Text style={{ fontSize: 11.5, fontWeight: '600', color: '#9A9A9A' }}>Settled</Text>
      </View>
    );
  const positive = owes > 0;
  return (
    <View
      style={{
        backgroundColor: positive ? '#E8F5E9' : '#FFF3F5',
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 3,
      }}>
      <Text
        style={{
          fontSize: 12,
          fontWeight: '700',
          color: positive ? '#1B5E20' : '#FF0048',
          letterSpacing: -0.2,
        }}>
        {positive ? '+' : '−'}
        {formatAmt(owes, currency)}
      </Text>
    </View>
  );
}

function FriendRow({
  friend,
  expanded,
  onPress,
  onSettle,
}: {
  friend: Friend;
  expanded: boolean;
  onPress: () => void;
  onSettle: () => void;
}) {
  return (
    <Pressable onPress={onPress}>
      <MotiView
        animate={{ backgroundColor: expanded ? '#FFFFFF' : '#FFFFFF' }}
        style={{
          borderRadius: 22,
          marginBottom: 10,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: expanded ? 8 : 3 },
          shadowOpacity: expanded ? 0.1 : 0.06,
          shadowRadius: expanded ? 18 : 8,
          elevation: expanded ? 4 : 2,
          borderWidth: 1,
          borderColor: expanded ? friend.color + '22' : 'rgba(0,0,0,0.06)',
        }}>
        {/* ── Main row ── */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 14,
            gap: 12,
          }}>
          <Avatar uri={friend.photo} size={46} color={friend.color} />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '700',
                color: '#0E0E0E',
                letterSpacing: -0.3,
                marginBottom: 2,
              }}>
              {friend.name}
            </Text>
            <Text style={{ fontSize: 11.5, color: '#AAAAAA', fontWeight: '500' }}>
              {friend.handle} · {friend.sessions.length} session
              {friend.sessions.length !== 1 ? 's' : ''}
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end', gap: 4 }}>
            <BalancePill owes={friend.owes} currency={friend.currency} />
          </View>
          <MotiView
            animate={{ rotate: expanded ? '90deg' : '0deg' }}
            transition={{ type: 'timing', duration: 200 }}>
            <ChevronRight size={15} color="#CCCCCC" strokeWidth={2.5} />
          </MotiView>
        </View>

        {/* ── Expanded detail ── */}
        <AnimatePresence>
          {expanded && (
            <MotiView
              from={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' as unknown as number }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: 'timing', duration: 200 }}>
              {/* Hairline */}
              <View
                style={{
                  height: 1,
                  backgroundColor: 'rgba(0,0,0,0.06)',
                  marginHorizontal: 14,
                }}
              />

              {/* Session rows */}
              {friend.sessions.length > 0 ? (
                <View style={{ paddingHorizontal: 14, paddingTop: 10, gap: 8 }}>
                  {friend.sessions.map((s) => {
                    const Icon = s.Icon;
                    return (
                      <View
                        key={s.id}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 10,
                        }}>
                        <View
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 10,
                            backgroundColor: s.color + '18',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Icon size={13} color={s.color} strokeWidth={2} />
                        </View>
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 12.5,
                            fontWeight: '600',
                            color: '#1A1A1A',
                            letterSpacing: -0.2,
                          }}>
                          {s.venue}
                        </Text>
                        <Text style={{ fontSize: 11, color: '#AAAAAA', fontWeight: '500' }}>
                          {s.date}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12.5,
                            fontWeight: '700',
                            color: '#1A1A1A',
                            letterSpacing: -0.3,
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
                <View style={{ padding: 14, alignItems: 'center' }}>
                  <Text style={{ fontSize: 12, color: '#BBBBBB' }}>No sessions yet</Text>
                </View>
              )}

              {/* Action buttons */}
              {friend.owes !== 0 && (
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 8,
                    padding: 14,
                    paddingTop: 12,
                  }}>
                  <Pressable
                    onPress={(e) => {
                      e.stopPropagation();
                      onSettle();
                    }}
                    style={{
                      flex: 1,
                      backgroundColor: '#FF0048',
                      borderRadius: 14,
                      paddingVertical: 11,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 12.5,
                        fontWeight: '700',
                        color: '#FFF',
                        letterSpacing: -0.2,
                      }}>
                      Settle up →
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={(e) => e.stopPropagation()}
                    style={{
                      paddingHorizontal: 16,
                      backgroundColor: '#F4F4F4',
                      borderRadius: 14,
                      paddingVertical: 11,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 12.5,
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
      </MotiView>
    </Pressable>
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
            transition={{ type: 'timing', duration: 200 }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.45)',
            }}>
            <Pressable style={{ flex: 1 }} onPress={onClose} />
          </MotiView>

          {/* Sheet */}
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : undefined}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <MotiView
              from={{ translateY: 340 }}
              animate={{ translateY: 0 }}
              exit={{ translateY: 340 }}
              transition={{ type: 'spring', stiffness: 340, damping: 32 }}
              style={{
                backgroundColor: '#141414',
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                paddingHorizontal: 24,
                paddingTop: 16,
                paddingBottom: insets.bottom + 24,
              }}>
              {/* Handle */}
              <View
                style={{
                  width: 36,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  alignSelf: 'center',
                  marginBottom: 24,
                }}
              />

              {/* Header */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 24,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: '#FFFFFF',
                    letterSpacing: -0.8,
                  }}>
                  Add Friend
                </Text>
                <Pressable onPress={onClose}>
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <X size={14} color="rgba(255,255,255,0.6)" strokeWidth={2.5} />
                  </View>
                </Pressable>
              </View>

              {/* Fields */}
              <View style={{ gap: 10 }}>
                <View
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.07)',
                    borderRadius: 16,
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.2)' }}>👤</Text>
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
                    borderRadius: 16,
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.2)', fontWeight: '700' }}>
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
                    borderRadius: 16,
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.2)' }}>🔗</Text>
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
                  marginTop: 16,
                  backgroundColor: name.trim() ? '#FF0048' : 'rgba(255,0,72,0.25)',
                  borderRadius: 18,
                  paddingVertical: 16,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 8,
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '700',
                    color: name.trim() ? '#FFF' : 'rgba(255,255,255,0.3)',
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

  const totalOwedToYou = friends
    .filter((f) => f.currency === 'USD' && f.owes > 0)
    .reduce((s, f) => s + f.owes, 0);
  const totalYouOwe = friends
    .filter((f) => f.currency === 'USD' && f.owes < 0)
    .reduce((s, f) => s + Math.abs(f.owes), 0);

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
      {/* ── STATUS BAR SPACER ── */}
      <View style={{ height: insets.top }} />

      {/* ── HEADER ── */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 14,
          gap: 12,
        }}>
        <Pressable
          onPress={onBack}
          hitSlop={12}
          style={{
            width: 36,
            height: 36,
            borderRadius: 12,
            backgroundColor: '#EBEBEB',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ArrowLeft size={17} color="#1A1A1A" strokeWidth={2.5} />
        </Pressable>

        <Text
          style={{
            flex: 1,
            fontSize: 22,
            fontWeight: '700',
            color: '#0E0E0E',
            letterSpacing: -0.9,
          }}>
          People
        </Text>

        <Pressable
          onPress={() => setShowAdd(true)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            backgroundColor: '#FF0048',
            borderRadius: 14,
            paddingHorizontal: 13,
            paddingVertical: 8,
            shadowColor: '#FF0048',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 4,
          }}>
          <Plus size={13} color="#FFF" strokeWidth={2.75} />
          <Text style={{ fontSize: 12.5, fontWeight: '700', color: '#FFF', letterSpacing: -0.2 }}>
            Add
          </Text>
        </Pressable>
      </View>

      {/* ── BALANCE SUMMARY ── */}
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 260 }}>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            marginBottom: 16,
            gap: 10,
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#E8F5E9',
              borderRadius: 18,
              padding: 14,
            }}>
            <Text
              style={{
                fontSize: 10.5,
                fontWeight: '700',
                color: '#388E3C',
                letterSpacing: 0.5,
                marginBottom: 4,
              }}>
              OWED TO YOU
            </Text>
            <Text
              style={{ fontSize: 20, fontWeight: '700', color: '#1B5E20', letterSpacing: -0.8 }}>
              ${totalOwedToYou.toFixed(2)}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: '#FFF3F5',
              borderRadius: 18,
              padding: 14,
            }}>
            <Text
              style={{
                fontSize: 10.5,
                fontWeight: '700',
                color: '#C62828',
                letterSpacing: 0.5,
                marginBottom: 4,
              }}>
              YOU OWE
            </Text>
            <Text
              style={{ fontSize: 20, fontWeight: '700', color: '#FF0048', letterSpacing: -0.8 }}>
              ${totalYouOwe.toFixed(2)}
            </Text>
          </View>
        </View>
      </MotiView>

      {/* ── SEARCH ── */}
      <View
        style={{
          marginHorizontal: 20,
          marginBottom: 16,
          backgroundColor: '#EBEBEB',
          borderRadius: 16,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 14,
          paddingVertical: 11,
          gap: 9,
        }}>
        <Search size={15} color="#AAAAAA" strokeWidth={2.5} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search people…"
          placeholderTextColor="#BBBBBB"
          returnKeyType="search"
          style={{
            flex: 1,
            fontSize: 14,
            fontWeight: '500',
            color: '#0E0E0E',
            padding: 0,
          }}
        />
        <AnimatePresence>
          {query.length > 0 && (
            <MotiView
              from={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}>
              <Pressable onPress={() => setQuery('')}>
                <X size={14} color="#AAAAAA" strokeWidth={2.5} />
              </Pressable>
            </MotiView>
          )}
        </AnimatePresence>
      </View>

      {/* ── FRIENDS LIST ── */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: insets.bottom + 32,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {/* Section label */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 12 }}>
            <View style={{ width: 3, height: 14, borderRadius: 2, backgroundColor: '#FF0048' }} />
            <Text
              style={{ fontSize: 11.5, fontWeight: '700', color: '#AAAAAA', letterSpacing: 0.6 }}>
              {filtered.length} {filtered.length === 1 ? 'PERSON' : 'PEOPLE'}
            </Text>
          </View>

          {filtered.length === 0 ? (
            <MotiView
              from={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'timing', duration: 220 }}
              style={{ alignItems: 'center', paddingTop: 48, gap: 10 }}>
              <Text style={{ fontSize: 32 }}>🤷</Text>
              <Text
                style={{ fontSize: 15, fontWeight: '600', color: '#AAAAAA', letterSpacing: -0.3 }}>
                {query ? 'No results' : 'No friends yet'}
              </Text>
              <Text style={{ fontSize: 13, color: '#CCCCCC', textAlign: 'center', maxWidth: 220 }}>
                {query ? `Nothing matches "${query}"` : 'Tap Add to invite someone to split with.'}
              </Text>
            </MotiView>
          ) : (
            filtered.map((friend) => (
              <MotiView
                key={friend.key}
                from={{ opacity: 0, translateY: 12 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 240 }}>
                <FriendRow
                  friend={friend}
                  expanded={expandedKey === friend.key}
                  onPress={() =>
                    setExpandedKey((prev) => (prev === friend.key ? null : friend.key))
                  }
                  onSettle={() => handleSettle(friend.key)}
                />
              </MotiView>
            ))
          )}
        </ScrollView>
      </TouchableWithoutFeedback>

      {/* ── ADD FRIEND SHEET ── */}
      <AddFriendSheet visible={showAdd} onClose={() => setShowAdd(false)} onAdd={handleAdd} />
    </View>
  );
}
