import { YStack, styled, YStackProps } from 'tamagui'

export const Card = styled(YStack, {
  name: 'Card',
  backgroundColor: '$background',
  borderRadius: '$4',
  padding: '$4',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 3,
  
  variants: {
    variant: {
      default: {
        backgroundColor: '$background',
      },
      elevated: {
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
      },
      outlined: {
        borderWidth: 1,
        borderColor: '$borderColor',
        shadowOpacity: 0,
        elevation: 0,
      },
    },
    pressable: {
      true: {
        pressStyle: {
          scale: 0.98,
          opacity: 0.95,
        },
      },
    },
  } as const,
  
  defaultVariants: {
    variant: 'default',
  },
})

export const CardHeader = styled(YStack, {
  name: 'CardHeader',
  marginBottom: '$3',
})

export const CardContent = styled(YStack, {
  name: 'CardContent',
  gap: '$2',
})

export const CardFooter = styled(YStack, {
  name: 'CardFooter',
  marginTop: '$3',
  paddingTop: '$3',
  borderTopWidth: 1,
  borderTopColor: '$borderColor',
})

