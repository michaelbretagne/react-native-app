import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Button, StyleSheet, ScrollView, Dimensions } from "react-native";
import { addPlace } from "../../store/actions/places";
import MainText from "../../components/UI/MainText/MainText";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import PlaceInput from "../../components/PlaceInput/PlaceInput";
import PickImage from "../../components/PickImage/PickImage";
import PickLocation from "../../components/PickLocation/PickLocation";
import validate from "../../utility/validation";

class SharePlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: "#FFA500",
  };

  state = {
    viewMode: "portrait",
    controls: {
      placeName: {
        value: "",
        valid: false,
        touched: false,
        validationRules: {
          notEmpty: true,
        },
      },
      location: {
        value: null,
        valid: false,
      },
    },
  };

  componentDidMount = () => {
    Dimensions.addEventListener("change", this.updateStyles);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  };

  componentWillUnmount = () => {
    Dimensions.removeEventListener("change", this.updateStyles);
  };

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape",
    });
  };

  placeNameChangedHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value: val,
            valid: validate(val, prevState.controls.placeName.validationRules),
            touched: true,
          },
        },
      };
    });
  };

  placeAddedHandler = () => {
    this.props.onAddPlace(
      this.state.controls.placeName.value,
      this.state.controls.location.value,
    );
  };

  onNavigatorEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left",
        });
      }
    }
  };

  locationPickerHandler = location => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          location: {
            value: location,
            valid: true,
          },
        },
      };
    });
  };

  render() {
    let headingText = null;

    if (this.state.viewMode === "portrait") {
      headingText = (
        <MainText>
          <HeadingText>Share a Place with us!</HeadingText>
        </MainText>
      );
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          {headingText}
          <PickImage />
          <PickLocation onLocationPick={this.locationPickerHandler} />
          <PlaceInput
            placeData={this.state.controls.placeName}
            onChangeText={this.placeNameChangedHandler}
          />
          <View style={styles.button}>
            <Button
              disabled={
                !this.state.controls.placeName.valid ||
                !this.state.controls.location.valid
              }
              title="Share the Place!"
              onPress={this.placeAddedHandler}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  landscapePicksContainer: {
    flexDirection: "row",
  },
  portraitPicksContainer: {
    flexDirection: "row",
  },
});

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, location) =>
      dispatch(addPlace(placeName, location)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(SharePlaceScreen);
