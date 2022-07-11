import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeNavigator} from './home.navigator';
import {HireScreen} from '../screens/main/Create/Hire';
import {HireMeScreen} from '../screens/main/Create/HireMe';
import {RSVPScreen} from '../screens/main/Create/RSVP';
import {TextPostScreen} from '../screens/main/Create/TextPost';
import {TrackPostScreen} from '../screens/main/Create/Track';
import {PhotoVdoScreen} from '../screens/main/Create/PhotoVdo';
import {HireSubmitScreen} from '../screens/main/Create/Hire/submit';
import {HireMeDetailsScreen} from '../screens/main/Create/HireMe/details';
import {HireMeSubmitScreen} from '../screens/main/Create/HireMe/submit';
import {RSVPDetailsScreen} from '../screens/main/Create/RSVP/details';
import {RSVPSubmitScreen} from '../screens/main/Create/RSVP/submit';
import {HireDetailsScreen} from '../screens/main/Create/Hire/details';
import {MaintenanceScreen} from '../screens/Maintenance';
import {EditProfileScreen} from '../screens/main/Profile/EditProfile';
import SettingsScreen from '../screens/main/Settings';

/*
 * Navigation theming: https://reactnavigation.org/docs/en/next/themes.html
 */
const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // prevent layout blinking when performing navigation
    background: 'transparent',
  },
};

const Stack = createStackNavigator();

export const AppNavigator = (): React.ReactElement => (
  <NavigationContainer headerMode="none" theme={navigatorTheme}>
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
      {/* <Stack.Screen name="CreateNavigator" component={CreateNavigator} /> */}
      <Stack.Screen name="HireScreen" component={HireScreen} />
      <Stack.Screen name="HireMeScreen" component={HireMeScreen} />
      <Stack.Screen name="RSVPScreen" component={RSVPScreen} />
      <Stack.Screen name="TextPostScreen" component={TextPostScreen} />
      <Stack.Screen name="TrackPostScreen" component={TrackPostScreen} />
      <Stack.Screen name="PhotoVdoScreen" component={PhotoVdoScreen} />
      <Stack.Screen name="HireDetailsScreen" component={HireDetailsScreen} />
      <Stack.Screen name="HireSubmitScreen" component={HireSubmitScreen} />
      <Stack.Screen
        name="HireMeDetailsScreen"
        component={HireMeDetailsScreen}
      />
      <Stack.Screen name="HireMeSubmitScreen" component={HireMeSubmitScreen} />
      <Stack.Screen name="RSVPDetailsScreen" component={RSVPDetailsScreen} />
      <Stack.Screen name="RSVPSubmitScreen" component={RSVPSubmitScreen} />
      <Stack.Screen name="MaintenanceScreen" component={MaintenanceScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
