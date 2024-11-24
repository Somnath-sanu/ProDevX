import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface UserDetailsProps {
  userId: Id<"users">;
}

export const useUserDetails = ({ userId }: UserDetailsProps) => {
  const data = useQuery(api.user.getUserDetails, { userId });

  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};
