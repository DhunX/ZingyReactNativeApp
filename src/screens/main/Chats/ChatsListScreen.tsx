import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Divider,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {SafeAreaLayout} from '../../../components/safe-area-layout.component';
import {ArrowIosBackIcon} from '../../../components/icons';
import ContentScreen from './conversation-list';

export const ConversationListScreen = ({navigation}): React.ReactElement => {
  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  return (
    <SafeAreaLayout style={styles.container} insets="top">
      <TopNavigation title="Messages" accessoryLeft={renderBackAction} />
      <Divider />
      <ContentScreen navigation={navigation} />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
