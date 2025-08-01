import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { QrCode } from 'lucide-react-native';
import { useDevice } from '../../hooks/useDevice';

export default function QRCodeScreen() {
  const { responsiveFontSize, responsiveSize } = useDevice();

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
        <QrCode size={responsiveSize(80)} color="#3b82f6" />
        <Text
          style={{
            fontSize: responsiveFontSize(24),
            fontWeight: '600',
            color: '#111827',
            marginTop: responsiveSize(24),
            textAlign: 'center',
          }}
        >
          QR Code Scanner
        </Text>
        <Text
          style={{
            fontSize: responsiveFontSize(16),
            color: '#6b7280',
            marginTop: responsiveSize(12),
            textAlign: 'center',
          }}
        >
          Scan QR codes to earn points
        </Text>
      </View>
    </SafeAreaView>
  );
}