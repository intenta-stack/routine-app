import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LOCK_BUTTON_BG, LOCK_BUTTON_BORDER, TEXT_WHITE } from '../../constants/colors';
import { useFeedback } from '../../hooks/useFeedback';

interface NumberPadButtonProps {
  label: string;
  sublabel?: string;
  onPress: () => void;
  variant?: 'neumorphic' | 'glass' | 'text';
  disabled?: boolean;
}

export function NumberPadButton({
  label,
  sublabel,
  onPress,
  variant = 'neumorphic',
  disabled = false,
}: NumberPadButtonProps) {
  const [pressed, setPressed] = useState(false);
  const { triggerFeedback } = useFeedback();

  const handlePress = () => {
    triggerFeedback();
    onPress();
  };

  if (variant === 'text') {
    return (
      <Pressable
        style={styles.textButton}
        onPress={handlePress}
        disabled={disabled}
      >
        <Text style={[styles.textLabel, disabled && styles.disabled]}>{label}</Text>
      </Pressable>
    );
  }

  if (variant === 'glass') {
    return (
      <Pressable
        onPress={handlePress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        disabled={disabled}
      >
        <View style={[styles.glassButton, pressed && styles.glassPressed]}>
          <Text style={styles.glassLabel}>{label}</Text>
          {sublabel ? <Text style={styles.glassSublabel}>{sublabel}</Text> : null}
        </View>
      </Pressable>
    );
  }

  // neumorphic (default)
  return (
    <Pressable
      onPress={handlePress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={disabled}
    >
      <View style={[styles.neuButton, pressed && styles.neuPressed]}>
        <Text style={styles.neuLabel}>{label}</Text>
        {sublabel ? <Text style={styles.neuSublabel}>{sublabel}</Text> : null}
      </View>
    </Pressable>
  );
}

const BUTTON_SIZE = 72;

const styles = StyleSheet.create({
  // Glass style (for lock screen on gradient)
  glassButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: LOCK_BUTTON_BG,
    borderWidth: 1,
    borderColor: LOCK_BUTTON_BORDER,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glassPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  glassLabel: {
    color: TEXT_WHITE,
    fontSize: 28,
    fontWeight: '300',
  },
  glassSublabel: {
    color: TEXT_WHITE,
    fontSize: 10,
    letterSpacing: 2,
    marginTop: -2,
  },

  // Neumorphic style (for dialer screen)
  neuButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: '#252535',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#141420',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#36364a',
  },
  neuPressed: {
    backgroundColor: '#202030',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 2,
    borderColor: '#141420',
  },
  neuLabel: {
    color: TEXT_WHITE,
    fontSize: 28,
    fontWeight: '300',
  },
  neuSublabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    letterSpacing: 2,
    marginTop: -2,
  },

  // Text style
  textButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLabel: {
    color: TEXT_WHITE,
    fontSize: 16,
    fontWeight: '400',
  },
  disabled: {
    opacity: 0,
  },
});
