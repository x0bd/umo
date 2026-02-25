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
  onSignedUp: () => void;
  onSignIn: () => void;
  onBack: () => void;
}

function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  autoCapitalize = 'none',
  keyboardType,
  onToggleSecure,
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words';
  keyboardType?: 'default' | 'email-address';
  onToggleSecure?: () => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={{ marginBottom: 14 }}>
      <Text
        style={{
          fontSize: 10,
          fontWeight: '700',
          letterSpacing: 2.8,
          color: '#999',
          textTransform: 'uppercase',
          marginBottom: 8,
        }}>
        {label}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderRadius: 16,
          borderWidth: 1.5,
          borderColor: focused ? '#FF0048' : '#EBEBEB',
          paddingHorizontal: 16,
          paddingVertical: 15,
        }}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#C8C8C8"
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType ?? 'default'}
          autoCorrect={false}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            fontSize: 15.5,
            color: '#0E0E0E',
            letterSpacing: -0.3,
            padding: 0,
          }}
        />
        {onToggleSecure && (
          <Pressable onPress={onToggleSecure} hitSlop={8}>
            {secureTextEntry ? (
              <EyeOff size={17} color="#C0C0C0" strokeWidth={1.75} />
            ) : (
              <Eye size={17} color="#999" strokeWidth={1.75} />
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

export function SignUpScreen({ onSignedUp, onSignIn, onBack }: Props) {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [submitPressed, setSubmitPressed] = useState(false);
  const canSubmit = name.trim().length > 0 && email.includes('@') && password.length >= 6;

  const pwScore = [
    password.length >= 6,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;
  const pwColors = ['#E53935', '#FB8C00', '#43A047', '#00C853'];
  const pwLabels = ['Weak', 'Fair', 'Good', 'Strong'];

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
            paddingTop: insets.top + 14,
            paddingHorizontal: 20,
            paddingBottom: 4,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Pressable
            onPress={onBack}
            hitSlop={12}
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              backgroundColor: '#EBEBEB',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ArrowLeft size={18} color="#0E0E0E" strokeWidth={2} />
          </Pressable>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 7,
            }}>
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 9,
                backgroundColor: '#FF0048',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#FF0048',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.3,
                shadowRadius: 6,
                elevation: 4,
              }}>
              <Rabbit size={14} color="#fff" strokeWidth={1.75} />
            </View>
          </View>
          <View style={{ width: 38 }} />
        </View>

        {/* HERO SECTION */}
        <MotiView
          from={{ opacity: 0, translateY: 16 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 240 }}
          style={{ paddingTop: 20, paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            {/* LEFT SPINE */}
            <View
              style={{
                width: 1,
                backgroundColor: '#DEDEDE',
                marginTop: 4,
                marginBottom: 4,
                marginRight: 20,
                borderRadius: 1,
              }}
            />

            <View style={{ flex: 1 }}>
              {/* EYEBROW */}
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 14 }}>
                <View
                  style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#FF0048' }}
                />
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '700',
                    letterSpacing: 3.5,
                    color: '#FF0048',
                    textTransform: 'uppercase',
                  }}>
                  Create Account
                </Text>
              </View>

              {/* HEADLINE */}
              <Text
                style={{
                  fontSize: 44,
                  fontWeight: '600',
                  color: '#0E0E0E',
                  letterSpacing: -2.6,
                  lineHeight: 46,
                  marginBottom: 10,
                }}>
                {'Create your\naccount.'}
              </Text>
              <Text
                style={{
                  fontSize: 14.5,
                  color: '#5A5A5A',
                  lineHeight: 22,
                  letterSpacing: 0.05,
                  marginBottom: 28,
                }}>
                Split bills. Track who paid. Settle fast.
              </Text>

              {/* SOCIAL AUTH */}
              <View style={{ flexDirection: 'row', gap: 10, marginBottom: 22 }}>
                <SocialBtn icon={<GoogleIcon size={19} />} label="Google" />
                <SocialBtn icon={<AppleIcon size={17} color="#fff" />} label="Apple" dark />
              </View>

              {/* DIVIDER */}
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 22 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: '#E0E0E0' }} />
                <Text
                  style={{
                    fontSize: 11.5,
                    fontWeight: '500',
                    color: '#BBBBBB',
                    letterSpacing: 0.5,
                  }}>
                  or continue with email
                </Text>
                <View style={{ flex: 1, height: 1, backgroundColor: '#E0E0E0' }} />
              </View>

              {/* FORM */}
              <FormField
                label="Full Name"
                value={name}
                onChangeText={setName}
                placeholder="Tendai Moyo"
                autoCapitalize="words"
              />
              <FormField
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="tendai@gmail.com"
                keyboardType="email-address"
              />
              <FormField
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="At least 6 characters"
                secureTextEntry={!showPw}
                onToggleSecure={() => setShowPw((v) => !v)}
              />

              {/* PASSWORD STRENGTH */}
              {password.length > 0 && (
                <View style={{ marginTop: -6, marginBottom: 14, paddingHorizontal: 2 }}>
                  <View style={{ flexDirection: 'row', gap: 4, marginBottom: 5 }}>
                    {[1, 2, 3, 4].map((i) => (
                      <MotiView
                        key={i}
                        animate={{
                          backgroundColor: i <= pwScore ? pwColors[pwScore - 1] : '#EEEEEE',
                        }}
                        transition={{ type: 'timing', duration: 200 }}
                        style={{ flex: 1, height: 3, borderRadius: 2 }}
                      />
                    ))}
                  </View>
                  <Text
                    style={{
                      fontSize: 11,
                      color: pwColors[pwScore - 1] ?? '#CCC',
                      fontWeight: '600',
                      letterSpacing: 0.2,
                    }}>
                    {pwLabels[pwScore - 1] ?? ''}
                  </Text>
                </View>
              )}

              {/* CTA */}
              <Pressable
                onPress={() => {
                  if (canSubmit) onSignedUp();
                }}
                onPressIn={() => setSubmitPressed(true)}
                onPressOut={() => setSubmitPressed(false)}
                style={{ marginTop: 6 }}>
                <MotiView
                  animate={{
                    scale: submitPressed ? 0.97 : 1,
                    backgroundColor: canSubmit ? '#FF0048' : '#E0E0E0',
                  }}
                  transition={{ type: 'timing', duration: 150 }}
                  style={{
                    borderRadius: 18,
                    paddingHorizontal: 24,
                    paddingVertical: 18,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    shadowColor: canSubmit ? '#FF0048' : 'transparent',
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.32,
                    shadowRadius: 18,
                    elevation: canSubmit ? 8 : 0,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '700',
                      color: canSubmit ? '#fff' : '#AAAAAA',
                      letterSpacing: -0.3,
                    }}>
                    Create account
                  </Text>
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: canSubmit ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.06)',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{ fontSize: 16, color: canSubmit ? '#fff' : '#CCCCCC' }}>
                      {String.fromCharCode(8594)}
                    </Text>
                  </View>
                </MotiView>
              </Pressable>

              {/* SIGN IN LINK */}
              <Pressable onPress={onSignIn} style={{ alignItems: 'center', paddingVertical: 20 }}>
                <Text style={{ fontSize: 13.5, color: '#888', letterSpacing: 0.1 }}>
                  {'Already have an account?  '}
                  <Text style={{ color: '#0E0E0E', fontWeight: '700', letterSpacing: -0.1 }}>
                    Sign in
                  </Text>
                </Text>
              </Pressable>
            </View>
          </View>
        </MotiView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
