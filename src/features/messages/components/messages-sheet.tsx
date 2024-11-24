/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Loader, Send, Trash2 } from "lucide-react";
import { useState } from "react";
import { useGetMessages } from "../api/use-get-messages";
import { Id } from "../../../../convex/_generated/dataModel";
import { UserAvatar } from "@/components/user-avatar";
import { Input } from "@/components/ui/input";
import { cn, formatDate } from "@/lib/utils";
import { useCurrentUser } from "../../user/api/use-current-user";
import { useCreateMessage } from "../api/use-create-messages";
import { toast } from "sonner";
import { useDeleteMessage } from "../api/use-delete-message";
import { motion, AnimatePresence } from "framer-motion";

interface MessagesSheetProps {
  projectId: Id<"projects">;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  children: React.ReactNode;
}

export const MessagesSheet = ({
  projectId,
  isOpen,
  setIsOpen,
  children,
}: MessagesSheetProps) => {
  const [message, setMessage] = useState("");
  const { data: messages, isLoading } = useGetMessages({ projectId });
  const { mutate: createMessage, isPending: isCreating } = useCreateMessage();
  const { mutate: deleteMessage, isPending: isDeleting } = useDeleteMessage();
  const { data: user } = useCurrentUser();

  const handleSendMessage = async () => {
    if (!user) {
      toast.error("Sign in to message");
      return;
    }
    if (!message.trim()) return;

    await createMessage(
      {
        projectId,
        message: message.trim(),
        actorId: user._id,
      },
      {
        onSuccess: () => {
          toast.success("Message sent");
          setMessage("");
        },
        onError: () => {
          toast.error("Failed to send message");
        },
      }
    );
  };

  const handleDeleteMessage = async (messageId: Id<"messages">) => {
    await deleteMessage(
      {
        messageId,
        projectId,
      },
      {
        onSuccess: () => {
          toast.success("Message deleted");
        },
        onError: () => {
          toast.error("Failed to delete message");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col gap-2 items-center justify-center">
        <Loader className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-[90%] sm:max-w-[450px] mt-16 rounded-t-xl border-t-0 p-0 overflow-hidden bg-background">
        <div className="flex flex-col h-[calc(100vh-8rem)]">
          <SheetHeader className="p-6 border-b bg-background/95 backdrop-blur-md">
            <SheetTitle className="text-xl">Project Messages</SheetTitle>
            <SheetDescription className="text-sm">
              Share your thoughts about this project with others
            </SheetDescription>
          </SheetHeader>

          {/* Message Input - Sticky at Top */}
          <div className="sticky top-0 z-10 p-4 bg-background shadow">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    if (!user) return;
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className={cn(
                  "flex-1",
                  "bg-accent/50 focus:bg-accent/80",
                  "border-muted-foreground/20",
                  "transition-all duration-200",
                  "placeholder:text-muted-foreground/50"
                )}
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                disabled={isCreating || !message.trim() || isDeleting}
                className={cn(
                  "bg-primary hover:bg-primary/90",
                  "transition-all duration-200",
                  "disabled:opacity-50",
                  "shadow-sm"
                )}
              >
                <Send className="size-4" />
              </Button>
            </div>
          </div>

          {/* Messages List */}
          <div
            className={cn(
              "flex-1 overflow-y-auto space-y-4 p-6",
              "scroll-smooth",
              "[&::-webkit-scrollbar]:w-2",
              "[&::-webkit-scrollbar-track]:bg-accent/20",
              "[&::-webkit-scrollbar-thumb]:bg-accent/60",
              "[&::-webkit-scrollbar-thumb]:rounded-full",
              "[&::-webkit-scrollbar-track]:rounded-full",
              "dark:[&::-webkit-scrollbar-track]:bg-accent/10",
              "dark:[&::-webkit-scrollbar-thumb]:bg-accent/30"
            )}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {messages?.map((message) => (
                <motion.div
                  key={message._id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    transition: { duration: 0.2 },
                  }}
                  layout
                  className={cn(
                    "flex items-start gap-3 group",
                    "hover:translate-x-1 transition-transform duration-200"
                  )}
                >
                  <UserAvatar
                    name={message.userName || "Anonymous"}
                    image={message.userImage}
                    className={cn(
                      "size-8 ring-2 ring-background",
                      "transition-transform duration-200",
                      "group-hover:scale-105"
                    )}
                  />
                  <div className="flex-1">
                    <motion.div
                      layout
                      className={cn(
                        "bg-accent/40 p-4 rounded-2xl",
                        "hover:bg-accent/60 transition-colors duration-200",
                        "border border-accent/50",
                        "group-hover:shadow-sm",
                        "relative"
                      )}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <p className="font-medium text-sm">
                            {message.userName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(new Date(message._creationTime))}
                          </p>
                        </div>
                        {message.userId === user?._id && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                              "opacity-0 group-hover:opacity-100",
                              "transition-all duration-200",
                              "hover:bg-destructive/10 hover:text-destructive",
                              "-mr-2 -mt-2 h-8 w-8"
                            )}
                            onClick={() => handleDeleteMessage(message._id)}
                            disabled={isDeleting}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <p className="mt-2 text-sm whitespace-pre-wrap break-all">
                        {message.message}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
