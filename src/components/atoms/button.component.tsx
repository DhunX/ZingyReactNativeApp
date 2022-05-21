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

export const Button: any = (props: any) => {
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
