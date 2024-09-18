import { FastifyInstance } from "fastify";
import { favoritesRotes } from "../controllers/favoritesController/@favoritesRoutes";
import { marketRotes } from "../controllers/marketController/@marketRoutes";
import { orderRotes } from "../controllers/orderController/@orderRotes";
import { productsRotes } from "../controllers/productsController/@productsRoutes";
import { roleCreate } from "../controllers/roleController/roleCreate";
import { userRotes } from "../controllers/userCotroller/@userRotes";
import { AuthMiddleware } from "../utils/AuthMiddleware";
import { Sing } from "../controllers/sing/Sing";
import { userCreate } from "../controllers/userCotroller/userCreate";
import { productsGet } from "../controllers/productsController/productsGet";
import { app } from "../server";

async function privateRoutes(app: FastifyInstance) {
  app.addHook("preHandler", AuthMiddleware);

  app.register(userRotes, { prefix: "/user" });

  app.register(productsRotes, {
    prefix: "/products"
  });

  app.register(orderRotes, {
    prefix: "/order"
  });
  app.register(marketRotes);
}

async function publicRoutes(app: FastifyInstance) {
  app.register(Sing, { prefix: "/sing" });
  app.register(userCreate, { prefix: "/user" });
  app.register(productsGet, { prefix: "/products" });

  /// VOLTAR PRO PIVATE
  app.register(favoritesRotes, {
    prefix: "/favorites"
  });
}

async function projectAdmin(app: FastifyInstance) {
  app.addHook("preHandler", AuthMiddleware);
  app.register(roleCreate, {
    prefix: "/role"
  });
}

export const routes = async () => {
  app.register(privateRoutes);
  app.register(publicRoutes);
  app.register(projectAdmin);
};
