import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { deletePlace } from "../../store/actions/index";
import MapView from "react-native-maps";

class PlaceDetail extends Component {
  state = {
    viewMode: "portrait",
  };

  componentDidMount = () => {
    Dimensions.addEventListener("change", this.updateStyles);
  };

  componentWillUnmount = () => {
    Dimensions.removeEventListener("change", this.updateStyles);
  };

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape",
    });
  };

  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          this.state.viewMode === "portrait"
            ? styles.portraitContainer
            : styles.landscapeContainer,
        ]}
      >
        <View style={styles.placeDetailContainer}>
          <View style={styles.subContainer}>
            <Image
              source={this.props.selectedPlace.image}
              style={styles.placeImage}
            />
          </View>
          <View style={styles.subContainer}>
            <MapView
              initialRegion={{
                ...this.props.selectedPlace.location,
                latitudeDelta: 0.0122,
                longitudeDelta:
                  (Dimensions.get("window").width /
                    Dimensions.get("window").height) *
                  0.0122,
              }}
              style={styles.map}
            >
              <MapView.Marker coordinate={this.props.selectedPlace.location} />
            </MapView>
          </View>
        </View>
        <View style={styles.subContainer}>
          <View>
            <Text style={styles.placeName}>
              {this.props.selectedPlace.name}
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={this.placeDeletedHandler}>
              <View style={styles.iconsButton}>
                <Icon
                  size={30}
                  name={Platform.OS === "ios" ? "ios-trash" : "md-trash"}
                  color="red"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 22,
  },
  portraitContainer: {
    flexDirection: "column",
  },
  landscapeContainer: {
    flexDirection: "row",
  },
  placeDetailContainer: {
    flex: 2,
  },
  subContainer: {
    flex: 1,
  },
  placeImage: {
    width: "100%",
    height: "100%",
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28,
    marginBottom: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  iconsButton: {
    alignItems: "center",
  },
});

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: key => dispatch(deletePlace(key)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(PlaceDetail);
