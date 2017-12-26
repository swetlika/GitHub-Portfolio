
import React from 'react';
import { TabNavigator } from 'react-navigation';


import ProfilePage from './ProfilePage'
import ReposPage from './ReposPage'
import FollowersPage from './FollowersPage'
import FollowingPage from './FollowingPage'
import StarredReposPage from './StarredReposPage'

// bottom tab bar with four tabs for easy navigation
export const TabNav = TabNavigator({
    Home: { 
    	screen: ProfilePage 
    },
    Repos: { 
    	screen: ReposPage 
    },
    Starred: {
      screen: StarredReposPage
    },
    Followers: { 
    	screen: FollowersPage 
    },
    Following: { 
    	screen: FollowingPage 
    },
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: '#e91e63',
  },
  tabBarOptions: {
    activeTintColor: '#ffffff',
    labelStyle: {
      fontSize: 14,
    },
    style: {
      backgroundColor: 'black',
    },
  }

});