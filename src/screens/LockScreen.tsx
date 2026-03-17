import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { GradientBackground } from '../components/GradientBackground';
import { DotIndicator } from '../components/DotIndicator';
import { NumberPad } from '../components/NumberPad/NumberPad';
import { LOCK_GRADIENT, TEXT_WHITE } from '../constants/colors';
import { usePasscode } from '../hooks/usePasscode';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Lock'>;

export function LockScreen({ navigation }: Props) {
  const { count, isFull, addDigit, removeDigit, clear } = usePasscode();
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isFull) {
      // Unlock animation: brief scale then navigate
      Animated.sequence([
        Animated.delay(200),
      ]).start(() => {
        clear();
        navigation.replace('Dialer');
      });
    }
  }, [isFull]);

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <GradientBackground colors={LOCK_GRADIENT} />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.lockBadge}>
            <Ionicons name="lock-closed" size={20} color={TEXT_WHITE} />
          </View>
          <Pressable
            style={styles.settingsButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Ionicons name="settings-outline" size={22} color={TEXT_WHITE} />
          </Pressable>
        </View>

        {/* Lock icon + title */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>パスコードを入力</Text>
          <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
            <DotIndicator count={count} />
          </Animated.View>
        </View>

        {/* Number pad */}
        <View style={styles.padSection}>
          <NumberPad
            onDigit={addDigit}
            onDelete={removeDigit}
            leftLabel="緊急"
            onLeft={() => {}}
            variant="glass"
            showDeleteIcon={count > 0}
          />
        </View>

        {/* Cancel */}
        <View style={styles.footer}>
          <Pressable onPress={clear}>
            <Text style={styles.cancelText}>キャンセル</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
  },
  lockBadge: {
    flex: 1,
    alignItems: 'center',
  },
  settingsButton: {
    position: 'absolute',
    right: 24,
    padding: 8,
  },
  titleSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  title: {
    color: TEXT_WHITE,
    fontSize: 22,
    fontWeight: '400',
  },
  padSection: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  footer: {
    alignItems: 'flex-end',
    paddingHorizontal: 36,
    paddingBottom: 16,
  },
  cancelText: {
    color: TEXT_WHITE,
    fontSize: 17,
  },
});
