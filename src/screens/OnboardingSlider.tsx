import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

export const OnboardingSlider = ({setIsOnboarding}) => {
  const [clicks, setClicks] = React.useState(0);
  const handleDone = () => {
    AsyncStorage.setItem('isOnboarding', 'false');
    setIsOnboarding(false);
  };
  return (
    <Onboarding
      onDone={handleDone}
      onSkip={handleDone}
      bottomBarHighlight={false}
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={{
                uri: 'https://zingy-public-media.s3.ap-south-1.amazonaws.com/Zingy.png',
              }}
            />
          ),
          title: 'Welcome',
          subtitle:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={{
                uri: 'https://zingy-public-media.s3.ap-south-1.amazonaws.com/Zingy.png',
              }}
            />
          ),
          title: 'Connect',
          subtitle:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={{
                uri: 'https://zingy-public-media.s3.ap-south-1.amazonaws.com/Zingy.png',
              }}
            />
          ),
          title: 'Collab',
          subtitle:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={{
                uri: 'https://zingy-public-media.s3.ap-south-1.amazonaws.com/Zingy.png',
              }}
            />
          ),
          title: 'Create',
          subtitle:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
        },
      ]}
    />
  );
};
