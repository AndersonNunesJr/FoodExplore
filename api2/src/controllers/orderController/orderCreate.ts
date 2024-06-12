import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";

import { BadRequest } from "../../routes/_errors/bad-request";

export async function orderCreate(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/:userId/order",
    {
      schema: {
        body: z.object({
          marketplaceId: z.string().uuid(),
          status: z.string(),
          details: z.array(z.string()),
          code: z.string().cuid().nullish()
        }),
        params: z.object({
          userId: z.string().uuid()
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
      const { status, details, code, marketplaceId } = req.body;
      const { userId } = req.params;

      const detailsString = JSON.stringify(details);

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
          userId,
          marketplaceId
        },
        include: {
          orders: true
        }
      });

      if (!code) {
        const newOrder = await prisma.orders.create({
          data: {
            status,
            details: detailsString,
            historic: {
              connectOrCreate: {
                where: {
                  userId_marketplaceId: {
                    userId,
                    marketplaceId
                  }
                },
                create: {
                  userId,
                  marketplaceId
                }
              }
            }
          }
        });
        return reply.status(201).send({
          order: {
            status: newOrder.status,
            code: newOrder.code,
            details: newOrder.details,
            data: newOrder.createdAt
          }
        });
      } else {
        const existingOrder = historic?.orders.find(
          (order) => order.code === code
        );

        if (existingOrder) {
          const updatedOrder = await prisma.orders.update({
            where: { id: existingOrder.id },
            data: {
              status,
              details: detailsString
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
      }
    }
  );
}
