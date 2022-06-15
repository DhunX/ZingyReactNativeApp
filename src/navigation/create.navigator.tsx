import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FeedScreen from '../screens/main/Feed';

const Stack = createStackNavigator();

export const CreateNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="HireScreen1" component={FeedScreen} />
    <Stack.Screen name="HireScreen2" component={FeedScreen} />
    <Stack.Screen name="HireScreen3" component={FeedScreen} />
  </Stack.Navigator>
);
