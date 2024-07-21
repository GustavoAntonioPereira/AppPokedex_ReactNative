import { ImageBackground, StyleSheet, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function Cover() {
  return (
    <ImageBackground
      source={require("../../assets/bg_pokemon.jpg")}
      style={styles.containerImage}
    >
      <LinearGradient
        colors={["rgba(0,0,0,0.3)", "#000"]}
        style={styles.gradiente}
      >
        <Text style={styles.textTitle}>POKEDEX</Text>
        <Text style={styles.textSlogan}>Temos que pegar Todos! ! !</Text>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  containerImage: {
    width: "100%",
    height: 350,
    color: "#fff",
  },
  gradiente: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 24,
  },
  textTitle: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
  textSlogan: {
    color: "#c4c4c4",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
});
