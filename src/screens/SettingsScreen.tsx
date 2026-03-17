import Constants from 'expo-constants';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSettings } from '../context/SettingsContext';
import {
  SETTINGS_BG,
  SETTINGS_CARD_BG,
  SETTINGS_SEPARATOR,
  TEXT_GRAY,
  TEXT_WHITE,
} from '../constants/colors';
import { SOUND_LABELS, SoundType } from '../constants/sounds';

export function SettingsScreen() {
  const { settings, updateSetting } = useSettings();

  const soundTypes: SoundType[] = ['beep', 'click', 'pop', 'tone'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Sound section */}
        <Text style={styles.sectionTitle}>サウンド</Text>
        <View style={styles.card}>
          <Row label="ボタン音">
            <Switch
              value={settings.soundEnabled}
              onValueChange={(v) => updateSetting('soundEnabled', v)}
              trackColor={{ true: '#4CD964', false: '#555' }}
            />
          </Row>

          <View style={styles.separator} />

          <View style={styles.row}>
            <Text style={[styles.rowLabel, !settings.soundEnabled && styles.dimmed]}>
              効果音
            </Text>
            <View style={styles.segmentedGroup}>
              {soundTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.segmentBtn,
                    settings.soundType === type && styles.segmentBtnActive,
                    !settings.soundEnabled && styles.dimmed,
                  ]}
                  onPress={() => settings.soundEnabled && updateSetting('soundType', type)}
                  disabled={!settings.soundEnabled}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      settings.soundType === type && styles.segmentTextActive,
                    ]}
                  >
                    {SOUND_LABELS[type]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.row}>
            <Text style={[styles.rowLabel, !settings.soundEnabled && styles.dimmed]}>
              音量　{Math.round(settings.volume * 100)}%
            </Text>
            <View style={styles.volumeBar}>
              {[0.2, 0.4, 0.6, 0.8, 1.0].map((v) => (
                <TouchableOpacity
                  key={v}
                  style={[
                    styles.volumeStep,
                    settings.volume >= v && styles.volumeStepActive,
                  ]}
                  onPress={() => updateSetting('volume', v)}
                  disabled={!settings.soundEnabled}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Haptics section */}
        <Text style={styles.sectionTitle}>バイブレーション</Text>
        <View style={styles.card}>
          <Row label="バイブレーション">
            <Switch
              value={settings.hapticEnabled}
              onValueChange={(v) => updateSetting('hapticEnabled', v)}
              trackColor={{ true: '#4CD964', false: '#555' }}
            />
          </Row>
        </View>

        {/* About */}
        <Text style={styles.sectionTitle}>このアプリについて</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>バージョン</Text>
            <Text style={styles.rowValue}>
              {Constants.expoConfig?.version ?? '1.0.0'}
            </Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>アプリ名</Text>
            <Text style={styles.rowValue}>こどもフォン</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SETTINGS_BG,
  },
  scroll: {
    padding: 16,
    gap: 8,
  },
  sectionTitle: {
    color: TEXT_GRAY,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginTop: 16,
    marginBottom: 4,
    marginLeft: 8,
  },
  card: {
    backgroundColor: SETTINGS_CARD_BG,
    borderRadius: 16,
    overflow: 'hidden',
  },
  separator: {
    height: 1,
    backgroundColor: SETTINGS_SEPARATOR,
    marginHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 52,
  },
  rowLabel: {
    color: TEXT_WHITE,
    fontSize: 16,
  },
  rowValue: {
    color: TEXT_GRAY,
    fontSize: 16,
  },
  dimmed: {
    opacity: 0.4,
  },
  segmentedGroup: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    flex: 1,
    marginLeft: 8,
  },
  segmentBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  segmentBtnActive: {
    backgroundColor: '#4CD964',
    borderColor: '#4CD964',
  },
  segmentText: {
    color: TEXT_GRAY,
    fontSize: 12,
  },
  segmentTextActive: {
    color: '#000',
    fontWeight: '600',
  },
  volumeBar: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  volumeStep: {
    width: 28,
    height: 28,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    backgroundColor: 'transparent',
  },
  volumeStepActive: {
    backgroundColor: '#4CD964',
    borderColor: '#4CD964',
  },
});
