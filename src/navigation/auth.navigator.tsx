import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../screens/auth/sign-in';
import SignUp from '../screens/auth/sign-up';
import ForgotPasswordScreen from '../screens/auth/forgot-password';

const Stack = createStackNavigator();

export const AuthNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode="none">
    {/* <Stack.Screen name="Auth" component={AuthMenuNavigator} /> */}
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </Stack.Navigator>
);
