import {StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {SafeAreaLayout} from '../../../components/safe-area-layout.component';
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Text,
  Button,
} from '@ui-kitten/components';
import {ArrowIosBackIcon} from '../../../components/icons';
import {ThemeModeContext} from '../../../App';
import {useAuth} from '../../../context/auth';

export const Hire2 = ({navigation}) => {
  const {mode, setMode} = useContext(ThemeModeContext);
  const {signOut} = useAuth();

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );
  return (
    <SafeAreaLayout style={styles.container} insets="top">
      <TopNavigation title="Settings" accessoryLeft={renderBackAction} />
      <Layout style={styles.container}>
        <Text>Settings</Text>
        <Button
          onPress={() => {
            setMode(mode === 'light' ? 'dark' : 'light');
          }}
          style={styles.mv20}>
          <Text>Change Theme : {mode}</Text>
        </Button>

        <Button onPress={signOut}>Sign Out</Button>
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
