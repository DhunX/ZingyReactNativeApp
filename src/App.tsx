import React from 'react';
import {AppearanceProvider} from 'react-native-appearance';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';

import {AuthProvider} from './context/Auth';
import Navigation from './navigation';

export const ThemeModeContext = React.createContext<{
  mode: string;
  setMode: (mode: string) => void;
}>({
  mode: 'light',
  setMode: () => {},
});

export default (): React.ReactElement => {
  const [themeMode, setThemeMode] = React.useState('light');
  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <AppearanceProvider>
        <ApplicationProvider
          {...eva}
          theme={themeMode === 'dark' ? eva.dark : eva.light}>
          <AuthProvider>
            <ThemeModeContext.Provider
              value={{
                mode: themeMode,
                setMode: (e: string): void => setThemeMode(e),
              }}>
              <Navigation />
            </ThemeModeContext.Provider>
          </AuthProvider>
        </ApplicationProvider>
      </AppearanceProvider>
    </React.Fragment>
  );
};
