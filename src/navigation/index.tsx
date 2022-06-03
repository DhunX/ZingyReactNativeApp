import React from 'react';
import {useAuth} from '../context/auth';
import {AppNavigator} from './app.navigator';
import {AuthNavigator} from './auth.navigator';
import {Loading} from '../screens/Loading';
import {NoAccess} from '../screens/NoAccess';

const Router = () => {
  const {authData, loading, hasAccess} = useAuth();
  if (loading) {
    return <Loading />;
  }
  if (!authData) {
    return <AuthNavigator />;
  }
  return <>{hasAccess ? <AppNavigator /> : <NoAccess />}</>;
};

export default Router;
