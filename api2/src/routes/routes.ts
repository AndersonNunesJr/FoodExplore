import { favoritesRotes } from "../controllers/favoritesController/favoritesRoutes";
import { marketRotes } from "../controllers/marketController/marketRoutes";
import { orderRotes } from "../controllers/orderController/orderRotes";
import { productsRotes } from "../controllers/productsController/productsRoutes";
import { roleCreate } from "../controllers/roleController/roleCreate";
import { userRotes } from "../controllers/userCotroller/userRotes";
import { app } from "../server";

export const routes = async () => {
  app.register(userRotes);
  app.register(roleCreate);
  app.register(productsRotes);
  app.register(favoritesRotes);
  app.register(orderRotes);
  app.register(marketRotes);
};
