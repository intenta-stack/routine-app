import { useState } from 'react';

const MAX_DIGITS = 6;

export function usePasscode() {
  const [digits, setDigits] = useState<string[]>([]);

  const addDigit = (d: string) => {
    setDigits((prev) => {
      if (prev.length >= MAX_DIGITS) return prev;
      return [...prev, d];
    });
  };

  const removeDigit = () => {
    setDigits((prev) => prev.slice(0, -1));
  };

  const clear = () => setDigits([]);

  return {
    digits,
    count: digits.length,
    isFull: digits.length >= MAX_DIGITS,
    addDigit,
    removeDigit,
    clear,
  };
}
