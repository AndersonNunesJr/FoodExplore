import { app } from "../../server";
import { userCreate } from "./userCreate";
import { userDelete } from "./userDelete";
import { userGet } from "./userGet";

export const userRotes = async () => {
  app.register(userCreate);
  app.register(userDelete);
  app.register(userGet);
};
