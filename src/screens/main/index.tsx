import React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';

import Feed from './Feed';
import Discovery from './Discovery';
import Chats from './Chats';
import Profile from './Profile';

const PersonIcon = (props: any): JSX.Element => (
  <Icon {...props} name="person-outline" />
);

const FeedIcon = (props: any): JSX.Element => (
  <Icon {...props} name="home-outline" />
);

const ChatIcon = (props: any): JSX.Element => (
  <Icon {...props} name="message-circle-outline" />
);

const SearchIcon = (props: any): JSX.Element => (
  <Icon {...props} name="search-outline" />
);

const Main = (): JSX.Element => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  return (
    <React.Fragment>
      {(() => {
        switch (selectedIndex) {
          case 0:
            return <Feed />;
          case 1:
            return <Discovery />;
          case 2:
            return <Chats />;
          case 3:
            return <Profile />;
          default:
            return <Feed />;
        }
      })()}
      <BottomNavigation
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        <BottomNavigationTab title="Feed" icon={FeedIcon} />
        <BottomNavigationTab title="Search" icon={SearchIcon} />
        <BottomNavigationTab title="Chat" icon={ChatIcon} />
        <BottomNavigationTab title="Profile" icon={PersonIcon} />
      </BottomNavigation>
    </React.Fragment>
  );
};

export default Main;
