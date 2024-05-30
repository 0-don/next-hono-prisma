import getQueryClient from "@/lib/query";
import { rpc } from "@/lib/rpc";
import { setCookies } from "@/utils/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { redirect } from "next/navigation";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout(props: MainLayoutProps) {
  const queryClient = getQueryClient();

  const { data: me } = await rpc.api.user.me.get(setCookies());

  if (typeof me !== "object") redirect("/login");

  queryClient.setQueryData(["me"], me);

  return (
    <HydrationBoundary key={Math.random()} state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  );
}
