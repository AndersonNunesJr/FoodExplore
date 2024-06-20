import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function marketGet(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/:marketplaceId",
    {
      schema: {
        summary: "marketplace information.",
        tags: ["Get"],
        params: z.object({
          marketplaceId: z.string().uuid()
        }),
        response: {
          201: z.object({
            result: z
              .object({
                storename: z.string().nullish(),
                products: z.array(
                  z.object({
                    id: z.string(),
                    title: z.string(),
                    tag: z.string().nullable(),
                    description: z.string().nullable(),
                    category: z.string().nullable(),
                    price: z.string()
                  })
                )
              })
              .nullable()
          })
        }
      }
    },
    async (req, reply) => {
      const { marketplaceId } = req.params;

      const result = await prisma.marketplace.findFirst({
        include: {
          products: {
            orderBy: {
              createdAt: "desc"
            }
          }
        },
        where: {
          id: marketplaceId
        }
      });

      return reply.status(201).send({ result });
    }
  );
}
