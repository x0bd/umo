import './global.css';

import { StatusBar } from 'expo-status-bar';
import { Rabbit } from 'lucide-react-native';
import { MotiView } from 'moti';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { PillBadge } from 'components/ui';

function PreviewItem({ name, price, checked }: { name: string; price: string; checked: boolean }) {
  return (
    <View
      className="flex-row items-center justify-between"
      style={{ paddingVertical: 9, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.07)' }}>
      <View className="flex-row items-center" style={{ gap: 10 }}>
        <View
          style={{
            width: 14,
            height: 14,
            borderRadius: 7,
            backgroundColor: checked ? '#111' : 'transparent',
            borderWidth: 1.5,
            borderColor: checked ? '#111' : 'rgba(0,0,0,0.2)',
          }}
        />
        <Text
          style={{
            fontSize: 13,
            fontWeight: '500',
            color: '#111',
            opacity: checked ? 1 : 0.32,
            letterSpacing: -0.2,
          }}>
          {name}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 13,
          fontWeight: '600',
          color: '#111',
          opacity: checked ? 1 : 0.32,
          letterSpacing: -0.3,
        }}>
        {price}
      </Text>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-[#F4F4F4]">
        <StatusBar style="dark" />

        {/* Left spine */}
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            left: 22,
            top: 0,
            bottom: 0,
            width: 1,
            backgroundColor: '#E2E2E2',
          }}
        />

        <View className="flex-1 pb-8 pt-2" style={{ paddingLeft: 44, paddingRight: 22 }}>
          {/* Top bar */}
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 300 }}
            className="flex-row items-center justify-between py-3">
            <Text style={{ fontSize: 19, fontWeight: '600', color: '#111', letterSpacing: -0.9 }}>
              umo
            </Text>
            <View
              className="h-9 w-9 items-center justify-center rounded-[12px] bg-[#FF0048]"
              style={{
                shadowColor: '#FF0048',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.4,
                shadowRadius: 8,
                elevation: 5,
              }}>
              <Rabbit size={17} color="#fff" strokeWidth={1.75} />
            </View>
          </MotiView>

          <View className="flex-1 justify-between">
            {/* Headline */}
            <MotiView
              from={{ opacity: 0, translateY: 24 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'spring', stiffness: 180, damping: 22, delay: 80 }}
              style={{ marginTop: 20 }}>
              <Text
                style={{
                  fontSize: 50,
                  fontWeight: '500',
                  color: '#111',
                  letterSpacing: -3,
                  lineHeight: 52,
                }}>
                {'The bill\nsplitter Zim-\nbabwe needs.'}
              </Text>
              <View className="mt-[14px] flex-row items-center" style={{ gap: 7 }}>
                <View
                  style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#FF0048' }}
                />
                <Text style={{ fontSize: 13, color: '#777', letterSpacing: 0.1 }}>
                  USD · ZiG · EcoCash · InnBucks
                </Text>
              </View>
            </MotiView>

            {/* Card stack */}
            <MotiView
              from={{ opacity: 0, translateY: 32, scale: 0.97 }}
              animate={{ opacity: 1, translateY: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 260 }}
              style={{ marginVertical: 16 }}>
              {/* ── Platinum receipt card ── */}
              <View
                style={{
                  backgroundColor: '#E6E6E6',
                  borderRadius: 24,
                  padding: 20,
                  // paddingBottom is intentional empty space the pink card peeks into
                  paddingBottom: 44,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.07,
                  shadowRadius: 12,
                  elevation: 2,
                }}>
                {/* Header */}
                <View className="mb-3 flex-row items-start justify-between">
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#111',
                        letterSpacing: -0.5,
                      }}>
                      Dinner @ Gava's
                    </Text>
                    <Text style={{ fontSize: 12, color: '#666', marginTop: 2 }}>
                      Sat, 22 Feb · 4 people
                    </Text>
                  </View>
                  <PillBadge label="RECEIPT" variant="muted" />
                </View>

                {/* Items — dashed left flow line */}
                <View
                  style={{
                    borderLeftWidth: 1,
                    borderLeftColor: 'rgba(0,0,0,0.14)',
                    borderStyle: 'dashed',
                    paddingLeft: 14,
                    marginLeft: 3,
                  }}>
                  <PreviewItem name="Nyama Choma" price="$18" checked={true} />
                  <PreviewItem name="Sadza & Relish" price="$9" checked={true} />
                  <PreviewItem name="Stoney ×2" price="$4" checked={false} />
                </View>
              </View>

              {/* ── Pink "Your Share" card — peeks into receipt's paddingBottom ── */}
              <View
                style={{
                  backgroundColor: '#FF0048',
                  borderRadius: 24,
                  padding: 20,
                  marginTop: -40, // exactly covers the reserved paddingBottom
                  marginHorizontal: 12,
                  shadowColor: '#FF0048',
                  shadowOffset: { width: 0, height: 12 },
                  shadowOpacity: 0.38,
                  shadowRadius: 24,
                  elevation: 10,
                }}>
                <View className="flex-row items-end justify-between">
                  <View>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        letterSpacing: 1.2,
                        color: '#450010',
                        opacity: 0.6,
                      }}>
                      Your Share
                    </Text>
                    <Text
                      style={{
                        fontSize: 44,
                        fontWeight: '600',
                        color: '#450010',
                        letterSpacing: -2.5,
                        lineHeight: 48,
                        marginTop: 1,
                      }}>
                      $13.50
                    </Text>
                  </View>
                  <View style={{ alignItems: 'flex-end', gap: 6 }}>
                    <Text
                      style={{ fontSize: 12, fontWeight: '500', color: '#450010', opacity: 0.55 }}>
                      of $54.00
                    </Text>
                    <View
                      style={{
                        backgroundColor: 'rgba(69,0,16,0.14)',
                        borderRadius: 100,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                      }}>
                      <Text
                        style={{
                          fontSize: 9.5,
                          fontWeight: '700',
                          textTransform: 'uppercase',
                          letterSpacing: 0.8,
                          color: '#450010',
                        }}>
                        ZiG 16,200
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </MotiView>

            {/* CTAs */}
            <View style={{ gap: 10 }}>
              <MotiView
                from={{ opacity: 0, translateY: 14 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'spring', delay: 380 }}>
                <Pressable
                  style={{
                    backgroundColor: '#FF0048',
                    borderRadius: 18,
                    paddingHorizontal: 24,
                    paddingVertical: 17,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    shadowColor: '#FF0048',
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.3,
                    shadowRadius: 14,
                    elevation: 6,
                  }}
                  android_ripple={{ color: 'rgba(255,255,255,0.15)' }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#450010' }}>
                    Get Started
                  </Text>
                  <Text style={{ fontSize: 18, color: '#450010' }}>→</Text>
                </Pressable>
              </MotiView>

              <MotiView
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'timing', duration: 400, delay: 460 }}>
                <Pressable className="items-center py-[10px]">
                  <Text style={{ fontSize: 13.5, color: '#666' }}>
                    Already have an account?{' '}
                    <Text style={{ color: '#111', fontWeight: '600' }}>Sign in</Text>
                  </Text>
                </Pressable>
              </MotiView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
