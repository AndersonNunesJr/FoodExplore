import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "../routes/_errors/bad-request";

export async function roleCreate(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/role",
    {
      schema: {
        body: z.object({
          role: z.string()
        }),
        response: {
          201: z.object({
            userRole: z.object({
              name: z.string()
            })
          })
        }
      }
    },
    async (req, reply) => {
      const { role } = req.body;

      const userWithSameRole = await prisma.role.findUnique({
        where: {
          name: role
        }
      });

      if (userWithSameRole !== null) {
        throw new BadRequest("Another role with same title already exists.");
      }

      const userRole = await prisma.role.create({
        data: { name: role }
      });
      return reply.status(201).send({ userRole });
    }
  );
}
