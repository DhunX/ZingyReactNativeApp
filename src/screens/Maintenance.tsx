import {TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {ArrowIosBackIcon} from '../components/icons';
import {SafeAreaLayout} from '../components/safe-area-layout.component';

export const MaintenanceScreen = ({navigation}) => {
  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );
  return (
    <SafeAreaLayout style={styles.container} insets="top">
      <TopNavigation
        title="Under Maintenance"
        accessoryLeft={renderBackAction}
      />
      <View style={styles.centerView}>
        <Text style={{marginHorizontal: 'auto'}}>
          This page is under maintenance...
        </Text>
        {/* <Image
          height={20}
          width={20}
          source={require('../assets/images/maintenance.jpg')}
        /> */}
      </View>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 16,
  },
  centerView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
