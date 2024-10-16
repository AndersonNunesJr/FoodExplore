import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function marketGet(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/:marketId",
    {
      schema: {
        summary: "marketplace information.",
        tags: ["Get"],
        params: z.object({
          marketId: z.string().uuid()
        }),
        response: {
          201: z.object({
            result: z
              .array(
                z.object({
                  id: z.string(),
                  title: z.string(),
                  tag: z.string().nullable(),
                  description: z.string().nullable(),
                  category: z.string().nullable(),
                  price: z.string(),
                  productImg: z.string().nullable(),
                  marketplace: z
                    .object({
                      storename: z.string().nullable()
                    })
                    .nullable()
                })
              )
              .nullish()
          })
        }
      }
    },
    async (req, reply) => {
      const { marketId } = req.params;

      const result = await prisma.product.findMany({
        where: {
          marketplaceId: marketId
        },
        select: {
          id: true,
          title: true,
          tag: true,
          description: true,
          category: true,
          price: true,
          productImg: true,
          marketplace: {
            select: {
              storename: true
            }
          }
        }
      });

      return reply.status(201).send({ result });
    }
  );
}
