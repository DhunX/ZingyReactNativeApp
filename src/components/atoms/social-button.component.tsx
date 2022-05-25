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
import {TouchableOpacity} from 'react-native';

export const SocialButton: any = (props: any) => {
  const theme = useTheme();
  const {style, icon, text, ...rest} = props;
  const buttonStyle = [
    {
      backgroundColor: 'transparent',
      borderColor: theme['color-primary-900'],
      borderWidth: 1,
      paddingVertical: 14,
      margin: 0,
      width: 80,
      height: 80,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column-reverse',
      borderRadius: 12,
    },
    style,
  ];
  return (
    <TouchableOpacity style={buttonStyle}>
      {icon}
      <Text
        style={{color: theme['color-primary-900'], fontSize: 12}}
        category="p2">
        {text}
      </Text>
    </TouchableOpacity>
  );
};
