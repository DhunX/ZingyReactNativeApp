import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {SafeAreaLayout} from '../../../components/safe-area-layout.component';
import ContentView from './chat-screen';
import {ArrowIosBackIcon} from '../../../components/icons';

export const ChatScreen = ({navigation}): React.ReactElement => {
  const onProfileActionPress = (): void => {
    navigation.navigate('Feed');
  };

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  const renderProfileAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={renderProfileImage}
      onPress={onProfileActionPress}
    />
  );

  const renderProfileImage = (): React.ReactElement => (
    <Image
      style={styles.profileImage}
      source={require('../../../assets/images/image-app-icon.png')}
    />
  );

  return (
    <SafeAreaLayout style={styles.container} insets="top">
      <TopNavigation
        title="Helen Kuper"
        subtitle="Last seen just now"
        accessoryLeft={renderBackAction}
        accessoryRight={renderProfileAction}
      />
      <ContentView />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    tintColor: null,
  },
});
