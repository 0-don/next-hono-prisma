import { decrypt } from "@/lib/encrypt";
import { serverEnv } from "@/utils/env/server";
import { User } from "@prisma/client";
import { Elysia, ParseError } from "elysia";

export const userRoute = new Elysia({ prefix: "/user" }).get("/me", (ctx) => {
  const user = decrypt<User>(ctx.cookie[serverEnv.AUTH_COOKIE].value);

  if (!user) throw new ParseError("User not found");

  return user;
});
