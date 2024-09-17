import { createDecoder } from "fast-jwt";

export async function CookieController(token) {
  const decode = createDecoder();
  const payload = await decode(token);

  return payload;
}
