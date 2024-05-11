import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "../routes/_errors/bad-request";

export async function favoritsCreate(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/user/:userId/favorits",
    {
      schema: {
        summary: "Register a product in favorites",
        body: z.object({
          id: z.string(),
          name: z.string().min(4)
        }),
        params: z.object({
          userId: z.string().uuid()
        }),
        response: {
          201: z.object({})
        }
      }
    },
    async (req, reply) => {
      const { userId } = req.params;
      const {} = req.body;

      return reply.status(201).send({});
    }
  );
}
