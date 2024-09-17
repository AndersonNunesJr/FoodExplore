import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";

import { BadRequest } from "../../routes/_errors/bad-request";

export async function orderGet(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/:idKey/status",
    {
      schema: {
        summary: "Get purchase order.",
        tags: ["Get"],
        params: z.object({
          idKey: z.string().uuid()
        }),
        response: {
          201: z.object({
            historic: z
              .array(
                z.object({
                  orders: z.array(
                    z.object({
                      status: z.string().nullish(),
                      code: z.string().nullish(),
                      details: z.string().nullish(),
                      data: z.date().nullish(),
                      historicId: z.string().nullish()
                    })
                  )
                })
              )
              .nullable()
          })
        }
      }
    },
    async (req, reply) => {
      const { idKey } = req.params;

      const user = await prisma.user.findUnique({
        where: { id: idKey }
      });

      const marketplaceId = await prisma.marketplace.findUnique({
        where: { id: idKey }
      });

      if (!user && !marketplaceId) {
        throw new BadRequest("User not found");
      }

      const historic = await prisma.historic.findMany({
        where: {
          OR: [
            {
              userId: idKey
            },
            {
              marketplaceId: idKey
            }
          ]
        },
        include: {
          orders: {
            select: {
              status: true,
              code: true,
              details: true,
              createdAt: true,
              historicId: true
            }
          }
        }
      });

      return reply.status(201).send({
        historic
      });
    }
  );
}
