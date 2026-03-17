import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

interface DotIndicatorProps {
  count: number;
  total?: number;
}

function Dot({ filled, index }: { filled: boolean; index: number }) {
  const scale = useRef(new Animated.Value(filled ? 1 : 0.8)).current;

  useEffect(() => {
    if (filled) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 4,
      }).start();
    } else {
      Animated.timing(scale, {
        toValue: 0.8,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [filled]);

  return (
    <Animated.View
      style={[
        styles.dot,
        filled ? styles.dotFilled : styles.dotEmpty,
        { transform: [{ scale }] },
      ]}
    />
  );
}

export function DotIndicator({ count, total = 6 }: DotIndicatorProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, i) => (
        <Dot key={i} filled={i < count} index={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  dotEmpty: {
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.6)',
    backgroundColor: 'transparent',
  },
  dotFilled: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
  },
});
