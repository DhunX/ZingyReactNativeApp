import React from 'react';
import {Layout, useTheme, Text} from '@ui-kitten/components';

export const Chip: any = ({text, interactions = false, ...props}) => {
  const theme = useTheme();
  return (
    <Layout
      {...props}
      style={[
        props.style,
        {
          padding: 8,
          borderRadius: 999,
          backgroundColor: theme['color-primary-500'],
          color: 'white',
        },
      ]}>
      <Text category="s2" style={{color: 'white'}}>
        {text}
      </Text>
    </Layout>
  );
};
