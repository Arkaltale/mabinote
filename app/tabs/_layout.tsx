import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="tab1"
        options={{
          title: '본캐',
          lazy: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tab2"
        options={{
          title: '부캐1',
          lazy: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="leaf" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tab3"
        options={{
          title: '부캐2',
          lazy: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="flask" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
