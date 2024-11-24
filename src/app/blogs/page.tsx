"use client";

import { Button } from "@/components/ui/button";

import { useGetBlogs } from "@/features/blogs/api/use-get-blogs";
import { BlogCard } from "@/features/blogs/components/blog-card";
import { Loader, PenSquare, TriangleAlert } from "lucide-react";
import Link from "next/link";

const BlogsPage = () => {
  const { data: blogs, isLoading } = useGetBlogs();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!blogs || blogs.length < 1) {
    return (
      <div className="min-h-screen">
        
        <main className="container py-20">
          <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
            <TriangleAlert className="size-8" />
            <span>No Blogs found</span>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      
      <div className="container py-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold pl-2">Blog Posts</h1>
          <Link href="/blogs/create" className="block pr-2">
            <Button>
              <PenSquare className="h-4 w-4 mr-2" />
              Write a Blog
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 sm:p-0">
          {blogs.map((blog) => (
            <Link key={blog._id} href={`/blogs/${blog._id}`}>
              <BlogCard blog={blog} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
