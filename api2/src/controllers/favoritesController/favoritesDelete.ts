import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";

import { BadRequest } from "../../routes/_errors/bad-request";

export async function favoritesDelete(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/:userId/delete/favorites",
    {
      schema: {
        body: z.object({
          productsId: z.string()
        }),
        params: z.object({
          userId: z.string().uuid()
        }),
        response: {
          201: z.object({
            message: z.string()
          })
        }
      }
    },
    async (req, reply) => {
      const { productsId } = req.body;
      const { userId } = req.params;

      const u = await prisma.user.findUnique({
        select: {
          favorites: true
        },
        where: { id: userId }
      });

      if (!u) {
        throw new BadRequest("User not found");
      }

      await prisma.favorite.delete({
        select: {
          user: true
        },
        where: {
          userId,
          products: { connect: { id: productsId } }
        }
      });

      return reply.status(201).send({ message: "User deleted successfully" });
    }
  );
}
