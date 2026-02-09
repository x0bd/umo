import { useState } from 'react'
import { ScrollView, YStack, XStack, Text, H1, H2, Separator } from 'tamagui'
import { DollarSign } from '@tamagui/lucide-icons'
import { Button, Card, CardHeader, CardContent, Input } from '@/components/ui'

export default function HomeScreen() {
  const [amount, setAmount] = useState('')
  const [rate, setRate] = useState('13.50')

  const usdAmount = parseFloat(amount) || 0
  const zigAmount = (usdAmount * parseFloat(rate)).toFixed(2)

  return (
    <ScrollView backgroundColor="$background">
      <YStack padding="$6" gap="$6" paddingTop="$12">
        {/* Header */}
        <YStack gap="$2">
          <H1 color="$textPrimary" fontSize={32} fontWeight="700">
            Welcome to Umo 💰
          </H1>
          <Text color="$textSecondary" fontSize={16}>
            Split bills with friends. No more change drama.
          </Text>
        </YStack>

        {/* Currency Converter Demo */}
        <Card variant="elevated">
          <CardHeader>
            <H2 fontSize={20} fontWeight="600" color="$textPrimary">
              Quick Convert
            </H2>
            <Text fontSize={14} color="$textSecondary">
              USD to ZiG conversion
            </Text>
          </CardHeader>
          
          <CardContent gap="$4">
            <Input
              label="Amount (USD)"
              placeholder="0.00"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              leftElement={<DollarSign size={20} color="$textTertiary" />}
            />
            
            <Input
              label="Exchange Rate"
              placeholder="13.50"
              value={rate}
              onChangeText={setRate}
              keyboardType="decimal-pad"
            />
            
            <Separator />
            
            <XStack 
              justifyContent="space-between" 
              alignItems="center"
              paddingVertical="$3"
              backgroundColor="$surface"
              paddingHorizontal="$4"
              borderRadius="$3"
            >
              <Text fontSize={16} color="$textSecondary">
                ZiG Amount
              </Text>
              <Text fontSize={24} fontWeight="700" color="$primary">
                {zigAmount}
              </Text>
            </XStack>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card>
          <CardContent gap="$3">
            <Button 
              fullWidth
              size="lg"
              onPress={() => alert('Split Bill!')}
            >
              Split a Bill
            </Button>
            
            <Button 
              fullWidth
              variant="outline"
              size="lg"
              onPress={() => alert('View Groups')}
            >
              My Groups
            </Button>
            
            <XStack gap="$3">
              <Button 
                flex={1}
                variant="secondary"
                onPress={() => alert('Settle Up')}
              >
                Settle Up
              </Button>
              <Button 
                flex={1}
                variant="ghost"
                onPress={() => alert('History')}
              >
                History
              </Button>
            </XStack>
          </CardContent>
        </Card>

        {/* Feature Cards */}
        <YStack gap="$3">
          <Card pressable variant="outlined">
            <XStack padding="$4" gap="$3" alignItems="center">
              <YStack 
                width={48} 
                height={48} 
                backgroundColor="$primary" 
                borderRadius="$3"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize={24}>💸</Text>
              </YStack>
              <YStack flex={1}>
                <Text fontSize={16} fontWeight="600" color="$textPrimary">
                  Multi-Currency
                </Text>
                <Text fontSize={14} color="$textSecondary">
                  Track USD & ZiG seamlessly
                </Text>
              </YStack>
            </XStack>
          </Card>

          <Card pressable variant="outlined">
            <XStack padding="$4" gap="$3" alignItems="center">
              <YStack 
                width={48} 
                height={48} 
                backgroundColor="$success" 
                borderRadius="$3"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize={24}>📱</Text>
              </YStack>
              <YStack flex={1}>
                <Text fontSize={16} fontWeight="600" color="$textPrimary">
                  Paynow Integration
                </Text>
                <Text fontSize={14} color="$textSecondary">
                  Instant EcoCash settlements
                </Text>
              </YStack>
            </XStack>
          </Card>

          <Card pressable variant="outlined">
            <XStack padding="$4" gap="$3" alignItems="center">
              <YStack 
                width={48} 
                height={48} 
                backgroundColor="$warning" 
                borderRadius="$3"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize={24}>📊</Text>
              </YStack>
              <YStack flex={1}>
                <Text fontSize={16} fontWeight="600" color="$textPrimary">
                  Running Tabs
                </Text>
                <Text fontSize={14} color="$textSecondary">
                  Handle small change amounts
                </Text>
              </YStack>
            </XStack>
          </Card>
        </YStack>
      </YStack>
    </ScrollView>
  )
}
