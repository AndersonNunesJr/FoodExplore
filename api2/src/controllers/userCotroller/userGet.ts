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
              id: z.string(),
              name: z.string(),
              email: z.string().email(),
              Role: z.string().nullable(),
              Marketplace: z.string().nullish(),
              favorites: z.string().nullish()
            })
          })
        }
      }
    },
    // async (req, reply) => {
    //   const { email, password } = req.body;
    //   const { userId } = req.params;

    //   const oldPasswordResult = await prisma.user.findUnique({
    //     select: {
    //       password: true
    //     },
    //     where: { email }
    //   });

    //   if (!oldPasswordResult) {
    //     throw new BadRequest("User not found");
    //   }

    //   const oldPassword: string = oldPasswordResult.password;

    //   const correctOldPasswordComparison = await bcrypt.compare(
    //     password,
    //     oldPassword
    //   );

    //   if (!correctOldPasswordComparison) {
    //     throw new BadRequest("Password does not match");
    //   }

    //   const user = await prisma.user.findUnique({
    //     where: {
    //       id: userId,
    //       password
    //     },
    //     select: {
    //       id: true,
    //       email: true,
    //       name: true,
    //       Role: true,
    //       Favorites: true
    //     }
    //   });

    //   return reply.status(201).send({ user });
    // }
    async (req, reply) => {
      const { email, password } = req.body;
      const { userId } = req.params;

      // Verifica se o email existe e obtem a senha antiga
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

      // Compara a senha fornecida com a senha antiga
      const correctOldPasswordComparison = await bcrypt.compare(
        password,
        oldPassword
      );

      if (!correctOldPasswordComparison) {
        throw new BadRequest("Password does not match");
      }

      // Encontra o usuário pelo ID e seleciona os campos relevantes
      const userWithRelations = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          Role: true,
          Favorites: true,
          marketplace: true
        }
      });

      if (!userWithRelations) {
        throw new BadRequest("User not found");
      }

      // Transforma a estrutura dos dados retornados para corresponder à estrutura esperada
      const transformedUser = {
        id: userWithRelations.id,
        email: userWithRelations.email,
        name: userWithRelations.name,
        Role: userWithRelations.Role ? userWithRelations.Role.name : null, // Transforma Role para string ou null
        Marketplace: userWithRelations.marketplace
          ? userWithRelations.marketplace.storename
          : null, // Transform Marketplace para string ou null
        favorites:
          userWithRelations.Favorites.map((fav) => fav.productsId)
            .filter(Boolean)
            .join(", ") || null // Transforma Favorites para string ou null
      };

      return reply.status(201).send({ user: transformedUser });
    }
  );
}
