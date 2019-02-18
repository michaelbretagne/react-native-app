import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, View } from "react-native";

import {
  addPlace,
  deletePlace,
  selectPlace,
  deselectPlace,
} from "./src/store/actions/index.js";
import PlaceList from "./src/components/PlaceList/PlaceList";
import PlaceInput from "./src/components/PlaceInput/PlaceInput";
import PlaceDetail from "./src/components/PlaceDetail/PlaceDetail";

type Props = {};
class App extends Component<Props> {
  placeAddedHandler = placeName => {
    this.props.onAddPlace(placeName);
    console.log(this.props);
  };

  placeSelectedHandler = key => {
    this.props.onSelectPlace(key);
  };

  placeDeletedHandler = () => {
    this.props.onDeletePlace();
  };

  modalClosedHandler = () => {
    this.props.onDeselectPlace();
  };

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail
          selectedPlace={this.props.selectedPlace}
          onModalClosed={this.modalClosedHandler}
          onItemDeleted={this.placeDeletedHandler}
        />
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
        <PlaceList
          places={this.props.places}
          onItemSelected={this.placeSelectedHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

const mapStateToProps = state => {
  return {
    places: state.places.places,
    selectedPlace: state.places.selectedPlace,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: name => dispatch(addPlace(name)),
    onDeletePlace: () => dispatch(deletePlace()),
    onSelectPlace: key => dispatch(selectPlace(key)),
    onDeselectPlace: () => dispatch(deselectPlace()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
