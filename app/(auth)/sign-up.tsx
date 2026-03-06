import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { SignUpScreen } from '../../components/screens/SignUpScreen';

export default function SignUpRoute() {
  const router = useRouter();

  return (
    <>
      <StatusBar style="dark" />
      <SignUpScreen
        onSignedUp={() => router.replace('/(auth)/services')}
        onSignIn={() => router.replace('/(auth)/sign-in')}
        onBack={() => router.back()}
      />
    </>
  );
}
