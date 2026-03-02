import {
  ArrowLeft,
  ChevronRight,
  Coffee,
  Film,
  Flame,
  Music,
  Plus,
  ShoppingBag,
  SplitSquareHorizontal,
  Tv,
  UtensilsCrossed,
  X,
  Zap,
} from 'lucide-react-native';
import { MotiView, AnimatePresence } from 'moti';
import { useEffect, useRef, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ─── Types ─────────────────────────────────────────────────────────────────────
type Currency = 'USD' | 'ZiG';
type SplitMode = 'auto' | 'custom' | 'cash';

interface Item {
  id: string;
  name: string;
  qty: number; // multiplier — default 1
  amount: string; // unit price
}

interface Friend {
  key: string;
  name: string;
  photo: string;
}

interface SplitAssignment {
  key: string; // friend key or 'YOU'
  mode: SplitMode;
  customAmount: string;
}

// ─── Constants ─────────────────────────────────────────────────────────────────
const PHOTOS: Record<string, string> = {
  SN: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=faces',
  KC: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces',
  AM: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces',
  RM: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces',
  BN: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces',
  JK: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=faces',
};

const FRIENDS: Friend[] = [
  { key: 'SN', name: 'Sasha', photo: PHOTOS.SN },
  { key: 'KC', name: 'Kuda', photo: PHOTOS.KC },
  { key: 'AM', name: 'Ash', photo: PHOTOS.AM },
  { key: 'RM', name: 'Rudo', photo: PHOTOS.RM },
  { key: 'BN', name: 'Bry', photo: PHOTOS.BN },
  { key: 'JK', name: 'Jamal', photo: PHOTOS.JK },
];

const CATEGORIES = [
  { key: 'food', label: 'Food', icon: UtensilsCrossed, color: '#FF6B35' },
  { key: 'coffee', label: 'Coffee', icon: Coffee, color: '#6F4E37' },
  { key: 'drinks', label: 'Drinks', icon: Flame, color: '#E8350A' },
  { key: 'shopping', label: 'Shopping', icon: ShoppingBag, color: '#1A73E8' },
  { key: 'entertainment', label: 'Entertain', icon: Film, color: '#8B1CC8' },
  { key: 'music', label: 'Music', icon: Music, color: '#D4A017' },
  { key: 'streaming', label: 'Stream', icon: Tv, color: '#00A550' },
  { key: 'other', label: 'Other', icon: Zap, color: '#9A9A9A' },
];

const ZIG_RATE = 33.5;

// ─── Helpers ───────────────────────────────────────────────────────────────────
let _itemId = 0;
function newItem(): Item {
  return { id: String(++_itemId), name: '', qty: 1, amount: '' };
}

// Parses "Drinks x3" / "Beer ×2" / "Taco *4" → { name, qty }
function parseSmartQty(raw: string): { name: string; qty: number } {
  const m = raw.match(/^(.+?)\s*[x×*]\s*(\d+)\s*$/i);
  if (m) return { name: m[1].trim(), qty: Math.max(1, parseInt(m[2], 10)) };
  return { name: raw.trim(), qty: 1 };
}

function formatCurrency(amount: number, currency: Currency) {
  if (currency === 'ZiG')
    return `ZiG ${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  return `$${amount.toFixed(2)}`;
}

const MODE_COLORS: Record<SplitMode, { bg: string; text: string; label: string }> = {
  auto: { bg: '#1C1C1E', text: 'rgba(255,255,255,0.7)', label: 'Auto' },
  custom: { bg: '#FFF3E0', text: '#E65100', label: 'Custom' },
  cash: { bg: '#E8F5E9', text: '#2E7D32', label: 'Cash ✓' },
};

// ─── Sub-components ────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 14 }}>
      <View style={{ width: 3, height: 14, borderRadius: 2, backgroundColor: '#FF0048' }} />
      <Text
        style={{
          fontSize: 9.5,
          fontWeight: '700',
          color: '#9A9A9A',
          letterSpacing: 1.8,
          textTransform: 'uppercase',
        }}>
        {children}
      </Text>
    </View>
  );
}

function FriendChip({
  friend,
  selected,
  onToggle,
}: {
  friend: Friend;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <Pressable onPress={onToggle} style={{ alignItems: 'center', gap: 6, width: 60 }}>
      <MotiView
        animate={{
          scale: selected ? 1 : 0.93,
          opacity: selected ? 1 : 0.55,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        style={{ position: 'relative' }}>
        <View
          style={{
            width: 52,
            height: 52,
            borderRadius: 26,
            overflow: 'hidden',
            borderWidth: selected ? 2.5 : 1,
            borderColor: selected ? '#FF0048' : 'rgba(0,0,0,0.08)',
            backgroundColor: '#E0E0E0',
          }}>
          <Image source={{ uri: friend.photo }} style={{ width: '100%', height: '100%' }} />
        </View>
        {selected && (
          <MotiView
            from={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 450, damping: 20 }}
            style={{
              position: 'absolute',
              bottom: -2,
              right: -2,
              width: 18,
              height: 18,
              borderRadius: 9,
              backgroundColor: '#FF0048',
              borderWidth: 2,
              borderColor: '#F4F4F4',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 9, color: '#fff', fontWeight: '800', lineHeight: 10 }}>✓</Text>
          </MotiView>
        )}
      </MotiView>
      <Text
        style={{
          fontSize: 10.5,
          fontWeight: selected ? '700' : '500',
          color: selected ? '#0E0E0E' : '#AAAAAA',
          letterSpacing: -0.1,
        }}
        numberOfLines={1}>
        {friend.name}
      </Text>
    </Pressable>
  );
}

// ─── Main Screen ───────────────────────────────────────────────────────────────
export function AddSplitScreen({ onBack }: { onBack: () => void }) {
  const insets = useSafeAreaInsets();

  // form state
  const [venue, setVenue] = useState('');
  const [category, setCategory] = useState('food');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [zigRate, setZigRate] = useState('33.5');
  const [items, setItems] = useState<Item[]>([newItem()]);
  const [assignments, setAssignments] = useState<SplitAssignment[]>([
    { key: 'YOU', mode: 'auto', customAmount: '' },
  ]);
  const [rateEditing, setRateEditing] = useState(false);

  const venueRef = useRef<TextInput>(null);
  const firstItemNameRef = useRef<TextInput>(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const onShow = Keyboard.addListener(showEvent, () => setIsKeyboardVisible(true));
    const onHide = Keyboard.addListener(hideEvent, () => setIsKeyboardVisible(false));
    return () => {
      onShow.remove();
      onHide.remove();
    };
  }, []);

  // ── Computed ──────────────────────────────────────────────────
  const total = items.reduce((sum, it) => sum + (parseFloat(it.amount) || 0) * it.qty, 0);
  const rate = parseFloat(zigRate) || ZIG_RATE;

  // per-person share math
  const customSum = assignments
    .filter((a) => a.mode === 'custom' || a.mode === 'cash')
    .reduce((s, a) => s + (parseFloat(a.customAmount) || 0), 0);
  const autoCount = assignments.filter((a) => a.mode === 'auto').length;
  const autoPool = Math.max(0, total - customSum);
  const autoShare = autoCount > 0 ? autoPool / autoCount : 0;

  function shareFor(a: SplitAssignment): number {
    if (a.mode === 'auto') return autoShare;
    return parseFloat(a.customAmount) || 0;
  }

  const myAssignment = assignments.find((a) => a.key === 'YOU') ?? assignments[0];
  const myShare = shareFor(myAssignment);
  const friendKeys = assignments.filter((a) => a.key !== 'YOU').map((a) => a.key);

  const hasItems = items.some((it) => it.name.trim() && parseFloat(it.amount) > 0);
  const canCreate = venue.trim().length > 0 && hasItems && friendKeys.length > 0;

  const selectedCategory = CATEGORIES.find((c) => c.key === category) ?? CATEGORIES[0];
  const CategoryIcon = selectedCategory.icon;

  // ── Item handlers ─────────────────────────────────────────────
  function addItem() {
    setItems((prev) => [...prev, newItem()]);
  }
  function removeItem(id: string) {
    setItems((prev) => (prev.length > 1 ? prev.filter((it) => it.id !== id) : prev));
  }
  function updateItem(id: string, field: 'name' | 'amount', value: string) {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  }
  // Called on name blur — parse "Drinks x3" → name="Drinks" qty=3
  function applySmartName(id: string, raw: string) {
    const { name, qty } = parseSmartQty(raw);
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, name, qty } : it)));
  }
  function stepQty(id: string, delta: number) {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it))
    );
  }

  // ── Assignment handlers ───────────────────────────────────────
  function toggleFriend(key: string) {
    setAssignments((prev) => {
      const has = prev.some((a) => a.key === key);
      if (has) return prev.filter((a) => a.key !== key);
      return [...prev, { key, mode: 'auto', customAmount: '' }];
    });
  }
  const MODES: SplitMode[] = ['auto', 'custom', 'cash'];
  function cycleMode(key: string) {
    setAssignments((prev) =>
      prev.map((a) => {
        if (a.key !== key) return a;
        const next = MODES[(MODES.indexOf(a.mode) + 1) % MODES.length];
        // pre-fill custom amount with auto share when switching to custom
        const customAmount = next === 'custom' ? autoShare.toFixed(2) : a.customAmount;
        return { ...a, mode: next, customAmount };
      })
    );
  }
  function setCustomAmount(key: string, val: string) {
    setAssignments((prev) => prev.map((a) => (a.key === key ? { ...a, customAmount: val } : a)));
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        {/* ── HEADER ───────────────────────────────────────────── */}
        <MotiView
          from={{ opacity: 0, translateY: -8 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 240 }}
          style={{
            paddingTop: insets.top + 14,
            paddingHorizontal: 20,
            paddingBottom: 14,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F4F4F4',
          }}>
          {/* BACK */}
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
              shadowOpacity: 0.05,
              shadowRadius: 5,
              elevation: 1,
            }}>
            <ArrowLeft size={18} color="#0E0E0E" strokeWidth={1.75} />
          </Pressable>

          {/* TITLE */}
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 9.5,
                fontWeight: '600',
                color: '#9A9A9A',
                letterSpacing: 1.6,
                textTransform: 'uppercase',
                marginBottom: 1,
              }}>
              New split
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '700',
                color: '#0E0E0E',
                letterSpacing: -0.5,
              }}>
              Add Expense
            </Text>
          </View>

          {/* CURRENCY TOGGLE */}
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#E8E8E8',
              borderRadius: 10,
              padding: 3,
            }}>
            {(['USD', 'ZiG'] as Currency[]).map((c) => (
              <Pressable key={c} onPress={() => setCurrency(c)}>
                <MotiView
                  animate={{
                    backgroundColor: currency === c ? '#0E0E0E' : 'transparent',
                  }}
                  transition={{ type: 'timing', duration: 160 }}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 8,
                  }}>
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: '700',
                      color: currency === c ? '#fff' : '#9A9A9A',
                      letterSpacing: -0.2,
                    }}>
                    {c}
                  </Text>
                </MotiView>
              </Pressable>
            ))}
          </View>
        </MotiView>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={{ paddingBottom: isKeyboardVisible ? 24 : 200 }}>
          {/* ── VENUE CARD ──────────────────────────────────────── */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 300, delay: 40 }}
            style={{ marginHorizontal: 20, marginBottom: 14 }}>
            <View
              style={{
                backgroundColor: '#141414',
                borderRadius: 28,
                padding: 24,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.28,
                shadowRadius: 22,
                elevation: 12,
              }}>
              {/* OVERLINE */}
              <Text
                style={{
                  fontSize: 9.5,
                  fontWeight: '700',
                  color: '#FF0048',
                  letterSpacing: 1.8,
                  textTransform: 'uppercase',
                  marginBottom: 10,
                }}>
                Where / What
              </Text>

              {/* VENUE INPUT ROW */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 22,
                }}>
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 15,
                    backgroundColor: selectedCategory.color + '22',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                  <CategoryIcon size={22} color={selectedCategory.color} strokeWidth={1.75} />
                </View>
                <TextInput
                  ref={venueRef}
                  value={venue}
                  onChangeText={setVenue}
                  placeholder="e.g. Grill & Chill"
                  placeholderTextColor="rgba(255,255,255,0.2)"
                  autoCapitalize="words"
                  autoCorrect={false}
                  returnKeyType="next"
                  onSubmitEditing={() => firstItemNameRef.current?.focus()}
                  blurOnSubmit={false}
                  style={{
                    flex: 1,
                    fontSize: 26,
                    fontWeight: '500',
                    color: '#fff',
                    letterSpacing: -1,
                    padding: 0,
                  }}
                />
              </View>

              {/* HAIRLINE */}
              <View
                style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.07)', marginBottom: 18 }}
              />

              {/* CATEGORY PICKER */}
              <Text
                style={{
                  fontSize: 9,
                  fontWeight: '700',
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: 1.4,
                  textTransform: 'uppercase',
                  marginBottom: 12,
                }}>
                Category
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}>
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const active = category === cat.key;
                  return (
                    <Pressable key={cat.key} onPress={() => setCategory(cat.key)}>
                      <MotiView
                        animate={{
                          backgroundColor: active ? cat.color + '30' : 'rgba(255,255,255,0.07)',
                          borderColor: active ? cat.color : 'rgba(255,255,255,0.1)',
                        }}
                        transition={{ type: 'timing', duration: 160 }}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 6,
                          paddingHorizontal: 12,
                          paddingVertical: 8,
                          borderRadius: 100,
                          borderWidth: 1,
                        }}>
                        <Icon
                          size={13}
                          color={active ? cat.color : 'rgba(255,255,255,0.4)'}
                          strokeWidth={2}
                        />
                        <Text
                          style={{
                            fontSize: 11.5,
                            fontWeight: '600',
                            color: active ? cat.color : 'rgba(255,255,255,0.4)',
                            letterSpacing: -0.1,
                          }}>
                          {cat.label}
                        </Text>
                      </MotiView>
                    </Pressable>
                  );
                })}
              </ScrollView>

              {/* HAIRLINE */}
              <View
                style={{
                  height: 1,
                  backgroundColor: 'rgba(255,255,255,0.07)',
                  marginTop: 18,
                  marginBottom: 14,
                }}
              />

              {/* EXCHANGE RATE ROW */}
              <Pressable
                onPress={() => setRateEditing((v) => !v)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <SplitSquareHorizontal
                    size={13}
                    color="rgba(255,255,255,0.3)"
                    strokeWidth={1.75}
                  />
                  <Text
                    style={{
                      fontSize: 11.5,
                      color: 'rgba(255,255,255,0.3)',
                      letterSpacing: -0.1,
                    }}>
                    Table rate
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text
                    style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.5)', fontWeight: '600' }}>
                    1 USD ={' '}
                  </Text>
                  {rateEditing ? (
                    <TextInput
                      value={zigRate}
                      onChangeText={setZigRate}
                      keyboardType="decimal-pad"
                      autoFocus
                      onBlur={() => setRateEditing(false)}
                      style={{
                        fontSize: 13,
                        fontWeight: '700',
                        color: '#FF0048',
                        minWidth: 48,
                        padding: 0,
                        textAlign: 'right',
                      }}
                    />
                  ) : (
                    <Text style={{ fontSize: 13, fontWeight: '700', color: '#FF0048' }}>
                      {zigRate} ZiG
                    </Text>
                  )}
                  <ChevronRight size={12} color="rgba(255,255,255,0.2)" strokeWidth={2} />
                </View>
              </Pressable>
            </View>
          </MotiView>

          {/* ── ITEMS CARD ──────────────────────────────────────── */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 300, delay: 100 }}>
            <View style={{ paddingHorizontal: 20, marginBottom: 6 }}>
              <SectionLabel>Items</SectionLabel>
            </View>
            <View
              style={{
                marginHorizontal: 20,
                backgroundColor: '#E6E6E6',
                borderRadius: 28,
                padding: 24,
                marginBottom: 14,
              }}>
              {/* ITEM ROWS */}
              <AnimatePresence>
                {items.map((item, idx) => {
                  const unitPrice = parseFloat(item.amount) || 0;
                  const lineTotal = unitPrice * item.qty;
                  return (
                    <MotiView
                      key={item.id}
                      from={{ opacity: 0, translateY: 10 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      exit={{ opacity: 0, scaleY: 0 }}
                      transition={{ type: 'timing', duration: 200 }}
                      style={{
                        paddingVertical: 12,
                        borderBottomWidth: idx < items.length - 1 ? 1 : 0,
                        borderBottomColor: 'rgba(0,0,0,0.07)',
                      }}>
                      {/* ROW 1: name + unit price + remove */}
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        {/* NAME */}
                        <TextInput
                          ref={idx === 0 ? firstItemNameRef : undefined}
                          value={item.name}
                          onChangeText={(v) => updateItem(item.id, 'name', v)}
                          onBlur={() => applySmartName(item.id, item.name)}
                          placeholder={idx === 0 ? 'Item name  (or "Coffee x3")' : 'Item name'}
                          placeholderTextColor="rgba(0,0,0,0.22)"
                          autoCapitalize="words"
                          autoCorrect={false}
                          returnKeyType="next"
                          blurOnSubmit={false}
                          style={{
                            flex: 1,
                            fontSize: 14,
                            fontWeight: '600',
                            color: '#0E0E0E',
                            letterSpacing: -0.2,
                            padding: 0,
                          }}
                        />
                        {/* UNIT PRICE */}
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0,0,0,0.07)',
                            borderRadius: 10,
                            paddingHorizontal: 10,
                            paddingVertical: 6,
                            minWidth: 72,
                          }}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '700',
                              color: 'rgba(0,0,0,0.4)',
                              marginRight: 2,
                            }}>
                            {currency === 'USD' ? '$' : 'Z'}
                          </Text>
                          <TextInput
                            value={item.amount}
                            onChangeText={(v) => updateItem(item.id, 'amount', v)}
                            placeholder="0.00"
                            placeholderTextColor="rgba(0,0,0,0.25)"
                            keyboardType="decimal-pad"
                            returnKeyType={idx < items.length - 1 ? 'next' : 'done'}
                            blurOnSubmit={idx === items.length - 1}
                            onSubmitEditing={() => {
                              if (idx < items.length - 1) addItem();
                              else Keyboard.dismiss();
                            }}
                            style={{
                              fontSize: 14,
                              fontWeight: '700',
                              color: '#0E0E0E',
                              letterSpacing: -0.3,
                              padding: 0,
                              minWidth: 40,
                            }}
                          />
                        </View>
                        {/* REMOVE */}
                        {items.length > 1 && (
                          <Pressable onPress={() => removeItem(item.id)}>
                            <View
                              style={{
                                width: 26,
                                height: 26,
                                borderRadius: 8,
                                backgroundColor: 'rgba(255,0,72,0.1)',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <X size={11} color="#FF0048" strokeWidth={2.5} />
                            </View>
                          </Pressable>
                        )}
                      </View>

                      {/* ROW 2: qty stepper + line total */}
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginTop: 8,
                          paddingLeft: 2,
                        }}>
                        {/* STEPPER */}
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 0,
                            backgroundColor: 'rgba(0,0,0,0.06)',
                            borderRadius: 10,
                            overflow: 'hidden',
                          }}>
                          <Pressable
                            onPress={() => stepQty(item.id, -1)}
                            style={{ paddingHorizontal: 12, paddingVertical: 6 }}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: '500',
                                color: item.qty <= 1 ? 'rgba(0,0,0,0.2)' : '#0E0E0E',
                                lineHeight: 18,
                              }}>
                              −
                            </Text>
                          </Pressable>
                          <View
                            style={{
                              paddingHorizontal: 8,
                              paddingVertical: 6,
                              backgroundColor: 'rgba(0,0,0,0.05)',
                              minWidth: 32,
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 13,
                                fontWeight: '700',
                                color: '#0E0E0E',
                                letterSpacing: -0.3,
                              }}>
                              {item.qty}
                            </Text>
                          </View>
                          <Pressable
                            onPress={() => stepQty(item.id, 1)}
                            style={{ paddingHorizontal: 12, paddingVertical: 6 }}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: '500',
                                color: '#0E0E0E',
                                lineHeight: 18,
                              }}>
                              +
                            </Text>
                          </Pressable>
                        </View>

                        {/* LINE TOTAL */}
                        {item.qty > 1 && unitPrice > 0 ? (
                          <MotiView
                            from={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                            style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                            <Text
                              style={{
                                fontSize: 10.5,
                                color: 'rgba(0,0,0,0.3)',
                                fontWeight: '500',
                              }}>
                              {item.qty} × {formatCurrency(unitPrice, currency)} =
                            </Text>
                            <Text
                              style={{
                                fontSize: 13,
                                fontWeight: '700',
                                color: '#0E0E0E',
                                letterSpacing: -0.3,
                              }}>
                              {formatCurrency(lineTotal, currency)}
                            </Text>
                          </MotiView>
                        ) : (
                          <Text
                            style={{
                              fontSize: 10.5,
                              color: 'rgba(0,0,0,0.28)',
                              fontWeight: '500',
                            }}>
                            tap name to set qty (e.g. x3)
                          </Text>
                        )}
                      </View>
                    </MotiView>
                  );
                })}
              </AnimatePresence>

              {/* ADD ITEM BUTTON */}
              <Pressable onPress={addItem} style={{ marginTop: 14 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    paddingVertical: 10,
                    paddingHorizontal: 14,
                    borderRadius: 12,
                    borderWidth: 1.5,
                    borderColor: 'rgba(0,0,0,0.12)',
                    borderStyle: 'dashed',
                  }}>
                  <Plus size={14} color="rgba(0,0,0,0.35)" strokeWidth={2.5} />
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '600',
                      color: 'rgba(0,0,0,0.35)',
                      letterSpacing: -0.1,
                    }}>
                    Add item
                  </Text>
                </View>
              </Pressable>

              {/* HAIRLINE */}
              {total > 0 && (
                <>
                  <View
                    style={{ height: 1, backgroundColor: 'rgba(0,0,0,0.1)', marginVertical: 18 }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}>
                    <View>
                      <Text
                        style={{
                          fontSize: 9.5,
                          fontWeight: '700',
                          color: 'rgba(0,0,0,0.35)',
                          letterSpacing: 1.4,
                          textTransform: 'uppercase',
                          marginBottom: 3,
                        }}>
                        Bill total
                      </Text>
                      <Text
                        style={{
                          fontSize: 32,
                          fontWeight: '600',
                          color: '#000',
                          letterSpacing: -1.5,
                        }}>
                        {formatCurrency(total, currency)}
                      </Text>
                    </View>
                    {total > 0 && (
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'rgba(0,0,0,0.35)',
                          letterSpacing: -0.1,
                          fontWeight: '500',
                          marginBottom: 4,
                        }}>
                        ≈{' '}
                        {currency === 'USD'
                          ? `ZiG ${(total * rate).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
                          : `$${(total / rate).toFixed(2)}`}
                      </Text>
                    )}
                  </View>
                </>
              )}
            </View>
          </MotiView>

          {/* ── PEOPLE CARD ─────────────────────────────────────── */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 300, delay: 160 }}>
            <View style={{ paddingHorizontal: 20, marginBottom: 6 }}>
              <SectionLabel>{"Who's in?"}</SectionLabel>
            </View>
            <View
              style={{
                marginHorizontal: 20,
                backgroundColor: '#fff',
                borderRadius: 28,
                paddingTop: 24,
                paddingBottom: 20,
                paddingHorizontal: 24,
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.05)',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}>
              {/* ── PHASE 1: Avatar picker ─────────────────────── */}
              <Text
                style={{
                  fontSize: 9,
                  fontWeight: '700',
                  color: 'rgba(0,0,0,0.3)',
                  letterSpacing: 1.4,
                  textTransform: 'uppercase',
                  marginBottom: 14,
                }}>
                Tap to include
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 4 }}>
                {/* YOU — always in */}
                <View style={{ alignItems: 'center', gap: 6, width: 56 }}>
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      overflow: 'hidden',
                      borderWidth: 2.5,
                      borderColor: '#141414',
                      backgroundColor: '#E0E0E0',
                    }}>
                    <Image
                      source={{
                        uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces',
                      }}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </View>
                  <Text style={{ fontSize: 10, fontWeight: '700', color: '#0E0E0E' }}>You</Text>
                </View>
                {FRIENDS.map((f) => (
                  <FriendChip
                    key={f.key}
                    friend={f}
                    selected={assignments.some((a) => a.key === f.key)}
                    onToggle={() => toggleFriend(f.key)}
                  />
                ))}
              </View>

              {/* ── PHASE 2: Per-person assignment list ─────────── */}
              {assignments.length > 0 && (
                <MotiView
                  from={{ opacity: 0, translateY: 8 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ type: 'timing', duration: 240 }}
                  style={{ marginTop: 20 }}>
                  <View
                    style={{ height: 1, backgroundColor: 'rgba(0,0,0,0.06)', marginBottom: 16 }}
                  />
                  <Text
                    style={{
                      fontSize: 9,
                      fontWeight: '700',
                      color: 'rgba(0,0,0,0.3)',
                      letterSpacing: 1.4,
                      textTransform: 'uppercase',
                      marginBottom: 12,
                    }}>
                    How they pay — tap badge to change
                  </Text>
                  {assignments.map((a, idx) => {
                    const isYou = a.key === 'YOU';
                    const friend = FRIENDS.find((f) => f.key === a.key);
                    const name = isYou ? 'You' : (friend?.name ?? a.key);
                    const photo = isYou
                      ? 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces'
                      : friend
                        ? PHOTOS[a.key]
                        : '';
                    const modeStyle = MODE_COLORS[a.mode];
                    const share = shareFor(a);
                    return (
                      <MotiView
                        key={a.key}
                        from={{ opacity: 0, translateX: -10 }}
                        animate={{ opacity: 1, translateX: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 26,
                          delay: idx * 40,
                        }}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingVertical: 10,
                          borderBottomWidth: idx < assignments.length - 1 ? 1 : 0,
                          borderBottomColor: 'rgba(0,0,0,0.05)',
                          gap: 12,
                        }}>
                        {/* Avatar */}
                        <View
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: 17,
                            overflow: 'hidden',
                            backgroundColor: '#E6E6E6',
                            flexShrink: 0,
                          }}>
                          <Image
                            source={{ uri: photo }}
                            style={{ width: '100%', height: '100%' }}
                          />
                        </View>

                        {/* Name + share amount */}
                        <View style={{ flex: 1 }}>
                          <Text
                            style={{
                              fontSize: 13.5,
                              fontWeight: '600',
                              color: '#0E0E0E',
                              letterSpacing: -0.2,
                            }}>
                            {name}
                          </Text>
                          {a.mode !== 'auto' || total > 0 ? (
                            <Text
                              style={{
                                fontSize: 11,
                                color: '#AAAAAA',
                                fontWeight: '500',
                                marginTop: 1,
                              }}>
                              {a.mode === 'auto'
                                ? total > 0
                                  ? `≈ ${formatCurrency(share, currency)}`
                                  : 'Waiting for items...'
                                : a.mode === 'cash'
                                  ? `${formatCurrency(share, currency)} — already paid`
                                  : `${formatCurrency(share, currency)} fixed`}
                            </Text>
                          ) : null}
                        </View>

                        {/* Mode badge — tap to cycle */}
                        <Pressable onPress={() => cycleMode(a.key)}>
                          <MotiView
                            animate={{ backgroundColor: modeStyle.bg }}
                            transition={{ type: 'timing', duration: 160 }}
                            style={{
                              borderRadius: 10,
                              paddingHorizontal: 11,
                              paddingVertical: 6,
                              minWidth: 62,
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 11.5,
                                fontWeight: '700',
                                color: modeStyle.text,
                                letterSpacing: -0.1,
                              }}>
                              {modeStyle.label}
                            </Text>
                          </MotiView>
                        </Pressable>

                        {/* Custom amount input — only when mode is custom or cash */}
                        {(a.mode === 'custom' || a.mode === 'cash') && (
                          <MotiView
                            from={{ opacity: 0, scaleX: 0.7 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              backgroundColor: a.mode === 'cash' ? '#E8F5E9' : '#FFF3E0',
                              borderRadius: 10,
                              paddingHorizontal: 8,
                              paddingVertical: 6,
                              minWidth: 64,
                            }}>
                            <Text
                              style={{
                                fontSize: 11,
                                fontWeight: '700',
                                color: a.mode === 'cash' ? '#2E7D32' : '#E65100',
                                marginRight: 2,
                              }}>
                              {currency === 'USD' ? '$' : 'Z'}
                            </Text>
                            <TextInput
                              value={a.customAmount}
                              onChangeText={(v) => setCustomAmount(a.key, v)}
                              placeholder="0.00"
                              placeholderTextColor={
                                a.mode === 'cash' ? 'rgba(46,125,50,0.4)' : 'rgba(230,81,0,0.4)'
                              }
                              keyboardType="decimal-pad"
                              style={{
                                fontSize: 13,
                                fontWeight: '700',
                                color: a.mode === 'cash' ? '#2E7D32' : '#E65100',
                                padding: 0,
                                minWidth: 40,
                              }}
                            />
                          </MotiView>
                        )}
                      </MotiView>
                    );
                  })}

                  {/* Remainder check */}
                  {total > 0 &&
                    (() => {
                      const assigned = assignments.reduce((s, a) => s + shareFor(a), 0);
                      const diff = Math.abs(total - assigned);
                      const over = assigned > total + 0.005;
                      const under = assigned < total - 0.005;
                      if (!over && !under)
                        return (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 6,
                              marginTop: 14,
                              backgroundColor: '#E8F5E9',
                              borderRadius: 12,
                              padding: 10,
                            }}>
                            <Text style={{ fontSize: 12, fontWeight: '700', color: '#2E7D32' }}>
                              ✓ Balanced
                            </Text>
                            <Text style={{ fontSize: 11, color: '#2E7D32', opacity: 0.7 }}>
                              {formatCurrency(total, currency)} covered
                            </Text>
                          </View>
                        );
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 6,
                            marginTop: 14,
                            backgroundColor: over ? '#FFF3E0' : '#FFF8E1',
                            borderRadius: 12,
                            padding: 10,
                          }}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '700',
                              color: over ? '#E65100' : '#F57F17',
                            }}>
                            {over
                              ? `↑ ${formatCurrency(diff, currency)} over`
                              : `↓ ${formatCurrency(diff, currency)} unassigned`}
                          </Text>
                          <Text
                            style={{
                              fontSize: 10.5,
                              color: over ? '#E65100' : '#F57F17',
                              opacity: 0.7,
                            }}>
                            Auto members absorb remainder
                          </Text>
                        </View>
                      );
                    })()}
                </MotiView>
              )}
            </View>
          </MotiView>
        </ScrollView>

        {/* ── STICKY BOTTOM ── inside KAV, keyboard-aware ──────── */}
        <MotiView
          from={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 24, delay: 220 }}
          style={{
            paddingHorizontal: 20,
            paddingTop: 12,
            paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : 20,
            backgroundColor: '#F4F4F4',
            borderTopWidth: 1,
            borderTopColor: 'rgba(0,0,0,0.06)',
          }}>
          {isKeyboardVisible ? (
            /* ── COMPACT STRIP when keyboard is up ── */
            <MotiView
              from={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 380, damping: 26 }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#141414',
                borderRadius: 18,
                paddingHorizontal: 18,
                paddingVertical: 12,
                gap: 12,
              }}>
              {/* SHARE AMOUNT */}
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 9,
                    fontWeight: '700',
                    color: '#FF0048',
                    letterSpacing: 1.4,
                    textTransform: 'uppercase',
                    marginBottom: 1,
                  }}>
                  Your share
                </Text>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: '500',
                    color: total > 0 ? '#fff' : 'rgba(255,255,255,0.2)',
                    letterSpacing: -1,
                  }}>
                  {total > 0 ? formatCurrency(myShare, currency) : '—'}
                </Text>
              </View>
              {/* DONE / CREATE */}
              <Pressable
                onPress={() => Keyboard.dismiss()}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '700',
                    color: 'rgba(255,255,255,0.7)',
                    letterSpacing: -0.2,
                  }}>
                  Done
                </Text>
              </Pressable>
              {canCreate && (
                <Pressable
                  style={{
                    backgroundColor: '#FF0048',
                    borderRadius: 12,
                    paddingHorizontal: 18,
                    paddingVertical: 10,
                    shadowColor: '#FF0048',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.5,
                    shadowRadius: 8,
                    elevation: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '700',
                      color: '#fff',
                      letterSpacing: -0.2,
                    }}>
                    Create →
                  </Text>
                </Pressable>
              )}
            </MotiView>
          ) : (
            /* ── FULL CARD when keyboard is hidden ── */
            <MotiView
              from={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 340, damping: 28 }}
              style={{
                backgroundColor: '#141414',
                borderRadius: 24,
                padding: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.15,
                shadowRadius: 16,
                elevation: 10,
              }}>
              {/* SHARE ROW */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  marginBottom: 16,
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: 9.5,
                      fontWeight: '700',
                      color: '#FF0048',
                      letterSpacing: 1.6,
                      textTransform: 'uppercase',
                      marginBottom: 3,
                    }}>
                    Your share
                  </Text>
                  <Text
                    style={{
                      fontSize: 42,
                      fontWeight: '300',
                      color: total > 0 ? '#fff' : 'rgba(255,255,255,0.2)',
                      letterSpacing: -2.5,
                      lineHeight: 44,
                    }}>
                    {total > 0 ? formatCurrency(myShare, currency) : '—'}
                  </Text>
                </View>
                {total > 0 && assignments.length > 1 && (
                  <View style={{ alignItems: 'flex-end', gap: 3, marginBottom: 4 }}>
                    <Text
                      style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.3)', fontWeight: '500' }}>
                      {formatCurrency(total, currency)} · {assignments.length} people
                    </Text>
                    {autoCount > 0 && (
                      <Text
                        style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', fontWeight: '500' }}>
                        {autoCount} auto · {assignments.length - autoCount} fixed
                      </Text>
                    )}
                  </View>
                )}
              </View>
              {/* CREATE BUTTON */}
              <MotiView
                animate={{ opacity: canCreate ? 1 : 0.4 }}
                transition={{ type: 'timing', duration: 180 }}>
                <Pressable
                  disabled={!canCreate}
                  style={{
                    backgroundColor: '#FF0048',
                    borderRadius: 16,
                    paddingVertical: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    shadowColor: '#FF0048',
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: canCreate ? 0.45 : 0,
                    shadowRadius: 14,
                    elevation: canCreate ? 8 : 0,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '700',
                      color: '#fff',
                      letterSpacing: -0.3,
                    }}>
                    Create Split
                  </Text>
                  <Text style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', fontWeight: '600' }}>
                    →
                  </Text>
                </Pressable>
              </MotiView>
            </MotiView>
          )}
        </MotiView>
      </KeyboardAvoidingView>
    </View>
  );
}
