import { app } from "../../server";
import { productsCreate } from "./productsCreate";
import { productsDelete } from "./productsDelete";

export const productsRotes = async () => {
  app.register(productsCreate);
  app.register(productsDelete);
};
