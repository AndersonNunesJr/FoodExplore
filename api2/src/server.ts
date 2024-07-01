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
import { routes } from "./routes/routes";
import fastifyMultipart from "@fastify/multipart";

// Registro do plugin fastify-multipart

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyMultipart);
app.register(fastifyCors, {
  origin: "*"
});

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

app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running!");
});
