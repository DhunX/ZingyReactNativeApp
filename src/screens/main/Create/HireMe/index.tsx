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

export const HireMeScreen = ({navigation}) => {
  const [skill, setSkill] = useState('');
  const [genre, setGenre] = useState('');
  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  const handleNext = () => {
    if (skill && genre) {
      navigation.navigate('HireMeDetailsScreen', {skill, genre});
    } else {
      alert('Please fill all the fields');
    }
  };
  return (
    <SafeAreaLayout style={styles.container} insets="top">
      <TopNavigation title="Get Hired" accessoryLeft={renderBackAction} />
      <Layout style={styles.container}>
        <Text style={{...styles.mv20, ...styles.text}}>Genre</Text>
        <Input
          placeholder="Enter the Genre Here"
          value={genre}
          onChangeText={nextValue => setGenre(nextValue)}
        />
        <Text style={{...styles.mv20, ...styles.text}}>Skill</Text>
        <Input
          placeholder="Enter the Skill Here"
          value={skill}
          onChangeText={nextValue => setSkill(nextValue)}
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
