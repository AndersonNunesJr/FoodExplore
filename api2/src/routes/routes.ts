// import { favoritsCreate } from "../controllers/productsController/favoritsProducts";
import { userRotes } from "../controllers/userCotroller/userRotes";
import { app } from "../server";

export const routes = async () => {
  app.register(userRotes);
  // app.register(favoritsCreate);
};
