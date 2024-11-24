"use client";

import { useGetBlog } from "@/features/blogs/api/use-get-blog";
import { BlogContent } from "@/features/blogs/components/blog-content";
import { Comments } from "@/features/blogs/components/comments";
import { useBlogId } from "@/hooks/use-blog-id";
import { Loader } from "lucide-react";


const BlogPage = () => {
  const blogId = useBlogId();

  const { data: blog, isLoading } = useGetBlog({ blogId });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Blog not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
    
      <div className="container py-20 px-8 sm:px-0">
        <BlogContent blog = { blog } />
        <Comments blogId={blog._id} comments={blog.comments} />
      </div>
    </div>
  );
};

export default BlogPage;
