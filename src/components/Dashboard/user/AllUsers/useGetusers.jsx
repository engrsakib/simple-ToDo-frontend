import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetusers = () => {
  const {
    isLoading: isPending,
    data: users = [],
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users`);
        return response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
        return [];
      }
    },
  });

  return { users, refetch, isPending };
};

export default useGetusers;
