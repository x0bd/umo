import { View, Text } from 'react-native';

type BadgeVariant = 'default' | 'pink' | 'success' | 'warning' | 'muted';

interface PillBadgeProps {
  label: string;
  variant?: BadgeVariant;
}

const styles: Record<BadgeVariant, { bg: string; text: string }> = {
  default: { bg: 'bg-[#E6E6E6]', text: 'text-[#111111]' },
  pink: { bg: 'bg-[#FF0048]', text: 'text-[#450010]' },
  success: { bg: 'bg-[#E6F9EE]', text: 'text-[#00C853]' },
  warning: { bg: 'bg-[#FFF8E1]', text: 'text-[#F57F17]' },
  muted: { bg: 'bg-[rgba(0,0,0,0.06)]', text: 'text-[#555555]' },
};

export function PillBadge({ label, variant = 'default' }: PillBadgeProps) {
  const { bg, text } = styles[variant];
  return (
    <View className={`${bg} self-start rounded-full px-3 py-1`}>
      <Text className={`text-[10px] font-bold uppercase tracking-[1px] ${text}`}>{label}</Text>
    </View>
  );
}
