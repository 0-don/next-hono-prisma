import { Errors } from "@sinclair/typebox/errors";
import type { Static, TSchema } from "@sinclair/typebox/type";
import { Check } from "@sinclair/typebox/value";

export const parse = <T extends TSchema>(
  schema: T,
  value: unknown,
): Static<T> => {
  const check = Check(schema, value);
  if (!check) throw new Error(Errors(schema, value).First()?.message);
  return value;
};

export function handleEden<T>(
  response: (
    | {
        data: T;
        error: null;
      }
    | {
        data: null;
        error: EdenFetchError<number, string>;
      }
  ) & {
    status: number;
    response: Record<number, unknown>;
    headers: Record<string, string>;
  },
): T {
  if (response.error) throw response.error;
  return response.data;
}

export declare class EdenFetchError<
  Status extends number = number,
  Value = unknown,
> extends Error {
  status: Status;
  value: Value;
  constructor(status: Status, value: Value);
}
