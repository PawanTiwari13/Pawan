import { useState } from "react";
import AppLoading from 'expo-app-loading';
import { ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";
import StartGameScreen from "./screen/StartGameScreen";
import{LinearGradient} from'expo-linear-gradient';
import GameScreen from "./screen/GameScreen";
import Colors from "./constants/Colors";
import{useFonts}from'expo-font';
import GameOverScreen from "./screen/GameOverScreen";

export default function App() {
  const [userNumber,setuserNumber]=useState();
  const [gameIsOver,setGameIsOver]=useState(true);
  const [guessRounds,setGuessRounds]=useState(0);
 const [fontsLoaded]= useFonts({
    'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf'),
}
);

if(!fontsLoaded){
  return <AppLoading/>

}
  function pickedNumberHandler(pickedNumber){
setuserNumber(pickedNumber);
setGameIsOver(false);
  }
  
  function gameIsOverHandler(numberOfRounds){
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  } 
  function statNewGameHamndler() {
    setuserNumber(null);
    setGuessRounds(0);
  }
  let screen=<StartGameScreen onPickedNumber={pickedNumberHandler}/>;
  if(userNumber){
screen=<GameScreen userNumber={userNumber} onGameOver={gameIsOverHandler}/>;
  }
  if(gameIsOver && userNumber){
    screen=<GameOverScreen userNumber={userNumber} roundsNumber={guessRounds}onStartNewGame={statNewGameHamndler}/>
  }
  
  return (<LinearGradient colors={[Colors.primary700,Colors.accent500]} style={styles.rootScreen} >
  <ImageBackground source={require('./assets/image/Pawan.jpg')}
  resizeMode="cover"
  style={styles.rootScreen}
  imageStyle={styles.backgroundimage}
  
  > 
  <SafeAreaView style={styles.rootScreen}>
  {screen}
  </SafeAreaView>
  </ImageBackground>
  </LinearGradient >
  )
  ;
}

const styles = StyleSheet.create({
 rootScreen:{
  flex:1
 },
 backgroundimage:{
  opacity:0.15
 }
});
