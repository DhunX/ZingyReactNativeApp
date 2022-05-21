import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {SafeAreaLayout} from '../../../components/safe-area-layout.component';
import {ChatIcon} from '../../../components/icons';
import {Card} from '../../../components/atoms/card.component';

export const Feed = ({navigation}) => {
  const renderChatAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ChatIcon}
      onPress={() => navigation.navigate('Chat')}
    />
  );
  return (
    <SafeAreaLayout insets="top" style={styles.container}>
      <TopNavigation accessoryRight={renderChatAction} />
      <ScrollView>
        <Layout style={styles.feed}>
          <Card style={{marginBottom: 12}} interactions>
            <Text style={styles.text} category="h1">
              Welcome to Zingy App 🎸
            </Text>
            <Text style={{...styles.text, marginVertical: 24}} category="s1">
              This is a sample app for Zingy.
            </Text>
            <Text style={styles.text} appearance="hint">
              For example, try changing theme to Dark by using eva.dark
            </Text>
          </Card>
          <Card style={{marginBottom: 12}}>
            <Text style={styles.text} category="h1">
              Welcome to Zingy App 🎸
            </Text>
            <Text style={{...styles.text, marginVertical: 24}} category="s1">
              This is a sample app for Zingy.
            </Text>
            <Text style={styles.text} appearance="hint">
              For example, try changing theme to Dark by using eva.dark
            </Text>
          </Card>
          <Card style={{marginBottom: 12}}>
            <Text style={styles.text} category="h1">
              Welcome to Zingy App 🎸
            </Text>
            <Text style={{...styles.text, marginVertical: 24}} category="s1">
              This is a sample app for Zingy.
            </Text>
            <Text style={styles.text} appearance="hint">
              For example, try changing theme to Dark by using eva.dark
            </Text>
          </Card>
          <Card style={{marginBottom: 12}}>
            <Text style={styles.text} category="h1">
              Welcome to Zingy App 🎸
            </Text>
            <Text style={{...styles.text, marginVertical: 24}} category="s1">
              This is a sample app for Zingy.
            </Text>
            <Text style={styles.text} appearance="hint">
              For example, try changing theme to Dark by using eva.dark
            </Text>
          </Card>
        </Layout>
      </ScrollView>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  feed: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  text: {
    textAlign: 'center',
    color: 'white',
  },
  likeButton: {
    marginVertical: 16,
  },
});
