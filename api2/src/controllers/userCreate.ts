import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function userCreate(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/user",
    {
      schema: {
        summary: "Create an event",
        tags: ["events"],
        body: z.object({
          title: z
            .string({ invalid_type_error: "O título precisa ser um texto" })
            .min(4),
          details: z.string().nullable(),
          maximumAttendees: z.number().int().positive().nullable()
        }),
        response: {
          201: z.object({
            eventId: z.string().uuid()
          })
        }
      }
    },
    async (req, reply) => {
      const { name, password, role, email, marketplace } = req.body;

      //   const slug = generateSlug(title);

      const eventWithSameSlug = await prisma.user.findUnique({
        where: {
          slug
        }
      });

      if (eventWithSameSlug !== null) {
        throw new BadRequest("Another event with same title already exists.");
      }

      const event = await prisma.event.create({
        data: {
          title,
          details,
          maximumAttendees,
          slug
        }
      });

      return reply.status(201).send({ eventId: event.id });
    }
  );
}
