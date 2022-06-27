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

export const RSVPScreen = ({navigation}) => {
  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );
  return (
    <SafeAreaLayout style={styles.container} insets="top">
      <TopNavigation title="Settings" accessoryLeft={renderBackAction} />
      <Layout style={styles.container}>
        <Text>RSVP Screen</Text>

        <Button>Test</Button>
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
