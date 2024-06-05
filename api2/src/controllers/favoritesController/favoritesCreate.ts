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
      const { productsId } = req.body;
      const { userId } = req.params;

      const user = await prisma.user.findUnique({
        where: { id: userId }
      });
      if (!user) {
        throw new BadRequest("User not found");
      }

      const product = await prisma.product.findUnique({
        where: { id: productsId }
      });

      if (!product) {
        throw new BadRequest("Product not found");
      }

      const existingFavorite = await prisma.favorite.findFirst({
        where: {
          userId
        }
      });

      if (!existingFavorite) {
        const newFavorite = await prisma.favorite.create({
          data: {
            userId,
            products: { connect: { id: product.id } }
          }
        });
        return reply.status(201).send({ favorites: newFavorite });
      } else {
        const updatedFavorite = await prisma.favorite.update({
          where: {
            id: existingFavorite.id
          },
          data: {
            userId,
            products: { connect: { id: product.id } }
          }
        });
        return reply.status(200).send({ favorites: updatedFavorite });
      }
    }
  );
}
