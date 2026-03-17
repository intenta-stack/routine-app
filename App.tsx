import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SettingsProvider } from './src/context/SettingsContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SettingsProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SettingsProvider>
  );
}
