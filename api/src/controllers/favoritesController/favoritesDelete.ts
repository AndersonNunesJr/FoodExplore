import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";

import { BadRequest } from "../../routes/_errors/bad-request";
import { CookieController } from "../../utils/CookieController";

export async function favoritesDelete(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/:userId/delete",
    {
      schema: {
        summary: "Delete products from user favorites.",
        tags: ["Delete"],
        body: z.object({
          productsId: z.string().uuid()
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
      // const token = req.cookies.token;
      // const userCookie = await CookieController(token);

      console.log("4");

      const user = await prisma.user.findUnique({
        select: {
          favorites: true
        },
        where: { id: userId }
      });

      if (!user) {
        throw new BadRequest("User not found");
      }

      const existingFavorite = await prisma.favorite.findFirst({
        where: {
          userId
        }
      });
      if (!existingFavorite) {
        throw new BadRequest(
          "This product cannot be deleted from your favorites!"
        );
      }

      console.log("3");
      // const findUser = await prisma.user.findFirst({
      //   where: {
      //     AND: [{ id: userId }, { email: userCookie.email }]
      //   }
      // });
      // if (!findUser) {
      //   throw new BadRequest("Operation not permitted");
      // }

      const findProductInFavorites = await prisma.favorite.findFirst({
        include: {
          products: {
            where: {
              id: productsId
            }
          }
        },
        where: {
          id: user.favorites?.id,
          products: { some: { id: productsId } }
        }
      });

      if (!findProductInFavorites) {
        throw new BadRequest("Favorite or Product not found");
      }
      console.log("2");
      await prisma.favorite.update({
        where: {
          id: user.favorites?.id
        },
        data: {
          products: {
            disconnect: [{ id: productsId }]
          }
        }
      });
      console.log("1");
      return reply
        .status(201)
        .send({ message: "Favorites deleted successfully" });
    }
  );
}
