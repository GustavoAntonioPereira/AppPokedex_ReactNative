import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-paper";
import { Pokemon } from "../Pokemon";
import { PokemonCard } from "../../components/PokemonCard";
import { pokeApi } from "../../config/api/pokeApi";
import { PokeApiPaginatedResponse } from "../../interface/pokeApi.interfaces";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getPokemonById } from "../Details";
import { Loader } from "../../components/Loader";

const getPokemonNameAndId = async () => {
  const url = `pokemon?limit=1000`;
  const { data } = await pokeApi.get<PokeApiPaginatedResponse>(url);
  return data.results.map((info) => ({
    id: Number(info.url.split("/")[6]),
    name: info.name,
  }));
};

const getPokemonByIds = async (ids: number[]): Promise<Pokemon[]> => {
  try {
    const pokemonPromises: Promise<Pokemon>[] = ids.map((id) =>
      getPokemonById(id)
    );
    return Promise.all(pokemonPromises);
  } catch (error) {
    console.error(`Erro ao buscar pokemons por ids: ${ids}`, error);
    throw new Error(`Erro ao buscar pokemons por ids: ${ids}`);
  }
};

export const Search = () => {
  const [term, setTerm] = useState("");

  const { isLoading, data: pokemonListName = [] } = useQuery({
    queryKey: ["pokemons", "all"],
    queryFn: getPokemonNameAndId,
  });

  const pokemonNameIdList = useMemo(() => {
    if (!isNaN(Number(term))) {
      const pokemon = pokemonListName.find(
        (pokemon) => pokemon.id === Number(term)
      );
      return pokemon ? [pokemon] : [];
    }

    if (term.length === 0) return [];

    if (term.length < 3) return [];

    return pokemonListName.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(term.toLowerCase())
    );
  }, [term, pokemonListName]);

  const { isLoading: isLoadingPokemons, data: pokemonsList = [] } = useQuery({
    queryKey: [
      "pokemons",
      "by",
      "pokemonNameIdList",
      pokemonNameIdList.map((p) => p.id),
    ],
    queryFn: () =>
      getPokemonByIds(pokemonNameIdList.map((pokemon) => pokemon.id)),
    staleTime: 1000 * 60 * 5,
    enabled: pokemonNameIdList.length > 0,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Pesquisar Pokémon..."
        placeholderTextColor={"#cccccc"}
        mode="flat"
        autoFocus
        autoCorrect={false}
        onChangeText={setTerm}
        value={term}
        theme={{ colors: { text: "#fff" } }}
        style={{
          backgroundColor: "transparent",
          height: 40,
          fontSize: 26,
          marginHorizontal: 22,
          paddingBottom: 16,
          color: "#fff",
        }}
      />

      {isLoadingPokemons && (
        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={{ marginTop: 20 }}
        />
      )}

      <FlatList
        data={pokemonsList}
        keyExtractor={(pokemon) => `${pokemon.id}`}
        numColumns={2}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: StatusBar.currentHeight,
    color: "#fff",
  },
});
