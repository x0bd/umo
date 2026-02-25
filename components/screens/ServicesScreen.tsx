import { Check } from 'lucide-react-native';
import { AnimatePresence, MotiView } from 'moti';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  onDone: (selected: string[]) => void;
}

const SERVICES = [
  {
    id: 'ecocash',
    name: 'EcoCash',
    sub: 'Econet mobile money',
    color: '#00A550',
    accent: '#E5F7EE',
  },
  {
    id: 'innbucks',
    name: 'InnBucks',
    sub: 'Innscor digital wallet',
    color: '#F05A28',
    accent: '#FEF0EB',
  },
  {
    id: 'onemoney',
    name: 'OneMoney',
    sub: 'NetOne mobile money',
    color: '#8B1CC8',
    accent: '#F4EAFB',
  },
  {
    id: 'paynow',
    name: 'PayNow',
    sub: 'Online card payments',
    color: '#1A73E8',
    accent: '#E8F1FD',
  },
  {
    id: 'mukuru',
    name: 'Mukuru',
    sub: 'Send & receive money',
    color: '#D0202A',
    accent: '#FBEAEA',
  },
  {
    id: 'usd',
    name: 'USD Cash',
    sub: 'US Dollar bills',
    color: '#2E7D48',
    accent: '#EAF4EE',
  },
  {
    id: 'zig',
    name: 'ZiG Cash',
    sub: 'Zimbabwe Gold currency',
    color: '#B8860B',
    accent: '#FBF5E0',
  },
  {
    id: 'zipit',
    name: 'ZIPIT',
    sub: 'Instant bank transfer',
    color: '#1B3A6B',
    accent: '#E8EDF5',
  },
];

function ServiceTile({
  service,
  selected,
  onToggle,
  delay,
}: {
  service: (typeof SERVICES)[0];
  selected: boolean;
  onToggle: () => void;
  delay: number;
}) {
  const [pressed, setPressed] = useState(false);
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.88, translateY: 12 }}
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 260, delay }}>
      <Pressable
        onPress={onToggle}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}>
        <MotiView
          animate={{
            scale: pressed ? 0.97 : 1,
            borderColor: selected ? '#FF0048' : '#EBEBEB',
            backgroundColor: selected ? '#FFF4F6' : '#FFFFFF',
          }}
          transition={{ type: 'timing', duration: 160 }}
          style={{
            borderRadius: 20,
            borderWidth: 1.5,
            padding: 16,
            minHeight: 96,
            justifyContent: 'space-between',
            overflow: 'hidden',
          }}>
          {/* BRAND DOT */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 10,
                backgroundColor: service.accent,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: service.color,
                }}
              />
            </View>

            {/* CHECKMARK */}
            <AnimatePresence>
              {selected && (
                <MotiView
                  from={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 24 }}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: '#FF0048',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 'auto',
                  }}>
                  <Check size={11} color="#fff" strokeWidth={3} />
                </MotiView>
              )}
            </AnimatePresence>
          </View>

          {/* TEXT */}
          <View style={{ marginTop: 12 }}>
            <Text
              style={{
                fontSize: 14.5,
                fontWeight: '700',
                color: '#0E0E0E',
                letterSpacing: -0.4,
                marginBottom: 2,
              }}>
              {service.name}
            </Text>
            <Text style={{ fontSize: 11.5, color: '#999', letterSpacing: 0.05 }}>
              {service.sub}
            </Text>
          </View>
        </MotiView>
      </Pressable>
    </MotiView>
  );
}

export function ServicesScreen({ onDone }: Props) {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<string[]>([]);
  const [submitPressed, setSubmitPressed] = useState(false);

  function toggle(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  }

  const hasSelection = selected.length > 0;

  return (
    <View style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
        showsVerticalScrollIndicator={false}>
        {/* HERO SECTION */}
        <MotiView
          from={{ opacity: 0, translateY: 14 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 240 }}
          style={{ paddingTop: insets.top + 32, paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            {/* LEFT SPINE */}
            <View
              style={{
                width: 1,
                backgroundColor: '#DEDEDE',
                marginTop: 4,
                marginBottom: 4,
                marginRight: 20,
                borderRadius: 1,
              }}
            />

            <View style={{ flex: 1 }}>
              {/* EYEBROW */}
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 14 }}>
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
                  Setup
                </Text>
                <View style={{ flex: 1 }} />
                <AnimatePresence>
                  {hasSelection && (
                    <MotiView
                      from={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: 'timing', duration: 160 }}
                      style={{
                        backgroundColor: '#FF0048',
                        borderRadius: 100,
                        paddingHorizontal: 10,
                        paddingVertical: 3,
                      }}>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: '700',
                          color: '#fff',
                          letterSpacing: 0.5,
                        }}>
                        {selected.length} selected
                      </Text>
                    </MotiView>
                  )}
                </AnimatePresence>
              </View>

              <Text
                style={{
                  fontSize: 44,
                  fontWeight: '600',
                  color: '#0E0E0E',
                  letterSpacing: -2.6,
                  lineHeight: 46,
                  marginBottom: 10,
                }}>
                {'What do you\nuse to pay?'}
              </Text>
              <Text
                style={{
                  fontSize: 14.5,
                  color: '#5A5A5A',
                  lineHeight: 22,
                  letterSpacing: 0.05,
                  marginBottom: 28,
                }}>
                {"We'll suggest the fastest way to settle for your table."}
              </Text>
            </View>
          </View>
        </MotiView>

        {/* GRID */}
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {SERVICES.map((service, i) => (
              <View key={service.id} style={{ width: '47%' }}>
                <ServiceTile
                  service={service}
                  selected={selected.includes(service.id)}
                  onToggle={() => toggle(service.id)}
                  delay={i * 40}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* STICKY CTA */}
      <MotiView
        animate={{ opacity: 1, translateY: 0 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 20,
          paddingTop: 16,
          backgroundColor: '#F4F4F4',
          borderTopWidth: 1,
          borderTopColor: '#E8E8E8',
        }}>
        <Pressable
          onPress={() => {
            if (hasSelection) onDone(selected);
          }}
          onPressIn={() => setSubmitPressed(true)}
          onPressOut={() => setSubmitPressed(false)}>
          <MotiView
            animate={{
              scale: submitPressed ? 0.97 : 1,
              backgroundColor: hasSelection ? '#FF0048' : '#E0E0E0',
            }}
            transition={{ type: 'timing', duration: 160 }}
            style={{
              borderRadius: 18,
              paddingHorizontal: 24,
              paddingVertical: 18,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              shadowColor: hasSelection ? '#FF0048' : 'transparent',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.3,
              shadowRadius: 18,
              elevation: hasSelection ? 8 : 0,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: hasSelection ? '#fff' : '#AAAAAA',
                letterSpacing: -0.3,
              }}>
              {hasSelection ? "All set, let's go" : 'Select at least one'}
            </Text>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: hasSelection ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.06)',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 16, color: hasSelection ? '#fff' : '#CCC' }}>→</Text>
            </View>
          </MotiView>
        </Pressable>
      </MotiView>
    </View>
  );
}
