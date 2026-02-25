import { MotiView } from 'moti';
import { Text, Pressable } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import { useState } from 'react';

type ButtonVariant = 'pink' | 'dark' | 'ghost';

interface ActionButtonProps {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, { bg: string; text: string; iconColor: string }> = {
  pink: { bg: 'bg-[#FF0048]', text: 'text-[#450010]', iconColor: '#450010' },
  dark: { bg: 'bg-[#111111]', text: 'text-white', iconColor: '#FFFFFF' },
  ghost: {
    bg: 'bg-transparent border border-[#CCCCCC]',
    text: 'text-[#111111]',
    iconColor: '#111111',
  },
};

export function ActionButton({
  label,
  onPress,
  variant = 'pink',
  disabled = false,
}: ActionButtonProps) {
  const [pressed, setPressed] = useState(false);
  const { bg, text, iconColor } = variantStyles[variant];

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={disabled}
      style={{ opacity: disabled ? 0.4 : 1 }}>
      <MotiView
        animate={{ scale: pressed ? 0.97 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`${bg} flex-row items-center justify-between rounded-[20px] px-6 py-5`}>
        <Text className={`text-base font-semibold ${text}`}>{label}</Text>
        <ArrowRight size={18} color={iconColor} strokeWidth={2.5} />
      </MotiView>
    </Pressable>
  );
}
