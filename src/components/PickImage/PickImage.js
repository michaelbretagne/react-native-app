import React, { Component } from "react";
import { View, Image, Button, StyleSheet } from "react-native";
import imagePlaceholder from "../../assets/beautiful-place.jpg";

class PickImage extends Component {
  render() {
    return (
      <>
        <View style={styles.placeholder}>
          <Image source={imagePlaceholder} style={styles.previewImage} />
        </View>
        <View style={styles.button}>
          <Button title="Pick Image" onPress={() => alert("Pick Image!")} />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  placeholder: {
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#eee",
    width: "80%",
    height: 150,
  },
  button: {
    margin: 8,
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
});

export default PickImage;
