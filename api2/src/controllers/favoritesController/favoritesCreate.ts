import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";

import { BadRequest } from "../../routes/_errors/bad-request";

export async function favoritesCreate(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/:userId/favorites",
    {
      schema: {
        body: z.object({
          marketId: z.string().uuid(),
          productsId: z.string().uuid()
        }),
        params: z.object({
          userId: z.string().uuid()
        }),
        response: {
          201: z.object({
            favorites: z.object({})
          })
        }
      }
    },
    async (req, reply) => {
      const { marketId, productsId } = req.body;
      const { userId } = req.params;

      const a = await prisma.favorites.findFirst({
        where: {
          userId
        }
      });

      if (!a) {
        const favorites = await prisma.favorites.create({
          data: {
            userId,
            productsId
          }
        });
        return reply.status(201).send({ favorites });
        // throw new BadRequest("User not found");
      }
      const favorites = await prisma.favorites.update({
        where: {
          userId
        },
        data: {
          userId,
          productsId
        }
      });

      return reply.status(201).send({ favorites });
    }
  );
}
