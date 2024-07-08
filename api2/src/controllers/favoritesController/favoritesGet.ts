import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";

import { BadRequest } from "../../routes/_errors/bad-request";

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
            result: z
              .object({
                id: z.string(),
                products: z.array(
                  z.object({
                    id: z.string(),
                    title: z.string(),
                    tag: z.string().nullable(),
                    description: z.string().nullable(),
                    category: z.string().nullable(),
                    price: z.string(),
                    marketplaceId: z.string().nullable()
                  })
                )
              })
              .nullable()
          })
        }
      }
    },
    async (req, reply) => {
      const { userId } = req.params;

      const user = await prisma.user.findUnique({
        select: {
          favorites: true
        },
        where: { id: userId }
      });
      if (!user) {
        throw new BadRequest("User not found");
      }

      const result = await prisma.favorite.findFirst({
        include: {
          products: {
            orderBy: {
              createdAt: "desc"
            }
          }
        },
        where: {
          id: user.favorites?.id
        }
      });

      return reply.status(201).send({ result });
    }
  );
}
