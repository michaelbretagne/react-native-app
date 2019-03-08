import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";

import backgroundImage from "../../assets/background.jpg";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import validate from "../../utility/validation";
import { tryAuth, authAutoSignIn } from "../../store/actions";

class AuthScreen extends Component {
  state = {
    viewMode: "portrait",
    authMode: "login",
    controls: {
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true,
        },
        touched: false,
      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 6,
        },
        touched: false,
      },
      confirmPassword: {
        value: "",
        valid: false,
        validationRules: {
          equalTo: "password",
        },
        touched: false,
      },
    },
  };

  componentDidMount = () => {
    Dimensions.addEventListener("change", this.updateStyles);
    this.props.onAuthAutoSignIn();
  };

  componentWillUnmount = () => {
    Dimensions.removeEventListener("change", this.updateStyles);
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === "login" ? "signup" : "login",
      };
    });
  };

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape",
    });
  };

  authHandler = () => {
    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value,
    };
    this.props.onTryAuth(authData, this.state.authMode);
  };

  updateInputHandler = (key, value) => {
    let connectedValue = [];
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue,
      };
    }
    if (key === "password") {
      connectedValue = {
        ...connectedValue,
        equalTo: value,
      };
    }
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid:
              key === "password"
                ? validate(
                    prevState.controls.confirmPassword.value,
                    prevState.controls.confirmPassword.validationRules,
                    connectedValue,
                  )
                : prevState.controls.confirmPassword.valid,
          },
          [key]: {
            ...prevState.controls[key],
            value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue,
            ),
            touched: true,
          },
        },
      };
    });
  };

  render() {
    let headingText = null;
    let confirmedPasswordControl = null;
    let submitButton = (
      <ButtonWithBackground
        onPress={this.authHandler}
        color="#29aaf4"
        disabled={
          !this.state.controls.email.valid ||
          !this.state.controls.password.valid ||
          (!this.state.controls.confirmPassword.valid &&
            this.state.authMode === "signup")
        }
      >
        Submit
      </ButtonWithBackground>
    );

    if (this.state.viewMode === "portrait") {
      headingText = (
        <MainText>
          <HeadingText>
            {this.state.authMode === "login"
              ? "Please Log In"
              : "Please register"}
          </HeadingText>
        </MainText>
      );
    }

    if (this.state.authMode === "signup") {
      confirmedPasswordControl = (
        <View
          style={
            this.state.viewMode === "portrait"
              ? styles.portraitPasswordWrapper
              : styles.landscapePasswordWrapper
          }
        >
          <DefaultInput
            placeholder="Confirm Password"
            style={styles.input}
            value={this.state.controls.confirmPassword.value}
            onChangeText={val =>
              this.updateInputHandler("confirmPassword", val)
            }
            valid={this.state.controls.confirmPassword.valid}
            touched={this.state.controls.confirmPassword.touched}
            secureTextEntry
          />
        </View>
      );
    }

    if (this.props.isLoading) {
      submitButton = <ActivityIndicator />;
    }

    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {headingText}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <DefaultInput
                placeholder="Your Email Address"
                style={styles.input}
                value={this.state.controls.email.value}
                onChangeText={val => this.updateInputHandler("email", val)}
                valid={this.state.controls.email.valid}
                touched={this.state.controls.email.touched}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />
              <View
                style={
                  this.state.viewMode === "portrait" ||
                  this.state.authMode === "login"
                    ? styles.portraitPasswordContainer
                    : styles.landscapePasswordContainer
                }
              >
                <View
                  style={
                    this.state.viewMode === "portrait" ||
                    this.state.authMode === "login"
                      ? styles.portraitPasswordWrapper
                      : styles.landscapePasswordWrapper
                  }
                >
                  <DefaultInput
                    placeholder="Password"
                    style={styles.input}
                    value={this.state.controls.password.value}
                    onChangeText={val =>
                      this.updateInputHandler("password", val)
                    }
                    valid={this.state.controls.password.valid}
                    touched={this.state.controls.password.touched}
                    secureTextEntry
                  />
                </View>
                {confirmedPasswordControl}
              </View>
              <Text
                onPress={this.switchAuthModeHandler}
                style={styles.register}
              >
                {this.state.authMode === "login"
                  ? "Register a new account"
                  : "Login"}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          {submitButton}
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    width: "100%",
    flex: 1,
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "#eee",
    borderColor: "#bbb",
  },
  landscapePasswordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  portraitPasswordContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  landscapePasswordWrapper: {
    width: "48%",
  },
  portraitPasswordWrapper: {
    width: "100%",
  },
  register: {
    color: "#fff",
    textAlign: "right",
    fontWeight: "bold",
    textDecorationLine: "underline",
    paddingRight: 5,
    paddingBottom: 15,
  },
});

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
    onAuthAutoSignIn: () => dispatch(authAutoSignIn()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthScreen);
