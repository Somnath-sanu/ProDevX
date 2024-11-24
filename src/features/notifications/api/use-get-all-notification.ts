import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const UseAllNotifications = () => {
  const data = useQuery(api.notifications.getNotifications);
  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};
