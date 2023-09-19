import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: createUser,
    onSuccess: (user) => {
      toast.success("User created successfully");
    },
    onError: (err) => {
      toast.error("Something wrong.");
      console.log(err);
    },
  });

  return { signup, isLoading };
}
