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
          password: z.string(),
          role: z.string(),
          marketplace: z.string().nullish()
        }),
        response: {
          201: z.object({
            user: z.object({
              id: z.number(),
              name: z.string(),
              email: z.string().email(),
              Role: z.string().nullable()
            })
          })
        }
      }
    },
    async (req, reply) => {
      const { name, password, role, email, marketplace } = req.body;

      const userRole = await prisma.role.create({
        data: { name: role }
      });

      const userMarketPlace = await prisma.marketplace.create({
        data: { storename: marketplace || "null" }
      });

      const userWithSameEmail = await prisma.user.findUnique({
        where: {
          email
        }
      });

      if (userWithSameEmail !== null) {
        throw new BadRequest("Another email with same title already exists.");
      }

      const userWithSameMarketplace = await prisma.marketplace.findUnique({
        where: {
          storename: marketplace || "null"
        }
      });
      if (userWithSameMarketplace !== null) {
        throw new BadRequest(
          "Another marketplace with same title already exists."
        );
      }

      const userWithSameRole = await prisma.role.findUnique({
        where: { name: role }
      });

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password,
          Role: { connect: { id: userWithSameRole?.id } },
          marketplace: { connect: { id: userWithSameMarketplace } }
        }
      });

      return reply.status(201).send({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          Role: userRole.name
        }
      });
    }
  );
}

// role        String       @default("costumer")
