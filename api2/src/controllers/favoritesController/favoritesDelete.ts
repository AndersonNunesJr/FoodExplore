import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";

import { BadRequest } from "../../routes/_errors/bad-request";

export async function favoritesDelete(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/:userId/delete",
    {
      schema: {
        summary: "Delete products from user favorites.",
        tags: ["Delete"],
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

      const user = await prisma.user.findUnique({
        select: {
          favorites: true
        },
        where: { id: userId }
      });

      const product = await prisma.product.findUnique({
        where: { id: productsId }
      });

      if (!user) {
        throw new BadRequest("User not found");
      }

      // const favorite = await prisma.favorite.findFirst({
      //   where: {
      //     id: userId,
      //     products: {
      //       some: { id: productsId }
      //     }
      //   },
      //   include: {
      //     products: {
      //       where: { id: productsId }
      //     }
      //   }
      // });

      // if (favorite) {
      //   throw new BadRequest("Favorite or Product not found");
      // }

      await prisma.favorite.update({
        where: {
          id: user.favorites?.id
        },
        data: {
          products: {
            disconnect: [{ id: product?.id }]
          }
        }
      });

      return reply
        .status(201)
        .send({ message: "Favorites deleted successfully" });
    }
  );
}
