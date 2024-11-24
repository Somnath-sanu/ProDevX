import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const UseUnreadCount = () => {
  const data = useQuery(api.notifications.getUnreadCount);
  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};
