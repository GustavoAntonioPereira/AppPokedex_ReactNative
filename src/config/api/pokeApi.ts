import Axios from "axios";

export const pokeApi = Axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});
