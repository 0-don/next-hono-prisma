import { Type as t, type Static } from "@sinclair/typebox/type";

const T = t
  .Transform(t.String({ minLength: 1, maxLength: 128 }))
  .Decode((value) => value.trim())
  .Encode((value) => value.trim());

export const authUser = t.Object({
  username: t.String({ minLength: 1, maxLength: 128 }),
  password: t.String({ minLength: 1, maxLength: 128 }),
  test: t.Optional(t.String({ minLength: 1, maxLength: 128 })),
});

export type AuthUser = Static<typeof authUser>;
