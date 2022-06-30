/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  RefreshControl,
} from 'react-native';
import {
  Button as EvaButton,
  Divider,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  // OverflowMenu,
  // OverflowMenuElement,
  // MenuItem,
  useTheme,
  TabView,
  Tab,
  IndexPath,
  List,
  Card,
} from '@ui-kitten/components';
import {useAuth} from '../../../context/auth';
import {SafeAreaLayout} from '../../../components/safe-area-layout.component';
import {
  ArrowIosBackIcon,
  MoreVerticalIcon,
  ChatIcon,
  // SettingsIcon,
} from '../../../components/icons';
import {Button} from '../../../components/atoms/button.component';
import {Tile} from '../../../components/atoms/tile.component';
import {SocialButton} from '../../../components/atoms/social-button.component';
import {Chip} from '../../../components/atoms/chip.component';
import {followUser, getAllUsers} from '../../../services/apis';
import {User} from '../../../types/User';
import {Loading} from '../../Loading';
import Toast from 'react-native-toast-message';

export const ProfilePublic = ({route, navigation}): JSX.Element => {
  const {accessToken, authData} = useAuth();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [following, setFollowing] = React.useState<boolean>(false);

  const {username} = route.params;
  const [user, setUser] = React.useState<User>();
  const theme = useTheme();

  // const [visible, setVisible] = React.useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath>(null);

  // const toggleMenu = (): void => {
  //   setVisible(e => !e);
  // };

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );
  // const renderSettingsAction = (): React.ReactElement => (
  //   <TopNavigationAction
  //     icon={SettingsIcon}
  //     onPress={() => navigation.navigate('Settings')}
  //   />
  // );

  React.useEffect(() => {
    setLoading(true);
    getAllUsers({token: accessToken, username})
      .then(res => {
        setUser(res.data);
        setLoading(false);
        if (res.data.followers.users.includes(authData.data.user._id)) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [accessToken, username]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAllUsers({token: accessToken, username})
      .then(res => {
        setRefreshing(false);
        setUser(res.data);
        if (res.data.followers.users.includes(authData.data.user._id)) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      })
      .catch(err => {
        console.log(err);
        setRefreshing(false);
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Some Error Occurred',
        });
      });
  }, []);

  const handleFollow = async () => {
    const follow = following;
    try {
      const {data} = await followUser({userId: user._id, token: accessToken});
      if (data.message === 'success') {
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: !follow ? 'Followed Successfully' : 'Unfollowed Successfully',
        });
        if (follow) {
          user.followers.count--;
        } else {
          user.followers.count++;
        }
        setFollowing(e => !e);
      } else {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Some Error Occurred',
        });
      }
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Some Error Occurred',
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaLayout insets="top">
      <TopNavigation
        title={`@${username}`}
        accessoryLeft={renderBackAction}
        // accessoryRight={renderSettingsAction}
      />
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* <ProfileImage /> */}
        <View style={styles.profileContainer}>
          <View
            style={{
              backgroundColor: user?.profilePicUrl?.length ? '#fff' : '#F0EFEB',
              ...styles.profileHeader,
            }}>
            <Image
              source={{
                uri: user?.profilePicUrl?.length
                  ? user.profilePicUrl
                  : 'https://zingy-public-media.s3.ap-south-1.amazonaws.com/placeholder_dp.jpeg',
              }}
              style={styles.profileImage}
              resizeMethod="resize"
              resizeMode="contain"
            />
          </View>
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>{user?.name}</Text>
            <Text style={styles.profileTag}>{user?.location}</Text>
            <Text style={styles.profileTag}>{user?.interests?.join(', ')}</Text>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 'auto',
                ...styles.connections,
              }}>
              {/* <Text style={styles.profileEmail}>anandjeechoubey@gmail.com</Text> */}
              <Text
                style={{
                  color: theme['color-primary-600'],
                  fontSize: 16,
                  fontWeight: '600',
                }}>
                {`Followers ${user?.followers?.count}`}
              </Text>
              <View style={styles.verticleLine} />
              <Text
                style={{
                  color: theme['color-primary-600'],
                  fontSize: 16,
                  fontWeight: '600',
                }}>
                {`Tracks ${user?.tracks?.length}`}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                height: 60,
                padding: 16,
              }}>
              <EvaButton
                appearance={following ? 'outline' : 'filled'}
                style={{
                  backgroundColor: following
                    ? '#fff'
                    : theme['color-primary-600'],
                }}
                onPress={() => {
                  handleFollow();
                }}>
                {!following ? 'Follow' : 'Following'}
              </EvaButton>
              <Layout style={{display: 'flex', flexDirection: 'row'}}>
                <Button
                  color="black"
                  appearance="ghost"
                  style={{width: 40}}
                  icon={ChatIcon}
                />
                <Button
                  color="black"
                  style={{width: 40}}
                  appearance="ghost"
                  icon={MoreVerticalIcon}
                />
              </Layout>
              {/* <OverflowMenu
                visible={visible}
                selectedIndex={selectedIndex}
                // anchor={() => <MoreVerticalIcon />}
                anchor={() => <Button>Yo</Button>}
                onBackdropPress={toggleMenu}>
                <MenuItem key={0} title={'Add to fav'} />
                <MenuItem key={1} title={'Share'} />
                <MenuItem key={2} title={'Report'} />
              </OverflowMenu> */}
            </View>
          </View>
        </View>
        <TabView selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
          <Tab title="Posts">
            {user?.posts?.length > 0 ? (
              <Layout style={styles.tabViewStyle}>
                <List
                  data={user?.posts}
                  numColumns={3}
                  renderItem={info => (
                    <Card style={styles.item}>
                      <Text>{info.item.description}</Text>
                    </Card>
                  )}
                />
              </Layout>
            ) : (
              <Layout style={styles.noContentView}>
                <Text>No Posts Yet...</Text>
              </Layout>
            )}
          </Tab>
          <Tab title="Tracks">
            {user?.tracks?.length > 0 ? (
              <Layout style={styles.tabViewStyle}>
                <Text>Tab 2</Text>
              </Layout>
            ) : (
              <Layout style={styles.noContentView}>
                <Text>No Tracks Yet...</Text>
              </Layout>
            )}
          </Tab>
          <Tab title="About">
            <Layout style={styles.tabViewStyle}>
              <Tile style={styles.mb8}>
                <Text style={styles.mb4} category={'h6'}>
                  Bio
                </Text>
                <Text category={'p1'}>{user?.bio}</Text>
              </Tile>
              <Tile style={styles.mb8}>
                <Text style={styles.mb4} category={'h6'}>
                  Genre
                </Text>
                <Layout style={styles.genereChips}>
                  {user?.genere?.map((gen, index) => (
                    <Chip key={index} style={styles.mr12} text={gen} />
                  ))}
                </Layout>
              </Tile>
              <Layout style={styles.mv12}>
                <Text category={'h6'}>Social</Text>
                <Layout style={styles.socialContainer}>
                  <SocialButton text="Instagram" />
                  <SocialButton text="Spotify" />
                  <SocialButton text="Soundcloud" />
                  <SocialButton text="YouTube" />
                </Layout>
              </Layout>
            </Layout>
          </Tab>
        </TabView>
        <Divider />
      </ScrollView>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  likeButton: {
    marginVertical: 16,
  },
  mb8: {
    marginBottom: 8,
  },
  mb4: {
    marginBottom: 4,
  },
  mv12: {
    marginVertical: 12,
  },
  mr12: {
    marginRight: 12,
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  profileHeader: {
    padding: 4,
    borderRadius: 9999,
    tintColor: null,
    borderColor: '#aaa',
    borderWidth: 1,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 16,
    justifyContent: 'center',
  },
  profileDetails: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  profileTag: {
    marginBottom: 8,
    fontSize: 14,
  },
  connections: {
    color: '#aaa',
    marginBottom: 16,
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    aspectRatio: 1.0,
    margin: 0,
    maxWidth: '33%',
  },
  scrollView: {
    flexGrow: 1,
    minHeight: '100%',
  },
  text: {
    textAlign: 'center',
    marginBottom: 16,
  },
  tabViewStyle: {
    padding: 16,
  },
  verticleLine: {
    height: '100%',
    width: 2,
    marginHorizontal: 8,
    backgroundColor: '#ccc',
  },
  whiteText: {
    color: '#fff',
  },
  socialContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 128,
  },
  genereChips: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  noContentView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 128,
  },
});
