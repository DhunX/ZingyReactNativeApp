import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useContext, useRef, useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {SafeAreaLayout} from '../../../components/safe-area-layout.component';
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Text,
  Button,
  useTheme,
} from '@ui-kitten/components';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {ArrowIosBackIcon} from '../../../components/icons';
import {ThemeModeContext} from '../../../App';
import {useAuth} from '../../../context/auth';
import {fetchResourceFromURI} from '../../../utils/file';
import RBSheet from 'react-native-raw-bottom-sheet';

export const Settings = ({route, navigation}) => {
  const {mode, setMode} = useContext(ThemeModeContext);
  const theme = useTheme();
  const styles = getStyles(theme);
  const [asset, setAsset] = useState<any>();
  const [progressText, setProgressText] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const {signOut} = useAuth();

  const refRBSheet = useRef();
  console.log('router', route);

  const profileImage = route?.params?.profileImage
    ? route?.params?.profileImage
    : 'https://zingy-public-media.s3.ap-south-1.amazonaws.com/placeholder_dp.jpeg';

  const handleOpenCamera = () => {
    launchCamera({
      mediaType: 'photo',
      quality: 0.5,
      maxWidth: 500,
      maxHeight: 500,
    })
      .then(image => {
        console.log(image);
        setisLoading(true);
        ImagePicker.openCropper({
          path: image.assets[0].uri,
          width: 300,
          height: 300,
          cropperCircleOverlay: true,
          mediaType: 'photo',
        })
          .then(image => {
            console.log('huehue', image);
            setAsset(image);
          })
          .finally(() => {
            setisLoading(false);
          });
      })
      .catch(console.log);
  };

  const handleOpenGallery = () => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5,
      maxWidth: 500,
      maxHeight: 500,
    })
      .then(image => {
        console.log(image);
        setisLoading(true);
        ImagePicker.openCropper({
          path: image.assets[0].uri,
          width: 300,
          height: 300,
          cropperCircleOverlay: true,
          mediaType: 'photo',
        })
          .then(image => {
            setAsset(image);
          })
          .finally(() => {
            setisLoading(false);
          });
      })
      .catch(console.log);
  };

  const uploadResource = async () => {
    setisLoading(true);
    const blob = await fetchResourceFromURI(asset.uri);
  };

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );
  return (
    <SafeAreaLayout style={styles.container} insets="top">
      <TopNavigation title="Settings" accessoryLeft={renderBackAction} />
      <Layout style={styles.container}>
        <Text>Settings</Text>
        {asset ? (
          <Image
            style={styles.selectedImage}
            source={{uri: asset?.path ?? ''}}
          />
        ) : (
          <TouchableOpacity
            style={styles.profileHeader}
            onPress={() => {
              refRBSheet.current.open();
            }}>
            <Image
              source={{
                uri: profileImage,
              }}
              style={styles.profileImage}
              resizeMethod="resize"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}

        {asset ? (
          <>
            <Button onPress={uploadResource}>UPLOAD</Button>
            <Button onPress={() => setAsset(null)}>
              Remove Selected Image
            </Button>
          </>
        ) : (
          <Button
            onPress={() => {
              refRBSheet.current.open();
            }}>
            Change Profile Picture
          </Button>
        )}
        <Button
          onPress={() => {
            setMode(mode === 'light' ? 'dark' : 'light');
          }}
          style={styles.mv20}>
          <Text>Change Theme : {mode}</Text>
        </Button>
        <Button onPress={signOut}>Sign Out</Button>
      </Layout>
      <RBSheet
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
      </RBSheet>
    </SafeAreaLayout>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    mv20: {
      marginVertical: 20,
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
    rbButton: {
      // flexGrow: 1,
      color: theme['color-primary-500'],
      fontWeight: 'bold',
      fontSize: 18,
    },
    selectedImage: {
      width: 96,
      height: 96,
      marginTop: 20,
      borderRadius: 150,
    },
  });
