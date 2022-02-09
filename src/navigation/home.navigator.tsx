import React from 'react';
import {LogBox} from 'react-native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {FeedNavigator} from './feed.navigator';
import {ChatsNavigator} from './chats.navigator';
import {SearchNavigator} from './search.navigator';
import {ProfileNavigator} from './profile.navigator';
import {HomeBottomNavigation} from '../components/navigation/home-bottom-navigation';
import {HomeDrawer} from '../components/drawer/home-drawer';

const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

/*
 * When dev is true in .expo/settings.json (started via `start:dev`),
 * open Components tab as default.
 */
const initialTabRoute: string = __DEV__ ? 'Components' : 'Layouts';

const ROOT_ROUTES: string[] = ['Home', 'Layouts', 'Components', 'Themes'];

const TabBarVisibilityOptions = ({route}): BottomTabNavigationOptions => {
  const isNestedRoute: boolean = route.state?.index > 0;
  const isRootRoute: boolean = ROOT_ROUTES.includes(route.name);

  return {tabBarVisible: isRootRoute && !isNestedRoute};
};

const HomeTabsNavigator = (): React.ReactElement => (
  <BottomTab.Navigator
    screenOptions={TabBarVisibilityOptions}
    initialRouteName={initialTabRoute}
    tabBar={(props: JSX.IntrinsicAttributes) => (
      <HomeBottomNavigation {...props} />
    )}>
    <BottomTab.Screen name="Weed" component={FeedNavigator} />
    <BottomTab.Screen name="Search" component={SearchNavigator} />
    <BottomTab.Screen name="Chat" component={ChatsNavigator} />
    <BottomTab.Screen name="Profile" component={ProfileNavigator} />
  </BottomTab.Navigator>
);

export const HomeNavigator = (): React.ReactElement => (
  <Drawer.Navigator
    screenOptions={{gestureEnabled: false}}
    drawerContent={(props: JSX.IntrinsicAttributes) => (
      <HomeDrawer {...props} />
    )}>
    <Drawer.Screen name="Home" component={HomeTabsNavigator} />
  </Drawer.Navigator>
);

LogBox.ignoreLogs(["Accessing the 'state'"]);
