import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { MapView, Permissions } from 'expo';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';

import * as actions from '../actions';

class MapScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: 'Map',
    tabBarIcon: ({ tintColor }) => {
       return <Icon name="my-location" size={22} color={tintColor} />;
       }
  });

  state = {
    region: {
      longitude: -122,
      latitude: 37,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09,
    },
    mapLoaded: false,
  }


  async componentDidMount() {
    await Permissions.askAsync(Permissions.LOCATION);
    this.setState({ mapLoaded: true });
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }

  onButtonPress = () => {
    //this.props.clearFetchedJobs();
    this.props.fetchJobs(this.state.region,
      () => {
        this.props.navigation.navigate('deck');
      });
  }

  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
        <View style={styles.buttonContainer}>
          <Button
            large
            title="Search this area"
            backgroundColor="#009688"
            icon={{ name: 'search' }}
            onPress={this.onButtonPress}
          />
        </View>
      </View>
    )
  }
}

const styles = {
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  }
}

export default connect(null, actions)(MapScreen);
