import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SettingsScreen from '../screens/main/Settings';

const Stack = createStackNavigator();

export const SettingsNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </Stack.Navigator>
);
