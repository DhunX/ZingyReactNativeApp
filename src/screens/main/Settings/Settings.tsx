import {StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaLayout} from '../../../components/safe-area-layout.component';
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Text,
} from '@ui-kitten/components';
import {ArrowIosBackIcon} from '../../../components/icons';

export const Settings = ({navigation}) => {
  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );
  return (
    <SafeAreaLayout style={styles.container} insets="top">
      <TopNavigation title="Settings" accessoryLeft={renderBackAction} />
      <Layout>
        <Text>Settings</Text>
      </Layout>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
