import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";

import { BadRequest } from "../../routes/_errors/bad-request";
import { env } from "process";

export async function Sing(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/",
    {
      schema: {
        summary: "Get user information.",
        tags: ["Get"],
        body: z.object({
          email: z.string().email(),
          password: z.string()
        }),
        response: {
          201: z.object({
            user: z.object({
              id: z.string().nullish(),
              name: z.string().nullish(),
              email: z.string().nullish(),
              role: z.string().nullish(),
              marketId: z.string().nullish()
            }),
            token: z.string()
          })
        }
      }
    },
    async (req, reply) => {
      const { email, password } = req.body;

      const findUser = await prisma.user.findUnique({
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          Role: true,
          marketplace: true
        },
        where: { email }
      });

      if (!findUser) {
        throw new BadRequest("email/Password does not match");
      }

      const oldPassword: string = findUser.password;

      const correctOldPasswordComparison = await bcrypt.compare(
        password,
        oldPassword
      );

      if (!correctOldPasswordComparison) {
        throw new BadRequest("email/Password does not match");
      }

      const token = app.jwt.sign({ email });

      return reply
        .status(201)
        .send({
          user: {
            id: findUser.id,
            name: findUser.name,
            email: findUser.email,
            role: findUser.Role?.name,
            marketId: findUser.marketplace?.id
          },
          token
        })
        .setCookie("token", token, {
          maxAge: 86400,
          httpOnly: true,
          secure: env.NODE_ENV === "production"
        });
    }
  );
}
