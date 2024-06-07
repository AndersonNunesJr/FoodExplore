import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { BadRequest } from "../../routes/_errors/bad-request";

export async function productsDelete(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/:marketId/delete/products",
    {
      schema: {
        body: z.object({
          name: z.string(),
          idProduct: z.string().uuid()
          idProduct: z.string()
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
