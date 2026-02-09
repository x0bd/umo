import { Input as TamaguiInput, styled, YStack, Text, XStack, InputProps } from 'tamagui'
import { forwardRef } from 'react'

const StyledInput = styled(TamaguiInput, {
  name: 'Input',
  backgroundColor: '$background',
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$3',
  paddingHorizontal: '$4',
  fontSize: 16,
  color: '$textPrimary',
  height: 48,
  
  focusStyle: {
    borderColor: '$primary',
    borderWidth: 2,
  },
  
  variants: {
    size: {
      sm: {
        height: 36,
        fontSize: 14,
        paddingHorizontal: '$3',
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
          fontSize={14}
          fontWeight="600"
          color="$textSecondary"
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
        <Text
          fontSize={12}
          color="$error"
        >
          {error}
        </Text>
      )}
      
      {hint && !error && (
        <Text
          fontSize={12}
          color="$textTertiary"
        >
          {hint}
        </Text>
      )}
    </YStack>
  )
})

Input.displayName = 'Input'

