import React from 'react';
import {ImageProps, StyleSheet} from 'react-native';
import {Button, Icon, Layout, Text} from '@ui-kitten/components';

const SearchIcon = (
  props?: Partial<ImageProps>,
): React.ReactElement<ImageProps> => (<Icon {...props} name="search-outline" />);

export const Profile = ():JSX.Element => {
  return (
    <Layout style={styles.container}>
      <Text style={styles.text} category="s1">
        This is a Discovery app for Zingy.
      </Text>
      <Button style={styles.likeButton} accessoryLeft={SearchIcon}>
        Search
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
