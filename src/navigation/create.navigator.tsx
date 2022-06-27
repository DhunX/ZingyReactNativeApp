import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HireScreen} from '../screens/main/Create/Hire';
import {HireMeScreen} from '../screens/main/Create/HireMe';
import {RSVPScreen} from '../screens/main/Create/RSVP';

const Stack = createStackNavigator();

export const CreateNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="HireScreen" component={HireScreen} />
    <Stack.Screen name="HireMeScreen" component={HireMeScreen} />
    <Stack.Screen name="RSVPScreen" component={RSVPScreen} />
  </Stack.Navigator>
);
