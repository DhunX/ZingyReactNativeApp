/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, ScrollView, Image, View} from 'react-native';
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
} from '@ui-kitten/components';
import {useAuth} from '../../../context/auth';
import {SafeAreaLayout} from '../../../components/safe-area-layout.component';
import {
  ArrowIosBackIcon,
  MoreVerticalIcon,
  SettingsIcon,
} from '../../../components/icons';
import {Button} from '../../../components/atoms/button.component';
import {Tile} from '../../../components/atoms/tile.component';
import {SocialButton} from '../../../components/atoms/social-button.component';
import {Chip} from '../../../components/atoms/chip.component';
import {getMyInfo} from '../../../services/apis';
import {User} from '../../../types/User';

export const Profile = ({navigation}): JSX.Element => {
  const {authData} = useAuth();

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
  const renderSettingsAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={SettingsIcon}
      onPress={() => navigation.navigate('Settings')}
    />
  );

  React.useEffect(() => {
    getMyInfo(
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aW5neWNsdXN0ZXIiLCJhdWQiOiJ6aW5neW11c2ljIiwic3ViIjoiNjFmYmE2NmFiMjViNzY2YWFiNGFkNjU2IiwiaWF0IjoxNjUzMDQwMzgxLCJleHAiOjE2NTU2MzIzODEsInBybSI6ImJkYmZjMWEzMzdiODRhM2JlZjBlMDg4NTNhZWNjMjI5YjMxOWMyNmI1MWJmZThjZjY3OGNlZTRkZjNhZDcxNWNkYWQ3NDk2YjgxMTJlOTlkYmMzODZmZjUyMTUyY2JjNmY1NTlhYzU4NmE0NTk1NzUyMGEwYTllNDAwZjZkOTUyIn0.e9YnLU6Rbxhyq6KWA2HJCBhecYPuH4wYrpH5ny2ctU0fQTabdICsoNVLsOsBzhvjISFKh2TqttmCGm_knCcCXks-hHht3BhbsK_dG9T1pIW6c15ph4GwubAEOmxg0cVVz7U4GZS58Nl_6WbfoIcfyHIDAJ4ngUISw5MHjyaouPJjYg5ddietfQtx8cAbVtuEEPFbI9D6mxQeUWeUdMMo5M3GLzpV6bd139akfdHNMbW7MiH1cM_Wfr_qiwJkkyL4uqvMybPWCnn82SVC0anLAClhxChEWIQ_eqtOIzcgqYTYm0Uzj7fnREgWkCizqmcIWfzGGKh6tUJgkYqtpVQs_g',
    )
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [authData.token]);

  return (
    <SafeAreaLayout insets="top">
      <TopNavigation
        title="Profile"
        accessoryLeft={renderBackAction}
        accessoryRight={renderSettingsAction}
      />
      <ScrollView style={styles.scrollView}>
        {/* <ProfileImage /> */}
        <View style={styles.profileContainer}>
          <View style={styles.profileHeader}>
            <Image
              source={{
                uri: user?.profilePicUrl,
              }}
              style={styles.profileImage}
              resizeMethod="resize"
              resizeMode="contain"
            />
          </View>
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>{user?.name}</Text>
            <Text style={styles.profileTag}>
              {user?.location || 'Delhi, India'}
            </Text>
            <Text style={styles.profileTag}>
              {user?.interests?.join(', ') || 'Drummer, Guitarist'}
            </Text>
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
                {'Followers 450'}
              </Text>
              <View style={styles.verticleLine} />
              <Text
                style={{
                  color: theme['color-primary-600'],
                  fontSize: 16,
                  fontWeight: '600',
                }}>
                {'Tracks 72'}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                position: 'relative',
                height: 60,
                marginTop: 12,
              }}>
              <Button
                style={{position: 'absolute', right: 10}}
                color="black"
                icon={MoreVerticalIcon}
              />
              <EvaButton
                appearance="outline"
                style={{
                  backgroundColor: 'transparent',
                  position: 'absolute',
                  left: '50%',
                  transform: [{translateX: -50}],
                }}
                onPress={() => navigation.navigate('EditProfileScreen')}>
                Edit Profile
              </EvaButton>
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
              {/* <MoreVerticalIcon /> */}
            </View>
          </View>
        </View>
        <TabView selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
          <Tab title="Posts">
            <Layout style={styles.tabViewStyle}>
              <Text>Tab 1</Text>
            </Layout>
          </Tab>
          <Tab title="Tracks">
            <Layout style={styles.tabViewStyle}>
              <Text>Tab 2</Text>
            </Layout>
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
  scrollView: {
    flexGrow: 1,
    minHeight: '100%',
  },
  text: {
    textAlign: 'center',
    marginBottom: 16,
  },
  likeButton: {
    marginVertical: 16,
  },
  profileImage: {
    width: 72,
    height: 72,
  },
  profileHeader: {
    padding: 16,
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
  verticleLine: {
    height: '100%',
    width: 2,
    marginHorizontal: 8,
    backgroundColor: '#ccc',
  },
  tabViewStyle: {
    padding: 16,
  },
  whiteText: {
    color: '#fff',
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
});
