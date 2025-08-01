import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { User, LogOut } from 'lucide-react-native';
import { router } from 'expo-router';
import { useDevice } from '../../hooks/useDevice';

export default function ProfileScreen() {
  const { responsiveFontSize, responsiveSize } = useDevice();

  const handleLogout = () => {
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: responsiveSize(24),
        }}
      >
        <User size={responsiveSize(80)} color="#3b82f6" />
        <Text
          style={{
            fontSize: responsiveFontSize(24),
            fontWeight: '600',
            color: '#111827',
            marginTop: responsiveSize(24),
            textAlign: 'center',
          }}
        >
          Profile
        </Text>
        <Text
          style={{
            fontSize: responsiveFontSize(16),
            color: '#6b7280',
            marginTop: responsiveSize(12),
            textAlign: 'center',
            marginBottom: responsiveSize(32),
          }}
        >
          Manage your account settings
        </Text>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#ef4444',
            paddingHorizontal: responsiveSize(24),
            paddingVertical: responsiveSize(12),
            borderRadius: responsiveSize(8),
          }}
          onPress={handleLogout}
        >
          <LogOut size={responsiveSize(20)} color="white" />
          <Text
            style={{
              color: 'white',
              fontSize: responsiveFontSize(16),
              fontWeight: '500',
              marginLeft: responsiveSize(8),
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}