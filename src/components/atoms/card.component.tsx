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

export const Card: any = ({children, interactions = false, ...props}) => {
  const theme = useTheme();
  return (
    <EvaCard
      {...props}
      style={[
        props.style,
        {
          padding: 3,
          backgroundColor: theme['color-primary-900'],
          color: 'white',
          borderRadius: 16,
        },
      ]}>
      {children}
      {interactions && <Interactions />}
    </EvaCard>
  );
};
