import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';

import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';


export default class App extends React.Component {
  componentDidMount() {
    // Initialize Firebase
    const config = {
      apiKey: "AIzaSyAngFoBv3FJoom2YCjgJ_sjEx5Qwyduqn8",
      authDomain: "one-time-password-f0d34.firebaseapp.com",
      databaseURL: "https://one-time-password-f0d34.firebaseio.com",
      projectId: "one-time-password-f0d34",
      storageBucket: "one-time-password-f0d34.appspot.com",
      messagingSenderId: "687839419772"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <View style={styles.container}>
        <SignUpForm />
        <SignInForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
