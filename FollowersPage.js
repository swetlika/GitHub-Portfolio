'use strict';

import React, { Component } from "react";
import { List, ListItem, SearchBar } from "react-native-elements";
import {Search} from 'react-native-search-box';
import { Container, Header, Item, Input, Icon} from 'native-base';

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

const API = 'https://api.github.com/users/swetlika/followers';

export default class FollowersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info : []
    };
  }

  async _updateList () { 
    let response = await AsyncStorage.getItem('followers'); 
    let followersdata = await JSON.parse(response) || []; 
    this.setState({
      info: followersdata
    })
  }  

  //fetch the api data from json array
  fetchFollowersData(username) { 
    let url = API;
    fetch(url)
      .then((res) => res.json() )
      .then((data) => {
        let obj = data;
        AsyncStorage.setItem('followers', JSON.stringify(obj));
        this._updateList();
      })
      .catch((error) => console.log('Error fetching repos page') )
  }

  //initial call to fetch data and set state, to be used when rendering UI
  componentDidMount() {
    this.fetchFollowersData('swetlika');
    this._updateList(); 
  }

  render() {
    return (
      <View style={styles.container}>
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