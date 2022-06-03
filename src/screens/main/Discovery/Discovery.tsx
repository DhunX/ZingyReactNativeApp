import React from 'react';
// import {debounce} from 'lodash';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {
  Layout,
  Text,
  Input,
  TopNavigation,
  TopNavigationAction,
  Avatar,
} from '@ui-kitten/components';
import {
  ArrowIosBackIcon,
  ChatIcon,
  SearchIconOutline,
} from '../../../components/icons';
import {SafeAreaLayout} from '../../../components/safe-area-layout.component';
import {getAllUsers} from '../../../services/apis';
import {User} from '../../../types/User';
import {Loading} from '../../Loading';

const token =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aW5neWNsdXN0ZXIiLCJhdWQiOiJ6aW5neW11c2ljIiwic3ViIjoiNjFmYmE2NmFiMjViNzY2YWFiNGFkNjU2IiwiaWF0IjoxNjUzMDQwMzgxLCJleHAiOjE2NTU2MzIzODEsInBybSI6ImJkYmZjMWEzMzdiODRhM2JlZjBlMDg4NTNhZWNjMjI5YjMxOWMyNmI1MWJmZThjZjY3OGNlZTRkZjNhZDcxNWNkYWQ3NDk2YjgxMTJlOTlkYmMzODZmZjUyMTUyY2JjNmY1NTlhYzU4NmE0NTk1NzUyMGEwYTllNDAwZjZkOTUyIn0.e9YnLU6Rbxhyq6KWA2HJCBhecYPuH4wYrpH5ny2ctU0fQTabdICsoNVLsOsBzhvjISFKh2TqttmCGm_knCcCXks-hHht3BhbsK_dG9T1pIW6c15ph4GwubAEOmxg0cVVz7U4GZS58Nl_6WbfoIcfyHIDAJ4ngUISw5MHjyaouPJjYg5ddietfQtx8cAbVtuEEPFbI9D6mxQeUWeUdMMo5M3GLzpV6bd139akfdHNMbW7MiH1cM_Wfr_qiwJkkyL4uqvMybPWCnn82SVC0anLAClhxChEWIQ_eqtOIzcgqYTYm0Uzj7fnREgWkCizqmcIWfzGGKh6tUJgkYqtpVQs_g';

export const Discovery = ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState<string>();
  const [userList, setUserList] = React.useState<User[]>();

  const [loading, setLoading] = React.useState<boolean>(false);

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );
  const renderChatAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ChatIcon}
      onPress={() => navigation.navigate('Chat')}
    />
  );
  // const fetchData = async (query: string, cb: any) => {
  //   const res = await getAllUsers({token, q: query});
  //   cb(res);
  // };
  // const debouncedFetchData = debounce((query: string, cb: any) => {
  //   fetchData(query, cb);
  // }, 500);
  // const handleSearch = ;
  React.useEffect(() => {
    setLoading(true);
    if (searchQuery?.length) {
      getAllUsers({token, q: searchQuery})
        .then(res => {
          setUserList(res.data);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
        });
    } else {
      getAllUsers({token})
        .then(res => {
          setUserList(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.log('Err', err);
          setLoading(false);
        });
    }
    // debouncedFetchData((searchQuery: string, res: User[]) => {
    //   setLoading(false);
    //   setUserList(res);
    // });
  }, [searchQuery]);
  const changeHandler = event => {
    setSearchQuery(event);
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
      <ScrollView style={styles.main}>
        {loading ? (
          <Loading />
        ) : (
          userList?.length &&
          userList?.map((user: User, index: number) => (
            <TouchableOpacity
              style={styles.personList}
              onPress={() =>
                navigation.navigate('PublicProfile', {username: user.username})
              }>
              <View style={styles.avatarCircle}>
                <Avatar
                  style={styles.avatar}
                  resizeMethod="resize"
                  resizeMode="contain"
                  source={{
                    uri: user?.profilePicUrl?.length
                      ? user.profilePicUrl
                      : 'https://zingy-public-media.s3.ap-south-1.amazonaws.com/placeholder_dp.jpeg',
                  }}
                />
              </View>
              <Text style={styles.personName} key={index}>
                {user.name}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
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
    padding: 16,
    width: '100%',
  },
  main: {
    padding: 16,
    width: '100%',
  },
  text: {
    textAlign: 'center',
  },
  likeButton: {
    marginVertical: 16,
  },
  personList: {
    borderColor: '#ccc',
    borderBottomWidth: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  personName: {
    fontWeight: '700',
    marginLeft: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    tintColor: null,
    padding: 2,
  },
  avatarCircle: {
    marginRight: 10,
    width: 50,
    height: 50,
    borderRadius: 99,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 2,
  },
});
