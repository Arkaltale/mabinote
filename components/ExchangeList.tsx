import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export type ExchangeEntry = {
  npc: string;
  region: string;
  exchanges: string[];
};

interface Props {
  data: ExchangeEntry[];
  completed: Record<string, boolean>;
  favorites: Record<string, boolean>;
  toggleCompleted: (itemKey: string) => void;
  toggleFavorite: (itemKey: string) => void;
  showOnlyFavorites?: boolean;
}

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ExchangeList({
  data,
  completed,
  favorites,
  toggleCompleted,
  toggleFavorite,
  showOnlyFavorites = false,
}: Props) {
  const handleToggle = (item: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    toggleCompleted(item);
  };

  return (
    <View style={styles.card}>
      {data.map((entry) => {
        const filteredItems = showOnlyFavorites
          ? entry.exchanges.filter(item => favorites[item])
          : entry.exchanges;

        if (filteredItems.length === 0) return null;

        const total = filteredItems.length;
        const done = filteredItems.filter(item => completed[item]).length;

        return (
          <View key={`${entry.region}-${entry.npc}`} style={styles.groupContainer}>
            <Text style={styles.groupTitle}>
              [{entry.region}] {entry.npc} ({done} / {total})
            </Text>
            {filteredItems.map((item) => (
              <View key={item} style={styles.itemRow}>
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleToggle(item)}
                >
                  <FontAwesome
                    name={completed[item] ? 'check-square' : 'square-o'}
                    size={22}
                    color={completed[item] ? '#60a5fa' : '#94a3b8'}
                  />
                  <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleFavorite(item)} style={styles.favoriteIcon}>
                  <FontAwesome
                    name={favorites[item] ? 'star' : 'star-o'}
                    size={18}
                    color={favorites[item] ? '#facc15' : '#94a3b8'}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0f172a',
    padding: 8,
    borderRadius: 16,
    marginVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  groupContainer: {
    marginBottom: 12,
  },
  groupTitle: {
    color: '#f3f4f6',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 4,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
    flex: 1,
  },
  itemText: {
    color: '#e5e7eb',
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'NotoSansKR_400Regular',
  },
  favoriteIcon: {
    padding: 8,
    marginLeft: 6,
  },
});