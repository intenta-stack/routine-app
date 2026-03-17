import React, { createContext, useContext, useEffect, useState } from 'react';
import { SoundType } from '../constants/sounds';
import { loadData, saveData } from '../utils/storage';

export interface AppSettings {
  soundEnabled: boolean;
  soundType: SoundType;
  hapticEnabled: boolean;
  volume: number;
}

const DEFAULT_SETTINGS: AppSettings = {
  soundEnabled: true,
  soundType: 'beep',
  hapticEnabled: true,
  volume: 0.8,
};

const STORAGE_KEY = '@toyphone_settings';

interface SettingsContextValue {
  settings: AppSettings;
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadData<AppSettings>(STORAGE_KEY).then((saved) => {
      if (saved) setSettings(saved);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded) {
      saveData(STORAGE_KEY, settings);
    }
  }, [settings, loaded]);

  function updateSetting<K extends keyof AppSettings>(key: K, value: AppSettings[K]) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  if (!loaded) return null;

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
