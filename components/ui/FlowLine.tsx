import { View } from 'react-native';

interface FlowLineProps {
  /** dashed uses border style simulation; solid uses background */
  style?: 'dashed' | 'solid';
  color?: string;
  /** Custom height — defaults to flex-grow (fill) */
  height?: number;
}

export function FlowLine({ style = 'dashed', color = 'rgba(0,0,0,0.2)', height }: FlowLineProps) {
  if (style === 'dashed') {
    // React Native doesn't support border-style dashed natively on all sides,
    // but borderLeftStyle is supported on Android/iOS via the left border trick.
    return (
      <View
        style={{
          width: 1,
          height: height ?? undefined,
          flex: height ? undefined : 1,
          borderLeftWidth: 1,
          borderLeftColor: color,
          borderStyle: 'dashed',
          marginLeft: 3,
        }}
      />
    );
  }

  return (
    <View
      style={{
        width: 1,
        height: height ?? undefined,
        flex: height ? undefined : 1,
        backgroundColor: color,
        opacity: 0.3,
        marginLeft: 3,
      }}
    />
  );
}
