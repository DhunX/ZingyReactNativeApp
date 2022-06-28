import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

import {
  HeartOutlineIcon,
  MessageSquareOutlineIcon,
  ShareIconOutline,
} from '../icons';
import {Button} from '../atoms/button.component';
import {HeartIconFill} from '../../screens/auth/sign-up/extra/icons';

export const Interactions: any = (props: any) => {
  const [liked, setLiked] = React.useState(false);

  return (
    <Layout style={styles.interactions}>
      <Button
        onPress={() => setLiked(e => !e)}
        icon={!liked ? HeartOutlineIcon : HeartIconFill}>
        <Text>Like</Text>
      </Button>
      {/* <Button
        onPress={() => props.navigation.navigate('MaintenanceScreen')}
        icon={MessageSquareOutlineIcon}
      /> */}
      <Button
        onPress={() => props.navigation.navigate('MaintenanceScreen')}
        icon={ShareIconOutline}>
        <Text>Share</Text>
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  interactions: {
    borderTopColor: '#fff',
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    color: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 6,
    paddingBottom: 0,
  },
});
