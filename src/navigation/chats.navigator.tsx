import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChatsScreen from '../screens/main/Chats';

const Stack = createStackNavigator();

export const ChatsNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Chats" component={ChatsScreen} />
  </Stack.Navigator>
);
