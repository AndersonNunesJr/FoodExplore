import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function productsGet(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/",
    {
      schema: {
        summary: "Get product from all marketplace.",
        tags: ["Get"],
        body: z.object({
          name: z.string().nullable()
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
              .nullish(),
            message: z.string().nullish()
          })
        }
      }
    },
    async (req, reply) => {
      const { name } = req.body;

      if (name) {
        console.log(
          "AKIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII"
        );
        const result = await prisma.product.findMany({
          where: {
            OR: [
              {
                title: name || ""
              },
              {
                category: name
              },
              { marketplace: { storename: name } }
            ]
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

        if (Array.isArray(result) && result.length === 0) {
          return reply.status(404).send({ message: "Product not found" });
        }
        return reply.status(201).send({ result });
      }

      const result = await prisma.product.findMany({
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
