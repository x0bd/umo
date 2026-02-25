import { MotiView } from 'moti';
import { ReactNode } from 'react';
import { View } from 'react-native';

type CardVariant = 'pink' | 'platinum' | 'white';

interface CardProps {
  variant?: CardVariant;
  children: ReactNode;
  className?: string;
  /** Animate in on mount */
  animate?: boolean;
  delay?: number;
}

const variantClasses: Record<CardVariant, string> = {
  pink: 'bg-[#FF0048]',
  platinum: 'bg-[#E6E6E6]',
  white: 'bg-white border border-[#CCCCCC]',
};

export function Card({
  variant = 'white',
  children,
  className = '',
  animate = false,
  delay = 0,
}: CardProps) {
  const base = `rounded-[28px] p-6 overflow-hidden ${variantClasses[variant]} ${className}`;

  if (animate) {
    return (
      <MotiView
        from={{ opacity: 0, translateY: 16 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', delay }}
        className={base}>
        {children}
      </MotiView>
    );
  }

  return <View className={base}>{children}</View>;
}
