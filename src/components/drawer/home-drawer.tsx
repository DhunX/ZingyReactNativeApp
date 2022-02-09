import React, {ReactElement, useState} from 'react';
import {StyleSheet, View, ImageStyle} from 'react-native';
import {
  Avatar,
  Divider,
  Drawer,
  DrawerItem,
  DrawerElement,
  Layout,
  Text,
  IndexPath,
} from '@ui-kitten/components';
import {Icon, IconElement} from '@ui-kitten/components';
import {SafeAreaLayout} from '../safe-area-layout.component';
import {AppInfoService} from '../../services/app-info.service';
import {ChatIcon, PersonIcon, HomeIcon, SearchIconOutline} from '../icons';

const version: string = AppInfoService.getVersion();

export const HomeDrawer = ({navigation}): DrawerElement => {
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>();

  const DATA = [
    {
      title: 'Chat',
      icon: () => <ChatIcon />,
      onPress: () => {
        navigation.toggleDrawer();
        navigation.navigate('Chat');
      },
    },
    {
      title: 'Profile',
      icon: () => <PersonIcon />,
      onPress: () => {
        navigation.toggleDrawer();
        navigation.navigate('Profile');
      },
    },
    {
      title: 'Feed',
      icon: () => <HomeIcon />,
      onPress: () => {
        navigation.toggleDrawer();
        navigation.navigate('Feed');
      },
    },
    {
      title: 'Search',
      icon: () => <SearchIconOutline />,
      onPress: () => {
        navigation.toggleDrawer();
        navigation.navigate('Search');
      },
    },
  ];

  const renderHeader = (): ReactElement => (
    <SafeAreaLayout insets="top" level="2">
      <Layout style={styles.header} level="2">
        <View style={styles.profileContainer}>
          <Avatar
            size="giant"
            source={require('../../assets/images/image-app-icon.png')}
          />
          <Text style={styles.profileName} category="h6">
            Zingy
          </Text>
        </View>
      </Layout>
    </SafeAreaLayout>
  );

  const renderFooter = () => (
    <SafeAreaLayout insets="bottom">
      <React.Fragment>
        <Divider />
        <View style={styles.footer}>
          <Text>{`Version ${AppInfoService.getVersion()}`}</Text>
        </View>
      </React.Fragment>
    </SafeAreaLayout>
  );

  return (
    <Drawer
      header={renderHeader}
      footer={renderFooter}
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      {DATA.map((el, index) => (
        <DrawerItem
          key={index}
          title={el.title}
          onPress={el.onPress}
          accessoryLeft={el.icon}
        />
      ))}
    </Drawer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    height: 128,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    marginHorizontal: 16,
  },
});
