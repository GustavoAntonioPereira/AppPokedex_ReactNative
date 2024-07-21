import { Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export const Loader = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gray",
      }}
    >
      <ActivityIndicator color="blue" size="large" />
    </View>
  );
};
