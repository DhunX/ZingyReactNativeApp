import React from 'react';
import {Layout, useTheme} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

import {
  HeartOutlineIcon,
  MessageSquareOutlineIcon,
  ShareIconOutline,
} from '../icons';
import {Button} from '../atoms/button.component';

export const Interactions: any = (props: any) => {
  const theme = useTheme();
  return (
    <Layout style={styles.interactions}>
      <Button icon={HeartOutlineIcon} />
      <Button icon={MessageSquareOutlineIcon} />
      <Button icon={ShareIconOutline} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  interactions: {
    borderTopColor: '#fff',
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    marginTop: 12,
    color: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    paddingBottom: 0,
  },
});
