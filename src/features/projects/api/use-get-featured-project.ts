import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

interface GetFeaturedProjectOptions {
  startDate?: string;
  endDate?: string;
}

export const useGetFeaturedProject = (options: GetFeaturedProjectOptions = {}) => {
  const data = useQuery(api.projects.getFeaturedProject, {
    startDate: options.startDate,
    endDate: options.endDate,
  });

  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};
