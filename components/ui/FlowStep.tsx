import { ReactNode } from 'react';
import { View, Text } from 'react-native';

interface FlowStepProps {
  label: string;
  children: ReactNode;
  /** Color context — adapts label opacity */
  on?: 'pink' | 'platinum' | 'white';
  valueLarge?: boolean;
}

const dotColor: Record<string, string> = {
  pink: 'bg-[rgba(69,0,16,0.4)]',
  platinum: 'bg-[rgba(0,0,0,0.4)]',
  white: 'bg-[rgba(0,0,0,0.4)]',
};

const labelColor: Record<string, string> = {
  pink: 'text-[#450010] opacity-60',
  platinum: 'text-[#111111] opacity-60',
  white: 'text-[#555555]',
};

const valueColor: Record<string, string> = {
  pink: 'text-[#450010]',
  platinum: 'text-[#111111]',
  white: 'text-[#111111]',
};

export function FlowStep({ label, children, on = 'platinum', valueLarge = false }: FlowStepProps) {
  return (
    <View className="relative flex-row gap-4">
      {/* Marker dot */}
      <View className="items-center" style={{ width: 12, paddingTop: 6 }}>
        <View className={`h-[7px] w-[7px] rounded-full ${dotColor[on]}`} />
      </View>

      {/* Content */}
      <View className="flex-1">
        <Text className={`mb-1 text-[11px] font-bold uppercase tracking-[0.5px] ${labelColor[on]}`}>
          {label}
        </Text>
        {typeof children === 'string' ? (
          <Text
            className={`${valueLarge ? 'font-mono text-4xl tracking-[-2px]' : 'text-[18px] font-medium tracking-[-0.5px]'} ${valueColor[on]}`}>
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
    </View>
  );
}
