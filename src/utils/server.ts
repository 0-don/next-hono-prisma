import { rpc } from "@/lib/rpc";
import { cookies, headers } from "next/headers";
import { serverEnv } from "./env/server";

export const setCookies = (): Parameters<typeof rpc.api.user.me.get>[0] => ({
  $headers: {
    cookie: [serverEnv.AUTH_COOKIE]
      .map((cookie) => `${cookie}=${cookies().get(cookie)?.value}`)
      .join("; "),
  },
});

export const serverUrl = () => headers().get(serverEnv.SERVER_URL_KEY);
