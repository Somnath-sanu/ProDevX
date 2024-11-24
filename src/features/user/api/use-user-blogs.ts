import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface UserProjectDetailsProps {
  userId: Id<"users">;
}

export const useUserBlogDetails = ({ userId }: UserProjectDetailsProps) => {
  const data = useQuery(api.user.allBlogsOfUser, { userId });

  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};
