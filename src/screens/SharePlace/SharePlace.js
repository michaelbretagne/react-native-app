import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, Button } from "react-native";
import { addPlace } from "../../store/actions/places";
import PlaceInput from "../../components/PlaceInput/PlaceInput";

class SharePlaceScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left",
        });
      }
    }
  };

  placeAddedHandler = placeName => {
    this.props.onAddPlace(placeName);
  };

  render() {
    return (
      <View>
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: placeName => dispatch(addPlace(placeName)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(SharePlaceScreen);
