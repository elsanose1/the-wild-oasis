import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      toast.success(`Wellcome Back ${user.user.user_metadata.fullName}!`);
      queryClient.setQueryData(["user"], user.user);
      navigate("/", { replace: true });
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error("wrong Password or Email");
    },
  });

  return { login, isLoading };
}
