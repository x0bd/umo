import './global.css';

import { StatusBar } from 'expo-status-bar';
import { Rabbit } from 'lucide-react-native';
import { MotiView } from 'moti';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

/** Tiny receipt row used in the hero preview card */
function PreviewItem({ name, price, checked }: { name: string; price: string; checked: boolean }) {
  return (
    <View
      className="flex-row items-center justify-between py-[7px]"
      style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.07)' }}>
      <View className="flex-row items-center gap-[10px]">
        <View
          style={{
            width: 15,
            height: 15,
            borderRadius: 8,
            backgroundColor: checked ? '#111111' : 'transparent',
            borderWidth: 1.5,
            borderColor: checked ? '#111111' : 'rgba(0,0,0,0.22)',
          }}
        />
        <Text
          style={{
            fontSize: 13,
            fontWeight: '500',
            color: '#111111',
            opacity: checked ? 1 : 0.35,
            letterSpacing: -0.2,
          }}>
          {name}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 13,
          fontWeight: '600',
          color: '#111111',
          opacity: checked ? 1 : 0.35,
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

        {/* Left spine — decorative vertical rule from inspo */}
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            left: 22,
            top: 0,
            bottom: 0,
            width: 1,
            backgroundColor: '#E0E0E0',
          }}
        />

        <View className="flex-1 pb-6 pt-2" style={{ paddingLeft: 44, paddingRight: 24 }}>
          {/* ── Top bar: wordmark + rabbit badge ── */}
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 380, delay: 0 }}
            className="flex-row items-center justify-between py-3">
            <Text style={{ fontSize: 20, fontWeight: '600', color: '#111111', letterSpacing: -1 }}>
              umo
            </Text>
            <View
              className="h-9 w-9 items-center justify-center rounded-[13px] bg-[#FF0048]"
              style={{
                shadowColor: '#FF0048',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.35,
                shadowRadius: 8,
                elevation: 4,
              }}>
              <Rabbit size={18} color="#FFFFFF" strokeWidth={1.75} />
            </View>
          </MotiView>

          <View className="flex-1 justify-between">
            {/* ── Hero headline ── */}
            <View className="mt-7">
              <MotiView
                from={{ opacity: 0, translateY: 28 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'spring', stiffness: 180, damping: 22, delay: 80 }}>
                <Text
                  style={{
                    fontSize: 56,
                    fontWeight: '500',
                    color: '#111111',
                    letterSpacing: -3.5,
                    lineHeight: 58,
                  }}>
                  {'The bill\nsplitter\nZimbabwe\ndeserves.'}
                </Text>
              </MotiView>

              <MotiView
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'spring', delay: 200 }}
                className="mt-4 flex-row items-center gap-2">
                {/* Tiny pink accent dot */}
                <View className="h-[6px] w-[6px] rounded-full bg-[#FF0048]" />
                <Text style={{ fontSize: 14, color: '#555555', letterSpacing: 0.1 }}>
                  Multi-currency · EcoCash · Friends
                </Text>
              </MotiView>
            </View>

            {/* ── Hero visual: live mini UI preview ── */}
            <MotiView
              from={{ opacity: 0, translateY: 40, scale: 0.97 }}
              animate={{ opacity: 1, translateY: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 160, damping: 20, delay: 290 }}
              className="my-5">
              {/* Platinum receipt card */}
              <View
                className="rounded-[24px] bg-[#E6E6E6] p-5"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.08,
                  shadowRadius: 14,
                  elevation: 3,
                }}>
                {/* Card header row */}
                <View className="mb-[14px] flex-row items-start justify-between">
                  <View>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: '600',
                        color: '#111111',
                        letterSpacing: -0.6,
                      }}>
                      Dinner @ Gava's
                    </Text>
                    <Text style={{ fontSize: 12, color: '#555555', marginTop: 2 }}>
                      Sat, 22 Feb · 4 people
                    </Text>
                  </View>

                  {/* Vertical pill */}
                  <View
                    className="items-center justify-center rounded-full bg-[rgba(0,0,0,0.07)]"
                    style={{ paddingHorizontal: 5, paddingVertical: 10 }}>
                    <Text
                      style={{
                        fontSize: 7.5,
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        letterSpacing: 0.8,
                        color: '#111111',
                        transform: [{ rotate: '90deg' }],
                        width: 36,
                        textAlign: 'center',
                      }}>
                      RECEIPT
                    </Text>
                  </View>
                </View>

                {/* Items with dashed left flow line */}
                <View
                  style={{
                    borderLeftWidth: 1,
                    borderLeftColor: 'rgba(0,0,0,0.15)',
                    borderStyle: 'dashed',
                    paddingLeft: 14,
                    marginLeft: 3,
                  }}>
                  <PreviewItem name="Nyama Choma" price="$18" checked={true} />
                  <PreviewItem name="Sadza & Relish" price="$9" checked={true} />
                  <PreviewItem name="Stoney Tangawizi (×2)" price="$4" checked={false} />
                </View>
              </View>

              {/* Pink "Your Share" card — overlaps receipt card */}
              <View
                className="mx-4 rounded-[24px] bg-[#FF0048] p-5"
                style={{
                  marginTop: -18,
                  shadowColor: '#FF0048',
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: 0.32,
                  shadowRadius: 20,
                  elevation: 8,
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
                        opacity: 0.65,
                      }}>
                      Your Share
                    </Text>
                    <Text
                      style={{
                        fontSize: 42,
                        fontWeight: '600',
                        color: '#450010',
                        letterSpacing: -2.5,
                        lineHeight: 48,
                        marginTop: 2,
                      }}>
                      $13.50
                    </Text>
                  </View>
                  <View className="items-end gap-[6px]">
                    <Text
                      style={{ fontSize: 12, fontWeight: '500', color: '#450010', opacity: 0.6 }}>
                      of $54.00 total
                    </Text>
                    <View
                      className="rounded-full px-3 py-[5px]"
                      style={{ backgroundColor: 'rgba(69,0,16,0.14)' }}>
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

            {/* ── Bottom CTAs ── */}
            <View className="gap-3">
              {/* Primary CTA */}
              <MotiView
                from={{ opacity: 0, translateY: 16 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'spring', delay: 400 }}>
                <Pressable
                  className="flex-row items-center justify-between rounded-[18px] bg-[#FF0048] px-6 py-[18px]"
                  style={{
                    shadowColor: '#FF0048',
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.32,
                    shadowRadius: 16,
                    elevation: 6,
                  }}
                  android_ripple={{ color: 'rgba(255,255,255,0.15)' }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#450010' }}>
                    Get Started
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: '400', color: '#450010' }}>→</Text>
                </Pressable>
              </MotiView>

              {/* Secondary — sign in */}
              <MotiView
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'timing', duration: 480, delay: 480 }}>
                <Pressable
                  className="items-center py-3"
                  android_ripple={{ color: 'rgba(0,0,0,0.05)' }}>
                  <Text style={{ fontSize: 14, color: '#555555' }}>
                    Already have an account?{' '}
                    <Text style={{ color: '#111111', fontWeight: '600' }}>Sign in</Text>
                  </Text>
                </Pressable>
              </MotiView>

              {/* Payment method chips */}
              <MotiView
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'timing', duration: 500, delay: 560 }}
                className="flex-row items-center justify-center gap-2 pt-1">
                {['USD', 'ZiG', 'EcoCash', 'InnBucks'].map((label) => (
                  <View
                    key={label}
                    className="rounded-full px-[10px] py-[5px]"
                    style={{ backgroundColor: 'rgba(0,0,0,0.06)' }}>
                    <Text
                      style={{
                        fontSize: 9.5,
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: 0.8,
                        color: '#555555',
                      }}>
                      {label}
                    </Text>
                  </View>
                ))}
              </MotiView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
