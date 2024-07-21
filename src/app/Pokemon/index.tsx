import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { pokeApi } from "../../config/api/pokeApi";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import type {
  PokeApiPaginatedResponse,
  PokeAPIPokemon,
} from "../../interface/pokeApi.interfaces";
import { PokeballBg } from "../../components/PokeballBg";
import { FlatList } from "react-native-gesture-handler";
import { PokemonCard } from "../../components/PokemonCard";

export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  avatar: string;
  sprites: string[];

  games: string[];
  stats: Stat[];
  abilities: string[];
  moves: Move[];
}

export interface Stat {
  name: string;
  value: number;
}

export interface Move {
  name: string;
  level: number;
}

export class PokemonMapper {
  static pokeApiUnitToPokemon(data: PokeAPIPokemon): Pokemon {
    const sprites = PokemonMapper.getSprite(data);
    const avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;

    return {
      id: data.id,
      name: data.name,
      avatar: avatar,
      sprites: sprites,
      types: data.types.map((type) => type.type.name),

      games: data.game_indices.map((game) => game.version.name),
      stats: data.stats.map((stat) => ({
        name: stat.stat.name,
        value: stat.base_stat,
      })),
      abilities: data.abilities.map((ability) => ability.ability.name),
      moves: data.moves
        .map((move) => ({
          name: move.move.name,
          level: move.version_group_details[0].level_learned_at,
        }))
        .sort((a, b) => a.level - b.level),
    };
  }

  static getSprite(data: PokeAPIPokemon): string[] {
    const sprite: string[] = [
      data.sprites.front_default,
      data.sprites.back_default,
      data.sprites.front_shiny,
      data.sprites.back_shiny,
    ];

    if (data.sprites.other?.home.front_default)
      sprite.push(data.sprites.other?.home.front_default);
    if (data.sprites.other?.["official-artwork"].front_default)
      sprite.push(data.sprites.other?.["official-artwork"].front_default);
    if (data.sprites.other?.["official-artwork"].front_shiny)
      sprite.push(data.sprites.other?.["official-artwork"].front_shiny);
    if (data.sprites.other?.showdown.front_default)
      sprite.push(data.sprites.other?.showdown.front_default);
    if (data.sprites.other?.showdown.back_default)
      sprite.push(data.sprites.other?.showdown.back_default);

    return sprite;
  }
}

const getPokemon = async (
  page: number,
  limit: number = 20
): Promise<Pokemon[]> => {
  try {
    const url = `/pokemon?offset=${page * 10}&limit=${limit}`;
    const { data } = await pokeApi.get<PokeApiPaginatedResponse>(url);

    const pokemonPromise = data.results.map((info) => {
      return pokeApi.get<PokeAPIPokemon>(info.url);
    });

    const pokeApiPokemons = await Promise.all(pokemonPromise);
    const pokemons = pokeApiPokemons.map((item) =>
      PokemonMapper.pokeApiUnitToPokemon(item.data)
    );

    return pokemons;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao buscar pokemons");
  }
};

export const Pokemon = () => {
  const queryClient = useQueryClient();

  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["pokemons", "infinite"],
    initialPageParam: 0,
    staleTime: 1000 * 60 * 60,
    queryFn: async (params) => {
      const pokemons = await getPokemon(params.pageParam);
      pokemons.forEach((pokemon) => {
        queryClient.setQueryData(["pokemon", pokemon.id], pokemon);
      });

      return pokemons;
    },
    getNextPageParam: (lastPage, pages) => pages.length,
  });

  return (
    <View style={styles.container}>
      <PokeballBg style={styles.imagePosition} />
      <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={1}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        onEndReachedThreshold={0.6}
        onEndReached={() => fetchNextPage()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  imagePosition: {
    position: "absolute",
    top: -100,
    right: -100,
  },
  text: {
    color: "#fff",
  },
});
