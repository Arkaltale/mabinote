import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  TextInput,
  Modal,
} from 'react-native';
import ExchangeList from './ExchangeList';
import ChecklistList from './ChecklistList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  dailyContentItems,
  weeklyContentItems,
} from './data';
import { dailyExchangeItems } from './exchange-data';
import { weeklyExchangeItems } from './weekly-exchange-data';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';

interface Props {
  storageKeyPrefix: string;
}

export default function ContentList({ storageKeyPrefix }: Props) {
  const [timeTab, setTimeTab] = useState<'daily' | 'weekly'>('daily');
  const [categoryTab, setCategoryTab] = useState<'content' | 'exchange'>('content');
  const [showOnlyIncomplete, setShowOnlyIncomplete] = useState(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [resetTopTabsOnTabSwitch, setResetTopTabsOnTabSwitch] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [resetMenuVisible, setResetMenuVisible] = useState(false);
  const [resetConfirmVisible, setResetConfirmVisible] = useState(false);
  const [favoriteResetConfirmVisible, setFavoriteResetConfirmVisible] = useState(false);
  const [charName, setCharName] = useState('');

  const settingsKey = `@settings_resetTopTabsOnTabSwitch`;
  const storageKey = `@${storageKeyPrefix}_${timeTab}_${categoryTab}`;
  const favoriteKey = `@${storageKeyPrefix}_favorites`;
  const nameKey = `@${storageKeyPrefix}_charName`;

  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettingsAndData = async () => {
      const savedCompleted = await AsyncStorage.getItem(storageKey);
      const savedFavorites = await AsyncStorage.getItem(favoriteKey);
      const savedSetting = await AsyncStorage.getItem(settingsKey);
      const savedName = await AsyncStorage.getItem(nameKey);
  
      setCompleted(savedCompleted ? JSON.parse(savedCompleted) : {});
      setFavorites(savedFavorites ? JSON.parse(savedFavorites) : {});
      setResetTopTabsOnTabSwitch(savedSetting === 'true');
      setCharName(savedName || '');
  
      setLoading(false);
    };
  
    loadSettingsAndData();
  }, [storageKey]);

  useFocusEffect(
    useCallback(() => {
      if (resetTopTabsOnTabSwitch) {
        setTimeTab('daily');
        setCategoryTab('content');
      }
    }, [resetTopTabsOnTabSwitch])
  );

  const handleCharNameChange = async (text: string) => {
    setCharName(text);
    await AsyncStorage.setItem(nameKey, text);
  };

  const toggleCompleted = async (itemKey: string) => {
    const updated = { ...completed, [itemKey]: !completed[itemKey] };
    setCompleted(updated);
    await AsyncStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const toggleFavorite = async (itemKey: string) => {
    const updated = { ...favorites, [itemKey]: !favorites[itemKey] };
    setFavorites(updated);
    await AsyncStorage.setItem(favoriteKey, JSON.stringify(updated));
  };

  const toggleTopTabResetSetting = async () => {
    const updated = !resetTopTabsOnTabSwitch;
    setResetTopTabsOnTabSwitch(updated);
    await AsyncStorage.setItem(settingsKey, JSON.stringify(updated));
  };

  const resetData = async () => {
    setCompleted({});
    await AsyncStorage.removeItem(storageKey);
    setResetConfirmVisible(false);
    setResetMenuVisible(false);
  };

  const resetFavorites = async () => {
    setFavorites({});
    await AsyncStorage.removeItem(favoriteKey);
    setFavoriteResetConfirmVisible(false);
    setResetMenuVisible(false);
  };

  const toggleTimeTab = () => {
    setTimeTab((prev) => (prev === 'daily' ? 'weekly' : 'daily'));
  };

  const toggleCategoryTab = () => {
    setCategoryTab((prev) => (prev === 'content' ? 'exchange' : 'content'));
  };

  const isExchange = categoryTab === 'exchange';

  const items = timeTab === 'daily'
    ? isExchange
      ? dailyExchangeItems
      : dailyContentItems
    : isExchange
    ? weeklyExchangeItems
    : weeklyContentItems;

  let filteredItems = items;
  if (showOnlyIncomplete) {
    filteredItems = isExchange
      ? items.map(group => ({
          npc: group.npc,
          region: group.region,
          exchanges: group.exchanges.filter(item => !completed[item]),
        })).filter(group => group.exchanges.length > 0)
      : items.map(group => ({
          title: group.title,
          items: group.items.filter(item => !completed[item]),
        })).filter(group => group.items.length > 0);
  }

  if (loading)
    return (
      <ActivityIndicator style={{ marginTop: 50 }} size="large" color="#3b82f6" />
    );


  return (
    <View style={styles.container}>
      {/* 상단 바 */}
      <View style={styles.topRightRow}>
        <TextInput
          style={styles.nameInput}
          value={charName}
          onChangeText={handleCharNameChange}
          placeholder="캐릭터 이름"
          placeholderTextColor="#94a3b8"
        />
        
        <Modal visible={resetMenuVisible} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setResetMenuVisible(false)}>
          <View style={styles.menuPopupStyled}>
            <TouchableOpacity onPress={toggleTopTabResetSetting} style={{marginBottom:6}}>
              <Text style={styles.popupText}>🌀 상단 탭 고정 : {resetTopTabsOnTabSwitch ? 'ON' : 'OFF'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFavoriteResetConfirmVisible(true)}>
              <Text style={styles.popupText}>⭐ 즐겨찾기 초기화</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <TouchableOpacity style={styles.filterOpenButton} onPress={() => setFilterVisible(true)}>
        <Text style={styles.filterText}>필터 ▾</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setResetMenuVisible(true)}>
          <Text style={styles.toggleText}>설정 ⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* 일간 / 주간 탭 */}
      <View style={styles.tabsRow}>
        <TouchableOpacity onPress={toggleTimeTab} style={styles.toggleTab}>
          <Text style={styles.toggleTabText}>⏱ {timeTab === 'daily' ? '일일' : '주간'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleCategoryTab} style={styles.toggleTab}>
          <Text style={styles.toggleTabText}>🎮 {categoryTab === 'content' ? '콘텐츠' : '물물교환'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {isExchange ? (
          <ExchangeList
            data={filteredItems}
            completed={completed}
            favorites={favorites}
            toggleCompleted={toggleCompleted}
            toggleFavorite={toggleFavorite}
            showOnlyFavorites={showOnlyFavorites}
          />
        ) : (
          <ChecklistList
            data={filteredItems}
            completed={completed}
            favorites={favorites}
            toggleCompleted={toggleCompleted}
            toggleFavorite={toggleFavorite}
            showOnlyFavorites={showOnlyFavorites}
          />
        )}
      </ScrollView>

      <TouchableOpacity style={styles.resetButton} onPress={() => setResetConfirmVisible(true)}>
        <Text style={styles.resetText}>✔ 체크 리셋</Text>
      </TouchableOpacity>

      <Modal visible={resetConfirmVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.confirmBoxStyled}>
            <Text style={styles.confirmTitleStyled}>체크 리셋</Text>
            <Text style={styles.confirmTextStyled}>
              체크된 항목이 모두 삭제됩니다.{'\n'}정말로 리셋하시겠습니까?
            </Text>
            <View style={styles.confirmButtonsStyled}>
              <TouchableOpacity onPress={() => setResetConfirmVisible(false)} style={styles.cancelButtonStyled}>
                <Text style={styles.cancelTextStyled}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={resetData} style={styles.confirmButtonStyled}>
                <Text style={styles.confirmTextStrongStyled}>리셋</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={favoriteResetConfirmVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.confirmBoxStyled}>
            <Text style={styles.confirmTitleStyled}>⭐ 즐겨찾기 리셋</Text>
            <Text style={styles.confirmTextStyled}>
              저장된 즐겨찾기 항목이 모두 삭제됩니다.{'\n'}정말로 리셋하시겠습니까?
            </Text>
            <View style={styles.confirmButtonsStyled}>
              <TouchableOpacity onPress={() => setFavoriteResetConfirmVisible(false)} style={styles.cancelButtonStyled}>
                <Text style={styles.cancelTextStyled}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={resetFavorites} style={styles.confirmButtonStyled}>
                <Text style={styles.confirmTextStrongStyled}>리셋</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={filterVisible} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setFilterVisible(false)}>
          <View style={styles.filterPopupStyled}>
            <FilterOption
              label="미완료 항목만 보기"
              value={showOnlyIncomplete}
              onToggle={() => setShowOnlyIncomplete(!showOnlyIncomplete)}
            />
            <FilterOption
              label="즐겨찾기만 보기"
              value={showOnlyFavorites}
              onToggle={() => setShowOnlyFavorites(!showOnlyFavorites)}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

function FilterOption({ label, value, onToggle }: { label: string; value: boolean; onToggle: () => void }) {
  return (
    <TouchableOpacity style={styles.checkboxRow} onPress={onToggle}>
      <FontAwesome name={value ? 'check-square' : 'square-o'} size={20} color="#3b82f6" />
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 12 },
  tabsRow: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginBottom: 8,
  },
  filterOpenButton: {
    alignSelf: 'flex-end', backgroundColor: '#4b5563', paddingVertical: 5, paddingHorizontal: 18, borderRadius: 8, marginBottom: 4, marginRight: 6,
  },
  filterText: {
    color: '#fff', fontSize: 13, fontWeight: '600',
  },
  resetButton: {
    backgroundColor: '#ef4444', padding: 12, borderRadius: 16, marginTop: 12, borderWidth: 1, borderColor: '#f87171',
  },
  resetText: {
    textAlign: 'center', color: 'white', fontSize: 16, fontWeight: 'bold',
  },
  toggleText: {
    color: '#facc15', fontSize: 14, fontWeight: 'bold', margin: 6, marginTop: 3,
  },
  modalOverlay: {
    flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)',
  },
  checkboxRow: {
    flexDirection: 'row', alignItems: 'center', marginVertical: 10,
  },
  checkboxLabel: {
    color: '#fff', fontSize: 15, marginLeft: 12,
  },
  topRightRow: {
    flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 10, gap: 12,
  },
  nameInput: {
    backgroundColor: '#1e293b', color: '#f8fafc', paddingVertical: 4, paddingHorizontal: 15, fontSize: 13, borderRadius: 8, width: 150, marginRight: 78,
  },
  toggleTab: {
    flex: 1, backgroundColor: '#334155', paddingVertical: 8, marginHorizontal: 6, borderRadius: 8, alignItems: 'center',
  },
  toggleTabText: {
    color: '#f8fafc', fontSize: 15, fontWeight: 'bold',
  },
  confirmBoxStyled: {
    backgroundColor: '#1f2937', padding: 20, borderRadius: 16, marginHorizontal: 40, alignItems: 'center', marginBottom: 120,
  },
  confirmTitleStyled: {
    fontSize: 18, fontWeight: 'bold', color: '#facc15', marginBottom: 12,
  },
  confirmTextStyled: {
    fontSize: 14, color: '#e5e7eb', textAlign: 'center', lineHeight: 20, marginBottom: 20,
  },
  confirmButtonsStyled: {
    flexDirection: 'row', justifyContent: 'space-between', width: '100%',
  },
  cancelButtonStyled: {
    flex: 1, paddingVertical: 10, borderRadius: 10, backgroundColor: '#334155', marginRight: 8, alignItems: 'center',
  },
  confirmButtonStyled: {
    flex: 1, paddingVertical: 10, borderRadius: 10, backgroundColor: '#ef4444', marginLeft: 8, alignItems: 'center',
  },
  cancelTextStyled: {
    color: '#f8fafc', fontSize: 15, fontWeight: 'bold',
  },
  confirmTextStrongStyled: {
    color: '#fff', fontSize: 15, fontWeight: 'bold',
  },
  menuPopupStyled: {
    position: 'absolute', top: 52, right: 10, backgroundColor: '#1f2937', padding: 12, paddingLeft: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, elevation: 4, width: 190, zIndex: 10,
  },
  popupText: {
    color: '#fff', fontSize: 15, fontWeight: '500',
  },
  filterPopupStyled: {
    position: 'absolute', top: 52, right: 60, backgroundColor: '#1f2937', paddingLeft: 12, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, elevation: 4, width: 170, zIndex: 10,
  },
});