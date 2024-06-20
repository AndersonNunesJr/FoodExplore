import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";

import { BadRequest } from "../../routes/_errors/bad-request";

export async function userDelete(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/delete/user",
    {
      schema: {
        summary: "Delete user.",
        tags: ["Delete"],
        body: z.object({
          email: z.string().email(),
          password: z.string()
        }),
        response: {
          201: z.object({
            message: z.string()
          })
        }
      }
    },
    async (req, reply) => {
      const { email, password } = req.body;

      const oldPasswordResult = await prisma.user.findUnique({
        select: {
          password: true
        },
        where: { email }
      });

      if (!oldPasswordResult) {
        throw new BadRequest("User not found");
      }

      const oldPassword: string = oldPasswordResult.password;

      const correctOldPasswordComparison = await bcrypt.compare(
        password,
        oldPassword
      );

      if (!correctOldPasswordComparison) {
        throw new BadRequest("Password does not match");
      }

      await prisma.user.delete({ where: { email } });

      return reply.status(201).send({ message: "User deleted successfully" });
    }
  );
}
