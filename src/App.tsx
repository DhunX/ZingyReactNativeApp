import React from 'react';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';

import Main from './screens/main';

export default (): JSX.Element => (
  <React.Fragment>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.dark}>
      {/* <SafeAreaProvider> */}
      <Main />
      {/* </SafeAreaProvider> */}
    </ApplicationProvider>
  </React.Fragment>
);
