import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface UseGetMessagesProps {
  projectId: Id<"projects">;
}

export const useGetMessages = ({ projectId }: UseGetMessagesProps) => {
  const data = useQuery(api.messages.getMessages, { projectId });

  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};
