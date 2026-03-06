import { MotiView } from 'moti';
import { View, Text, Pressable, Image } from 'react-native';

type CardVariant = 'black' | 'platinum' | 'white';

interface PaymentCardProps {
  type: string;
  last4: string;
  variant?: CardVariant;
  iconUrl?: string;
  onPress?: () => void;
}

const variantStyles: Record<
  CardVariant,
  { bg: string; text: string; subtext: string; border: string }
> = {
  black: {
    bg: '#111111',
    text: '#FFFFFF',
    subtext: 'rgba(255,255,255,0.5)',
    border: 'transparent',
  },
  platinum: {
    bg: '#E6E6E6',
    text: '#111111',
    subtext: '#555555',
    border: 'transparent',
  },
  white: {
    bg: '#FFFFFF',
    text: '#111111',
    subtext: '#555555',
    border: '#CCCCCC',
  },
};

export function PaymentCard({
  type,
  last4,
  variant = 'black',
  iconUrl,
  onPress,
}: PaymentCardProps) {
  const { bg, text, subtext, border } = variantStyles[variant];

  return (
    <Pressable onPress={onPress}>
      <MotiView
        style={{
          width: 140,
          height: 90,
          backgroundColor: bg,
          borderRadius: 16,
          padding: 16,
          justifyContent: 'space-between',
          borderWidth: border !== 'transparent' ? 1 : 0,
          borderColor: border,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: variant === 'black' ? 0.2 : 0.05,
          shadowRadius: 10,
          elevation: 4,
          marginRight: 12,
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          {iconUrl ? (
            <Image
              source={{ uri: iconUrl }}
              style={{ width: 24, height: 24, borderRadius: 6, opacity: 0.9 }}
            />
          ) : (
            <View style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: subtext, opacity: 0.2 }} />
          )}
        </View>

        <View>
          <Text style={{ fontSize: 13, fontWeight: '600', color: text, marginBottom: 2 }}>{type}</Text>
          <Text style={{ fontSize: 11, color: subtext, letterSpacing: 1 }}>•••• {last4}</Text>
        </View>
      </MotiView>
    </Pressable>
  );
}
