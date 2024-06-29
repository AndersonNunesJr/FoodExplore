import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { BadRequest } from "../../routes/_errors/bad-request";
// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.SUPABASE_URI!;
// const supabaseKey = process.env.SUPABASE_KEY!;
// const supabase = createClient(supabaseUrl, supabaseKey);

// export async function productsCreate(app: FastifyInstance) {
//   app.withTypeProvider<ZodTypeProvider>().post(
//     "/:marketId/products",
//     {
//       schema: {
//         summary: "Create marketplace product.",
//         tags: ["Post"],
//         body: z.object({
//           name: z.string(),
//           tag: z.array(z.string()).nullish(),
//           description: z.string(),
//           category: z.string(),
//           price: z.string()
//           // productImg: z.string().nullish()
//         }),
//         params: z.object({
//           marketId: z.string().uuid()
//         }),
//         response: {
//           201: z.object({
//             products: z.object({
//               id: z.string().uuid(),
//               title: z.string(),
//               description: z.string().nullish(),
//               category: z.string().nullish(),
//               price: z.string()
//             })
//           })
//         }
//       }
//     },
//     async (req, reply) => {
//       // const { name, description, tag, price, category, productImg } = req.body;
//       const { marketId } = req.params;
//       const data = await req.file(); // Para capturar o arquivo enviado

//       if (!data) {
//         throw new BadRequest("File not uploaded");
//       }

//       // Extraindo os campos do formulário multipart
//       const fields = data.fields as unknown as { [key: string]: string };

//       const { name, description, tag, price, category } = fields;

//       const tagString = tag ? JSON.stringify(tag) : null;

//       const marketplace = await prisma.marketplace.findUnique({
//         where: { id: marketId }
//       });
//       if (!marketplace) {
//         throw new BadRequest("Marketplace not found");
//       }

//       const findProduct = await prisma.product.findFirst({
//         where: {
//           title: name,
//           marketplaceId: marketId
//         }
//       });

//       if (findProduct) {
//         throw new BadRequest("There is already a product with that name");
//       }
//       // Upload da imagem para o Supabase
//       const buffer = await data.toBuffer();
//       const filename = `${name}-${marketId}.png`;

//       const { data: uploadData, error } = await supabase.storage
//         .from("product-images")
//         .upload(filename, buffer, {
//           contentType: data.mimetype
//         });

//       if (error) {
//         throw new BadRequest("Failed to upload image");
//       }

//       const productImgUrl = uploadData
//         ? `${supabaseUrl}/storage/v1/object/public/product-images/${uploadData.path}`
//         : null;

//       const products = await prisma.product.create({
//         data: {
//           title: name,
//           tag: tagString,
//           description,
//           category,
//           price,
//           marketplaceId: marketId,
//           productImg: productImgUrl
//         },
//         select: {
//           id: true,
//           title: true,
//           description: true,
//           category: true,
//           price: true,
//           productImg: true
//         }
//       });

//       return reply.status(201).send({ products });
//     }
//   );
// }

export async function productsCreate(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/:marketId/products",
    {
      schema: {
        summary: "Create marketplace product.",
        tags: ["Post"],
        body: z.object({
          name: z.string(),
          tag: z.array(z.string()).nullish(),
          description: z.string(),
          category: z.string(),
          price: z.string(),
          productImg: z.string().nullish()
        }),
        params: z.object({
          marketId: z.string().uuid()
        }),
        response: {
          201: z.object({
            products: z.object({
              id: z.string().uuid(),
              title: z.string(),
              tag: z.string().nullable(),
              description: z.string().nullish(),
              category: z.string().nullish(),
              price: z.string()
            })
          })
        }
      }
    },
    async (req, reply) => {
      const { name, description, tag, price, category, productImg } = req.body;
      const { marketId } = req.params;

      const tagString = tag ? JSON.stringify(tag) : null;

      const marketplace = await prisma.marketplace.findUnique({
        where: { id: marketId }
      });
      if (!marketplace) {
        throw new BadRequest("Marketplace not found");
      }

      const findProduct = await prisma.product.findFirst({
        where: {
          title: name,
          marketplaceId: marketId
        }
      });

      if (findProduct) {
        throw new BadRequest("There is already a product with that name");
      }

      const products = await prisma.product.create({
        data: {
          title: name,
          tag: tagString,
          description,
          category,
          price,
          marketplaceId: marketId,
          productImg
        },
        select: {
          id: true,
          title: true,
          description: true,
          category: true,
          price: true,
          tag: true,
          productImg: true
        }
      });

      return reply.status(201).send({ products });
    }
  );
}
