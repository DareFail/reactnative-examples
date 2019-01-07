import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Button from '../RN/Button';
import Text from '../RN/Text';
import { fontScale } from '../../utilities/utilities';
import {
  addedCardSuccessful,
  addedCardPartialSuccessful,
  addedCardError,
} from './addedCardTypes';

export default class LinkCard extends React.Component {
  state = {
    creditCard: '',
    expirationDate: '',
    cvv: '',
    isBillingAddressFilled: false,
    billingAddress: '',
    isZipFilled: false,
    zip: '',
  };

  linkCard = () => {
    // TODO - CALL BACKEND TO LINK CARD
    /*this.props.client
      .query({
        query: INSERT_QUERY_HERE,
        variables: {
          creditCard: this.state.creditCard,
          expirationDate: this.state.expirationDate,
          cvv: this.state.cvv,
          billingAddress: this.state.billingAddress,
          zip: this.state.zip,
        },
      })
      .then(res => {*/
    const res = 'isCardSuccessfulHere';
    if (res === 'isCardSuccessfulHere') {
      this.props.setCardState(addedCardSuccessful);
    } else if (res === 'isCardPartiallySuccessfulhere') {
      this.props.setCardState(addedCardPartialSuccessful);
    } else {
      this.props.setCardState(addedCardError);
    }
    //});
  };

  isValidCardNumber = () => {
    // TODO - INSERT CARD VALIDATION CALL HERE
    if (this.state.creditCard.length < 16) {
      return true;
    } else if (this.state.creditCard === 'false card number') {
      return false;
    }
    return true;
  };

  handleCreditCard = text => {
    this.setState({ creditCard: text.replace(/[^0-9]/g, '') });
  };

  formatCreditCard = () => {
    if (this.state.creditCard === '') {
      return this.state.creditCard;
    }
    const formattedCreditCard = this.state.creditCard;
    return formattedCreditCard
      .replace(/(\d{4})/g, '$1 ')
      .replace(/(^\s+|\s+$)/, '');
  };

  handleExpirationDate = text => {
    this.setState({ expirationDate: text.replace(/[^0-9]/g, '') });
  };

  formatExpirationDate = () => {
    if (this.state.expirationDate === '') {
      return this.state.expirationDate;
    }
    const formattedCreditCard = this.state.expirationDate;
    return formattedCreditCard
      .replace(/(\d{2})/, '$1/')
      .replace(/(^\s+|\s+$)/, '');
  };

  handleExpirationKeyPress = ({ nativeEvent: { key: keyValue } }) => {
    if (keyValue === 'Backspace') {
      if (this.state.expirationDate.length === 0) {
        const removeLastLetter = this.state.creditCard.slice(0, -1);
        this.setState({ creditCard: removeLastLetter });
      }
    }
  };

  handleCvv = text => {
    this.setState({ cvv: text.replace(/[^0-9]/g, '') });
  };

  handleCvvKeyPress = ({ nativeEvent: { key: keyValue } }) => {
    if (keyValue === 'Backspace') {
      if (this.state.cvv.length === 0) {
        const removeLastLetter = this.state.expirationDate.slice(0, -1);
        this.setState({ expirationDate: removeLastLetter });
      }
    }
  };

  handleBillingAddress = text => {
    this.setState({ billingAddress: text });
  };

  handleBillingAddressKeyPress = ({ nativeEvent: { key: keyValue } }) => {
    if (keyValue === 'Backspace') {
      if (this.state.billingAddress.length === 0) {
        const removeLastLetter = this.state.cvv.slice(0, -1);
        this.setState({ cvv: removeLastLetter });
      }
    }
  };

  finishBillingAddress = () => {
    this.setState({ isBillingAddressFilled: true });
  };

  handleZip = text => {
    this.setState({ zip: text.replace(/[^0-9]/g, '') });
    if (this.state.zip.length === 4) {
      this.setState({ isZipFilled: true });
    }
  };

  handleZipKeyPress = ({ nativeEvent: { key: keyValue } }) => {
    if (keyValue === 'Backspace') {
      if (this.state.zip.length === 0) {
        this.setState({ isBillingAddressFilled: false });
      }
    }
  };

  editZip = () => {
    const removeLastLetter = this.state.zip.slice(0, -1);
    this.setState({
      isZipFilled: false,
      zip: removeLastLetter,
    });
  };

  printIconAndText = (imageSource, text, extraIconStyle = {}) => {
    return (
      <View style={styles.iconAndText}>
        <Image
          style={styles.iconImage}
          resizeMode="contain"
          source={imageSource}
        />
        <Text style={[styles.iconText, extraIconStyle]}>{text}</Text>
      </View>
    );
  };

  showInputs = () => {
    if (this.state.creditCard.length < 16) {
      return (
        <View style={styles.cardInputRow}>
          <Icon
            name="credit-card"
            size={verticalScale(22)}
            style={{ marginTop: verticalScale(7) }}
          />
          <TextInput
            style={[styles.input, { width: scale(210) }]}
            placeholder="Enter Card Number"
            value={this.formatCreditCard()}
            onChangeText={this.handleCreditCard}
            autoFocus
            keyboardType="numeric"
            maxLength={19}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <View style={styles.circle} />
        </View>
      );
    } else if (
      this.state.creditCard.length >= 16 &&
      !this.isValidCardNumber()
    ) {
      return (
        <View style={styles.cardInputRow}>
          <View
            style={{
              marginTop: verticalScale(5),
              borderRadius: scale(3),
              backgroundColor: 'rgb(255, 219, 217)',
              height: verticalScale(25),
              width: scale(30),
              paddingLeft: scale(3),
            }}
          >
            <Icon
              name="alert-outline"
              size={verticalScale(22)}
              style={{
                color: 'rgb(255, 75, 75)',
              }}
            />
          </View>
          <TextInput
            style={[
              styles.input,
              { width: scale(210), color: 'rgb(255, 181, 181)' },
            ]}
            placeholder="Enter Card Number"
            value={this.formatCreditCard()}
            onChangeText={this.handleCreditCard}
            autoFocus
            keyboardType="numeric"
            maxLength={19}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>
      );
    } else if (this.state.expirationDate.length < 4) {
      return (
        <View style={styles.cardInputRow}>
          <Text
            bold
            style={[styles.displayedInputText, { width: scale(80) }]}
          >
            {this.state.creditCard.substr(this.state.creditCard.length - 4)}
          </Text>
          <TextInput
            style={[styles.input, { width: scale(100) }]}
            placeholder="MM/YY"
            value={this.state.expirationDate}
            onChangeText={this.handleExpirationDate}
            onKeyPress={this.handleExpirationKeyPress}
            autoFocus
            keyboardType="numeric"
            maxLength={4}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <Text style={[styles.displayedInputText, { width: scale(80) }]}>
            CVV
          </Text>
        </View>
      );
    } else if (this.state.cvv.length < 3) {
      return (
        <View style={styles.cardInputRow}>
          <Text
            bold
            style={[styles.displayedInputText, { width: scale(80) }]}
          >
            {this.state.creditCard.substr(this.state.creditCard.length - 4)}
          </Text>
          <Text
            bold
            style={[styles.displayedInputText, { width: scale(100) }]}
          >
            {this.formatExpirationDate()}
          </Text>
          <TextInput
            style={[styles.input, { width: scale(80) }]}
            placeholder="CVV"
            value={this.state.cvv}
            onChangeText={this.handleCvv}
            onKeyPress={this.handleCvvKeyPress}
            keyboardType="numeric"
            maxLength={3}
            autoFocus
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>
      );
    } else if (!this.state.isBillingAddressFilled) {
      return (
        <View style={styles.cardInputRow}>
          <TextInput
            style={[styles.input, { width: scale(160) }]}
            placeholder="Billing Address"
            value={this.state.billingAddress}
            onChangeText={this.handleBillingAddress}
            onKeyPress={this.handleBillingAddressKeyPress}
            onSubmitEditing={this.finishBillingAddress}
            autoFocus
            autoCorrect={false}
            autoCapitalize="none"
          />
          <Text
            bold
            style={[styles.displayedInputText, { width: scale(100) }]}
          >
            ZIP
          </Text>
        </View>
      );
    } else if (!this.state.isZipFilled) {
      return (
        <View style={styles.cardInputRow}>
          <Text
            bold
            style={[styles.displayedInputText, { width: scale(160) }]}
          >
            {this.state.billingAddress}
          </Text>
          <TextInput
            style={[styles.input, { width: scale(100) }]}
            placeholder="ZIP"
            value={this.state.zip}
            onChangeText={this.handleZip}
            onKeyPress={this.handleZipKeyPress}
            keyboardType="numeric"
            maxLength={5}
            autoFocus
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>
      );
    } else {
      return (
        <TouchableOpacity onPress={this.editZip}>
          <View style={styles.cardInputRow}>
            <Text
              bold
              style={[styles.displayedInputText, { width: scale(160) }]}
            >
              {this.state.billingAddress}
            </Text>
            <Text
              bold
              style={[styles.displayedInputText, { width: scale(100) }]}
            >
              {this.state.zip}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  showBelowLineText = () => {
    if (this.state.cvv.length === 3) {
      return (
        <View style={styles.belowLineText}>
          <Text style={styles.servicesAgreementText}>
            {
              'We will never share this information with marketers & never send you spam.'
            }
          </Text>
        </View>
      );
    } else if (this.state.isZipFilled) {
      return (
        <View style={styles.belowLineText}>
          <Text bold style={styles.servicesAgreementTitle}>
            {' Card Services Agreement'}
          </Text>
          <Text style={styles.servicesAgreementText}>
            {
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
            }
          </Text>
        </View>
      );
    } else if (this.state.cvv.length < 3) {
      return (
        <KeyboardAvoidingView behavior="padding" style={styles.keyboardTopView}>
          <Icon
            name="lock-outline"
            size={verticalScale(22)}
            style={{ color: 'rgb(80, 80, 80)' }}
          />
          <Text style={styles.keyboardTopViewText}>
            256-bit encryption
          </Text>
        </KeyboardAvoidingView>
      );
    } else {
      return <View />;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bodyContainer}>
          <View style={styles.bodyTitleTextContainer}>
            <Text bold style={styles.accessText}>
              {'Link Your card'}
            </Text>
          </View>

          <View style={styles.bodyTextContainer}>
            <Text style={styles.bodyText}>
              {
                'In order to earn from Easy Swipe offers you need to link a credit card. '
              }
            </Text>
          </View>
          <View style={styles.iconContainer}>
            {this.printIconAndText(
              require('../../assets/add-a-card-min.jpg'),
              'Add a card',
              { width: scale(70) }
            )}
            {this.printIconAndText(
              require('../../assets/use-card-in-stores-min.jpg'),
              'Use card in stores'
            )}
            {this.printIconAndText(
              require('../../assets/get-cash-back-min.jpg'),
              'Get cash back!'
            )}
          </View>
          {this.showInputs()}
          <View
            style={[
              styles.underline,
              {
                backgroundColor: this.isValidCardNumber
                  ? 'rgb(83, 83, 83)'
                  : 'rgb(255, 181, 181)',
              },
            ]}
          />
          {this.showBelowLineText()}
          <View style={styles.buttonContainer}>
            <Button
              buttonText="ADD CARD & AGREE"
              handleSubmit={this.linkCard}
              containerStyle={{
                padding: scale(20),
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  displayedInputText: {
    marginTop: verticalScale(10),
    fontSize: fontScale(16),
    padding: scale(10),
  },
  keyboardTopView: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    width,
    marginTop: verticalScale(30),
    height: verticalScale(60),
    backgroundColor: 'rgb(241, 241, 241)',
  },
  keyboardTopViewText: {
    color: 'rgb(75, 75, 75)',
    marginLeft: scale(5),
    textAlign: 'center',
  },
  belowLineText: {
    marginTop: verticalScale(10),
  },
  circle: {
    marginTop: verticalScale(15),
    borderRadius: scale(10 / 2),
    width: scale(10),
    height: scale(10),
    borderWidth: 4,
    backgroundColor: 'rgb(255, 101, 101)',
    borderColor: 'rgb(255, 101, 101)',
  },
  underline: {
    width: scale(260),
    height: verticalScale(1),
  },
  input: {
    color: 'rgb(60, 60, 60)',
    fontSize: fontScale(16),
    padding: scale(10),
  },
  cardInputRow: {
    marginTop: verticalScale(20),
    flexDirection: 'row',
  },
  accessText: {
    fontSize: fontScale(29),
    textAlign: 'center',
    lineHeight: Platform.OS === 'ios' ? verticalScale(20) : verticalScale(26),
  },
  servicesAgreementTitle: {
    fontSize: fontScale(16),
    textAlign: 'left',
  },
  bodyText: {
    fontSize: fontScale(15),
    textAlign: 'center',
    color: 'rgb(135, 135, 135)',
    lineHeight: Platform.OS === 'ios' ? verticalScale(18) : verticalScale(24),
  },
  servicesAgreementText: {
    fontSize: fontScale(13),
    color: 'rgb(135, 135, 135)',
  },
  titleText: {
    fontSize: fontScale(18),
  },
  bodyContainer: {
    alignItems: 'center',
    paddingBottom: verticalScale(20),
    flex: 1,
    width: '100%',
  },
  imageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    height: verticalScale(65),
    width: verticalScale(65),
  },
  bodyTitleTextContainer: {
    marginTop: verticalScale(20),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(30),
    top: verticalScale(5),
  },
  bodyTextContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(20),
    paddingHorizontal: scale(10),
    bottom: verticalScale(15),
  },
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    alignItems: 'center',
    height: verticalScale(605),
  },
  buttonContainer: {
    marginTop: verticalScale(50),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginTop: verticalScale(20),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  iconAndText: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '33%',
  },
  iconText: {
    fontSize: fontScale(15),
    color: 'rgb(135, 135, 135)',
    textAlign: 'center',
  },
});
