import React from 'react';
import {StyleSheet} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';

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
