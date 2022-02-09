import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../screens/auth/sign-in';
import SignUp from '../screens/auth/sign-up';
import ForgotPasswordScreen from '../screens/auth/forgot-password';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

export const AuthNavigator = (): React.ReactElement => (
  <NavigationContainer>
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
