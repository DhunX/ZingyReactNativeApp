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
import {
  ArrowIosBackIcon,
  ChatIcon,
  SearchIconOutline,
} from '../../../components/icons';
import {SafeAreaLayout} from '../../../components/safe-area-layout.component';

export const Discovery = ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState<string>();

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );
  const renderChatAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ChatIcon}
      onPress={() => navigation.navigate('ChatsListScreen')}
    />
  );
  return (
    <SafeAreaLayout insets="top" style={styles.container}>
      <TopNavigation
        accessoryLeft={renderBackAction}
        accessoryRight={renderChatAction}
      />
      <Layout style={styles.header} level="1">
        <Input
          placeholder="Search"
          value={searchQuery}
          accessoryRight={SearchIconOutline}
        />
      </Layout>
      <View style={styles.main}>
        <Text style={styles.text} category="s1">
          This is a Discovery app for Zingy.
        </Text>
      </View>
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
