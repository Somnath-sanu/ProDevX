import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

interface UseGetBlogParams {
  blogId: Id<"blogs">;
}
export const useGetBlog = ({ blogId }: UseGetBlogParams) => {
  const data = useQuery(api.blogs.getBlog, { blogId });
  const isLoading = data === undefined;
  return {
    data,
    isLoading,
  };
};
