import { Check } from 'lucide-react-native';
import { AnimatePresence, MotiView } from 'moti';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenCard } from '../ui';

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
                backgroundColor: selected ? '#111111' : 'transparent',
                borderColor: selected ? '#111111' : '#D4D4D4',
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
        contentContainerStyle={{
          paddingTop: insets.top + 24,
          paddingBottom: insets.bottom + 140,
          paddingHorizontal: 20,
          gap: 18,
        }}
        showsVerticalScrollIndicator={false}>
        {/* HEADER CARD */}
        <MotiView
          from={{ opacity: 0, translateY: 14 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 240 }}>
          <ScreenCard
            variant="surface"
            header={{
              label: 'Setup',
              title: 'What do you\nuse to pay?',
              subtitle: "We'll show the right options at your table.",
            }}>
            <AnimatePresence>
              {hasSelection && (
                <MotiView
                  from={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                  style={{
                    alignSelf: 'flex-start',
                    backgroundColor: '#111111',
                    borderRadius: 999,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '700',
                      color: '#fff',
                      letterSpacing: 0.6,
                    }}>
                    {selected.length} of {SERVICES.length}
                  </Text>
                </MotiView>
              )}
            </AnimatePresence>
          </ScreenCard>
        </MotiView>

        {/* SERVICES LIST CARD */}
        <MotiView
          from={{ opacity: 0, translateY: 18 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 260, delay: 80 }}>
          <ScreenCard
            variant="surface"
            header={{
              label: 'Payment methods',
              title: 'Where money lives.',
              subtitle: 'Pick everything you actually use. You can change this any time.',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 18,
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
          </ScreenCard>
        </MotiView>
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
          onPress={() => {
            if (hasSelection) onDone(selected);
          }}
          onPressIn={() => setSubmitPressed(true)}
          onPressOut={() => setSubmitPressed(false)}>
          <MotiView
            animate={{
              scale: submitPressed ? 0.97 : 1,
              backgroundColor: hasSelection ? '#111111' : '#E0E0E0',
              shadowOpacity: hasSelection ? 0.25 : 0,
            }}
            transition={{ type: 'timing', duration: 150 }}
            style={{
              borderRadius: 20,
              paddingHorizontal: 28,
              paddingVertical: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              shadowColor: '#000',
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
