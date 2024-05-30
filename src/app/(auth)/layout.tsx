import getQueryClient from "@/lib/query";
import { rpc } from "@/lib/rpc";
import { serverUrl, setCookies } from "@/utils/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { redirect } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout(props: AuthLayoutProps) {
  const queryClient = getQueryClient();

  const { data: me } = await rpc.api.user.me.get(setCookies());

  if (typeof me === "object" && !serverUrl()?.includes("logout"))
    redirect("/dashboard");

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex h-screen">
        <section className="m-auto w-full max-w-[500px] p-5">
          {props.children}
        </section>
      </main>
    </HydrationBoundary>
  );
}
