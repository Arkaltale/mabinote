// 📁 hooks/useAutoReset.ts
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';

export function useAutoReset(storageKeyPrefix: string) {
  useEffect(() => {
    const now = new Date();
    let toastMessage = '';

    const reset = async () => {
      // ✅ 일간 초기화
      const dailyResetKey = `@${storageKeyPrefix}_daily_lastReset`;
      const dailyStorageKeys = [
        `@${storageKeyPrefix}_daily_content`,
        `@${storageKeyPrefix}_daily_exchange`
      ];
      const dailyLastReset = await AsyncStorage.getItem(dailyResetKey);

      const dailyResetTime = new Date(now);
      dailyResetTime.setHours(6, 0, 0, 0);
      if (now < dailyResetTime) dailyResetTime.setDate(dailyResetTime.getDate() - 1);

      const dailyNeedsReset = !dailyLastReset || new Date(dailyLastReset) < dailyResetTime;

      if (dailyNeedsReset) {
        for (const key of dailyStorageKeys) {
          await AsyncStorage.removeItem(key);
        }
        await AsyncStorage.setItem(dailyResetKey, now.toISOString());
        toastMessage += '일간 항목이 초기화되었습니다.\n';
      }

      // ✅ 주간 초기화 (월요일 오전 6시 기준)
      const weeklyResetKey = `@${storageKeyPrefix}_weekly_lastReset`;
      const weeklyStorageKeys = [
        `@${storageKeyPrefix}_weekly_content`,
        `@${storageKeyPrefix}_weekly_exchange`
      ];
      const weeklyLastReset = await AsyncStorage.getItem(weeklyResetKey);

      const weeklyResetTime = new Date(now);
      weeklyResetTime.setHours(6, 0, 0, 0);
      const day = weeklyResetTime.getDay();
      const diff = (day + 6) % 7; // 월요일 기준
      weeklyResetTime.setDate(weeklyResetTime.getDate() - diff);
      if (now < weeklyResetTime) weeklyResetTime.setDate(weeklyResetTime.getDate() - 7);

      const weeklyNeedsReset = !weeklyLastReset || new Date(weeklyLastReset) < weeklyResetTime;

      if (weeklyNeedsReset) {
        for (const key of weeklyStorageKeys) {
          await AsyncStorage.removeItem(key);
        }
        await AsyncStorage.setItem(weeklyResetKey, now.toISOString());
        toastMessage += '주간 항목이 초기화되었습니다.';
      }

      if (toastMessage.trim()) {
        Toast.show(toastMessage.trim(), { duration: Toast.durations.SHORT });
      }
    };

    reset();
  }, [storageKeyPrefix]);
}
