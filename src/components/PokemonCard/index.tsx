import { StyleSheet, Image, Pressable } from "react-native";
import { Pokemon } from "../../app/Pokemon/index";
import { Card, Text } from "react-native-paper";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParams } from "../../app/PokemonStack";

interface Props {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <Pressable
      onPress={() => navigation.navigate("Details", { pokemonId: pokemon.id })}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
        flex: 1,
      })}
    >
      <Card style={[styles.cardContainer]}>
        <Text style={styles.name} variant="bodyLarge" lineBreakMode="middle">
          {pokemon.name}
          {"\n#" + pokemon.id}
        </Text>

        <Image source={{ uri: pokemon.avatar }} style={styles.pokemonImage} />

        <Text style={[styles.name, { marginTop: 100 }]}>
          {pokemon.types[0]}
        </Text>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: "grey",
    marginTop: 15,
    height: 190,
    width: 220,
    flex: 0.5,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  name: {
    color: "white",
    top: 10,
    left: 10,
  },
  pokeball: {
    width: 100,
    height: 100,
    right: -25,
    top: -25,
    opacity: 0.4,
  },
  pokemonImage: {
    width: 180,
    height: 180,
    position: "absolute",
    right: -20,
    top: 20,
  },

  pokeballContainer: {
    alignItems: "flex-end",
    width: "100%",
    position: "absolute",

    overflow: "hidden",
    opacity: 0.5,
  },
});
