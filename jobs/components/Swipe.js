import React, { Component } from "react";

import {
  View,
  Animated,
  Text,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_TRESHOLD = SCREEN_WIDTH * 0.3;
const SWIPE_OUT_DURATION = 300;

class Swipe extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
    keyProp: 'id'
  };

  state = {
    index: 0,
    swipes: [],
    lastCard: null
  };

  componentWillMount = () => {
    this._position = new Animated.ValueXY();
    this._deckAnim = new Animated.ValueXY();

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        this._position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_TRESHOLD) {
          this.forceSwipe("right");
        } else if (gesture.dx < -SWIPE_TRESHOLD) {
          this.forceSwipe("left");
        } else {
          this.resetPosition();
        }
      }
    });
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.data !== this.props.data) {
      this.setState({
        index: 0,
        swipes: [],
        lastCard: null
      }); //Reset when receving new data.
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.swipes.length > prevState.swipes.length) {
      this.onSwipeComplete(this.state.lastCard.direction);
    }
  };

  forceSwipe = direction => {
    Animated.timing(this._position, {
      toValue: {
        x: SCREEN_WIDTH * 1.5 * (direction === "right" ? 1 : -1),
        y: 0
      },
      duration: SWIPE_OUT_DURATION
    }).start(e => {
      this.setState({
        swipes: [...this.state.swipes, { direction: direction, index: this.state.index }],
        lastCard: { direction: direction, index: this.state.index }
      });
    });
  };

  onSwipeComplete = direction => {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[this.state.index];

    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);

    Animated.timing(this._deckAnim, {
      toValue: { x: 0, y: -10 },
      duration: 100
    }).start(() => {
      this._position.setValue({ x: 0, y: 0 });
      this._deckAnim.setValue({ x: 0, y: 0 });
      this.setState({ index: this.state.index + 1 });
    });
  };

  resetPosition = () => {
    Animated.timing(this._position, {
      toValue: 0,
      duration: 200
    }).start();
  };

  getCardStyle = () => {
    const rotate = this._position.x.interpolate({
      inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      outputRange: ["-90deg", "0deg", "90deg"]
    });

    const opacity = this._position.x.interpolate({
      inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      outputRange: [0, 1, 0]
    });

    return {
      ...this._position.getLayout(),
      transform: [{ rotate: rotate }],
      opacity: opacity
    };
  };

  renderCards = () => {
    if (this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    }

    return this.props.data.map((item, i) => {
      if (i < this.state.index) {
        return null;
      }
      if (i === this.state.index) {
        return (
          <Animated.View
            key={item[this.props.keyProp]}
            style={[this.getCardStyle(), styles.cardStyle, { zIndex: i * -1 }]}
            {...this._panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }

      return (
        <Animated.View
          key={item[this.props.keyProp]}
          style={[
            styles.cardStyle,
            { zIndex: i * -1 },
            { top: 10 * (i - this.state.index) }
          ]}
        >
          {this.props.renderCard(item)}
        </Animated.View>
      );
    });
  };

  render() {
    return (
      <Animated.View style={this._deckAnim.getLayout()}>
        {this.renderCards()}
      </Animated.View>
    );
  }
}

const styles = {
  cardStyle: {
    position: "absolute",
    width: SCREEN_WIDTH
  }
};

export default Swipe;
