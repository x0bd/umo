import { Button as TamaguiButton, ButtonProps, styled } from 'tamagui'
import * as Haptics from 'expo-haptics'

// Styled button with variants
const StyledButton = styled(TamaguiButton, {
  name: 'Button',
  backgroundColor: '$primary',
  color: 'white',
  borderRadius: '$4',
  fontWeight: '600',
  fontSize: 16,
  pressStyle: {
    opacity: 0.9,
    scale: 0.98,
  },
  hoverStyle: {
    backgroundColor: '$primaryHover',
  },
  
  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary',
        color: 'white',
      },
      secondary: {
        backgroundColor: '$surface',
        color: '$textPrimary',
        borderWidth: 1,
        borderColor: '$borderColor',
      },
      outline: {
        backgroundColor: 'transparent',
        color: '$primary',
        borderWidth: 2,
        borderColor: '$primary',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$primary',
      },
      success: {
        backgroundColor: '$success',
        color: 'white',
      },
      error: {
        backgroundColor: '$error',
        color: 'white',
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
        fontSize: 18,
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
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'error'
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
      opacity={disabled ? 0.5 : 1}
      {...props}
    />
  )
}

