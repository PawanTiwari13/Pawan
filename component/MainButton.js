import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const MainButton = ({ child }) => {
  return (
    <View>
      <TouchableOpacity>
        <Text style={styles.text}>{child}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  text: {
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
    padding: 5,
  },
});
