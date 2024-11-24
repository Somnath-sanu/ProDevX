"use client";

import { CreateBlogForm } from "@/features/blogs/components/create-blog-form";

const CreateBlogPage = () => {
  return (
    <div className="min-h-screen">

      <div className="container py-20 px-8 sm:px-0">
        <h1 className="text-3xl font-bold mb-8">Create a New Blog Post</h1>
        <CreateBlogForm />
      </div>
    </div>
  );
};

export default CreateBlogPage;
