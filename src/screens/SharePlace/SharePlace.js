import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { addPlace, startAddPlace } from "../../store/actions/places";
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

  componentWillMount() {
    this.reset();
  }

  componentDidMount = () => {
    Dimensions.addEventListener("change", this.updateStyles);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  };

  componentWillUnmount = () => {
    Dimensions.removeEventListener("change", this.updateStyles);
  };

  componentDidUpdate() {
    if (this.props.placeAdded) {
      this.props.navigator.switchToTab({ tabIndex: 0 });
      this.props.onStartAddPlace();
    }
  }

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

  imagePickedHandler = image => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          image: {
            value: image,
            valid: true,
          },
        },
      };
    });
  };

  placeAddedHandler = () => {
    this.props.onAddPlace(
      this.state.controls.placeName.value,
      this.state.controls.location.value,
      this.state.controls.image.value,
    );
    this.reset();
    this.imagePicker.reset();
    this.locationPicker.reset();
  };

  reset = () =>
    this.setState({
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
        image: {
          value: null,
          valid: false,
        },
      },
    });

  onNavigatorEvent = event => {
    if (event.type === "ScreenChangedEvent") {
      if (event.id === "willAppear") {
        this.props.onStartAddPlace();
      }
    }
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

    let submitButton = (
      <Button
        disabled={
          !this.state.controls.placeName.valid ||
          !this.state.controls.location.valid ||
          !this.state.controls.image.valid
        }
        title="Share the Place!"
        onPress={this.placeAddedHandler}
      />
    );

    if (this.props.isLoading) {
      submitButton = <ActivityIndicator />;
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          {headingText}
          <PickImage
            onImagePicked={this.imagePickedHandler}
            ref={ref => (this.imagePicker = ref)}
          />
          <PickLocation
            onLocationPick={this.locationPickerHandler}
            ref={ref => (this.locationPicker = ref)}
          />
          <PlaceInput
            placeData={this.state.controls.placeName}
            onChangeText={this.placeNameChangedHandler}
          />
          <View style={styles.button}>{submitButton}</View>
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

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    placeAdded: state.places.placeAdded,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, location, image) =>
      dispatch(addPlace(placeName, location, image)),
    onStartAddPlace: () => dispatch(startAddPlace()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SharePlaceScreen);
