import { forwardRef } from 'react'
import { InputProps, styled, Input as TamaguiInput, Text, XStack, YStack } from 'tamagui'

// ============================================
// 間 — INPUT
// Borderless at rest. Border appears on focus.
// ============================================
const StyledInput = styled(TamaguiInput, {
  name: 'Input',
  backgroundColor: '$inputBg',
  borderWidth: 0,
  borderColor: 'transparent',
  borderRadius: 14,
  paddingHorizontal: '$4',
  fontSize: 16,
  color: '$color',
  height: 48,

  focusStyle: {
    borderWidth: 1,
    borderColor: '$accent',
  },

  variants: {
    size: {
      sm: {
        height: 36,
        fontSize: 14,
        paddingHorizontal: '$3',
        borderRadius: 10,
      },
      md: {
        height: 48,
        fontSize: 16,
        paddingHorizontal: '$4',
      },
      lg: {
        height: 56,
        fontSize: 18,
        paddingHorizontal: '$4',
      },
    },
    error: {
      true: {
        borderWidth: 1,
        borderColor: '$error',
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

export interface UmoInputProps extends InputProps {
  label?: string
  error?: string
  hint?: string
  leftElement?: React.ReactNode
  rightElement?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export const Input = forwardRef<any, UmoInputProps>(({
  label,
  error,
  hint,
  leftElement,
  rightElement,
  ...props
}, ref) => {
  return (
    <YStack gap="$2">
      {label && (
        <Text
          fontSize={13}
          fontWeight="500"
          color="$colorMuted"
          letterSpacing={0.2}
        >
          {label}
        </Text>
      )}

      <XStack
        position="relative"
        alignItems="center"
      >
        {leftElement && (
          <XStack
            position="absolute"
            left="$3"
            zIndex={1}
            pointerEvents="none"
          >
            {leftElement}
          </XStack>
        )}

        <StyledInput
          ref={ref}
          error={!!error}
          paddingLeft={leftElement ? '$10' : undefined}
          paddingRight={rightElement ? '$10' : undefined}
          placeholderTextColor="$colorFaint"
          {...props}
        />

        {rightElement && (
          <XStack
            position="absolute"
            right="$3"
            zIndex={1}
          >
            {rightElement}
          </XStack>
        )}
      </XStack>

      {error && (
        <Text fontSize={12} color="$error">
          {error}
        </Text>
      )}

      {hint && !error && (
        <Text fontSize={12} color="$colorFaint">
          {hint}
        </Text>
      )}
    </YStack>
  )
})

Input.displayName = 'Input'
