import { app } from "../../server";
import { orderCreate } from "./orderCreate";
import { orderGet } from "./orderGet";
import { orderUpdate } from "./orderUpdate";

export const orderRotes = async () => {
  app.register(orderCreate);
  app.register(orderGet);
  app.register(orderUpdate);
};
