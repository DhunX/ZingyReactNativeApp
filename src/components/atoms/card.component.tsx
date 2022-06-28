/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Card as EvaCard,
  Button as EvaButton,
  Layout,
  Text,
  useTheme,
  Icon,
  IconElement,
} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {Interactions} from '../molecules/interactions.componets';

const Button: any = (props: any) => {
  const theme = useTheme();
  const {style, icon, ...rest} = props;
  const buttonStyle = [
    {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      padding: 0,
      margin: 0,
    },
    style,
  ];
  return <EvaButton accessoryLeft={icon} {...rest} style={buttonStyle} />;
};

export const Card: any = ({
  children,
  navigation,
  interactions = false,
  ...props
}) => {
  const theme = useTheme();
  return (
    <EvaCard
      {...props}
      style={[
        props.style,
        {
          padding: 1,
          backgroundColor: theme['background-basic-1'],
          color: theme['text-basic-1'],
          borderRadius: 16,
          width: '100%',
          // shadowColor: theme['shadow-basic-color-1'],
          // shadowOffset: {
          //   width: 0,
          //   height: 2,
          // },
          // shadowOpacity: 0.25,
          // shadowRadius: 3.84,
          elevation: 5,
        },
      ]}>
      {children}
      {interactions && <Interactions navigation={navigation} />}
    </EvaCard>
  );
};
