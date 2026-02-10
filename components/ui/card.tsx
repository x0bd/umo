import { YStack, styled } from 'tamagui'

// ============================================
// 間 — CARD
// Depth through shadow alone. No borders.
// ============================================
export const Card = styled(YStack, {
  name: 'Card',
  backgroundColor: '$cardBg',
  borderRadius: 20,
  padding: '$4',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 12,
  elevation: 3,

  variants: {
    variant: {
      default: {},
      elevated: {
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 6,
      },
      flat: {
        shadowOpacity: 0,
        elevation: 0,
        backgroundColor: '$backgroundSoft',
      },
    },
    pressable: {
      true: {
        pressStyle: {
          opacity: 0.92,
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
  borderTopColor: '$borderColorSoft',
})
