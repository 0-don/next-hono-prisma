import { NextResponse, type NextRequest } from "next/server";
import { serverEnv } from "./utils/env/server";

export default async function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set(serverEnv.SERVER_URL_KEY, request.url);
  return NextResponse.next({ headers });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
