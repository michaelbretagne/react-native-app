import React, { Component } from "react";
import { View, Image, Button, StyleSheet } from "react-native";
import ImagePicker from "react-native-image-picker";

class PickImage extends Component {
  state = {
    pickedImage: null,
  };

  pickImageHandler = () => {
    ImagePicker.showImagePicker({ title: "Pick an Image" }, res => {
      console.log("here");
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.err);
      } else {
        console.log("uri");
        this.setState({
          pickedImage: { uri: res.uri },
        });
        this.props.onImagePicked({ uri: res.uri, base64: res.data });
      }
    });
  };

  render() {
    return (
      <>
        <View style={styles.placeholder}>
          <Image source={this.state.pickedImage} style={styles.previewImage} />
        </View>
        <View style={styles.button}>
          <Button title="Pick Image" onPress={this.pickImageHandler} />
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
