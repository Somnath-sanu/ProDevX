import { motion } from "framer-motion";

import { Card } from "@/components/ui/card";
import { Heart, MessageSquare, TriangleAlert } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Id } from "../../../../convex/_generated/dataModel";
import { formatDate } from "@/lib/utils";

interface BlogSectionProps {
  blogs:
    | {
        authorId: Id<"users">;
        comments: {
          authorId: Id<"users">;
          authorImage?: string | undefined;
          authorName: string;
          content: string;
          createdAt: number;
        }[];
        content: string;
        image: string | undefined;
        imageUrl?: string | undefined;

        likes: number;
        name: string | undefined;
        title: string;
        userId: Id<"users"> | undefined;
        _creationTime: number;
        _id: Id<"blogs">;
      }[]
    | undefined
    | null;
}

export const BlogSection = ({ blogs }: BlogSectionProps) => {
  if (!!!blogs) {
    return (
      <div className="min-h-screen">
        <main className="flex-1">
          <div className="flex h-[50vh] flex-col items-center justify-center gap-2">
            <TriangleAlert className="size-5" />
            <p className="text-sm">No blogs yet!</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
          Blogs
        </h2>
        <span className="text-sm text-muted-foreground">
          {blogs.length} total blogs
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {blogs.map((blog) => (
          <motion.div
            key={blog._id}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Link href={`/blogs/${blog._id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative  flex-1 overflow-hidden rounded">
                    <Image
                      src={blog?.imageUrl || "/blog1.png"}
                      alt={blog.title}
                      fill
                      className="object-contain pl-3"
                    />
                  </div>

                  <div className="flex flex-col flex-1 p-4 md:p-6 grow-[2]">
                    <div className="flex items-center gap-2 mb-3">
                      {blog.comments[0]?.authorImage && (
                        <div className="relative w-8 h-8">
                          <Image
                            src={blog.comments[0].authorImage}
                            alt={blog.name || ""}
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium">{blog.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(new Date(blog._creationTime))}
                        </p>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                      {blog.title}
                    </h3>
                    <div className="prose prose-zinc dark:prose-invert max-w-none mb-8">
                      <p
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                        className="whitespace-pre-line"
                      />
                    </div>

                    <div className="flex items-center gap-4 mt-auto text-muted-foreground">
                      <div className="flex items-center gap-1 text-sm">
                        <Heart className="size-4 shrink-0" />
                        <span>{blog.likes}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <MessageSquare className="size-4 shrink-0" />
                        <span>{blog.comments.length}</span>
                      </div>
                      {/* <div className="flex items-center gap-1 text-sm">
                        <Eye className="size-4 shrink-0" />
                        <span>0</span>
                      </div> */}
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}

        {blogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No blogs yet</p>
          </div>
        )}
      </div>
    </div>
  );
};
