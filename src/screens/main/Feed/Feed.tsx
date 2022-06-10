/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Image, ScrollView, StyleSheet} from 'react-native';
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

import {SafeAreaLayout} from '../../../components/safe-area-layout.component';
import {ChatIcon} from '../../../components/icons';
import {Card} from '../../../components/atoms/card.component';
import {User} from '../../../types/User';
import {getLatestPosts} from '../../../services/apis';
import {POST_TYPES} from '../../../constants';

interface PostType {
  description: string;
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
  const [posts, setPosts] = React.useState<PostType[]>();
  const theme = useTheme();
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
    getLatestPosts({limit: 10, pageNumber: 1})
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => {
        console.log(err);
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Some Error Occurred',
        });
      });
  }, []);
  return (
    <SafeAreaLayout insets="top" style={styles.container}>
      <TopNavigation accessoryRight={renderChatAction} />

      <ScrollView>
        <Layout style={styles.feed}>
          {posts?.length
            ? posts.map((post, index) => (
                <Card key={index} style={{marginBottom: 12}} interactions>
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
                      <Text style={styles.text}>{post.author.name}</Text>
                      <Text style={styles.text}>{`${post.createdAt}`}</Text>
                    </Layout>
                  </Layout>
                  <Text style={styles.text} appearance="hint">
                    {post.description}
                  </Text>
                  {post.type === POST_TYPES.VIDEO_POST ? (
                    <Layout style={styles.videoContainer}>
                      <VideoPlayer
                        width={480}
                        height={270}
                        video={{uri: post.vdoUrl}}
                        autoplay={true}
                      />
                    </Layout>
                  ) : post.imgUrl.length ? (
                    <Image
                      style={styles.imageContainer}
                      source={{uri: post.imgUrl}}
                    />
                  ) : null}
                </Card>
              ))
            : null}
        </Layout>
      </ScrollView>
      <FloatingAction
        actions={actions}
        onPressItem={name => {
          console.log(`selected button: ${name}`);
        }}
        color={theme['color-primary-500']}
      />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  feed: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  text: {
    textAlign: 'center',
    color: 'white',
  },
  likeButton: {
    marginVertical: 16,
  },
  postHeader: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    color: 'white',
    paddingBottom: 16,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    tintColor: null,
    padding: 2,
    backgroundColor: 'white',
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
});
