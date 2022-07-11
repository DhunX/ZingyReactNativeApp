import React from 'react';
import {AppearanceProvider} from 'react-native-appearance';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import {Amplify} from 'aws-amplify';
import PubSub from '@aws-amplify/pubsub';
import config from './aws-exports';
// import {withAuthenticator} from 'aws-amplify-react';

import {default as theme} from './custom-theme.json';

import {AuthProvider} from './context/auth';
import Navigation from './navigation';

import {OnboardingSlider} from './screens/OnboardingSlider';
import {Loading} from './screens/Loading';

export const ThemeModeContext = React.createContext<{
  mode: string;
  setMode: (mode: string) => void;
}>({
  mode: 'light',
  setMode: () => {},
});

Amplify.configure(config);

export default (): React.ReactElement => {
  const [themeMode, setThemeMode] = React.useState('light');
  const [isOnboarding, setIsOnboarding] = React.useState(null);
  React.useEffect(() => {
    AsyncStorage.getItem('isOnboarding')
      .then(value => {
        if (value === null) {
          setIsOnboarding(true);
          AsyncStorage.setItem('isOnboarding', 'true');
        } else {
          setIsOnboarding(value);
        }
      })
      .catch(console.log);
  });
  if (isOnboarding === null) {
    return <Loading />;
  }

  if (isOnboarding === 'true') {
    return <OnboardingSlider setIsOnboarding={setIsOnboarding} />;
  }
  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <AppearanceProvider>
        <ApplicationProvider
          {...eva}
          theme={
            themeMode === 'dark'
              ? {...eva.dark, ...theme}
              : {...eva.light, ...theme}
          }>
          <AuthProvider>
            <ThemeModeContext.Provider
              value={{
                mode: themeMode,
                setMode: (e: string): void => setThemeMode(e),
              }}>
              <Navigation />
              <Toast />
            </ThemeModeContext.Provider>
          </AuthProvider>
        </ApplicationProvider>
      </AppearanceProvider>
    </React.Fragment>
  );
};
