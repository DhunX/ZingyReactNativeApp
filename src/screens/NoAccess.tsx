import {Button, useTheme} from '@ui-kitten/components';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useAuth} from '../context/auth';
import Toast from 'react-native-toast-message';

export const NoAccess = () => {
  const {authData} = useAuth();
  const theme = useTheme();
  const handleEarlyAccessRequest = () => {
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Early Access Requested',
      text2: 'You will be notified when the Early Access is available',
    });
  };
  const handleCheckStatus = () => {
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Checking Status...',
    });
    setTimeout(() => {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: "You've not been granted access",
        text2: 'Please try again later',
      });
    }, 1000);
  };
  return (
    <View style={styles.centerView}>
      <Text style={styles.h3}>
        Hi,{' '}
        <Text style={{color: theme['color-primary-500'], ...styles.name}}>
          {authData.data.user.name}
        </Text>
      </Text>
      <Text style={styles.h5}>
        You have not been assigned the early access of Zingy.
      </Text>
      <Button style={styles.my_16} onPress={handleEarlyAccessRequest}>
        Request Early Access
      </Button>
      <Button onPress={handleCheckStatus}>Check Request Status</Button>
      {/* <Button onPress={() => signOut(navigation)}>Logout</Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  my_16: {
    marginVertical: 16,
  },
  name: {
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 24,
    marginBottom: 16,
  },
  h5: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    margin: 16,
  },
});
