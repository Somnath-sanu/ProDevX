import { useParams } from "next/navigation";
import { Id } from "../../convex/_generated/dataModel";

export const useUserId = () => {
  const params = useParams();
  return params.id as Id<"users">;
};
