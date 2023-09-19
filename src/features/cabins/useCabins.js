import { useQuery } from "@tanstack/react-query";
import { getCapins } from "../../services/apiCabins";

export function useCabins() {
  const {
    data: cabins,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCapins,
  });

  return { cabins, error, isLoading };
}
