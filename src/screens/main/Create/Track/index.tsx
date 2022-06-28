import {StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {SafeAreaLayout} from '../../../../components/safe-area-layout.component';
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Text,
  Button,
} from '@ui-kitten/components';
import {ArrowIosBackIcon} from '../../../../components/icons';

export const TrackPostScreen = ({navigation}) => {
  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );
  return (
    <SafeAreaLayout style={styles.container} insets="top">
      <TopNavigation
        title="Create Track Post"
        accessoryLeft={renderBackAction}
      />
      <Layout style={styles.container}>
        <Text>Track Post</Text>
        <Button>Create</Button>
      </Layout>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  mv20: {
    marginVertical: 20,
  },
});
