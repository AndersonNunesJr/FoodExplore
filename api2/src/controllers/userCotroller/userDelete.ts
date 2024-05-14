import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function userDelete(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/delete",
    {
      schema: z.object({
        response: {
          201: z.object({
            message: z.string()
          })
        }
      })
    },
    async (req, reply) => {
      await prisma.user.deleteMany();
      return reply.status(201).send({ message: "User deleted successfully" });
    }
  );
}
