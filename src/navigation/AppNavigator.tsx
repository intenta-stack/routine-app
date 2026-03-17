import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { DialerScreen } from '../screens/DialerScreen';
import { LockScreen } from '../screens/LockScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { SETTINGS_BG, TEXT_WHITE } from '../constants/colors';

export type RootStackParamList = {
  Lock: undefined;
  Dialer: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Lock">
      <Stack.Screen
        name="Lock"
        component={LockScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Dialer"
        component={DialerScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: '設定',
          headerStyle: { backgroundColor: SETTINGS_BG },
          headerTintColor: TEXT_WHITE,
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
