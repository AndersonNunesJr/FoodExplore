import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { BadRequest } from "../../routes/_errors/bad-request";
import { createClient } from "@supabase/supabase-js";
// import { CookieController } from "../../utils/CookieController";

const supabaseUrl = process.env.SUPABASE_URI!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function productsCreate(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/:marketId",
    {
      schema: {
        summary: "Create marketplace product.",
        tags: ["Post"],
        // consumes: ["multipart/form-data"],
        body: z.object({
          name: z.string(),
          tag: z.array(z.string()).nullish(),
          description: z.string(),
          category: z.string(),
          price: z.string()
        }),
        params: z.object({
          marketId: z.string().uuid()
        }),
        response: {
          201: z.object({
            updatedProduct: z.object({
              id: z.string().uuid(),
              title: z.string(),
              tag: z.string().nullable(),
              description: z.string().nullish(),
              category: z.string().nullish(),
              price: z.string(),
              productImg: z.string().nullable()
            })
          })
        }
      }
    },
    async (req, reply) => {
      const { name, description, tag, price, category } = req.body;
      const { marketId } = req.params;
      // const token = req.cookies.token;
      // const userCookie = await CookieController(token);
      // const data = await req.file();
      // if (!data) {
      //   throw new BadRequest("File not uploaded");
      // }

      // const buffer = await data.toBuffer();

      const tagString = tag ? JSON.stringify(tag) : null;

      const marketplace = await prisma.marketplace.findUnique({
        where: { id: marketId }
      });
      if (!marketplace) {
        throw new BadRequest("Marketplace not found");
      }

      // const findUser = await prisma.user.findFirst({
      //   where: {
      //     AND: [{ id: marketplace.userId }, { email: userCookie.email }]
      //   }
      // });

      // if (!findUser) {
      //   throw new BadRequest("Operation not permitted");
      // }

      const findProduct = await prisma.product.findFirst({
        where: {
          title: name,
          marketplaceId: marketId
        }
      });

      if (findProduct) {
        throw new BadRequest("There is already a product with that name");
      }

      if (tag) {
        const createTagsPromises = tag.map((tagName) =>
          prisma.tag
            .create({
              data: {
                name: tagName
              }
            })
            .catch((error) => {
              console.error(`Erro ao criar tag ${tagName}:`, error);
            })
        );
        console.log(createTagsPromises);
      }

      const products = await prisma.product.create({
        data: {
          title: name,
          tag: tagString,
          description,
          category,
          price,
          marketplaceId: marketId
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
      // const filename = `${products.id}-${data.filename.replace(/\s+/g, "")}`;

      // if (products) {
      //   // Delete the old image if it exists
      //   const oldImagePath = products.productImg?.split("/").pop();
      //   if (oldImagePath) {
      //     const { error: deleteError } = await supabase.storage
      //       .from("product-images")
      //       .remove([oldImagePath]);

      //     if (deleteError) {
      //       throw new BadRequest("Failed to delete old image");
      //     }
      //   }
      // }

      // const { data: uploadData, error } = await supabase.storage
      //   .from("product-images")
      //   .upload(filename, buffer, {
      //     contentType: data.mimetype
      //   });

      // if (error) {
      //   throw new BadRequest("Failed to upload image");
      // }

      // const productImgUrl = uploadData
      //   ? `${supabaseUrl}/storage/v1/object/public/product-images/${uploadData.path}`
      //   : null;

      const updatedProduct = await prisma.product.update({
        where: { id: products.id },
        data: { price },
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

      return reply.status(201).send({ updatedProduct });
    }
  );
}
