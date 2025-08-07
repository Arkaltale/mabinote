import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async <T>(key: string): Promise<T | null> => {
  const jsonValue = await AsyncStorage.getItem(key);
  return jsonValue != null ? JSON.parse(jsonValue) : null;
};

export const setData = async <T>(key: string, value: T): Promise<void> => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};
