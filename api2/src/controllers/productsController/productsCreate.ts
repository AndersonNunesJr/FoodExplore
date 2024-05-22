import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { BadRequest } from "../../routes/_errors/bad-request";

export async function productsCreate(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/:marketId/products",
    {
      schema: {
        body: z.object({
          name: z.string(),
          tag: z.array(z.string()).nullish(),
          description: z.string(),
          price: z.string()
        }),
        params: z.object({
          marketId: z.string().uuid()
        }),
        response: {
          201: z.object({
            products: z.object({
              id: z.string().uuid(),
              title: z.string(),
              description: z.string().nullish(),
              price: z.string()
            })
          })
        }
      }
    },
    async (req, reply) => {
      const { name, description, tag, price } = req.body;
      const { marketId } = req.params;

      const tagString = tag ? JSON.stringify(tag) : null;

      const a = await prisma.products.findFirst({
        where: {
          title: name,
          marketplaceId: marketId
        }
      });

      if (a) {
        throw new BadRequest("There is already a product with that name");
      }

      const products = await prisma.products.create({
        data: {
          title: name,
          tag: tagString,
          description,
          price,
          marketplaceId: marketId
        },
        select: {
          id: true,
          title: true,
          description: true,
          price: true
        }
      });

      return reply.status(201).send({ products });
    }
  );
}
