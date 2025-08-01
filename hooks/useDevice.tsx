import React, { createContext, useContext, useEffect, useState } from 'react';
import { Dimensions, Platform, PixelRatio } from 'react-native';

interface DeviceInfo {
  width: number;
  height: number;
  isTablet: boolean;
  isLandscape: boolean;
  scale: number;
  fontScale: number;
  platform: 'ios' | 'android' | 'web';
  isSmallScreen: boolean;
  isLargeScreen: boolean;
  responsiveSize: (size: number) => number;
  responsiveFontSize: (size: number) => number;
}

const DeviceContext = createContext<DeviceInfo | undefined>(undefined);

export function DeviceProvider({ children }: { children: React.ReactNode }) {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const { width, height, scale, fontScale } = dimensions;
  const isLandscape = width > height;
  const isTablet = Math.min(width, height) >= 600;
  const isSmallScreen = Math.min(width, height) < 375;
  const isLargeScreen = Math.min(width, height) >= 768;

  const responsiveSize = (size: number) => {
    const baseWidth = 375; // iPhone X width as base
    const scaleFactor = width / baseWidth;
    return Math.round(PixelRatio.roundToNearestPixel(size * scaleFactor));
  };

  const responsiveFontSize = (size: number) => {
    const baseWidth = 375;
    const scaleFactor = Math.min(width / baseWidth, 1.3); // Cap scaling for very large screens
    return Math.round(PixelRatio.roundToNearestPixel(size * scaleFactor * fontScale));
  };

  const deviceInfo: DeviceInfo = {
    width,
    height,
    isTablet,
    isLandscape,
    scale,
    fontScale,
    platform: Platform.OS as 'ios' | 'android' | 'web',
    isSmallScreen,
    isLargeScreen,
    responsiveSize,
    responsiveFontSize,
  };

  return (
    <DeviceContext.Provider value={deviceInfo}>
      {children}
    </DeviceContext.Provider>
  );
}

export function useDevice() {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }
  return context;
}