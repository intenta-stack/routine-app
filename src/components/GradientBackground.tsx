import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

interface GradientBackgroundProps {
  colors: readonly [string, string, ...string[]];
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export function GradientBackground({ colors, style, children }: GradientBackgroundProps) {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0.3, y: 0 }}
      end={{ x: 0.7, y: 1 }}
      style={[StyleSheet.absoluteFill, style]}
    >
      {children}
    </LinearGradient>
  );
}
