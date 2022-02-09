import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from '../screens/main/Discovery';

const Stack = createStackNavigator();

export const SearchNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Themes" component={SearchScreen} />
  </Stack.Navigator>
);
