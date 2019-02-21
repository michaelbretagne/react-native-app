import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const buttonWithBackground = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.button, { backgroundColor: props.color }]}>
        <Text>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
  },
});

export default buttonWithBackground;
