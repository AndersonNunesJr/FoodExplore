import { app } from "../../server";
import { favoritesCreate } from "./favoritesCreate";

export const favoritesRotes = async () => {
  app.register(favoritesCreate);
};
