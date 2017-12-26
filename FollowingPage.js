'use strict';

import React, { Component } from "react";
import { List, ListItem, SearchBar } from "react-native-elements";
import { Container, Header, Item, Input, Icon} from 'native-base';
import Login from 'react-native-login';
import config from './config'

import Base64 from './Base64'

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
  NavigatorIOS,
  AppRegistry,
  FlatList,
  Avatar,
  Linking,
  AsyncStorage,
} from 'react-native';

const API = 'https://api.github.com/users/swetlika/following';

export default class FollowersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info : [],
      followText: '',
      unfollowText: '',
      client_id: '347d6f47de7447d77b5b',
      client_secret: '1bcdcc2951a72f9ab9777df96accb645e8e717b4',
      token: 'd1df192a54183ba67b8fc3031b77f9dc66ba2784'
    };
  }

  _onFollowTextChanged = (event) => {
    console.log('_onSearchTextChanged');
    this.setState({ followText: event.nativeEvent.text });
    console.log('Current: '+this.state.followText+', Next: '+event.nativeEvent.text);
  };

  _onFollowPressed = () => {
    const query = this.followUser(this.state.followText);
  }

   followUser(username) {
    let url = API + '/' + username.toLowerCase();
    console.log(url);
    fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': 'token ' + this.state.token,  
        'User-Agent': 'Portfolio',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json; charset=utf-8',     
        'Content-Length': 0,
      },
    })
    .then(resp => this.fetchFollowing())
    .catch(err => console.log(err));
  }

  _onUnfollowTextChanged = (event) => {
    console.log('_onSearchTextChanged');
    this.setState({ unfollowText: event.nativeEvent.text });
    console.log('Current: '+this.state.unfollowText+', Next: '+event.nativeEvent.text);
  };

  _onUnfollowPressed = () => {
    const query = this.unfollowUser(this.state.unfollowText);
  }

  unfollowUser(username) {
    let url = API + '/' + username.toLowerCase();
    console.log(url);
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': 'token ' + this.state.token,  
        'User-Agent': 'Portfolio',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json; charset=utf-8',     
        'Content-Length': 0,
      },
    })
    .then(resp => this.fetchFollowing())
    .catch(err => console.log(err));
  }


  async _updateList () { 
    let response = await AsyncStorage.getItem('following'); 
    let followingdata = await JSON.parse(response) || []; 
    this.setState({
      info: followingdata
    })
  }  

  //fetch the api data from json array
  fetchFollowingData(username) { 
    let url = API;
    fetch(url)
      .then((res) => res.json() )
      .then((data) => {
        let obj = data;
        AsyncStorage.setItem('following', JSON.stringify(obj));
        this._updateList();
      })
      .catch((error) => console.log('Error fetching repos page') )
  }

  //initial call to fetch data and set state, to be used when rendering UI
  componentDidMount() {
    this.fetchFollowingData('swetlika');
    this._updateList(); 
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.followText}
            onChange={this._onFollowTextChanged}
            placeholder='Search user name to follow'/>
          <Button
            onPress={this._onFollowPressed}
            color='#48BBEC'
            title='Follow'
          />
        </View>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.unfollowText}
            onChange={this._onUnfollowTextChanged}
            placeholder='Search user name to unfollow'/>
          <Button
            onPress={this._onUnfollowPressed}
            color='#48BBEC'
            title='Unfollow'
          />
        </View>
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.info}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={item.login}
              avatar = {{uri: item.avatar_url}}
              onPress={() => {Linking.openURL(item.html_url)}}
              containerStyle={{ borderBottomWidth: 0 }}
            />
          )}
          keyExtractor={(item, index) => index}
        />
      </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    marginTop: 20,
    flex: 1
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC',
  },
  image: {
    width: 200,
    height: 200,
  },
});