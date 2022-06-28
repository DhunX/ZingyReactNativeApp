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

export const RSVPDetailsScreen = ({route, navigation}) => {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const {eventName, details} = route.params;

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  const handleNext = () => {
    if (location && duration) {
      navigation.navigate('RSVPSubmitScreen', {
        eventName,
        details,
        date,
        location,
        duration,
      });
    } else {
      alert('Please fill all the fields');
    }
  };

  return (
    <SafeAreaLayout style={styles.container} insets="top">
      <TopNavigation title="Share an Event" accessoryLeft={renderBackAction} />
      <Layout style={styles.container}>
        <Text style={{...styles.mv20, ...styles.text}}>Location</Text>
        <Input
          placeholder="Enter the Link or Location of Event"
          value={location}
          onChangeText={nextValue => setLocation(nextValue)}
        />
        <Text style={{...styles.mv20, ...styles.text}}>Date</Text>
        <Input
          placeholder="Choose the Date"
          value={date}
          onChangeText={nextValue => setDate(nextValue)}
        />
        <Text style={{...styles.mv20, ...styles.text}}>Duration</Text>
        <Input
          placeholder="Choose the Duration"
          value={duration}
          onChangeText={nextValue => setDuration(nextValue)}
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
