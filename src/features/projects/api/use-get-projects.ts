import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

interface GetProjectsOptions {
  startDate?: string;
  endDate?: string;
}

export const useGetProjects = (options: GetProjectsOptions = {}) => {
  const data = useQuery(api.projects.getProjects, {
    startDate: options.startDate,
    endDate: options.endDate,
  });

  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};
