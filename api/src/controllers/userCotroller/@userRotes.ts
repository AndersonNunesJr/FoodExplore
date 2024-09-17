import { app } from "../../server";
import { userDelete } from "./userDelete";
import { userGet } from "./userGet";

export const userRotes = async () => {
  app.register(userDelete);
  app.register(userGet);
};
