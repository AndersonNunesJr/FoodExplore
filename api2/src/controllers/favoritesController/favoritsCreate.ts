import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";

import { BadRequest } from "../../routes/_errors/bad-request";

export async function favoritesCreate(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/create/favorites",
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

      await prisma.favorites.create({
        data: { userId, id: productsId }
      });

      return reply
        .status(201)
        .send({ message: "Product added to favorites successfully" });
    }
  );
}
