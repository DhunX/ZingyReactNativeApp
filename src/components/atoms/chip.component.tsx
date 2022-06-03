import React from 'react';
import {Layout, useTheme, Text} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

export const Chip: any = ({text, ...props}) => {
  const theme = useTheme();
  return (
    <Layout
      {...props}
      style={[
        props.style,
        {
          ...styles.chip,
          backgroundColor: theme['color-primary-500'],
        },
      ]}>
      <Text category="s2" style={styles.text}>
        {text}
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
  chip: {
    padding: 8,
    borderRadius: 999,
    color: 'white',
  },
});
