import fastify from "fastify";

// import fastifySwagger from "@fastify/swagger";
// import fastifySwaggerUi from "@fastify/swagger-ui";
// import fastifyCors from "@fastify/cors";

import {
  ZodTypeProvider
  //   jsonSchemaTransform,
  //   serializerCompiler,
  //   validatorCompiler
} from "fastify-type-provider-zod";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running!");
});
