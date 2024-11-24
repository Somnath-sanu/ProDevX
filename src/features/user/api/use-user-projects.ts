import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface UserProjectDetailsProps {
  userId: Id<"users">;
}

export const useUserProjectDetails = ({ userId }: UserProjectDetailsProps) => {
  const data = useQuery(api.user.allProjectsOfUser, { userId });

  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};
