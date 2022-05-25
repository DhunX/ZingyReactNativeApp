import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AuthData, authServices} from '../services/authServices';

type AuthContextData = {
  authData?: AuthData;
  accessToken?: string;
  refreshToken?: string;
  loading: boolean;
  signUp(email: string, password: string, name?: string): Promise<void>;
  logInGoogle(email: string, name?: string): Promise<void>;
  logIn(email: string, password: string, navigation: any): Promise<void>;
  signOut(navigation: any): void;
};

//Create the Auth Context with the data type specified
//and a empty object
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
  const [authData, setAuthData] = useState<AuthData>();
  const [accessToken, setAccessToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();

  //the AuthContext start with loading equals true
  //and stay like this, until the data be load from Async Storage
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Every time the App is opened, this provider is rendered
    //and call de loadStorage function.
    loadStorageData();
  }, []);

  async function loadStorageData() {
    try {
      //Try get the auth data - from Local Storage
      const authDataSerialized = await AsyncStorage.getItem('@AuthData');
      AsyncStorage.getItem('@ZingyAccessToken')
        .then(res => setAccessToken(res))
        .catch(console.log);
      AsyncStorage.getItem('@ZingyRefreshToken')
        .then(res => setRefreshToken(res))
        .catch(console.log);
      if (authDataSerialized) {
        //If there are data, it's converted to an Object and the state is updated.
        const _authData = JSON.parse(authDataSerialized);
        setAuthData(_authData);
      }
    } catch (error) {
      console.log('AsyncStorageLoadingDataErr:', error);
    } finally {
      //loading finished
      setLoading(false);
    }
  }

  const logIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const _authData = await authServices.logInBasic(email, password);
      setAuthData(_authData.data);
      AsyncStorage.setItem('@AuthData', JSON.stringify(_authData.data));
      AsyncStorage.setItem(
        '@ZingyAccessToken',
        _authData.data.data.tokens.accessToken,
      );
      setAccessToken(_authData.data.data.tokens.accessToken);
      setRefreshToken(_authData.data.data.tokens.refreshToken);
      AsyncStorage.setItem(
        '@ZingyRefreshToken',
        _authData.data.data.tokens.refreshToken,
      );
    } catch (error) {
      console.log('AsyncStorageSavingDataErr:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    setLoading(true);
    //call the service passing credential (email and password).
    //In a real App this data will be provided by the user from some InputText components.
    try {
      const _authData = await authServices.signUp(
        email,
        password,
        name ? name : email,
      );
      setAuthData(_authData.data);
      AsyncStorage.setItem('@AuthData', JSON.stringify(_authData.data));
      AsyncStorage.setItem(
        '@ZingyAccessToken',
        _authData.data.data.tokens.accessToken,
      );
      setAccessToken(_authData.data.data.tokens.accessToken);
      setRefreshToken(_authData.data.data.tokens.refreshToken);
      AsyncStorage.setItem(
        '@ZingyRefreshToken',
        _authData.data.data.tokens.refreshToken,
      );
    } catch (error) {
      console.log('AsyncStorageSavingDataErr:', error);
    } finally {
      setLoading(false);
    }
    //Set the data in the context, so the App can be notified
    //and send the user to the AuthStack

    //Persist the data in the Local Storage
    //to be recovered in the next user session.
    // e.g. : LocalStorage.setItem("@AuthData", JSON.stringify(_authData));
  };
  const logInGoogle = async (email: string, name?: string) => {
    setLoading(true);
    //call the service passing credential (email and password).
    //In a real App this data will be provided by the user from some InputText components.

    try {
      const _authData = await authServices.signUpWithGoogle(email, name);
      setAuthData(_authData.data);
      AsyncStorage.setItem('@AuthData', JSON.stringify(_authData.data));
    } catch (err) {
      console.log('AsyncStorageSavingDataErr:', err);
    } finally {
      setLoading(false);
    }
    //Persist the data in the Local Storage
    //to be recovered in the next user session.
    // e.g. : LocalStorage.setItem("@AuthData", JSON.stringify(_authData));
  };

  const signOut = async (navigation: any) => {
    setLoading(true);
    //Remove data from context, so the App can be notified
    //and send the user to the AuthStack
    try {
      setAuthData(undefined);
      await AsyncStorage.removeItem('@AuthData');
      await AsyncStorage.removeItem('@ZingyAccessToken');
      await AsyncStorage.removeItem('@ZingyRefreshToken');
      navigation.navigate('SignUp');
    } catch (error) {
      console.log('AsyncStorageRemoveItemErr:', error);
    } finally {
      setLoading(false);
    }
    //Remove the data from Async Storage
    //to NOT be recoverede in next session.
  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider
      value={{
        authData,
        accessToken,
        refreshToken,
        loading,
        logIn,
        logInGoogle,
        signUp,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

//A simple hooks to facilitate the access to the AuthContext
// and permit components to subscribe to AuthContext updates
const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export {AuthContext, AuthProvider, useAuth};
