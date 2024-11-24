import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createBlog = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("You must be logged in to create a blog");
    }

    const blogId = await ctx.db.insert("blogs", {
      title: args.title,
      content: args.content,
      imageUrl: args.imageUrl || undefined,
      authorId: userId,
      likes: 0,
      comments: [],
    });

    return blogId;
  },
});

export const getBlogs = query({
  args: {},
  handler: async (ctx) => {
    const blogs = await ctx.db.query("blogs").order("desc").collect();

    if (!blogs || blogs.length < 1) {
      return [];
    }

    const blogsWithUsers = await Promise.all(
      blogs.map(async (blog) => {
        const user = await ctx.db.get(blog.authorId);
        if (!user) return null;
        return {
          ...blog,
          author: {
            name: user.name as string,
            image: user.image as string,
          },
        };
      })
    );

    return blogsWithUsers.filter(
      (blog): blog is NonNullable<typeof blog> => blog !== null
    );
  },
});

export const getBlog = query({
  args: {
    blogId: v.id("blogs"),
  },
  handler: async (ctx, args) => {
    const blog = await ctx.db.get(args.blogId);
    if (!blog) return null;

    const author = await ctx.db.get(blog.authorId);
    return {
      ...blog,
      author: {
        name: author?.name,
        image: author?.image,
      },
    };
  },
});

export const addComment = mutation({
  args: {
    blogId: v.id("blogs"),
    content: v.string(),
    actorId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("You must be logged in to comment");
    }

    const blog = await ctx.db.get(args.blogId);
    if (!blog) {
      throw new Error("Blog not found");
    }

    const user = await ctx.db.get(userId);

    if (!user) {
      throw new Error("You must be logged in to comment");
    }

    const comment = {
      content: args.content,
      authorId: userId,
      authorName: user.name as string,
      authorImage: user?.image,
      createdAt: Date.now(),
    };

    await ctx.db.patch(args.blogId, {
      comments: [...(blog.comments || []), comment],
    });

    const actor = await ctx.db.get(args.actorId);

    if (actor && actor._id !== blog.authorId) {
      await ctx.db.insert("notifications", {
        userId: blog.authorId,
        type: "message",
        content: `commented on your blog ${blog.title}`,
        read: false,
        sourceId: args.blogId,
        sourceType: "blog",
        actorId: args.actorId,
        actorName: actor.name!,
      });
    }

    return blog._id;
  },
});

export const toggleLike = mutation({
  args: {
    blogId: v.id("blogs"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("You must be logged in to like a blog");
    }

    const blog = await ctx.db.get(args.blogId);
    if (!blog) {
      throw new Error("Blog not found");
    }

    await ctx.db.patch(args.blogId, {
      likes: (blog.likes || 0) + 1,
    });

    return blog._id;
  },
});

export const deleteBlog = mutation({
  args: {
    blogId: v.id("blogs"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const blog = await ctx.db.get(args.blogId);
    if (!blog) {
      throw new Error("Blog not found");
    }

    if (blog.authorId !== userId) {
      throw new Error("You can only delete your own blogs");
    }

    const notifications = await ctx.db
      .query("notifications")
      .withIndex("by_source_id", (q) => q.eq("sourceId", args.blogId))
      .collect();

    await Promise.all(
      notifications.map((notification) => ctx.db.delete(notification._id))
    );

    await ctx.db.delete(args.blogId);

    return blog._id;
  },
});

export const deleteComment = mutation({
  args: {
    blogId: v.id("blogs"),
    commentIndex: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("You must be logged in to delete a comment");
    }

    const blog = await ctx.db.get(args.blogId);
    if (!blog) {
      throw new Error("Blog not found");
    }

    const comment = blog.comments[args.commentIndex];
    if (!comment) {
      throw new Error("Comment not found");
    }

    if (comment.authorId !== userId) {
      throw new Error("You can only delete your own comments");
    }

    const updatedComments = [...blog.comments];
    updatedComments.splice(args.commentIndex, 1);

    await ctx.db.patch(args.blogId, {
      comments: updatedComments,
    });
  },
});
