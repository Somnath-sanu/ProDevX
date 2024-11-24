import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export const UserAvatar = ({
  name,
  image,
  className,
}: {
  name: string;
  image: string | undefined;
  className?: string;
}) => {
  const avatarFallback = name!.charAt(0).toUpperCase();
  return (
    <Avatar className={cn("size-10 hover:opacity-75 transition", className)}>
      <AvatarImage alt={name} src={image} />
      <AvatarFallback className="bg-sky-500 text-white">
        {avatarFallback}
      </AvatarFallback>
    </Avatar>
  );
};
