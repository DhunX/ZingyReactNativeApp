import React from 'react';
import {Layout, useTheme, Text, Button} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {POST_TYPES} from '../../constants';

export const RSVPCard: any = ({
  eventName,
  location,
  duration,
  action,
  type,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <Layout style={{...styles.jobCard, ...styles.mv20}}>
      <Layout
        style={{
          flexDirection: 'row',
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}>
        <Layout
          style={{
            flexDirection: 'row',
            backgroundColor: 'transparent',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
            {eventName}
          </Text>
        </Layout>
        <Button
          onPress={action}
          style={{
            backgroundColor: theme['color-primary-700'],
            borderRadius: 99,
          }}>
          RSVP
        </Button>
      </Layout>
      <Layout
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '60%',
          backgroundColor: 'transparent',
        }}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
          {location}
        </Text>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
          {duration}
        </Text>
      </Layout>
    </Layout>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    text: {
      color: 'white',
    },
    chip: {
      padding: 8,
      borderRadius: 999,
      color: 'white',
    },
    jobCard: {
      backgroundColor: theme['color-primary-500'],
      padding: 16,
      borderRadius: 8,
      width: '100%',
    },
    mv20: {
      marginVertical: 20,
    },
  });
