import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

import { Id } from "../../../../convex/_generated/dataModel";

interface UseUserLikedProject {
  projectId: Id<"projects">;
}

export const useUserLikedProject = ({ projectId }: UseUserLikedProject) => {
  const data = useQuery(api.likes.isLikedByCurrentUser, { projectId });

  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};
