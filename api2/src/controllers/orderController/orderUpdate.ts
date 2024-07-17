import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";

import { BadRequest } from "../../routes/_errors/bad-request";

export async function orderUpdate(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/:marketplaceId/status",
    {
      schema: {
        summary: "Update purchase order.",
        tags: ["Update"],
        body: z.object({
          userId: z.string().uuid(),
          status: z.string(),
          code: z.string().cuid()
        }),
        params: z.object({
          marketplaceId: z.string().uuid()
        }),
        response: {
          201: z.object({
            order: z.object({
              status: z.string(),
              code: z.string(),
              details: z.string(),
              data: z.date()
            })
          })
        }
      }
    },
    async (req, reply) => {
      const { status, code, userId } = req.body;
      const { marketplaceId } = req.params;

      const user = await prisma.user.findUnique({
        where: { id: userId }
      });
      if (!user) {
        throw new BadRequest("User not found");
      }

      const marketplace = await prisma.marketplace.findUnique({
        where: { id: marketplaceId }
      });
      if (!marketplace) {
        throw new BadRequest("Marketplace not found");
      }

      const historic = await prisma.historic.findFirst({
        where: {
          AND: [{ userId }, { marketplaceId }]
        },
        include: {
          orders: true
        }
      });
      if (!historic) {
        throw new BadRequest("User does not have permission.");
      }

      const findCode = await prisma.orders.findFirst({
        where: {
          AND: [{ historicId: historic.id }, { code }]
        }
      });
      if (!findCode) {
        throw new BadRequest("order code not found");
      }

      const updatedOrder = await prisma.orders.update({
        where: {
          historicId_code: {
            historicId: historic?.id,
            code: findCode.code
          }
        },
        data: {
          status
        }
      });

      return reply.status(200).send({
        order: {
          status: updatedOrder.status,
          code: updatedOrder.code,
          details: updatedOrder.details,
          data: updatedOrder.createdAt
        }
      });
    }
  );
}
