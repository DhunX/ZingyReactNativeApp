import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Bar} from 'react-native-progress';
import {
  Button,
  Divider,
  IndexPath,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components';
import {Storage} from 'aws-amplify';

import {useAuth} from '../../../context/auth';
import {SafeAreaLayout} from '../../../components/safe-area-layout.component';
import {
  ArrowIosBackIcon,
  MoreVerticalIcon,
  SettingsIcon,
} from '../../../components/icons';
import {fetchResourceFromURI} from '../../../utils/file';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';

export const EditProfileScreen = ({route, navigation}): JSX.Element => {
  const refRBSheet = useRef();
  const user = route.params.user;
  const {authData} = useAuth();
  const [asset, setAsset] = useState<any>();
  const [progressText, setProgressText] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const theme = useTheme();

  const styles = getStyles(theme);

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
      onPress={() =>
        navigation.navigate('SettingsScreen', {
          profileImage: user.profilePicUrl,
        })
      }
    />
  );

  // const handleOpenCamera = () => {
  //   launchCamera({
  //     mediaType: 'photo',
  //     quality: 0.5,
  //     maxWidth: 500,
  //     maxHeight: 500,
  //   })
  //     .then(image => {
  //       console.log(image);
  //       setisLoading(true);
  //       ImagePicker.openCropper({
  //         path: image.assets[0].uri,
  //         width: 300,
  //         height: 300,
  //         cropperCircleOverlay: true,
  //         mediaType: 'photo',
  //       })
  //         .then(image => {
  //           console.log('huehue', image);
  //           setAsset(image);
  //         })
  //         .finally(() => {
  //           setisLoading(false);
  //         });
  //     })
  //     .catch(console.log);
  // };

  // const handleOpenGallery = () => {
  //   launchImageLibrary({
  //     mediaType: 'photo',
  //     quality: 0.5,
  //     maxWidth: 500,
  //     maxHeight: 500,
  //   })
  //     .then(image => {
  //       console.log(image);
  //       setisLoading(true);
  //       ImagePicker.openCropper({
  //         path: image.assets[0].uri,
  //         width: 300,
  //         height: 300,
  //         cropperCircleOverlay: true,
  //         mediaType: 'photo',
  //       })
  //         .then(image => {
  //           setAsset(image);
  //         })
  //         .finally(() => {
  //           setisLoading(false);
  //         });
  //     })
  //     .catch(console.log);
  // };

  const uploadResource = async () => {
    setisLoading(true);
    const blob = await fetchResourceFromURI(asset.uri);
  };

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
        title="Edit Profile"
        accessoryLeft={renderBackAction}
        accessoryRight={renderSettingsAction}
      />
      <ScrollView style={styles.scrollView}>
        {/* <ProfileImage /> */}
        <View style={styles.profileContainer}>
          {/* <TouchableOpacity
            style={styles.profileHeader}
            onPress={() => {
              refRBSheet.current.open();
            }}>
            <Image
              source={{
                uri: user.profilePicUrl,
              }}
              style={styles.profileImage}
              resizeMethod="resize"
              resizeMode="contain"
            />
          </TouchableOpacity> */}
          {isLoading && (
            <Bar
              progress={parseInt(progressText.split('%')[0]) / 100}
              width={200}
              height={3}
              style={{marginBottom: 8}}
            />
          )}
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileTag}>{user.tag || '--'}</Text>
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
            Name: {user.name}
          </Text>
        </Layout>
      </ScrollView>
      {/* <RBSheet
        ref={refRBSheet}
        height={200}
        closeOnDragDown={false}
        closeOnPressMask={true}
        customStyles={{
          container: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          },
        }}>
        <TouchableOpacity
          onPress={() => {
            refRBSheet.current.close();
            handleOpenCamera();
          }}>
          <Text style={styles.rbButton}>Open Camera</Text>
        </TouchableOpacity>
        <Layout style={styles.hr} />
        <TouchableOpacity
          onPress={() => {
            refRBSheet.current.close();
            handleOpenGallery();
          }}>
          <Text style={styles.rbButton}>Select from Gallery</Text>
        </TouchableOpacity>
      </RBSheet> */}
    </SafeAreaLayout>
  );
};

const getStyles = theme =>
  StyleSheet.create({
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
    hr: {
      width: '100%',
      height: 1,
      backgroundColor: theme['gray-200'],
    },
    text: {
      textAlign: 'center',
      marginBottom: 16,
    },
    likeButton: {
      marginVertical: 16,
    },
    profileImage: {
      width: 96,
      height: 96,
      borderRadius: 48,
    },
    profileHeader: {
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
    rbButton: {
      // flexGrow: 1,
      color: theme['color-primary-500'],
      fontWeight: 'bold',
      fontSize: 18,
    },
  });
