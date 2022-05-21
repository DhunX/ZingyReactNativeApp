import React from 'react';
import {useAuth} from '../context/auth';
import {AppNavigator} from './app.navigator';
import {AuthNavigator} from './auth.navigator';
import {Loading} from '../screens/Loading';

const Router = () => {
  const {authData, loading} = useAuth();
  if (loading) {
    return <Loading />;
  }
  return <>{authData ? <AppNavigator /> : <AuthNavigator />}</>;
};

export default Router;
