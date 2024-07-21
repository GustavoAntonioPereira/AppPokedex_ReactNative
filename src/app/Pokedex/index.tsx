import { StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Search } from "../../app/Search";
import PokemonStack from "../PokemonStack";
import Cover from "../../components/Cover";

const { Navigator, Screen } = createMaterialTopTabNavigator();

export function Pokedex() {
  return (
    <SafeAreaView style={styles.container}>
      <Cover />

      <NavigationContainer>
        <Navigator
          screenOptions={{
            tabBarActiveTintColor: "#E61600",
            tabBarInactiveTintColor: "#047695",
            tabBarLabelStyle: {
              fontSize: 18,
              fontWeight: "bold",
              paddingVertical: 6,
            },
            tabBarIndicatorContainerStyle: {
              backgroundColor: "#191919",
            },
            tabBarIndicatorStyle: {
              backgroundColor: "#E61600",
              height: 5,
            },
          }}
        >
          <Screen name="Pokemon" component={PokemonStack} />
          <Screen name="Pesquisa" component={Search} />
        </Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
