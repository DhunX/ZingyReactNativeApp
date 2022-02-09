import React from 'react';
import {AppearanceProvider} from 'react-native-appearance';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';

import {AppNavigator} from './navigation/app.navigator';
import {AuthNavigator} from './navigation/auth.navigator';
import {AuthProvider, useAuth} from './context/Auth';
import Router from './router';

export default (): JSX.Element => {
  const {} = useAuth();
  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <AppearanceProvider>
        <ApplicationProvider {...eva} theme={eva.dark}>
          <AuthProvider>
            <SafeAreaProvider>
              {/* <AppNavigator /> */}
              <Router />
              {/* <AuthNavigator /> */}
            </SafeAreaProvider>
          </AuthProvider>
        </ApplicationProvider>
      </AppearanceProvider>
    </React.Fragment>
  );
};
