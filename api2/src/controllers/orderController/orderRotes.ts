import { app } from "../../server";
import { orderCreate } from "./orderCreate";

export const orderRotes = async () => {
  app.register(orderCreate);
};
