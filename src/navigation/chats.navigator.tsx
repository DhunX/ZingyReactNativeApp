import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ConversationListScreen} from '../screens/main/Chats/ChatsListScreen';
import {ChatScreen} from '../screens/main/Chats/ChatScreen';

const Stack = createStackNavigator();

export const ChatsNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="ChatsListScreen" component={ConversationListScreen} />
    <Stack.Screen name="ChatScreen" component={ChatScreen} />
  </Stack.Navigator>
);
