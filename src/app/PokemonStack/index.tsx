import { createStackNavigator } from "@react-navigation/stack";
import { Details } from "../Details";
import { Pokemon } from "../Pokemon";

export type RootStackParams = {
  PokemonList: undefined;
  Details: { pokemonId: number };
};

const Stack = createStackNavigator<RootStackParams>();

function PokemonStack() {
  return (
    <Stack.Navigator initialRouteName="PokemonList">
      <Stack.Screen
        name="PokemonList"
        component={Pokemon}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default PokemonStack;
