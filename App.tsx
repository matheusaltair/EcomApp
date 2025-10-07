import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import { restoreAuth } from './src/store/authPersist';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restore = async () => {
      await restoreAuth();
      setLoading(false);
    };
    restore();
  }, []);

  if (loading) return null;

  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
};

export default App;