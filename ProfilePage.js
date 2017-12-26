'use strict';

import ReposPage from './ReposPage'
import FollowersPage from './FollowersPage'
import FollowingPage from './FollowingPage'



import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
  NavigatorIOS,
  ScrollView,
  ListView,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

const API = 'https://api.github.com/users';

export default class ProfilePage extends Component {
	constructor(props) {
    super(props);

    // This will store the different components from GitHub API related to profile info.
    this.state = {
      username: 'swetlika', 
      name: '',
      avatar: 'https://facebook.github.io/react/img/logo_og.png', //image field can't be blank
      bio: '',
      email: '',
      date: '',
      repos:'',
      followers: '',
      following: '',
      notFound: ''
    };
  }

  componentDidMount () { 
    this._updateList(); 
  } 

  async _updateList () { 
    let response = await AsyncStorage.getItem('profiledata'); 
    let profiledata = await JSON.parse(response) || []; 

    this.setState({ 
    	username: profiledata.login,
      	name: profiledata.name,
      	avatar: profiledata.avatar,
        bio: profiledata.bio,
        email: profiledata.email,
        date: profiledata.date,
        repos: profiledata.repos,
        followers: profiledata.followers,
        following: profiledata.following, 
        notFound: profiledata.message,
    }); 

  }  

  // function to call GitHub API users/username
	fetchProfile(username) { 
	  let url = `${API}/${username}`; 
	  // store api information
	  fetch(url)
	    .then((res) => res.json() )
	    .then((data) => {
	      let obj = {
	      	username: data.login,
	      	name: data.name,
	      	avatar: data.avatar_url,
	        bio: data.bio,
	        email: data.email,
	        date: data.created_at,
	        repos: data.public_repos,
	        followers: data.followers,
	        following: data.following, 
	        notFound: data.message,
	      }
	      AsyncStorage.setItem('profiledata', JSON.stringify(obj));
	      this._updateList();
	    })
	    .catch((error) => console.log('Oops! . There Is A Problem') )
	}

	render() {
		this.fetchProfile('swetlika');
		this._updateList();
		return (
			<ScrollView>
				<View style={styles.container}>
				<Card>
						<CardTitle>
							<Text style={styles.title}>
								{this.state.name}
							</Text>
						</CardTitle>
					</Card>

					<Image
						resizeMode="contain"
						style={{width: 200, height: 200, paddingTop: 50, paddingBottom: 50, alignSelf: 'center'}}
						source={{uri: this.state.avatar}}
					/>


					<View style={{flex: 1, flexDirection: 'row'}}>
					<View style={{flex: 1, backgroundColor: 'powderblue'}}> 
						<Card>
							<Text style={styles.description}>
								Repos:
								{'\n'}  
								{this.state.repos}
							</Text>
						</Card>
					</View>

					<View style={{flex: 1, backgroundColor: 'skyblue'}}> 
						<Card>
							<Text style={styles.description}>
								Followers: 
								{'\n'}  
								{this.state.followers}
							</Text>
						</Card>
					</View>

					<View style={{flex: 1, backgroundColor: 'steelblue'}}> 
						<Card>
							<Text style={styles.description}>
								Following:
								{'\n'}  
								{this.state.following}
							</Text>
						</Card>
					</View>
				</View>

					<Card>
						<CardContent>

							<Text style={styles.description}>
								Github:
								{' '}    
								{this.state.username}
							</Text>

						</CardContent>
					</Card>

					<Card>
						<CardContent>

							<Text style={styles.description}>
								Bio:
								{' '}    
								{this.state.bio}
							</Text>

						</CardContent>
					</Card>

					<Card>
						<CardContent>

							<Text style={styles.description}>
								Email:
								{' '}    
								{this.state.email}
							</Text>

						</CardContent>
					</Card>

					<Card>
						<CardContent>

							<Text style={styles.description}>
								Create Date:
								{' '}    
								{this.state.date.split('T')[0]}
							</Text>

						</CardContent>
					</Card>


				</View>

			</ScrollView>

		);
	}
}

const styles = StyleSheet.create({
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
	container: {
    flex: 1,
   },
  title: {
    fontSize: 30,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  button: {
    marginRight: 10
  },
  card: {
  	marginTop: 20,
    flex: 1,
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { marginLeft: 5 },
  row: { height: 30 },
  canvas: {
	  position: 'absolute',
	  top: 0,
	  left: 0,
	  bottom: 0,
	  right: 0,
	},
});