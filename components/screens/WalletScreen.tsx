import { NavDock } from '../NavDock';
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
        
        {/* ── HERO BALANCE ──────────────────────────────────────────────── */}
        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24, delay: 50 }}
          style={{ marginHorizontal: 20, marginBottom: 24, alignItems: 'center' }}>
          
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: '#555555',
              textTransform: 'uppercase',
              letterSpacing: 1.5,
              marginBottom: 8,
            }}>
            Available Balance
          </Text>
          <Text
            style={{
              fontSize: 64,
              fontWeight: '300',
              color: '#111111',
              letterSpacing: -3.5,
              lineHeight: 70,
            }}>
            ${AVAILABLE_BALANCE.toFixed(2)}
          </Text>
          
          {PENDING_TRANSFER > 0 && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(255,149,0,0.1)',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 100,
                marginTop: 8,
                gap: 6,
              }}>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '700',
                  color: '#FF9500',
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                }}>
                + ${PENDING_TRANSFER.toFixed(2)} In Transit
              </Text>
            </View>
          )}

          {/* QUICK ACTIONS */}
          <View style={{ flexDirection: 'row', gap: 16, marginTop: 28 }}>
            <Pressable style={{ alignItems: 'center', gap: 8 }}>
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: '#FFFFFF',
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.05,
                  shadowRadius: 10,
                  elevation: 2,
                }}>
                <ArrowDownLeft size={22} color="#111111" strokeWidth={2} />
              </View>
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#111111' }}>Add</Text>
            </Pressable>

            <Pressable style={{ alignItems: 'center', gap: 8 }}>
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: '#111111',
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.2,
                  shadowRadius: 12,
                  elevation: 5,
                }}>
                <Send size={20} color="#FFFFFF" strokeWidth={2} style={{ marginLeft: -2, marginTop: -2 }} />
              </View>
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#111111' }}>Transfer</Text>
            </Pressable>

            <Pressable style={{ alignItems: 'center', gap: 8 }}>
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: '#FFFFFF',
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.05,
                  shadowRadius: 10,
                  elevation: 2,
                }}>
                <Wallet size={22} color="#111111" strokeWidth={2} />
              </View>
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#111111' }}>Cards</Text>
            </Pressable>
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

        {/* ── TRANSFER LEDGER ─────────────────────────────────────────── */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 300, delay: 150 }}
          style={{ paddingHorizontal: 24 }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#111111', letterSpacing: -0.5, marginBottom: 16 }}>
            Recent Transfers
          </Text>

          <View style={{ backgroundColor: '#FFFFFF', borderRadius: 24, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 10, elevation: 2 }}>
            {LEDGER.map((tx, idx) => (
              <View
                key={tx.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 14,
                  borderBottomWidth: idx < LEDGER.length - 1 ? 1 : 0,
                  borderBottomColor: 'rgba(0,0,0,0.06)',
                }}>
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: tx.type === 'in' ? 'rgba(52,199,89,0.1)' : 'rgba(0,0,0,0.04)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                  }}>
                  {tx.type === 'in' ? (
                    <ArrowDownLeft size={20} color="#34C759" strokeWidth={2.5} />
                  ) : (
                    <ArrowUpRight size={20} color="#111111" strokeWidth={2} />
                  )}
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#111111', letterSpacing: -0.2, marginBottom: 2 }}>
                    {tx.title}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#AAAAAA' }}>{tx.date}</Text>
                </View>

                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '700',
                    color: tx.type === 'in' ? '#34C759' : '#111111',
                    letterSpacing: -0.5,
                  }}>
                  {tx.type === 'in' ? '+' : '-'}${tx.amount.toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </MotiView>
      </ScrollView>

      {/* ── NAV DOCK (Shared) ────────────────────────────────────────── */}
      <NavDock activeTab={activeTab} onTabChange={setActiveTab} onNewSession={onNewSession} />
    </View>
  );
}
