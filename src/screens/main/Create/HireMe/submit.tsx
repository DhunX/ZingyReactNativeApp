import {StyleSheet, Image} from 'react-native';
import React, {useContext, useState} from 'react';
import {SafeAreaLayout} from '../../../../components/safe-area-layout.component';
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Text,
  Button,
  Input,
  useTheme,
} from '@ui-kitten/components';
import {ArrowIosBackIcon} from '../../../../components/icons';
import {User} from '../../../../types/User';
import {useAuth} from '../../../../context/auth';
import {getMyInfo} from '../../../../services/apis';
import {Loading} from '../../../Loading';
import {
  createHireMePost,
  createJobPost,
  createTextPost,
} from '../../../../services/create';
import Toast from 'react-native-toast-message';

export const HireMeSubmitScreen = ({route, navigation}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const {accessToken} = useAuth();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [value, setValue] = useState('');
  const [user, setUser] = React.useState<User>();
  const {
    genre,
    skill,
    location,
    duration,
  }: {genre: string; skill: string; location: string; duration: string} =
    route.params;

  React.useEffect(() => {
    setLoading(true);
    getMyInfo(accessToken)
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [accessToken]);

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  const handleSubmitPost = async () => {
    setLoading(true);
    createHireMePost(accessToken, {
      genre,
      skill,
      location,
      duration,
      description: value,
    })
      .then(res => {
        console.log(res);
        setLoading(false);
        Toast.show({
          text1: 'Post created successfully',
          type: 'success',
          position: 'bottom',
        });
        navigation.navigate('FeedScreen');
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        Toast.show({
          text1: 'Error creating post',
          type: 'danger',
          position: 'bottom',
        });
        navigation.navigate('FeedScreen');
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaLayout style={styles.container} insets="top">
      <TopNavigation title="Create Post" accessoryLeft={renderBackAction} />
      <Layout style={styles.container}>
        <Layout style={styles.profileHeader}>
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
        </Layout>
        <Input
          placeholder="Type Here"
          value={value}
          onChangeText={nextValue => setValue(nextValue)}
          multiline
          textStyle={{minHeight: 64}}
        />
        <Layout style={{...styles.jobCard, ...styles.mv20}}>
          <Text category="s2" style={{color: 'white'}}>
            I'm hiring
          </Text>
          <Layout
            style={{
              flexDirection: 'row',
              backgroundColor: 'transparent',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Layout
              style={{
                flexDirection: 'row',
                backgroundColor: 'transparent',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                {skill}
              </Text>
              <Text style={{color: 'white'}}> in </Text>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                {genre}
              </Text>
            </Layout>
            <Button
              style={{
                backgroundColor: theme['color-primary-700'],
                borderRadius: 99,
              }}>
              Hire Me
            </Button>
          </Layout>
          <Layout
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '60%',
              backgroundColor: 'transparent',
            }}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
              {location}
            </Text>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
              {duration}
            </Text>
          </Layout>
        </Layout>
        <Button style={{marginTop: 20}} onPress={handleSubmitPost}>
          Post
        </Button>
      </Layout>
    </SafeAreaLayout>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
      padding: 16,
    },
    jobCard: {
      backgroundColor: theme['color-primary-500'],
      padding: 16,
      borderRadius: 8,
      width: '100%',
    },
    mv20: {
      marginVertical: 20,
    },
    profileHeader: {
      padding: 16,
      borderRadius: 9999,
      tintColor: null,
      borderColor: '#aaa',
      borderWidth: 0,
      backgroundColor: '#fff',
      marginBottom: 16,
    },
    profileImage: {
      width: 72,
      height: 72,
      borderRadius: 36,
    },
  });
