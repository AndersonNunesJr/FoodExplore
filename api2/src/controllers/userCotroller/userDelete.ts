import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";

import { BadRequest } from "../../routes/_errors/bad-request";
import { CookieController } from "../../utils/CookieController";

export async function userDelete(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/delete/:userId",
    {
      schema: {
        summary: "Delete user.",
        tags: ["Delete"],
        body: z.object({
          email: z.string().email(),
          password: z.string()
        }),
        params: z.object({
          userId: z.string().uuid()
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
      const { userId } = req.params;
      const token = req.cookies.token;
      const userCookie = await CookieController(token);

      const findUser = await prisma.user.findFirst({
        where: {
          AND: [{ id: userId }, { email: userCookie.email }]
        }
      });

      if (!findUser) {
        throw new BadRequest("Operation not permitted");
      }

      const userID = await prisma.user.findUnique({
        select: {
          id: true
        },
        where: {
          id: userId
        }
      });

      const oldPasswordResult = await prisma.user.findUnique({
        select: {
          password: true,
          id: true
        },
        where: { email }
      });

      if (userID?.id !== oldPasswordResult?.id) {
        throw new BadRequest(
          "User not compatible due to lack of compatibility"
        );
      }
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
