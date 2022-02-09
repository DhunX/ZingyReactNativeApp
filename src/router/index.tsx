import React from 'react';
import {useAuth} from '../context/Auth';
import {AppNavigator} from '../navigation/app.navigator';
import {AuthNavigator} from '../navigation/auth.navigator';
import Loading from '../screens/Loading';

const Router = () => {
  const {authData, loading} = useAuth();
  if (loading) {
    return <Loading />;
  }
  return <>{!authData ? <AppNavigator /> : <AuthNavigator />}</>;
};

export default Router;
