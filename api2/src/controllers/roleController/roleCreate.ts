import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function roleCreate(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/role",
    {
      schema: {
        body: z.object({
          roleName: z.string({
            invalid_type_error: "O nome precisa ser um texto"
          })
        }),
        response: {
          201: z.object({
            role: {
              id: z.string(),
              name: z.string()
            }
          })
        }
      }
    },
    async (req, reply) => {
      const { roleName } = req.body;

      const role = await prisma.role.create({
        data: {
          name: roleName
        }
      });

      return reply.status(201).send({
        role: {
          id: role.id,
          name: role.name
        }
      });
    }
  );
}
