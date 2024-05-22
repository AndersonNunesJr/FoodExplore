import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function productsDelete(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/:marketId/delete/products",
    {
      schema: {
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

      const product = await prisma.products.findFirst({
        where: {
          id: idProduct,
          title: name,
          marketplaceId: marketId
        }
      });

      await prisma.products.delete({
        where: {
          id: product?.id
        }
      });

      return reply
        .status(201)
        .send({ message: "Products deleted successfully" });
    }
  );
}
