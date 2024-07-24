import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { BadRequest } from "../../routes/_errors/bad-request";
import { CookieController } from "../../utils/CookieController";

export async function productsCreate(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/:marketId",
    {
      schema: {
        summary: "Create marketplace product.",
        tags: ["Post"],
        body: z.object({
          name: z.string(),
          tag: z.array(z.string()).nullish(),
          description: z.string(),
          category: z.string(),
          price: z.string(),
          productImg: z.string().nullish()
        }),
        params: z.object({
          marketId: z.string().uuid()
        }),
        response: {
          201: z.object({
            products: z.object({
              id: z.string().uuid(),
              title: z.string(),
              tag: z.string().nullable(),
              description: z.string().nullish(),
              category: z.string().nullish(),
              price: z.string()
            })
          })
        }
      }
    },
    async (req, reply) => {
      const { name, description, tag, price, category, productImg } = req.body;
      const { marketId } = req.params;
      // const token = req.cookies.token;
      // const userCookie = await CookieController(token);

      const tagString = tag ? JSON.stringify(tag) : null;

      const marketplace = await prisma.marketplace.findUnique({
        where: { id: marketId }
      });
      if (!marketplace) {
        throw new BadRequest("Marketplace not found");
      }

      // const findUser = await prisma.user.findFirst({
      //   where: {
      //     AND: [{ id: marketplace.userId }, { email: userCookie.email }]
      //   }
      // });

      // if (!findUser) {
      //   throw new BadRequest("Operation not permitted");
      // }

      const findProduct = await prisma.product.findFirst({
        where: {
          title: name,
          marketplaceId: marketId
        }
      });

      if (findProduct) {
        throw new BadRequest("There is already a product with that name");
      }

      if (tag) {
        const createTagsPromises = tag.map((tagName) =>
          prisma.tag
            .create({
              data: {
                name: tagName
              }
            })
            .catch((error) => {
              console.error(`Erro ao criar tag ${tagName}:`, error);
            })
        );
        console.log(createTagsPromises);
      }

      const products = await prisma.product.create({
        data: {
          title: name,
          tag: tagString,
          description,
          category,
          price,
          marketplaceId: marketId,
          productImg
        },
        select: {
          id: true,
          title: true,
          description: true,
          category: true,
          price: true,
          tag: true,
          productImg: true
        }
      });

      return reply.status(201).send({ products });
    }
  );
}
