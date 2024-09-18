import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";

import { BadRequest } from "../../routes/_errors/bad-request";
import { CookieController } from "../../utils/CookieController";

export async function favoritesGet(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/:userId",
    {
      schema: {
        summary: "Get products from user favorites.",
        tags: ["Get"],
        params: z.object({
          userId: z.string().uuid()
        }),
        querystring: z.object({
          query: z.string().nullish(),
          pageIndex: z.string().nullish().default("0").transform(Number)
        }),
        response: {
          201: z.object({
            result: z.object({
              id: z.string(),
              products: z.array(
                z
                  .object({
                    id: z.string(),
                    title: z.string(),
                    tag: z.string().nullable(),
                    description: z.string().nullable(),
                    category: z.string().nullable(),
                    price: z.string(),
                    marketplaceId: z.string().nullable()
                  })
                  .nullable()
              )
            })
          })
        }
      }
    },
    async (req, reply) => {
      const { userId } = req.params;
      // const token = req.cookies.token;
      // const userCookie = await CookieController(token);

      const user = await prisma.user.findUnique({
        select: {
          favorites: true
        },
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

      const result = await prisma.favorite.findFirst({
        include: {
          products: {
            orderBy: {
              createdAt: "desc"
            }
          }
        },
        where: {
          AND: [{ userId }, { id: user.favorites?.id }]
        }
      });

      if (!result) {
        throw new BadRequest("There is nothing registered in favorites!");
      }

      return reply.status(201).send({ result });
    }
  );
}
