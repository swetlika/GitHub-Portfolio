import ProfilePage from './ProfilePage';
import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
} from 'react-native';

import { TabNav } from './TabNav.js';


export default class App extends Component<{}> {

  render() {
    return (
      <TabNav/>
    );
  }
}