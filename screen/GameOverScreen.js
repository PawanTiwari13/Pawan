import { StyleSheet, Image, View, Text } from "react-native";
import React from "react";
import Title from "../component/ui/Title";
import Colors from "../constants/Colors";
import PrimaryScreen from "../component/ui/PrimaryScreen";

function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {
  return (
    <View style={styles.rootContainer}>
      <Title>Game Over!</Title>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/image/success.png")}
        />
      </View>
      <View>
        <Text style={styles.summaryText}>
          Your phone needed{" "}
          <Text style={styles.highlight}> {roundsNumber}</Text> rounds to guess
          the Number <Text style={styles.highlight}> {userNumber}</Text>
        </Text>
      </View>
      <PrimaryScreen onPress={onStartNewGame}>Start New Game</PrimaryScreen>
    </View>
  );
}

export default GameOverScreen;

const styles = StyleSheet.create({
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    color: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  highlight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});
