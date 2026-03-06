import { PaymentCard } from '../ui/PaymentCard';
import {
  ArrowDownLeft,
  ArrowUpRight,
  Plus,
  QrCode,
  Send,
  Wallet,
} from 'lucide-react-native';
import { MotiView } from 'moti';
import { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  onNewSession?: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const USER = { initials: 'TM', name: 'Tendai M.', tag: '$umoTM' };
const AVAILABLE_BALANCE = 124.5;
const PENDING_TRANSFER = 45.0; // In transit

const PAYMENT_METHODS = [
  { id: '1', type: 'Apple Pay', last4: 'Plat', variant: 'black' as const, iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png' },
  { id: '2', type: 'EcoCash', last4: '8921', variant: 'platinum' as const, iconUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fe/EcoCash_logo.svg/1200px-EcoCash_logo.svg.png' },
  { id: '3', type: 'Bank', last4: '5543', variant: 'white' as const },
];

const LEDGER = [
  { id: 't1', title: 'Withdrawal to Bank', date: 'Today, 9:41 AM', amount: 150.0, type: 'out', status: 'completed' },
  { id: 't2', title: 'Received from Sasha', date: 'Yesterday', amount: 25.5, type: 'in', status: 'completed' },
  { id: 't3', title: 'Top-up from EcoCash', date: 'Mon 24 Feb', amount: 50.0, type: 'in', status: 'completed' },
  { id: 't4', title: 'Transfer to Kuda', date: 'Sat 22 Feb', amount: 12.0, type: 'out', status: 'completed' },
];

export function WalletScreen({ onNewSession, activeTab, setActiveTab }: Props) {
  const insets = useSafeAreaInsets();
  const [showQR, setShowQR] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
      {/* ── HEADER ───────────────────────────────────────────────────── */}
      <MotiView
        from={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 300 }}
        style={{
          paddingTop: insets.top + 16,
          paddingHorizontal: 24,
          paddingBottom: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#F4F4F4',
          zIndex: 10,
        }}>
        <Pressable
          onPress={() => setActiveTab('home')}
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
          <View
            style={{
              width: 26,
              height: 26,
              borderRadius: 13,
              backgroundColor: '#111111',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 9, fontWeight: '700', color: '#fff', letterSpacing: -0.2 }}>
              {USER.initials}
            </Text>
          </View>
        </Pressable>

        <View style={{ flex: 1, marginLeft: 16 }}>
          <Text
            style={{
              fontSize: 9.5,
              fontWeight: '700',
              color: '#AAAAAA',
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              marginBottom: 1,
            }}>
            Finance
          </Text>
          <Text
            style={{
              fontSize: 23,
              fontWeight: '600',
              color: '#0E0E0E',
              letterSpacing: -0.9,
              lineHeight: 25,
            }}>
            Wallet
          </Text>
        </View>

        <Pressable
          onPress={() => setShowQR(true)}
          style={{
            width: 40,
            height: 40,
            borderRadius: 14,
            backgroundColor: '#111111',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 3,
          }}>
          <QrCode size={18} color="#FFF" strokeWidth={2} />
        </Pressable>
      </MotiView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 128 }}>
        
        {/* ── BALANCE CARD ───────────────────────────────────────────── */}
        <MotiView
          from={{ opacity: 0, translateY: 22 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 300, delay: 60 }}
          style={{ marginHorizontal: 20, marginBottom: 24 }}>
          <View
            style={{
              backgroundColor: '#141414',
              borderRadius: 28,
              padding: 26,
              overflow: 'hidden',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 12 },
              shadowOpacity: 0.35,
              shadowRadius: 28,
              elevation: 14,
            }}>
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
                  fontWeight: '300',
                  letterSpacing: -1.5,
                  color: '#fff',
                  lineHeight: 33,
                }}>
                Available{'\n'}Balance
              </Text>
              {PENDING_TRANSFER > 0 && (
                <View
                  style={{
                    backgroundColor: 'rgba(255,149,0,0.15)',
                    borderRadius: 100,
                    paddingHorizontal: 13,
                    paddingVertical: 6,
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '700',
                      color: '#FF9500',
                      letterSpacing: 1.2,
                      textTransform: 'uppercase',
                    }}>
                    + ${PENDING_TRANSFER.toFixed(2)} Transit
                  </Text>
                </View>
              )}
            </View>

            {/* HERO AMOUNT */}
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '700',
                  color: '#FFFFFF',
                  letterSpacing: 1.6,
                  textTransform: 'uppercase',
                  marginBottom: 6,
                }}>
                Ready to use
              </Text>
              <Text
                style={{
                  fontSize: 62,
                  fontWeight: '300',
                  color: '#fff',
                  letterSpacing: -4,
                  lineHeight: 62,
                }}>
                ${AVAILABLE_BALANCE.toFixed(2)}
              </Text>
            </View>

            {/* HAIRLINE */}
            <View
              style={{
                height: 1,
                backgroundColor: 'rgba(255,255,255,0.07)',
                marginBottom: 16,
              }}
            />

            {/* INLINE ACTIONS */}
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Pressable
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  paddingVertical: 13,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 14,
                }}>
                <ArrowDownLeft size={13} color="#111111" strokeWidth={2.5} />
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '700',
                    color: '#111111',
                    letterSpacing: -0.1,
                  }}>
                  Add
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
                <Send size={13} color="rgba(255,255,255,0.8)" strokeWidth={2.2} />
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '700',
                    color: 'rgba(255,255,255,0.8)',
                    letterSpacing: -0.1,
                  }}>
                  Transfer
                </Text>
              </Pressable>
            </View>
          </View>
        </MotiView>

        {/* ── PAYMENT METHODS CAROUSEL ──────────────────────────────────── */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 300, delay: 100 }}
          style={{ marginBottom: 32 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24, marginBottom: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#111111', letterSpacing: -0.5 }}>
              Payment Methods
            </Text>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 10 }}>
            <Pressable style={{ marginRight: 12, justifyContent: 'center' }}>
              <View
                style={{
                  width: 60,
                  height: 90,
                  backgroundColor: 'rgba(0,0,0,0.03)',
                  borderRadius: 16,
                  borderWidth: 1.5,
                  borderColor: 'rgba(0,0,0,0.08)',
                  borderStyle: 'dashed',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Plus size={20} color="#AAAAAA" strokeWidth={2.5} />
              </View>
            </Pressable>

            {PAYMENT_METHODS.map((method) => (
              <PaymentCard
                key={method.id}
                type={method.type}
                last4={method.last4}
                variant={method.variant}
                iconUrl={method.iconUrl}
              />
            ))}
          </ScrollView>
        </MotiView>

        {/* ── GRAY CARD — Recent Transfers ──────────────────────────────── */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 300, delay: 150 }}
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
                Recent{'\n'}Transfers
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

            {/* LEDGER LIST */}
            <View>
              {LEDGER.map((tx, idx) => (
                <View
                  key={tx.id}
                  style={{
                    paddingVertical: 14,
                    borderBottomWidth: idx < LEDGER.length - 1 ? 1 : 0,
                    borderBottomColor: 'rgba(0,0,0,0.07)',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 13,
                  }}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 14,
                      backgroundColor: tx.type === 'in' ? 'rgba(52,199,89,0.1)' : 'rgba(0,0,0,0.04)',
                      borderWidth: 1,
                      borderColor: tx.type === 'in' ? 'rgba(52,199,89,0.2)' : 'rgba(0,0,0,0.06)',
                      flexShrink: 0,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {tx.type === 'in' ? (
                      <ArrowDownLeft size={22} color="#34C759" strokeWidth={2.5} />
                    ) : (
                      <ArrowUpRight size={22} color="#111111" strokeWidth={2} />
                    )}
                  </View>

                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 3,
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
                        {tx.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '700',
                          color: tx.type === 'in' ? '#00A550' : '#000',
                          letterSpacing: -0.5,
                        }}>
                        {tx.type === 'in' ? '+' : '-'}${tx.amount.toFixed(2)}
                      </Text>
                    </View>

                    <Text style={{ fontSize: 11, color: '#777', letterSpacing: 0.05 }}>
                      {tx.date}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </MotiView>
      </ScrollView>

    </View>
  );
}
