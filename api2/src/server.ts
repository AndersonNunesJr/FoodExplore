// import fastify from "fastify";

// import fastifySwagger from "@fastify/swagger";
// import fastifySwaggerUi from "@fastify/swagger-ui";
// import fastifyCors from "@fastify/cors";

// import { router } from "./routes";

// import {
//   ZodTypeProvider,
//   jsonSchemaTransform,
//   serializerCompiler,
//   validatorCompiler
// } from "fastify-type-provider-zod";

// export const app = fastify().withTypeProvider<ZodTypeProvider>();

// app.register(fastifyCors, {
//   origin: "*"
// });

// app.register(fastifySwagger, {
//   swagger: {
//     consumes: ["application/json"],
//     produces: ["application/json"],
//     info: {
//       title: "FoodExplore",
//       description:
//         "Especificações da API para o back-end da aplicação FoodExplore",
//       version: "1.0.0"
//     }
//   },
//   transform: jsonSchemaTransform
// });

// app.register(fastifySwaggerUi, {
//   routePrefix: "/docs"
// });

// app.setValidatorCompiler(validatorCompiler);
// app.setSerializerCompiler(serializerCompiler);

// app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
//   console.log("HTTP server running!");
// });

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
import routes from "./routes";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "*"
});

app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
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

// Registre suas rotas
routes(app);

app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running!");
});
