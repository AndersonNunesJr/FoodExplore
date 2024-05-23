import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";

import { BadRequest } from "../../routes/_errors/bad-request";

export async function favoritesDelete(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/delete/favorites",
    {
      schema: {
        body: z.object({
          userId: z.string(),
          productsId: z.string()
        }),
        response: {
          201: z.object({
            message: z.string()
          })
        }
      }
    },
    async (req, reply) => {
      const { userId, productsId } = req.body;

      const u = await prisma.user.findUnique({
        select: {
          favorites: true
        },
        where: { id: userId }
      });

      if (!u) {
        throw new BadRequest("User not found");
      }

      await prisma.favorites.delete({
        select: {
          user: true
        },
        where: { id: productsId }
      });

      return reply.status(201).send({ message: "User deleted successfully" });
    }
  );
}
