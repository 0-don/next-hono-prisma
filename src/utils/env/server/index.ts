import { parse } from "@/utils/base";
import { Type as t } from "@sinclair/typebox/type";

const serverEnvSchema = t.Object({
  DATABASE_URL: t.String({
    minLength: 1,
    error: "DATABASE_URL server environment variable is not set!",
  }),
  SECRET: t.String({
    minLength: 1,
    error: "SECRET server environment variable is not set!",
  }),
  NODE_ENV: t.Union([t.Literal("development"), t.Literal("production")], {
    error: "NODE_ENV server environment variable is not set!",
  }),
  AUTH_COOKIE: t.Literal("auth", {
    error: "AUTH_COOKIE server environment variable is not set!",
  }),
  SERVER_URL_KEY: t.Literal("x-url", {
    minLength: 1,
    error: "SERVER_URL server environment variable is not set!",
  }),
  SEVEN_DAYS: t.Integer({
    minimum: 1,
    error: "SEVEN_DAYS server environment variable is not set!",
  }),
});

export const serverEnv = parse(serverEnvSchema, {
  DATABASE_URL: process.env.DATABASE_URL,
  SECRET: process.env.SECRET,
  NODE_ENV: process.env.NODE_ENV,
  AUTH_COOKIE: "auth",
  SERVER_URL_KEY: "x-url",
  SEVEN_DAYS: 60 * 60 * 24 * 7,
});
