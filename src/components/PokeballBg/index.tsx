import { Image, ImageStyle, StyleProp } from "react-native";

interface Props {
  style?: StyleProp<ImageStyle>;
}

export const PokeballBg = ({ style }: Props) => {
  return (
    <Image
      source={require("../../assets/pokeball-light.png")}
      style={[
        {
          width: 300,
          height: 300,
          opacity: 0.3,
        },
        style,
      ]}
    />
  );
};
