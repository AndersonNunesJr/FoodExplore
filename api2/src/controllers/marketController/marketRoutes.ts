import { app } from "../../server";
import { marketGet } from "./marketGet";
import { marketUpdate } from "./marketUpdate";

export const marketRotes = async () => {
  app.register(marketGet);
  app.register(marketUpdate);
};
