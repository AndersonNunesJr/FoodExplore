import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { BadRequest } from "../../routes/_errors/bad-request";
import { createClient } from "@supabase/supabase-js";
import { CookieController } from "../../utils/CookieController";

const supabaseUrl = process.env.SUPABASE_URI!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function productsPicture(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/:marketId/:name/img",
    {
      schema: {
        summary: "Create marketplace product.",
        tags: ["Post"],
        consumes: ["multipart/form-data"],
        params: z.object({
          marketId: z.string().uuid(),
          name: z.string()
        }),
        response: {
          201: z.object({
            products: z.object({
              productImg: z.string().nullable()
            })
          })
        }
      }
    },
    async (req, reply) => {
      const { marketId, name } = req.params;
      // const token = req.cookies.token;
      // const userCookie = await CookieController(token);

      // const findMarket = await prisma.marketplace.findFirst({
      //   where: { id: marketId  }
      // });

      // const findUser = await prisma.user.findFirst({
      //   where: {
      //     AND: [{ id: findMarket?.userId }, { email: userCookie.email }]
      //   }
      // });

      // if (!findUser) {
      //   throw new BadRequest("Operation not permitted");
      // }

      const product = await prisma.product.findFirst({
        where: {
          AND: [{ marketplaceId: marketId }, { title: name }]
        }
      });

      if (!product) {
        throw new BadRequest("Product name not found.");
      }

      const data = await req.file();
      if (!data) {
        throw new BadRequest("File not uploaded");
      }

      const buffer = await data.toBuffer();
      const filename = `${marketId}-${name}-${data.filename.replace(/\s+/g, "")}`;

      const existingProduct = await prisma.product.findFirst({
        where: {
          AND: [{ marketplaceId: marketId }, { title: name }]
        }
      });

      if (existingProduct) {
        // Delete the old image if it exists
        const oldImagePath = existingProduct.productImg?.split("/").pop();
        if (oldImagePath) {
          const { error: deleteError } = await supabase.storage
            .from("product-images")
            .remove([oldImagePath]);

          if (deleteError) {
            throw new BadRequest("Failed to delete old image");
          }
        }
      }

      const { data: uploadData, error } = await supabase.storage
        .from("product-images")
        .upload(filename, buffer, {
          contentType: data.mimetype
        });

      if (error) {
        console.error("Upload Error:", error);
        throw new BadRequest("Failed to upload image");
      }

      const productImgUrl = uploadData
        ? `${supabaseUrl}/storage/v1/object/public/product-images/${uploadData.path}`
        : null;

      const updatedProduct = await prisma.product.update({
        where: { id: existingProduct?.id },
        data: { productImg: productImgUrl },
        select: { productImg: true }
      });

      return reply.status(201).send({
        products: {
          productImg: updatedProduct.productImg
        }
      });
    }
  );
}
