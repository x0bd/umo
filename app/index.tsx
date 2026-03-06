import { Redirect } from 'expo-router';

export default function Index() {
  // Currently, we just redirect to the onboarding welcome flow.
  // Once auth state (e.g. Zustand + SecureStore) is implemented, 
  // this will conditionally redirect to /(tabs) if logged in.
  return <Redirect href="/(auth)/welcome" />;
}
