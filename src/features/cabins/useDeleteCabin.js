import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCapin as deleteCapinAPI } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useDeleteCabin() {
  const queryClinet = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCapin } = useMutation({
    mutationFn: (id) => deleteCapinAPI(id),
    onSuccess: () => {
      toast.success("cabin deleted successfully");
      queryClinet.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCapin };
}
