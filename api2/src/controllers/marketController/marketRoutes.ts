import { app } from "../../server";
import { marketGet } from "./marketGet";
import { marketUpdate } from "./marketUpdate";
import { marketPicture } from "./marketPicture";

export const marketRotes = async () => {
  app.register(marketGet);
  app.register(marketUpdate);
  app.register(marketPicture);
};
