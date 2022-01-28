import React from 'react';
import {ImageProps, StyleSheet} from 'react-native';
import {Button, Icon, Layout, Text} from '@ui-kitten/components';

const HeartIcon = (
  props?: Partial<ImageProps>,
): React.ReactElement<ImageProps> => <Icon {...props} name="heart" />;

export const Feed = () => {
  return (
    <Layout style={styles.container}>
      <Text style={styles.text} category="h1">
        Welcome to Zingy App 🎸
      </Text>
      <Text style={styles.text} category="s1">
        This is a sample app for Zingy.
      </Text>
      <Text style={styles.text} appearance="hint">
        For example, try changing theme to Dark by using eva.dark
      </Text>
      <Button style={styles.likeButton} accessoryLeft={HeartIcon}>
        LIKE
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
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
