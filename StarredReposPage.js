//import the necessary modules and items
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

import { List, ListItem, SearchBar } from "react-native-elements";
import React, { Component } from "react";
import { Container, Header, Item, Input, Icon} from 'native-base';

const API = 'https://api.github.com/users/swetlika/starred';

export default class StarredReposPage extends Component {

  // constructor to set intitial values
  constructor(props) {
    super(props);
    this.state = {
      info : [],
      starText : '',
      unstarText : '',
      token : 'd1df192a54183ba67b8fc3031b77f9dc66ba2784',
    };
  }

  _onStarTextChanged = (event) => {
    console.log('_onSearchTextChanged');
    this.setState({ starText: event.nativeEvent.text });
    console.log('Current: '+this.state.starText+', Next: '+event.nativeEvent.text);
  };

  _onStarPressed = () => {
    const query = this.starRepo(this.state.starText);
  }

   starRepo(repo) {
    let url = API + '/' + repo;
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
    .then(resp => this.fetchRepoData())
    .catch(err => console.log(err));
  }

  _onUnstarTextChanged = (event) => {
    console.log('_onSearchTextChanged');
    this.setState({ unstarText: event.nativeEvent.text });
    console.log('Current: '+this.state.unstarText+', Next: '+event.nativeEvent.text);
  };

  _onUnstarPressed = () => {
    const query = this.unstarRepo(this.state.unstarText);
  }

  unstarRepo(repo) {
    let url = API + '/' + repo;
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
    .then(resp => this.fetchRepoData())
    .catch(err => console.log(err));
  }

  async _updateList () { 
    let response = await AsyncStorage.getItem('repos'); 
    let reposdata = await JSON.parse(response) || []; 
    this.setState({
      info: reposdata
    })
  }  

  //fetch the api data from json array
  fetchRepoData(username) { 
    let url = API;
    fetch(url)
      .then((res) => res.json() )
      .then((data) => {
        let obj = data;
        AsyncStorage.setItem('repos', JSON.stringify(obj));
        this._updateList();
      })
      .catch((error) => console.log('Error fetching repos page') )
  }

  //initial call to fetch data and set state, to be used when rendering UI
  componentDidMount() {
    this.fetchRepoData('swetlika');
    this._updateList(); 
  }

  //UI of the Repository page 
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.starText}
            onChange={this._onStarTextChanged}
            placeholder='Search repo to star'/>
          <Button
            onPress={this._onStarPressed}
            color='#48BBEC'
            title='Star'
          />
        </View>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.unstarText}
            onChange={this._onUnstarTextChanged}
            placeholder='Search repo to unstar'/>
          <Button
            onPress={this._onUnstarPressed}
            color='#48BBEC'
            title='UnStar'
          />
        </View>
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.info}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={`${item.name} (Owner: ${item.owner.login})`}
              avatar = {{uri: item.avatar_url}}
              subtitle={item.description}
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
    marginBottom: 27,
    fontSize: 15,
    textAlign: 'center',
    color: '#656565'
  },
  namestyle: {
    marginTop: 15,
    marginBottom: 25,
    fontSize: 25,
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
  thumbnail: {
    width: 53,
    height: 81,
  }
});