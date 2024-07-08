import { FastifyInstance } from "fastify";
import { favoritesRotes } from "../controllers/favoritesController/@favoritesRoutes";
import { marketRotes } from "../controllers/marketController/@marketRoutes";
import { orderRotes } from "../controllers/orderController/@orderRotes";
import { productsRotes } from "../controllers/productsController/@productsRoutes";
import { roleCreate } from "../controllers/roleController/roleCreate";
import { userRotes } from "../controllers/userCotroller/@userRotes";
import { app } from "../server";
import { AuthMiddleware } from "../utils/AuthMiddleware";
import { AuthController } from "../utils/AuthController";
import { userCreate } from "../controllers/userCotroller/userCreate";
import { productsGet } from "../controllers/productsController/productsGet";

async function privateRoutes(app: FastifyInstance) {
  app.addHook("preHandler", AuthMiddleware);

  app.register(roleCreate, {
    prefix: "/role"
  });
  app.register(userRotes, { prefix: "/user" });

  app.register(productsRotes, {
    prefix: "/products"
  });
  app.register(favoritesRotes, {
    prefix: "/favorites"
  });
  app.register(orderRotes, {
    prefix: "/order"
  });
  app.register(marketRotes);
}

async function publicRoutes(app: FastifyInstance) {
  app.register(AuthController, { prefix: "/sign" });
  app.register(userCreate, { prefix: "/user" });
  app.register(productsGet, { prefix: "/products" });
}

export const routes = async () => {
  app.register(privateRoutes);
  app.register(publicRoutes);
};
