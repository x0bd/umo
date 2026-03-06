import { ArrowLeft, Eye, EyeOff, Rabbit } from 'lucide-react-native';
import { MotiView } from 'moti';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppleIcon } from '../icons/AppleIcon';
import { GoogleIcon } from '../icons/GoogleIcon';

interface Props {
  onSignedIn: () => void;
  onSignUp: () => void;
  onBack: () => void;
}

function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  onToggleSecure,
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  onToggleSecure?: () => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={{ marginBottom: 16 }}>
      <Text
        style={{
          fontSize: 10,
          fontWeight: '700',
          letterSpacing: 2,
          color: '#888888',
          textTransform: 'uppercase',
          marginBottom: 8,
          marginLeft: 4,
        }}>
        {label}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: focused ? '#FFFFFF' : '#F8F8F8',
          borderRadius: 16,
          borderWidth: 1,
          borderColor: focused ? '#111111' : 'transparent',
          paddingHorizontal: 16,
          paddingVertical: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: focused ? 0.05 : 0,
          shadowRadius: 8,
          elevation: focused ? 2 : 0,
        }}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#B0B0B0"
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          keyboardType={label.toUpperCase() === 'EMAIL' ? 'email-address' : 'default'}
          autoCorrect={false}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            fontSize: 15,
            color: '#111111',
            letterSpacing: -0.2,
            padding: 0,
          }}
        />
        {onToggleSecure && (
          <Pressable onPress={onToggleSecure} hitSlop={12}>
            {secureTextEntry ? (
              <EyeOff size={18} color="#CCCCCC" strokeWidth={1.5} />
            ) : (
              <Eye size={18} color="#888888" strokeWidth={1.5} />
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
}

function SocialBtn({
  icon,
  label,
  dark,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  dark?: boolean;
  onPress?: () => void;
}) {
  const [p, setP] = useState(false);
  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setP(true)}
      onPressOut={() => setP(false)}
      style={{ flex: 1 }}>
      <MotiView
        animate={{ scale: p ? 0.97 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 9,
          paddingVertical: 15,
          borderRadius: 16,
          backgroundColor: dark ? '#0A0A0A' : '#fff',
          borderWidth: 1.5,
          borderColor: dark ? '#0A0A0A' : '#E8E8E8',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: dark ? 0.18 : 0.04,
          shadowRadius: 6,
          elevation: dark ? 4 : 1,
        }}>
        {icon}
        <Text
          style={{
            fontSize: 14.5,
            fontWeight: '600',
            color: dark ? '#fff' : '#111',
            letterSpacing: -0.3,
          }}>
          {label}
        </Text>
      </MotiView>
    </Pressable>
  );
}

export function SignInScreen({ onSignedIn, onSignUp, onBack }: Props) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [submitPressed, setSubmitPressed] = useState(false);
  const canSubmit = email.includes('@') && password.length >= 6;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#F4F4F4' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* TOP CHROME */}
        <View
          style={{
            paddingTop: insets.top + 20,
            paddingHorizontal: 24,
            paddingBottom: 24,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Pressable
            onPress={onBack}
            hitSlop={12}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: '#FFFFFF',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.05,
              shadowRadius: 10,
              elevation: 2,
            }}>
            <ArrowLeft size={20} color="#111111" strokeWidth={2} />
          </Pressable>
          <View
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              backgroundColor: '#111111',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 4,
            }}>
             <Rabbit size={20} color="#fff" strokeWidth={2.5} />
          </View>
        </View>

        {/* HERO SECTION */}
        <MotiView
          from={{ opacity: 0, translateY: 16 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 240 }}
          style={{ paddingTop: 12, paddingHorizontal: 28 }}>
          <View style={{ flex: 1 }}>
            {/* EYEBROW */}
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <View
                style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#111111' }}
              />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '700',
                  letterSpacing: 2,
                  color: '#555555',
                  textTransform: 'uppercase',
                }}>
                Sign In
              </Text>
            </View>

            {/* HEADLINE */}
            <Text
              style={{
                fontSize: 42,
                fontWeight: '600',
                color: '#111111',
                letterSpacing: -2,
                lineHeight: 46,
                marginBottom: 12,
              }}>
              {'Welcome\nback.'}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: '#666666',
                lineHeight: 24,
                marginBottom: 36,
              }}>
              Good to see you again. Pick up right where you left off.
            </Text>

            {/* SOCIAL AUTH */}
            <View style={{ flexDirection: 'row', gap: 12, marginBottom: 32 }}>
              <SocialBtn icon={<GoogleIcon size={19} />} label="Google" />
              <SocialBtn icon={<AppleIcon size={17} color="#fff" />} label="Apple" dark />
            </View>

            {/* DIVIDER */}
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 32 }}>
              <View style={{ flex: 1, height: 1, backgroundColor: '#E8E8E8' }} />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '500',
                  color: '#999999',
                  letterSpacing: 0.5,
                  textTransform: 'uppercase',
                }}>
                or continue with email
              </Text>
              <View style={{ flex: 1, height: 1, backgroundColor: '#E8E8E8' }} />
            </View>

            {/* FORM */}
            <FormField
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="tendai@gmail.com"
            />
            <FormField
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Your password"
              secureTextEntry={!showPw}
              onToggleSecure={() => setShowPw((v) => !v)}
            />

            {/* FORGOT PASSWORD */}
            <Pressable style={{ alignSelf: 'flex-end', marginTop: 0, marginBottom: 28 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: '#111111',
                  letterSpacing: 0,
                }}>
                Forgot password?
              </Text>
            </Pressable>

            {/* CTA */}
            <Pressable
              onPress={() => {
                if (canSubmit) onSignedIn();
              }}
              onPressIn={() => setSubmitPressed(true)}
              onPressOut={() => setSubmitPressed(false)}>
              <MotiView
                animate={{
                  scale: submitPressed ? 0.97 : 1,
                  backgroundColor: canSubmit ? '#FF0048' : '#E0E0E0',
                  shadowOpacity: canSubmit ? 0.35 : 0,
                }}
                transition={{ type: 'timing', duration: 150 }}
                style={{
                  borderRadius: 20,
                  paddingHorizontal: 28,
                  paddingVertical: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  shadowColor: '#FF0048',
                  shadowOffset: { width: 0, height: 12 },
                  shadowRadius: 20,
                  elevation: canSubmit ? 8 : 0,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: canSubmit ? '#ffffff' : '#999999',
                    letterSpacing: -0.2,
                  }}>
                  Sign in
                </Text>
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: canSubmit ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.04)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{ fontSize: 18, color: canSubmit ? '#fff' : '#CCCCCC' }}>→</Text>
                </View>
              </MotiView>
            </Pressable>

            {/* SIGN UP LINK */}
            <Pressable onPress={onSignUp} style={{ alignItems: 'center', paddingVertical: 32 }}>
              <Text style={{ fontSize: 14, color: '#888888', letterSpacing: 0.1 }}>
                {"Don't have an account?"}
                {'  '}
                <Text style={{ color: '#111111', fontWeight: '700', letterSpacing: -0.1 }}>
                  Sign up
                </Text>
              </Text>
            </Pressable>
          </View>
        </MotiView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
