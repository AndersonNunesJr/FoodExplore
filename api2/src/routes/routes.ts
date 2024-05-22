// import { favoritsCreate } from "../controllers/productsController/favoritsProducts";
import { productsRotes } from "../controllers/productsController/productsRoutes";
import { roleCreate } from "../controllers/roleController/roleCreate";
import { userRotes } from "../controllers/userCotroller/userRotes";
import { app } from "../server";

export const routes = async () => {
  app.register(userRotes);
  app.register(roleCreate);
  app.register(productsRotes);
};
