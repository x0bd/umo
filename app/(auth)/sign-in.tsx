import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { SignInScreen } from '../../components/screens/SignInScreen';

export default function SignInRoute() {
  const router = useRouter();

  return (
    <>
      <StatusBar style="dark" />
      <SignInScreen
        onSignedIn={() => router.replace('/(tabs)')}
        onSignUp={() => router.replace('/(auth)/sign-up')}
        onBack={() => router.back()}
      />
    </>
  );
}
