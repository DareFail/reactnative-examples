import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {

  state = {
    loggedin: null
  };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDcbb-QJwWi1Mx3qZP6o-he7n8P3-aatjA',
      authDomain: 'authentication-8ff86.firebaseapp.com',
      databaseURL: 'https://authentication-8ff86.firebaseio.com',
      projectId: 'authentication-8ff86',
      storageBucket: 'authentication-8ff86.appspot.com',
      messagingSenderId: '196663644946'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedin: true });
      }
      else {
        this.setState({ loggedin: false });
      }
    });
  }

  renderContent() {
    if (this.state.loggedin == null) {
      return <Spinner size="large" />;
    }
    else if (this.state.loggedin) {
      return (
        <View style={{flexDirection: 'row'}}>
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        </View>
      );
    }
    else {
      return <LoginForm />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
