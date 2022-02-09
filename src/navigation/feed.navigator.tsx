import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FeedScreen from '../screens/main/Feed';

const Stack = createStackNavigator();

export const FeedNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Feed" component={FeedScreen} />
  </Stack.Navigator>
);
