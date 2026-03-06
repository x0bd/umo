import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ServicesScreen } from '../../components/screens/ServicesScreen';

export default function ServicesRoute() {
  const router = useRouter();

  return (
    <>
      <StatusBar style="dark" />
      <ServicesScreen
        onDone={() => {
          // In a real app we'd save the services to the user's profile here
          router.replace('/(tabs)');
        }}
      />
    </>
  );
}
