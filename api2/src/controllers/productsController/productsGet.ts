import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";

// import { BadRequest } from "../../routes/_errors/bad-request";

export async function productsGet(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/products",
    {
      schema: {
        response: {
          201: z.object({
            result: z.array(
              z.object({
                id: z.string(),
                title: z.string(),
                tag: z.string().nullable(),
                description: z.string().nullable(),
                category: z.string().nullable(),
                price: z.string(),
                marketplace: z
                  .object({
                    storename: z.string().nullable()
                  })
                  .nullable()
              })
            )
          })
        }
      }
    },
    async (req, reply) => {
      const result = await prisma.product.findMany({
        select: {
          id: true,
          title: true,
          tag: true,
          description: true,
          category: true,
          price: true,
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
