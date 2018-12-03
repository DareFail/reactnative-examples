import React from 'react';
import { Platform, StyleSheet, Text, View, Alert } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Constants, Notifications } from "expo";
import { Provider } from 'react-redux';
import { Icon } from 'react-native-elements';
import { PersistGate } from 'redux-persist/es/integration/react';

import registerForNotifications from './services/push_notifications';
import configureStore from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

export default class App extends React.Component {
  componentDidMount() {
    registerForNotifications();
    Notifications.addListener((notification) => {
      const { data: { text }, origin } = notification;

      if (origin === 'received' && text) {
        Alert.alert(
          'New Push Notification',
          text,
          [{ text: 'Ok.' }]
        );
      }
    });
  }

  render() {
    const { persistor, store } = configureStore();

    const MainNavigator = createBottomTabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: createBottomTabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: createStackNavigator({
                review: { screen: ReviewScreen },
                settings: { screen: SettingsScreen },
              }),
              navigationOptions: {
                title: 'Review Jobs',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="favorite" size={30} color={tintColor} />
                )
              }
          }
        }, {
          tabBarPosition: 'bottom',
          //swipeEnabled: false,
          tabBarOptions: {
            activeTintColor: '#FFBE0B',
            labelStyle: { fontSize: 12 }
          }
        })
      }
    }, {
      navigationOptions: {
        tabBarVisible: false
      }
    });


    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={styles.container}>
            <MainNavigator />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      android: {
        marginTop: Constants.statusBarHeight
      }
    }),
    backgroundColor: '#fff',
  },
  stackHeaderStyle: {
    ...Platform.select({
      android: {
        marginTop: -Constants.statusBarHeight
      }
    })
  }
});
