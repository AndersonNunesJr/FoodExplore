import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";

import { BadRequest } from "../../routes/_errors/bad-request";

export async function userGet(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/:userId",
    {
      schema: {
        body: z.object({
          email: z.string().email(),
          password: z.string()
        }),
        params: z.object({
          userId: z.string().uuid()
        }),
        response: {
          201: z.object({
            user: z.object({
              id: z.string().nullish(),
              name: z.string().nullish(),
              email: z.string().email().nullish(),
              Role: z.string().nullish(),
              Marketplace: z.object({
                id: z.string().nullish(),
                storename: z.string().nullish()
              }),
              favorites: z.string().nullish()
            })
          })
        }
      }
    },
    async (req, reply) => {
      const { email, password } = req.body;
      const { userId } = req.params;

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
        throw new BadRequest("email/Password does not match");
      }

      const user = await prisma.user.findUnique({
        where: {
          id: userId
        },
        select: {
          id: true,
          email: true,
          name: true,
          Role: true,
          favorites: true,
          marketplace: true
        }
      });

      return reply.status(201).send({
        user: {
          id: user?.id,
          name: user?.name,
          email: user?.email,
          Role: user?.Role?.name,
          Marketplace: {
            id: user?.marketplace?.id,
            storename: user?.marketplace?.storename
          },
          favorites: user?.favorites?.id
        }
      });
    }
  );
}
