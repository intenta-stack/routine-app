import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { NEU_BASE, NEU_SHADOW_DARK, NEU_SHADOW_LIGHT } from '../constants/colors';

interface NeuViewProps {
  pressed?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  circular?: boolean;
}

export function NeuView({ pressed = false, style, children, circular = false }: NeuViewProps) {
  const shape = circular ? { borderRadius: 999 } : {};

  return (
    <View
      style={[
        styles.container,
        shape,
        pressed ? styles.pressed : styles.raised,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: NEU_BASE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  raised: {
    shadowColor: NEU_SHADOW_DARK,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: NEU_SHADOW_LIGHT,
  },
  pressed: {
    shadowColor: NEU_SHADOW_DARK,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: NEU_SHADOW_DARK,
    backgroundColor: '#202030',
  },
});
