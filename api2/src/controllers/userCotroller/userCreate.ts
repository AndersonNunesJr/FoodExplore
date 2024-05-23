import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { BadRequest } from "../../routes/_errors/bad-request";
import bcrypt from "bcrypt";

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
          marketplace: z.string().nullish()
        }),
        response: {
          201: z.object({
            user: z.object({
              id: z.string(),
              name: z.string(),
              email: z.string().email(),
              Role: z.string().nullable(),
              Marketplace: z.string().nullish()
            })
          })
        }
      }
    },
    async (req, reply) => {
      const { name, password, role, email, marketplace } = req.body;

      const userWithSameRole =
        role === null || role === undefined || role === "" ? "customer" : role;

      const roleAlreadyExists = await prisma.role.findUnique({
        where: {
          name: userWithSameRole
        }
      });

      if (roleAlreadyExists === null) throw new BadRequest("Role not found.");

      const marketplaceRequestDefinition =
        !marketplace || marketplace === undefined || marketplace === ""
          ? email
          : marketplace;

      const hashedPassword = await bcrypt.hash(password, 10);

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

      if (isAdmin) {
        marketplaceConnectOrCreate = {
          create: { storename: marketplaceRequestDefinition }
        };
      }
      if (!isAdmin && marketplace !== null && marketplace !== undefined) {
        throw new BadRequest("No permission to create/update marketplace");
      }

      if (userWithSameMarketplace !== null) {
        throw new BadRequest(
          "Another marketplace with same name already exists."
        );
      }

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          marketplace: marketplaceConnectOrCreate,
          Role: {
            connect: {
              name: roleAlreadyExists
                ? roleAlreadyExists.name
                : userWithSameRole
            }
          }
        },
        select: {
          id: true,
          name: true,
          email: true
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
