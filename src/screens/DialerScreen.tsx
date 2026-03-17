import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NumberPad } from '../components/NumberPad/NumberPad';
import { CALL_GREEN, CALL_RED, DIALER_BG, TEXT_GRAY, TEXT_WHITE } from '../constants/colors';
import { useFeedback } from '../hooks/useFeedback';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Dialer'>;

function formatNumber(digits: string): string {
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
}

export function DialerScreen({ navigation }: Props) {
  const [digits, setDigits] = useState('');
  const callScale = useRef(new Animated.Value(1)).current;
  const { triggerFeedback } = useFeedback();

  const addDigit = (d: string) => {
    if (digits.length < 12) setDigits((prev) => prev + d);
  };

  const deleteDigit = () => {
    setDigits((prev) => prev.slice(0, -1));
  };

  const handleCall = () => {
    triggerFeedback();
    Animated.sequence([
      Animated.timing(callScale, { toValue: 1.3, duration: 150, useNativeDriver: true }),
      Animated.timing(callScale, { toValue: 0.9, duration: 150, useNativeDriver: true }),
      Animated.timing(callScale, { toValue: 1.2, duration: 150, useNativeDriver: true }),
      Animated.timing(callScale, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
  };

  const handleEnd = () => {
    triggerFeedback();
    navigation.replace('Lock');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.navigate('Settings')} style={styles.settingsBtn}>
            <Ionicons name="settings-outline" size={22} color={TEXT_WHITE} />
          </Pressable>
        </View>

        {/* Display */}
        <View style={styles.displayArea}>
          <Text style={styles.numberDisplay} numberOfLines={1} adjustsFontSizeToFit>
            {digits.length > 0 ? formatNumber(digits) : ' '}
          </Text>
          {digits.length === 0 && (
            <Text style={styles.hint}>番号を入力してください</Text>
          )}
        </View>

        {/* Number pad */}
        <View style={styles.padSection}>
          <NumberPad
            onDigit={addDigit}
            onDelete={deleteDigit}
            variant="neumorphic"
            showDeleteIcon={digits.length > 0}
          />
        </View>

        {/* Action buttons */}
        <View style={styles.actionRow}>
          {/* End call */}
          <Pressable style={[styles.actionBtn, styles.endBtn]} onPress={handleEnd}>
            <Ionicons name="call" size={28} color="#fff" style={{ transform: [{ rotate: '135deg' }] }} />
          </Pressable>

          {/* Call */}
          <Animated.View style={{ transform: [{ scale: callScale }] }}>
            <Pressable style={[styles.actionBtn, styles.callBtn]} onPress={handleCall}>
              <Ionicons name="call" size={28} color="#fff" />
            </Pressable>
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DIALER_BG,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  settingsBtn: {
    padding: 8,
  },
  displayArea: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  numberDisplay: {
    color: TEXT_WHITE,
    fontSize: 40,
    fontWeight: '300',
    letterSpacing: 2,
  },
  hint: {
    color: TEXT_GRAY,
    fontSize: 16,
    marginTop: 8,
  },
  padSection: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 48,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  actionBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callBtn: {
    backgroundColor: CALL_GREEN,
  },
  endBtn: {
    backgroundColor: CALL_RED,
  },
});
