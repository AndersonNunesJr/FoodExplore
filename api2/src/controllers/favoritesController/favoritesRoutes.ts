import { app } from "../../server";
import { favoritesCreate } from "./favoritesCreate";
import { favoritesDelete } from "./favoritesDelete";
import { favoritesGet } from "./favoritesGet";

export const favoritesRotes = async () => {
  app.register(favoritesCreate);
  app.register(favoritesDelete);
  app.register(favoritesGet);
};
