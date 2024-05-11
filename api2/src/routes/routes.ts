import { favoritsCreate } from "../controllers/favoritsController";
import { userCreate } from "../controllers/userCotroler/userCreateController";
import { app } from "../server";

export const routes = async () => {
  app.register(userCreate);
  app.register(favoritsCreate);
};
