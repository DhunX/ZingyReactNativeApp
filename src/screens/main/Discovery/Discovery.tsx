import React from 'react';
import {debounce} from 'lodash';
import {ImageProps, StyleSheet, View} from 'react-native';
import {
  Button,
  Icon,
  Layout,
  Text,
  Input,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {
  ArrowIosBackIcon,
  ChatIcon,
  SearchIconOutline,
} from '../../../components/icons';
import {SafeAreaLayout} from '../../../components/safe-area-layout.component';
import {getAllUsers, getCities} from '../../../services/apis';

export const Discovery = ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState<string>();
  const [userList, setUserList] = React.useState<any>([]);

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );
  const renderChatAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ChatIcon}
      onPress={() => navigation.navigate('Chat')}
    />
  );
  // const handleSearch = ;
  // React.useEffect(() => {
  //   debounce(() => {
  //     console.log('Search Pressed');
  //   }, 500);
  // }, [searchQuery]);
  const debouncedSearch = React.useRef(
    debounce(text => {
      console.log(text);
      getCities()
        .then(res => {
          console.log('CitiRes:', res);
        })
        .catch(err => {
          console.log('CitiErr:', err);
        });
      // getAllUsers(
      //   'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aW5neWNsdXN0ZXIiLCJhdWQiOiJ6aW5neW11c2ljIiwic3ViIjoiNjFmYmE2NmFiMjViNzY2YWFiNGFkNjU2IiwiaWF0IjoxNjUzMDQwMzgxLCJleHAiOjE2NTU2MzIzODEsInBybSI6ImJkYmZjMWEzMzdiODRhM2JlZjBlMDg4NTNhZWNjMjI5YjMxOWMyNmI1MWJmZThjZjY3OGNlZTRkZjNhZDcxNWNkYWQ3NDk2YjgxMTJlOTlkYmMzODZmZjUyMTUyY2JjNmY1NTlhYzU4NmE0NTk1NzUyMGEwYTllNDAwZjZkOTUyIn0.e9YnLU6Rbxhyq6KWA2HJCBhecYPuH4wYrpH5ny2ctU0fQTabdICsoNVLsOsBzhvjISFKh2TqttmCGm_knCcCXks-hHht3BhbsK_dG9T1pIW6c15ph4GwubAEOmxg0cVVz7U4GZS58Nl_6WbfoIcfyHIDAJ4ngUISw5MHjyaouPJjYg5ddietfQtx8cAbVtuEEPFbI9D6mxQeUWeUdMMo5M3GLzpV6bd139akfdHNMbW7MiH1cM_Wfr_qiwJkkyL4uqvMybPWCnn82SVC0anLAClhxChEWIQ_eqtOIzcgqYTYm0Uzj7fnREgWkCizqmcIWfzGGKh6tUJgkYqtpVQs_g',
      // )
      //   .then(res => {
      //     setUserList(res.data);
      //     console.log('Resp:', res);
      //   })
      //   .catch(err => {
      //     console.log('Err', err);
      //   });
    }, 600),
  ).current;
  React.useEffect(() => {
    // console.log('Search Pressed');
    const data = getAllUsers(
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aW5neWNsdXN0ZXIiLCJhdWQiOiJ6aW5neW11c2ljIiwic3ViIjoiNjFmYmE2NmFiMjViNzY2YWFiNGFkNjU2IiwiaWF0IjoxNjUzMDQwMzgxLCJleHAiOjE2NTU2MzIzODEsInBybSI6ImJkYmZjMWEzMzdiODRhM2JlZjBlMDg4NTNhZWNjMjI5YjMxOWMyNmI1MWJmZThjZjY3OGNlZTRkZjNhZDcxNWNkYWQ3NDk2YjgxMTJlOTlkYmMzODZmZjUyMTUyY2JjNmY1NTlhYzU4NmE0NTk1NzUyMGEwYTllNDAwZjZkOTUyIn0.e9YnLU6Rbxhyq6KWA2HJCBhecYPuH4wYrpH5ny2ctU0fQTabdICsoNVLsOsBzhvjISFKh2TqttmCGm_knCcCXks-hHht3BhbsK_dG9T1pIW6c15ph4GwubAEOmxg0cVVz7U4GZS58Nl_6WbfoIcfyHIDAJ4ngUISw5MHjyaouPJjYg5ddietfQtx8cAbVtuEEPFbI9D6mxQeUWeUdMMo5M3GLzpV6bd139akfdHNMbW7MiH1cM_Wfr_qiwJkkyL4uqvMybPWCnn82SVC0anLAClhxChEWIQ_eqtOIzcgqYTYm0Uzj7fnREgWkCizqmcIWfzGGKh6tUJgkYqtpVQs_g',
    );
    setUserList(data);
    return () => {
      debouncedSearch.cancel();
      setSearchQuery('');
    };
  }, [debouncedSearch]);
  // console.log('userList', userList);
  const changeHandler = event => {
    setSearchQuery(event);
    debouncedSearch(event);
  };
  return (
    <SafeAreaLayout insets="top" style={styles.container}>
      <TopNavigation
        accessoryLeft={renderBackAction}
        accessoryRight={renderChatAction}
      />
      <Layout style={styles.header} level="1">
        <Input
          placeholder="Search"
          value={searchQuery}
          onChangeText={changeHandler}
          accessoryRight={SearchIconOutline}
        />
      </Layout>
      <View style={styles.main}>
        <Text style={styles.text} category="s1">
          This is a Discovery app for Zingy.
        </Text>
      </View>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    width: '100%',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  likeButton: {
    marginVertical: 16,
  },
});
