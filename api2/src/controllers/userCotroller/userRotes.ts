import { app } from "../../server";
import { userCreate } from "./userCreate";
import { userDelete } from "./userDelete";

export const userRotes = async () => {
  app.register(userCreate);
  app.register(userDelete);
};
