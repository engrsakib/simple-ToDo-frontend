import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetAllFunds = () => {
  const {
    isLoading: isPending,
    data: funds = [],
    refetch,
  } = useQuery({
    queryKey: ["all-funds"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/users/add-fund/all`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
        return [];
      }
    },
  });

  return { funds, refetch, isPending };
};

export default useGetAllFunds;
