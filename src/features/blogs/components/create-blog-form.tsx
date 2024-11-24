/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/features/projects/components/rich-text-editor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useCreateBlog } from "../api/use-create-blog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FileUpload } from "@/features/blogs/components/file-upload";
import { useState } from "react";
import { uploadFile } from "@/features/blogs/api/upload";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  imageUrl: z.string().optional(),
});

export const CreateBlogForm = () => {
  const router = useRouter();
  const { mutate: createBlog, isPending } = useCreateBlog();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (selectedFile) {
        setIsUploading(true);
        const url = await uploadFile(selectedFile);
        values.imageUrl = url;
        setIsUploading(false);
      }

      createBlog(values, {
        onSuccess: () => {
          toast.success("Blog created");
          router.replace("/blogs");
        },
      });
    } catch (error) {
      setIsUploading(false);
      toast.error("Failed to upload image");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter blog title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <RichTextEditor
                  content={field.value}
                  onChange={field.onChange}
                  placeholder="Write your blog content..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <FileUpload
                  value={selectedFile}
                  onChange={setSelectedFile}
                  className="mt-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end items-center">
          <Button
            type="submit"
            disabled={isPending || isUploading}
            className="ml-auto"
          >
            {isUploading
              ? "Uploading..."
              : isPending
                ? "Creating..."
                : "Create Blog"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
