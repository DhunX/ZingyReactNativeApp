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
} from '@ui-kitten/components';
import {ArrowIosBackIcon} from '../../../../components/icons';
import {User} from '../../../../types/User';
import {useAuth} from '../../../../context/auth';
import {getMyInfo} from '../../../../services/apis';
import {Loading} from '../../../Loading';
import {createTextPost} from '../../../../services/create';
import Toast from 'react-native-toast-message';

export const TextPostScreen = ({navigation}) => {
  const {accessToken} = useAuth();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [value, setValue] = useState('');
  const [user, setUser] = React.useState<User>();
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
    createTextPost(accessToken, value)
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
        <Button style={{marginTop: 20}} onPress={handleSubmitPost}>
          Post
        </Button>
      </Layout>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 16,
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
  },
});
