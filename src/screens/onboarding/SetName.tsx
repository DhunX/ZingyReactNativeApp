import React from 'react';
import {ImageProps, StyleSheet, View} from 'react-native';
import {
  Button,
  Icon,
  Layout,
  Text,
  Input,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {ArrowIosBackIcon, SearchIconOutline} from '../../components/icons';
import {SafeAreaLayout} from '../../components/safe-area-layout.component';

export const SetName = ({navigation}) => {
  const [fullname, setFullName] = React.useState<string>('');

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );
  const handleSetUsername = (): void => {
    console.log('Set Pressed');
    navigation.navigate('SetUsername');
  };
  return (
    <SafeAreaLayout insets="top" style={styles.container}>
      <TopNavigation accessoryLeft={renderBackAction} />
      <Layout style={styles.header} level="1">
        <Input
          label={'Full Name'}
          placeholder="Name"
          value={fullname}
          accessoryRight={SearchIconOutline}
        />
      </Layout>
      <Button disabled={!fullname.length} onPress={handleSetUsername}>
        Save and Continue
      </Button>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    width: '100%',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  likeButton: {
    marginVertical: 16,
  },
});
