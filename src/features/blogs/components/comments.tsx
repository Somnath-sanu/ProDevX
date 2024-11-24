import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useAddComment } from "../api/use-add-comment";
import { useDeleteComment } from "../api/use-delete-comment";
import { BlogComment } from "../types";
import { useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { formatDate } from "@/lib/utils";
import { Trash2 } from "lucide-react";

import { toast } from "sonner";
import { useCurrentUser } from "@/features/user/api/use-current-user";
import { useConfirm } from "@/hooks/use-confirm";

interface CommentsProps {
  blogId: Id<"blogs">;
  comments: BlogComment[];
}

export const Comments = ({ blogId, comments }: CommentsProps) => {
  const [content, setContent] = useState("");
  const { mutate: addComment, isPending } = useAddComment();
  const { mutate: deleteComment } = useDeleteComment();
  const { data: user } = useCurrentUser();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure you want to delete this comment?",
    "This action cannot be undone"
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast.error("Sign in to comment");
      return;
    }
    if (!content.trim()) return;

    addComment(
      {
        blogId,
        content,
        actorId: user._id,
      },
      {
        onSuccess: () => {
          setContent("");
        },
      }
    );
  };

  const handleDeleteComment = async (commentIndex: number) => {
    const ok = await confirm();
    if (!ok) return;

    deleteComment(
      {
        blogId,
        commentIndex,
      },
      {
        onSuccess: () => {
          toast.success("Comment deleted successfully");
        },
        onError: () => {
          toast.error("something went wrong");
        },
      }
    );
  };

  return (
    <>
      <ConfirmDialog />
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-bold mb-8">Comments</h2>

        <form onSubmit={handleSubmit} className="mb-8">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
            className="mb-4 min-h-[100px]"
          />
          {!user ? (
            <p>Sign in to add comment</p>
          ) : (
            <Button type="submit" disabled={isPending}>
              Add Comment
            </Button>
          )}
        </form>

        <div className="space-y-4">
          {comments.map((comment, index) => (
            <Card key={comment.createdAt} className="p-4">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src={comment.authorImage} />
                  <AvatarFallback>
                    {comment.authorName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex flex-col sm:flex-row w-full max-w-xl gap-x-4">
                      <h4 className="font-semibold">{comment.authorName}</h4>
                      <span className="text-sm text-muted-foreground text-wrap shrink-0 items-end">
                        {formatDate(new Date(comment.createdAt))}
                      </span>
                    </div>
                    {user?._id === comment.authorId && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteComment(index)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                  <p className="text-sm break-all text-balance pt-2 w-full">
                    {comment.content}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};
