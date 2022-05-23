import React from 'react';
import {Card as EvaCard} from '@ui-kitten/components';

export const Tile: any = ({children, interactions = false, ...props}) => {
  return (
    <EvaCard
      {...props}
      style={[
        props.style,
        {
          padding: 3,
          borderRadius: 0,
          backgroundColor: 'rgba(180, 79, 255, 0.07)',
          color: 'white',
        },
      ]}>
      {children}
    </EvaCard>
  );
};
