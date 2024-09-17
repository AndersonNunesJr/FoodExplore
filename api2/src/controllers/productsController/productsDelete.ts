import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { BadRequest } from "../../routes/_errors/bad-request";
import { CookieController } from "../../utils/CookieController";

export async function productsDelete(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/:marketId/delete",
    {
      schema: {
        summary: "Delete marketplace product.",
        tags: ["Delete"],
        body: z.object({
          name: z.string(),
          idProduct: z.string().uuid()
        }),
        params: z.object({
          marketId: z.string().uuid()
        }),
        response: {
          201: z.object({
            message: z.string()
          })
        }
      }
    },
    async (req, reply) => {
      const { name, idProduct } = req.body;
      const { marketId } = req.params;
      const token = req.cookies.token;
      const userCookie = await CookieController(token);

      const marketplace = await prisma.marketplace.findUnique({
        where: { id: marketId }
      });
      if (!marketplace) {
        throw new BadRequest("Marketplace not found");
      }

      const findUser = await prisma.user.findFirst({
        where: {
          AND: [{ id: marketplace.userId }, { email: userCookie.email }]
        }
      });

      if (!findUser) {
        throw new BadRequest("Operation not permitted");
      }

      const product = await prisma.product.findFirst({
        where: {
          title: name,
          id: idProduct,
          marketplaceId: marketId
        }
      });

      if (!product) {
        throw new BadRequest("Product name not found.");
      }

      await prisma.product.delete({
        where: {
          id: product?.id,
          title: product?.title,
          marketplaceId: product?.marketplaceId
        }
      });

      return reply
        .status(201)
        .send({ message: "Products deleted successfully" });
    }
  );
}
