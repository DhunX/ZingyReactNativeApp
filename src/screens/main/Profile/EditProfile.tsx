import React from 'react';
import {StyleSheet, ScrollView, Image, View} from 'react-native';
import {
  Button,
  Divider,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components';
import {useAuth} from '../../../context/auth';
import {SafeAreaLayout} from '../../../components/safe-area-layout.component';
import {
  ArrowIosBackIcon,
  MoreVerticalIcon,
  SettingsIcon,
} from '../../../components/icons';

export const EditProfileScreen = ({navigation}): JSX.Element => {
  const {authData} = useAuth();
  const theme = useTheme();

  const [visible, setVisible] = React.useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath>(null);

  const toggleMenu = (): void => {
    setVisible(!visible);
  };

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );
  const renderSettingsAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={SettingsIcon}
      onPress={() => navigation.navigate('Settings')}
    />
  );

  const ProfileImage = (): React.ReactElement => (
    <Image
      style={styles.profileImage}
      source={{
        uri: 'https://zingy-public-media.s3.ap-south-1.amazonaws.com/Zingy.png',
      }}
      // resizeMode="cover"
      resizeMethod="scale"
    />
  );

  const handleFollowPressed = (): void => {
    console.log('Follow Pressed');
  };

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
                uri: 'https://zingy-public-media.s3.ap-south-1.amazonaws.com/Zingy.png',
              }}
              style={styles.profileImage}
              resizeMethod="resize"
              resizeMode="contain"
            />
          </View>
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>{authData.data.user.name}</Text>
            <Text style={styles.profileTag}>
              {authData.data.user.tag || 'Drummer, Guitarist'}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
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
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Button
                appearance="outline"
                style={{backgroundColor: 'white'}}
                onPress={() => navigation.navigate('Settings')}>
                Edit Profile
              </Button>
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
        <Layout style={styles.container}>
          <Text style={styles.text} category="s1">
            This is a your Zingy Profile.
          </Text>
        </Layout>
        <Divider />
        <Layout style={styles.container}>
          <Text style={styles.text} category="s1">
            Name: {authData.data.user.name}
          </Text>
        </Layout>
      </ScrollView>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    minHeight: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    margin: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
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
    marginTop: 16,
    justifyContent: 'center',
  },
  profileDetails: {
    alignItems: 'center',
    justifyContent: 'center',
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
});
