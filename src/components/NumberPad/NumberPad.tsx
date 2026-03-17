import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TEXT_WHITE } from '../../constants/colors';
import { useFeedback } from '../../hooks/useFeedback';
import { NumberPadButton } from './NumberPadButton';

interface NumberPadProps {
  onDigit: (digit: string) => void;
  onDelete?: () => void;
  leftLabel?: string;
  onLeft?: () => void;
  variant?: 'glass' | 'neumorphic';
  showDeleteIcon?: boolean;
}

const KEYS = [
  [{ label: '1', sub: '' }, { label: '2', sub: 'ABC' }, { label: '3', sub: 'DEF' }],
  [{ label: '4', sub: 'GHI' }, { label: '5', sub: 'JKL' }, { label: '6', sub: 'MNO' }],
  [{ label: '7', sub: 'PQRS' }, { label: '8', sub: 'TUV' }, { label: '9', sub: 'WXYZ' }],
];

export function NumberPad({
  onDigit,
  onDelete,
  leftLabel,
  onLeft,
  variant = 'glass',
  showDeleteIcon = true,
}: NumberPadProps) {
  const { triggerFeedback } = useFeedback();

  const handleDelete = () => {
    triggerFeedback();
    onDelete?.();
  };

  return (
    <View style={styles.container}>
      {KEYS.map((row, rowIdx) => (
        <View key={rowIdx} style={styles.row}>
          {row.map((key) => (
            <NumberPadButton
              key={key.label}
              label={key.label}
              sublabel={key.sub || undefined}
              onPress={() => onDigit(key.label)}
              variant={variant}
            />
          ))}
        </View>
      ))}

      {/* Bottom row: left action, 0, right action */}
      <View style={styles.row}>
        {leftLabel ? (
          <NumberPadButton
            label={leftLabel}
            onPress={onLeft ?? (() => {})}
            variant="text"
          />
        ) : (
          <View style={styles.emptyCell} />
        )}
        <NumberPadButton
          label="0"
          onPress={() => onDigit('0')}
          variant={variant}
        />
        {showDeleteIcon ? (
          <Pressable style={styles.iconButton} onPress={handleDelete}>
            <Ionicons name="backspace-outline" size={28} color={TEXT_WHITE} />
          </Pressable>
        ) : (
          <View style={styles.emptyCell} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  emptyCell: {
    width: 72,
    height: 72,
  },
  iconButton: {
    width: 72,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAction: {
    width: 72,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textActionLabel: {
    color: TEXT_WHITE,
    fontSize: 16,
  },
});
