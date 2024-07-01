import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { BadRequest } from "../../routes/_errors/bad-request";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URI!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function marketPicture(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/:marketId/imgProfile",
    {
      schema: {
        summary: "Create marketplace product.",
        tags: ["Post"],
        consumes: ["multipart/form-data"],
        params: z.object({
          marketId: z.string().uuid()
        }),
        response: {
          201: z.object({
            market: z.object({
              marketImg: z.string().nullable()
            })
          })
        }
      }
    },
    async (req, reply) => {
      const { marketId } = req.params;

      const marketplace = await prisma.marketplace.findUnique({
        where: { id: marketId }
      });
      if (!marketplace) {
        throw new BadRequest("Marketplace not found");
      }

      const data = await req.file();
      if (!data) {
        throw new BadRequest("File not uploaded");
      }

      const buffer = await data.toBuffer();
      const filename = `${marketId}-${data.filename.replace(/\s+/g, "")}`;

      const existingProduct = await prisma.marketplace.findFirst({
        where: {
          id: marketId
        }
      });

      if (existingProduct) {
        const oldImagePath = existingProduct.profilePicture?.split("/").pop();
        if (oldImagePath) {
          const { error: deleteError } = await supabase.storage
            .from("market-images")
            .remove([oldImagePath]);

          if (deleteError) {
            throw new BadRequest("Failed to delete old image");
          }
        }
      }

      const { data: uploadData, error } = await supabase.storage
        .from("market-images")
        .upload(filename, buffer, {
          contentType: data.mimetype
        });

      if (error) {
        throw new BadRequest("Failed to upload image");
      }

      const marketImgUrl = uploadData
        ? `${supabaseUrl}/storage/v1/object/public/market-images/${uploadData.path}`
        : null;

      const updatedMarket = await prisma.marketplace.update({
        where: { id: marketId },
        data: { profilePicture: marketImgUrl },
        select: { profilePicture: true }
      });

      return reply.status(201).send({
        market: {
          marketImg: updatedMarket.profilePicture
        }
      });
    }
  );
}
