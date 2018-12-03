import React, { Component } from 'react';
import { View, Animated } from 'react-native';

class Ball extends Component {

  componentWillMount() {

    this.position = new Animated.ValueXY({ x: 200, y: 500 });
    Animated.decay(this.position, {
      toValue: { x: 0, y: 0 }
    }).start();


    this.position2 = new Animated.ValueXY(0, 0);
    Animated.spring(this.position2, {
      toValue: { x: 200, y: 500 }
    }).start();

  }

  render() {
    return (
      <View>
        <Animated.View style={this.position2.getLayout()}>
          <View style={styles.ball} />
        </Animated.View>
        <Animated.View style={this.position.getLayout()}>
          <View style={styles.ball} />
        </Animated.View>

      </View>
    );
  }
}

const styles= {
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 30,
    borderColor: 'black'
  }
};

export default Ball;
