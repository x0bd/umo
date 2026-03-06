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
    initials: 'EC',
    color: '#00A550',
    light: '#E5F7EE',
  },
  {
    id: 'innbucks',
    name: 'InnBucks',
    sub: 'Innscor digital wallet',
    initials: 'IB',
    color: '#F05A28',
    light: '#FEF0EB',
  },
  {
    id: 'onemoney',
    name: 'OneMoney',
    sub: 'NetOne mobile money',
    initials: 'OM',
    color: '#8B1CC8',
    light: '#F4EAFB',
  },
  {
    id: 'paynow',
    name: 'PayNow',
    sub: 'Online card payments',
    initials: 'PN',
    color: '#1A73E8',
    light: '#E8F1FD',
  },
  {
    id: 'mukuru',
    name: 'Mukuru',
    sub: 'Send & receive money',
    initials: 'MK',
    color: '#D0202A',
    light: '#FBEAEA',
  },
  {
    id: 'usd',
    name: 'USD Cash',
    sub: 'US Dollar bills',
    initials: '$',
    color: '#1B6B36',
    light: '#EAF4EE',
  },
  {
    id: 'zig',
    name: 'ZiG Cash',
    sub: 'Zimbabwe Gold currency',
    initials: 'Z',
    color: '#9A6F00',
    light: '#FBF5E0',
  },
  {
    id: 'zipit',
    name: 'ZIPIT',
    sub: 'Instant bank transfer',
    initials: 'ZP',
    color: '#1B3A6B',
    light: '#E8EDF5',
  },
];

function ServiceRow({
  service,
  selected,
  onToggle,
  delay,
  isLast,
}: {
  service: (typeof SERVICES)[0];
  selected: boolean;
  onToggle: () => void;
  delay: number;
  isLast: boolean;
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <MotiView
      from={{ opacity: 0, translateX: -16 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: 'timing', duration: 220, delay }}>
      <Pressable
        onPress={onToggle}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}>
        <MotiView
          animate={{ backgroundColor: selected ? '#FFF6F8' : '#FFFFFF' }}
          transition={{ type: 'timing', duration: 160 }}
          style={{ paddingHorizontal: 16, paddingVertical: 14 }}>
          <MotiView
            animate={{ scale: pressed ? 0.985 : 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>

            {/* BRAND BADGE */}
            <MotiView
              animate={{
                backgroundColor: selected ? service.color : service.light,
              }}
              transition={{ type: 'timing', duration: 200 }}
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: service.initials.length === 1 ? 20 : 13,
                  fontWeight: '800',
                  color: selected ? '#fff' : service.color,
                  letterSpacing: -0.5,
                }}>
                {service.initials}
              </Text>
            </MotiView>

            {/* TEXT */}
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: '#0E0E0E',
                  letterSpacing: -0.5,
                  marginBottom: 2,
                }}>
                {service.name}
              </Text>
              <Text
                style={{
                  fontSize: 12.5,
                  fontWeight: '400',
                  color: '#999',
                  letterSpacing: 0.05,
                }}>
                {service.sub}
              </Text>
            </View>

            {/* CHECKBOX */}
            <MotiView
              animate={{
                backgroundColor: selected ? '#FF0048' : 'transparent',
                borderColor: selected ? '#FF0048' : '#D4D4D4',
              }}
              transition={{ type: 'timing', duration: 160 }}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderWidth: 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AnimatePresence>
                {selected && (
                  <MotiView
                    from={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 560, damping: 22 }}>
                    <Check size={13} color="#fff" strokeWidth={3} />
                  </MotiView>
                )}
              </AnimatePresence>
            </MotiView>
          </MotiView>
        </MotiView>
      </Pressable>

      {/* SEPARATOR */}
      {!isLast && (
        <View
          style={{
            height: 1,
            backgroundColor: '#F2F2F2',
            marginLeft: 78,
            marginRight: 0,
          }}
        />
      )}
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

        {/* HEADER */}
        <MotiView
          from={{ opacity: 0, translateY: 14 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 240 }}
          style={{ paddingTop: insets.top + 32, paddingHorizontal: 24, paddingBottom: 28 }}>
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
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#FF0048' }} />
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
                      from={{ opacity: 0, scale: 0.75 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.75 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                      style={{
                        backgroundColor: '#FF0048',
                        borderRadius: 100,
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                      }}>
                      <Text
                        style={{ fontSize: 10, fontWeight: '700', color: '#fff', letterSpacing: 0.6 }}>
                        {selected.length} of {SERVICES.length}
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
                }}>
                {"We'll show the right options at your table."}
              </Text>
            </View>
          </View>
        </MotiView>

        {/* LIST CARD */}
        <View style={{ marginHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 10,
              fontWeight: '700',
              letterSpacing: 2.8,
              color: '#AAAAAA',
              textTransform: 'uppercase',
              marginBottom: 10,
              paddingLeft: 4,
            }}>
            Payment methods
          </Text>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 22,
              overflow: 'hidden',
              borderWidth: 1,
              borderColor: '#EBEBEB',
            }}>
            {SERVICES.map((service, i) => (
              <ServiceRow
                key={service.id}
                service={service}
                selected={selected.includes(service.id)}
                onToggle={() => toggle(service.id)}
                delay={i * 35}
                isLast={i === SERVICES.length - 1}
              />
            ))}
          </View>
          <Text
            style={{
              fontSize: 11.5,
              color: '#BBBBBB',
              letterSpacing: 0.1,
              lineHeight: 17,
              marginTop: 10,
              paddingLeft: 4,
            }}>
            You can change this any time from your profile.
          </Text>
        </View>
      </ScrollView>

      {/* STICKY CTA */}
      <View
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
          onPress={() => { if (hasSelection) onDone(selected); }}
          onPressIn={() => setSubmitPressed(true)}
          onPressOut={() => setSubmitPressed(false)}>
          <MotiView
            animate={{
              scale: submitPressed ? 0.97 : 1,
              backgroundColor: hasSelection ? '#FF0048' : '#E0E0E0',
              shadowOpacity: hasSelection ? 0.35 : 0,
            }}
            transition={{ type: 'timing', duration: 150 }}
            style={{
              borderRadius: 20,
              paddingHorizontal: 28,
              paddingVertical: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              shadowColor: '#FF0048',
              shadowOffset: { width: 0, height: 12 },
              shadowRadius: 20,
              elevation: hasSelection ? 8 : 0,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: hasSelection ? '#fff' : '#AAAAAA',
                letterSpacing: -0.3,
              }}>
              {hasSelection ? "All set — let's go" : 'Select at least one'}
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
              <Text
                style={{ fontSize: 16, color: hasSelection ? '#fff' : '#CCCCCC' }}>
                →
              </Text>
            </View>
          </MotiView>
        </Pressable>
      </View>
    </View>
  );
}
