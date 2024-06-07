import { app } from "../../server";
import { productsCreate } from "./productsCreate";
import { productsDelete } from "./productsDelete";
import { productsGet } from "./productsGet";

export const productsRotes = async () => {
  app.register(productsCreate);
  app.register(productsDelete);
  app.register(productsGet);
};
