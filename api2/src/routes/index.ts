import { FastifyInstance } from "fastify";

export default function routes(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    return { hello: "world" };
  });
}
