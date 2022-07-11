/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {
  Avatar,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components';
import VideoPlayer from 'react-native-video-player';
import {FloatingAction} from 'react-native-floating-action';
import Toast from 'react-native-toast-message';
import RBSheet from 'react-native-raw-bottom-sheet';

import {SafeAreaLayout} from '../../../components/safe-area-layout.component';
import {ChatIcon} from '../../../components/icons';
import {Card} from '../../../components/atoms/card.component';
import {User} from '../../../types/User';
import {getLatestPosts} from '../../../services/apis';
import {POST_TYPES} from '../../../constants';
import {timeSince} from '../../../utils/Time';

import PhotoVdoSvg from '../../../assets/vectors/photo-vdo.svg';
import TextSvg from '../../../assets/vectors/text.svg';
import TrackSvg from '../../../assets/vectors/track.svg';
import {Loading} from '../../Loading';
import {JobCard} from '../../../components/molecules/job-card.component';
import {RSVPCard} from '../../../components/molecules/rsvp-card.component';

interface PostType {
  description: string;

  // job specific fields
  genre: string;
  skill: string;
  location: string;
  duration: string;

  // rsvp specific fields
  eventName: string;
  date: string;

  tags: string[];
  author: User;
  imgUrl?: string;
  postUrl: string;
  audioUrl?: string;
  vdoUrl?: string;
  likes?: number;
  score: number;
  isSubmitted: boolean;
  isDraft: boolean;
  isPublished: boolean;
  status?: boolean;
  publishedAt?: Date;
  createdBy?: User;
  updatedBy?: User;
  createdAt?: Date;
  updatedAt?: Date;
  type: string;
  comments?: Comment[];
}

export const Feed = ({navigation}) => {
  const refRBSheet = useRef();
  const [posts, setPosts] = React.useState<PostType[]>();
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const theme = useTheme();
  const styles = getStyles({theme});
  const actions = [
    {
      text: 'Create a Post',
      icon: require('../../../assets/images/plus.png'),
      name: 'bt_create',
      position: 1,
      color: theme['color-primary-500'],
    },
    {
      text: 'Hire an Artist',
      icon: require('../../../assets/images/artist.png'),
      name: 'bt_hire',
      position: 2,
      color: theme['color-primary-500'],
    },
    {
      text: 'Get Hired',
      icon: require('../../../assets/images/briefcase.png'),
      name: 'bt_hireme',
      position: 3,
      color: theme['color-primary-500'],
    },
    {
      text: 'Share an Event',
      icon: require('../../../assets/images/event.png'),
      name: 'bt_rsvp',
      position: 4,
      color: theme['color-primary-500'],
    },
  ];

  const renderChatAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ChatIcon}
      onPress={() => navigation.navigate('Chat')}
    />
  );

  useEffect(() => {
    setIsLoading(true);
    getLatestPosts({limit: 10, pageNumber: 1})
      .then(res => {
        setPosts(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Some Error Occurred',
        });
      });
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getLatestPosts({limit: 10, pageNumber: 1})
      .then(res => {
        setRefreshing(false);
        setPosts(res.data);
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

  if (isLoading) {
    return <Loading />;
  }
  return (
    <SafeAreaLayout insets="top" style={styles.container}>
      <TopNavigation
        accessoryRight={renderChatAction}
        accessoryLeft={
          <Image source={require('../../../assets/images/logo.png')} />
        }
      />

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Layout style={styles.feed}>
          {posts?.length
            ? posts.map((post, index) => (
                <Card
                  key={index}
                  style={{marginBottom: 12}}
                  interactions
                  navigation={navigation}>
                  <Layout style={styles.postHeader}>
                    <Avatar
                      style={styles.avatar}
                      resizeMethod="resize"
                      resizeMode="contain"
                      source={{
                        uri: post.author?.profilePicUrl?.length
                          ? post.author.profilePicUrl
                          : 'https://zingy-public-media.s3.ap-south-1.amazonaws.com/placeholder_dp.jpeg',
                      }}
                    />
                    <Layout style={styles.postHeaderText}>
                      <Text style={styles.text} category="s1">
                        {post.author.name}
                      </Text>
                      <Layout
                        style={{
                          flexDirection: 'row',
                          backgroundColor: 'transparent',
                        }}>
                        <Text style={styles.text} category="s2">
                          {post.author.interests.join(', ')}
                        </Text>
                        <Text style={styles.text} category="s2">
                          {' - '}
                          {timeSince(post.createdAt)}
                        </Text>
                      </Layout>
                    </Layout>
                  </Layout>
                  <Layout style={styles.hr}></Layout>
                  <Text
                    style={{...styles.text, marginTop: 8}}
                    appearance="hint">
                    {post.description}
                  </Text>
                  {(post.type === POST_TYPES.JOB_POST ||
                    post.type === POST_TYPES.HIRE_ME_POST) && (
                    <JobCard
                      genre={post.genre}
                      skill={post.skill}
                      location={post.location}
                      duration={post.duration}
                      action={() => navigation.navigate('MaintenanceScreen')}
                      type={post.type}
                    />
                  )}
                  {post.type === POST_TYPES.EVENT_POST && (
                    <RSVPCard
                      eventName={post.eventName}
                      date={post.date}
                      location={post.location}
                      duration={post.duration}
                      action={() => navigation.navigate('MaintenanceScreen')}
                      type={post.type}
                    />
                  )}
                  {post.type === POST_TYPES.VIDEO_POST ? (
                    <Layout style={styles.videoContainer}>
                      <VideoPlayer
                        width={480}
                        height={270}
                        video={{uri: post.vdoUrl}}
                        autoplay={true}
                      />
                    </Layout>
                  ) : post.type === POST_TYPES.IMAGE_POST ? (
                    post.imgUrl?.length ? (
                      <Image
                        style={styles.imageContainer}
                        source={{uri: post.imgUrl}}
                      />
                    ) : null
                  ) : null}
                  {/* <Layout style={styles.hr}></Layout> */}
                </Card>
              ))
            : null}
        </Layout>
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        height={300}
        closeOnDragDown={true}
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
            navigation.navigate('MaintenanceScreen');
          }}>
          {/* <PhotoVdoSvg width={24} height={24} /> */}
          <Text style={styles.rbButton}>Photo or Video</Text>
        </TouchableOpacity>
        <Layout style={styles.hr} />
        <TouchableOpacity
          onPress={() => {
            refRBSheet.current.close();
            navigation.navigate('MaintenanceScreen');
          }}>
          {/* <TrackSvg /> */}
          <Text style={styles.rbButton}>Only Track</Text>
        </TouchableOpacity>
        <Layout style={styles.hr} />
        <TouchableOpacity
          onPress={() => {
            refRBSheet.current.close();
            navigation.navigate('TextPostScreen');
          }}>
          {/* <TextSvg /> */}
          <Text style={styles.rbButton}>Only Text</Text>
        </TouchableOpacity>
      </RBSheet>
      <FloatingAction
        actions={actions}
        onPressItem={name => {
          console.log(`selected button: ${name}`);
          switch (name) {
            case 'bt_create':
              if (refRBSheet.current !== null) {
                refRBSheet.current.open();
              }
              break;
            case 'bt_hire':
              navigation.navigate('HireScreen');
              break;
            case 'bt_hireme':
              navigation.navigate('HireMeScreen');
              break;
            case 'bt_rsvp':
              navigation.navigate('RSVPScreen');
              break;
            default:
              break;
          }
        }}
        color={theme['color-primary-500']}
      />
    </SafeAreaLayout>
  );
};

const getStyles = ({theme}) =>
  StyleSheet.create({
    avatar: {
      width: 40,
      height: 40,
      tintColor: null,
      padding: 2,
      backgroundColor: 'white',
    },
    container: {
      flex: 1,
    },
    feed: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    hr: {
      width: '100%',
      height: 1,
      backgroundColor: theme['gray-200'],
    },
    likeButton: {
      marginVertical: 16,
    },
    postHeader: {
      flexDirection: 'row',
      backgroundColor: 'transparent',
      color: 'black',
      paddingBottom: 16,
    },
    text: {
      textAlign: 'left',
      color: 'black',
    },
    videoContainer: {
      width: '100%',
      height: 140,
      marginVertical: 16,
    },
    imageContainer: {
      width: '100%',
      height: 140,
      marginVertical: 16,
    },
    postHeaderText: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      marginLeft: 16,
      backgroundColor: 'transparent',
    },
    rbButton: {
      color: theme['color-primary-500'],
      fontWeight: 'bold',
      fontSize: 18,
    },
  });
