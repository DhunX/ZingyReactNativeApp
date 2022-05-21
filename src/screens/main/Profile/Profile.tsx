import React from 'react';
import {StyleSheet, ScrollView, Image, View} from 'react-native';
import {
  Button,
  Divider,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  OverflowMenu,
  OverflowMenuElement,
  MenuItem,
} from '@ui-kitten/components';
import {useAuth} from '../../../context/auth';
import {SafeAreaLayout} from '../../../components/safe-area-layout.component';
import {
  ArrowIosBackIcon,
  MoreVerticalIcon,
  SettingsIcon,
} from '../../../components/icons';

export const Profile = ({navigation}): JSX.Element => {
  const {authData} = useAuth();

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
            <Text style={styles.profileName}>
              {authData.data.user.tag || 'Drummer, Guitarist'}
            </Text>
            <View style={{flexDirection: 'row', width: '100%'}}>
              {/* <Text style={styles.profileEmail}>anandjeechoubey@gmail.com</Text> */}
              <Text>{'Followers 450'}</Text>
              <View style={styles.verticleLine}></View>
              <Text>{'Tracks 72'}</Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Button onPress={handleFollowPressed}>Follow</Button>
              <OverflowMenu
                visible={visible}
                selectedIndex={selectedIndex}
                // anchor={() => <MoreVerticalIcon />}
                anchor={() => <Button>Yo</Button>}
                onBackdropPress={toggleMenu}>
                <MenuItem key={0} title={'Add to fav'} />
                <MenuItem key={1} title={'Share'} />
                <MenuItem key={2} title={'Report'} />
              </OverflowMenu>
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
    borderColor: '#5123A4',
    borderWidth: 4,
    backgroundColor: '#fff',
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
  profileName: {},
  verticleLine: {
    height: '100%',
    width: 1,
    backgroundColor: '#909090',
  },
});
