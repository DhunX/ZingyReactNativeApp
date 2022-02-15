import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {
  Button,
  Divider,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {useAuth} from '../../../context/Auth';
import {SafeAreaLayout} from '../../../components/safe-area-layout.component';
import {ArrowIosBackIcon, SettingsIcon} from '../../../components/icons';

export const Profile = ({navigation}): JSX.Element => {
  const {authData, signOut} = useAuth();

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );
  const renderSettingsAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={SettingsIcon}
      onPress={() => navigation.navigate('Settings')}
    />
  );

  return (
    <SafeAreaLayout insets="top">
      <TopNavigation
        title="Profile"
        accessoryLeft={renderBackAction}
        accessoryRight={renderSettingsAction}
      />
      <ScrollView style={styles.scrollView}>
        <Layout style={styles.container}>
          <Text style={styles.text} category="s1">
            This is a your Zingy Profile.
          </Text>
        </Layout>
        <Divider />
        <Layout style={styles.container}>
          <Text style={styles.text} category="s1">
            Name: {authData.data.user.name}
          </Text>
          <Button onPress={signOut}>Sign Out</Button>
        </Layout>
      </ScrollView>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    minHeight: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    margin: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  text: {
    textAlign: 'center',
    marginBottom: 16,
  },
  likeButton: {
    marginVertical: 16,
  },
});
