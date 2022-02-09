import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Loading = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Loading...</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
