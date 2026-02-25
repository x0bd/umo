import { View, Text } from 'react-native';

type PillVariant = 'pink' | 'gray';

interface VerticalPillProps {
  label: string;
  variant?: PillVariant;
}

export function VerticalPill({ label, variant = 'gray' }: VerticalPillProps) {
  const containerStyle =
    variant === 'pink'
      ? 'bg-[rgba(69,0,16,0.15)] rounded-[100px] px-[4px] py-3'
      : 'bg-[rgba(0,0,0,0.08)] rounded-[100px] px-[4px] py-3';

  const textColor = variant === 'pink' ? 'text-[#450010]' : 'text-[#111111]';

  return (
    <View className={`mr-4 w-6 items-center ${containerStyle}`}>
      <Text
        className={`text-[9px] font-bold uppercase tracking-[1px] ${textColor}`}
        style={{ writingDirection: 'ltr', transform: [{ rotate: '180deg' }] }}
        // React Native doesn't support writing-mode, so we rotate the whole pill
      >
        {label}
      </Text>
    </View>
  );
}
