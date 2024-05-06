import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export default async function routes(app: FastifyInstance) {
  app.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(201).send({ hello: "seu papai" });
  });
}
