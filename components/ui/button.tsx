import * as Haptics from 'expo-haptics'
import { ButtonProps, styled, Button as TamaguiButton } from 'tamagui'

// ============================================
// 間 — BUTTON
// Pill-shaped. Restrained variants.
// ============================================
const StyledButton = styled(TamaguiButton, {
  name: 'Button',
  backgroundColor: '$accent',
  color: 'white',
  borderRadius: 9999,
  fontWeight: '600',
  fontSize: 16,
  borderWidth: 0,

  pressStyle: {
    opacity: 0.88,
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: '$accent',
        color: 'white',
      },
      secondary: {
        backgroundColor: '$backgroundHover',
        color: '$color',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$accent',
      },
      destructive: {
        backgroundColor: '$errorSoft',
        color: '$error',
      },
    },
    size: {
      sm: {
        height: 36,
        paddingHorizontal: 16,
        fontSize: 14,
      },
      md: {
        height: 48,
        paddingHorizontal: 24,
        fontSize: 16,
      },
      lg: {
        height: 56,
        paddingHorizontal: 32,
        fontSize: 17,
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

export interface UmoButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  haptic?: boolean
}

export function Button({
  onPress,
  haptic = true,
  disabled,
  ...props
}: UmoButtonProps) {
  const handlePress = (e: any) => {
    if (disabled) return

    if (haptic) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    }

    onPress?.(e)
  }

  return (
    <StyledButton
      onPress={handlePress}
      disabled={disabled}
      opacity={disabled ? 0.4 : 1}
      {...props}
    />
  )
}
