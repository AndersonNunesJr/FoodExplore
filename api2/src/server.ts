import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import {
  ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler
} from "fastify-type-provider-zod";
import fastifyMultipart from "@fastify/multipart";
import fastifyJwt from "@fastify/jwt";
import cookie from "@fastify/cookie";
import type { FastifyCookieOptions } from "@fastify/cookie";
import { routes } from "./routes/routes";

import { env } from "process";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyMultipart);

app.register(fastifyCors, {
  origin: "*",
  credentials: true
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET_PASSWORD
    ? env.JWT_SECRET_PASSWORD
    : "env.JWT_SECRET_PASSWORD"
});

app.register(cookie, {
  secret: process.env.COOKIE_SECRET,
  parseOptions: {}
} as FastifyCookieOptions);

app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json", "multipart/form-data"],
    produces: ["application/json"],
    info: {
      title: "FoodExplore",
      description:
        "Especificações da API para o back-end da aplicação FoodExplore",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(routes);

const start = async () => {
  try {
    app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
      console.log("HTTP server running!");
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
