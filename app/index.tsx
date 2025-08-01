import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  useEffect(() => {
    // Check if user is authenticated (you can add your auth logic here)
    const isAuthenticated = false; // Replace with actual auth check
    
    if (isAuthenticated) {
      router.replace('/(tabs)/home');
    } else {
      router.replace('/(auth)/login');
    }
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#3b82f6" />
    </View>
  );
}