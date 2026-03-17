import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveData<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function loadData<T>(key: string): Promise<T | null> {
  const raw = await AsyncStorage.getItem(key);
  if (raw === null) return null;
  return JSON.parse(raw) as T;
}
