import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

class PickLocation extends Component {
  render() {
    return (
      <>
        <View style={styles.placeholder}>
          <Text>Map</Text>
        </View>
        <View style={styles.button}>
          <Button title="Locate me" onPress={() => alert("Pick Location")} />
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
});

export default PickLocation;
