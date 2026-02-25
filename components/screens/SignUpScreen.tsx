import { ArrowLeft, Eye, EyeOff } from 'lucide-react-native';
import { Rabbit } from 'lucide-react-native';
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
  onToggleSecure,
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words';
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
          keyboardType={label === 'EMAIL' ? 'email-address' : 'default'}
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
          backgroundColor: dark ? '#080808' : '#fff',
          borderWidth: 1.5,
          borderColor: dark ? '#080808' : '#E8E8E8',
        }}>
        {icon}
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: dark ? '#fff' : '#111',
            letterSpacing: -0.2,
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
            <Text
              style={{ fontSize: 16, fontWeight: '700', color: '#0E0E0E', letterSpacing: -0.8 }}>
              umo
            </Text>
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
                  fontSize: 46,
                  fontWeight: '700',
                  color: '#0E0E0E',
                  letterSpacing: -2.8,
                  lineHeight: 48,
                  marginBottom: 10,
                }}>
                {'Create your\naccount.'}
              </Text>
              <Text
                style={{
                  fontSize: 14.5,
                  color: '#666',
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

              {/* GROUPED FORM CARD */}
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: '#EBEBEB',
                  overflow: 'hidden',
                  marginBottom: 6,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.04,
                  shadowRadius: 8,
                  elevation: 1,
                }}>
                {/* NAME ROW */}
                <View
                  style={{
                    paddingHorizontal: 16,
                    paddingTop: 14,
                    paddingBottom: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: '#F0F0F0',
                  }}>
                  <Text
                    style={{
                      fontSize: 9.5,
                      fontWeight: '700',
                      letterSpacing: 2.4,
                      color: '#C0C0C0',
                      textTransform: 'uppercase',
                      marginBottom: 5,
                    }}>
                    Full Name
                  </Text>
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Tendai Moyo"
                    placeholderTextColor="#D0D0D0"
                    autoCapitalize="words"
                    autoCorrect={false}
                    style={{
                      fontSize: 16,
                      color: '#0E0E0E',
                      letterSpacing: -0.4,
                      padding: 0,
                      fontWeight: '500',
                    }}
                  />
                </View>
                {/* EMAIL ROW */}
                <View
                  style={{
                    paddingHorizontal: 16,
                    paddingTop: 14,
                    paddingBottom: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: '#F0F0F0',
                  }}>
                  <Text
                    style={{
                      fontSize: 9.5,
                      fontWeight: '700',
                      letterSpacing: 2.4,
                      color: '#C0C0C0',
                      textTransform: 'uppercase',
                      marginBottom: 5,
                    }}>
                    Email
                  </Text>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="tendai@gmail.com"
                    placeholderTextColor="#D0D0D0"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{
                      fontSize: 16,
                      color: '#0E0E0E',
                      letterSpacing: -0.4,
                      padding: 0,
                      fontWeight: '500',
                    }}
                  />
                </View>
                {/* PASSWORD ROW */}
                <View style={{ paddingHorizontal: 16, paddingTop: 14, paddingBottom: 14 }}>
                  <Text
                    style={{
                      fontSize: 9.5,
                      fontWeight: '700',
                      letterSpacing: 2.4,
                      color: '#C0C0C0',
                      textTransform: 'uppercase',
                      marginBottom: 5,
                    }}>
                    Password
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <TextInput
                      value={password}
                      onChangeText={setPassword}
                      placeholder="At least 6 characters"
                      placeholderTextColor="#D0D0D0"
                      secureTextEntry={!showPw}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{
                        flex: 1,
                        fontSize: 16,
                        color: '#0E0E0E',
                        letterSpacing: -0.4,
                        padding: 0,
                        fontWeight: '500',
                      }}
                    />
                    <Pressable onPress={() => setShowPw((v) => !v)} hitSlop={10}>
                      {showPw ? (
                        <Eye size={16} color="#C0C0C0" strokeWidth={1.75} />
                      ) : (
                        <EyeOff size={16} color="#C0C0C0" strokeWidth={1.75} />
                      )}
                    </Pressable>
                  </View>
                  {password.length > 0 && (
                    <View style={{ marginTop: 10 }}>
                      <View style={{ flexDirection: 'row', gap: 4, marginBottom: 5 }}>
                        {[1, 2, 3, 4].map((i) => {
                          const score = [
                            password.length >= 6,
                            /[A-Z]/.test(password),
                            /[0-9]/.test(password),
                            /[^A-Za-z0-9]/.test(password),
                          ].filter(Boolean).length;
                          const c =
                            ['#E53935', '#FB8C00', '#43A047', '#00C853'][score - 1] ?? '#E8E8E8';
                          return (
                            <MotiView
                              key={i}
                              animate={{ backgroundColor: i <= score ? c : '#EEEEEE' }}
                              transition={{ type: 'timing', duration: 200 }}
                              style={{ flex: 1, height: 3, borderRadius: 2 }}
                            />
                          );
                        })}
                      </View>
                      <Text
                        style={{
                          fontSize: 11,
                          color: (() => {
                            const s = [
                              password.length >= 6,
                              /[A-Z]/.test(password),
                              /[0-9]/.test(password),
                              /[^A-Za-z0-9]/.test(password),
                            ].filter(Boolean).length;
                            return ['#E53935', '#FB8C00', '#43A047', '#00C853'][s - 1] ?? '#CCC';
                          })(),
                          fontWeight: '600',
                          letterSpacing: 0.2,
                        }}>
                        {['Weak', 'Fair', 'Good', 'Strong'][
                          [
                            password.length >= 6,
                            /[A-Z]/.test(password),
                            /[0-9]/.test(password),
                            /[^A-Za-z0-9]/.test(password),
                          ].filter(Boolean).length - 1
                        ] ?? ''}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              <Text
                style={{
                  fontSize: 11.5,
                  color: '#C0C0C0',
                  letterSpacing: 0.1,
                  lineHeight: 17,
                  paddingLeft: 4,
                  marginBottom: 20,
                }}>
                By continuing you agree to our Terms of Service.
              </Text>

              {/* CTA */}
              <Pressable
                onPress={() => {
                  if (name && email && password.length >= 6) onSignedUp();
                }}
                onPressIn={() => setSubmitPressed(true)}
                onPressOut={() => setSubmitPressed(false)}>
                <MotiView
                  animate={{
                    scale: submitPressed ? 0.97 : 1,
                    backgroundColor: name && email && password.length >= 6 ? '#FF0048' : '#E0E0E0',
                  }}
                  transition={{ type: 'timing', duration: 150 }}
                  style={{
                    backgroundColor: '#FF0048',
                    borderRadius: 18,
                    paddingHorizontal: 24,
                    paddingVertical: 18,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    shadowColor: '#FF0048',
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.32,
                    shadowRadius: 18,
                    elevation: 8,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '700',
                      color: name && email && password.length >= 6 ? '#fff' : '#AAAAAA',
                      letterSpacing: -0.3,
                    }}>
                    Create account
                  </Text>
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: 'rgba(255,255,255,0.22)',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{ fontSize: 16, color: '#fff' }}>→</Text>
                  </View>
                </MotiView>
              </Pressable>

              {/* SIGN IN LINK */}
              <Pressable onPress={onSignIn} style={{ alignItems: 'center', paddingVertical: 20 }}>
                <Text style={{ fontSize: 13.5, color: '#888', letterSpacing: 0.1 }}>
                  Already have an account?{'  '}
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
