import { Ionicons } from "@expo/vector-icons";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import Title from "../component/ui/Title";
import NumberContainer from "../component/game/NumberContainer";
import PrimaryScreen from "../component/ui/PrimaryScreen";
import Cards from "../component/ui/Cards";
import Colors from "../constants/Colors";
import InstructionText from "../component/ui/InstructionText";
import GuessLogItem from "../component/game/GuessLogItem";
function genrateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return genrateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}
let minBonudary = 1;
let maxBoundary = 100;
function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = genrateRandomBetween(1, 100, userNumber);
  const [courrentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  useEffect(() => {
    if (courrentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [courrentGuess, userNumber, onGameOver]);
  useEffect(() => {
    maxBoundary = 1;
    maxBoundary = 100;
  }, []);
  function nextGuessHandler(direction) {
    if (
      (direction === "Lower" && courrentGuess < userNumber) ||
      (direction === "Greater" && courrentGuess > userNumber)
    ) {
      Alert.alert("Don't Lie ", "You Know that this is wrong", [
        { text: "Sorry", style: "cancel" },
      ]);

      return;
    }
    if (direction === "Lower") {
      maxBoundary = courrentGuess;
    } else {
      minBonudary = courrentGuess + 1;
    }
    console.log(minBonudary, maxBoundary);
    const newRoundNumber = genrateRandomBetween(
      minBonudary,
      maxBoundary,
      courrentGuess
    );
    setCurrentGuess(newRoundNumber);
    setGuessRounds((prevGuessRounds) => [newRoundNumber, ...prevGuessRounds]);
  }
  const guessRoundsListLenght = guessRounds.length;
  return (
    <View style={styles.screen}>
      <Title> Oppnent's Guess</Title>
      <NumberContainer> {courrentGuess}</NumberContainer>
      <Cards>
        <InstructionText style={styles.instructionText}>
          {" "}
          Higher Or Lower
        </InstructionText>
        <View style={styles.buttonContainer}>
          <View style={styles.BContainer}>
            <PrimaryScreen onPress={nextGuessHandler.bind(this, "Lower")}>
              <Ionicons name="md-remove" size={27} color="white" />
            </PrimaryScreen>
          </View>
          <View style={styles.BContainer}>
            <PrimaryScreen onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="md-add" size={27} color="white" />
            </PrimaryScreen>
          </View>
        </View>
      </Cards>
      <View style={styles.listcontainer}>
        {/*guessRounds.map(guessRounds=><Text key={guessRounds} >{guessRounds} </Text>)
         */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsListLenght - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 18,
  },
  HigherLower: {
    color: Colors.accent500,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  BContainer: {
    flex: 1,
  },
  instructionText: {
    marginBottom: 12,
  },
  listcontainer:{
    flex:1,
padding:16  
}
});
