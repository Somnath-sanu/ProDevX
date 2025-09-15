import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface UseGetProjectProps {
  projectId: Id<"projects">;
}

export const useGetProject = ({ projectId }: UseGetProjectProps) => {
  const data = useQuery(
    api.projects.getProject,
    {
      projectId,
    }
  );
  const isLoading = data === undefined;

  return { data, isLoading };
};
