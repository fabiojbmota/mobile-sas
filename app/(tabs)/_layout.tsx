import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#2f95dc' }}>
      
      {/* Tab 1: Stock (Home) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Stock',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="cubes" color={color} />,
          headerShown: false, // Esconde o cabeçalho se quiseres usar o título da tua página
        }}
      />

      {/* Tab 2: Beneficiários (Nova) */}
      <Tabs.Screen
        name="beneficiarios"
        options={{
          title: 'Estudantes',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="users" color={color} />,
          headerShown: false,
        }}
      />
      
    </Tabs>
  );
}