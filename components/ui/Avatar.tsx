import { View, Text } from 'react-native';

type RingStatus = 'paid' | 'pending' | 'none';

interface AvatarProps {
  initials: string;
  size?: number;
  bg?: string;
  status?: RingStatus;
}

const ringColor: Record<RingStatus, string> = {
  paid: '#00C853',
  pending: '#FF0048',
  none: 'transparent',
};

export function Avatar({ initials, size = 36, bg = '#D1D1D1', status = 'none' }: AvatarProps) {
  const ring = ringColor[status];
  const fontSize = size * 0.36;

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: bg,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: status !== 'none' ? 2 : 0,
        borderColor: ring,
      }}>
      <Text
        style={{
          fontSize,
          fontWeight: '600',
          color: '#111111',
          letterSpacing: -0.5,
        }}>
        {initials.slice(0, 2).toUpperCase()}
      </Text>
    </View>
  );
}
