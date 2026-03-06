import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { OnboardingScreen } from '../../App';

export default function WelcomeRoute() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/(auth)/sign-up');
  };

  const handleSignIn = () => {
    router.push('/(auth)/sign-in');
  };

  return (
    <>
      <StatusBar style="dark" />
      <OnboardingScreen onGetStarted={handleGetStarted} onSignIn={handleSignIn} />
    </>
  );
}
