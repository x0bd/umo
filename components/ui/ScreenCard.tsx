import { ReactNode } from 'react';
import { View, Text } from 'react-native';

import { Card } from './Card';

type ScreenCardVariant = 'primary' | 'secondary' | 'surface';

type HeaderConfig = {
  label?: string;
  title?: string;
  subtitle?: string;
  /** Dot color for eyebrow — defaults to #111111, use #FF0048 for brand accent */
  accentDot?: string;
};

interface ScreenCardProps {
  variant?: ScreenCardVariant;
  header?: HeaderConfig;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Animate in on mount, forwarded to underlying Card */
  animate?: boolean;
  delay?: number;
}

const variantToCardVariant: Record<ScreenCardVariant, 'pink' | 'platinum' | 'white'> = {
  primary: 'pink', // dark hero card
  secondary: 'platinum', // light gray info card
  surface: 'white', // default white surface
};

export function ScreenCard({
  variant = 'surface',
  header,
  footer,
  children,
  className = '',
  animate,
  delay,
}: ScreenCardProps) {
  return (
    <Card
      variant={variantToCardVariant[variant]}
      className={`gap-5 ${className}`}
      animate={animate}
      delay={delay}>
      {header && (
        <View style={{ gap: 8 }}>
          {header.label && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 2.5,
                  backgroundColor: header.accentDot ?? '#111111',
                }}
              />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '700',
                  letterSpacing: 2,
                  color: '#555555',
                  textTransform: 'uppercase',
                }}>
                {header.label}
              </Text>
            </View>
          )}

          {header.title && (
            <Text
              style={{
                fontSize: 32,
                fontWeight: '600',
                color: '#111111',
                letterSpacing: -1.6,
                lineHeight: 34,
              }}>
              {header.title}
            </Text>
          )}

          {header.subtitle && (
            <Text
              style={{
                fontSize: 14,
                color: '#666666',
                lineHeight: 22,
              }}>
              {header.subtitle}
            </Text>
          )}
        </View>
      )}

      <View style={{ gap: 20 }}>{children}</View>

      {footer && (
        <View
          style={{
            marginTop: 8,
            gap: 16,
          }}>
          {footer}
        </View>
      )}
    </Card>
  );
}

