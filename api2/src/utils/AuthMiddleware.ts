import { FastifyReply, FastifyRequest } from "fastify";

export async function AuthMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    console.log(request.jwtVerify());
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
}
