import { rpc } from "@/lib/rpc";
import { handleEden } from "@/utils/base";
import { useQuery } from "@tanstack/react-query";

export const UserHook = () => {
  const meQuery = useQuery({
    queryKey: ["me"],
    enabled: false,
    queryFn: async () => handleEden(await rpc.api.user.me.get()),
  });

  return {
    meQuery,
  };
};
