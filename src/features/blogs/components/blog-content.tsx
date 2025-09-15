/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Blog } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, Trash2 } from "lucide-react";
import { useToggleLike } from "../api/use-toggle-like";
import { useDeleteBlog } from "../api/use-delete-blog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/features/user/api/use-current-user";
import { useConfirm } from "@/hooks/use-confirm";
import Link from "next/link";

interface BlogContentProps {
  blog: Blog;
}

export const BlogContent = ({ blog }: BlogContentProps) => {
  const { mutate: toggleLike } = useToggleLike();
  const { mutate: deleteBlog } = useDeleteBlog();
  const router = useRouter();
  const { data: user } = useCurrentUser();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "This action cannot be undone"
  );

  const handleDelete = async (isAdmin: boolean) => {
    const ok = await confirm();

    if (!ok) {
      return;
    }

    deleteBlog(
      { blogId: blog._id, isAdmin },
      {
        onSuccess: () => {
          toast.success("Blog deleted successfully");
          router.replace("/blogs");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <>
      <ConfirmDialog />
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href={`/users/${blog.authorId}`}>
              <Avatar>
                <AvatarImage src={blog.author?.image} />
                <AvatarFallback>
                  {blog.author?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
              <p className="text-muted-foreground">
                {blog.author?.name} •{" "}
                {new Date(blog._creationTime).toLocaleDateString()}
              </p>
            </div>
          </div>
          {(user?._id === blog.authorId ||
            user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                handleDelete(
                  user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL
                );
              }}
              className="shrink-0 hover:bg-red-500"
            >
              <Trash2 className="size-4 shrink-0" />
            </Button>
          )}
        </div>

        {blog.imageUrl && (
          <div className="relative h-[400px] mb-8 rounded-lg overflow-hidden">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="prose prose-zinc dark:prose-invert max-w-none mb-8">
          <div
            dangerouslySetInnerHTML={{ __html: blog.content }}
            className="whitespace-pre-line"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleLike({ blogId: blog._id })}
          >
            <ThumbsUp className="h-4 w-4 mr-2" />
            {blog.likes}
          </Button>
        </div>
      </div>
    </>
  );
};
