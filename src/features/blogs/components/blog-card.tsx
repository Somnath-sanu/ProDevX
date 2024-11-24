/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { Blog } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, formatDate } from "@/lib/utils";

interface BlogCardProps {
  blog: Blog;
}

export const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 h-[320px] flex flex-col">
      {blog.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <CardHeader className={cn("p-4", !blog.imageUrl && "pt-6")}>
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={blog.author?.image} />
            <AvatarFallback>
              {blog.author?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {blog.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {blog.author?.name} • {formatDate(new Date(blog._creationTime))}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-1 flex flex-col justify-between">
        <div className="prose prose-zinc dark:prose-invert max-w-none mb-4">
          <div
            dangerouslySetInnerHTML={{ __html: blog.content }}
            className="line-clamp-2 text-sm text-muted-foreground"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ThumbsUp className="h-4 w-4" />
            <span>{blog.likes}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
            <MessageCircle className="h-4 w-4" />
            <span>{blog.comments.length}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
