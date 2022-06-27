import React from 'react';
import {LogBox} from 'react-native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
// import {createDrawerNavigator} from '@react-navigation/drawer';
import {FeedNavigator} from './feed.navigator';
import {ChatsNavigator} from './chats.navigator';
import {SearchNavigator} from './search.navigator';
import {ProfileNavigator} from './profile.navigator';
import {HomeBottomNavigation} from '../components/navigation/home-bottom-navigation';
import {SettingsNavigator} from './settings.navigator';
import ProfilePublic from '../screens/main/ProfilePublic';
import {CreateNavigator} from './create.navigator';
// import {HomeDrawer} from '../components/drawer/home-drawer';

const BottomTab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();

/*
 * When dev is true in .expo/settings.json (started via `start:dev`),
 * open Components tab as default.
 */
// const initialTabRoute: string = __DEV__ ? 'Components' : 'Layouts';

const ROOT_ROUTES: string[] = ['Feed', 'Search', 'ChatsListScreen', 'Profile'];

const TabBarVisibilityOptions = ({route}): BottomTabNavigationOptions => {
  const isNestedRoute: boolean = route.state?.index > 0;
  const isRootRoute: boolean = ROOT_ROUTES.includes(route.name);

  return {tabBarVisible: isRootRoute && !isNestedRoute, header: () => null};
};

export const HomeNavigator = (): React.ReactElement => (
  <BottomTab.Navigator
    headerMode="none"
    screenOptions={TabBarVisibilityOptions}
    initialRouteName={'Feed'}
    tabBar={(props: JSX.IntrinsicAttributes) => (
      <HomeBottomNavigation {...props} />
    )}>
    <BottomTab.Screen name="Feed" component={FeedNavigator} />
    <BottomTab.Screen name="Search" component={SearchNavigator} />
    <BottomTab.Screen name="Profile" component={ProfileNavigator} />
    <BottomTab.Screen name="PublicProfile" component={ProfilePublic} />
    <BottomTab.Screen name="Chat" component={ChatsNavigator} />
    <BottomTab.Screen name="Settings" component={SettingsNavigator} />
    <BottomTab.Screen name="CreateNavigator" component={CreateNavigator} />
  </BottomTab.Navigator>
);

LogBox.ignoreLogs(["Accessing the 'state'"]);
