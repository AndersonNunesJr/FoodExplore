import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { BadRequest } from "../../routes/_errors/bad-request";
import { CookieController } from "../../utils/CookieController";

export async function marketUpdate(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/:marketplaceId/update",
    {
      schema: {
        summary: "Update the marketplace.",
        tags: ["Update"],
        params: z.object({
          marketplaceId: z.string().uuid()
        }),
        body: z.object({
          name: z.string().optional(),
          description: z.string().optional()
        }),
        response: {
          201: z.object({
            message: z.string()
          })
        }
      }
    },
    async (req, reply) => {
      const { marketplaceId } = req.params;
      const { name, description } = req.body;
      const token = req.cookies.token;
      const userCookie = await CookieController(token);

      const marketplace = await prisma.marketplace.findUnique({
        where: { id: marketplaceId }
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

      const updateMarket = await prisma.marketplace.update({
        where: {
          id: marketplaceId
        },
        data: {
          storename: name,
          description
        }
      });
      if (!updateMarket) {
        throw new BadRequest(
          "Failed to update the marketplace. No marketplace found with the provided ID."
        );
      }

      return reply.status(201).send({ message: "Market updated successfully" });
    }
  );
}
