import { v } from "convex/values";
import { query } from "./_generated/server";

import { getAuthUserId } from "@convex-dev/auth/server";

export const current = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return null;
    }

    return await ctx.db.get(userId);
  },
});

export const getUserDetails = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return null;
    }

    const userDetails = await ctx.db.get(args.userId);

    if (!userDetails) {
      return null;
    }

    return userDetails;
  },
});

export const allProjectsOfUser = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return [];
    }

    const userDetails = await ctx.db.get(args.userId);

    if (!userDetails) {
      return null;
    }

    const projects = await ctx.db
      .query("projects")
      .withIndex("by_author", (q) => q.eq("authorId", args.userId))
      .order("desc")
      .collect();

    const users = projects.map(async (project) => {
      const user = await ctx.db.get(project.authorId);
      return {
        ...project,

        name: user?.name,
        image: user?.image,
        userId: user?._id,
      };
    });

    const projectsWithUser = await Promise.all(users);
    return projectsWithUser;
  },
});

export const allBlogsOfUser = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return [];
    }

    const userDetails = await ctx.db.get(args.userId);

    if (!userDetails) {
      return null;
    }

    const blogs = await ctx.db
      .query("blogs")
      .withIndex("by_author", (q) => q.eq("authorId", args.userId))
      .order("desc")
      .collect();

    const users = blogs.map(async (blog) => {
      const user = await ctx.db.get(blog.authorId);
      return {
        ...blog,

        name: user?.name,
        image: user?.image,
        userId: user?._id,
      };
    });

    const blogsWithUser = await Promise.all(users);
    return blogsWithUser;
  },
});
