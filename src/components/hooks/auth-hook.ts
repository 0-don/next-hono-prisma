import { rpc } from "@/lib/rpc";
import { handleEden } from "@/utils/base";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const AuthHook = () => {
  const queryClient = useQueryClient();
  const registerMuation = useMutation({
    mutationKey: ["register"],
    mutationFn: async (
      ...args: Parameters<typeof rpc.api.auth.register.post>
    ) => handleEden(await rpc.api.auth.register.post(...args)),
  });

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (...args: Parameters<typeof rpc.api.auth.login.post>) =>
      handleEden(await rpc.api.auth.login.post(...args)),
  });

  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => handleEden(await rpc.api.auth.logout.get()),
  });

  return {
    registerMuation,
    loginMutation,
    logoutMutation,
  };
};
