import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

//Create the Auth Context with the data type specified
//and a empty object
const AuthContext = createContext({});

const AuthProvider = ({children}) => {
  const [authData, setAuthData] = useState();

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
      const authDataSerialized = await AsyncStorage.getItem('authData');
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

  const signIn = (email, password) => {
    setLoading(true);
    //call the service passing credential (email and password).
    //In a real App this data will be provided by the user from some InputText components.
    axios
      .post('https://api.zingy.com/user-module/login', {
        email,
        password,
      })
      .then(res => {
        setLoading(false);
        //Set the data in the context, so the App can be notified
        //and send the user to the AuthStack
        if (res.data.statusCode === 1) {
          setAuthData(res.data);
          localStorage.setItem('authData', JSON.stringify(res.data));
        } else {
        }
        console.log('Res Data: ', res.data);
      })
      .catch(err => {
        setLoading(false);
      });

    //Persist the data in the Local Storage
    //to be recovered in the next user session.
    // e.g. : LocalStorage.setItem("@AuthData", JSON.stringify(_authData));
  };
  const signInWithGoogle = (email, name) => {
    setLoading(true);
    //call the service passing credential (email and password).
    //In a real App this data will be provided by the user from some InputText components.
    axios
      .post('https://api.zingy.com/user-module/google-login', {
        username: email,
        email,
        name,
      })
      .then(res => {
        setLoading(false);
        //Set the data in the context, so the App can be notified
        //and send the user to the AuthStack
        if (res.data.statusCode === 1) {
          setAuthData(res.data);
          localStorage.setItem('authData', JSON.stringify(res.data));
        } else {
        }
        console.log('Res Data: ', res.data);
      })
      .catch(err => {
        setLoading(false);
      });

    //Persist the data in the Local Storage
    //to be recovered in the next user session.
    // e.g. : LocalStorage.setItem("@AuthData", JSON.stringify(_authData));
  };

  const signOut = async () => {
    setLoading(true);
    //Remove data from context, so the App can be notified
    //and send the user to the AuthStack
    setAuthData(undefined);
    localStorage.removeItem('authData');
    //Remove the data from Async Storage
    //to NOT be recoverede in next session.
    // await AsyncStorage.removeItem("@AuthData");
    setLoading(false);
  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider
      value={{authData, loading, signIn, signOut, signInWithGoogle}}>
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
