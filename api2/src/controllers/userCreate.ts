import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "../routes/_errors/bad-request";

export async function userCreate(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/user",
    {
      schema: {
        body: z.object({
          name: z
            .string({ invalid_type_error: "O nome precisa ser um texto" })
            .min(4),
          email: z.string().email(),
          role: z.string().nullable(),
          password: z.string(),
          marketplace: z.string()
        }),
        response: {
          201: z.object({
            userId: z.number()
          })
        }
      }
    },
    async (req, reply) => {
      const { name, password, role, email, marketplace } = req.body;

      const userWithSameEmail = await prisma.user.findUnique({
        where: {
          email
        }
      });

      if (role === "admin") {
        const userWithSameMarketplace = await prisma.marketplace.findUnique({
          where: {
            storename: marketplace
          }
        });
        if (userWithSameMarketplace !== null) {
          throw new BadRequest(
            "Another marketplace with same title already exists."
          );
        }
        if (marketplace === null) {
          throw new BadRequest("Admin users need to have a market.");
        }
      }

      if (userWithSameEmail !== null) {
        throw new BadRequest("Another email with same title already exists.");
      }

      const user = await prisma.user.create({
        data: {
          name,
          email,
          role: role || "costumer",
          marketplace: {
            connect: {
              id: userWithSameMarketplace.id
            }
          },
          password
        }
      });

      return reply.status(201).send({ userId: user.id });
    }
  );
}
