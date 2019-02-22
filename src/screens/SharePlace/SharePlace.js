import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Button, StyleSheet, ScrollView } from "react-native";
import { addPlace } from "../../store/actions/places";
import MainText from "../../components/UI/MainText/MainText";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import PlaceInput from "../../components/PlaceInput/PlaceInput";
import PickImage from "../../components/PickImage/PickImage";
import PickLocation from "../../components/PickLocation/PickLocation";

class SharePlaceScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  state = {
    placeName: "",
  };

  placeNameChangedHandler = val => {
    this.setState({ placeName: val });
  };

  placeAddedHandler = () => {
    if (this.state.placeName.trim() !== "") {
      this.props.onAddPlace(this.state.placeName);
    }
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

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <MainText>
          <HeadingText>Share a Place with us!</HeadingText>
        </MainText>
        <PickImage />
        <PickLocation />
        <PlaceInput
          placeName={this.state.placeName}
          onChangeText={this.placeNameChangedHandler}
        />
        <View style={styles.button}>
          <Button title="Share the Place!" onPress={this.placeAddedHandler} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: placeName => dispatch(addPlace(placeName)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(SharePlaceScreen);
