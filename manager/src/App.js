import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';
import ReduxThunk from 'redux-thunk';
import Router from './Router';

class App extends Component {

  componentWillMount() {

    const config = {
      apiKey: "AIzaSyDcbb-QJwWi1Mx3qZP6o-he7n8P3-aatjA",
      authDomain: "authentication-8ff86.firebaseapp.com",
      databaseURL: "https://authentication-8ff86.firebaseio.com",
      projectId: "authentication-8ff86",
      storageBucket: "authentication-8ff86.appspot.com",
      messagingSenderId: "196663644946"
    };
    firebase.initializeApp(config);

  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}

export default App;
