import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";

import { BadRequest } from "../../routes/_errors/bad-request";
// import { CookieController } from "../../utils/CookieController";

export async function favoritesCreate(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/:userId/create",
    {
      schema: {
        summary: "Adding products from user favorites.",
        tags: ["Post"],
        body: z.object({
          productsId: z.string().uuid()
        }),
        params: z.object({
          userId: z.string().uuid()
        }),
        response: {
          201: z.object({
            // favorites: z.object({})
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

      const user = await prisma.user.findUnique({
        where: { id: userId }
      });
      if (!user) {
        throw new BadRequest("User not found");
      }

      // const findUser = await prisma.user.findFirst({
      //   where: {
      //     AND: [{ id: userId }, { email: userCookie.email }]
      //   }
      // });
      // if (!findUser) {
      //   throw new BadRequest("Operation not permitted");
      // }

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
        await prisma.favorite.create({
          data: {
            userId,
            products: { connect: { id: product.id } }
          }
        });
      } else {
        await prisma.favorite.update({
          where: {
            id: existingFavorite.id
          },
          data: {
            userId,
            products: { connect: { id: product.id } }
          }
        });
        return reply
          .status(200)
          .send({ message: "Favorites add successfully" });
      }
      return reply.status(200).send({ message: "Favorites add successfully" });
    }
  );
}
