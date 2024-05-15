import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { BadRequest } from "../../routes/_errors/bad-request";
import { hash } from "bcrypt";

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
          password: z.string().min(8),
          role: z.string().nullable(),
          marketplace: z.string().nullable()
        }),
        response: {
          201: z.object({
            user: z.object({
              id: z.string(),
              name: z.string(),
              email: z.string().email(),
              Role: z.string().nullable(),
              Marketplace: z.string().nullable()
            })
          })
        }
      }
    },
    async (req, reply) => {
      const { name, password, role, email, marketplace } = req.body;
      const marketplaceRequestDefinition =
        !marketplace || marketplace === undefined || marketplace === ""
          ? email
          : marketplace;
      const userWithSameRole =
        role === null || role === undefined || role === "" ? "customer" : role;

      const hashedPassword = await hash(password, 10);

      const userWithSameEmail = await prisma.user.findUnique({
        where: {
          email
        }
      });

      if (userWithSameEmail !== null) {
        throw new BadRequest("Another email with same name already exists.");
      }

      const isAdmin = role === "admin";

      let marketplaceConnectOrCreate;

      const userWithSameMarketplace = await prisma.marketplace.findUnique({
        where: {
          storename: marketplaceRequestDefinition
        }
      });

      if (userWithSameMarketplace !== null) {
        throw new BadRequest(
          "Another marketplace with same name already exists."
        );
      }

      if (!isAdmin) {
        marketplaceConnectOrCreate = {
          create: { storename: marketplaceRequestDefinition }
        };
      } else {
        throw new BadRequest("No permission to create/update marketplace");
      }

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          Role: {
            connectOrCreate: {
              where: { name: userWithSameRole },
              create: { name: userWithSameRole }
            }
          },
          marketplace: marketplaceConnectOrCreate
        }
      });

      return reply.status(201).send({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          Role: userWithSameRole,
          Marketplace: marketplace
        }
      });
    }
  );
}
