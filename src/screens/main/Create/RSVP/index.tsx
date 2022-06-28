import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaLayout} from '../../../../components/safe-area-layout.component';
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Text,
  Button,
  Input,
} from '@ui-kitten/components';
import {ArrowIosBackIcon} from '../../../../components/icons';

export const RSVPScreen = ({navigation}) => {
  const [details, setDetails] = useState('');
  const [eventName, setEventName] = useState('');
  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  const handleNext = () => {
    if (details && eventName) {
      navigation.navigate('RSVPDetailsScreen', {details, eventName});
    } else {
      alert('Please fill all the fields');
    }
  };
  return (
    <SafeAreaLayout style={styles.container} insets="top">
      <TopNavigation title="Share an Event" accessoryLeft={renderBackAction} />
      <Layout style={styles.container}>
        <Text style={{...styles.mv20, ...styles.text}}>Event Name</Text>
        <Input
          placeholder="Enter the Event Name"
          value={eventName}
          onChangeText={nextValue => setEventName(nextValue)}
        />
        <Text style={{...styles.mv20, ...styles.text}}>Event Details</Text>
        <Input
          placeholder="Enter the Event Details"
          value={details}
          multiline
          textStyle={{minHeight: 96}}
          onChangeText={nextValue => setDetails(nextValue)}
        />
        <Button onPress={handleNext} style={styles.mv40}>
          Next
        </Button>
      </Layout>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    margin: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  mv20: {
    marginVertical: 20,
  },
  mv40: {
    marginVertical: 40,
  },
});
